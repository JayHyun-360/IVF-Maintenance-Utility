"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MobileProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("info");

  // Mock user data - in real app, this would come from auth/session
  const user = {
    name: "John Student",
    email: "student@ivf.edu",
    studentId: "ST2024001",
    dorm: "Dorm 2, Room 301",
    phone: "+1234567890",
    emergencyContact: "Jane Parent - +0987654321",
  };

  const stats = {
    totalRequests: 12,
    pendingRequests: 2,
    completedRequests: 10,
    avgResponseTime: "2.5 hours",
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
          <h1 className="text-white font-medium text-base">Profile</h1>
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
            onClick={() => setActiveTab("info")}
            className={`flex-1 py-2 text-xs font-medium ${
              activeTab === "info"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Info
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`flex-1 py-2 text-xs font-medium ${
              activeTab === "stats"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Stats
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex-1 py-2 text-xs font-medium ${
              activeTab === "settings"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Settings
          </button>
        </div>

        {/* Profile Content - Scrollable Only This Section */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {activeTab === "info" && (
            <div className="space-y-4">
              {/* Profile Header - Compact */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-600"
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
                <h2 className="text-lg font-semibold text-gray-900">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              {/* Personal Information - Compact */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 text-sm">
                  Personal Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Student ID</span>
                    <span className="text-gray-900 text-sm">
                      {user.studentId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Room</span>
                    <span className="text-gray-900 text-sm">{user.dorm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Phone</span>
                    <span className="text-gray-900 text-sm">{user.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Emergency</span>
                    <span className="text-gray-900 text-xs text-right">
                      {user.emergencyContact}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 text-sm">
                Your Statistics
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-blue-600">
                    {stats.totalRequests}
                  </div>
                  <div className="text-xs text-blue-600">Total</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-yellow-600">
                    {stats.pendingRequests}
                  </div>
                  <div className="text-xs text-yellow-600">Pending</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-green-600">
                    {stats.completedRequests}
                  </div>
                  <div className="text-xs text-green-600">Completed</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-purple-600">
                    {stats.avgResponseTime}
                  </div>
                  <div className="text-xs text-purple-600">Avg Response</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 text-sm">Settings</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 text-sm">Notifications</span>
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
                <button className="w-full text-left px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 text-sm">Privacy</span>
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
                <button className="w-full text-left px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 text-sm">
                      Change Password
                    </span>
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
                <button className="w-full text-left px-3 py-2 border border-red-200 rounded-lg hover:bg-red-50">
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 text-sm">Sign Out</span>
                    <svg
                      className="w-4 h-4 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
