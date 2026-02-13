
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NotificationCenter from "../components/NotificationCenter";
import { WebSocketContext } from "../contexts/WebSocketContext";

test("renders notifications", () => {

  const mockContext = {
    notifications: [
      {
        id: "1",
        title: "Test Alert",
        message: "This is a test notification"
      }
    ],
    removeNotification: vi.fn(),
    clearAll: vi.fn()
  };

  render(
    <WebSocketContext.Provider value={mockContext}>
      <NotificationCenter />
    </WebSocketContext.Provider>
  );

  expect(screen.getByText("Test Alert")).toBeInTheDocument();
});

test("dismiss button works", () => {

  const removeNotification = vi.fn();

  const mockContext = {
    notifications: [
      {
        id: "1",
        title: "Test Alert",
        message: "Dismiss test"
      }
    ],
    removeNotification,
    clearAll: vi.fn()
  };

  render(
    <WebSocketContext.Provider value={mockContext}>
      <NotificationCenter />
    </WebSocketContext.Provider>
  );

  fireEvent.click(screen.getByText("Dismiss"));

  expect(removeNotification).toHaveBeenCalledWith("1");
});

test("clear all button works", () => {

  const clearAll = vi.fn();

  const mockContext = {
    notifications: [],
    removeNotification: vi.fn(),
    clearAll
  };

  render(
    <WebSocketContext.Provider value={mockContext}>
      <NotificationCenter />
    </WebSocketContext.Provider>
  );

  fireEvent.click(screen.getByText("Clear All"));

  expect(clearAll).toHaveBeenCalled();
});
