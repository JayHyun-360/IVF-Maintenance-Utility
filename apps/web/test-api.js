// Test API endpoints directly
const testAPI = async () => {
  console.log("Testing API endpoints...");

  try {
    // Test stats endpoint
    const statsResponse = await fetch("http://localhost:3000/api/admin/stats");
    console.log("Stats response status:", statsResponse.status);
    if (statsResponse.ok) {
      const stats = await statsResponse.json();
      console.log("Stats data:", stats);
    } else {
      const errorText = await statsResponse.text();
      console.log("Stats error:", errorText);
    }
  } catch (error) {
    console.error("Stats API error:", error);
  }

  try {
    // Test requests endpoint
    const requestsResponse = await fetch(
      "http://localhost:3000/api/admin/requests",
    );
    console.log("Requests response status:", requestsResponse.status);
    if (requestsResponse.ok) {
      const requests = await requestsResponse.json();
      console.log("Requests data length:", requests.length);
      console.log("First request:", requests[0]);
    } else {
      const errorText = await requestsResponse.text();
      console.log("Requests error:", errorText);
    }
  } catch (error) {
    console.error("Requests API error:", error);
  }

  try {
    // Test notifications endpoint
    const notifResponse = await fetch(
      "http://localhost:3000/api/notifications",
    );
    console.log("Notifications response status:", notifResponse.status);
    if (notifResponse.ok) {
      const notifs = await notifResponse.json();
      console.log(
        "Notifications data length:",
        notifs.notifications?.length || 0,
      );
    } else {
      const errorText = await notifResponse.text();
      console.log("Notifications error:", errorText);
    }
  } catch (error) {
    console.error("Notifications API error:", error);
  }
};

testAPI();
