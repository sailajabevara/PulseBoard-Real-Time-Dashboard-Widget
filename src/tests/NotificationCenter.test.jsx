import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import NotificationCenter from "../components/NotificationCenter";
import { WebSocketContext } from "../contexts/WebSocketContext";


test("renders notifications", () => {

  const mockContext = {
    notifications: [
      { id: 1, title: "Test Alert", message: "This is a test" }
    ],
    removeNotification: () => {},
    clearAll: () => {}
  };

  render(
    <WebSocketContext.Provider value={mockContext}>
      <NotificationCenter />
    </WebSocketContext.Provider>
  );

  expect(screen.getByText("Test Alert")).toBeInTheDocument();
});
