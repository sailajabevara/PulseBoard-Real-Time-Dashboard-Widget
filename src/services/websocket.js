class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.ws = null;

    this.messageCallback = null;
    this.openCallback = null;
    this.closeCallback = null;

    this.reconnectDelay = 3000;
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log("✅ Connected to WebSocket");

      this.reconnectDelay = 3000; // reset delay

      if (this.openCallback) this.openCallback();
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (this.messageCallback) {
          this.messageCallback(data);
        }

      } catch {
        console.error("❌ Invalid JSON received");
      }
    };

    this.ws.onclose = () => {
      console.log("⚠️ Disconnected. Reconnecting...");

      if (this.closeCallback) this.closeCallback();

      setTimeout(() => {
        this.connect();
      }, this.reconnectDelay);

      // exponential backoff 🔥
      this.reconnectDelay = Math.min(this.reconnectDelay * 2, 15000);
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.ws.close();
    };
  }

  subscribe(callback) {
    this.messageCallback = callback;
  }

  onOpen(callback) {
    this.openCallback = callback;
  }

  onClose(callback) {
    this.closeCallback = callback;
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

export default WebSocketClient;
