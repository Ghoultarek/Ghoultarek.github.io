# Builds public/research/athens-replay.json from a SUMO run of the Athens (pNEUMA) network (fixed-time signals, observed demand).
# Usage: python scripts/make-athens-replay.py <net.xml> <fcd.xml> <tls_states.xml> <out.json>
# The SUMO run: configs/20181029_0830_0900.sumocfg, --end 2400, --fcd-output with --device.fcd.period 1
# --device.fcd.begin 2100, plus an additional with <timedEvent type="SaveTLSStates" dest=.../>.
import json, math, sys, xml.etree.ElementTree as ET
from collections import defaultdict

net_f, fcd_f, tls_f, out_f = sys.argv[1:5]
T0, T1 = 2100, 2400
Q = 2  # coordinates stored in half-metres

root = ET.parse(net_f).getroot()
pts = lambda s: [tuple(map(float, p.split(",")[:2])) for p in s.split()]
drive = lambda l: ("passenger" in l.get("allow").split()) if l.get("allow") else "passenger" not in (l.get("disallow") or "").split()

lanes = {}
edge_lanes = {}
for e in root.iter("edge"):
    if e.get("function") == "internal": continue
    ls = [l for l in e.findall("lane") if drive(l)]
    for l in ls: lanes[l.get("id")] = pts(l.get("shape"))
    if ls: edge_lanes[e.get("id")] = [l.get("id") for l in ls]

# Rotate so the street grid's main axis is horizontal (principal component of lane vertices).
P = [p for s in lanes.values() for p in s]
mx = sum(p[0] for p in P) / len(P); my = sum(p[1] for p in P) / len(P)
sxx = sum((p[0]-mx)**2 for p in P); syy = sum((p[1]-my)**2 for p in P); sxy = sum((p[0]-mx)*(p[1]-my) for p in P)
th = 0.5 * math.atan2(2*sxy, sxx - syy)
c, s = math.cos(-th), math.sin(-th)
rot = lambda x, y: ((x-mx)*c - (y-my)*s, -((x-mx)*s + (y-my)*c))  # flip y for screen coordinates
R = [rot(*p) for p in P]
ox, oy = min(p[0] for p in R) - 10, min(p[1] for p in R) - 10
W = max(p[0] for p in R) - ox + 10; H = max(p[1] for p in R) - oy + 10
tf = lambda x, y: (round((rot(x, y)[0]-ox)*Q), round((rot(x, y)[1]-oy)*Q))
flat = lambda shape: [v for p in shape for v in tf(*p)]

# Signals: junction centres, and one head per controlled incoming lane at its stop line.
signals = [list(tf(float(j.get("x")), float(j.get("y")))) for j in root.iter("junction") if j.get("type") == "traffic_light"]
heads = {}
for cn in root.iter("connection"):
    tl = cn.get("tl")
    if not tl: continue
    lane = f'{cn.get("from")}_{cn.get("fromLane")}'
    if lane in lanes and (tl, lane) not in heads:
        heads[(tl, lane)] = int(cn.get("linkIndex"))

def back_off(shape, dist):
    """Polyline covering the last `dist` metres of a lane, ending at the stop line."""
    out = [shape[-1]]; left = dist
    for a, b in zip(reversed(shape[:-1]), reversed(shape[1:])):
        seg = math.dist(a, b)
        if seg >= left:
            f = left / seg; out.append((b[0] + (a[0]-b[0])*f, b[1] + (a[1]-b[1])*f)); break
        out.append(a); left -= seg
    return list(reversed(out))

head_list = [{"tl": tl, "i": idx, "p": list(tf(*lanes[lane][-1]))} for (tl, lane), idx in heads.items()]


# Signal states, sampled each second.
states = defaultdict(dict)
for ev, el in ET.iterparse(tls_f):
    if el.tag == "tlsState":
        t = float(el.get("time"))
        if T0 <= t < T1 and abs(t - round(t)) < 1e-6:
            states[el.get("id")][int(round(t)) - T0] = el.get("state")
        el.clear()
tl_ids = sorted(states)
tls = {tl: [states[tl].get(k, "") for k in range(T1 - T0)] for tl in tl_ids}

# Vehicle tracks, and queued (stopped) vehicles per edge in 10 s bins for the routing views.
BIN = 10
tracks = {}
queued = defaultdict(lambda: [0] * ((T1 - T0) // BIN))
for ev, el in ET.iterparse(fcd_f, events=("start", "end")):
    if ev == "start" and el.tag == "timestep":
        t = int(round(float(el.get("time")))) - T0
    elif ev == "end" and el.tag == "vehicle":
        v = el.get("id"); x, y = tf(float(el.get("x")), float(el.get("y")))
        tr = tracks.setdefault(v, {"t": t, "k": el.get("type").split("@")[0][:4], "xy": []})
        tr["xy"] += [x, y]
        lane = el.get("lane") or ""
        if not lane.startswith(":") and float(el.get("speed")) < 0.5 and t < T1 - T0:
            queued[lane.rsplit("_", 1)[0]][t // BIN] += 1
        el.clear()
vehicles = [[tr["t"], tr["k"], tr["xy"]] for tr in tracks.values()]

# Directed road graph for routing: one edge per drivable SUMO edge, between junction nodes.
head_lane = {lane: i for i, (tl, lane) in enumerate(heads)}
nodes, graph = {}, []
nid = lambda j: nodes.setdefault(j, len(nodes))
for e in root.iter("edge"):
    if e.get("function") == "internal" or e.get("id") not in edge_lanes: continue
    l0 = next(l for l in e.findall("lane") if l.get("id") in lanes)
    hd = next((head_lane[l] for l in edge_lanes[e.get("id")] if l in head_lane), -1)
    graph.append({"f": nid(e.get("from")), "t": nid(e.get("to")), "len": round(float(l0.get("length")), 1),
                  "v": round(float(l0.get("speed")), 2), "s": flat(lanes[l0.get("id")]), "h": hd,
                  "q": [round(n / BIN, 1) for n in queued[e.get("id")]]})

# Advisory view: a long approach whose signal cycles cleanly in the window.
def greens(k):
    hd = head_list[k]; st = tls.get(hd["tl"], [])
    return [1 if (s[hd["i"]] if len(s) > hd["i"] else "r") in "Gg" else 0 for s in st]
cands = [(g["len"], g["h"]) for g in graph if g["h"] >= 0 and g["len"] > 120]
adv = max(cands, key=lambda c: (sum(1 for a, b in zip(greens(c[1]), greens(c[1])[1:]) if a and not b) >= 3, c[0]))
adv_green = greens(adv[1])

out = {"w": round(W*Q), "h": round(H*Q), "q": Q, "dur": T1 - T0, "bin": BIN, "source": "Athens pNEUMA SUMO, 29 Oct 2018 08:30-09:00, fixed-time signals, t=2100-2400 s",
       "lanes": [flat(sh) for sh in lanes.values()], "signals": signals, "heads": head_list, "tls": tls,
       "graph": graph, "adv": {"len": adv[0], "head": adv[1], "green": adv_green}, "vehicles": vehicles}
assert len(signals) >= 50 and len(head_list) > 100 and len(vehicles) > 1000 and len(tls) >= 50
assert len(graph) > 150 and sum(sum(g["q"]) for g in graph) > 0 and 0 < sum(adv_green) < len(adv_green)
assert all(len(v[2]) % 2 == 0 for v in vehicles)
json.dump(out, open(out_f, "w"), separators=(",", ":"))
print(f"graph {len(graph)} nodes {len(nodes)} adv {adv} lanes {len(lanes)} signals {len(signals)} heads {len(head_list)} tls {len(tls)} vehicles {len(vehicles)} size {W:.0f}x{H:.0f} m")
