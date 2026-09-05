import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://linyao.tw",
	fonts: [
		{
			// Latin display and UI
			name: "Noto Sans",
			cssVariable: "--font-noto-sans",
			provider: fontProviders.google(),
			weights: [400, 500, 700, 800],
			styles: ["normal"],
			subsets: ["latin"],
			display: "swap",
			fallbacks: ["Helvetica Neue", "Helvetica", "Arial"],
			optimizedFallbacks: false
		},
		{
			// Traditional Chinese
			name: "Noto Sans TC",
			cssVariable: "--font-noto-sans-tc",
			provider: fontProviders.google(),
			weights: [400, 700, 900],
			styles: ["normal"],
			display: "swap",
			fallbacks: ["PingFang TC", "Hiragino Sans", "Microsoft JhengHei", "sans-serif"],
			optimizedFallbacks: false
		},
		{
			// Technical notation
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
