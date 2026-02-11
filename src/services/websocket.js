class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.listeners = [];
    this.reconnectDelay = 3000;
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log(" Connected to WebSocket");
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.listeners.forEach((cb) => cb(data));
      } catch (err) {
        console.error("Invalid JSON:", err);
      }
    };

    this.socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    this.socket.onclose = () => {
      console.log("Disconnected. Reconnecting...");
      setTimeout(() => this.connect(), this.reconnectDelay);
    };
  }

  subscribe(callback) {
    this.listeners.push(callback);
  }

  sendMessage(data) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    }
  }

  disconnect() {
    this.socket?.close();
  }
}

export default WebSocketClient;
