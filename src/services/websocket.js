class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.messageCallback = null;
    this.openCallback = null;
    this.closeCallback = null;
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log("Connected to WebSocket");
      if (this.openCallback) this.openCallback();
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (this.messageCallback) {
          this.messageCallback(data);
        }
      } catch (error) {
        console.error("Invalid JSON:", error);
      }
    };

    this.ws.onclose = () => {
      console.log("Disconnected. Reconnecting...");
      if (this.closeCallback) this.closeCallback();

      setTimeout(() => {
        this.connect();
      }, 3000);
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
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
    this.ws.close();
  }
}

export default WebSocketClient;
