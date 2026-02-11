import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { WebSocketProvider } from "./contexts/WebSocketContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  
)
