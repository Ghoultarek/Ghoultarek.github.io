// Pure math shared by the Demos page. No DOM here, so scripts/check-demo-math.mjs can test it.

/** Seeded PRNG so illustrative data is the same on every visit. */
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Lanczos gamma, accurate to ~1e-10 for the x > 0 range used here. */
export function gamma(x) {
  const g = 7;
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (x < 0.5) return Math.PI / (Math.sin(Math.PI * x) * gamma(1 - x));
  x -= 1;
  let a = c[0];
  const t = x + g + 0.5;
  for (let i = 1; i < g + 2; i++) a += c[i] / (x + i);
  return Math.sqrt(2 * Math.PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a;
}

/** Hosking GEV: G(x) = exp(-(1 - k(x-xi)/alpha)^(1/k)). k > 0 means a bounded upper tail. */
export function gevCdf(x, { xi, alpha, k }) {
  if (Math.abs(k) < 1e-9) return Math.exp(-Math.exp(-(x - xi) / alpha));
  const y = 1 - (k * (x - xi)) / alpha;
  if (y <= 0) return k > 0 ? 1 : 0;
  return Math.exp(-Math.pow(y, 1 / k));
}

export function gevPdf(x, p) {
  const { xi, alpha, k } = p;
  const y = Math.abs(k) < 1e-9 ? Math.exp(-(x - xi) / alpha) : Math.pow(Math.max(1 - (k * (x - xi)) / alpha, 0), 1 / k);
  if (y === 0) return 0;
  return (Math.pow(y, 1 - k) * Math.exp(-y)) / alpha;
}

export function gevSample(r, { xi, alpha, k }) {
  const u = Math.min(Math.max(r(), 1e-12), 1 - 1e-12);
  return Math.abs(k) < 1e-9 ? xi - alpha * Math.log(-Math.log(u)) : xi + (alpha / k) * (1 - Math.pow(-Math.log(u), k));
}

/** GEV fit by L-moments (Hosking 1985): closed form, fast enough for hundreds of fits per frame. */
export function gevFit(data) {
  const x = [...data].sort((a, b) => a - b);
  const n = x.length;
  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < n; i++) {
    b0 += x[i];
    b1 += (i / (n - 1)) * x[i];
    b2 += ((i * (i - 1)) / ((n - 1) * (n - 2))) * x[i];
  }
  b0 /= n; b1 /= n; b2 /= n;
  const l1 = b0, l2 = 2 * b1 - b0, l3 = 6 * b2 - 6 * b1 + b0;
  const t3 = l3 / l2;
  const c = 2 / (3 + t3) - Math.LN2 / Math.log(3);
  const k = 7.859 * c + 2.9554 * c * c;
  const alpha = (l2 * k) / ((1 - Math.pow(2, -k)) * gamma(1 + k));
  const xi = l1 - (alpha * (1 - gamma(1 + k))) / k;
  return { xi, alpha, k };
}

/** Crash risk = P(block maximum of negated TTC >= 0), i.e. a conflict reaching TTC = 0. */
export function crashRisk(p) {
  return 1 - gevCdf(0, p);
}

/**
 * Crossing conflict between a vehicle on the x axis and a road user on the y axis,
 * both heading for the origin (d = distance to the origin). Each occupies the conflict
 * zone during [enter, exit]. Returns TTC (time until both would be in the zone together,
 * or null) and DRAC for the vehicle (deceleration needed to stop before the zone).
 */
export function crossing({ d1, v1, len1, d2, v2, len2, zone }) {
  const occ = (d, v, len) => {
    if (v > 0) return [(d - zone / 2) / v, (d + zone / 2 + len) / v];
    const inside = d <= zone / 2 && d + len >= -zone / 2;
    return inside ? [0, Infinity] : [Infinity, Infinity];
  };
  const [a1, b1] = occ(d1, v1, len1);
  const [a2, b2] = occ(d2, v2, len2);
  const overlap = Math.max(a1, a2) < Math.min(b1, b2) && Math.min(b1, b2) > 0;
  const ttc = overlap ? Math.max(0, a1, a2) : null;
  const gap = d1 - zone / 2;
  const drac = overlap && gap > 0 && v1 > 0 ? (v1 * v1) / (2 * gap) : null;
  return { ttc, drac, enter1: a1, exit1: b1, enter2: a2, exit2: b2 };
}

/** Dijkstra over an adjacency list: adj[u] = [{ to, ...edge }]. Returns node path or null. */
export function shortestPath(adj, from, to, weight) {
  const n = adj.length;
  const dist = new Array(n).fill(Infinity);
  const prev = new Array(n).fill(-1);
  const done = new Array(n).fill(false);
  dist[from] = 0;
  for (;;) {
    let u = -1;
    for (let i = 0; i < n; i++) if (!done[i] && dist[i] < Infinity && (u < 0 || dist[i] < dist[u])) u = i;
    if (u < 0 || u === to) break;
    done[u] = true;
    for (const e of adj[u]) {
      const nd = dist[u] + weight(e);
      if (nd < dist[e.to]) { dist[e.to] = nd; prev[e.to] = u; }
    }
  }
  if (dist[to] === Infinity) return null;
  const path = [to];
  while (path[0] !== from) path.unshift(prev[path[0]]);
  return path;
}
