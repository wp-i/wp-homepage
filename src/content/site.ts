export type SectionId = 'top' | 'work';
export type Project = {
  readonly slug: string;
  readonly title: string;
  readonly chineseTitle: string;
  readonly category: string;
  readonly status: string;
  readonly hook: string;
  readonly description: string;
  readonly insight: string;
  readonly boundary: string;
  readonly reviewedAt: string;
  readonly sourceUrl: string;
  readonly links: readonly { label: string; href: string; primary?: boolean }[];
  readonly facts: readonly string[];
};
const projects: readonly Project[] = [
  {
    slug: 'webart', title: 'webArt', chineseTitle: '工业化的高质量网页设计呈现',
    category: '网页 × 设计生产', status: '可下载源码',
    hook: '让好设计，\n稳定地做出来。',
    description: '围绕高质量网页呈现，探索从参考筛选、设计拆解、素材准备，到实现、验收与源码交付的可重复流程。用具体页面验证这套方法。',
    insight: '一次做出好看的页面之后，能否持续交付同等水准？webArt 将参考、素材、整页质量与交付检查记录下来，让设计生产有可复用的方法和可核查的结果。',
    boundary: '目前以两套静态网页及源码包验证流程，尚未证明规模化产能，也未确认公开在线预览。部分导航与联系标签需接入实际功能；素材使用遵循各模板条款。',
    reviewedAt: '2026-09-08', sourceUrl: 'https://github.com/wp-i/webArt',
    links: [
      { label: '查看模板与源码', href: 'https://github.com/wp-i/webArt', primary: true },
      { label: '下载光影模板', href: 'https://github.com/wp-i/webArt/raw/refs/heads/main/public/weight-of-light-source.zip' },
      { label: '下载空间模板', href: 'https://github.com/wp-i/webArt/raw/refs/heads/main/public/objects-in-field-source.zip' },
    ],
    facts: ['参考与素材规范', '整页质量验收', '可编辑源码交付'],
  },
  {
    slug: 'comment-vision-claw', title: 'comment-vision-claw', chineseTitle: '热评视界',
    category: '内容 × 语境观察', status: '本地工具',
    hook: '有时，值得研究的\n是评论区。',
    description: '从一个关键词找到热评，留下原始语境的截图，再整理成可以回看、比较和讨论的图文报告。',
    insight: '一条评论的数据只能描述热度，原来的语境却会影响理解。这个工具把评论、截图和分析放在一起，让每个观察都有可以回看的出处。',
    boundary: '需要本地配置、MediaCrawler 与平台登录。截图和抓取受页面变化影响；AI 分析是解释假设，不能证明评论走红的因果。',
    reviewedAt: '2026-09-07', sourceUrl: 'https://github.com/wp-i/comment-vision-claw',
    links: [
      { label: '查看项目与用法', href: 'https://github.com/wp-i/comment-vision-claw', primary: true },
      { label: '了解报告内容', href: 'https://github.com/wp-i/comment-vision-claw#输出说明' },
    ],
    facts: ['按互动量筛选', '保留截图与上下文', '导出图文 PDF'],
  },
  {
    slug: 'tft-trait-atlas', title: 'tft-trait-atlas', chineseTitle: '羁绊天梯',
    category: '游戏 × 组合求解', status: '可在线体验',
    hook: '手里这些纹章，\n还能拼出什么？',
    description: '从已有的纹章出发，探索 8–11 人口的羁绊组合，把复杂的搭配变成可以带进游戏的阵容方案。',
    insight: '常见阵容攻略从一套既定答案出发。羁绊天梯把手里的条件作为起点：先限定纹章，再在组合空间里找可能性。不同人口独立求解，保留多套同分方案。',
    boundary: '当前使用 S18 数据快照，目标是激活羁绊数量，不代表实战强度。特殊英雄规则与求解条件以工具页面为准；数据版本变化后需重新核对。',
    reviewedAt: '2026-09-07', sourceUrl: 'https://github.com/wp-i/tft-trait-atlas',
    links: [
      { label: '打开解算器', href: 'https://wp-i.github.io/tft-trait-atlas/', primary: true },
      { label: 'GitHub 源码', href: 'https://github.com/wp-i/tft-trait-atlas' },
    ],
    facts: ['多枚纹章一起算', '8–11 人口独立求解', '复制小队代码'],
  },
  {
    slug: 'github-deep-search', title: 'github-deep-search', chineseTitle: '深度搜索',
    category: '开源 × 证据检索', status: '研发中', hook: '找到仓库，也找到采用它的理由。',
    description: '用自然语言描述需求，沿 README、源码与配置寻找依据，区分已经确认的能力和尚未确认的部分。',
    insight: '搜索结果的标题相似，不等于实现满足需求。将每项判断连接到仓库证据，才能继续讨论是否值得采用。',
    boundary: '当前处于重建和开发测试阶段，真实语义验收尚未完成；需要 GitHub 与模型凭据。',
    reviewedAt: '2026-09-07', sourceUrl: 'https://github.com/wp-i/github-deep-search',
    links: [{ label: '查看研发进展', href: 'https://github.com/wp-i/github-deep-search', primary: true }],
    facts: ['自然语言需求', '仓库证据', '有边界的判断'],
  },
  {
    slug: 'swordshield-notes', title: 'swordshield-notes', chineseTitle: '剑盾纪事',
    category: '桌面 × 轻量规划', status: '早期版本', hook: '一些事要推进，一些事要守住。',
    description: '用“剑”与“盾”整理两类任务，把冒险感带回 Windows 桌面，同时让记录尽量少打断正在做的事。',
    insight: '任务不必只有完成与未完成。双分组提供一种不同的组织方式；不抢焦点的桌面形态，让提醒和工作并存。',
    boundary: '面向 Windows 的早期版本，数据保存在本地。安装与支持范围以发布说明为准。',
    reviewedAt: '2026-09-07', sourceUrl: 'https://github.com/wp-i/swordshield-notes',
    links: [
      { label: '查看 Windows 版本', href: 'https://github.com/wp-i/swordshield-notes/releases/tag/v0.1.0', primary: true },
      { label: 'GitHub 源码', href: 'https://github.com/wp-i/swordshield-notes' },
    ],
    facts: ['剑与盾双分组', '本地数据', '桌面常驻'],
  },
  {
    slug: 'nodestitch', title: 'nodestitch', chineseTitle: '节点时间线',
    category: '桌面 × 时间组织', status: '原型', hook: '把持续的计划，放回一条时间线。',
    description: '用单轴节点组织持续任务，在一条线上保留顺序、历史和创建时间。',
    insight: '持续计划的意义不只在于打勾，也在于看清它从哪里开始、如何推进。时间线为这种关系提供了空间。',
    boundary: '当前需从源码构建，尚无公开 Release 安装包；面向本地 Windows 场景。',
    reviewedAt: '2026-09-07', sourceUrl: 'https://github.com/wp-i/nodestitch',
    links: [{ label: '查看原型源码', href: 'https://github.com/wp-i/nodestitch', primary: true }],
    facts: ['单轴节点', '本地存储', '持续计划'],
  },
];
export const site = {
  identity: { mark: 'WP', headline: '做有用的软件' },
  githubUrl: 'https://github.com/wp-i',
  navigation: [
    { id: 'work', label: '作品' },
  ] satisfies readonly { id: Exclude<SectionId, 'top'>; label: string }[],
  projects,
} as const;
