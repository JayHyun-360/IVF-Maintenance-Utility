import React from "react";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import BackButton from "../BackButton";

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock window object
Object.defineProperty(window, "history", {
  value: {
    length: 1,
  },
  writable: true,
});

describe("BackButton", () => {
  const mockPush = jest.fn();
  const mockBack = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      back: mockBack,
    });
    mockPush.mockClear();
    mockBack.mockClear();
  });

  it("renders back button with correct text", () => {
    render(<BackButton />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Back");
  });

  it("applies custom className when provided", () => {
    render(<BackButton className="custom-class" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("calls router.push when no history available", () => {
    // Mock window.history.length <= 2
    Object.defineProperty(window, "history", {
      value: { length: 1 },
      writable: true,
    });

    render(<BackButton fallback="/test-fallback" />);
    const button = screen.getByRole("button");
    button.click();

    expect(mockPush).toHaveBeenCalledWith("/test-fallback");
    expect(mockBack).not.toHaveBeenCalled();
  });

  it("calls router.back when history exists", () => {
    // Mock window.history.length > 2
    Object.defineProperty(window, "history", {
      value: { length: 3 },
      writable: true,
    });

    render(<BackButton />);
    const button = screen.getByRole("button");
    button.click();

    expect(mockBack).toHaveBeenCalledTimes(1);
    expect(mockPush).not.toHaveBeenCalled();
  });
});
