export const TASK_STATUS = {
    TODO: 'todo',
    DOING: 'doing',
    DONE: 'done',
};

export class KanbanBoard {
    constructor(initialTasks = []) {
        this.tasks = initialTasks;
    }

    addTask(title, estimatedPomodoros = 1) {
        if (!title || !title.trim()) {
            throw new Error('任務標題不能為空');
        }
        const newTask = {
            id: `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            title: title.trim(),
            status: TASK_STATUS.TODO,
            estimatedPomodoros: Math.max(1, Number(estimatedPomodoros) || 1),
            completedPomodoros: 0,
            createdAt: new Date().toISOString(),
        };
        this.tasks.push(newTask);
        return newTask;
    }

    moveTask(taskId, targetStatus) {
        if (!Object.values(TASK_STATUS).includes(targetStatus)) {
            throw new Error(`無效的看板狀態: ${targetStatus}`);
        }
        const task = this.tasks.find((t) => t.id === taskId);
        if (!task) throw new Error('找不到指定任務');
        task.status = targetStatus;
        return task;
    }

    incrementPomodoro(taskId) {
        const task = this.tasks.find((t) => t.id === taskId);
        if (!task) return null;
        task.completedPomodoros += 1;
        return task;
    }

    deleteTask(taskId) {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter((t) => t.id !== taskId);
        return this.tasks.length < initialLength;
    }

    getTasksByStatus(status) {
        return this.tasks.filter((t) => t.status === status);
    }
}