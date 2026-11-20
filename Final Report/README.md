這是111310504簡永昌的期末報告說明

```text
pomodoro-kanban-app/
├── .github/
│   └── workflows/
│       └── deploy.yml          # 第 9, 15 週：自動跑測試 + 部署到 GitHub Pages
├── src/
│   ├── core/                   # 【核心邏輯層】純 JS，不碰 DOM，專門用來衝高單元測試覆蓋率
│   │   ├── timer.js            # 番茄鐘計時器邏輯
│   │   ├── kanban.js           # 任務增刪改查、狀態流轉邏輯
│   │   └── storage.js          # localStorage 讀寫與 JSON 匯出入
│   ├── ui/                     # 【畫面渲染層】負責畫面更新與事件綁定
│   └── main.js                 # 程式進入點
├── tests/
│   ├── unit/                   # 第 3 週：Vitest 單元測試（測 timer.js, kanban.js）
│   ├── system/                 # 第 4 週：系統整合測試（測 番茄鐘完成 -> 任務計數自動+1 的連動）
│   └── e2e/                    # 第 6 週：Playwright 端對端測試（模擬真實瀏覽器操作）
├── docs/
│   └── ai-development-log.md   # 課程要求：誠實記錄你的 Prompt、AI 協作與除錯歷程
├── AGENTS.md                   # 第 11-12 週：給 AI 看的內文與脈絡工程規範
└── package.json
```