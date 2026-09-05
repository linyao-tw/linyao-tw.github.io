import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://linyao.tw",
	fonts: [
		{
			// Technical notation only. GenKiGothicTW carries everything else and is
			// loaded from font.emtech.cc in the document head.
			name: "Noto Sans Mono",
			cssVariable: "--font-noto-sans-mono",
			provider: fontProviders.google(),
			weights: [400, 500, 700],
			styles: ["normal"],
			subsets: ["latin"],
			display: "swap",
			fallbacks: ["ui-monospace", "SFMono-Regular", "Menlo"],
			optimizedFallbacks: false
		}
	]
});
