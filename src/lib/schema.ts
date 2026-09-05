/**
 * Schema.org structured data. Emitted as a single @graph so the organisation,
 * the site and the page are linked by @id rather than repeated.
 */

import { brand, process as howWeWork, services } from "./copy";
import { site } from "./site";

const ORG = `${site.url}/#organization`;
const WEBSITE = `${site.url}/#website`;

type Page = {
	/** absolute URL of the page */
	url: string;
	title: string;
	description: string;
	/** page-level @type, defaults to WebPage */
	type?: string;
};

export function buildSchema(page: Page) {
	const organization = {
		"@type": ["Organization", "LocalBusiness", "ProfessionalService"],
		"@id": ORG,
		name: site.name,
		alternateName: [site.nameEn, site.shortName],
		legalName: site.name,
		taxID: site.taxId,
		vatID: site.taxId,
		url: site.url,
		email: `mailto:${site.email}`,
		slogan: brand.equation,
		description: brand.disciplines,
		inLanguage: site.locale,
		image: new URL(site.ogImage, site.url).href,
		logo: {
			"@type": "ImageObject",
			url: new URL("/favicon.svg", site.url).href,
			caption: site.nameEn
		},
		address: {
			"@type": "PostalAddress",
			streetAddress: site.address.street,
			addressLocality: site.address.district,
			addressRegion: site.address.city,
			postalCode: site.address.postalCode,
			addressCountry: site.address.country
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: site.geo.latitude,
			longitude: site.geo.longitude
		},
		areaServed: { "@type": "Country", name: site.address.countryName },
		knowsLanguage: ["zh-Hant", "en"],
		contactPoint: {
			"@type": "ContactPoint",
			contactType: "sales",
			email: `mailto:${site.email}`,
			availableLanguage: ["zh-Hant", "en"]
		},
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: brand.disciplines,
			itemListElement: services.items.map((s, i) => ({
				"@type": "Offer",
				position: i + 1,
				itemOffered: {
					"@type": "Service",
					name: `${s.zh} ${s.en}`,
					alternateName: s.en,
					description: s.body.join(""),
					serviceType: s.en,
					provider: { "@id": ORG }
				}
			}))
		}
	};

	const website = {
		"@type": "WebSite",
		"@id": WEBSITE,
		url: site.url,
		name: `${site.name} ${site.nameEn}`,
		description: page.description,
		inLanguage: site.locale,
		publisher: { "@id": ORG },
		copyrightYear: site.copyrightYear,
		copyrightHolder: { "@id": ORG }
	};

	const webPage = {
		"@type": page.type ?? "WebPage",
		"@id": `${page.url}#webpage`,
		url: page.url,
		name: page.title,
		description: page.description,
		inLanguage: site.locale,
		isPartOf: { "@id": WEBSITE },
		about: { "@id": ORG },
		primaryImageOfPage: new URL(site.ogImage, site.url).href
	};

	/** 01 DISCOVER … 05 LAUNCH as an ordered, describable process */
	const howTo = {
		"@type": "HowTo",
		"@id": `${site.url}/#process`,
		name: howWeWork.headlineParts.join(""),
		description: howWeWork.kicker,
		inLanguage: site.locale,
		step: howWeWork.steps.map((s, i) => ({
			"@type": "HowToStep",
			position: i + 1,
			name: `${s.index} ${s.en}`,
			text: s.zh
		}))
	};

	return { "@context": "https://schema.org", "@graph": [organization, website, webPage, howTo] };
}
