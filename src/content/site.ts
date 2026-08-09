export type SectionId = 'top' | 'work' | 'contact';

export type NavigationItem = {
  readonly id: Exclude<SectionId, 'top' | 'contact'>;
  readonly label: string;
};

export type ProjectEvaluation = {
  readonly problemValue: number;
  readonly technicalDepth: number;
  readonly deliveryCompleteness: number;
  readonly engineeringQuality: number;
  readonly evidenceQuality: number;
  readonly communication: number;
  readonly reviewedAt: string;
};

export type Project = {
  readonly slug: string;
  readonly title: string;
  readonly chineseTitle: string;
  readonly eyebrow: string;
  readonly description: string;
  readonly proof: string;
  readonly href: string;
  readonly tags: readonly string[];
  readonly evaluation: ProjectEvaluation;
};

export function getPortfolioScore(evaluation: ProjectEvaluation) {
  return (
    evaluation.problemValue +
    evaluation.technicalDepth +
    evaluation.deliveryCompleteness +
    evaluation.engineeringQuality +
    evaluation.evidenceQuality +
    evaluation.communication
  );
}

const projectEntries = [
  {
    slug: 'github-deep-search',
    title: 'GitHub Deep Search',
    chineseTitle: '深度搜索',
    eyebrow: '搜索与证据',
    description:
      '从一句产品想法出发，搜索真实 GitHub 仓库，并沿 README、文件树和关键源码建立可复核的复用判断。',
    proof: '自然语言检索 · 仓库级证据 · 可解释结论',
    href: 'https://github.com/wp-i/github-deep-search',
    tags: ['Python', 'Evidence', 'Web', 'MCP'],
    evaluation: {
      problemValue: 18,
      technicalDepth: 20,
      deliveryCompleteness: 18,
      engineeringQuality: 20,
      evidenceQuality: 10,
      communication: 10,
      reviewedAt: '2026-08-10',
    },
  },
  {
    slug: 'nodestitch',
    title: 'Nodestitch',
    chineseTitle: '节点时间线',
    eyebrow: '桌面规划',
    description:
      '一款纯本地的 Windows 时间线任务规划工具，用单轴节点组织持续计划，并以事务方式保存顺序、历史与创建时间。',
    proof: '单轴时间线 · 事务持久化 · Windows 安装包',
    href: 'https://github.com/wp-i/nodestitch',
    tags: ['Tauri', 'Rust', 'React', 'SQLite'],
    evaluation: {
      problemValue: 16,
      technicalDepth: 18,
      deliveryCompleteness: 19,
      engineeringQuality: 20,
      evidenceQuality: 10,
      communication: 10,
      reviewedAt: '2026-08-10',
    },
  },
  {
    slug: 'swordshield-notes',
    title: 'SwordShield Notes',
    chineseTitle: '剑盾纪事',
    eyebrow: '桌面效率',
    description:
      '面向 Windows 桌面的双分组任务工具，以“剑”和“盾”区分主动推进与持续守住，数据保留在本地。',
    proof: 'Tauri 桌面端 · 双栏任务模型 · 本地 SQLite',
    href: 'https://github.com/wp-i/swordshield-notes',
    tags: ['Tauri', 'Rust', 'React', 'SQLite'],
    evaluation: {
      problemValue: 15,
      technicalDepth: 16,
      deliveryCompleteness: 18,
      engineeringQuality: 16,
      evidenceQuality: 8,
      communication: 9,
      reviewedAt: '2026-08-10',
    },
  },
  {
    slug: 'comment-vision-claw',
    title: 'Comment Vision Claw',
    chineseTitle: '热评视界',
    eyebrow: '内容洞察',
    description:
      '串联热评抓取、筛选、精准截图、分析与 PDF 报告，把分散的内容观察整理成可交付证据。',
    proof: '评论抓取 · 上下文截图 · 图文报告',
    href: 'https://github.com/wp-i/comment-vision-claw',
    tags: ['Python', 'Playwright', 'MCP', 'PDF'],
    evaluation: {
      problemValue: 17,
      technicalDepth: 17,
      deliveryCompleteness: 12,
      engineeringQuality: 7,
      evidenceQuality: 5,
      communication: 8,
      reviewedAt: '2026-08-10',
    },
  },
] satisfies readonly Project[];

const rankedProjects = [...projectEntries].sort((left, right) => {
  const scoreDelta =
    getPortfolioScore(right.evaluation) - getPortfolioScore(left.evaluation);

  if (scoreDelta !== 0) return scoreDelta;

  const qualityDelta =
    right.evaluation.engineeringQuality - left.evaluation.engineeringQuality;

  if (qualityDelta !== 0) return qualityDelta;

  return (
    right.evaluation.deliveryCompleteness -
    left.evaluation.deliveryCompleteness
  );
});

export const site = {
  identity: {
    mark: 'WP',
    headline: '做有用的软件',
  },
  githubUrl: 'https://github.com/wp-i',
  navigation: [{ id: 'work', label: '项目' }] satisfies readonly NavigationItem[],
  projects: rankedProjects,
} as const;
