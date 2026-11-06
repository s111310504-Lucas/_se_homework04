use backend::create_app;
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    let app = create_app();
    let addr = SocketAddr::from(([127, 0, 0, 1], 8080));
    println!("Server running on http://{}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}