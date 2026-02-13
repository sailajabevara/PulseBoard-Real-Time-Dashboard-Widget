
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { WebSocketProvider } from "./contexts/WebSocketContext";
import ErrorBoundary from "./components/ErrorBoundary";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <WebSocketProvider>
        <App />
      </WebSocketProvider>
    </ErrorBoundary>
  </React.StrictMode>
)
