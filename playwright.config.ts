import { defineConfig, devices } from '@playwright/test';

const desktopViewport = (width: number, height: number) => ({ width, height });

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4317',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chrome-1024x768',
      use: { ...devices['Desktop Chrome'], viewport: desktopViewport(1024, 768) },
    },
    {
      name: 'chrome-1280x720',
      use: { ...devices['Desktop Chrome'], viewport: desktopViewport(1280, 720) },
    },
    {
      name: 'chrome-1366x768',
      use: { ...devices['Desktop Chrome'], viewport: desktopViewport(1366, 768) },
    },
    {
      name: 'chrome-1440x900',
      use: { ...devices['Desktop Chrome'], viewport: desktopViewport(1440, 900) },
    },
    {
      name: 'chrome-1920x1080',
      use: { ...devices['Desktop Chrome'], viewport: desktopViewport(1920, 1080) },
    },
    {
      name: 'edge-1366x768',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
        viewport: desktopViewport(1366, 768),
      },
    },
    {
      name: 'firefox-1366x768',
      use: {
        ...devices['Desktop Firefox'],
        viewport: desktopViewport(1366, 768),
      },
    },
    {
      name: 'webkit-1366x768',
      use: {
        ...devices['Desktop Safari'],
        viewport: desktopViewport(1366, 768),
      },
    },
    {
      name: 'mobile-chrome-360x800',
      use: {
        ...devices['Pixel 5'],
        viewport: desktopViewport(360, 800),
      },
    },
    {
      name: 'mobile-webkit-390x844',
      use: {
        ...devices['iPhone 13'],
        viewport: desktopViewport(390, 844),
      },
    },
    {
      name: 'mobile-chrome-430x932',
      use: {
        ...devices['Pixel 5'],
        viewport: desktopViewport(430, 932),
      },
    },
  ],
  webServer: {
    command: 'npx vite --host=127.0.0.1 --port=4317',
    url: 'http://127.0.0.1:4317',
    reuseExistingServer: !process.env.CI,
  },
});
