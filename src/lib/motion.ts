/**
 * Shared motion runtime for every design version.
 *
 * Rules this module enforces so ten independent versions cannot drift:
 *   - prefers-reduced-motion is honoured before any timeline is created
 *   - Lenis is instantiated at most once per page and driven by the GSAP ticker
 *   - every animation lives in a gsap.context() that is reverted on pagehide
 *
 * Usage inside a component's <script>:
 *
 *   import { motion } from "../../lib/motion";
 *   motion(({ gsap, ScrollTrigger }) => {
 *     gsap.from(".thing", { yPercent: 20, opacity: 0, scrollTrigger: ".thing" });
 *   }, { smooth: true });
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function prefersReducedMotion(): boolean {
	return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

let lenis: Lenis | null = null;
let tickerFn: ((time: number) => void) | null = null;

/** Smooth scrolling, opt-in, single instance, ticker-driven, ScrollTrigger-synced. */
export function initSmoothScroll(): Lenis | null {
	if (prefersReducedMotion()) return null;
	if (lenis) return lenis;

	lenis = new Lenis({
		duration: 1.05,
		easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true,
		syncTouch: false,
		touchMultiplier: 1.6
	});

	lenis.on("scroll", ScrollTrigger.update);
	tickerFn = (time: number) => lenis?.raf(time * 1000);
	gsap.ticker.add(tickerFn);
	gsap.ticker.lagSmoothing(0);

	window.addEventListener("pagehide", destroySmoothScroll, { once: true });

	return lenis;
}

export function destroySmoothScroll(): void {
	if (tickerFn) gsap.ticker.remove(tickerFn);
	tickerFn = null;
	lenis?.destroy();
	lenis = null;
}

type MotionApi = {
	gsap: typeof gsap;
	ScrollTrigger: typeof ScrollTrigger;
	lenis: Lenis | null;
	reduced: boolean;
};

type MotionOptions = {
	/** enable Lenis smooth scrolling for this page (one page-level opt-in is enough) */
	smooth?: boolean;
	/** scope selector or element for the gsap.context */
	scope?: Element | string | null;
	/** run the callback even when the user asked for reduced motion (rare; must degrade gracefully) */
	always?: boolean;
};

/**
 * Register a set of animations. Returns a revert function; the context is also
 * reverted automatically on pagehide so nothing leaks between navigations.
 */
export function motion(setup: (api: MotionApi) => void, options: MotionOptions = {}): () => void {
	const reduced = prefersReducedMotion();
	if (reduced && !options.always) return () => {};

	const l = options.smooth && !reduced ? initSmoothScroll() : null;
	const ctx = gsap.context(() => setup({ gsap, ScrollTrigger, lenis: l, reduced }), options.scope ?? undefined);

	const revert = () => ctx.revert();
	window.addEventListener("pagehide", revert, { once: true });
	return revert;
}

/** Media-query aware helper: run `setup` only while the query matches. */
export function motionAt(query: string, setup: (api: MotionApi) => void, options: MotionOptions = {}): void {
	if (prefersReducedMotion() && !options.always) return;
	const mm = gsap.matchMedia();
	mm.add(query, () => {
		setup({ gsap, ScrollTrigger, lenis: options.smooth ? initSmoothScroll() : null, reduced: false });
	});
	window.addEventListener("pagehide", () => mm.revert(), { once: true });
}

/** Anchor links that respect Lenis when it is active. */
export function bindAnchorScroll(root: ParentNode = document): void {
	root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(a => {
		a.addEventListener("click", event => {
			const id = a.getAttribute("href");
			if (!id || id === "#") return;
			const target = document.querySelector(id);
			if (!target) return;
			event.preventDefault();
			if (lenis) lenis.scrollTo(target as HTMLElement, { offset: 0 });
			else target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
		});
	});
}
