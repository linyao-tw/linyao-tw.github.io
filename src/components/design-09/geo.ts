/**
 * design-09 — ORGANIC GEOMETRY
 * Procedural path generators for the topographic contour system, the waveform
 * rules and the flowing ribbon. Everything is drawn: sampled sinusoids turned
 * into hard-edged SVG geometry. No blobs, no blur, no random noise.
 */

export type Pt = [number, number];
export type Layer = { amp: number; freq: number; phase: number };

const r = (n: number) => Math.round(n * 100) / 100;

/**
 * Coordinate rounding. Two decimals suits the 100-unit viewBoxes the wave rules
 * are drawn in; the contour fields use 640–1000-unit viewBoxes where a decimal
 * is already far below a device pixel, so they pass `precision: 1` and halve
 * their path data for no visible change.
 */
const round = (n: number, p: number) => {
	const m = 10 ** p;
	return Math.round(n * m) / m;
};

/** Sum of sinusoids over a normalised parameter t (0..1). */
export function osc(t: number, layers: Layer[], base = 0): number {
	let v = base;
	for (const l of layers) v += l.amp * Math.sin(t * Math.PI * 2 * l.freq + l.phase);
	return v;
}

/** Catmull-Rom -> cubic bezier. Used for contour lines and ribbon edges. */
export function smoothD(pts: Pt[], opts: { closed?: boolean; start?: "M" | "L"; precision?: number } = {}): string {
	const n = pts.length;
	if (n < 2) return "";
	const closed = opts.closed ?? false;
	const at = (i: number): Pt => (closed ? pts[((i % n) + n) % n] : pts[Math.min(Math.max(i, 0), n - 1)]);
	const q = (v: number) => round(v, opts.precision ?? 2);
	let d = `${opts.start ?? "M"}${q(pts[0][0])},${q(pts[0][1])}`;
	const last = closed ? n : n - 1;
	for (let i = 0; i < last; i++) {
		const p0 = at(i - 1);
		const p1 = at(i);
		const p2 = at(i + 1);
		const p3 = at(i + 2);
		d += ` C${q(p1[0] + (p2[0] - p0[0]) / 6)},${q(p1[1] + (p2[1] - p0[1]) / 6)}`;
		d += ` ${q(p2[0] - (p3[0] - p1[0]) / 6)},${q(p2[1] - (p3[1] - p1[1]) / 6)}`;
		d += ` ${q(p2[0])},${q(p2[1])}`;
	}
	return closed ? `${d} Z` : d;
}

/** Straight-segment polyline — the literal "sampled waveform" used for rules. */
export function polyD(pts: Pt[], start: "M" | "L" = "M"): string {
	return `${start}${pts.map(p => `${r(p[0])},${r(p[1])}`).join(" L")}`;
}

/** Horizontal sampled wave: y = f(x). */
export function waveLine(o: { width?: number; base?: number; layers: Layer[]; samples?: number; from?: number; to?: number }): Pt[] {
	const w = o.width ?? 1000;
	const from = o.from ?? 0;
	const to = o.to ?? w;
	const n = o.samples ?? 64;
	const pts: Pt[] = [];
	for (let i = 0; i <= n; i++) {
		const x = from + ((to - from) * i) / n;
		pts.push([x, osc(x / w, o.layers, o.base ?? 0)]);
	}
	return pts;
}

/** A sampled waveform rule, ready to drop into an SVG as one path. */
export function waveRule(o: { width?: number; base?: number; layers: Layer[]; samples?: number }): string {
	return polyD(waveLine({ samples: o.samples ?? 120, ...o }));
}

/** Stacked ridge contours — nested offset lines, like a slope on a terrain map. */
export function ridge(o: { width?: number; count: number; top: number; gap: number; layers: Layer[]; drift?: number; falloff?: number; samples?: number }): string[] {
	const out: string[] = [];
	const denom = Math.max(1, o.count - 1);
	for (let i = 0; i < o.count; i++) {
		const k = i / denom;
		const layers = o.layers.map(l => ({
			amp: l.amp * (1 + (o.falloff ?? -0.5) * k),
			freq: l.freq,
			phase: l.phase + (o.drift ?? 0.5) * k
		}));
		out.push(smoothD(waveLine({ width: o.width, base: o.top + o.gap * i, layers, samples: o.samples ?? 40 }), { precision: 1 }));
	}
	return out;
}

/** Nested closed contours — a hill / depression on a terrain map. Authored around (0,0). */
export function peak(o: { r0: number; count: number; step: number; wob?: Layer[]; growth?: number; squash?: number; samples?: number; spin?: number }): string[] {
	const wob = o.wob ?? [
		{ amp: 0.15, freq: 3, phase: 0.4 },
		{ amp: 0.075, freq: 5, phase: 2.1 },
		{ amp: 0.05, freq: 2, phase: 4.2 }
	];
	const sq = o.squash ?? 1;
	const n = o.samples ?? 48;
	const denom = Math.max(1, o.count - 1);
	const out: string[] = [];
	for (let i = 0; i < o.count; i++) {
		const rad = o.r0 + o.step * i;
		const k = i / denom;
		const pts: Pt[] = [];
		for (let j = 0; j < n; j++) {
			const a = (j / n) * Math.PI * 2;
			let m = 1;
			for (const l of wob) m += l.amp * (1 + (o.growth ?? 0.55) * k) * Math.sin(a * l.freq + l.phase + k * (o.spin ?? 0.85));
			pts.push([Math.cos(a) * rad * m, Math.sin(a) * rad * m * sq]);
		}
		out.push(smoothD(pts, { closed: true, precision: 1 }));
	}
	return out;
}

type Num = number | ((t: number) => number);
const val = (v: Num, t: number) => (typeof v === "function" ? v(t) : v);

/** A vertical flowing band: closed path down the left edge and back up the right. */
export function vRibbon(o: { height?: number; samples?: number; centre: Num; width: Num }): { fill: string; edge: string } {
	const h = o.height ?? 1000;
	const n = o.samples ?? 110;
	const left: Pt[] = [];
	const right: Pt[] = [];
	for (let i = 0; i <= n; i++) {
		const t = i / n;
		const y = t * h;
		const c = val(o.centre, t);
		const w = val(o.width, t);
		left.push([c - w / 2, y]);
		right.push([c + w / 2, y]);
	}
	const back = right.slice().reverse();
	const fill = `${smoothD(left)} ${smoothD(back, { start: "L" })} Z`;
	return { fill, edge: smoothD(right) };
}

/** A horizontal flowing band. */
export function hRibbon(o: { width?: number; samples?: number; centre: Num; thickness: Num }): { fill: string; edge: string } {
	const w = o.width ?? 1000;
	const n = o.samples ?? 110;
	const top: Pt[] = [];
	const bottom: Pt[] = [];
	for (let i = 0; i <= n; i++) {
		const t = i / n;
		const x = t * w;
		const c = val(o.centre, t);
		const th = val(o.thickness, t);
		top.push([x, c - th / 2]);
		bottom.push([x, c + th / 2]);
	}
	const back = bottom.slice().reverse();
	const fill = `${smoothD(top)} ${smoothD(back, { start: "L" })} Z`;
	return { fill, edge: smoothD(top) };
}
