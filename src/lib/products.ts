/**
 * Studio products. Each entry becomes one row on /products; the visual block
 * is a flat brand tone until real artwork exists.
 */

export const products = [
	{
		index: "01",
		name: "HUAN",
		nameZh: "讙",
		host: "huan.linyao.tw",
		url: "https://huan.linyao.tw",
		summary: "跨平台的雲端媒體播放與數位看板系統",
		body: [
			"跨平台的雲端媒體播放與數位看板系統，支援影片、圖片與文字內容，並可從遠端集中上傳、排程、同步與管理多台播放裝置。",
			"支援 Raspberry Pi 與 Windows，內容可快取於本機，即使網路中斷也能持續穩定播放。"
		]
	}
] as const;

export const productsPage = {
	title: "產品",
	lead: "我們自己開發、自己維運的數位產品。"
} as const;
