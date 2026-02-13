import { describe, it, expect, vi } from "vitest";
import WebSocketClient from "../services/websocket";

global.WebSocket = vi.fn(() => ({
  onopen: null,
  onmessage: null,
  onclose: null,
  onerror: null,
  close: vi.fn()
}));

describe("WebSocketClient", () => {

  it("should create websocket connection", () => {

    const client = new WebSocketClient("ws://localhost:8080");

    client.connect();

    expect(WebSocket).toHaveBeenCalledWith("ws://localhost:8080");
  });


  it("should handle incoming messages", () => {

    const client = new WebSocketClient("ws://localhost:8080");

    const mockCallback = vi.fn();

    client.subscribe(mockCallback);

    client.connect();

    const message = {
      type: "metric",
      value: 500
    };

    // simulate message
    client.ws.onmessage({
      data: JSON.stringify(message)
    });

    expect(mockCallback).toHaveBeenCalledWith(message);
  });


  it("should close websocket", () => {

    const client = new WebSocketClient("ws://localhost:8080");

    client.connect();

    client.disconnect();

    expect(client.ws.close).toHaveBeenCalled();
  });

});
