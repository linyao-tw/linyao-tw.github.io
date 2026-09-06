/**
 * Canonical facts about the studio: identity, legal registration, contact and
 * location. Everything that must stay consistent between the visible page, the
 * document head and the structured data is defined once, here.
 */

export const site = {
	url: "https://linyao.tw",
	domain: "linyao.tw",

	name: "麟曜數位工作室",
	nameEn: "LINYAO DIGITAL STUDIO",
	shortName: "LINYAO STUDIO",

	/** 統一編號 — Taiwan business administration number */
	taxId: "61051820",

	email: "contact@linyao.tw",

	address: {
		country: "TW",
		countryName: "臺灣",
		city: "臺中市",
		district: "北區",
		street: "健行里華興街47巷6-3號",
		postalCode: "404",
		/** single-line form used in the footer and in structured data */
		full: "臺中市北區健行里華興街47巷6-3號"
	},

	/** 臺中市北區 — used by LocalBusiness geo */
	geo: { latitude: 24.1616, longitude: 120.6742 },

	locale: "zh-Hant-TW",
	lang: "zh-Hant",

	copyrightYear: 2026,
	copyrightHolder: "LINYAO STUDIO",

	ogImage: "/og.png",
	themeColor: "#e5e0d7"
} as const;

/** © 2026 LINYAO STUDIO */
export const copyrightLine = `© ${site.copyrightYear} ${site.copyrightHolder}`;

/** 麟曜數位工作室｜統一編號 61051820 */
export const registrationLine = `統一編號 ${site.taxId}`;
