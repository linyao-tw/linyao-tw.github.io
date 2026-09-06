# 麟曜數位工作室 LINYAO DIGITAL STUDIO

官方網站 — [linyao.tw](https://linyao.tw)

Astro 靜態網站，無框架前端。動態使用 GSAP + Lenis，字體為 GenKiGothicTW（CJK 與 Latin）搭配自架的 Noto Sans Mono。

## 開發

需要 Node >= 22.12 與 pnpm。

```bash
pnpm install
pnpm dev        # 本機開發
pnpm build      # 產出到 dist/
pnpm preview    # 預覽 build 結果
pnpm test       # astro check：型別與模板檢查
pnpm format     # Prettier
```

## 結構

```
src/
  layouts/BaseLayout.astro    HTML 外殼、字體、SEO
  components/
    layout/                   Header、Footer
    sections/                 首頁各區塊
    ui/                       詢案表單、全站動態
    seo/Seo.astro             meta、Open Graph、JSON-LD
  lib/
    site.ts                   品牌、統編、地址、聯絡資訊
    copy.ts                   全站文案（來源為 text.md）
    products.ts               產品列表
    schema.ts                 Schema.org 結構化資料
    motion.ts                 共用 GSAP／Lenis（含 reduced-motion）
  pages/                      /、/products、404、robots.txt、sitemap.xml
  styles/                     global.css（reset 與品牌色）、tokens.css
```

## 內容維護

| 要改什麼          | 改哪裡                                                                      |
| ----------------- | --------------------------------------------------------------------------- |
| 文案              | `src/lib/copy.ts`（原始文案在 `text.md`）                                   |
| 統編、地址、Email | `src/lib/site.ts`                                                           |
| 新增產品          | 在 `src/lib/products.ts` 加一筆，`/products`、sitemap、結構化資料會自動跟上 |
| 詢案表單欄位      | `src/lib/copy.ts` 的 `inquiry`，`entry.*` 對應 Google 表單題目              |

品牌色定義在 `src/styles/global.css`：Warm Gray `#D3CCC1`、Graphite `#4D4D4D`、Orange Red `#FE3300`。小字不使用純橘色（對比不足），改用衍生的 `--accent-txt`。

## 部署

推上 `main` 後由 GitHub Actions 自動部署到 GitHub Pages，網域 `linyao.tw`（`public/CNAME`）。

- `.github/workflows/ci.yml` — 格式、型別、build 檢查，所有分支與 PR
- `.github/workflows/deploy.yml` — 僅 `main`

`brainstorming` 分支保留當初十個設計方向的探索版本。
