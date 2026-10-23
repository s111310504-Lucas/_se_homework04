import { useEffect, useState } from 'react';

interface HealthData {
  status: string;
  message: String;
}

export default function App() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 透過 Vite Proxy 呼叫後端 API (/api/health -> http://127.0.0.1:8080/health)
    fetch('/api/health')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: HealthData) => {
        setHealth(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch health status:', err);
        setError('Cannot connect to backend server');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Full-Stack Web App</h1>
      <p>Frontend: React + Vite + TypeScript</p>
      <hr />

      <h2>Backend Status Check</h2>
      {loading && <p data-testid="status-loading">Loading backend status...</p>}
      {error && <p data-testid="status-error" style={{ color: 'red' }}>{error}</p>}
      {health && (
        <div data-testid="status-success" style={{ padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
          <p><strong>Status:</strong> {health.status}</p>
          <p><strong>Message:</strong> {health.message}</p>
        </div>
      )}
    </div>
  );
}