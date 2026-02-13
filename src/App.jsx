import React from "react";
import RealtimeMetric from "./components/RealtimeMetric";
import NotificationCenter from "./components/NotificationCenter";
import "./App.css";

function App() {
  return (
    <div className="dashboard">

      <h1>Realtime Dashboard</h1>

      <div className="cards">
        <div className="card">
          <RealtimeMetric />
        </div>

        <div className="card">
          <NotificationCenter />
        </div>
      </div>

    </div>
  );
}

export default App;
