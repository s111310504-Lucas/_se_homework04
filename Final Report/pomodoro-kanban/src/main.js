import { PomodoroTimer } from './core/timer.js';
import { KanbanBoard, TASK_STATUS } from './core/kanban.js';
import { StorageManager } from './core/storage.js';

const storage = new StorageManager();
const board = new KanbanBoard(storage.loadTasks());

const timeDisplay = document.getElementById('time-display');
const activeTaskLabel = document.getElementById('active-task-label');

const timer = new PomodoroTimer(
  (formatted) => {
    timeDisplay.textContent = formatted;
  },
  (completedMode, taskId) => {
    if (completedMode === 'WORK' && taskId) {
      board.incrementPomodoro(taskId);
      saveAndRender();
      alert('🎉 完成一個番茄鐘！已自動為任務增加 1 顆番茄！');
    } else {
      alert('⏰ 時間到！');
    }
  }
);

setInterval(() => timer.tick(), 1000);

function saveAndRender() {
  storage.saveTasks(board.tasks);
  renderBoard();
}

function renderBoard() {
  const activeTask = board.tasks.find((t) => t.id === timer.activeTaskId);
  activeTaskLabel.textContent = activeTask
    ? `🎯 目前專注任務：${activeTask.title} (${activeTask.completedPomodoros}/${activeTask.estimatedPomodoros} 🍅)`
    : '尚未綁定專注任務（可從下方看板點擊「🎯 專注」）';

  Object.values(TASK_STATUS).forEach((status) => {
    const container = document.getElementById(`list-${status}`);
    container.innerHTML = '';
    board.getTasksByStatus(status).forEach((task) => {
      const card = document.createElement('div');
      card.className = `task-card ${task.id === timer.activeTaskId ? 'selected' : ''}`;
      card.dataset.testid = `task-card-${task.id}`;
      card.innerHTML = `
        <div><strong>${task.title}</strong></div>
        <div style="font-size: 0.85rem; color: #94a3b8; margin-top: 4px;">
          進度：${'🍅'.repeat(task.completedPomodoros)} (${task.completedPomodoros}/${task.estimatedPomodoros})
        </div>
        <div class="task-actions">
          ${status !== 'done' ? `<button class="btn-sm btn-primary" data-action="focus" data-id="${task.id}">🎯 專注</button>` : ''}
          ${status !== 'todo' ? `<button class="btn-sm btn-secondary" data-action="move" data-target="todo" data-id="${task.id}">← 待辦</button>` : ''}
          ${status !== 'doing' ? `<button class="btn-sm btn-secondary" data-action="move" data-target="doing" data-id="${task.id}">進行中</button>` : ''}
          ${status !== 'done' ? `<button class="btn-sm btn-secondary" data-action="move" data-target="done" data-id="${task.id}">✓ 完成</button>` : ''}
          <button class="btn-sm btn-secondary" data-action="delete" data-id="${task.id}">🗑️</button>
        </div>
      `;
      container.appendChild(card);
    });
  });
}

// 事件綁定
document.getElementById('start-btn').onclick = () => timer.start();
document.getElementById('pause-btn').onclick = () => timer.pause();
document.getElementById('reset-btn').onclick = () => timer.reset();
document.getElementById('mode-work').onclick = () => timer.switchMode('WORK');
document.getElementById('mode-break').onclick = () => timer.switchMode('SHORT_BREAK');

document.getElementById('add-task-form').onsubmit = (e) => {
  e.preventDefault();
  const titleInput = document.getElementById('task-title-input');
  const estInput = document.getElementById('task-est-input');
  board.addTask(titleInput.value, estInput.value);
  titleInput.value = '';
  saveAndRender();
};

document.querySelector('.board').onclick = (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const { action, id, target } = btn.dataset;
  if (action === 'focus') {
    timer.selectTask(id);
    if (board.tasks.find((t) => t.id === id)?.status === 'todo') {
      board.moveTask(id, 'doing');
    }
  } else if (action === 'move') {
    board.moveTask(id, target);
  } else if (action === 'delete') {
    if (timer.activeTaskId === id) timer.selectTask(null);
    board.deleteTask(id);
  }
  saveAndRender();
};

document.getElementById('export-btn').onclick = () => {
  const blob = new Blob([storage.exportJSON(board.tasks)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'pomodoro-kanban-backup.json';
  a.click();
};

renderBoard();