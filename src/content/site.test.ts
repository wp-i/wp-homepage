import { getPortfolioScore, site } from './site';

describe('portfolio ranking', () => {
  it('orders projects by the documented interview score', () => {
    const scores = site.projects.map((project) =>
      getPortfolioScore(project.evaluation),
    );

    expect(site.projects.map((project) => project.slug)).toEqual([
      'github-deep-search',
      'nodestitch',
      'swordshield-notes',
      'comment-vision-claw',
    ]);
    expect(scores).toEqual([...scores].sort((left, right) => right - left));
  });

  it('keeps every selected project above the publication threshold', () => {
    for (const project of site.projects) {
      expect(getPortfolioScore(project.evaluation)).toBeGreaterThanOrEqual(60);
      expect(project.evaluation.problemValue).toBeLessThanOrEqual(20);
      expect(project.evaluation.technicalDepth).toBeLessThanOrEqual(20);
      expect(project.evaluation.deliveryCompleteness).toBeLessThanOrEqual(20);
      expect(project.evaluation.engineeringQuality).toBeLessThanOrEqual(20);
      expect(project.evaluation.evidenceQuality).toBeLessThanOrEqual(10);
      expect(project.evaluation.communication).toBeLessThanOrEqual(10);
      expect(project.evaluation.reviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
