import { site } from './site';
describe('project content', () => {
  it('includes the playable TFT project and preserves existing destinations', () => {
    expect(site.projects.map(project => project.slug)).toEqual([
      'webart', 'comment-vision-claw', 'tft-trait-atlas', 'reelink', 'swordshield-notes', 'nodestitch',
    ]);
    expect(site.projects.find(project => project.slug === 'tft-trait-atlas')?.links).toContainEqual({ label: '打开解算器', href: 'https://wp-i.github.io/tft-trait-atlas/', primary: true });
  });
  it('keeps unique projects with dated sources and honest boundaries', () => {
    expect(new Set(site.projects.map(project => project.slug)).size).toBe(site.projects.length);
    for (const project of site.projects) {
      expect(project.reviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(project.sourceUrl).toMatch(/^https:\/\/github\.com\/wp-i\//);
      expect(project.boundary.length).toBeGreaterThan(10);
      expect(project.links.length).toBeGreaterThan(0);
      for (const link of project.links) expect(new URL(link.href).protocol).toBe('https:');
    }
  });

  it('keeps Windows projects on the shared icon and action contract', () => {
    const windows = site.projects.filter(project => project.platform === 'windows');
    expect(windows.map(project => project.slug)).toEqual(['reelink', 'swordshield-notes', 'nodestitch']);
    for (const project of windows) {
      expect(project.icon).toMatch(/^projects\/(reelink\.svg|swordshield-notes\.png|nodestitch\.svg)$/);
      expect(project.links.map(link => link.label)).toEqual(['GitHub 源码', '获取与使用']);
      const [sourceLink, readmeLink] = project.links;
      expect(sourceLink).toMatchObject({ href: project.sourceUrl, primary: true });
      expect(readmeLink).toBeDefined();
      expect(readmeLink?.href).toBe(`https://github.com/wp-i/${project.slug}#readme`);
    }
  });
});
