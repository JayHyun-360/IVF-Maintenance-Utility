"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Reports from "../reports/page";
import UserManagement from "../users/page";
import Settings from "../settings/page";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      // Mock stats
      setStats({
        total: 24,
        pending: 8,
        inProgress: 6,
        completed: 10,
      });
    }
  }, [session]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const renderContent = () => {
    switch (activeNav) {
      case "reports":
        return <Reports />;
      case "users":
        return <UserManagement />;
      case "settings":
        return <Settings />;
      default:
        return (
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-[#1B4332]">Dashboard</h2>
                <p className="text-[#64748B] mt-2">
                  Welcome to the Integrated Visual Feedback & Maintenance
                  Utility
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332]"
                  />
                  <svg
                    className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="col-span-1 lg:col-span-2 bg-white rounded-xl border-2 border-[#1B4332]/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#1B4332]">
                    Overview
                  </h3>
                  <span className="text-sm text-[#64748B]">Last 30 days</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#1B4332]">
                      {stats.total}
                    </div>
                    <div className="text-sm text-[#64748B]">Total Requests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#F59E0B]">
                      {stats.pending}
                    </div>
                    <div className="text-sm text-[#64748B]">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#1B4332]">
                      {stats.completed}
                    </div>
                    <div className="text-sm text-[#64748B]">Completed</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border-2 border-[#1B4332]/20 p-6">
                <h3 className="text-lg font-semibold text-[#1B4332] mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-[#1B4332] text-white rounded-lg hover:bg-[#2d5a47]">
                    New Request
                  </button>
                  <button className="w-full px-4 py-2 border border-[#1B4332] text-[#1B4332] rounded-lg hover:bg-[#1B4332] hover:text-white">
                    View All
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border-2 border-[#1B4332]/20 p-6">
                <h3 className="text-lg font-semibold text-[#1B4332] mb-4">
                  Categories
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-semibold text-[#1B4332]">
                      5
                    </div>
                    <div className="text-xs text-[#64748B]">Plumbing</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-semibold text-[#1B4332]">
                      8
                    </div>
                    <div className="text-xs text-[#64748B]">Electrical</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-semibold text-[#1B4332]">
                      3
                    </div>
                    <div className="text-xs text-[#64748B]">Carpentry</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-semibold text-[#1B4332]">
                      8
                    </div>
                    <div className="text-xs text-[#64748B]">Others</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Fixed Forest Green Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#1B4332] z-10">
        <div className="flex flex-col h-full">
          {/* Logo/Title Area */}
          <div className="p-6 border-b border-[#2d5a47]">
            <h1 className="text-xl font-semibold text-white">IVF Utility</h1>
            <p className="text-sm text-[#a8c5b8] mt-1">Maintenance Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              <button
                onClick={() => setActiveNav("dashboard")}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center space-x-3 ${
                  activeNav === "dashboard"
                    ? "bg-[#2d5a47] text-white"
                    : "text-[#a8c5b8] hover:bg-[#2d5a47] hover:text-white"
                }`}
              >
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Overview</span>
              </button>
              <button
                onClick={() => setActiveNav("reports")}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center space-x-3 ${
                  activeNav === "reports"
                    ? "bg-[#2d5a47] text-white"
                    : "text-[#a8c5b8] hover:bg-[#2d5a47] hover:text-white"
                }`}
              >
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span>Reports</span>
              </button>
              <button
                onClick={() => setActiveNav("users")}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center space-x-3 ${
                  activeNav === "users"
                    ? "bg-[#2d5a47] text-white"
                    : "text-[#a8c5b8] hover:bg-[#2d5a47] hover:text-white"
                }`}
              >
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span>User Management</span>
              </button>
              <button
                onClick={() => setActiveNav("settings")}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center space-x-3 ${
                  activeNav === "settings"
                    ? "bg-[#2d5a47] text-white"
                    : "text-[#a8c5b8] hover:bg-[#2d5a47] hover:text-white"
                }`}
              >
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
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Settings</span>
              </button>
            </div>
          </nav>

          {/* User Area */}
          <div className="p-4 border-t border-[#2d5a47]">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center">
                <span className="text-white font-semibold">A</span>
              </div>
              <div>
                <p className="text-white font-medium">Admin User</p>
                <p className="text-[#a8c5b8] text-sm">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area with Bento Grid */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#1B4332]">Dashboard</h2>
              <p className="text-[#64748B] mt-2">
                Welcome to the Integrated Visual Feedback & Maintenance Utility
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
                />
                <svg
                  className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">A</span>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg z-20">
                    <div className="p-3 border-b border-gray-200">
                      <p className="font-medium text-gray-900">Admin User</p>
                      <p className="text-sm text-gray-500">Administrator</p>
                    </div>
                    <div className="py-2">
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        Profile Settings
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        Account Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Large Card - Stats Overview */}
            <div className="col-span-1 lg:col-span-2 bg-white rounded-xl border-2 border-[#1B4332]/20 bg-gradient-to-br from-white to-[#1B4332]/5 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#1B4332]">
                  Overview
                </h3>
                <span className="text-sm text-[#64748B]">Last 30 days</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#1B4332]">
                    {stats.total}
                  </div>
                  <div className="text-sm text-[#64748B]">Total Requests</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#F59E0B]">
                    {stats.pending}
                  </div>
                  <div className="text-sm text-[#64748B]">Pending</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#1B4332]">
                    {stats.completed}
                  </div>
                  <div className="text-sm text-[#64748B]">Completed</div>
                </div>
              </div>
            </div>

            {/* Medium Card - Quick Actions */}
            <div className="bg-white rounded-xl border-2 border-[#1B4332]/20 bg-gradient-to-br from-white to-[#1B4332]/5 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-[#1B4332] mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-[#1B4332] text-white rounded-lg hover:bg-[#2d5a47] transition-colors">
                  New Request
                </button>
                <button className="w-full px-4 py-2 border border-[#1B4332] text-[#1B4332] rounded-lg hover:bg-[#1B4332] hover:text-white transition-colors">
                  View All
                </button>
              </div>
            </div>

            {/* Medium Card - Recent Activity */}
            <div className="bg-white rounded-xl border-2 border-[#1B4332]/20 bg-gradient-to-br from-white to-[#1B4332]/5 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-[#1B4332] mb-4">
                Recent Activity
              </h3>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-green-600"
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
                </div>
                <p className="text-[#64748B] text-center mb-4">
                  No maintenance requests yet
                </p>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  Create First Report
                </button>
              </div>
            </div>

            {/* Medium Card - Categories */}
            <div className="bg-white rounded-xl border-2 border-[#1B4332]/20 bg-gradient-to-br from-white to-[#1B4332]/5 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-[#1B4332] mb-4">
                Categories
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-[#1B4332]">0</div>
                  <div className="text-xs text-[#64748B]">Plumbing</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-[#1B4332]">0</div>
                  <div className="text-xs text-[#64748B]">Electrical</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-[#1B4332]">0</div>
                  <div className="text-xs text-[#64748B]">Carpentry</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-[#1B4332]">0</div>
                  <div className="text-xs text-[#64748B]">Others</div>
                </div>
              </div>
            </div>

            {/* Large Card - Status Chart */}
            <div className="col-span-1 lg:col-span-3 bg-white rounded-xl border-2 border-[#1B4332]/20 bg-gradient-to-br from-white to-[#1B4332]/5 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-[#1B4332] mb-4">
                Request Status
              </h3>
              <div className="flex flex-col items-center justify-center h-48">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
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
                </div>
                <p className="text-[#64748B] text-center mb-4">
                  No maintenance requests to display
                </p>
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  Create First Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
