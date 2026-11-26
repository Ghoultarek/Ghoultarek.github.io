// Self-check for src/lib/whatif.js: each treatment must change the outcome the way the page says. Run: node scripts/check-whatif.mjs
import assert from "node:assert/strict";
import { scenario, turnSpeed } from "../src/lib/whatif.js";

assert.ok(turnSpeed(6.5) < turnSpeed(11)); // tighter corner, slower turn

const b0 = scenario("bulb", false), b1 = scenario("bulb", true);
assert.ok(!b0.yielded && !b0.collision && b0.pet < 1, `bulb before: ${JSON.stringify({ y: b0.yielded, pet: b0.pet })}`);
assert.ok(b1.yielded && b1.pet > 1.5, "bulb after: driver yields");

const h0 = scenario("bike", false), h1 = scenario("bike", true);
assert.ok(!h0.yielded && !h0.collision && h0.pet < 1, "bike before: right-hook near miss");
assert.ok(h1.yielded && h1.pet > 1.5, "bike after: driver yields");

const f0 = scenario("friction", false), f1 = scenario("friction", true);
assert.ok(f0.impact > 7 && f0.stopsShort === null, "worn wet surface: car reaches the pedestrian");
assert.ok(f1.impact === null && f1.stopsShort > 3, "high-friction surface: car stops short");
console.log("whatif: all checks passed", { bulbPET: [b0.pet, b1.pet], bikePET: [h0.pet, h1.pet], impactKmh: (f0.impact * 3.6).toFixed(0), short: f1.stopsShort.toFixed(1) });
