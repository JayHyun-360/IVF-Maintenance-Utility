require('dotenv').config({ path: '.env.local' });

// Test session endpoint
const testSession = async () => {
  console.log("=== Testing Session Endpoint ===");
  
  try {
    const sessionResponse = await fetch("http://localhost:3000/api/auth/session");
    console.log("Session response status:", sessionResponse.status);
    
    if (sessionResponse.ok) {
      const session = await sessionResponse.json();
      console.log("Session data:", session);
      
      if (session && session.user && session.user.role === "ADMIN") {
        console.log("✅ Admin session found - dashboard should work!");
      } else {
        console.log("❌ No admin session found");
      }
    } else {
      console.log("❌ Session endpoint failed");
    }
  } catch (error) {
    console.error("Session test error:", error);
  }
};

testSession();
