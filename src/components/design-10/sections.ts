/**
 * design-10 — the spatial index.
 *
 * Nine movements, nine ids. This array is the single source of truth for the
 * fixed edge index, the mobile menu, the HUD readout and the ScrollTrigger
 * indexing, so the navigation can never drift from the document.
 */

export type Movement = {
	n: string;
	id: string;
	en: string;
	zh: string;
	/** ground of the movement — drives nothing but the HUD tick styling */
	tone: "light" | "dark";
};

export const sections: Movement[] = [
	{ n: "01", id: "hero", en: "COVER", zh: "封面", tone: "light" },
	{ n: "02", id: "intro", en: "INTRO", zh: "關於麟曜", tone: "light" },
	{ n: "03", id: "services", en: "SERVICES", zh: "服務範圍", tone: "light" },
	{ n: "04", id: "web", en: "WEB DEVELOPMENT", zh: "網頁開發", tone: "dark" },
	{ n: "05", id: "system", en: "SYSTEM DEVELOPMENT", zh: "系統開發", tone: "light" },
	{ n: "06", id: "creative", en: "CREATIVE DEVELOPMENT", zh: "創意開發", tone: "light" },
	{ n: "07", id: "manifesto", en: "MANIFESTO", zh: "觀點", tone: "dark" },
	{ n: "08", id: "process", en: "PROCESS", zh: "工作流程", tone: "light" },
	{ n: "09", id: "contact", en: "CONTACT", zh: "聯絡", tone: "light" }
];

export const total = String(sections.length).padStart(2, "0");
