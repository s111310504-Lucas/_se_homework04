use axum::{
    body::Body,
    http::{Request, StatusCode},
};
use backend::create_app; // 成功引入 src/lib.rs 的函數
use http_body_util::BodyExt;
use serde_json::Value;
use tower::ServiceExt; // 提供 oneshot 方法

#[tokio::test]
async fn test_health_endpoint_system_test() {
    let app = create_app();

    // 1. 發送 GET /health 請求
    let response = app
        .oneshot(
            Request::builder()
                .uri("/health")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    // 2. 驗證 HTTP 狀態碼為 200 OK
    assert_eq!(response.status(), StatusCode::OK);

    // 3. 解析 Response Body JSON
    let body = response.into_body().collect().await.unwrap().to_bytes();
    let body_json: Value = serde_json::from_slice(&body).unwrap();

    // 4. 斷言內容是否符合預期
    assert_eq!(body_json["status"], "ok");
    assert_eq!(body_json["message"], "Server is running perfectly!");
}