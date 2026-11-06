import { test, expect } from '@playwright/test';

test.describe('Full-Stack Integration E2E Test', () => {
  test('應能成功載入前端畫面並顯示後端 API 傳回的狀態', async ({ page }) => {
    // 1. 開啟前端首頁
    await page.goto('/');

    // 2. 驗證頁面標題
    await expect(page.locator('h1')).toHaveText('Full-Stack Web App');

    // 3. 驗證前端成功向後端 API 取得資料 (對應 App.tsx 中的 data-testid="status-success")
    const successStatus = page.getByTestId('status-success');
    await expect(successStatus).toBeVisible({ timeout: 10000 });

    // 4. 斷言畫面上的文字內容是否與 Rust 後端傳回一致
    await expect(successStatus).toContainText('Status: ok');
    await expect(successStatus).toContainText('Message: Server is running perfectly!');
  });
});