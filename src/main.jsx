import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portfolio Caught Error:', error, errorInfo)
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '40px auto', backgroundColor: '#18181b', color: '#f4f4f5', borderRadius: '16px', border: '1px solid #3f3f46' }}>
          <h2 style={{ color: '#ef4444', fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>⚠️ เกิดข้อผิดพลาดในการโหลดหน้าเว็บ</h2>
          <pre style={{ backgroundColor: '#27272a', padding: '16px', borderRadius: '8px', color: '#fca5a5', overflowX: 'auto', fontSize: '14px', marginBottom: '16px' }}>
            {this.state.error?.toString()}
          </pre>
          <details style={{ fontSize: '12px', color: '#a1a1aa' }}>
            <summary style={{ cursor: 'pointer', marginBottom: '8px' }}>ดู Stack Trace ละเอียด</summary>
            <pre style={{ backgroundColor: '#27272a', padding: '12px', borderRadius: '8px', overflowX: 'auto' }}>
              {this.state.errorInfo?.componentStack}
            </pre>
          </details>
          <div style={{ marginTop: '24px' }}>
            <a href="/" style={{ display: 'inline-block', padding: '8px 16px', backgroundColor: '#6366f1', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', marginRight: '12px' }}>
              ลองโหลดหน้าแรกใหม่
            </a>
            <a href="/athletics" style={{ display: 'inline-block', padding: '8px 16px', backgroundColor: '#fc5200', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
              ไปหน้า Strava
            </a>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)

