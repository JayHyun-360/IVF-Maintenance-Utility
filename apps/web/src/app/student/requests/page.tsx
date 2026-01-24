"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MobileRequestsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("pending");

  // Mock data - in real app, this would come from database
  const requests = {
    pending: [
      {
        id: 1,
        title: "Leaky faucet in bathroom",
        location: "Dorm 2, Room 301",
        priority: "MEDIUM",
        date: "2024-01-25",
        status: "PENDING",
      },
      {
        id: 2,
        title: "Broken light bulb",
        location: "Library, 2nd Floor",
        priority: "LOW",
        date: "2024-01-24",
        status: "PENDING",
      },
    ],
    inProgress: [
      {
        id: 3,
        title: "AC not working",
        location: "Dorm 1, Room 205",
        priority: "HIGH",
        date: "2024-01-23",
        status: "IN_PROGRESS",
      },
    ],
    completed: [
      {
        id: 4,
        title: "Window repair",
        location: "Dorm 3, Room 102",
        priority: "LOW",
        date: "2024-01-22",
        status: "COMPLETED",
      },
    ],
  };

  const currentRequests = requests[activeTab as keyof typeof requests] || [];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-700";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700";
      case "LOW":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile Sidebar - Optimized Width */}
      <div className="w-12 bg-gray-900 flex flex-col items-center py-3 space-y-4">
        {/* Logo - Smaller */}
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </div>

        {/* Navigation Items - Proper Touch Targets */}
        <nav className="flex-1 flex flex-col space-y-3">
          <button
            onClick={() => router.push("/student")}
            className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 hover:bg-gray-600"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
          <button
            onClick={() => router.push("/student/requests")}
            className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </button>
          <button
            onClick={() => router.push("/student/messages")}
            className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 hover:bg-gray-600"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
          <button
            onClick={() => router.push("/student/profile")}
            className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 hover:bg-gray-600"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </nav>

        {/* User Avatar - Smaller */}
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
      </div>

      {/* Main Content - Full Height No Scroll */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header - Compact */}
        <header className="bg-blue-600 px-4 py-3 flex items-center justify-between">
          <h1 className="text-white font-medium text-base">My Requests</h1>
          <button onClick={() => router.push("/")} className="text-white p-1">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>

        {/* Tabs - Compact */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("pending")}
            className={`flex-1 py-2 text-xs font-medium ${
              activeTab === "pending"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveTab("inProgress")}
            className={`flex-1 py-2 text-xs font-medium ${
              activeTab === "inProgress"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`flex-1 py-2 text-xs font-medium ${
              activeTab === "completed"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Requests List - Scrollable Only This Section */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {currentRequests.length === 0 ? (
            <div className="text-center py-8">
              <svg
                className="w-12 h-12 text-gray-300 mx-auto mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-sm text-gray-500">
                No {activeTab.replace("_", " ").toLowerCase()} requests
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {currentRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white border border-gray-200 rounded-lg p-3"
                >
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-medium text-gray-900 text-sm">
                      {request.title}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                        request.priority,
                      )}`}
                    >
                      {request.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    {request.location}
                  </p>
                  <p className="text-xs text-gray-500">{request.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
