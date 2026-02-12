

import { useContext } from "react";
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

      {/*Show warning when disconnected */}
      {status === "Disconnected" && (
        <div
          style={{
            background: "#ffe5e5",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px",
            color: "red",
            fontWeight: "bold"
          }}
        >
           Connection lost. Trying to reconnect...
        </div>
      )}

      {/*  Loading state */}
      <h1 style={{ fontSize: "48px", margin: "10px 0" }}>
        {metric === 0 ? "Loading realtime data..." : metric}
      </h1>

      {/* nStatus with color */}
      <p
        style={{
          fontWeight: "bold",
          color: getStatusColor(),
        }}
      >
        Status: {status}
      </p>

    </div>
  );
};

export default RealtimeMetric;
