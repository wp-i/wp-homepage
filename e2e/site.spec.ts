import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => page.goto('/'));

test('renders the redesigned portfolio contract', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1, name: '做有用的软件' })).toBeVisible();
  const nav = page.getByRole('navigation', { name: '主要导航' });
  await expect(nav.getByRole('link', { name: '作品' })).toHaveAttribute('href', '#work');
  await expect(page.locator('#contact, a[href="#contact"]')).toHaveCount(0);
  const projects = page.locator('#work article');
  await expect(projects).toHaveCount(6);
  await expect(projects.locator('h3')).toHaveText(['webArt', 'comment-vision-claw', 'tft-trait-atlas', 'github-deep-search', 'swordshield-notes', 'nodestitch']);
  await expect(page.getByRole('heading', { name: /精选作品|更多项目/ })).toHaveCount(0);
  for (const title of ['tft-trait-atlas', 'comment-vision-claw', 'webArt', 'github-deep-search',
    'swordshield-notes', 'nodestitch']) {
    await expect(page.getByRole('heading', { level: 3, name: title })).toBeVisible();
  }
  for (const status of ['研发中', '早期版本', '原型']) {
    await expect(page.getByText(status, { exact: true })).toBeVisible();
  }
});

test('keeps every external link safe', async ({ page }) => {
  await expect(page.locator('#work details, #work img')).toHaveCount(0);
  const links = page.locator('a[target="_blank"]');
  expect(await links.count()).toBeGreaterThan(5);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute('href', /^https:\/\//);
    await expect(link).toHaveAttribute('rel', /(?:^|\s)noreferrer(?:\s|$)/);
  }
  await expect(page.locator('a a')).toHaveCount(0);
});

test('opens the TFT tool lazily and restores focus on Escape', async ({ page }) => {
  await page.route('https://wp-i.github.io/tft-trait-atlas/**', (route) =>
    route.fulfill({ body: '<!doctype html><title>stub</title>', contentType: 'text/html' }));
  await page.reload();
  const trigger = page.getByRole('button', { name: '页内体验' });
  const dialog = page.getByRole('dialog', { name: '羁绊天梯在线体验' });
  await expect(page.getByTitle('羁绊天梯解算器')).toHaveCount(0);
  await trigger.click();
  await expect(dialog).toBeVisible();
  await expect(dialog.getByTitle('羁绊天梯解算器')).toHaveAttribute(
    'src', 'https://wp-i.github.io/tft-trait-atlas/');
  await page.keyboard.press('Escape');
  await expect(page.getByTitle('羁绊天梯解算器')).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('supports keyboard entry, focus, and bounded layout', async ({ browserName, page }) => {
  const skip = page.getByRole('link', { name: '跳到主要内容' });
  if (browserName === 'webkit') await skip.focus(); else await page.keyboard.press('Tab');
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
  const link = page.getByRole('link', { name: '打开解算器', exact: true });
  await link.focus();
  expect(await link.evaluate((node) => getComputedStyle(node).outlineStyle)).not.toBe('none');
  const shell = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    linksInside: Array.from(document.querySelectorAll('a')).every((item) => {
      if (!(item instanceof HTMLAnchorElement)) return true;
      const box = item.getBoundingClientRect();
      return box.width === 0 || (box.left >= -1 && box.right <= document.documentElement.clientWidth + 1);
    }),
  }));
  expect(shell.overflow).toBeLessThanOrEqual(1);
  expect(shell.linksInside).toBe(true);
});

test('keeps content and canvas static with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  const visual = page.locator('[data-hero-visual]');
  const canvas = page.locator('[data-kinetic-canvas]');
  await expect(visual).toHaveAttribute('data-motion-state', 'static');
  await expect(page.locator('#work article').first()).toHaveCSS('opacity', '1');
  await page.waitForTimeout(120);
  const frame = await canvas.evaluate((node) => node instanceof HTMLCanvasElement ? node.toDataURL() : '');
  await page.waitForTimeout(220);
  expect(await canvas.evaluate((node) => node instanceof HTMLCanvasElement ? node.toDataURL() : '')).toBe(frame);
});

test('has no console errors and captures review viewports', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('console', (message) => message.type() === 'error' && errors.push(message.text()));
  await page.reload();
  for (const project of await page.locator('#work article').all()) {
    await project.scrollIntoViewIfNeeded();
    await expect(project).toHaveCSS('opacity', '1');
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  const webart = page.locator('#work article').filter({ has: page.getByRole('heading', { name: 'webArt', exact: true }) });
  if (['chrome-1280x720', 'mobile-chrome-360x800'].includes(testInfo.project.name)) {
    await page.screenshot({ fullPage: true, path: `artifacts/redesign-${testInfo.project.name}.png` });
    await webart.screenshot({ path: `artifacts/webart-${testInfo.project.name}.png` });
  }
  await page.waitForLoadState('networkidle');
  expect(errors).toEqual([]);
});
