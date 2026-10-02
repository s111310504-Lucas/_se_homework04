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

### 第三步：加分項！設定 GitHub Actions 自動化測試 (CI)

在現代軟體工程中，**每一次 Push 自動執行測試**是標準流程。

1. 在專案資料夾下建立資料夾結構：`.github/workflows/`
2. 在裡面新增一個檔案 `ci.yml`：

```yaml
name: Python CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Check out code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/python-action@v5
        with:
          python-version: '3.10'

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      - name: Run pytest
        run: |
          pytest
