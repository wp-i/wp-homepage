# WP Portfolio agent rules

本文件按 2026-09-07 用户新意图重写，明确取代旧的 MiMo 强制、纯文字项目展示、固定同布局与分数自动排序门禁。目标是展示有洞察、亮点、惊艳的小工具，激发交流。

## 产品与内容

- 单页静态 React/Vite 个人站，公开身份只写 `WP`；核心句保持 `做有用的软件`。
- 中文负责 hero、导航、section 标签与 CTA；项目标题保留 canonical English 名称，并可有中文语境。
- 主导航只指向实际内容；正常纵向滚动，不加路由、标签页、轮播或空章节。
- 保留暖白底、克制留白与编辑感；使用简介、特点、真实链接和克制酸橙强调色。取消 MiMo 强制对齐，保持原创 WP 识别。
- 六个项目平等展示为小而美的小切口工具，按洞察与交流价值编排，不设“精选/更多/代表作”层级。TFT 保留轻量页内体验按钮与真实 dialog；不在首页展示 webArt 或 TFT 截图。
- 展示 `tft-trait-atlas`、`comment-vision-claw`、`webArt`、`github-deep-search`（研发中）、`swordshield-notes`（早期版本）、`nodestitch`（原型）。所有外链必须真实、键盘可访问且新窗口使用 `rel="noreferrer"`。
- 所有 public statement 写明日期与 `sourceUrl`。低 star 不扣分；陌生 star 仅作兴趣信号，不得替代代码、运行、发布或限制证据。

## 工程与交付

- 保持 static React/Vite、严格 TypeScript、无 credentials/analytics/backend、无未经必要说明的依赖；项目数据集中存放，组件不重复事实。
- 共享 token 管理设计值；语义 HTML、可见 focus、WCAG AA、360–2560 响应式、reduced-motion、无横向溢出、无滚动劫持与自动播放。
- 保持 `dev`、`build`、`lint`、`typecheck`、`test`、`test:e2e` 脚本语义稳定。
- 发布沿用现有 GitHub Pages；未经用户要求不得迁移或另建 host。不得提交凭据、环境文件、浏览器 profile 或依赖目录。

## 变更流程

首次实现前读取相关文件，标注变更类别、用户可见不变量、验收清单和最小 owning layer；一次性修改 owner 并移除过时路径。完成后运行相关 lint/typecheck/test/build 与真实浏览器检查，记录未验证假设。

## 验证矩阵

发布前覆盖 Chrome：360×800、390×844、430×932、1024×768、1280×720、1366×768、1440×900、1920×1080；并在 390×844 移动 WebKit、1366×768 的 Edge/Firefox/WebKit 检查。验证键盘、外链、reduced-motion、控制台/网络、无断图与 Lighthouse（或等价审计）。不宣称未实际测试的覆盖或性能。

## 开源卫生

README、许可证与第三方署名保持准确；不得编造能力、雇主、指标、发布状态或项目关系。项目与选择政策的事实均须可由链接仓库核查。
