import { describe, it, expect } from 'vitest';
import { PomodoroTimer } from '../../src/core/timer.js';
import { KanbanBoard } from '../../src/core/kanban.js';

describe('系統整合測試：番茄鐘與看板連動', () => {
    it('當綁定任務的番茄鐘倒數結束時，該任務的已完成番茄數應自動 +1', () => {
        const board = new KanbanBoard();
        const task = board.addTask('完成系統測試', 2);

        const timer = new PomodoroTimer(null, (mode, taskId) => {
            if (mode === 'WORK' && taskId) {
                board.incrementPomodoro(taskId);
            }
        });

        timer.selectTask(task.id);
        timer.remainingSeconds = 1;
        timer.start();
        timer.tick();

        expect(task.completedPomodoros).toBe(1);
    });
});