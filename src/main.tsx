import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './lib/console-logger'; // CRITICAL: DO NOT DELETE THIS LINE
import { BrowserRouter } from 'react-router-dom';

// Simple ErrorBoundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900 font-sans">
          <div className="text-center p-8 bg-white shadow-xl rounded-2xl border border-slate-200">
            <h2 className="text-2xl font-bold mb-2">Something went wrong.</h2>
            <p className="text-slate-500 mb-4">Please refresh the page or try again later.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
