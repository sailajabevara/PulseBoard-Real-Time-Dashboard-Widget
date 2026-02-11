import { useEffect } from "react";
import WebSocketClient from "./services/websocket";

function App() {

  useEffect(() => {
    const ws = new WebSocketClient(import.meta.env.VITE_WS_URL);

    ws.connect();

    ws.subscribe((data) => {
      console.log("LIVE DATA:", data);
    });

  }, []);

  return (
    <div>
      <h1>Realtime Dashboard</h1>
    </div>
  );
}

export default App;
