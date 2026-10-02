import argparse
import sys
import httpx
from rich.console import Console
from rich.syntax import Syntax
from rich.panel import Panel
from rich.table import Table

console = Console()

def parse_headers(header_list):
    """將 ['Key: Value', ...] 格式解析為字典"""
    headers = {}
    if not header_list:
        return headers
    for item in header_list:
        if ":" in item:
            key, value = item.split(":", 1)
            headers[key.strip()] = value.strip()
    return headers

def main():
    parser = argparse.ArgumentParser(
        description="my_curl - 類似 curl 的現代化命令列 HTTP 工具"
    )
    parser.add_argument("url", help="目標 URL (例如: https://httpbin.org/get)")
    parser.add_argument(
        "-X", "--method", default="GET", help="指定 HTTP 方法 (預設: GET)"
    )
    parser.add_argument(
        "-H", "--header", action="append", help="自訂 Request Header (可多次使用, 例: -H 'Content-Type: application/json')"
    )
    parser.add_argument(
        "-d", "--data", help="傳送的 Request Body 資料"
    )
    parser.add_argument(
        "-o", "--output", help="將 Response Body 儲存至指定檔案"
    )
    parser.add_argument(
        "-i", "--include", action="store_true", help="在輸出中顯示 HTTP Response Header"
    )

    args = parser.parse_args()

    # 自動修正未帶 http/https 協定的 URL
    url = args.url
    if not url.startswith(("http://", "https://")):
        url = "http://" + url

    headers = parse_headers(args.header)
    method = args.method.upper()

    try:
        # 發送 HTTP 請求 (設定 10 秒逾時)
        with httpx.Client(timeout=10.0, follow_redirects=True) as client:
            response = client.request(
                method=method,
                url=url,
                headers=headers,
                content=args.data
            )

        # 1. 顯示 Response Header (若帶有 -i 參數)
        if args.include:
            table = Table(title=f"HTTP/{response.http_version} {response.status_code} {response.reason_phrase}")
            table.add_column("Header", style="cyan")
            table.add_column("Value", style="magenta")
            for k, v in response.headers.items():
                table.add_row(k, v)
            console.print(table)
            console.print()

        # 2. 處理 Response Body 輸出或存檔
        body_text = response.text

        if args.output:
            with open(args.output, "w", encoding="utf-8") as f:
                f.write(body_text)
            console.print(f"[bold green]✓[bold green] 已成功將回應寫入檔案: {args.output}")
        else:
            # 嘗試排版與高亮 JSON 回應
            content_type = response.headers.get("content-type", "")
            if "application/json" in content_type or body_text.strip().startswith(("{", "[")):
                syntax = Syntax(body_text, "json", theme="monokai", word_wrap=True)
                console.print(Panel(syntax, title=f"Status: {response.status_code}", subtitle=url))
            else:
                console.print(body_text)

    except httpx.RequestError as exc:
        console.print(f"[bold red]網路請求失敗:[bold red] {exc}")
        sys.exit(1)

if __name__ == "__main__":
    main()
