const STORAGE_KEY = 'pomodoro_kanban_data_v1';

export class StorageManager {
    constructor(storage = globalThis.localStorage) {
        this.storage = storage;
    }

    saveTasks(tasks) {
        if (!this.storage) return;
        this.storage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    loadTasks() {
        if (!this.storage) return [];
        const raw = this.storage.getItem(STORAGE_KEY);
        if (!raw) return [];
        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    exportJSON(tasks) {
        return JSON.stringify({ exportedAt: new Date().toISOString(), tasks }, null, 2);
    }
}