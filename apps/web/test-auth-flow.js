require('dotenv').config({ path: '.env.local' });

// Test complete authentication flow
const testAuthFlow = async () => {
  console.log("=== Testing Authentication Flow ===");
  
  try {
    // 1. Test login endpoint
    const loginResponse = await fetch("http://localhost:3000/api/auth/callback/credentials", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        email: "admin@test.com",
        password: "admin123",
        redirect: "false",
        json: "true"
      }),
      redirect: "manual"
    });
    
    console.log("Login response status:", loginResponse.status);
    
    if (loginResponse.status === 302 || loginResponse.status === 200) {
      // Get session cookies
      const setCookieHeader = loginResponse.headers.get('set-cookie');
      console.log("Set-Cookie header:", setCookieHeader);
      
      if (setCookieHeader) {
        // Extract session token
        const cookies = setCookieHeader.split(',').map(cookie => cookie.split(';')[0].trim());
        const sessionCookie = cookies.find(cookie => cookie.startsWith('next-auth.session-token='));
        
        if (sessionCookie) {
          console.log("Session cookie found:", sessionCookie.substring(0, 50) + "...");
          
          // 2. Test API with session
          const statsResponse = await fetch("http://localhost:3000/api/admin/stats", {
            headers: {
              "Cookie": sessionCookie
            }
          });
          
          console.log("Stats API with session status:", statsResponse.status);
          
          if (statsResponse.ok) {
            const stats = await statsResponse.json();
            console.log("✅ Stats data received:", stats.length, "items");
            
            const requestsResponse = await fetch("http://localhost:3000/api/admin/requests", {
              headers: {
                "Cookie": sessionCookie
              }
            });
            
            if (requestsResponse.ok) {
              const requests = await requestsResponse.json();
              console.log("✅ Requests data received:", requests.length, "requests");
              console.log("✅ First request:", requests[0]?.title);
            } else {
              console.log("❌ Requests API failed:", requestsResponse.status);
            }
          } else {
            console.log("❌ Stats API failed:", statsResponse.status);
          }
        } else {
          console.log("❌ No session cookie found");
        }
      }
    } else {
      console.log("❌ Login failed:", loginResponse.status);
      const errorText = await loginResponse.text();
      console.log("Login error:", errorText);
    }
    
  } catch (error) {
    console.error("❌ Auth flow error:", error);
  }
};

testAuthFlow();
