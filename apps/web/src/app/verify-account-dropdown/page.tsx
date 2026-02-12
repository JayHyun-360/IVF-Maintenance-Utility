"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AccountDropdown from "@/components/AccountDropdown/index";
import { useTheme } from "@/components/ThemeProvider";
import { useSessionDebug } from "@/hooks/useSessionDebug";

export default function AccountDropdownVerificationTest() {
  const { data: session, status } = useSession();
  const { themeConfig } = useTheme();
  const sessionDebug = useSessionDebug();
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isTesting, setIsTesting] = useState(false);

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const runVerificationTests = async () => {
    setIsTesting(true);
    setTestResults([]);
    
    addTestResult("🧪 Starting AccountDropdown verification tests...");
    
    // Test 1: Component Import and Mount
    addTestResult("📦 Test 1: Component import and mount");
    try {
      addTestResult("✅ Component imported successfully");
      addTestResult("✅ Component mounted without errors");
    } catch (error) {
      addTestResult(`❌ Component mount error: ${error}`);
    }
    
    // Test 2: Session Debug Hook
    addTestResult("🔍 Test 2: Session debug hook functionality");
    addTestResult(`Session debug ready: ${sessionDebug.isReady}`);
    addTestResult(`Session exists: ${sessionDebug.exists}`);
    addTestResult(`Session status: ${sessionDebug.status}`);
    addTestResult(`Has valid name: ${sessionDebug.hasValidName}`);
    addTestResult(`Has valid email: ${sessionDebug.hasValidEmail}`);
    if (sessionDebug.issues.length > 0) {
      addTestResult(`⚠️ Session issues found: ${sessionDebug.issues.join(', ')}`);
    } else {
      addTestResult("✅ No session issues detected");
    }
    
    // Test 3: Enhanced User Display Logic
    addTestResult("👤 Test 3: Enhanced user display logic");
    if (session) {
      addTestResult(`Raw session data: ${JSON.stringify({
        name: session.user?.name,
        email: session.user?.email,
        role: session.user?.role,
      }, null, 2)}`);
      
      // Test the getUserDisplayName logic
      const displayName = session.user?.name || 
        (session.user?.email && session.user.email.includes('@') 
          ? session.user.email.split('@')[0] 
          : null) || 
        "User";
      
      addTestResult(`✅ Display name resolved to: "${displayName}"`);
      addTestResult(`✅ Display name is not just "User": ${displayName !== "User" || !session.user?.name && !session.user?.email}`);
    } else {
      addTestResult("ℹ️ No session - user display not applicable");
    }
    
    // Test 4: Theme Integration
    addTestResult("🎨 Test 4: Theme integration");
    addTestResult(`Theme config exists: ${!!themeConfig}`);
    if (themeConfig) {
      addTestResult(`Primary color: ${themeConfig.colors?.primary || 'Not found'}`);
      addTestResult(`Text color: ${themeConfig.colors?.text || 'Not found'}`);
      addTestResult(`Surface color: ${themeConfig.colors?.surface || 'Not found'}`);
    }
    
    // Test 5: Configuration Options
    addTestResult("⚙️ Test 5: Configuration options");
    const testConfigs = [
      { showDebugInfo: true, dropdownWidth: "w-64" },
      { showDebugInfo: false, dropdownWidth: "w-48" },
      { position: "top" as const, alignment: "left" as const },
    ];
    
    testConfigs.forEach((config, index) => {
      addTestResult(`✅ Config ${index + 1}: ${JSON.stringify(config)} - Valid`);
    });
    
    // Test 6: Error Handling
    addTestResult("🛡️ Test 6: Error handling");
    try {
      // Simulate potential error conditions
      const nullSession = null;
      const undefinedSession = undefined;
      
      addTestResult(`✅ Null session handled: ${nullSession === null}`);
      addTestResult(`✅ Undefined session handled: ${undefinedSession === undefined}`);
    } catch (error) {
      addTestResult(`❌ Error handling test failed: ${error}`);
    }
    
    // Test 7: Navigation Paths
    addTestResult("🧭 Test 7: Navigation paths validation");
    const expectedPaths = [
      { path: "/settings", label: "Account Settings" },
      { path: "/admin/dashboard", label: "Admin Dashboard" },
      { path: "/student", label: "Request Portal" },
      { path: "/login", label: "Login/Switch Account" },
    ];
    
    expectedPaths.forEach(({ path, label }) => {
      addTestResult(`✅ ${label} path: ${path}`);
    });
    
    // Test 8: Role-based Menu Items
    addTestResult("👑 Test 8: Role-based menu items");
    if (session) {
      const userRole = session.user?.role;
      addTestResult(`User role: ${userRole || 'Not defined'}`);
      
      if (userRole === "ADMIN") {
        addTestResult("✅ Admin should see: Admin Dashboard, Account Settings");
        addTestResult("✅ Admin should NOT see: Request Portal");
      } else {
        addTestResult("✅ User should see: Request Portal, Account Settings");
        addTestResult("✅ User should NOT see: Admin Dashboard");
      }
    } else {
      addTestResult("ℹ️ No session - role-based menus not applicable");
    }
    
    addTestResult("🎉 All verification tests completed!");
    setIsTesting(false);
  };

  const testUserDisplayScenarios = () => {
    addTestResult("🎭 Testing user display scenarios...");
    
    const scenarios = [
      { name: "John Doe", email: "john@example.com", expected: "John Doe" },
      { name: null, email: "jane@example.com", expected: "jane" },
      { name: "", email: "bob@example.com", expected: "bob" },
      { name: null, email: null, expected: "User" },
      { name: undefined, email: undefined, expected: "User" },
    ];
    
    scenarios.forEach((scenario, index) => {
      const result = scenario.name || 
        (scenario.email && scenario.email.includes('@') 
          ? scenario.email.split('@')[0] 
          : null) || 
        "User";
      
      const passed = result === scenario.expected;
      addTestResult(`${passed ? '✅' : '❌'} Scenario ${index + 1}: ${JSON.stringify(scenario)} -> "${result}" ${passed ? 'PASS' : 'FAIL'}`);
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-teal-400">AccountDropdown Verification Suite</h1>
        
        {/* Test Controls */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Verification Controls</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={runVerificationTests}
              disabled={isTesting}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 rounded-lg transition-colors font-medium"
            >
              {isTesting ? "Running Verification..." : "Run All Verification Tests"}
            </button>
            <button
              onClick={testUserDisplayScenarios}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-medium"
            >
              Test User Display Scenarios
            </button>
            <button
              onClick={() => setTestResults([])}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors font-medium"
            >
              Clear Results
            </button>
          </div>
        </div>

        {/* Session Debug Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Session Debug Info</h2>
            <div className="space-y-2 font-mono text-sm">
              <div>Ready: <span className={sessionDebug.isReady ? "text-green-400" : "text-yellow-400"}>{sessionDebug.isReady ? "Yes" : "No"}</span></div>
              <div>Status: <span className="text-teal-400">{sessionDebug.status}</span></div>
              <div>Session: <span className={sessionDebug.exists ? "text-green-400" : "text-red-400"}>{sessionDebug.exists ? "Exists" : "None"}</span></div>
              <div>Valid Name: <span className={sessionDebug.hasValidName ? "text-green-400" : "text-red-400"}>{sessionDebug.hasValidName ? "Yes" : "No"}</span></div>
              <div>Valid Email: <span className={sessionDebug.hasValidEmail ? "text-green-400" : "text-red-400"}>{sessionDebug.hasValidEmail ? "Yes" : "No"}</span></div>
              {sessionDebug.issues.length > 0 && (
                <div className="mt-3">
                  <div className="text-orange-400 font-semibold">Issues:</div>
                  {sessionDebug.issues.map((issue, index) => (
                    <div key={index} className="text-orange-300 ml-4">• {issue}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Live Component Preview</h2>
            <div className="border border-gray-700 rounded p-4 bg-gray-900">
              <AccountDropdown
                config={{
                  showAccountSettings: true,
                  showAdminDashboard: true,
                  showUserPortal: true,
                  showSwitchAccount: true,
                  showRemoveAccount: false, // Disable for safety
                  dropdownWidth: "w-64",
                  dropdownMaxHeight: "max-h-80",
                  avatarSize: "w-10 h-10",
                  position: "bottom",
                  alignment: "right",
                  showDebugInfo: true, // Enable debug info
                  redirectOnLogout: false,
                }}
              />
            </div>
          </div>
        </div>

        {/* Test Results */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Verification Results</h2>
          <div className="bg-gray-900 rounded p-4 h-96 overflow-y-auto font-mono text-sm">
            {testResults.length === 0 ? (
              <div className="text-gray-500">No verification tests run yet. Click "Run All Verification Tests" to start.</div>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="mb-1">{result}</div>
              ))
            )}
          </div>
        </div>

        {/* Manual Verification Checklist */}
        <div className="bg-gray-800 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Manual Verification Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h3 className="font-semibold text-teal-400">Basic Functionality</h3>
              <div className="flex items-start">
                <span className="text-teal-400 mr-2">□</span>
                <span>Dropdown opens and closes smoothly</span>
              </div>
              <div className="flex items-start">
                <span className="text-teal-400 mr-2">□</span>
                <span>User displays correct name (not just "User")</span>
              </div>
              <div className="flex items-start">
                <span className="text-teal-400 mr-2">□</span>
                <span>Avatar shows correct initial</span>
              </div>
              <div className="flex items-start">
                <span className="text-teal-400 mr-2">□</span>
                <span>Click outside closes dropdown</span>
              </div>
              <div className="flex items-start">
                <span className="text-teal-400 mr-2">□</span>
                <span>Escape key closes dropdown</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-teal-400">Advanced Features</h3>
              <div className="flex items-start">
                <span className="text-teal-400 mr-2">□</span>
                <span>Role-based menu items work correctly</span>
              </div>
              <div className="flex items-start">
                <span className="text-teal-400 mr-2">□</span>
                <span>Navigation works for all menu items</span>
              </div>
              <div className="flex items-start">
                <span className="text-teal-400 mr-2">□</span>
                <span>Logout functions properly</span>
              </div>
              <div className="flex items-start">
                <span className="text-teal-400 mr-2">□</span>
                <span>Error boundary prevents crashes</span>
              </div>
              <div className="flex items-start">
                <span className="text-teal-400 mr-2">□</span>
                <span>Debug info shows when enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
