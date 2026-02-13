

import React, { useContext } from "react";
import { WebSocketContext } from "../contexts/WebSocketContext";

const RealtimeMetric = () => {

  const { metric, status } = useContext(WebSocketContext);

  const getStatusColor = () => {
    if (status === "Connected") return "green";
    if (status === "Disconnected") return "red";
    return "orange";
  };

  return (
    <div>
      <h2>Active Users</h2>

      <h1 style={{ fontSize: "48px", margin: "10px 0" }}>
        {metric === 0 ? "Loading..." : metric}
      </h1>

      {/* Connection Error UI */}
      {status === "Disconnected" && (
        <div style={{
          background: "#ffe6e6",
          padding: "10px",
          borderRadius: "8px",
          color: "red",
          marginBottom: "10px"
        }}>
          ⚠️ Connection lost. Trying to reconnect...
        </div>
      )}

      <p style={{
        fontWeight: "bold",
        color: getStatusColor()
      }}>
        Status: {status}
      </p>

    </div>
  );
};

export default RealtimeMetric;
