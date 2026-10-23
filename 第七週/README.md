```text
my-project/                                 # 專案根目錄
├── .gitignore                              # [檔] Git 忽略檔案設定 (排除 node_modules, target, e2e 報告)
├── package.json                            # [檔] (可選) 專案根目錄一鍵執行所有測試的腳本
├── backend/                                # [資料夾] Rust 後端專案
│   ├── Cargo.toml                          # [檔] Rust 依賴、套件與測試框架設定
│   ├── src/                                # [資料夾] 後端原始碼與單元測試 (Unit Tests)
│   │   ├── main.rs                         # [檔] 後端應用程式進入點
│   │   └── services/                       # [資料夾] 業務邏輯與內建 #[cfg(test)] 單元測試
│   └── tests/                              # [資料夾] Web API 系統/整合測試 (System / API Tests)
│       └── api_tests.rs                    # [檔] 對後端 API 發送 HTTP 請求測試的腳本
├── frontend/                               # [資料夾] Node.js 前端專案 (React / Vue / Vite)
│   ├── package.json                        # [檔] 前端套件依賴 (含 typescript, @types/node)
│   ├── tsconfig.json                       # [檔] 前端 TypeScript 設定檔 (已含 "node" 型別)
│   ├── vite.config.ts                      # [檔] Vite 建置設定檔
│   └── src/                                # [資料夾] 前端原始碼
│       ├── main.ts (或 main.tsx)           # [檔] 前端應用程式進入點
│       └── App.tsx                         # [檔] 主 UI 元件
└── e2e/                                    # [資料夾] Playwright E2E 測試專案
    ├── package.json                        # [檔] E2E 套件依賴 (含 @playwright/test, @types/node)
    ├── tsconfig.json                       # [檔] E2E TypeScript 設定檔 (解決 process 報錯)
    ├── playwright.config.ts                # [檔] Playwright 執行與自動啟動前後端 Server 的設定
    └── tests/                              # [資料夾] E2E 測試腳本
        └── example.spec.ts                 # [檔] 無頭瀏覽器自動化測試腳本
```