// Self-check for src/lib/demo-math.js. Run: node scripts/check-demo-math.mjs
import assert from "node:assert/strict";
import { rng, gamma, gevCdf, gevSample, gevFit, crashRisk, crossing, shortestPath } from "../src/lib/demo-math.js";

assert.ok(Math.abs(gamma(5) - 24) < 1e-8);
assert.ok(Math.abs(gamma(0.5) - Math.sqrt(Math.PI)) < 1e-8);

// L-moment fit recovers known GEV parameters from a large sample.
const truth = { xi: -1.2, alpha: 0.35, k: 0.2 };
const r = rng(7);
const sample = Array.from({ length: 20000 }, () => gevSample(r, truth));
const fit = gevFit(sample);
assert.ok(Math.abs(fit.xi - truth.xi) < 0.03, `xi ${fit.xi}`);
assert.ok(Math.abs(fit.alpha - truth.alpha) < 0.03, `alpha ${fit.alpha}`);
assert.ok(Math.abs(fit.k - truth.k) < 0.05, `k ${fit.k}`);
// Upper bound is xi + alpha/k = 0.55 > 0, so a crash is possible; CDF is monotone.
assert.ok(crashRisk(truth) > 0 && crashRisk(truth) < 0.1);
assert.ok(gevCdf(-1, truth) < gevCdf(0, truth));
assert.equal(crashRisk({ xi: -2, alpha: 0.2, k: 0.5 }), 0); // bound -1.6 < 0: no crash possible

// Crossing: car enters zone at 2.9 s, pedestrian is inside from 2.5 s -> TTC 2.9 s.
const c = crossing({ d1: 30, v1: 10, len1: 4.5, d2: 6, v2: 2, len2: 0.6, zone: 2 });
assert.ok(c.ttc !== null && Math.abs(c.ttc - 2.9) < 1e-9, `ttc ${c.ttc}`);
assert.ok(Math.abs(c.drac - 100 / 58) < 1e-9);
// Pedestrian long gone before the car arrives -> no conflict.
assert.equal(crossing({ d1: 60, v1: 10, len1: 4.5, d2: 1, v2: 2, len2: 0.6, zone: 2 }).ttc, null);
// Stopped car outside the zone -> no conflict.
assert.equal(crossing({ d1: 10, v1: 0, len1: 4.5, d2: 6, v2: 2, len2: 0.6, zone: 2 }).ttc, null);

// Dijkstra picks the cheaper of two routes and respects the weight function.
const adj = [[{ to: 1, t: 1, risk: 5 }, { to: 2, t: 3, risk: 0 }], [{ to: 3, t: 1, risk: 5 }], [{ to: 3, t: 3, risk: 0 }], []];
assert.deepEqual(shortestPath(adj, 0, 3, (e) => e.t), [0, 1, 3]);
assert.deepEqual(shortestPath(adj, 0, 3, (e) => e.risk), [0, 2, 3]);
assert.equal(shortestPath(adj, 3, 0, (e) => e.t), null);

console.log("demo-math: all checks passed");
