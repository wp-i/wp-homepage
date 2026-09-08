# WP Homepage

WP 的单页作品集，核心句是「做有用的软件」。页面用中文建立主层级，平等展示六个小而美的小切口工具的简介、特点与真实链接；采用暖白底、原创 WP 视觉，并使用克制酸橙强调色。

## 展示项目

1. [webArt](https://github.com/wp-i/webArt)：工业化的高质量网页设计呈现。
2. [comment-vision-claw](https://github.com/wp-i/comment-vision-claw)：关键词热评抓取、截图与 PDF；本地依赖和登录，AI 分析只解释假设。
3. [tft-trait-atlas](https://wp-i.github.io/tft-trait-atlas/)：8–11 人口多纹章解算并复制代码。
4. [github-deep-search](https://github.com/wp-i/github-deep-search)：研发中，README 语义验收尚未关闭。
5. [swordshield-notes](https://github.com/wp-i/swordshield-notes)：早期版本，含 `v0.1.0` Windows x64 安装包。
6. [nodestitch](https://github.com/wp-i/nodestitch)：原型，暂无公开 release。

项目以真实可核查门槛、独特视角、表现力和互动/交流价值编排，详见 [`docs/PROJECT_SELECTION.md`](docs/PROJECT_SELECTION.md)。

## 开发

需要 Node.js 22.12 或更高版本：

```bash
npm install
npm run dev
```

可运行的检查：

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

首次运行 E2E 前执行 `npx playwright install`。生产发布沿用现有 GitHub Pages；本项目不需要后端、账号、analytics 或 secrets。

## 约束

保持静态 React/Vite、严格 TypeScript、真实外链、语义 HTML、键盘可用、响应式布局和 reduced-motion 支持。发布前按 [`AGENTS.md`](AGENTS.md) 的验证矩阵检查；README 不宣称未实际测试的覆盖或性能。

## License

[MIT](LICENSE)

TFT 可在页面内的弹窗打开真实工具，也可直接前往独立站点。
嵌入内容只在点击后加载，关闭即移除。页面在作品目录后结束，顶部保留 GitHub 入口。
