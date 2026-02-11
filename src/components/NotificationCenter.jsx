import { useEffect, useState } from "react";
import WebSocketClient from "../services/websocket";

const ws = new WebSocketClient(import.meta.env.VITE_WS_URL);

function NotificationCenter() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    ws.connect();

    ws.subscribe((data) => {

      if (data.type === "notification") {

        setNotifications((prev) => [
          ...prev,
          {
            id: Date.now(),
            title: data.title,
            message: data.message
          }
        ]);

      }

    });

  }, []);

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (

    <div style={{
      marginTop: "30px",
      padding: "20px",
      border: "2px solid #ddd",
      borderRadius: "10px",
      width: "350px"
    }}>

      <h2>Notifications 🔔</h2>

      <button onClick={clearAll}>
        Clear All
      </button>

      {notifications.map((n) => (

        <div key={n.id}
          style={{
            background: "#f5f5f5",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "8px"
          }}
        >

          <strong>{n.title}</strong>
          <p>{n.message}</p>

          <button onClick={() => removeNotification(n.id)}>
            Dismiss
          </button>

        </div>

      ))}

    </div>

  );
}

export default NotificationCenter;
