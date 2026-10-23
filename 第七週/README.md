# 全棧網站應用程式 (Full-Stack Web App)

本專案是一個包含 **Rust (Axum) 後端**、**React (Vite + TypeScript) 前端** 以及 **Playwright 完整三層測試架構** 的全棧 Web 應用程式。

---

## 🛠️ 技術棧說明

- **後端 (Backend)**: Rust, Axum, Tokio, Serde
- **前端 (Frontend)**: React 18, Vite, TypeScript
- **E2E 測試**: Playwright (Automated Headless Browser)
- **版本控制與工作流**: Git, npm workspace / Root scripts

---

## 📁 專案目錄結構

```text
my-project(第七週)/                                 # 專案根目錄
├── .gitignore                              # [檔] Git 忽略檔案設定
├── package.json                            # [檔] 專案根目錄一鍵執行測試的腳本
├── README.md                               # [檔] 專案說明文件
├── backend/                                # [資料夾] Rust 後端專案 (Library + Binary 架構)
│   ├── Cargo.toml                          # [檔] Rust 依賴與測試框架設定
│   ├── src/                                # [資料夾] 後端原始碼與單元測試
│   │   ├── lib.rs                          # [檔] 核心業務邏輯、路由與單元測試 (Unit Tests)
│   │   └── main.rs                         # [檔] 後端應用程式進入點 (HTTP Server)
│   └── tests/                              # [資料夾] Web API 系統/整合測試 (System / API Tests)
│       └── api_tests.rs                    # [檔] 對後端 API 發送 HTTP 請求測試腳本
├── frontend/                               # [資料夾] Node.js 前端專案 (React / Vite / TS)
│   ├── index.html                          # [檔] 前端 HTML 模版
│   ├── package.json                        # [檔] 前端套件依賴
│   ├── tsconfig.json                       # [檔] 前端 TypeScript 設定檔
│   ├── vite.config.ts                      # [檔] Vite 建置與 API Proxy 設定檔
│   └── src/                                # [資料夾] 前端原始碼
│       ├── main.tsx                        # [檔] 前端應用程式進入點
│       └── App.tsx                         # [檔] 主 UI 元件 (含後端 API 串接與測試 ID)
└── e2e/                                    # [資料夾] Playwright E2E 測試專案
    ├── package.json                        # [檔] E2E 套件依賴
    ├── tsconfig.json                       # [檔] E2E TypeScript 設定檔
    ├── playwright.config.ts                # [檔] Playwright 設定 (含自動啟動前後端 Server)
    └── tests/                              # [資料夾] E2E 測試腳本
        └── example.spec.ts                 # [檔] 無頭瀏覽器端到端自動化測試腳本
```

---

## 🚀 快速開始 (Quick Start)

### 前置需求
- [Rust Toolchain](https://rustup.rs/) (含 `rustc` 與 `cargo`)
- [Node.js](https://nodejs.org/) (v18+ 建議)

### 1. 開發模式啟動

**啟動後端伺服器 (Port 8080):**
```bash
cd backend
cargo run
```

**啟動前端開發伺服器 (Port 5173):**
```bash
cd frontend
npm install
npm run dev
```
> 前端已設定 Vite Proxy，存取 `http://localhost:5173/api/health` 會自動轉發至後端 `http://127.0.0.1:8080/health`。

---

## 🧪 測試執行說明

本專案實作了完整的**三層測試架構**：

### 1. 後端單元測試 (Backend Unit Tests)
測試 `lib.rs` 中的核心商業邏輯函數。
```bash
cd backend
cargo test --lib
```

### 2. 後端 Web API 系統測試 (Backend System/API Tests)
模擬 HTTP 客戶端對 Axum 路由發送請求並驗證回應狀態碼與 JSON。
```bash
cd backend
cargo test --test api_tests
```

### 3. 前端 TypeScript 型別檢查 (Frontend Type Check)
```bash
cd frontend
npm run typecheck
```

### 4. 端到端自動化測試 (Playwright E2E Tests)
Playwright 會自動拉起後端與前端 Server，開啟無頭瀏覽器模擬真實使用者點擊與驗證 API 串接結果。
```bash
cd e2e
npm install
npx playwright install chromium # 第一次執行需安裝瀏覽器核心
npx playwright test
```

*開啟 UI 互動式調試模式：*
```bash
cd e2e
npm run test:ui
```

---

## 💡 根目錄一鍵腳本

若在根目錄的 `package.json` 設定了腳本，可直接執行：

- 執行全部測試：`npm run test:all`
- 執行 E2E 測試：`npm run test:e2e`