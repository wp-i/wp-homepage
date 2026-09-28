# Portfolio project selection

状态：必需。意图版本：2026-09-07（取代旧的分数门槛与自动排序规则）。

作品集面向交流，平等呈现六个从小切口出发的小工具，以简介、特点和真实链接帮助访客理解项目。不设精选、更多或代表作层级；展示顺序由编辑判断决定，不由工程评分自动排序。

## 先过事实门槛

项目必须有稳定公开 GitHub URL，源码或可核查产物真实存在；问题、用户、约束、输出、运行边界与限制可诚实说明；无凭据、隐私、许可证或署名风险。每条公开陈述在 typed project data 中附 `reviewedAt` 日期和 `sourceUrl`。GitHub star 不是质量扣分项，陌生 star 只作为兴趣信号。

## 编排依据

门槛通过后，按以下顺序评估并记录简短证据：

1. 独特视角：是否提出清楚、有个人判断的问题切口？
2. 表现力：是否能用清楚的简介、可运行 demo 或 code-native 展示让人快速理解？
3. 互动与交流价值：是否能引发试用、追问或技术讨论？
4. 技术可信度：架构、边界、测试、发布和限制是否有证据？

## 当前项目与事实

| 项目 | 页面定位 | 事实依据（截至） |
| --- | --- | --- |
| [webArt](https://github.com/wp-i/webArt) | 工业化的高质量网页设计呈现 | [源码与说明](https://github.com/wp-i/webArt)，2026-09-08 |
| [comment-vision-claw](https://github.com/wp-i/comment-vision-claw) | 关键词热评抓取、截图/PDF；本地依赖与登录；AI 仅解释假设 | [仓库](https://github.com/wp-i/comment-vision-claw)，2026-09-07 |
| [tft-trait-atlas](https://github.com/wp-i/tft-trait-atlas) | 在线 8–11 人口多纹章解算器，可复制代码 | [在线页](https://wp-i.github.io/tft-trait-atlas/)，2026-09-07 |
| [Reelink](https://github.com/wp-i/reelink) | Windows 本地二维码识别、影视更名预览与持久化撤销、自定义资源入口；无运行时 LLM/遥测；`0.1.9` 源码已公开，该版本暂无 Release 安装包 | [README](https://github.com/wp-i/reelink/blob/37feeebc1e97f6456d14e70c79d56a942d9a9577/README.md) 与 [功能约定](https://github.com/wp-i/reelink/blob/37feeebc1e97f6456d14e70c79d56a942d9a9577/docs/CONTRACT.md)，2026-09-28 |
| [swordshield-notes](https://github.com/wp-i/swordshield-notes) | 早期版本；有 releases/tag `v0.1.0` 与 Windows x64 安装包 | [仓库](https://github.com/wp-i/swordshield-notes)，2026-09-07 |
| [nodestitch](https://github.com/wp-i/nodestitch) | 原型；暂无公开 release | [仓库](https://github.com/wp-i/nodestitch)，2026-09-07 |

新增项目须重新核查全表，更新 typed data 与本文件的日期和来源。

## 2026-09-28 排序复核

当前顺序：webArt → comment-vision-claw → tft-trait-atlas → Reelink → swordshield-notes → nodestitch。

Reelink 的编辑评级为“完整的实用工具，展示优先级中上”，放在第四位。此评级是结合上述编排标准的编辑判断，不是性能评分，也不按最近开发时间自动置顶。

- 洞察与表现力：本地扫码与安全整理文件的价值明确，但切口较常见；前三项分别呈现可重复的设计生产方法、评论的原始语境、从纹章条件出发的组合求解，更容易引发对方法的讨论。
- 可体验程度：Reelink 0.1.9 源码已公开、已在 Windows 本机验证，但尚无该版本的公开安装包，也没有在线体验。TFT 可直接在线尝试，webArt 有可下载源码模板；comment-vision-claw 虽也有本地依赖和登录门槛，仍因语境观察和报告输出的独特视角保留靠前位置。
- 技术完成度：Reelink 已形成识别、预览、更名、持久化撤销和隔离资源页的功能闭环，较剑盾纪事的早期版本及节点时间线原型有更充分的工程验证，因此应排在这两项之前。依据 [Reelink 验证记录](https://github.com/wp-i/reelink/blob/37feeebc1e97f6456d14e70c79d56a942d9a9577/docs/VALIDATION.md)，2026-09-28。

只调整 Reelink 的位置，其他项目相对顺序、事实与核查日期不变；所有项目继续使用同一展示样式。
