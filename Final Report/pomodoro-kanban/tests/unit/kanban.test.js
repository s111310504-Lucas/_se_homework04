import { describe, it, expect } from 'vitest';
import { KanbanBoard, TASK_STATUS } from '../../src/core/kanban.js';

describe('KanbanBoard 單元測試', () => {
    it('應該能新增任務到待辦欄位', () => {
        const board = new KanbanBoard();
        const task = board.addTask('撰寫現代軟體工程期末報告', 3);
        expect(task.title).toBe('撰寫現代軟體工程期末報告');
        expect(task.status).toBe(TASK_STATUS.TODO);
        expect(task.estimatedPomodoros).toBe(3);
    });

    it('標題為空時應該拋出錯誤', () => {
        const board = new KanbanBoard();
        expect(() => board.addTask('   ')).toThrow('任務標題不能為空');
    });

    it('應該能正確移動任務狀態並刪除任務', () => {
        const board = new KanbanBoard();
        const task = board.addTask('寫測試');
        board.moveTask(task.id, TASK_STATUS.DOING);
        expect(board.getTasksByStatus(TASK_STATUS.DOING)).toHaveLength(1);

        board.deleteTask(task.id);
        expect(board.tasks).toHaveLength(0);
    });
});