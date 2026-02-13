
import React, { createContext, useEffect, useState } from "react";
import WebSocketClient from "../services/websocket";

export const WebSocketContext = createContext();

const ws = new WebSocketClient(import.meta.env.VITE_WS_URL);

export const WebSocketProvider = ({ children }) => {

  const [metric, setMetric] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {

    ws.connect();

    ws.onOpen(() => {
      setStatus("Connected");
    });

    ws.onClose(() => {
      setStatus("Disconnected");
    });

    ws.subscribe((data) => {

      if (data.type === "metric") {
        setMetric(data.value);
      }

      if (data.type === "notification") {
        setNotifications(prev => [
          {
            id: crypto.randomUUID(), // prevents duplicate key error
            title: data.title,
            message: data.message
          },
          ...prev
        ].slice(0,5));
      }

    });

    return () => {
      ws.disconnect();
    };

  }, []);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <WebSocketContext.Provider
      value={{
        metric,
        notifications,
        status,
        removeNotification,
        clearAll
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
