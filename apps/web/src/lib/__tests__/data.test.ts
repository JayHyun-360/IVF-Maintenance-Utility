import {
  getMaintenanceRequests,
  getMaintenanceStats,
  getRecentRequests,
} from "../data";

describe("Data Utilities", () => {
  describe("getMaintenanceRequests", () => {
    it("should return an array of maintenance requests", () => {
      const requests = getMaintenanceRequests();
      expect(Array.isArray(requests)).toBe(true);
    });

    it("should return requests with required properties", () => {
      const requests = getMaintenanceRequests();
      if (requests.length > 0) {
        const request = requests[0];
        expect(request).toHaveProperty("id");
        expect(request).toHaveProperty("title");
        expect(request).toHaveProperty("description");
        expect(request).toHaveProperty("category");
        expect(request).toHaveProperty("status");
        expect(request).toHaveProperty("priority");
      }
    });
  });

  describe("getMaintenanceStats", () => {
    it("should return stats with required properties", () => {
      const stats = getMaintenanceStats();
      expect(stats).toHaveProperty("totalRequests");
      expect(stats).toHaveProperty("pendingRequests");
      expect(stats).toHaveProperty("inProgressRequests");
      expect(stats).toHaveProperty("completedRequests");
      expect(typeof stats.totalRequests).toBe("number");
    });
  });

  describe("getRecentRequests", () => {
    it("should return limited number of requests", () => {
      const recent = getRecentRequests(5);
      expect(Array.isArray(recent)).toBe(true);
      expect(recent.length).toBeLessThanOrEqual(5);
    });
  });
});
