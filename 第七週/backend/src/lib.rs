use axum::{routing::get, Json, Router};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct HealthResponse {
    pub status: String,
    pub message: String,
}

// 商業邏輯：純函數單元測試
pub fn check_health_status() -> HealthResponse {
    HealthResponse {
        status: "ok".to_string(),
        message: "Server is running perfectly!".to_string(),
    }
}

// API Handler
async fn health_handler() -> Json<HealthResponse> {
    Json(check_health_status())
}

// 供 main.rs 與 tests/api_tests.rs 共用的 Router 工廠函數
pub fn create_app() -> Router {
    Router::new().route("/health", get(health_handler))
}

// ==========================================
// 1. 單元測試 (Unit Tests)
// ==========================================
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_check_health_status() {
        let response = check_health_status();
        assert_eq!(response.status, "ok");
        assert_eq!(response.message, "Server is running perfectly!");
    }
}