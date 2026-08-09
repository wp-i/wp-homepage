# Contributing

感谢你关注 WP Portfolio。提交修改前请先阅读根目录的 `AGENTS.md`、`docs/ARCHITECTURE.md` 和 `docs/DESIGN_SYSTEM.md`。

## 开发流程

1. 说明用户可见问题或目标，并列出验收条件。
2. 定位最小拥有者：内容、token、组件、交互 hook 或构建配置。
3. 避免复制 MiMo 或其他参考站的源码与资产。
4. 完成后运行：

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

视觉修改请验证 Chrome 的 1024×768、1280×720、1366×768、1440×900、1920×1080，以及 Edge、Firefox、WebKit 的 1366×768。项目仅支持桌面端，不添加移动端断点、触控专用交互或移动浏览器测试；同时检查键盘导航和 `prefers-reduced-motion`。

## 内容边界

项目能力描述必须能被对应公开仓库支持。不要添加未经确认的履历、联系方式、项目数据、star 数或发布状态。
