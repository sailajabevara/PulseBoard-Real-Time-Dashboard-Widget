import { useEffect, useState } from "react";
import WebSocketClient from "../services/websocket";

const ws = new WebSocketClient(import.meta.env.VITE_WS_URL);

function RealtimeMetric() {

  const [metric, setMetric] = useState(0);
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {

    ws.connect();

    ws.onOpen(() => {
      setStatus("Connected ✅");
    });

    ws.onClose(() => {
      setStatus("Disconnected ❌");
    });

    ws.subscribe((data) => {
      if (data.type === "metric") {
        setMetric(data.value);
      }
    });

  }, []);

  return (
    <div style={{
      padding: "20px",
      border: "2px solid #ddd",
      borderRadius: "10px",
      width: "300px"
    }}>
      <h2>Active Users</h2>

      <h1>{metric}</h1>

      <p>Status: {status}</p>
    </div>
  );
}

export default RealtimeMetric;
