
import React, { createContext, useEffect, useState } from "react";
import WebSocketClient from "../services/websocket";

export const WebSocketContext = createContext();


const wsClient = new WebSocketClient(import.meta.env.VITE_WS_URL);


export const WebSocketProvider = ({ children }) => {

  const [metric, setMetric] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {

  wsClient.connect();

  wsClient.onOpen(() => {
    setStatus("Connected");
  });

  wsClient.onClose(() => {
    setStatus("Disconnected");
  });

  wsClient.subscribe((data) => {

    if (data.type === "metric") {
      setMetric(data.value);
    }

    if (data.type === "notification") {
      setNotifications(prev => [
        {
          id: crypto.randomUUID(),
          title: data.title,
          message: data.message
        },
        ...prev
      ].slice(0,5));
    }

  });

  return () => {
    wsClient.disconnect();
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
