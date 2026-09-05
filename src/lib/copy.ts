/**
 * Canonical copy for LINYAO DIGITAL STUDIO, transcribed from /text.md.
 *
 * Every design version imports from here so the brand language stays identical
 * across all ten directions. Versions may re-order, shorten, split lines or add
 * small English microcopy for their own composition — but the meaning and the
 * core strings below must survive intact.
 */

export const brand = {
	nameZh: "麟曜數位工作室",
	nameEn: "LINYAO DIGITAL STUDIO",
	short: "LINYAO",
	equation: "DESIGN × CODE × MOTION",
	disciplines: "品牌設計・網頁設計・系統開發",
	email: "contact@linyao.tw",
	copyright: "© LINYAO DIGITAL STUDIO"
} as const;

export const hero = {
	headline: "創造令人驚艷的數位體驗",
	/** hand-broken for large display settings: 創造 / 令人驚艷的 / 數位體驗 */
	headlineParts: ["創造", "令人驚艷的", "數位體驗"],
	scrollCue: "SCROLL TO EXPLORE ↓"
} as const;

export const intro = {
	headline: "你敢想像，我們敢做出來。",
	headlineParts: ["你敢想像，", "我們敢做出來。"],
	body: ["麟曜是一間以設計與技術為核心的獨立數位工作室。", "結合設計、程式與動態特效，", "把想法變成真正能被看見、操作與感受的體驗。"]
} as const;

export const services = {
	lead: "我們提供涵蓋視覺、品牌、網站與技術開發的完整數位設計服務。",
	items: [
		{
			index: "01",
			en: "WEB DEVELOPMENT",
			zh: "網頁開發",
			position: "對外的網站與 Web App",
			body: ["從品牌官網、互動網站到 Web Application，", "打造兼具效能、體驗與完整功能的網頁產品。"],
			stack: ["Front-End", "Back-End", "Web App", "API", "CMS", "Deployment"]
		},
		{
			index: "02",
			en: "SYSTEM DEVELOPMENT",
			zh: "系統開發",
			position: "對內或營運用的商業系統",
			body: ["依照實際營運流程，", "開發行政管理、資料整合、遠端控制與各類客製系統。"],
			stack: ["Admin System", "Dashboard", "Remote Control", "API", "Automation", "Custom System"]
		},
		{
			index: "03",
			en: "CREATIVE DEVELOPMENT",
			zh: "創意開發",
			position: "互動、動態、實驗性數位體驗",
			body: ["結合程式、互動與視覺，", "把技術轉化成令人記住的數位體驗。"],
			stack: ["WebGL", "Three.js", "Canvas", "Motion", "Interaction", "Creative Coding"]
		}
	]
} as const;

export const manifesto = {
	headlineParts: ["我們不做網站", "我們創造體驗"],
	body: ["好的網站讓人看懂。", "更好的網站，讓人想繼續探索。", "而真正好的體驗，", "在離開之後依然會被記得。"],
	credibility: [
		{ figure: "10+", label: "網頁開發經驗", en: "YEARS OF WEB DEVELOPMENT" },
		{ figure: "GLOBAL", label: "橫掃全球網頁開發獎項肯定", en: "INTERNATIONAL AWARDS" },
		{ figure: "AWWWARDS", label: "國際頂尖網頁設計獎項 Awwwards 常態評審", en: "STANDING JURY MEMBER" }
	]
} as const;

export const process = {
	kicker: "How we work",
	headline: "讓想法 --- 一一實現",
	headlineParts: ["讓想法", "一一實現"],
	steps: [
		{ index: "01", en: "DISCOVER", zh: "探索需求與方向" },
		{ index: "02", en: "DEFINE", zh: "定義策略與架構" },
		{ index: "03", en: "DESIGN", zh: "設計視覺與互動" },
		{ index: "04", en: "DEVELOP", zh: "程式開發與實作" },
		{ index: "05", en: "LAUNCH", zh: "測試與產品上線" }
	]
} as const;

export const capabilities = [
	"BRAND IDENTITY",
	"GRAPHIC DESIGN",
	"ART DIRECTION",
	"UI / UX",
	"WEB DESIGN",
	"MOTION DESIGN",
	"FRONT-END",
	"BACK-END",
	"CREATIVE CODING",
	"WEBGL",
	"INTERACTION",
	"CMS",
	"PERFORMANCE",
	"SEO"
] as const;

export const cta = {
	headline: "有想法？讓我們一起實現。",
	headlineParts: ["有想法？", "讓我們一起實現。"],
	body: ["無論是品牌、網站、活動，", "或是一個你還不知道該怎麼實現的瘋狂想法。", "讓我們來一起實現。"],
	button: "我要詢案 ↗",
	buttonLabel: "我要詢案"
} as const;

export const nav = [
	{ label: "ABOUT", zh: "關於", href: "#intro" },
	{ label: "SERVICES", zh: "服務", href: "#services" },
	{ label: "WORK", zh: "觀點", href: "#manifesto" },
	{ label: "PROCESS", zh: "流程", href: "#process" },
	{ label: "CONTACT", zh: "聯絡", href: "#contact" }
] as const;

/** Inquiry form fields — used by every version's contact dialog. */
export const inquiryFields = [
	{ name: "name", label: "姓名 / NAME", type: "text", required: true, autocomplete: "name" },
	{ name: "email", label: "信箱 / EMAIL", type: "email", required: true, autocomplete: "email" },
	{ name: "company", label: "公司・單位 / COMPANY", type: "text", required: false, autocomplete: "organization" },
	{ name: "budget", label: "預算範圍 / BUDGET", type: "text", required: false, autocomplete: "off" }
] as const;
