import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    headless: true,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // 自動啟動服務：跑 E2E 前先自動啟動 Backend 與 Frontend
  webServer: [
    {
      command: 'cd ../backend && cargo run',
      url: 'http://localhost:8080/health', // 等待後端啟動完成
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
    },
    {
      command: 'cd ../frontend && npm run dev',
      url: 'http://localhost:3000',        // 等待前端啟動完成
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
    },
  ],
});