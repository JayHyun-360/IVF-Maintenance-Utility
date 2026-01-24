import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RequestForm from "../RequestForm";
import { useSession } from "next-auth/react";

// Mock the useSession hook
jest.mock("next-auth/react");
const mockUseSession = useSession as jest.MockedFunction<typeof useSession>;

describe("RequestForm", () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          id: "test-user-id",
          name: "Test User",
          email: "test@example.com",
        },
      },
      status: "authenticated",
    } as any);

    // Mock fetch
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form correctly", () => {
    render(<RequestForm />);

    expect(screen.getByText("Maintenance Request Form")).toBeInTheDocument();
    expect(screen.getByLabelText("Request Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Priority")).toBeInTheDocument();
    expect(screen.getByLabelText("Location")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Submit Request" }),
    ).toBeInTheDocument();
  });

  it("submits the form with correct data", async () => {
    const mockFetch = global.fetch as jest.MockedFunction<typeof global.fetch>;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Request created successfully" }),
    } as Response);

    render(<RequestForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText("Request Title"), {
      target: { value: "Test Request" },
    });
    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "PLUMBING" },
    });
    fireEvent.change(screen.getByLabelText("Priority"), {
      target: { value: "MEDIUM" },
    });
    fireEvent.change(screen.getByLabelText("Location"), {
      target: { value: "Building A, Room 101" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test description" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: "Submit Request" }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/maintenance-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Test Request",
          category: "PLUMBING",
          priority: "MEDIUM",
          location: "Building A, Room 101",
          description: "Test description",
          images: [],
          documents: [],
        }),
      });
    });
  });

  it("shows success message after successful submission", async () => {
    const mockFetch = global.fetch as jest.MockedFunction<typeof global.fetch>;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Request created successfully" }),
    } as Response);

    render(<RequestForm />);

    // Fill and submit form
    fireEvent.change(screen.getByLabelText("Request Title"), {
      target: { value: "Test Request" },
    });
    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "PLUMBING" },
    });
    fireEvent.change(screen.getByLabelText("Priority"), {
      target: { value: "MEDIUM" },
    });
    fireEvent.change(screen.getByLabelText("Location"), {
      target: { value: "Building A, Room 101" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test description" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit Request" }));

    await waitFor(() => {
      expect(
        screen.getByText("Request Submitted Successfully!"),
      ).toBeInTheDocument();
    });
  });

  it("shows error message when submission fails", async () => {
    const mockFetch = global.fetch as jest.MockedFunction<typeof global.fetch>;
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Submission failed" }),
    } as Response);

    render(<RequestForm />);

    // Fill and submit form
    fireEvent.change(screen.getByLabelText("Request Title"), {
      target: { value: "Test Request" },
    });
    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "PLUMBING" },
    });
    fireEvent.change(screen.getByLabelText("Priority"), {
      target: { value: "MEDIUM" },
    });
    fireEvent.change(screen.getByLabelText("Location"), {
      target: { value: "Building A, Room 101" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test description" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit Request" }));

    await waitFor(() => {
      expect(screen.getByText("Submission failed")).toBeInTheDocument();
    });
  });
});
