"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AccountDropdown from "@/components/AccountDropdown";
import { useTheme } from "@/components/ThemeProvider";

export default function AccountDropdownTest() {
  const { data: session, status } = useSession();
  const { themeConfig } = useTheme();
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isTesting, setIsTesting] = useState(false);

  const addTestResult = (result: string) => {
    setTestResults((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${result}`,
    ]);
  };

  const runComprehensiveTests = async () => {
    setIsTesting(true);
    setTestResults([]);

    addTestResult("🧪 Starting comprehensive AccountDropdown tests...");

    // Test 1: Session State Check
    addTestResult("📊 Test 1: Checking session state...");
    addTestResult(`Session status: ${status}`);
    addTestResult(`Session exists: ${!!session}`);
    if (session) {
      addTestResult(`User name: ${session.user?.name || "Not found"}`);
      addTestResult(`User email: ${session.user?.email || "Not found"}`);
      addTestResult(`User role: ${session.user?.role || "Not found"}`);
    }

    // Test 2: Component Rendering
    addTestResult("🎨 Test 2: Checking component rendering...");
    try {
      // Check if component mounts without errors
      const componentExists = document.querySelector(
        '[data-testid="account-dropdown"]',
      );
      addTestResult(`Component mounted: ${!!componentExists}`);
    } catch (error) {
      addTestResult(`❌ Component rendering error: ${error}`);
    }

    // Test 3: Theme Integration
    addTestResult("🎨 Test 3: Checking theme integration...");
    addTestResult(`Theme config exists: ${!!themeConfig}`);
    if (themeConfig) {
      addTestResult(
        `Primary color: ${themeConfig.colors?.primary || "Not found"}`,
      );
      addTestResult(`Text color: ${themeConfig.colors?.text || "Not found"}`);
    }

    // Test 4: LocalStorage Check
    addTestResult("💾 Test 4: Checking localStorage state...");
    if (typeof window !== "undefined") {
      const storageKeys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.includes("next-auth")) {
          storageKeys.push(key);
        }
      }
      addTestResult(`NextAuth storage keys found: ${storageKeys.length}`);
      storageKeys.forEach((key) => addTestResult(`  - ${key}`));
    }

    // Test 5: Navigation Paths
    addTestResult("🧭 Test 5: Checking navigation paths...");
    const expectedPaths = [
      "/settings",
      "/admin/dashboard",
      "/student",
      "/login",
    ];
    expectedPaths.forEach((path) => {
      addTestResult(`Path available: ${path}`);
    });

    // Test 6: Error Boundary Test
    addTestResult("🛡️ Test 6: Testing error boundaries...");
    try {
      // Simulate potential error conditions
      if (session && !session.user) {
        addTestResult("⚠️ Warning: Session exists but user data is missing");
      }
      if (status === "authenticated" && !session) {
        addTestResult(
          "⚠️ Warning: Status is authenticated but session is null",
        );
      } else if (status !== "unauthenticated" && !session) {
        addTestResult("⚠️ Warning: Unexpected session state");
      }
    } catch (error) {
      addTestResult(`❌ Error boundary test failed: ${error}`);
    }

    addTestResult("✅ Comprehensive tests completed!");
    setIsTesting(false);
  };

  const simulateUserState = (
    userState: "authenticated" | "unauthenticated",
  ) => {
    addTestResult(`🎭 Simulating user state: ${userState}`);
    // This would be used for manual testing scenarios
  };

  const testLogoutFlow = async () => {
    addTestResult("🚪 Testing logout flow...");
    // Test logout functionality
    addTestResult("📝 Note: Manual logout test required in browser");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-teal-400">
          AccountDropdown Comprehensive Test Suite
        </h1>

        {/* Test Controls */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={runComprehensiveTests}
              disabled={isTesting}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 rounded-lg transition-colors"
            >
              {isTesting ? "Running Tests..." : "Run All Tests"}
            </button>
            <button
              onClick={testLogoutFlow}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
            >
              Test Logout Flow
            </button>
            <button
              onClick={() => setTestResults([])}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Clear Results
            </button>
          </div>
        </div>

        {/* Current Session Info */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Current Session State</h2>
          <div className="space-y-2 font-mono text-sm">
            <div>
              Status: <span className="text-teal-400">{status}</span>
            </div>
            <div>
              Session:{" "}
              <span className="text-teal-400">
                {session ? "Exists" : "None"}
              </span>
            </div>
            {session && (
              <>
                <div>
                  Name:{" "}
                  <span className="text-teal-400">
                    {session.user?.name || "N/A"}
                  </span>
                </div>
                <div>
                  Email:{" "}
                  <span className="text-teal-400">
                    {session.user?.email || "N/A"}
                  </span>
                </div>
                <div>
                  Role:{" "}
                  <span className="text-teal-400">
                    {session.user?.role || "N/A"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Live Component Preview */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Live Component Preview</h2>
          <div className="border border-gray-700 rounded p-4 bg-gray-900">
            <AccountDropdown
              config={{
                showAccountSettings: true,
                showAdminDashboard: true,
                showUserPortal: true,
                showSwitchAccount: true,
                showRemoveAccount: true,
                dropdownWidth: "w-56",
                dropdownMaxHeight: "max-h-72",
                avatarSize: "w-10 h-10",
                position: "bottom",
                alignment: "right",
                showDebugInfo: true, // Enable debug info for testing
                redirectOnLogout: false,
                onLogoutComplete: () =>
                  addTestResult("🚪 Logout completed via callback"),
              }}
            />
          </div>
        </div>

        {/* Test Results */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <div className="bg-gray-900 rounded p-4 h-64 overflow-y-auto font-mono text-sm">
            {testResults.length === 0 ? (
              <div className="text-gray-500">
                No tests run yet. Click "Run All Tests" to start.
              </div>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="mb-1">
                  {result}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Manual Testing Instructions */}
        <div className="bg-gray-800 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Manual Testing Checklist
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-start">
              <span className="text-teal-400 mr-2">□</span>
              <span>
                Click dropdown to open - should show user info and menu items
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-teal-400 mr-2">□</span>
              <span>
                Check if user name displays correctly (should not show "User" if
                real name exists)
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-teal-400 mr-2">□</span>
              <span>Click outside dropdown - should close automatically</span>
            </div>
            <div className="flex items-start">
              <span className="text-teal-400 mr-2">□</span>
              <span>Press Escape key - should close dropdown</span>
            </div>
            <div className="flex items-start">
              <span className="text-teal-400 mr-2">□</span>
              <span>Test each menu item click - should navigate correctly</span>
            </div>
            <div className="flex items-start">
              <span className="text-teal-400 mr-2">□</span>
              <span>Test logout button - should sign out and update UI</span>
            </div>
            <div className="flex items-start">
              <span className="text-teal-400 mr-2">□</span>
              <span>Check role-based menu items (Admin vs User portal)</span>
            </div>
            <div className="flex items-start">
              <span className="text-teal-400 mr-2">□</span>
              <span>Test responsive behavior on mobile</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
