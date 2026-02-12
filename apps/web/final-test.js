require('dotenv').config({ path: '.env.local' });

// Complete browser simulation test
const testCompleteFlow = async () => {
  console.log("=== Complete Browser Flow Test ===");
  
  try {
    // Step 1: Get CSRF token (simulating browser)
    const csrfResponse = await fetch("http://localhost:3000/api/auth/csrf");
    const csrfData = await csrfResponse.json();
    console.log("CSRF token obtained:", csrfData.csrfToken ? "✅" : "❌");
    
    // Step 2: Login with CSRF token
    const loginForm = new FormData();
    loginForm.append('email', 'admin@test.com');
    loginForm.append('password', 'admin123');
    loginForm.append('csrfToken', csrfData.csrfToken);
    loginForm.append('redirect', 'false');
    loginForm.append('json', 'true');
    
    const loginResponse = await fetch("http://localhost:3000/api/auth/callback/credentials", {
      method: 'POST',
      body: loginForm,
      redirect: 'manual'
    });
    
    console.log("Login response:", loginResponse.status, loginResponse.statusText);
    
    // Step 3: Extract cookies and test session
    const cookies = loginResponse.headers.get('set-cookie') || '';
    const sessionCookie = cookies.split(',').find(c => c.trim().startsWith('next-auth.session-token='));
    
    if (sessionCookie) {
      console.log("✅ Session cookie established");
      
      // Step 4: Test authenticated API calls
      const headers = { 'Cookie': sessionCookie.trim() };
      
      const statsResponse = await fetch("http://localhost:3000/api/admin/stats", { headers });
      console.log("Stats API:", statsResponse.ok ? "✅" : "❌", statsResponse.status);
      
      if (statsResponse.ok) {
        const stats = await statsResponse.json();
        console.log("Stats data:", stats.length, "items");
      }
      
      const requestsResponse = await fetch("http://localhost:3000/api/admin/requests", { headers });
      console.log("Requests API:", requestsResponse.ok ? "✅" : "❌", requestsResponse.status);
      
      if (requestsResponse.ok) {
        const requests = await requestsResponse.json();
        console.log("✅ REQUESTS DISPLAY TEST PASSED!");
        console.log(`Found ${requests.length} maintenance requests`);
        if (requests.length > 0) {
          console.log("First request:", requests[0].title);
          console.log("Status:", requests[0].status);
        }
      }
      
      const notifResponse = await fetch("http://localhost:3000/api/notifications", { headers });
      console.log("Notifications API:", notifResponse.ok ? "✅" : "❌", notifResponse.status);
      
      if (notifResponse.ok) {
        const notifs = await notifResponse.json();
        console.log("✅ NOTIFICATIONS DISPLAY TEST PASSED!");
        console.log(`Found ${notifs.notifications?.length || 0} notifications`);
      }
      
    } else {
      console.log("❌ No session cookie established");
    }
    
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
};

testCompleteFlow();
