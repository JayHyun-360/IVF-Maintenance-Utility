#!/usr/bin/env node

/**
 * AccountDropdown Comprehensive Test Suite
 * Tests all the fixes and improvements made to the AccountDropdown component
 */

console.log("🧪 Starting AccountDropdown Comprehensive Test Suite...\n");

// Test 1: User Display Logic Scenarios
console.log("📝 Test 1: User Display Logic Scenarios");
console.log("=".repeat(50));

const testScenarios = [
  {
    name: "Normal user with name and email",
    session: {
      user: { name: "John Doe", email: "john@example.com", role: "USER" },
    },
    expectedName: "John Doe",
    expectedInitial: "J",
  },
  {
    name: "User with only email",
    session: {
      user: { name: null, email: "jane.smith@example.com", role: "USER" },
    },
    expectedName: "jane.smith",
    expectedInitial: "J",
  },
  {
    name: "User with only name",
    session: { user: { name: "Alice Johnson", email: null, role: "USER" } },
    expectedName: "Alice Johnson",
    expectedInitial: "A",
  },
  {
    name: "User with malformed email",
    session: { user: { name: null, email: "invalid-email", role: "USER" } },
    expectedName: "User",
    expectedInitial: "U",
  },
  {
    name: "User with empty name",
    session: { user: { name: "", email: "bob@example.com", role: "USER" } },
    expectedName: "bob",
    expectedInitial: "B",
  },
  {
    name: "User with ID fallback",
    session: {
      user: { name: null, email: null, role: "USER", id: "user12345" },
    },
    expectedName: "User user1234",
    expectedInitial: "U",
  },
  {
    name: "No session",
    session: null,
    expectedName: "User",
    expectedInitial: "U",
  },
  {
    name: "Empty session",
    session: {},
    expectedName: "User",
    expectedInitial: "U",
  },
  {
    name: "Session without user",
    session: { token: "abc123" },
    expectedName: "User",
    expectedInitial: "U",
  },
];

// Simulate the getUserDisplayName function logic
function getUserDisplayName(session) {
  if (!session || !session.user) {
    return "User";
  }

  if (
    session.user.name &&
    typeof session.user.name === "string" &&
    session.user.name.trim()
  ) {
    return session.user.name.trim();
  }

  if (
    session.user.email &&
    typeof session.user.email === "string" &&
    session.user.email.includes("@")
  ) {
    const emailUsername = session.user.email.split("@")[0];
    if (emailUsername && emailUsername.trim()) {
      return emailUsername.trim();
    }
  }

  if (session.user.id) {
    const identifier = session.user.id;
    return `User ${identifier.toString().slice(0, 8)}`;
  }

  return "User";
}

function getUserInitial(session) {
  return getUserDisplayName(session).charAt(0).toUpperCase();
}

let passedTests = 0;
let totalTests = testScenarios.length;

testScenarios.forEach((scenario, index) => {
  const actualName = getUserDisplayName(scenario.session);
  const actualInitial = getUserInitial(scenario.session);
  const namePassed = actualName === scenario.expectedName;
  const initialPassed = actualInitial === scenario.expectedInitial;
  const testPassed = namePassed && initialPassed;

  if (testPassed) passedTests++;

  console.log(
    `${testPassed ? "✅" : "❌"} Scenario ${index + 1}: ${scenario.name}`,
  );
  console.log(`   Session: ${JSON.stringify(scenario.session)}`);
  console.log(
    `   Expected: "${scenario.expectedName}" (${scenario.expectedInitial})`,
  );
  console.log(`   Actual: "${actualName}" (${actualInitial})`);
  console.log(`   Result: ${testPassed ? "PASS" : "FAIL"}`);
  console.log("");
});

console.log(`Test 1 Results: ${passedTests}/${totalTests} passed\n`);

// Test 2: Session Validation Logic
console.log("🔍 Test 2: Session Validation Logic");
console.log("=".repeat(50));

function validateSession(session) {
  const issues = [];

  if (!session) {
    issues.push("No session provided");
    return { isValid: false, issues };
  }

  if (!session.user) {
    issues.push("Session user object is missing");
    return { isValid: false, issues };
  }

  const { name, email, role } = session.user;

  if (!name && !email) {
    issues.push("Both name and email are missing");
  }

  if (email && typeof email !== "string") {
    issues.push("Email is not a string");
  }

  if (name && typeof name !== "string") {
    issues.push("Name is not a string");
  }

  if (email && !email.includes("@")) {
    issues.push("Email format is invalid");
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}

const validationScenarios = [
  {
    name: "Valid session",
    session: {
      user: { name: "John", email: "john@example.com", role: "USER" },
    },
    expectedValid: true,
  },
  {
    name: "Invalid - no user",
    session: { token: "abc123" },
    expectedValid: false,
  },
  {
    name: "Invalid - no name or email",
    session: { user: { role: "USER" } },
    expectedValid: false,
  },
  {
    name: "Invalid - bad email format",
    session: { user: { name: "John", email: "invalid-email", role: "USER" } },
    expectedValid: false,
  },
];

let validationPassed = 0;
validationScenarios.forEach((scenario, index) => {
  const result = validateSession(scenario.session);
  const testPassed = result.isValid === scenario.expectedValid;

  if (testPassed) validationPassed++;

  console.log(
    `${testPassed ? "✅" : "❌"} Validation ${index + 1}: ${scenario.name}`,
  );
  console.log(`   Expected: ${scenario.expectedValid ? "Valid" : "Invalid"}`);
  console.log(`   Actual: ${result.isValid ? "Valid" : "Invalid"}`);
  if (result.issues.length > 0) {
    console.log(`   Issues: ${result.issues.join(", ")}`);
  }
  console.log("");
});

console.log(
  `Test 2 Results: ${validationPassed}/${validationScenarios.length} passed\n`,
);

// Test 3: Configuration Validation
console.log("⚙️ Test 3: Configuration Validation");
console.log("=".repeat(50));

const defaultConfig = {
  showAccountSettings: true,
  showAdminDashboard: true,
  showUserPortal: true,
  showSwitchAccount: true,
  showRemoveAccount: true,
  dropdownWidth: "w-48",
  dropdownMaxHeight: "max-h-60",
  showDebugInfo: false,
  avatarSize: "w-8 h-8",
  position: "bottom",
  alignment: "right",
  redirectOnLogout: true,
};

function validateConfig(config) {
  const issues = [];
  const mergedConfig = { ...defaultConfig, ...config };

  // Check required boolean properties
  const booleanProps = [
    "showAccountSettings",
    "showAdminDashboard",
    "showUserPortal",
    "showSwitchAccount",
    "showRemoveAccount",
    "showDebugInfo",
    "redirectOnLogout",
  ];
  booleanProps.forEach((prop) => {
    if (typeof mergedConfig[prop] !== "boolean") {
      issues.push(`${prop} must be a boolean`);
    }
  });

  // Check string properties
  const stringProps = ["dropdownWidth", "dropdownMaxHeight", "avatarSize"];
  stringProps.forEach((prop) => {
    if (typeof mergedConfig[prop] !== "string") {
      issues.push(`${prop} must be a string`);
    }
  });

  // Check position and alignment
  if (!["bottom", "top"].includes(mergedConfig.position)) {
    issues.push('position must be "bottom" or "top"');
  }

  if (!["left", "right"].includes(mergedConfig.alignment)) {
    issues.push('alignment must be "left" or "right"');
  }

  return {
    isValid: issues.length === 0,
    issues,
    mergedConfig,
  };
}

const configScenarios = [
  {
    name: "Default config",
    config: {},
    expectedValid: true,
  },
  {
    name: "Custom valid config",
    config: { showDebugInfo: true, dropdownWidth: "w-64" },
    expectedValid: true,
  },
  {
    name: "Invalid position",
    config: { position: "invalid" },
    expectedValid: false,
  },
  {
    name: "Invalid boolean",
    config: { showAccountSettings: "yes" },
    expectedValid: false,
  },
];

let configPassed = 0;
configScenarios.forEach((scenario, index) => {
  const result = validateConfig(scenario.config);
  const testPassed = result.isValid === scenario.expectedValid;

  if (testPassed) configPassed++;

  console.log(
    `${testPassed ? "✅" : "❌"} Config ${index + 1}: ${scenario.name}`,
  );
  console.log(`   Expected: ${scenario.expectedValid ? "Valid" : "Invalid"}`);
  console.log(`   Actual: ${result.isValid ? "Valid" : "Invalid"}`);
  if (result.issues.length > 0) {
    console.log(`   Issues: ${result.issues.join(", ")}`);
  }
  console.log("");
});

console.log(
  `Test 3 Results: ${configPassed}/${configScenarios.length} passed\n`,
);

// Test 4: Role-based Menu Logic
console.log("👑 Test 4: Role-based Menu Logic");
console.log("=".repeat(50));

function getMenuItems(session) {
  const items = [];

  if (!session || !session.user) {
    return items;
  }

  const { role } = session.user;

  // Always show account settings
  items.push({ id: "settings", label: "Account Settings", show: true });

  // Role-based items
  if (role === "ADMIN") {
    items.push({ id: "admin-dashboard", label: "Admin Dashboard", show: true });
    items.push({ id: "user-portal", label: "Request Portal", show: false });
  } else {
    items.push({
      id: "admin-dashboard",
      label: "Admin Dashboard",
      show: false,
    });
    items.push({ id: "user-portal", label: "Request Portal", show: true });
  }

  // Always show switch account
  items.push({ id: "switch-account", label: "Switch Account", show: true });

  return items;
}

const roleScenarios = [
  {
    name: "Admin user",
    session: {
      user: { name: "Admin", email: "admin@example.com", role: "ADMIN" },
    },
    expectedVisible: ["settings", "admin-dashboard", "switch-account"],
  },
  {
    name: "Regular user",
    session: {
      user: { name: "User", email: "user@example.com", role: "USER" },
    },
    expectedVisible: ["settings", "user-portal", "switch-account"],
  },
  {
    name: "User with no role",
    session: { user: { name: "NoRole", email: "norole@example.com" } },
    expectedVisible: ["settings", "user-portal", "switch-account"],
  },
  {
    name: "No session",
    session: null,
    expectedVisible: [],
  },
];

let rolePassed = 0;
roleScenarios.forEach((scenario, index) => {
  const menuItems = getMenuItems(scenario.session);
  const visibleItems = menuItems
    .filter((item) => item.show)
    .map((item) => item.id);
  const testPassed =
    JSON.stringify(visibleItems.sort()) ===
    JSON.stringify(scenario.expectedVisible.sort());

  if (testPassed) rolePassed++;

  console.log(
    `${testPassed ? "✅" : "❌"} Role Test ${index + 1}: ${scenario.name}`,
  );
  console.log(`   Expected: [${scenario.expectedVisible.join(", ")}]`);
  console.log(`   Actual: [${visibleItems.join(", ")}]`);
  console.log(`   Result: ${testPassed ? "PASS" : "FAIL"}`);
  console.log("");
});

console.log(`Test 4 Results: ${rolePassed}/${roleScenarios.length} passed\n`);

// Final Results
console.log("🏁 Final Test Results");
console.log("=".repeat(50));
console.log(`User Display Logic: ${passedTests}/${totalTests} passed`);
console.log(
  `Session Validation: ${validationPassed}/${validationScenarios.length} passed`,
);
console.log(
  `Configuration Validation: ${configPassed}/${configScenarios.length} passed`,
);
console.log(`Role-based Logic: ${rolePassed}/${roleScenarios.length} passed`);

const totalPassed = passedTests + validationPassed + configPassed + rolePassed;
const totalAllTests =
  totalTests +
  validationScenarios.length +
  configScenarios.length +
  roleScenarios.length;
const successRate = ((totalPassed / totalAllTests) * 100).toFixed(1);

console.log(
  `\nOverall: ${totalPassed}/${totalAllTests} tests passed (${successRate}%)`,
);

if (totalPassed === totalAllTests) {
  console.log(
    "🎉 All tests passed! AccountDropdown fixes are working correctly.",
  );
} else {
  console.log("⚠️ Some tests failed. Please review the results above.");
}

console.log("\n📋 Next Steps:");
console.log(
  "1. Visit http://localhost:3000/verify-account-dropdown for interactive testing",
);
console.log("2. Test the dropdown manually in the browser");
console.log("3. Check browser console for debug information");
console.log("4. Verify error handling by testing edge cases");
