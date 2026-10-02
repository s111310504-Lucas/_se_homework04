#111310504 My Curl App (`my_curl`)

[![Python CI](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY/actions)
![Python Version](https://img.shields.io/badge/python-3.9%2B-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

`my_curl` 是一個使用 **Python**、**`httpx`** 與 **`rich`** 實作的現代化類 `curl` 命令列（CLI）工具。

本專案為 **現代軟體工程（Modern Software Engineering）** 課程習題，旨在透過 **AI 協同開發（AI-Driven Development / OpenCode）** 與 **CI/CD 自動化測試**，展現現代軟體設計原則、模組化架構與高品質代碼開發流程。

---

## 🌟 核心特色 (Key Features)

- 🚀 **完整 HTTP 方法支援**：支援 `GET`、`POST`、`PUT`、`DELETE` 等常見請求。
- 🎨 **現代化終端機美化 (Rich Console)**：自動針對 JSON 回應進行語法高亮（Syntax Highlighting）與格式化排版。
- 📋 **詳細標頭檢視 (`-i`)**：提供格式化的表格以檢視 HTTP Response Headers 與狀態碼。
- 💾 **回應輸出控制 (`-o`)**：可直接將伺服器回應寫入本機指定檔案。
- 🛡️ **堅固的錯誤處理**：自動補充缺失的 URL 協定（如 `http://`），並處理網路連線逾時與例外狀況。
- 🧪 **自動化測試與 CI 流程**：內建 `pytest` 單元測試，並配置 GitHub Actions CI 流程。

---

## 📂 專案架構 (Project Structure)

專案採用清晰的模組化結構，分離核心邏輯、測試案例與自動化腳本：

```text
my-curl-app/
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions 自動化測試 (CI) 設定
├── .gitignore              # 版控忽略檔案清單
├── main.py                 # CLI 入口點與核心 HTTP 執行邏輯
├── test_cli.py             # 針對參數解析與核心邏輯的 pytest 單元測試
├── requirements.txt        # 專案依賴套件清單
└── README.md               # 專案說明文件
