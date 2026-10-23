# 全棧網站應用程式 (Full-Stack Web App)

本專案是一個包含 Rust 後端、Vite 前端以及完整三層測試架構的全棧網站應用。

## 📁 專案目錄結構

```text
my-project/                                 # 專案根目錄
├── .gitignore                              # [檔] Git 忽略檔案設定
├── package.json                            # [檔] 專案根目錄一鍵執行所有測試的腳本
├── backend/                                # [資料夾] Rust 後端專案
│   ├── Cargo.toml                          # [檔] Rust 依賴與測試框架設定
│   ├── src/                                # [資料夾] 後端原始碼與單元測試 (Unit Tests)
│   │   ├── main.rs                         # [檔] 後端應用程式進入點
│   │   └── services/                       # [資料夾] 業務邏輯與單元測試
│   └── tests/                              # [資料夾] Web API 系統/整合測試 (System / API Tests)
│       └── api_tests.rs                    # [檔] 對後端 API 發送 HTTP 請求測試腳本
├── frontend/                               # [資料夾] Node.js 前端專案 (React / Vite)
│   ├── package.json                        # [檔] 前端套件依賴
│   ├── tsconfig.json                       # [檔] 前端 TypeScript 設定檔
│   ├── vite.config.ts                      # [檔] Vite 建置設定檔
│   └── src/                                # [資料夾] 前端原始碼
│       ├── main.tsx                        # [檔] 前端應用程式進入點
│       └── App.tsx                         # [檔] 主 UI 元件
└── e2e/                                    # [資料夾] Playwright E2E 測試專案
    ├── package.json                        # [檔] E2E 套件依賴
    ├── tsconfig.json                       # [檔] E2E TypeScript 設定檔
    ├── playwright.config.ts                # [檔] Playwright 執行與自動啟動前後端 Server 設定
    └── tests/                              # [資料夾] E2E 測試腳本
        └── example.spec.ts                 # [檔] 無頭瀏覽器自動化測試腳本
```

---

## 🧪 測試執行說明

### 1. 後端單元測試 (Unit Tests)
```bash
cd backend
cargo test --lib
```

### 2. 後端 Web API 系統測試 (System Tests)
```bash
cd backend
cargo test --test '*'
```

### 3. 前端單元測試 (Optional)
```bash
cd frontend
npm run test:unit
```

### 4. E2E 無頭瀏覽器測試 (Playwright)
```bash
cd e2e
npx playwright test
```
*UI 調試模式：*
```bash
cd e2e
npx playwright test --ui
```