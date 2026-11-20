import { describe, it, expect, vi } from 'vitest';
import { PomodoroTimer, TIMER_MODES } from '../../src/core/timer.js';

describe('PomodoroTimer 核心邏輯單元測試', () => {
    it('初始化應為 25:00 的工作模式', () => {
        const timer = new PomodoroTimer();
        expect(timer.mode).toBe('WORK');
        expect(timer.remainingSeconds).toBe(TIMER_MODES.WORK);
        expect(timer.getFormattedTime()).toBe('25:00');
    });

    it('啟動後執行 tick 應正確倒數', () => {
        const timer = new PomodoroTimer();
        timer.start();
        timer.tick();
        expect(timer.remainingSeconds).toBe(TIMER_MODES.WORK - 1);
        expect(timer.getFormattedTime()).toBe('24:59');
    });

    it('倒數歸零時應觸發 onComplete 並回傳綁定的任務 ID', () => {
        const onComplete = vi.fn();
        const timer = new PomodoroTimer(null, onComplete);
        timer.selectTask('task-101');
        timer.remainingSeconds = 1;
        timer.start();
        timer.tick();

        expect(timer.isRunning).toBe(false);
        expect(onComplete).toHaveBeenCalledWith('WORK', 'task-101');
    });
});