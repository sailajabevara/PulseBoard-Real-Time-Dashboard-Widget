import { useEffect } from "react";
import WebSocketClient from "./services/websocket";
import RealtimeMetric from "./components/RealtimeMetric";

function App() {

  useEffect(() => {
    const ws = new WebSocketClient(import.meta.env.VITE_WS_URL);

    ws.connect();

    ws.subscribe((data) => {
      console.log("LIVE DATA:", data);
    });

  }, []);

  return (
   <div style={{ padding: "40px" }}>
  <h1>Realtime Dashboard</h1>

  <RealtimeMetric />
</div>
  );
}

export default App;
