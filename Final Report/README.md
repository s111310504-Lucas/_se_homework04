# 🍅 番茄鐘 × 任務管理看板（Pomodoro & Kanban SPA）

> **國立金門大學 115 學年度第 1 學期《現代軟體工程》期末專案報告**  
> **班級 / 學號 / 姓名**：資工三 / 111310504 / 簡永昌[cite: 1, 4]  
> **授課教師**：陳鍾誠 教授  
> **線上展示網址（GitHub Pages）**：[點擊前往線上網頁](https://s111310504-lucas.github.io/_se_homework04/) *(請在部署成功後確認連結可正常開啟)*

---

## 一、 專案概述與設計理念

### 1. 專案目標
本專案實作一個輕量化、零後端依賴的單頁應用程式（SPA），結合**「番茄鐘專注計時器（Pomodoro Timer）」**與**「任務管理看板（Kanban Board）」**。使用者可以建立任務、預估所需番茄數，並將計時器與特定任務綁定；當專注倒數結束時，系統會自動為該任務累計完成的番茄數，並透過瀏覽器的 `localStorage` 自動保存進度與提供 JSON 備份匯出功能。

### 2. 軟體工程架構設計（邏輯與 UI 嚴格分離）
為了落實課程強調的**「高品質軟體工程與高自動化測試覆蓋率」**，本專案採用模組化分層設計，避免將商業邏輯寫死在 HTML/DOM 操作中：
* **核心邏輯層 (`src/core/`)**：純 JavaScript 實作（`timer.js`、`kanban.js`、`storage.js`），完全不依賴瀏覽器 DOM 物件，確保所有狀態流轉與邊界條件都能在毫秒內完成單元測試與系統整合測試。
* **畫面渲染層 (`src/main.js` & `index.html`)**：負責訂閱核心模組的事件回呼（Callback）更新介面，並為所有互動元件加上 `data-testid` 屬性，方便 Playwright 進行端對端（E2E）瀏覽器自動化測試。

---

## 二、 專案目錄結構

```text
Final Report/
├── README.md                           # 本期末報告主文件[cite: 4]
└── pomodoro-kanban/
    ├── index.html                      # 網頁主結構與深色質感介面
    ├── vite.config.js                  # Vite 建置設定與 Vitest 測試排除規則
    ├── playwright.config.js            # Playwright E2E 瀏覽器自動化測試設定
    ├── package.json                    # 專案依賴與測試腳本管理
    ├── src/
    │   ├── core/                       # 【核心邏輯層】純 JS，專注高測試覆蓋率
    │   │   ├── timer.js                # 番茄鐘倒數、模式切換與事件觸發邏輯
    │   │   ├── kanban.js               # 任務增刪改查、看板狀態流轉與番茄數累計
    │   │   └── storage.js              # localStorage 持久化與 JSON 匯出邏輯
    │   └── main.js                     # 【UI 渲染層】事件綁定與畫面狀態同步
    └── tests/
        ├── unit/                       # 【第 3 週】Vitest 單元測試
        │   ├── timer.test.js           # 測試計時器初始化、倒數、歸零回呼
        │   └── kanban.test.js          # 測試任務新增、空標題防呆、狀態移動與刪除
        ├── system/                     # 【第 4 週】系統整合測試
        │   └── integration.test.js     # 測試「番茄鐘完成」自動連動「任務番茄數 +1」
        └── e2e/                        # 【第 6 週】Playwright 端對端測試
            └── app.spec.js             # 模擬真實使用者新增任務、點擊專注與啟動計時