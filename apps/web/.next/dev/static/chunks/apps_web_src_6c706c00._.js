(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/src/lib/data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Mock database for demonstration - in production this would come from your actual database
__turbopack_context__.s([
    "addMaintenanceRequest",
    ()=>addMaintenanceRequest,
    "deleteMaintenanceRequest",
    ()=>deleteMaintenanceRequest,
    "getMaintenanceRequests",
    ()=>getMaintenanceRequests,
    "getMaintenanceStats",
    ()=>getMaintenanceStats,
    "getRecentRequests",
    ()=>getRecentRequests,
    "getRequestsByCategory",
    ()=>getRequestsByCategory,
    "getRequestsByPriority",
    ()=>getRequestsByPriority,
    "updateRequestStatus",
    ()=>updateRequestStatus
]);
// Test examples for demonstration - in production this would come from your actual database
let maintenanceRequests = [
    // Completed requests (7 out of ~43 total)
    {
        id: "1",
        title: "Broken Light Fixture",
        description: "Main hallway light fixture is flickering and needs replacement.",
        category: "ELECTRICAL",
        priority: "HIGH",
        status: "COMPLETED",
        location: "Building B, Main Hallway",
        requestedBy: "Jane Staff",
        createdAt: new Date("2026-01-24T09:15:00Z"),
        updatedAt: new Date("2026-01-24T11:00:00Z"),
        images: [
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A"
        ]
    },
    {
        id: "2",
        title: "Leaky Faucet",
        description: "The faucet in the men's restroom is constantly dripping and needs to be repaired.",
        category: "PLUMBING",
        priority: "MEDIUM",
        status: "COMPLETED",
        location: "Building A, Room 201",
        requestedBy: "John User",
        createdAt: new Date("2026-01-24T10:30:00Z"),
        updatedAt: new Date("2026-01-24T14:20:00Z"),
        images: []
    },
    {
        id: "4",
        title: "Broken Window",
        description: "Window in the library is cracked and needs to be replaced for safety reasons.",
        category: "CARPENTRY",
        priority: "MEDIUM",
        status: "COMPLETED",
        location: "Building D, Library 2nd Floor",
        requestedBy: "Emily User",
        createdAt: new Date("2026-01-24T08:15:00Z"),
        updatedAt: new Date("2026-01-24T16:45:00Z"),
        images: [
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A"
        ]
    },
    {
        id: "5",
        title: "Electrical Outlet Not Working",
        description: "Several electrical outlets in the computer lab are not providing power.",
        category: "ELECTRICAL",
        priority: "MEDIUM",
        status: "COMPLETED",
        location: "Building E, Computer Lab 201",
        requestedBy: "David Staff",
        createdAt: new Date("2026-01-22T10:30:00Z"),
        updatedAt: new Date("2026-01-23T15:20:00Z"),
        images: []
    },
    {
        id: "6",
        title: "Water Leak in Ceiling",
        description: "There appears to be a water leak in the ceiling of the storage room.",
        category: "PLUMBING",
        priority: "HIGH",
        status: "COMPLETED",
        location: "Building F, Storage Room",
        requestedBy: "Michael Staff",
        createdAt: new Date("2026-01-24T07:45:00Z"),
        updatedAt: new Date("2026-01-24T13:15:00Z"),
        images: [
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A"
        ]
    },
    {
        id: "7",
        title: "Broken Chair",
        description: "One of the chairs in the cafeteria has a broken leg and needs repair.",
        category: "CARPENTRY",
        priority: "LOW",
        status: "COMPLETED",
        location: "Building G, Cafeteria",
        requestedBy: "Lisa User",
        createdAt: new Date("2026-01-24T06:30:00Z"),
        updatedAt: new Date("2026-01-24T12:00:00Z"),
        images: []
    },
    // In Progress requests (3 out of ~43 total)
    {
        id: "8",
        title: "Parking Lot Lighting Repair",
        description: "Several lights in the main parking lot are not working, creating safety concerns.",
        category: "ELECTRICAL",
        priority: "MEDIUM",
        status: "IN_PROGRESS",
        location: "Main Parking Lot",
        requestedBy: "Security Team",
        createdAt: new Date("2026-01-23T20:15:00Z"),
        updatedAt: new Date("2026-01-24T10:00:00Z"),
        images: [
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A"
        ]
    },
    // Pending requests (2 out of ~43 total)
    {
        id: "11",
        title: "Door Lock Replacement",
        description: "Office door lock is malfunctioning and needs replacement.",
        category: "CARPENTRY",
        priority: "MEDIUM",
        status: "PENDING",
        location: "Building C, Office 305",
        requestedBy: "Admin Staff",
        createdAt: new Date("2026-01-24T11:45:00Z"),
        updatedAt: new Date("2026-01-24T11:45:00Z"),
        images: []
    },
    {
        id: "12",
        title: "Water Fountain Repair",
        description: "Water fountain on 3rd floor is not dispensing water properly.",
        category: "PLUMBING",
        priority: "LOW",
        status: "PENDING",
        location: "Building A, 3rd Floor",
        requestedBy: "Student Services",
        createdAt: new Date("2026-01-24T12:30:00Z"),
        updatedAt: new Date("2026-01-24T12:30:00Z"),
        images: []
    },
    // Urgent requests (4 out of ~43 total)
    {
        id: "13",
        title: "Gas Leak Detected",
        description: "Strong gas smell detected near the science building - emergency response required.",
        category: "PLUMBING",
        priority: "URGENT",
        status: "IN_PROGRESS",
        location: "Building D, Science Labs",
        requestedBy: "Lab Technician",
        createdAt: new Date("2026-01-24T14:15:00Z"),
        updatedAt: new Date("2026-01-24T14:30:00Z"),
        images: [
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A"
        ]
    },
    {
        id: "15",
        title: "Power Outage in Building A",
        description: "Complete power failure in Building A affecting all floors and systems.",
        category: "ELECTRICAL",
        priority: "URGENT",
        status: "PENDING",
        location: "Building A, All Floors",
        requestedBy: "Building Manager",
        createdAt: new Date("2026-01-24T15:30:00Z"),
        updatedAt: new Date("2026-01-24T15:30:00Z"),
        images: []
    },
    {
        id: "16",
        title: "Burst Water Main",
        description: "Major water main break causing flooding in the parking area - immediate action needed.",
        category: "PLUMBING",
        priority: "URGENT",
        status: "IN_PROGRESS",
        location: "Main Campus, Parking Lot B",
        requestedBy: "Security Team",
        createdAt: new Date("2026-01-24T16:00:00Z"),
        updatedAt: new Date("2026-01-24T16:15:00Z"),
        images: [
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A"
        ]
    }
];
// Generate additional requests to reach realistic numbers with balanced status distribution
const generateAdditionalRequests = ()=>{
    const additionalRequests = [];
    const categories = [
        "ELECTRICAL",
        "PLUMBING",
        "CARPENTRY",
        "PERSONNEL",
        "OTHERS"
    ];
    const priorities = [
        "LOW",
        "MEDIUM",
        "HIGH",
        "URGENT"
    ];
    const requesters = [
        "Student",
        "Staff",
        "Faculty",
        "Admin",
        "Security"
    ];
    const locations = [
        "Building A",
        "Building B",
        "Building C",
        "Building D",
        "Building E",
        "Building F",
        "Building G",
        "Main Campus"
    ];
    const titles = [
        "Light Bulb Replacement",
        "Pipe Repair",
        "AC Maintenance",
        "Door Fix",
        "Window Repair",
        "Outlet Installation",
        "Faucet Leak",
        "Vent Cleaning",
        "Lock Replacement",
        "Switch Repair",
        "Toilet Repair",
        "Thermostat Fix",
        "Cabinet Repair",
        "Circuit Check",
        "Drain Cleaning",
        "Filter Change"
    ];
    // Generate requests with balanced status distribution
    // Target: ~60% completed, ~25% pending, ~15% in progress
    const targetTotal = 43; // Total requests we want
    const currentCount = 16; // Current requests in the array
    const requestsToGenerate = targetTotal - currentCount;
    const statusDistribution = {
        COMPLETED: Math.floor(requestsToGenerate * 0.6),
        PENDING: Math.floor(requestsToGenerate * 0.25),
        IN_PROGRESS: Math.floor(requestsToGenerate * 0.15)
    };
    let requestIndex = 17;
    // Generate requests for each status
    Object.entries(statusDistribution).forEach(([status, count])=>{
        for(let i = 0; i < count; i++){
            const category = categories[Math.floor(Math.random() * categories.length)];
            const priority = priorities[Math.floor(Math.random() * priorities.length)];
            const requester = requesters[Math.floor(Math.random() * requesters.length)];
            const location = locations[Math.floor(Math.random() * locations.length)];
            const title = titles[Math.floor(Math.random() * titles.length)];
            // Create date within the last month
            const daysAgo = Math.floor(Math.random() * 30);
            const createdAt = new Date();
            createdAt.setDate(createdAt.getDate() - daysAgo);
            // Set updated time based on status
            const updatedAt = new Date(createdAt);
            if (status === "COMPLETED") {
                // Completed 1-7 days after creation
                updatedAt.setDate(updatedAt.getDate() + Math.floor(Math.random() * 7) + 1);
            } else if (status === "IN_PROGRESS") {
                // Updated 0-2 days after creation
                updatedAt.setDate(updatedAt.getDate() + Math.floor(Math.random() * 3));
            }
            // PENDING requests have same created and updated time
            additionalRequests.push({
                id: requestIndex.toString(),
                title: `${title} - ${location}`,
                description: `Maintenance request for ${title.toLowerCase()} in ${location}.`,
                category,
                priority: status === "COMPLETED" ? priorities[Math.floor(Math.random() * 3)] // Exclude URGENT from completed for realism
                 : priority,
                status: status,
                location: `${location}, Room ${Math.floor(Math.random() * 500) + 100}`,
                requestedBy: `${requester} ${Math.floor(Math.random() * 100)}`,
                createdAt,
                updatedAt,
                images: Math.random() > 0.7 ? [
                    generateMockImage()
                ] : []
            });
            requestIndex++;
        }
    });
    return additionalRequests;
};
const generateMockImage = ()=>{
    return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A";
};
// Combine original requests with generated ones
maintenanceRequests = [
    ...maintenanceRequests,
    ...generateAdditionalRequests()
];
const getMaintenanceRequests = ()=>{
    return [
        ...maintenanceRequests
    ];
};
const getMaintenanceStats = ()=>{
    const requests = getMaintenanceRequests();
    return {
        totalRequests: requests.length,
        pendingRequests: requests.filter((r)=>r.status === "PENDING").length,
        inProgressRequests: requests.filter((r)=>r.status === "IN_PROGRESS").length,
        completedRequests: requests.filter((r)=>r.status === "COMPLETED").length
    };
};
const getRecentRequests = (limit = 10)=>{
    return [
        ...maintenanceRequests
    ].sort((a, b)=>b.createdAt.getTime() - a.createdAt.getTime()).slice(0, limit);
};
const getRequestsByCategory = ()=>{
    const requests = getMaintenanceRequests();
    const categoryCount = {};
    requests.forEach((request)=>{
        categoryCount[request.category] = (categoryCount[request.category] || 0) + 1;
    });
    return categoryCount;
};
const getRequestsByPriority = ()=>{
    const requests = getMaintenanceRequests();
    const priorityCount = {
        LOW: 0,
        MEDIUM: 0,
        HIGH: 0,
        URGENT: 0
    };
    requests.forEach((request)=>{
        priorityCount[request.priority] = (priorityCount[request.priority] || 0) + 1;
    });
    return priorityCount;
};
const addMaintenanceRequest = (request)=>{
    // Find the highest current ID to generate proper sequential ID
    const maxId = Math.max(...maintenanceRequests.map((r)=>parseInt(r.id)), 0);
    const newId = (maxId + 1).toString();
    const newRequest = {
        id: newId,
        ...request,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    maintenanceRequests.push(newRequest);
    return newRequest;
};
const updateRequestStatus = (id, status)=>{
    const request = maintenanceRequests.find((r)=>r.id === id);
    if (request) {
        request.status = status;
        request.updatedAt = new Date();
        return request;
    }
    return null;
};
const deleteMaintenanceRequest = (id)=>{
    const index = maintenanceRequests.findIndex((r)=>r.id === id);
    if (index !== -1) {
        maintenanceRequests.splice(index, 1);
        return true;
    }
    return false;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/lib/z-index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Z-index management system to prevent overlaying issues
__turbopack_context__.s([
    "Z_INDEX",
    ()=>Z_INDEX,
    "Z_INDEX_VARS",
    ()=>Z_INDEX_VARS
]);
const Z_INDEX = {
    // Base layers
    BASE: 0,
    DROPDOWN: 10,
    DROPDOWN_CONTENT: 11,
    STICKY: 20,
    // Overlay layers
    MODAL_BACKDROP: 1000,
    MODAL: 1001,
    TOOLTIP: 1002,
    NOTIFICATION: 1003,
    // Highest priority
    MAX: 9999
};
const Z_INDEX_VARS = {
    "--z-base": Z_INDEX.BASE,
    "--z-dropdown": Z_INDEX.DROPDOWN,
    "--z-sticky": Z_INDEX.STICKY,
    "--z-modal-backdrop": Z_INDEX.MODAL_BACKDROP,
    "--z-modal": Z_INDEX.MODAL,
    "--z-tooltip": Z_INDEX.TOOLTIP,
    "--z-notification": Z_INDEX.NOTIFICATION,
    "--z-max": Z_INDEX.MAX
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/ThemeSwitcher.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ThemeSwitcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ThemeProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/theme.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$z$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/z-index.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const themes = [
    {
        value: "standard",
        label: "Nature",
        icon: "🌿",
        colors: {
            primary: "#10B981",
            secondary: "#059669"
        },
        description: "Clean green and white theme"
    },
    {
        value: "light",
        label: "Ocean Light",
        icon: "🌊",
        colors: {
            primary: "#0EA5E9",
            secondary: "#06B6D4"
        },
        description: "Fresh sky blue and cyan theme"
    },
    {
        value: "dark",
        label: "Midnight Dark",
        icon: "🌃",
        colors: {
            primary: "#3B82F6",
            secondary: "#1D4ED8"
        },
        description: "Professional blue slate theme"
    }
];
function ThemeSwitcher() {
    _s();
    const { themeConfig, setTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const [currentTheme, setCurrentTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ThemeSwitcher.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredTheme"])()
    }["ThemeSwitcher.useState"]);
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleThemeChange = (theme)=>{
        // Prevent rapid theme switching
        if (currentTheme === theme) return;
        // Add visual feedback with enhanced animations
        const button = document.activeElement;
        if (button) {
            // Use requestAnimationFrame to avoid React hooks violations
            requestAnimationFrame(()=>{
                button.style.transform = "scale(0.95) rotate(2deg)";
                button.style.transition = "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)";
                setTimeout(()=>{
                    button.style.transform = "scale(1) rotate(0deg)";
                }, 200);
            });
        }
        // Add ripple effect to theme switcher
        const ripple = document.createElement("div");
        ripple.style.position = "absolute";
        ripple.style.width = "20px";
        ripple.style.height = "20px";
        ripple.style.borderRadius = "50%";
        ripple.style.backgroundColor = themeConfig.colors.primary;
        ripple.style.opacity = "0.6";
        ripple.style.transform = "translate(-50%, -50%) scale(0)";
        ripple.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-out";
        ripple.style.pointerEvents = "none";
        ripple.style.zIndex = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$z$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Z_INDEX"].MAX.toString();
        if (button) {
            const rect = button.getBoundingClientRect();
            ripple.style.left = `${rect.left + rect.width / 2}px`;
            ripple.style.top = `${rect.top + rect.height / 2}px`;
            document.body.appendChild(ripple);
            // Animate ripple
            setTimeout(()=>{
                ripple.style.transform = "translate(-50%, -50%) scale(4)";
                ripple.style.opacity = "0";
            }, 10);
            // Remove ripple
            setTimeout(()=>{
                document.body.removeChild(ripple);
            }, 600);
        }
        // Update theme with smooth transition
        setCurrentTheme(theme);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setStoredTheme"])(theme);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTheme"])(theme);
        setTheme(theme);
        setIsOpen(false);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeSwitcher.useEffect": ()=>{
            // Only run on client-side
            if (("TURBOPACK compile-time value", "object") === "undefined" || typeof document === "undefined") {
                return;
            }
            // Add smooth transition to all elements before changing theme
            document.body.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
            // Remove transition after theme change is complete
            const timeout = setTimeout({
                "ThemeSwitcher.useEffect.timeout": ()=>{
                    if (typeof document !== "undefined") {
                        document.body.style.transition = "";
                    }
                }
            }["ThemeSwitcher.useEffect.timeout"], 900);
            return ({
                "ThemeSwitcher.useEffect": ()=>clearTimeout(timeout)
            })["ThemeSwitcher.useEffect"];
        }
    }["ThemeSwitcher.useEffect"], [
        currentTheme
    ]);
    // Close dropdown when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeSwitcher.useEffect": ()=>{
            const handleClickOutside = {
                "ThemeSwitcher.useEffect.handleClickOutside": (event)=>{
                    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                        setIsOpen(false);
                    }
                }
            }["ThemeSwitcher.useEffect.handleClickOutside"];
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "ThemeSwitcher.useEffect": ()=>document.removeEventListener("mousedown", handleClickOutside)
            })["ThemeSwitcher.useEffect"];
        }
    }["ThemeSwitcher.useEffect"], []);
    const currentThemeData = themes.find((t)=>t.value === currentTheme);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        ref: dropdownRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsOpen(!isOpen),
                className: "flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 transform active:scale-95",
                style: {
                    backgroundColor: themeConfig.colors.surface,
                    border: `1px solid ${themeConfig.colors.border}`,
                    color: themeConfig.colors.text,
                    transition: "all 0.3s ease-in-out, transform 0.2s ease-in-out"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-lg",
                        children: currentThemeData?.icon
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/ThemeSwitcher.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium",
                        children: currentThemeData?.label
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/ThemeSwitcher.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: `w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`,
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M19 9l-7 7-7-7"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/ThemeSwitcher.tsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/ThemeSwitcher.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/ThemeSwitcher.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-full right-0 mt-2 w-64 rounded-xl shadow-lg border",
                style: {
                    backgroundColor: themeConfig.colors.surface,
                    borderColor: themeConfig.colors.border,
                    zIndex: 9999
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-2",
                    children: themes.map((theme)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleThemeChange(theme.value),
                            className: `w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 transform ${currentTheme === theme.value ? "scale-105" : "hover:scale-105 active:scale-95"}`,
                            style: {
                                backgroundColor: currentTheme === theme.value ? `${theme.colors.primary}20` : "transparent",
                                color: themeConfig.colors.text,
                                transition: "all 0.3s ease-in-out, transform 0.2s ease-in-out"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-lg",
                                            children: theme.icon
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/ThemeSwitcher.tsx",
                                            lineNumber: 203,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex space-x-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-4 h-4 rounded-full border",
                                                    style: {
                                                        backgroundColor: theme.colors.primary,
                                                        borderColor: themeConfig.colors.border
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/ThemeSwitcher.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-4 h-4 rounded-full border",
                                                    style: {
                                                        backgroundColor: theme.colors.secondary,
                                                        borderColor: themeConfig.colors.border
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/ThemeSwitcher.tsx",
                                                    lineNumber: 212,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/components/ThemeSwitcher.tsx",
                                            lineNumber: 204,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/ThemeSwitcher.tsx",
                                    lineNumber: 202,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm font-medium",
                                            children: theme.label
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/ThemeSwitcher.tsx",
                                            lineNumber: 222,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs",
                                            style: {
                                                color: themeConfig.colors.textSecondary
                                            },
                                            children: theme.description
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/ThemeSwitcher.tsx",
                                            lineNumber: 223,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/ThemeSwitcher.tsx",
                                    lineNumber: 221,
                                    columnNumber: 17
                                }, this),
                                currentTheme === theme.value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4",
                                    fill: "currentColor",
                                    viewBox: "0 0 20 20",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        fillRule: "evenodd",
                                        d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                        clipRule: "evenodd"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/ThemeSwitcher.tsx",
                                        lineNumber: 236,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/ThemeSwitcher.tsx",
                                    lineNumber: 231,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, theme.value, true, {
                            fileName: "[project]/apps/web/src/components/ThemeSwitcher.tsx",
                            lineNumber: 184,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/ThemeSwitcher.tsx",
                    lineNumber: 182,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/ThemeSwitcher.tsx",
                lineNumber: 174,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/ThemeSwitcher.tsx",
        lineNumber: 145,
        columnNumber: 5
    }, this);
}
_s(ThemeSwitcher, "MMISTxMLXIou6gu/rBVZNFC55U4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = ThemeSwitcher;
var _c;
__turbopack_context__.k.register(_c, "ThemeSwitcher");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/AccountDropdown.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AccountDropdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ThemeProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$z$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/z-index.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function AccountDropdown() {
    _s();
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dropdownPosition, setDropdownPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("bottom");
    const [dropdownAlignment, setDropdownAlignment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("right");
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AccountDropdown.useEffect": ()=>{
            // Only run on client-side
            if (("TURBOPACK compile-time value", "object") === "undefined" || typeof document === "undefined") {
                return;
            }
            const handleClickOutside = {
                "AccountDropdown.useEffect.handleClickOutside": (event)=>{
                    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                        setIsOpen(false);
                    }
                }
            }["AccountDropdown.useEffect.handleClickOutside"];
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "AccountDropdown.useEffect": ()=>document.removeEventListener("mousedown", handleClickOutside)
            })["AccountDropdown.useEffect"];
        }
    }["AccountDropdown.useEffect"], []);
    const handleLogout = async ()=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])({
            redirect: false
        });
        router.push("/login");
        setIsOpen(false);
    };
    const handleSwitchAccount = ()=>{
        // For demo purposes, we'll just redirect to login
        // In a real app, you might show a modal to select different accounts
        router.push("/login");
        setIsOpen(false);
    };
    const handleRemoveAccount = ()=>{
        // For demo purposes, we'll just logout
        if (confirm("Are you sure you want to remove your account? This action cannot be undone.")) {
            handleLogout();
        }
        setIsOpen(false);
    };
    const toggleDropdown = ()=>{
        if (!isOpen) {
            // Check if there's enough space below the button
            const buttonRect = dropdownRef.current?.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            const dropdownHeight = 300; // Estimated dropdown height with safety margin
            const dropdownWidth = 224; // w-56 = 14rem = 224px
            const safetyMargin = 20; // 20px safety margin from viewport edges
            if (buttonRect) {
                // Check vertical position
                if (buttonRect.bottom + dropdownHeight + safetyMargin > viewportHeight) {
                    // Not enough space below, position above
                    setDropdownPosition("top");
                } else {
                    // Enough space below, position below
                    setDropdownPosition("bottom");
                }
                // Check horizontal position
                if (buttonRect.left - dropdownWidth < safetyMargin) {
                    // Not enough space on the left, align to left
                    setDropdownAlignment("left");
                } else {
                    // Enough space on the left, align to right (default behavior)
                    setDropdownAlignment("right");
                }
            }
        }
        setIsOpen(!isOpen);
    };
    if (!session) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: ()=>router.push("/login"),
            className: "p-2 rounded-xl transition-all duration-300 hover:scale-105",
            style: {
                backgroundColor: themeConfig.colors.surface,
                color: themeConfig.colors.text,
                border: `1px solid ${themeConfig.colors.border}`
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "12",
                        cy: "8",
                        r: "3",
                        stroke: "currentColor",
                        strokeWidth: 2.5,
                        fill: "none"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2.5,
                        d: "M16 19a4 4 0 00-8 0"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                        lineNumber: 127,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                lineNumber: 113,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
            lineNumber: 104,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        ref: dropdownRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: toggleDropdown,
                className: "flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:scale-105",
                style: {
                    backgroundColor: themeConfig.colors.surface,
                    color: themeConfig.colors.text,
                    border: `1px solid ${themeConfig.colors.border}`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold",
                                style: {
                                    background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`
                                },
                                children: session.user?.name?.charAt(0).toUpperCase() || "U"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-medium",
                                        style: {
                                            color: themeConfig.colors.text
                                        },
                                        children: session.user?.name || "User"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs",
                                        style: {
                                            color: themeConfig.colors.textSecondary
                                        },
                                        children: session.user?.role || "User"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                        lineNumber: 165,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: `w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`,
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 3,
                            d: "M19 9l-7 7-7-7"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute w-56 rounded-xl shadow-lg border max-h-64 overflow-y-auto ${dropdownPosition === "bottom" ? "top-full mt-2" : "bottom-full mb-2"} ${dropdownAlignment === "left" ? "left-0" : "right-0"}`,
                style: {
                    backgroundColor: themeConfig.colors.surface,
                    borderColor: themeConfig.colors.border,
                    zIndex: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$z$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Z_INDEX"].MAX
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>router.push("/settings"),
                            className: "w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-left",
                            style: {
                                color: themeConfig.colors.text
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "12",
                                            cy: "12",
                                            r: "3",
                                            stroke: "currentColor",
                                            strokeWidth: 2.5,
                                            fill: "none"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                            lineNumber: 213,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2.5,
                                            d: "M12 1v6m0 6v6m11-7h-6m-6 0H1"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                            lineNumber: 221,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                    lineNumber: 207,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm font-medium",
                                            children: "Account Settings"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                            lineNumber: 229,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs",
                                            style: {
                                                color: themeConfig.colors.textSecondary
                                            },
                                            children: "Manage your preferences"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                            lineNumber: 230,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                    lineNumber: 228,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                            lineNumber: 200,
                            columnNumber: 13
                        }, this),
                        session.user?.role === "ADMIN" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>router.push("/admin/dashboard"),
                            className: "w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-left",
                            style: {
                                color: themeConfig.colors.text
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2.5,
                                        d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                        lineNumber: 253,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                    lineNumber: 247,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm font-medium",
                                            children: "Admin Dashboard"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                            lineNumber: 261,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs",
                                            style: {
                                                color: themeConfig.colors.textSecondary
                                            },
                                            children: "Manage maintenance requests"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                            lineNumber: 262,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                    lineNumber: 260,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                            lineNumber: 240,
                            columnNumber: 15
                        }, this),
                        session.user?.role !== "ADMIN" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>router.push("/student"),
                            className: "w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-left",
                            style: {
                                color: themeConfig.colors.text
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2.5,
                                        d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                        lineNumber: 286,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                    lineNumber: 280,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm font-medium",
                                            children: "Request Portal"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                            lineNumber: 294,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs",
                                            style: {
                                                color: themeConfig.colors.textSecondary
                                            },
                                            children: "Submit maintenance requests"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                            lineNumber: 295,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                    lineNumber: 293,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                            lineNumber: 273,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-t my-1",
                            style: {
                                borderColor: themeConfig.colors.border
                            }
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                            lineNumber: 305,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSwitchAccount,
                            className: "w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-left",
                            style: {
                                color: themeConfig.colors.text
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2.5,
                                        d: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                        lineNumber: 323,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                    lineNumber: 317,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm font-medium",
                                            children: "Switch Account"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                            lineNumber: 331,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs",
                                            style: {
                                                color: themeConfig.colors.textSecondary
                                            },
                                            children: "Change user account"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                            lineNumber: 332,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                    lineNumber: 330,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                            lineNumber: 310,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleRemoveAccount,
                            className: "w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-left",
                            style: {
                                color: themeConfig.colors.error
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2.5,
                                        d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m0-6v6m0-6V3a2 2 0 012-2h6a2 2 0 012 2v6"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                        lineNumber: 354,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                    lineNumber: 348,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm font-medium",
                                            children: "Remove Account"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                            lineNumber: 362,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs",
                                            style: {
                                                color: themeConfig.colors.textSecondary
                                            },
                                            children: "Delete your account"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                            lineNumber: 363,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                    lineNumber: 361,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                            lineNumber: 341,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-t my-1",
                            style: {
                                borderColor: themeConfig.colors.border
                            }
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                            lineNumber: 372,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleLogout,
                            className: "w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-left",
                            style: {
                                color: themeConfig.colors.text
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2.5,
                                        d: "M17 16l4-4m0 0l-4 4m4-4H3m4 4v-4m0 0v4"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                        lineNumber: 390,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                    lineNumber: 384,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm font-medium",
                                            children: "Log Out"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                            lineNumber: 398,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs",
                                            style: {
                                                color: themeConfig.colors.textSecondary
                                            },
                                            children: "Sign out of your account"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                            lineNumber: 399,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                                    lineNumber: 397,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                            lineNumber: 377,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                    lineNumber: 199,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
                lineNumber: 189,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/AccountDropdown.tsx",
        lineNumber: 139,
        columnNumber: 5
    }, this);
}
_s(AccountDropdown, "/1AEq9wuNBvbxxq0GLKORDQp4vE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = AccountDropdown;
var _c;
__turbopack_context__.k.register(_c, "AccountDropdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/hooks/useMobileOptimizations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useHapticFeedback",
    ()=>useHapticFeedback,
    "useMobileOptimizations",
    ()=>useMobileOptimizations,
    "usePullToRefresh",
    ()=>usePullToRefresh,
    "useTouchGestures",
    ()=>useTouchGestures
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
function useMobileOptimizations() {
    _s();
    const [optimizations, setOptimizations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        screenWidth: 1024,
        screenHeight: 768,
        orientation: "landscape",
        supportsTouch: false,
        supportsHaptic: false,
        safeAreaInsets: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMobileOptimizations.useEffect": ()=>{
            // Defer the heavy DOM operations to prevent blocking
            const timer = setTimeout({
                "useMobileOptimizations.useEffect.timer": ()=>{
                    const updateOptimizations = {
                        "useMobileOptimizations.useEffect.timer.updateOptimizations": ()=>{
                            const width = window.innerWidth;
                            const height = window.innerHeight;
                            const isMobile = width < 768;
                            const isTablet = width >= 768 && width < 1024;
                            const isDesktop = width >= 1024;
                            // Get safe area insets
                            const computedStyle = getComputedStyle(document.documentElement);
                            const safeAreaInsets = {
                                top: parseInt(computedStyle.getPropertyValue("--mobile-safe-area-top") || "0"),
                                right: parseInt(computedStyle.getPropertyValue("--mobile-safe-area-right") || "0"),
                                bottom: parseInt(computedStyle.getPropertyValue("--mobile-safe-area-bottom") || "0"),
                                left: parseInt(computedStyle.getPropertyValue("--mobile-safe-area-left") || "0")
                            };
                            setOptimizations({
                                isMobile,
                                isTablet,
                                isDesktop,
                                screenWidth: width,
                                screenHeight: height,
                                orientation: width > height ? "landscape" : "portrait",
                                supportsTouch: "ontouchstart" in window || navigator.maxTouchPoints > 0,
                                supportsHaptic: "vibrate" in navigator,
                                safeAreaInsets
                            });
                        }
                    }["useMobileOptimizations.useEffect.timer.updateOptimizations"];
                    updateOptimizations();
                    const resizeObserver = new ResizeObserver(updateOptimizations);
                    resizeObserver.observe(document.body);
                    const handleOrientationChange = {
                        "useMobileOptimizations.useEffect.timer.handleOrientationChange": ()=>{
                            setTimeout(updateOptimizations, 100); // Delay for orientation change completion
                        }
                    }["useMobileOptimizations.useEffect.timer.handleOrientationChange"];
                    window.addEventListener("orientationchange", handleOrientationChange);
                    window.addEventListener("resize", updateOptimizations);
                    return ({
                        "useMobileOptimizations.useEffect.timer": ()=>{
                            resizeObserver.disconnect();
                            window.removeEventListener("orientationchange", handleOrientationChange);
                            window.removeEventListener("resize", updateOptimizations);
                        }
                    })["useMobileOptimizations.useEffect.timer"];
                }
            }["useMobileOptimizations.useEffect.timer"], 100); // Small delay to allow page to render first
            return ({
                "useMobileOptimizations.useEffect": ()=>{
                // Cleanup timer if component unmounts quickly
                }
            })["useMobileOptimizations.useEffect"];
        }
    }["useMobileOptimizations.useEffect"], []);
    return optimizations;
}
_s(useMobileOptimizations, "CoY7HQdBnuyoX9C+AMHbALiXcLM=");
function useHapticFeedback() {
    _s1();
    const { supportsHaptic } = useMobileOptimizations();
    const triggerHaptic = (pattern = 10)=>{
        if (supportsHaptic && navigator.vibrate) {
            try {
                navigator.vibrate(pattern);
            } catch (error) {
                console.warn("Haptic feedback not supported:", error);
            }
        }
    };
    const triggerLightHaptic = ()=>triggerHaptic(10);
    const triggerMediumHaptic = ()=>triggerHaptic([
            10,
            50,
            10
        ]);
    const triggerHeavyHaptic = ()=>triggerHaptic([
            20,
            100,
            20
        ]);
    const triggerSuccessHaptic = ()=>triggerHaptic([
            10,
            30,
            10,
            30,
            10
        ]);
    const triggerErrorHaptic = ()=>triggerHaptic([
            50,
            50,
            50,
            50,
            50
        ]);
    return {
        triggerHaptic,
        triggerLightHaptic,
        triggerMediumHaptic,
        triggerHeavyHaptic,
        triggerSuccessHaptic,
        triggerErrorHaptic,
        supportsHaptic
    };
}
_s1(useHapticFeedback, "XWHSnUhqtsho846wYFxPVbkekeQ=", false, function() {
    return [
        useMobileOptimizations
    ];
});
function useTouchGestures(element, options = {}) {
    _s2();
    const { supportsTouch } = useMobileOptimizations();
    const { onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onTap, onLongPress, threshold = 50, longPressDelay = 500 } = options;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTouchGestures.useEffect": ()=>{
            if (!element || !supportsTouch) return;
            let startX = 0;
            let startY = 0;
            let startTime = 0;
            let longPressTimer;
            const handleTouchStart = {
                "useTouchGestures.useEffect.handleTouchStart": (e)=>{
                    const touch = e.touches[0];
                    startX = touch.clientX;
                    startY = touch.clientY;
                    startTime = Date.now();
                    longPressTimer = setTimeout({
                        "useTouchGestures.useEffect.handleTouchStart": ()=>{
                            onLongPress?.();
                        }
                    }["useTouchGestures.useEffect.handleTouchStart"], longPressDelay);
                }
            }["useTouchGestures.useEffect.handleTouchStart"];
            const handleTouchMove = {
                "useTouchGestures.useEffect.handleTouchMove": (e)=>{
                    clearTimeout(longPressTimer);
                }
            }["useTouchGestures.useEffect.handleTouchMove"];
            const handleTouchEnd = {
                "useTouchGestures.useEffect.handleTouchEnd": (e)=>{
                    clearTimeout(longPressTimer);
                    const touch = e.changedTouches[0];
                    const endX = touch.clientX;
                    const endY = touch.clientY;
                    const endTime = Date.now();
                    const deltaX = endX - startX;
                    const deltaY = endY - startY;
                    const deltaTime = endTime - startTime;
                    // Check for tap (short touch with minimal movement)
                    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && deltaTime < 200) {
                        onTap?.();
                        return;
                    }
                    // Check for swipe
                    if (Math.abs(deltaX) > Math.abs(deltaY)) {
                        if (Math.abs(deltaX) > threshold) {
                            if (deltaX > 0) {
                                onSwipeRight?.();
                            } else {
                                onSwipeLeft?.();
                            }
                        }
                    } else {
                        if (Math.abs(deltaY) > threshold) {
                            if (deltaY > 0) {
                                onSwipeDown?.();
                            } else {
                                onSwipeUp?.();
                            }
                        }
                    }
                }
            }["useTouchGestures.useEffect.handleTouchEnd"];
            element.addEventListener("touchstart", handleTouchStart, {
                passive: true
            });
            element.addEventListener("touchmove", handleTouchMove, {
                passive: true
            });
            element.addEventListener("touchend", handleTouchEnd, {
                passive: true
            });
            return ({
                "useTouchGestures.useEffect": ()=>{
                    element.removeEventListener("touchstart", handleTouchStart);
                    element.removeEventListener("touchmove", handleTouchMove);
                    element.removeEventListener("touchend", handleTouchEnd);
                }
            })["useTouchGestures.useEffect"];
        }
    }["useTouchGestures.useEffect"], [
        element,
        supportsTouch,
        onSwipeLeft,
        onSwipeRight,
        onSwipeUp,
        onSwipeDown,
        onTap,
        onLongPress,
        threshold,
        longPressDelay
    ]);
}
_s2(useTouchGestures, "ss7FGGasEZbgukg2GIyfaxXDa3s=", false, function() {
    return [
        useMobileOptimizations
    ];
});
function usePullToRefresh(onRefresh, options = {}) {
    _s3();
    const { isMobile } = useMobileOptimizations();
    const { threshold = 80, maxPullDistance = 120, debounceMs = 300 } = options;
    const [isPulling, setIsPulling] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pullDistance, setPullDistance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isRefreshing, setIsRefreshing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePullToRefresh.useEffect": ()=>{
            if (!isMobile) return;
            let startY = 0;
            let currentY = 0;
            let isPullingActive = false;
            const handleTouchStart = {
                "usePullToRefresh.useEffect.handleTouchStart": (e)=>{
                    if (window.scrollY === 0) {
                        startY = e.touches[0].clientY;
                        isPullingActive = true;
                    }
                }
            }["usePullToRefresh.useEffect.handleTouchStart"];
            const handleTouchMove = {
                "usePullToRefresh.useEffect.handleTouchMove": (e)=>{
                    if (!isPullingActive) return;
                    currentY = e.touches[0].clientY;
                    const distance = Math.min(currentY - startY, maxPullDistance);
                    if (distance > 0) {
                        e.preventDefault();
                        setPullDistance(distance);
                        setIsPulling(true);
                    }
                }
            }["usePullToRefresh.useEffect.handleTouchMove"];
            const handleTouchEnd = {
                "usePullToRefresh.useEffect.handleTouchEnd": async ()=>{
                    if (!isPullingActive) return;
                    isPullingActive = false;
                    if (pullDistance >= threshold && !isRefreshing) {
                        setIsRefreshing(true);
                        try {
                            await onRefresh();
                        } finally{
                            setIsRefreshing(false);
                        }
                    }
                    setPullDistance(0);
                    setIsPulling(false);
                }
            }["usePullToRefresh.useEffect.handleTouchEnd"];
            document.addEventListener("touchstart", handleTouchStart, {
                passive: true
            });
            document.addEventListener("touchmove", handleTouchMove, {
                passive: false
            });
            document.addEventListener("touchend", handleTouchEnd, {
                passive: true
            });
            return ({
                "usePullToRefresh.useEffect": ()=>{
                    document.removeEventListener("touchstart", handleTouchStart);
                    document.removeEventListener("touchmove", handleTouchMove);
                    document.removeEventListener("touchend", handleTouchEnd);
                }
            })["usePullToRefresh.useEffect"];
        }
    }["usePullToRefresh.useEffect"], [
        isMobile,
        onRefresh,
        threshold,
        maxPullDistance,
        pullDistance,
        isRefreshing
    ]);
    return {
        isPulling,
        pullDistance,
        isRefreshing,
        pullProgress: Math.min(pullDistance / threshold, 1)
    };
}
_s3(usePullToRefresh, "j3P6TgOaxtFVB1gVvngOIkYLpN8=", false, function() {
    return [
        useMobileOptimizations
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/MobileNavigation.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MobileNavigationWrapper",
    ()=>MobileNavigationWrapper,
    "default",
    ()=>MobileNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ThemeProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/useMobileOptimizations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function MobileNavigation() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const { isMobile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"])();
    const { triggerLightHaptic } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHapticFeedback"])();
    if (!isMobile) return null;
    const navItems = [
        {
            id: 'home',
            label: 'Home',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/MobileNavigation.tsx",
                    lineNumber: 33,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/MobileNavigation.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this),
            href: '/',
            active: pathname === '/'
        },
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/MobileNavigation.tsx",
                    lineNumber: 44,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/MobileNavigation.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, this),
            href: '/dashboard',
            active: pathname.includes('/dashboard')
        },
        {
            id: 'requests',
            label: 'Requests',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M12 4v16m8-8H4"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/MobileNavigation.tsx",
                    lineNumber: 55,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/MobileNavigation.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, this),
            href: '/student',
            active: pathname.includes('/student'),
            badge: 3
        },
        {
            id: 'history',
            label: 'History',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/MobileNavigation.tsx",
                    lineNumber: 67,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/MobileNavigation.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, this),
            href: '/student/history',
            active: pathname.includes('/history')
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/MobileNavigation.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/MobileNavigation.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/MobileNavigation.tsx",
                lineNumber: 77,
                columnNumber: 9
            }, this),
            href: '/settings',
            active: pathname.includes('/settings')
        }
    ];
    const handleNavClick = (href)=>{
        triggerLightHaptic();
        router.push(href);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "fixed bottom-0 left-0 right-0 z-50 mobile-safe-padding-bottom",
        style: {
            backgroundColor: themeConfig.colors.surface,
            borderTop: `1px solid ${themeConfig.colors.border}`,
            boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-around py-2",
            children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>handleNavClick(item.href),
                    className: "flex flex-col items-center justify-center relative min-w-[44px] min-h-[44px] px-2 py-1 rounded-lg transition-all duration-200 active:scale-95",
                    style: {
                        color: item.active ? themeConfig.colors.primary : themeConfig.colors.textSecondary,
                        backgroundColor: item.active ? `${themeConfig.colors.primary}15` : 'transparent'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                item.icon,
                                item.badge && item.badge > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "absolute -top-1 -right-1 text-xs font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center",
                                    style: {
                                        backgroundColor: themeConfig.colors.error,
                                        color: 'white'
                                    },
                                    children: item.badge > 99 ? '99+' : item.badge
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/MobileNavigation.tsx",
                                    lineNumber: 115,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/MobileNavigation.tsx",
                            lineNumber: 112,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs mt-1 font-medium truncate max-w-[60px]",
                            children: item.label
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/MobileNavigation.tsx",
                            lineNumber: 126,
                            columnNumber: 13
                        }, this)
                    ]
                }, item.id, true, {
                    fileName: "[project]/apps/web/src/components/MobileNavigation.tsx",
                    lineNumber: 103,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/MobileNavigation.tsx",
            lineNumber: 101,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/MobileNavigation.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
_s(MobileNavigation, "x6Cs1UCfgECJMmEHa5sAJrWKuOk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHapticFeedback"]
    ];
});
_c = MobileNavigation;
function MobileNavigationWrapper({ children, showNavigation = true }) {
    _s1();
    const { isMobile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: showNavigation && isMobile ? 'pb-20' : '',
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/MobileNavigation.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            showNavigation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileNavigation, {}, void 0, false, {
                fileName: "[project]/apps/web/src/components/MobileNavigation.tsx",
                lineNumber: 155,
                columnNumber: 26
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/MobileNavigation.tsx",
        lineNumber: 149,
        columnNumber: 5
    }, this);
}
_s1(MobileNavigationWrapper, "aDAaOZ/rAuU/fNr1g9nl8KxIMGg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"]
    ];
});
_c1 = MobileNavigationWrapper;
var _c, _c1;
__turbopack_context__.k.register(_c, "MobileNavigation");
__turbopack_context__.k.register(_c1, "MobileNavigationWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/MobileCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MobileCardGrid",
    ()=>MobileCardGrid,
    "MobileCardList",
    ()=>MobileCardList,
    "default",
    ()=>MobileCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ThemeProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/useMobileOptimizations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function MobileCard({ children, title, subtitle, icon, badge, onClick, className = '', variant = 'default', status = 'default', loading = false }) {
    _s();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const { isMobile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"])();
    const { triggerLightHaptic } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHapticFeedback"])();
    const handleClick = ()=>{
        if (onClick) {
            triggerLightHaptic();
            onClick();
        }
    };
    const getStatusColor = ()=>{
        switch(status){
            case 'success':
                return themeConfig.colors.success;
            case 'warning':
                return themeConfig.colors.warning;
            case 'error':
                return themeConfig.colors.error;
            default:
                return themeConfig.colors.primary;
        }
    };
    const getVariantStyles = ()=>{
        switch(variant){
            case 'compact':
                return 'p-3';
            case 'expanded':
                return 'p-5';
            default:
                return 'p-4';
        }
    };
    const Card = onClick ? 'button' : 'div';
    const cardProps = onClick ? {
        onClick: handleClick
    } : {};
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
        ...cardProps,
        className: `
        relative w-full rounded-xl transition-all duration-200 active:scale-[0.98]
        ${getVariantStyles()}
        ${onClick ? 'cursor-pointer hover:shadow-lg' : ''}
        ${loading ? 'animate-pulse' : ''}
        ${className}
      `,
        style: {
            backgroundColor: themeConfig.colors.surface,
            border: `1px solid ${themeConfig.colors.border}`,
            boxShadow: `0 2px 8px ${themeConfig.colors.primary}10`
        },
        children: [
            status !== 'default' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-0 w-1 h-full rounded-l-xl",
                style: {
                    backgroundColor: getStatusColor()
                }
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/MobileCard.tsx",
                lineNumber: 89,
                columnNumber: 9
            }, this),
            (title || icon || badge) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-3 min-w-0 flex-1",
                        children: [
                            icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
                                style: {
                                    backgroundColor: `${getStatusColor()}20`
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: getStatusColor()
                                    },
                                    children: icon
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/MobileCard.tsx",
                                    lineNumber: 104,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/MobileCard.tsx",
                                lineNumber: 100,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 flex-1",
                                children: [
                                    title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold truncate",
                                        style: {
                                            color: themeConfig.colors.text,
                                            fontSize: isMobile ? '14px' : '16px'
                                        },
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/MobileCard.tsx",
                                        lineNumber: 109,
                                        columnNumber: 17
                                    }, this),
                                    subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm truncate",
                                        style: {
                                            color: themeConfig.colors.textSecondary,
                                            fontSize: isMobile ? '12px' : '14px'
                                        },
                                        children: subtitle
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/MobileCard.tsx",
                                        lineNumber: 120,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/MobileCard.tsx",
                                lineNumber: 107,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/MobileCard.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this),
                    badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 px-2 py-1 rounded-full text-xs font-medium",
                        style: {
                            backgroundColor: `${getStatusColor()}20`,
                            color: getStatusColor()
                        },
                        children: badge
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/MobileCard.tsx",
                        lineNumber: 133,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/MobileCard.tsx",
                lineNumber: 97,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `
          ${title || icon || badge ? 'mt-2' : ''}
          ${loading ? 'opacity-50' : ''}
        `,
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/MobileCard.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            onClick && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 rounded-xl opacity-0 active:opacity-10 transition-opacity duration-150 pointer-events-none",
                style: {
                    backgroundColor: getStatusColor()
                }
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/MobileCard.tsx",
                lineNumber: 158,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/MobileCard.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_s(MobileCard, "dmeAmmJlQKo6gO6Jt4UsJRLyMcs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHapticFeedback"]
    ];
});
_c = MobileCard;
function MobileCardGrid({ children, columns = 1, gap = 'medium', className = '' }) {
    const getGapClass = ()=>{
        switch(gap){
            case 'small':
                return 'gap-2';
            case 'large':
                return 'gap-4';
            default:
                return 'gap-3';
        }
    };
    const getColumnsClass = ()=>{
        return columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `
        grid ${getColumnsClass()} ${getGapClass()}
        ${className}
      `,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/MobileCard.tsx",
        lineNumber: 197,
        columnNumber: 5
    }, this);
}
_c1 = MobileCardGrid;
function MobileCardList({ children, spacing = 'normal', className = '' }) {
    const getSpacingClass = ()=>{
        switch(spacing){
            case 'compact':
                return 'space-y-2';
            case 'loose':
                return 'space-y-4';
            default:
                return 'space-y-3';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${getSpacingClass()} ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/MobileCard.tsx",
        lineNumber: 232,
        columnNumber: 5
    }, this);
}
_c2 = MobileCardList;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "MobileCard");
__turbopack_context__.k.register(_c1, "MobileCardGrid");
__turbopack_context__.k.register(_c2, "MobileCardList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
// IVF Maintenance Utility - Mobile-Optimized Version
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ThemeProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeSwitcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ThemeSwitcher.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$z$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/z-index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$AccountDropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/AccountDropdown.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$MobileNavigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/MobileNavigation.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$MobileCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/MobileCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/useMobileOptimizations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
function Home() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const { data: session, status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const { isMobile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"])();
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        totalRequests: 0,
        pendingRequests: 0,
        inProgressRequests: 0,
        completedRequests: 0
    });
    // Add click outside handler for dropdowns
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const handleClickOutside = {
                "Home.useEffect.handleClickOutside": (event)=>{
                    // Close any open dropdowns when clicking outside
                    const target = event.target;
                    if (!target.closest("[data-dropdown]")) {
                    // This will be handled by individual dropdown components
                    // but we ensure the event can bubble up properly
                    }
                }
            }["Home.useEffect.handleClickOutside"];
            document.addEventListener("click", handleClickOutside);
            return ({
                "Home.useEffect": ()=>document.removeEventListener("click", handleClickOutside)
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const loadData = {
                "Home.useEffect.loadData": ()=>{
                    const realStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMaintenanceStats"])();
                    setStats(realStats);
                }
            }["Home.useEffect.loadData"];
            loadData();
            const interval = setInterval(loadData, 30000);
            return ({
                "Home.useEffect": ()=>clearInterval(interval)
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        session,
        status
    ]);
    // Check if user is already authenticated and redirect to appropriate dashboard
    // Only redirect if explicitly coming from login or if user wants to go to dashboard
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (status === "loading") return;
            console.log("Home page - Session status:", status);
            console.log("Home page - Session data:", session);
            console.log("Home page - User role:", session?.user?.role);
            // Remove automatic redirect - allow users to stay on homepage
            // Users can navigate to their dashboards using the UI buttons
            console.log("Allowing user to stay on homepage");
        }
    }["Home.useEffect"], [
        session,
        status,
        router
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$MobileNavigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileNavigationWrapper"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen mobile-scroll",
            style: {
                backgroundColor: themeConfig.colors.background,
                color: themeConfig.colors.text,
                transition: "background-color 0.8s ease-in-out, color 0.8s ease-in-out"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "mobile-safe-padding-top px-4 py-8 text-center relative",
                    style: {
                        background: !isMobile && themeConfig.backgroundImage ? `var(--background-image, url("${themeConfig.backgroundImage}"))` : `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                        backgroundSize: !isMobile && themeConfig.backgroundImage ? "cover" : "auto",
                        backgroundPosition: !isMobile && themeConfig.backgroundImage ? "center center" : "auto",
                        backgroundRepeat: !isMobile && themeConfig.backgroundImage ? "no-repeat" : "auto",
                        backgroundAttachment: !isMobile && themeConfig.backgroundImage ? "scroll" : "scroll",
                        transition: "background 1.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.8s ease-in-out, color 0.8s ease-in-out",
                        minHeight: !isMobile && themeConfig.backgroundImage ? "50vh" : "auto",
                        maxHeight: !isMobile && themeConfig.backgroundImage ? "50vh" : "none",
                        height: !isMobile && themeConfig.backgroundImage ? "50vh" : "auto"
                    },
                    children: [
                        !isMobile && themeConfig.backgroundImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0",
                            style: {
                                background: themeConfig.name === "light" ? "rgba(0, 0, 0, 0.15)" : themeConfig.name === "standard" ? "rgba(0, 0, 0, 0.1)" // Very subtle overlay for Nature theme
                                 : "rgba(0, 0, 0, 0.25)",
                                zIndex: 1,
                                transition: "background 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                                pointerEvents: "none"
                            }
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/page.tsx",
                            lineNumber: 108,
                            columnNumber: 13
                        }, this),
                        !isMobile && themeConfig.backgroundImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            id: "895360ad67fa4060",
                            children: "@media (width>=1024px){header.jsx-895360ad67fa4060{background-position:50%!important;background-repeat:no-repeat!important;background-size:cover!important;background-attachment:scroll!important;height:50vh!important;min-height:50vh!important;max-height:50vh!important;padding-top:20px!important;overflow:hidden!important}}@media (width>=1280px){header.jsx-895360ad67fa4060{background-position:50%!important;background-repeat:no-repeat!important;background-size:cover!important;background-attachment:scroll!important;height:50vh!important;min-height:50vh!important;max-height:50vh!important;padding-top:20px!important;overflow:hidden!important}}@media (width>=1536px){header.jsx-895360ad67fa4060{background-position:50%!important;background-repeat:no-repeat!important;background-size:cover!important;background-attachment:scroll!important;height:50vh!important;min-height:50vh!important;max-height:50vh!important;padding-top:20px!important;overflow:hidden!important}}"
                        }, void 0, false, void 0, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-6",
                            style: {
                                zIndex: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$z$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Z_INDEX"].MAX + 2,
                                position: "relative"
                            },
                            "data-dropdown": true,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$AccountDropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                        lineNumber: 174,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeSwitcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                        lineNumber: 177,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                    lineNumber: 176,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/app/page.tsx",
                            lineNumber: 168,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center",
                            style: {
                                zIndex: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$z$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Z_INDEX"].MAX,
                                position: "relative"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg",
                                    style: {
                                        background: `linear-gradient(135deg, ${themeConfig.colors.accent} 0%, ${themeConfig.colors.primary} 100%)`,
                                        boxShadow: `0 8px 32px ${themeConfig.colors.primary}25`
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-8 h-8 text-white",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                            lineNumber: 199,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                        lineNumber: 193,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                    lineNumber: 186,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl font-bold mb-2",
                                    style: {
                                        color: !isMobile && themeConfig.backgroundImage ? "#FFFFFF" : "#FFFFFF",
                                        textShadow: !isMobile && themeConfig.backgroundImage ? "0 2px 4px rgba(0, 0, 0, 0.5)" : "0 2px 4px rgba(0, 0, 0, 0.3)"
                                    },
                                    children: "IVF Maintenance Utility"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                    lineNumber: 207,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm opacity-90",
                                    style: {
                                        color: !isMobile && themeConfig.backgroundImage ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.9)"
                                    },
                                    children: "Streamlined Facility Management Solutions"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                    lineNumber: 222,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/app/page.tsx",
                            lineNumber: 182,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/app/page.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "px-4 py-6 mobile-scroll",
                    style: {
                        zIndex: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$z$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Z_INDEX"].BASE,
                        position: "relative"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${isMobile ? "max-w-4xl" : "max-w-6xl"} mx-auto`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: `${isMobile ? "text-lg" : "text-2xl"} font-semibold mb-4`,
                                        style: {
                                            color: themeConfig.colors.text
                                        },
                                        children: "Overview"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                        lineNumber: 244,
                                        columnNumber: 15
                                    }, this),
                                    !isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-xl",
                                                style: {
                                                    background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                                                    border: `1px solid ${themeConfig.colors.border}`,
                                                    boxShadow: `0 4px 12px ${themeConfig.colors.primary}10`
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-3xl font-bold mb-2",
                                                        style: {
                                                            color: themeConfig.colors.text
                                                        },
                                                        children: stats.totalRequests
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-medium",
                                                        style: {
                                                            color: themeConfig.colors.textSecondary
                                                        },
                                                        children: "Total Requests"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                                        lineNumber: 268,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/app/page.tsx",
                                                lineNumber: 254,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-xl",
                                                style: {
                                                    background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                                                    border: `1px solid ${themeConfig.colors.warning}30`,
                                                    boxShadow: `0 4px 12px ${themeConfig.colors.warning}10`
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-3xl font-bold mb-2",
                                                        style: {
                                                            color: themeConfig.colors.text
                                                        },
                                                        children: stats.pendingRequests
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-medium",
                                                        style: {
                                                            color: themeConfig.colors.textSecondary
                                                        },
                                                        children: "Pending"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                                        lineNumber: 290,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/app/page.tsx",
                                                lineNumber: 276,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-xl",
                                                style: {
                                                    background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                                                    border: `1px solid ${themeConfig.colors.border}`,
                                                    boxShadow: `0 4px 12px ${themeConfig.colors.primary}10`
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-3xl font-bold mb-2",
                                                        style: {
                                                            color: themeConfig.colors.text
                                                        },
                                                        children: stats.inProgressRequests
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                                        lineNumber: 306,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-medium",
                                                        style: {
                                                            color: themeConfig.colors.textSecondary
                                                        },
                                                        children: "In Progress"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                                        lineNumber: 312,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/app/page.tsx",
                                                lineNumber: 298,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-xl",
                                                style: {
                                                    background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                                                    border: `1px solid ${themeConfig.colors.success}30`,
                                                    boxShadow: `0 4px 12px ${themeConfig.colors.success}10`
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-3xl font-bold mb-2",
                                                        style: {
                                                            color: themeConfig.colors.text
                                                        },
                                                        children: stats.completedRequests
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                                        lineNumber: 328,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-medium",
                                                        style: {
                                                            color: themeConfig.colors.textSecondary
                                                        },
                                                        children: "Completed"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                                        lineNumber: 334,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/app/page.tsx",
                                                lineNumber: 320,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                        lineNumber: 253,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$MobileCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileCardGrid"], {
                                        columns: 2,
                                        className: "mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$MobileCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "compact",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-2xl font-bold mb-1",
                                                            style: {
                                                                color: themeConfig.colors.text
                                                            },
                                                            children: stats.totalRequests
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 346,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs font-medium",
                                                            style: {
                                                                color: themeConfig.colors.textSecondary
                                                            },
                                                            children: "Total Requests"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 352,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                    lineNumber: 345,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/page.tsx",
                                                lineNumber: 344,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$MobileCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "compact",
                                                status: "warning",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-2xl font-bold mb-1",
                                                            style: {
                                                                color: themeConfig.colors.text
                                                            },
                                                            children: stats.pendingRequests
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 363,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs font-medium",
                                                            style: {
                                                                color: themeConfig.colors.textSecondary
                                                            },
                                                            children: "Pending"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 369,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                    lineNumber: 362,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/page.tsx",
                                                lineNumber: 361,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$MobileCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "compact",
                                                status: "default",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-2xl font-bold mb-1",
                                                            style: {
                                                                color: themeConfig.colors.text
                                                            },
                                                            children: stats.inProgressRequests
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 380,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs font-medium",
                                                            style: {
                                                                color: themeConfig.colors.textSecondary
                                                            },
                                                            children: "In Progress"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 386,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                    lineNumber: 379,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/page.tsx",
                                                lineNumber: 378,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$MobileCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "compact",
                                                status: "success",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-2xl font-bold mb-1",
                                                            style: {
                                                                color: themeConfig.colors.text
                                                            },
                                                            children: stats.completedRequests
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 397,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs font-medium",
                                                            style: {
                                                                color: themeConfig.colors.textSecondary
                                                            },
                                                            children: "Completed"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 403,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                    lineNumber: 396,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/page.tsx",
                                                lineNumber: 395,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                        lineNumber: 343,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/app/page.tsx",
                                lineNumber: 243,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: `${isMobile ? "text-lg" : "text-2xl"} font-semibold mb-4`,
                                        style: {
                                            color: themeConfig.colors.text
                                        },
                                        children: "Quick Actions"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                        lineNumber: 417,
                                        columnNumber: 15
                                    }, this),
                                    !isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-8 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl mb-4",
                                        style: {
                                            background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                                            border: `1px solid ${themeConfig.colors.border}`,
                                            boxShadow: `0 6px 16px ${themeConfig.colors.primary}10`
                                        },
                                        onClick: ()=>{
                                            if (session?.user?.role === "ADMIN") {
                                                router.push("/admin/dashboard");
                                            } else if (session?.user?.role === "USER" || session?.user?.role === "STUDENT") {
                                                router.push("/student");
                                            } else {
                                                router.push("/login");
                                            }
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0",
                                                    style: {
                                                        background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                                                        boxShadow: `0 4px 12px ${themeConfig.colors.primary}20`
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-8 h-8 text-white",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M13 10V3L4 14h7v7l9-11h-7z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 460,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                                        lineNumber: 454,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                    lineNumber: 447,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-xl font-semibold mb-2",
                                                            style: {
                                                                color: themeConfig.colors.text
                                                            },
                                                            children: session ? session.user?.role === "ADMIN" ? "Admin Dashboard" : "Request Portal" : "Get Started"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 469,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-base",
                                                            style: {
                                                                color: themeConfig.colors.textSecondary
                                                            },
                                                            children: session ? "Manage maintenance requests and operations" : "Sign in to access the maintenance system"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 479,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                    lineNumber: 468,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-6 h-6 flex-shrink-0",
                                                    style: {
                                                        color: themeConfig.colors.primary
                                                    },
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M9 5l7 7-7 7"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                                        lineNumber: 495,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                    lineNumber: 488,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                            lineNumber: 446,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                        lineNumber: 426,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$MobileCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        onClick: ()=>{
                                            if (session?.user?.role === "ADMIN") {
                                                router.push("/admin/dashboard");
                                            } else if (session?.user?.role === "USER" || session?.user?.role === "STUDENT") {
                                                router.push("/student");
                                            } else {
                                                router.push("/login");
                                            }
                                        },
                                        className: "mb-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                                                    style: {
                                                        background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-6 h-6 text-white",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M13 10V3L4 14h7v7l9-11h-7z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 533,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                                        lineNumber: 527,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                    lineNumber: 521,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-semibold mb-1",
                                                            style: {
                                                                color: themeConfig.colors.text
                                                            },
                                                            children: session ? session.user?.role === "ADMIN" ? "Admin Dashboard" : "Request Portal" : "Get Started"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 542,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm",
                                                            style: {
                                                                color: themeConfig.colors.textSecondary
                                                            },
                                                            children: session ? "Manage maintenance requests and operations" : "Sign in to access the maintenance system"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 552,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                    lineNumber: 541,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-5 h-5 flex-shrink-0",
                                                    style: {
                                                        color: themeConfig.colors.primary
                                                    },
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M9 5l7 7-7 7"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                                        lineNumber: 568,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                    lineNumber: 561,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                            lineNumber: 520,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                        lineNumber: 505,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/app/page.tsx",
                                lineNumber: 416,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: `${isMobile ? "text-lg" : "text-2xl"} font-semibold mb-4`,
                                        style: {
                                            color: themeConfig.colors.text
                                        },
                                        children: "Services"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                        lineNumber: 582,
                                        columnNumber: 15
                                    }, this),
                                    !isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-6 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl",
                                                style: {
                                                    background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                                                    border: `1px solid ${themeConfig.colors.border}`,
                                                    boxShadow: `0 4px 12px ${themeConfig.colors.primary}10`
                                                },
                                                onClick: ()=>router.push("/student/history"),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center space-x-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
                                                            style: {
                                                                backgroundColor: `${themeConfig.colors.success}20`
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-6 h-6",
                                                                style: {
                                                                    color: themeConfig.colors.success
                                                                },
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 2,
                                                                        d: "M12 6v6l4 2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                                                        lineNumber: 615,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                        cx: "12",
                                                                        cy: "12",
                                                                        r: "8",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: 2,
                                                                        fill: "none"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                                                        lineNumber: 621,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/app/page.tsx",
                                                                lineNumber: 608,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 602,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-semibold text-base mb-1",
                                                                    style: {
                                                                        color: themeConfig.colors.text
                                                                    },
                                                                    children: "Request History"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                                    lineNumber: 632,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm",
                                                                    style: {
                                                                        color: themeConfig.colors.textSecondary
                                                                    },
                                                                    children: "View and track your maintenance requests"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                                    lineNumber: 638,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 631,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                    lineNumber: 601,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/page.tsx",
                                                lineNumber: 592,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-6 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl",
                                                style: {
                                                    background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                                                    border: `1px solid ${themeConfig.colors.border}`,
                                                    boxShadow: `0 4px 12px ${themeConfig.colors.primary}10`
                                                },
                                                onClick: ()=>router.push("/admin/reports"),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center space-x-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
                                                            style: {
                                                                backgroundColor: `${themeConfig.colors.warning}20`
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-6 h-6",
                                                                style: {
                                                                    color: themeConfig.colors.warning
                                                                },
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                                    lineNumber: 671,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/app/page.tsx",
                                                                lineNumber: 664,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 658,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-semibold text-base mb-1",
                                                                    style: {
                                                                        color: themeConfig.colors.text
                                                                    },
                                                                    children: "Reports & Analytics"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                                    lineNumber: 680,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm",
                                                                    style: {
                                                                        color: themeConfig.colors.textSecondary
                                                                    },
                                                                    children: "Comprehensive insights and reporting"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                                    lineNumber: 686,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 679,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                    lineNumber: 657,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/page.tsx",
                                                lineNumber: 648,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-6 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl",
                                                style: {
                                                    background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                                                    border: `1px solid ${themeConfig.colors.border}`,
                                                    boxShadow: `0 4px 12px ${themeConfig.colors.primary}10`
                                                },
                                                onClick: ()=>router.push("/settings"),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center space-x-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
                                                            style: {
                                                                backgroundColor: `${themeConfig.colors.accent}20`
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-6 h-6",
                                                                style: {
                                                                    color: themeConfig.colors.accent
                                                                },
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 2,
                                                                        d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                                                        lineNumber: 719,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 2,
                                                                        d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                                                        lineNumber: 725,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/app/page.tsx",
                                                                lineNumber: 712,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 706,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-semibold text-base mb-1",
                                                                    style: {
                                                                        color: themeConfig.colors.text
                                                                    },
                                                                    children: "Settings"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                                    lineNumber: 734,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm",
                                                                    style: {
                                                                        color: themeConfig.colors.textSecondary
                                                                    },
                                                                    children: "Manage your account and preferences"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                                    lineNumber: 740,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 733,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                    lineNumber: 705,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/page.tsx",
                                                lineNumber: 696,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                        lineNumber: 591,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$MobileCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileCardGrid"], {
                                        columns: 1,
                                        className: "gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$MobileCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                onClick: ()=>router.push("/student/history"),
                                                variant: "compact",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center space-x-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                                            style: {
                                                                backgroundColor: `${themeConfig.colors.success}20`
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-5 h-5",
                                                                style: {
                                                                    color: themeConfig.colors.success
                                                                },
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 2,
                                                                        d: "M12 6v6l4 2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                                                        lineNumber: 770,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                        cx: "12",
                                                                        cy: "12",
                                                                        r: "8",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: 2,
                                                                        fill: "none"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                                                        lineNumber: 776,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/app/page.tsx",
                                                                lineNumber: 763,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 757,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-sm",
                                                                    style: {
                                                                        color: themeConfig.colors.text
                                                                    },
                                                                    children: "Request History"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                                    lineNumber: 787,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs",
                                                                    style: {
                                                                        color: themeConfig.colors.textSecondary
                                                                    },
                                                                    children: "View and track your maintenance requests"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                                    lineNumber: 793,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 786,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                    lineNumber: 756,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/page.tsx",
                                                lineNumber: 752,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$MobileCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                onClick: ()=>router.push("/admin/reports"),
                                                variant: "compact",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center space-x-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                                            style: {
                                                                backgroundColor: `${themeConfig.colors.warning}20`
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-5 h-5",
                                                                style: {
                                                                    color: themeConfig.colors.warning
                                                                },
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                                    lineNumber: 821,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/app/page.tsx",
                                                                lineNumber: 814,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 808,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-sm",
                                                                    style: {
                                                                        color: themeConfig.colors.text
                                                                    },
                                                                    children: "Reports & Analytics"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                                    lineNumber: 830,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs",
                                                                    style: {
                                                                        color: themeConfig.colors.textSecondary
                                                                    },
                                                                    children: "Comprehensive insights and reporting"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                                    lineNumber: 836,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 829,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                    lineNumber: 807,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/page.tsx",
                                                lineNumber: 803,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$MobileCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                onClick: ()=>router.push("/settings"),
                                                variant: "compact",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center space-x-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                                            style: {
                                                                backgroundColor: `${themeConfig.colors.accent}20`
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-5 h-5",
                                                                style: {
                                                                    color: themeConfig.colors.accent
                                                                },
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 2,
                                                                        d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                                                        lineNumber: 864,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 2,
                                                                        d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                                                        lineNumber: 870,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/app/page.tsx",
                                                                lineNumber: 857,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 851,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-sm",
                                                                    style: {
                                                                        color: themeConfig.colors.text
                                                                    },
                                                                    children: "Settings"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                                    lineNumber: 879,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs",
                                                                    style: {
                                                                        color: themeConfig.colors.textSecondary
                                                                    },
                                                                    children: "Manage your account and preferences"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                                    lineNumber: 885,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/src/app/page.tsx",
                                                            lineNumber: 878,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/app/page.tsx",
                                                    lineNumber: 850,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/page.tsx",
                                                lineNumber: 846,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/app/page.tsx",
                                        lineNumber: 751,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/app/page.tsx",
                                lineNumber: 581,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/page.tsx",
                        lineNumber: 241,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/app/page.tsx",
                    lineNumber: 237,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                    className: "px-8 py-8 border-t",
                    style: {
                        borderColor: themeConfig.colors.border
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-6xl mx-auto text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm",
                            style: {
                                color: themeConfig.colors.textSecondary
                            },
                            children: "2026 IVF Maintenance. All rights reserved."
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/page.tsx",
                            lineNumber: 906,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/page.tsx",
                        lineNumber: 905,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/app/page.tsx",
                    lineNumber: 901,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/app/page.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/app/page.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_s(Home, "LiFo04H5QOwvTn6G9b7f0JuP2xU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_web_src_6c706c00._.js.map