export const TIMER_MODES = {
    WORK: 25 * 60,       // 25 分鐘專注
    SHORT_BREAK: 5 * 60, // 5 分鐘短休息
};

export class PomodoroTimer {
    constructor(onTick, onComplete) {
        this.mode = 'WORK';
        this.remainingSeconds = TIMER_MODES.WORK;
        this.isRunning = false;
        this.activeTaskId = null;
        this.onTick = onTick || (() => { });
        this.onComplete = onComplete || (() => { });
    }

    selectTask(taskId) {
        this.activeTaskId = taskId;
    }

    switchMode(mode) {
        if (!TIMER_MODES[mode]) throw new Error(`無效的計時模式: ${mode}`);
        this.pause();
        this.mode = mode;
        this.remainingSeconds = TIMER_MODES[mode];
        this.onTick(this.getFormattedTime(), this.remainingSeconds);
    }

    start() {
        this.isRunning = true;
    }

    pause() {
        this.isRunning = false;
    }

    reset() {
        this.pause();
        this.remainingSeconds = TIMER_MODES[this.mode];
        this.onTick(this.getFormattedTime(), this.remainingSeconds);
    }

    // 每秒呼叫一次的純邏輯方法，方便單元測試直接模擬時間流逝
    tick() {
        if (!this.isRunning) return;
        if (this.remainingSeconds > 0) {
            this.remainingSeconds -= 1;
            this.onTick(this.getFormattedTime(), this.remainingSeconds);
        }
        if (this.remainingSeconds === 0) {
            this.pause();
            this.onComplete(this.mode, this.activeTaskId);
        }
    }

    getFormattedTime() {
        const mins = Math.floor(this.remainingSeconds / 60).toString().padStart(2, '0');
        const secs = (this.remainingSeconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }
}