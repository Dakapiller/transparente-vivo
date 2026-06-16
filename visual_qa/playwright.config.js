const { defineConfig, devices } = require('@playwright/test');

process.env.PLAYWRIGHT_BROWSERS_PATH = '/opt/pw-browsers';

module.exports = defineConfig({
  globalSetup: './global-setup.js',
  testDir: './tests',
  outputDir: './test-artifacts',
  workers: 1,
  webServer: {
    command: 'python3 -m http.server 3456',
    cwd: '/home/user/transparente-vivo',
    port: 3456,
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://localhost:3456',
    launchOptions: {
      executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
});
