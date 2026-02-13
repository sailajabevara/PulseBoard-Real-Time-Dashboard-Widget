

import React, { useContext } from "react";
import { WebSocketContext } from "../contexts/WebSocketContext";

const NotificationCenter = () => {

  const {
    notifications,
    removeNotification,
    clearAll
  } = useContext(WebSocketContext);

  return (
    <div style={{ marginTop: "30px" }} aria-live="polite">

      <h2>
        Notifications 🔔
      </h2>

      <button
        onClick={clearAll}
        style={{
          marginBottom: "15px",
          padding: "8px 12px",
          borderRadius: "6px",
          border: "none",
          background: "#4c6ef5",
          color: "white",
          cursor: "pointer"
        }}
      >
        Clear All
      </button>

      {notifications.length === 0 && (
        <p>No notifications</p>
      )}

      {notifications.map((note) => (
        <div
          key={note.id}
          style={{
            background: "#f1f3f5",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "10px"
          }}
        >
          <h4>{note.title}</h4>
          <p>{note.message}</p>

          <button
            onClick={() => removeNotification(note.id)}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: "none",
              background: "#5c7cfa",
              color: "white",
              cursor: "pointer"
            }}
          >
            Dismiss
          </button>

        </div>
      ))}

    </div>
  );
};

export default NotificationCenter;
