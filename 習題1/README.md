# 111310405 My Curl App

一個使用 Python 與 `httpx` / `rich` 實作的現代化類 curl 命令列工具。

## 核心功能
- 支援 GET, POST, PUT, DELETE 等 HTTP 方法
- 支援自訂 Header (`-H`) 與 Request Body (`-d`)
- 自動彩色與高亮排版 JSON 輸出
- 支援將回應儲存至檔案 (`-o`) 與印出 HTTP Header (`-i`)

## 安裝與執行
```bash
pip install -r requirements.txt

# 測試 GET 請求
python main.py [https://httpbin.org/get](https://httpbin.org/get)

# 執行單元測試
pytest
