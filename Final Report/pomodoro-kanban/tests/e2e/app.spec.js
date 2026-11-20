import { test, expect } from '@playwright/test';

test('E2E 流程：新增任務、綁定專注並啟動番茄鐘計時', async ({ page }) => {
    await page.goto('/');

    // 1. 輸入任務名稱並送出
    await page.getByTestId('task-input').fill('完成現代軟體工程 E2E 測試');
    await page.getByTestId('add-task-btn').click();

    // 2. 驗證任務出現在「待辦」欄位
    const todoCol = page.getByTestId('col-todo');
    await expect(todoCol).toContainText('完成現代軟體工程 E2E 測試');

    // 3. 點擊「🎯 專注」，驗證任務自動移入「進行中」欄位
    await todoCol.getByRole('button', { name: '🎯 專注' }).click();
    await expect(page.getByTestId('col-doing')).toContainText('完成現代軟體工程 E2E 測試');

    // 4. 點擊開始計時，驗證時間從 25:00 開始倒數
    await page.getByTestId('start-timer-btn').click();
    await expect(page.getByTestId('timer-display')).toHaveText('24:59', { timeout: 3000 });
});