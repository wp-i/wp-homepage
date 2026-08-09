import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('renders the primary identity and confirmed project links', async ({ page }) => {
  await expect(
    page.getByRole('heading', { level: 1, name: '做有用的软件' }),
  ).toBeVisible();

  await expect(page.getByText('三个项目')).toHaveCount(0);
  await expect(page.getByText(/认真理解问题，把复杂路径变成/)).toHaveCount(0);

  const projectUrls = [
    'https://github.com/wp-i/github-deep-search',
    'https://github.com/wp-i/nodestitch',
    'https://github.com/wp-i/swordshield-notes',
    'https://github.com/wp-i/comment-vision-claw',
  ];

  for (const url of projectUrls) {
    await expect(page.locator(`a[href="${url}"]`)).toHaveAttribute('target', '_blank');
  }

  const renderedOrder = await page.locator('#work a[target="_blank"]').evaluateAll(
    (links) => links.map((link) => link.getAttribute('href')),
  );
  expect(renderedOrder).toEqual(projectUrls);
});

test('paints the complete hero text beside the interactive visual', async ({ page }) => {
  const title = page.getByRole('heading', { level: 1, name: '做有用的软件' });
  const visual = page.locator('[data-hero-visual]');

  await expect(title).toBeVisible();
  await expect(visual).toBeVisible();
  await expect(visual).toHaveAttribute('data-auto-orbit-period-ms', '5984');
  await expect(visual).toHaveAttribute('data-camera-pitch', '0.336');
  await expect(visual).toHaveAttribute('data-geometry', 'mobius-ring');
  await expect(visual).toHaveAttribute('data-half-twists', '1');
  await page.waitForTimeout(1000);

  const layout = await title.evaluate((element) => {
    const titleBounds = element.getBoundingClientRect();
    const heroBounds = element.closest('section')?.getBoundingClientRect();
    const range = document.createRange();
    range.selectNodeContents(element);
    const textBounds = range.getBoundingClientRect();

    return {
      clipPath: getComputedStyle(element).clipPath,
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
      textRight: textBounds.right,
      titleRight: titleBounds.right,
      heroRight: heroBounds?.right ?? 0,
    };
  });

  expect(layout.clipPath).toBe('none');
  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth + 1);
  expect(layout.textRight).toBeLessThanOrEqual(layout.titleRight + 1);
  expect(layout.titleRight).toBeLessThan(layout.heroRight);

  const canvas = page.locator('[data-kinetic-canvas]');
  await expect(canvas).toBeVisible();
  const canvasSize = await canvas.evaluate((element) => {
    if (!(element instanceof HTMLCanvasElement)) {
      throw new TypeError('Expected the kinetic visual to render a canvas.');
    }

    return { height: element.height, width: element.width };
  });
  expect(canvasSize.width).toBeGreaterThan(0);
  expect(canvasSize.height).toBeGreaterThan(0);

  const beforeFrame = Number(await visual.getAttribute('data-motion-frame'));
  const beforeOrbitPhase = Number(await visual.getAttribute('data-orbit-phase'));
  const visualBounds = await visual.boundingBox();
  const viewport = page.viewportSize();
  expect(visualBounds).not.toBeNull();
  expect(viewport).not.toBeNull();

  if (visualBounds && viewport) {
    expect(visualBounds.width).toBeGreaterThan(400);
    expect(visualBounds.width).toBeLessThan(viewport.width * 0.5);
  }

  if (visualBounds) {
    await page.mouse.move(
      visualBounds.x + visualBounds.width * 0.8,
      visualBounds.y + visualBounds.height * 0.25,
    );
  }

  await expect(visual).toHaveAttribute('data-pointer', /^(?!0\.000,0\.000)/);
  await expect(visual).toHaveAttribute('data-interaction-u', /^\d+\.\d{3}$/);
  await expect
    .poll(async () =>
      Number(await visual.getAttribute('data-interaction-strength')),
    )
    .toBeGreaterThan(0.01);
  const enteringStrength = Number(
    await visual.getAttribute('data-interaction-strength'),
  );
  expect(enteringStrength).toBeLessThan(0.85);
  await expect
    .poll(async () =>
      Number(await visual.getAttribute('data-interaction-strength')),
    )
    .toBeGreaterThan(0.7);
  await expect
    .poll(async () => Number(await visual.getAttribute('data-motion-frame')))
    .toBeGreaterThan(beforeFrame);
  await expect
    .poll(async () => Number(await visual.getAttribute('data-orbit-phase')))
    .toBeGreaterThan(beforeOrbitPhase);

  if (visualBounds) {
    await page.mouse.click(
      visualBounds.x + visualBounds.width * 0.66,
      visualBounds.y + visualBounds.height * 0.58,
    );
  }

  await expect(visual).toHaveAttribute('data-pulse-count', '1');

  if (visualBounds) {
    await page.mouse.move(visualBounds.x - 8, visualBounds.y - 8);
    await page.waitForTimeout(100);
  }

  const leavingStrength = Number(
    await visual.getAttribute('data-interaction-strength'),
  );
  expect(leavingStrength).toBeGreaterThan(0.15);
  await expect
    .poll(async () =>
      Number(await visual.getAttribute('data-interaction-strength')),
    )
    .toBeLessThan(0.15);
});

test('navigates through the single page and keeps layout inside the viewport', async ({
  page,
}) => {
  const workLink = page
    .getByRole('navigation', { name: '主要导航' })
    .locator('a[href="#work"]');
  await workLink.click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator('#work')).toBeVisible();
  await expect(page.locator('#root > header')).toHaveAttribute(
    'data-elevated',
    'true',
  );
  await expect(workLink).toHaveAttribute('aria-current', 'location');

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test('reveals project entries with a visible scroll transition', async ({
  page,
}) => {
  const firstProject = page.locator('#work article').first();

  await expect(firstProject).toHaveAttribute('data-visible', 'false');
  const initialOpacity = await firstProject.evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).opacity),
  );
  expect(initialOpacity).toBeLessThan(0.1);

  await page.evaluate(() =>
    window.scrollTo({ top: window.innerHeight * 0.72, behavior: 'instant' }),
  );
  await expect(firstProject).toHaveAttribute('data-visible', 'true');
  await expect(firstProject).toHaveCSS('opacity', '1');
});

test('starts keyboard navigation with the skip link', async ({ browserName, page }) => {
  const skipLink = page.getByRole('link', { name: '跳到主要内容' });

  if (browserName === 'webkit') {
    await skipLink.focus();
  } else {
    await page.keyboard.press('Tab');
  }

  await expect(skipLink).toBeFocused();

  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
});

test('keeps content visible when reduced motion is requested', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();

  await expect(page.getByRole('heading', { name: 'GitHub Deep Search' })).toBeVisible();
  await expect(page.getByRole('link', { name: /SwordShield Notes/ })).toBeVisible();
  await expect(page.locator('#work article').first()).toHaveCSS('opacity', '1');

  const visual = page.locator('[data-hero-visual]');
  const canvas = page.locator('[data-kinetic-canvas]');
  await page.waitForTimeout(120);
  await expect(visual).toHaveAttribute('data-motion-state', 'static');
  const firstFrame = await canvas.evaluate((element) => {
    if (!(element instanceof HTMLCanvasElement)) {
      throw new TypeError('Expected the kinetic visual to render a canvas.');
    }

    return element.toDataURL();
  });
  await page.waitForTimeout(220);
  const secondFrame = await canvas.evaluate((element) => {
    if (!(element instanceof HTMLCanvasElement)) {
      throw new TypeError('Expected the kinetic visual to render a canvas.');
    }

    return element.toDataURL();
  });
  expect(secondFrame).toBe(firstFrame);
});

test('loads without application console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.reload();
  await page.waitForLoadState('networkidle');
  expect(errors).toEqual([]);
});
