"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MobileMessagesPage() {
  const router = useRouter();
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  // Mock data - in real app, this would come from database
  const messages = [
    {
      id: 1,
      sender: "Maintenance Team",
      subject: "Your faucet repair is scheduled",
      message:
        "We've scheduled your faucet repair for tomorrow between 10-12 AM. Please ensure someone is available.",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      sender: "Admin Office",
      subject: "Request approved",
      message:
        "Your maintenance request has been approved and assigned to our team.",
      time: "1 day ago",
      unread: false,
    },
    {
      id: 3,
      sender: "System",
      subject: "Request completed",
      message:
        "Your recent maintenance request has been marked as completed. Please rate our service.",
      time: "3 days ago",
      unread: false,
    },
  ];

  const selectedMessageData = messages.find((m) => m.id === selectedMessage);

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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </button>
          <button
            onClick={() => router.push("/student/messages")}
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
          <h1 className="text-white font-medium text-base">Messages</h1>
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

        {/* Messages Content */}
        <div className="flex-1 overflow-hidden">
          {selectedMessage ? (
            /* Message Detail View */
            <div className="h-full flex flex-col">
              <div className="border-b border-gray-200 px-4 py-3">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="mb-2 text-blue-600 text-sm flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to messages
                </button>
                <h2 className="font-semibold text-gray-900 text-sm">
                  {selectedMessageData?.subject}
                </h2>
                <p className="text-xs text-gray-600">
                  From: {selectedMessageData?.sender}
                </p>
                <p className="text-xs text-gray-500">
                  {selectedMessageData?.time}
                </p>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <p className="text-gray-700 text-sm">
                  {selectedMessageData?.message}
                </p>
              </div>
            </div>
          ) : (
            /* Messages List View */
            <div className="h-full overflow-y-auto">
              {messages.length === 0 ? (
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <p className="text-sm text-gray-500">No messages</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {messages.map((message) => (
                    <button
                      key={message.id}
                      onClick={() => setSelectedMessage(message.id)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <h3 className="font-medium text-gray-900 text-sm">
                              {message.sender}
                            </h3>
                            {message.unread && (
                              <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-900 font-medium truncate">
                            {message.subject}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {message.message}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{message.time}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
