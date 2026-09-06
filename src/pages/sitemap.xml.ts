import type { APIRoute } from "astro";
import { site } from "../lib/site";

/** Every indexable route. 404 is intentionally absent. */
const routes = [
	{ path: "/", changefreq: "monthly", priority: "1.0" },
	{ path: "/products", changefreq: "monthly", priority: "0.8" }
];

export const GET: APIRoute = () => {
	const lastmod = new Date().toISOString().slice(0, 10);
	const urls = routes
		.map(
			r => `	<url>
		<loc>${new URL(r.path, site.url).href}</loc>
		<lastmod>${lastmod}</lastmod>
		<changefreq>${r.changefreq}</changefreq>
		<priority>${r.priority}</priority>
	</url>`
		)
		.join("\n");

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
		{ headers: { "Content-Type": "application/xml; charset=utf-8" } }
	);
};
