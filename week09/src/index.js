export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // 1. 後端 API 路由：取得伺服器時間與訊息
        if (url.pathname === "/api/info") {
            const data = {
                message: "Hello from Cloudflare Workers!",
                timestamp: new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" }),
                author: "Lucas"
            };
            return new Response(JSON.stringify(data), {
                headers: { "content-type": "application/json;charset=UTF-8" }
            });
        }

        // 2. 前端 HTML 頁面
        const html = `
      <!DOCTYPE html>
      <html lang="zh-TW">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Week09 Cloudflare App</title>
        <style>
          body { font-family: system-ui, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; line-height: 1.6; }
          .card { border: 1px solid #ddd; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          button { background: #f38020; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; font-size: 16px; }
          button:hover { background: #e06c10; }
          #result { margin-top: 15px; background: #f9f9f9; padding: 10px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>🚀 Cloudflare Worker 小專案</h1>
          <p>這是現代軟體工程第九週作業。</p>
          <button onclick="fetchApi()">呼叫後端 API</button>
          <div id="result">點擊按鈕以取得資料...</div>
        </div>

        <script>
          async function fetchApi() {
            const res = await fetch('/api/info');
            const data = await res.json();
            document.getElementById('result').innerHTML = \`
              <strong>訊息：</strong> \${data.message}<br>
              <strong>時間：</strong> \${data.timestamp}<br>
              <strong>作者：</strong> \${data.author}
            \`;
          }
        </script>
      </body>
      </html>
    `;

        return new Response(html, {
            headers: { "content-type": "text/html;charset=UTF-8" }
        });
    }
};