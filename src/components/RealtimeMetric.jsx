// import { useContext } from "react";
// import { WebSocketContext } from "../contexts/WebSocketContext";

// function RealtimeMetric() {

//   const { metric, status } = useContext(WebSocketContext);

//   return (
//     <div style={{
//       padding: "20px",
//       border: "2px solid #ddd",
//       borderRadius: "10px",
//       width: "300px"
//     }}>
//       <h2>Active Users</h2>

//       <h1>{metric}</h1>

//       <p>Status: {status}</p>
//     </div>
//   );
// }

// export default RealtimeMetric;

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

      <h1 style={{ fontSize: "48px", margin: "10px 0" }}>
        {metric === 0 ? "Loading..." : metric}
      </h1>

      <p style={{ color: getStatusColor(), fontWeight: "bold" }}>
        Status: {status}
      </p>
    </div>
  );
};

export default RealtimeMetric;
