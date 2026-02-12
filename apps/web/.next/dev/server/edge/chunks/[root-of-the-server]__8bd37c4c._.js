(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__8bd37c4c._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/apps/web/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/middleware.js [middleware-edge] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["withAuth"])(function middleware() {
// Add any additional middleware logic here
}, {
    callbacks: {
        authorized: ({ token, req })=>{
            // Allow access to login page and API routes
            if (req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/api") || req.nextUrl.pathname === "/") {
                return true;
            }
            // Protect admin routes
            if (req.nextUrl.pathname.startsWith("/admin")) {
                return token?.role === "ADMIN";
            }
            // Protect staff routes (admin and staff roles)
            if (req.nextUrl.pathname.startsWith("/staff")) {
                return token?.role === "ADMIN" || token?.role === "STAFF";
            }
            // Protect user routes
            if (req.nextUrl.pathname.startsWith("/student")) {
                return !!token;
            }
            // Protect dashboard (role-based redirect handled by component)
            if (req.nextUrl.pathname.startsWith("/dashboard")) {
                return !!token;
            }
            // Protect settings
            if (req.nextUrl.pathname.startsWith("/settings")) {
                return !!token;
            }
            // Protect emergency
            if (req.nextUrl.pathname.startsWith("/emergency")) {
                return !!token;
            }
            return true;
        }
    }
});
const config = {
    matcher: [
        "/admin/:path*",
        "/student/:path*",
        "/staff/:path*",
        "/settings/:path*",
        "/emergency/:path*",
        "/dashboard/:path*",
        "/api/admin/:path*",
        "/api/requests/:path*"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__8bd37c4c._.js.map