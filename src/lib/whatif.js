// Small kinematic "what if" model behind the infrastructure scenarios on the decision-making page.
// It stands in for a learned world model: a driver yields only if they can see the other road user in
// time to stop comfortably. Units: metres, seconds. Pure functions, tested by scripts/check-whatif.mjs.

const DT = 0.05;
export const CX = 46, CY = 22; // intersection centre in the scenario's world coordinates

/** Right-turn path: east along y=yLane, quarter arc of radius r, then south along x=xS. */
export function turnPath(yLane, xS, r, x0 = 0, yEnd = 48) {
  const xT = xS - r, pts = [];
  for (let x = x0; x < xT; x += 0.25) pts.push([x, yLane]);
  const arcStart = pts.length;
  for (let a = -Math.PI / 2; a <= 0; a += 0.02) pts.push([xT + r * Math.cos(a), yLane + r + r * Math.sin(a)]);
  const arcEnd = pts.length;
  for (let y = yLane + r; y <= yEnd; y += 0.25) pts.push([xS, y]);
  const s = [0];
  for (let i = 1; i < pts.length; i++) s.push(s[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  return { pts, s, sArc: s[arcStart], sArcEnd: s[arcEnd - 1] };
}

export function at(path, d) {
  const { pts, s } = path;
  if (d <= 0) return pts[0];
  for (let i = 1; i < s.length; i++) if (s[i] >= d) { const f = (d - s[i - 1]) / (s[i] - s[i - 1]); return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f]; }
  return pts[pts.length - 1];
}

/** A path from a list of points, with cumulative arc length. */
export function polyPath(pts) {
  const s = [0];
  for (let i = 1; i < pts.length; i++) s.push(s[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  return { pts, s };
}
/** Sample a quadratic Bezier from a to b with control point c (as the page draws it). */
export const quad = (a, c, b, n = 24) => Array.from({ length: n + 1 }, (_, i) => { const u = i / n, v = 1 - u; return [v * v * a[0] + 2 * v * u * c[0] + u * u * b[0], v * v * a[1] + 2 * v * u * c[1] + u * u * b[1]]; });

/** Arc length of the point on the path closest to p (projects onto segments, not just vertices). */
const nearest = (path, p) => {
  let best = 0, bd = Infinity;
  for (let i = 1; i < path.pts.length; i++) {
    const [ax, ay] = path.pts[i - 1], [bx, by] = path.pts[i], L2 = (bx - ax) ** 2 + (by - ay) ** 2;
    const u = L2 ? Math.max(0, Math.min(1, ((p[0] - ax) * (bx - ax) + (p[1] - ay) * (by - ay)) / L2)) : 0;
    const d = Math.hypot(ax + u * (bx - ax) - p[0], ay + u * (by - ay) - p[1]);
    if (d < bd) { bd = d; best = path.s[i - 1] + u * (path.s[i] - path.s[i - 1]); }
  }
  return best;
};
export const turnSpeed = (r) => Math.sqrt(127 * r * 0.32) / 3.6; // m/s, from the corner radius

/**
 * Simulate a right-turning car and a road user (pedestrian or cyclist) crossing its path.
 * user: { path, speed, start } (or { from, dir } for a straight line); conflict: [x,y] where the paths cross.
 * visible(userPos, t, carPos) -> whether the driver can see the user.
 */
export function simulateTurn({ path, vApp = 11, rTurn, user, conflict, visible, T = 14 }) {
  const vTurn = turnSpeed(rTurn), sConf = nearest(path, conflict), sStop = sConf - 4;
  const upath = user.path ?? polyPath([user.from, [user.from[0] + user.dir[0] * 100, user.from[1] + user.dir[1] * 100]]);
  const suConf = nearest(upath, conflict);
  let s = 0, v = vApp, yielding = false, decided = false, waited = false;
  const car = [], ped = [];
  let carIn = null, carOut = null, userIn = null, userOut = null;
  for (let t = 0; t <= T; t += DT) {
    const su = user.speed * Math.max(0, t - user.start), up = at(upath, su);
    // Driver decision: yield if the user is seen, will be near the conflict point when the car gets there, and the car can still stop at <= 6 m/s^2.
    if (!decided && t >= user.start) {
      const canStop = sStop - s > (v * v) / (2 * 6);
      if (!canStop) decided = true;
      else if (visible(up, t, at(path, s))) {
        const tCar = t + (sConf - s) / Math.max(1, v);
        const dUser = Math.abs(suConf - su);
        const tUser0 = t + Math.max(0, dUser - 2) / user.speed, tUser1 = t + (dUser + 2) / user.speed;
        if (tCar > tUser0 - 2 && tCar < tUser1 + 2) { yielding = true; decided = true; }
      }
    }
    const userPast = su > suConf + 2.5;
    let a;
    if (yielding && !userPast) {
      const left = sStop - s;
      a = left > 0.2 ? -Math.min(6, (v * v) / (2 * left)) : -10;
      if (v < 0.05 && left <= 0.5) waited = true;
    } else {
      const target = s < path.sArc ? Math.min(vApp, Math.sqrt(vTurn * vTurn + 2 * 2.5 * Math.max(0, path.sArc - s))) : s < path.sArcEnd ? vTurn : vApp;
      a = v > target ? -Math.min(6, (v - target) / DT) : Math.min(1.5, (target - v) / DT);
    }
    v = Math.max(0, v + a * DT); s += v * DT;
    const cp = at(path, s);
    car.push([t, cp[0], cp[1], v]); ped.push([t, up[0], up[1]]);
    const dc = Math.hypot(cp[0] - conflict[0], cp[1] - conflict[1]), du = Math.hypot(up[0] - conflict[0], up[1] - conflict[1]);
    if (dc < 2.2 && carIn === null) carIn = t;
    if (carIn !== null && carOut === null && dc >= 2.2 && s > sConf) carOut = t;
    if (du < 1.2 && userIn === null) userIn = t;
    if (userIn !== null && userOut === null && du >= 1.2 && userPast) userOut = t;
  }
  let pet = null, collision = false;
  if (carIn !== null && userIn !== null) {
    const cOut = carOut ?? T, uOut = userOut ?? T;
    if (carIn < uOut && userIn < cOut) collision = true;
    else pet = carIn >= uOut ? carIn - uOut : userIn - cOut;
  }
  return { car, user: ped, yielded: yielding && waited, pet, collision, vTurn, path };
}

/** Pedestrian steps out; driver reacts in 1 s and brakes at mu*g. Returns stopping outcome and a trajectory. */
export function braking({ v0 = 50 / 3.6, mu, gap = 32, react = 1.0, pedSpeed = 1.3, laneFrom = 7, laneTo = 3.5 }) {
  const a = mu * 9.81, react_d = v0 * react, brake_d = (v0 * v0) / (2 * a), stop = react_d + brake_d;
  const traj = []; let x = 0, v = v0, impact = null;
  const pedInLane = (t) => { const y = laneFrom - pedSpeed * t; return y <= laneFrom && y >= laneTo; };
  for (let t = 0; t <= 6; t += DT) {
    if (t > react) v = Math.max(0, v - a * DT);
    x += v * DT; traj.push([t, x, v, laneFrom - pedSpeed * t]);
    if (impact === null && x >= gap && v > 0 && pedInLane(t)) impact = v;
  }
  return { stop, react_d, brake_d, impact, stopsShort: stop < gap ? gap - stop : null, traj };
}

/**
 * The three scenarios on the page. Geometry in metres around the intersection centre (CX, CY):
 * main street east-west (travel lanes CY-7..CY+7), cross street north-south (CX-7..CX+7).
 * The car drives east in the curb lane (y = CY+5.25) and turns right into the south leg (x = CX-5.25).
 */
export function scenario(name, after, opts = {}) {
  const yLane = CY + 5.25, xS = CX - 5.25;
  if (name === "bulb") {
    // Pedestrian crosses the south leg, west to east, on the right of the turning driver.
    const r = after ? 6.5 : 11, y = CY + 12;
    const from = after ? [CX - 7.3, y] : [CX - 10, y];
    const sim = simulateTurn({ path: turnPath(yLane, xS, r), rTurn: r, conflict: [xS, y],
      user: { from, dir: [1, 0], speed: 1.3, start: opts.start ?? 3.5 },
      // Before: the waiting pedestrian is hidden by parked cars until they step past them. After: they wait on the bulb, in view.
      visible: (u) => after || u[0] > CX - 7 });
    return { ...sim, r, crossing: after ? 14 : 19 };
  }
  if (name === "bike") {
    // Cyclist rides straight east. Before: painted lane beside the curb lane, through the driver's blind spot.
    // After: a protected intersection sets the bike crossing back, so the driver meets the cyclist after turning, side-on.
    const r = after ? 6.5 : 9, y = after ? CY + 12 : CY + 7.9, yl = CY + 7.9, x0 = opts.bikeX ?? 8;
    const path = turnPath(yLane, xS, r);
    const conflict = after ? [xS, y] : [xS - r + Math.sqrt(r * r - (y - (yLane + r)) ** 2), y];
    // The protected lane bends behind the corner island to the set-back crossing and back, exactly as drawn.
    const bikePath = after
      ? polyPath([[x0, yl], ...quad([CX - 14, yl], [CX - 9, yl], [CX - 9, y]), ...quad([CX + 9, y], [CX + 9, yl], [CX + 14, yl]), [100, yl]])
      : polyPath([[x0, yl], [100, yl]]);
    const sim = simulateTurn({ path, rTurn: r, conflict,
      user: { path: bikePath, speed: 5, start: 0 },
      visible: (u, t, c) => after || u[0] > c[0] + 2 });
    return { ...sim, r, setback: after ? 5 : 0 };
  }
  // High-friction surface: same driver, same pedestrian, wet road; only the friction changes.
  return braking({ mu: after ? 0.75 : 0.35 });
}
