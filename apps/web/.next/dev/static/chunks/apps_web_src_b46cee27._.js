(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/apps/web/src/components/AuthGuard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthGuard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ThemeProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function AuthGuard({ children, requiredRole, redirectTo = "/login" }) {
    _s();
    const { data: session, status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const [hasTimedOut, setHasTimedOut] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [debugInfo, setDebugInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Add timeout to prevent infinite loading
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthGuard.useEffect": ()=>{
            const timer = setTimeout({
                "AuthGuard.useEffect.timer": ()=>{
                    if (status === "loading") {
                        setHasTimedOut(true);
                        setDebugInfo(`Status: ${status}, Session: ${!!session}, Required Role: ${requiredRole}`);
                    }
                }
            }["AuthGuard.useEffect.timer"], 5000); // 5 second timeout
            return ({
                "AuthGuard.useEffect": ()=>clearTimeout(timer)
            })["AuthGuard.useEffect"];
        }
    }["AuthGuard.useEffect"], [
        status,
        session,
        requiredRole
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthGuard.useEffect": ()=>{
            // Debug logging
            console.log("AuthGuard Debug:", {
                status,
                hasSession: !!session,
                userRole: session?.user?.role,
                requiredRole,
                redirectTo
            });
            if (status === "loading") return;
            if (!session) {
                console.log("No session found, redirecting to:", redirectTo);
                router.push(redirectTo);
                return;
            }
            if (requiredRole && session.user?.role !== requiredRole) {
                console.log("Role mismatch:", {
                    userRole: session.user?.role,
                    requiredRole
                });
                // If user is logged in but doesn't have required role
                if (requiredRole === "ADMIN" && session.user?.role !== "ADMIN") {
                    router.push("/student"); // Redirect non-admin users to user dashboard
                } else if (requiredRole === "USER" && session.user?.role === "ADMIN") {
                // Allow admins to access user pages but don't redirect them away
                // They can choose to go back to homepage if needed
                } else {
                    router.push("/login"); // Redirect to login for other cases
                }
                return;
            }
        }
    }["AuthGuard.useEffect"], [
        session,
        status,
        router,
        requiredRole,
        redirectTo
    ]);
    if (status === "loading") {
        // Show timeout state if authentication takes too long
        if (hasTimedOut) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen flex items-center justify-center",
                style: {
                    backgroundColor: themeConfig.colors.background
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center max-w-md mx-auto p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-full h-12 w-12 mx-auto mb-4 flex items-center justify-center",
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
                                    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/AuthGuard.tsx",
                                    lineNumber: 96,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/AuthGuard.tsx",
                                lineNumber: 89,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/AuthGuard.tsx",
                            lineNumber: 85,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                color: themeConfig.colors.text,
                                fontFamily: "Inter, system-ui, sans-serif",
                                marginBottom: "16px"
                            },
                            children: "Authentication is taking longer than expected"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/AuthGuard.tsx",
                            lineNumber: 104,
                            columnNumber: 13
                        }, this),
                        debugInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                color: themeConfig.colors.textSecondary,
                                fontFamily: "monospace",
                                fontSize: "12px",
                                marginBottom: "16px"
                            },
                            children: debugInfo
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/AuthGuard.tsx",
                            lineNumber: 114,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>window.location.reload(),
                                    style: {
                                        backgroundColor: themeConfig.colors.primary,
                                        color: "white",
                                        padding: "8px 16px",
                                        borderRadius: "6px",
                                        fontSize: "14px",
                                        cursor: "pointer",
                                        marginRight: "8px"
                                    },
                                    children: "Refresh Page"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/AuthGuard.tsx",
                                    lineNumber: 126,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>router.push("/login"),
                                    style: {
                                        backgroundColor: themeConfig.colors.textSecondary,
                                        color: "white",
                                        padding: "8px 16px",
                                        borderRadius: "6px",
                                        fontSize: "14px",
                                        cursor: "pointer"
                                    },
                                    children: "Go to Login"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/AuthGuard.tsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/AuthGuard.tsx",
                            lineNumber: 125,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/AuthGuard.tsx",
                    lineNumber: 84,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/AuthGuard.tsx",
                lineNumber: 80,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            style: {
                backgroundColor: themeConfig.colors.background
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4",
                        style: {
                            borderColor: themeConfig.colors.primary
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/AuthGuard.tsx",
                        lineNumber: 165,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: themeConfig.colors.text,
                            fontFamily: "Inter, system-ui, sans-serif"
                        },
                        children: "Verifying access..."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/AuthGuard.tsx",
                        lineNumber: 169,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: themeConfig.colors.textSecondary,
                            fontFamily: "Inter, system-ui, sans-serif",
                            fontSize: "12px",
                            marginTop: "8px"
                        },
                        children: [
                            "Status: ",
                            status
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/AuthGuard.tsx",
                        lineNumber: 177,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/AuthGuard.tsx",
                lineNumber: 164,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/AuthGuard.tsx",
            lineNumber: 160,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(AuthGuard, "a10m2p15cFRZ2vZawnSMNIW5Lf4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = AuthGuard;
var _c;
__turbopack_context__.k.register(_c, "AuthGuard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/WebHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WebHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ThemeProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/useMobileOptimizations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function WebHeader({ title, breadcrumbs = [], showMenuToggle = true, actions }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const { isMobile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"])();
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Generate breadcrumbs from pathname if not provided
    const generateBreadcrumbs = ()=>{
        if (breadcrumbs.length > 0) return breadcrumbs;
        const pathSegments = pathname.split("/").filter(Boolean);
        const crumbs = [
            {
                label: "Home",
                href: "/"
            }
        ];
        let currentPath = "";
        pathSegments.forEach((segment, index)=>{
            currentPath += `/${segment}`;
            const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
            if (index === pathSegments.length - 1) {
                crumbs.push({
                    label
                });
            } else {
                crumbs.push({
                    label,
                    href: currentPath
                });
            }
        });
        return crumbs;
    };
    const currentBreadcrumbs = generateBreadcrumbs();
    const menuItems = [
        {
            href: "/",
            label: "Home",
            icon: "🏠"
        },
        {
            href: "/dashboard",
            label: "Dashboard",
            icon: "📊"
        },
        {
            href: "/student",
            label: "Requests",
            icon: "📝"
        },
        {
            href: "/student/history",
            label: "History",
            icon: "📚"
        },
        {
            href: "/settings",
            label: "Settings",
            icon: "⚙️"
        }
    ];
    const handleMenuToggle = ()=>{
        setIsMenuOpen(!isMenuOpen);
    };
    const handleBreadcrumbClick = (href)=>{
        if (href) {
            router.push(href);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-40 border-b",
                style: {
                    backgroundColor: themeConfig.colors.background,
                    borderColor: themeConfig.colors.border
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${isMobile ? "px-4" : "px-6"} py-3`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-3 flex-1 min-w-0",
                                children: [
                                    showMenuToggle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleMenuToggle,
                                        className: "p-2 rounded-lg border transition-all duration-200 hover:bg-gray-50 active:scale-95",
                                        style: {
                                            borderColor: themeConfig.colors.border,
                                            backgroundColor: "transparent"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-5 h-5",
                                            style: {
                                                color: themeConfig.colors.text
                                            },
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M4 6h16M4 12h16M4 18h16"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                                lineNumber: 106,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                            lineNumber: 99,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                        lineNumber: 91,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-lg font-semibold truncate",
                                                style: {
                                                    color: themeConfig.colors.text,
                                                    fontFamily: "Inter, system-ui, sans-serif"
                                                },
                                                children: title
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                                lineNumber: 119,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                                className: "flex items-center space-x-1 text-sm mt-1",
                                                children: currentBreadcrumbs.map((crumb, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                                        children: [
                                                            index > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-4 h-4 flex-shrink-0",
                                                                style: {
                                                                    color: themeConfig.colors.textSecondary
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
                                                                    fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                                                    lineNumber: 142,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                                                lineNumber: 135,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleBreadcrumbClick(crumb.href),
                                                                className: `truncate ${crumb.href ? "hover:text-blue-600 transition-colors" : "text-gray-500 font-medium"}`,
                                                                style: {
                                                                    color: crumb.href ? themeConfig.colors.textSecondary : themeConfig.colors.textSecondary,
                                                                    fontFamily: "Inter, system-ui, sans-serif"
                                                                },
                                                                children: crumb.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                                                lineNumber: 150,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, index, true, {
                                                        fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                                lineNumber: 131,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this),
                            actions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2 ml-4",
                                children: actions
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                lineNumber: 174,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            isMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-30 bg-black bg-opacity-50",
                        onClick: ()=>setIsMenuOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                        lineNumber: 184,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed top-0 left-0 bottom-0 z-40 w-72 overflow-y-auto",
                        style: {
                            backgroundColor: themeConfig.colors.background,
                            borderRight: `1px solid ${themeConfig.colors.border}`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border-b",
                                style: {
                                    borderColor: themeConfig.colors.border
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-semibold",
                                            style: {
                                                color: themeConfig.colors.text,
                                                fontFamily: "Inter, system-ui, sans-serif"
                                            },
                                            children: "Navigation"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                            lineNumber: 203,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setIsMenuOpen(false),
                                            className: "p-2 rounded-lg hover:bg-gray-50 transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-5 h-5",
                                                style: {
                                                    color: themeConfig.colors.text
                                                },
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M6 18L18 6M6 6l12 12"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                                    lineNumber: 223,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                                lineNumber: 216,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                            lineNumber: 212,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                    lineNumber: 202,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                lineNumber: 198,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "p-2",
                                children: menuItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            router.push(item.href);
                                            setIsMenuOpen(false);
                                        },
                                        className: `w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${pathname === item.href ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`,
                                        style: {
                                            color: pathname === item.href ? themeConfig.colors.primary : themeConfig.colors.text
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg",
                                                children: item.icon
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                                lineNumber: 255,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                style: {
                                                    fontFamily: "Inter, system-ui, sans-serif"
                                                },
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                                lineNumber: 256,
                                                columnNumber: 19
                                            }, this),
                                            pathname === item.href && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4 ml-auto",
                                                fill: "currentColor",
                                                viewBox: "0 0 20 20",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    fillRule: "evenodd",
                                                    d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                                    clipRule: "evenodd"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                                    lineNumber: 268,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                                lineNumber: 263,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, item.href, true, {
                                        fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                        lineNumber: 237,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                                lineNumber: 235,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/WebHeader.tsx",
                        lineNumber: 190,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true);
}
_s(WebHeader, "U8VOR6pzUqXKDPbJvQ4FQ9FyXAI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"]
    ];
});
_c = WebHeader;
var _c;
__turbopack_context__.k.register(_c, "WebHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/WebListGroup.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebListGroup",
    ()=>WebListGroup,
    "WebListGroupItem",
    ()=>WebListGroupItem,
    "WebStatsList",
    ()=>WebStatsList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ThemeProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/useMobileOptimizations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
function WebListGroup({ children, title, subtitle, className = "", divided = true, compact = false }) {
    _s();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const { isMobile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-white rounded-lg border ${className}`,
        style: {
            borderColor: themeConfig.colors.border
        },
        children: [
            (title || subtitle) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `px-4 ${compact ? "py-3" : "py-4"} border-b`,
                style: {
                    borderColor: themeConfig.colors.border
                },
                children: [
                    title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: `font-semibold ${compact ? "text-sm" : "text-base"}`,
                        style: {
                            color: themeConfig.colors.text,
                            fontFamily: "Inter, system-ui, sans-serif"
                        },
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
                        lineNumber: 52,
                        columnNumber: 13
                    }, this),
                    subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `mt-1 ${compact ? "text-xs" : "text-sm"}`,
                        style: {
                            color: themeConfig.colors.textSecondary,
                            fontFamily: "Inter, system-ui, sans-serif"
                        },
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
                        lineNumber: 63,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
                lineNumber: 47,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: divided ? "divide-y" : "",
                style: {
                    borderColor: themeConfig.colors.border
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(WebListGroup, "YeWNVV84zNWb4f0+Vd0hSIpxtAI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"]
    ];
});
_c = WebListGroup;
function WebListGroupItem({ children, title, subtitle, leftIcon, rightElement, onClick, className = "", disabled = false, badge, status = "default" }) {
    _s1();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const { isMobile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"])();
    const getStatusColor = ()=>{
        switch(status){
            case "success":
                return themeConfig.colors.success;
            case "warning":
                return themeConfig.colors.warning;
            case "error":
                return themeConfig.colors.error;
            default:
                return themeConfig.colors.primary;
        }
    };
    const Item = onClick ? "button" : "div";
    const itemProps = onClick ? {
        onClick
    } : {};
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Item, {
        ...itemProps,
        className: `
        w-full px-4 py-3 flex items-center justify-between
        ${onClick && !disabled ? "hover:bg-gray-50 transition-colors active:bg-gray-100" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : onClick ? "cursor-pointer" : ""}
        ${className}
      `,
        style: {
            fontFamily: "Inter, system-ui, sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center space-x-3 flex-1 min-w-0",
                children: [
                    leftIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center",
                        style: {
                            backgroundColor: `${getStatusColor()}10`,
                            color: getStatusColor()
                        },
                        children: leftIcon
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-medium text-sm truncate",
                                style: {
                                    color: themeConfig.colors.text,
                                    fontFamily: "Inter, system-ui, sans-serif"
                                },
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this),
                            subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs truncate mt-0.5",
                                style: {
                                    color: themeConfig.colors.textSecondary,
                                    fontFamily: "Inter, system-ui, sans-serif"
                                },
                                children: subtitle
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
                                lineNumber: 156,
                                columnNumber: 13
                            }, this),
                            children && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs mt-1",
                                children: children
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
                                lineNumber: 166,
                                columnNumber: 24
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center space-x-2 flex-shrink-0 ml-3",
                children: [
                    badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                        style: {
                            backgroundColor: `${getStatusColor()}10`,
                            color: getStatusColor()
                        },
                        children: badge
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
                        lineNumber: 173,
                        columnNumber: 11
                    }, this),
                    rightElement && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0",
                        children: rightElement
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
                        lineNumber: 183,
                        columnNumber: 26
                    }, this),
                    onClick && !rightElement && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-4 h-4 flex-shrink-0",
                        style: {
                            color: themeConfig.colors.textSecondary
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
                            fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
                            lineNumber: 192,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
                        lineNumber: 185,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this);
}
_s1(WebListGroupItem, "YeWNVV84zNWb4f0+Vd0hSIpxtAI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"]
    ];
});
_c1 = WebListGroupItem;
function WebStatsList({ stats, columns = 4, compact = false }) {
    _s2();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const { isMobile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"])();
    const getColumnsClass = ()=>{
        if (isMobile) return "grid-cols-2";
        switch(columns){
            case 2:
                return "grid-cols-2";
            case 3:
                return "grid-cols-3";
            case 4:
                return "grid-cols-4";
            case 5:
                return "grid-cols-5";
            default:
                return "grid-cols-2";
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `rounded-lg border ${compact ? "p-3" : "p-4"}`,
        style: {
            borderColor: themeConfig.colors.border,
            backgroundColor: themeConfig.colors.surface
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `grid ${getColumnsClass()} gap-4`,
            children: stats.map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${compact ? "text-lg" : "text-2xl"} font-semibold`,
                            style: {
                                color: themeConfig.colors.text,
                                fontFamily: "Inter, system-ui, sans-serif"
                            },
                            children: stat.value
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
                            lineNumber: 254,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${compact ? "text-xs" : "text-sm"} mt-1`,
                            style: {
                                color: themeConfig.colors.textSecondary,
                                fontFamily: "Inter, system-ui, sans-serif"
                            },
                            children: stat.label
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
                            lineNumber: 263,
                            columnNumber: 13
                        }, this),
                        stat.change && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `text-xs mt-1 font-medium`,
                            style: {
                                color: stat.change.type === "increase" ? themeConfig.colors.success : stat.change.type === "decrease" ? themeConfig.colors.error : themeConfig.colors.textSecondary
                            },
                            children: stat.change.value
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
                            lineNumber: 273,
                            columnNumber: 15
                        }, this)
                    ]
                }, index, true, {
                    fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
                    lineNumber: 253,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
            lineNumber: 251,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/WebListGroup.tsx",
        lineNumber: 244,
        columnNumber: 5
    }, this);
}
_s2(WebStatsList, "YeWNVV84zNWb4f0+Vd0hSIpxtAI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"]
    ];
});
_c2 = WebStatsList;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "WebListGroup");
__turbopack_context__.k.register(_c1, "WebListGroupItem");
__turbopack_context__.k.register(_c2, "WebStatsList");
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
"[project]/apps/web/src/app/admin/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ThemeProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/useMobileOptimizations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$AuthGuard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/AuthGuard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/WebHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebListGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/WebListGroup.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeSwitcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ThemeSwitcher.tsx [app-client] (ecmascript)");
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
// Constants
const Z_INDEX = {
    MAX: 9999,
    DROPDOWN: 1000,
    MODAL: 2000,
    TOOLTIP: 3000
};
// Mock data for demonstration
const mockStats = {
    totalRequests: 156,
    pendingRequests: 23,
    completedRequests: 133,
    completionRate: 85.3
};
const mockRecentRequests = [
    {
        id: 1,
        title: "HVAC System Maintenance",
        category: "HVAC",
        priority: "High",
        status: "Pending",
        submittedBy: "John Doe",
        submittedDate: "2024-01-15"
    },
    {
        id: 2,
        title: "Electrical Panel Inspection",
        category: "Electrical",
        priority: "Medium",
        status: "In Progress",
        submittedBy: "Jane Smith",
        submittedDate: "2024-01-14"
    },
    {
        id: 3,
        title: "Plumbing Leak Repair",
        category: "Plumbing",
        priority: "High",
        status: "Completed",
        submittedBy: "Bob Johnson",
        submittedDate: "2024-01-13"
    }
];
const mockRequests = [
    ...mockRecentRequests,
    {
        id: 4,
        title: "Lighting Fixture Replacement",
        category: "Electrical",
        priority: "Low",
        status: "Pending",
        submittedBy: "Alice Brown",
        submittedDate: "2024-01-12"
    },
    {
        id: 5,
        title: "Fire Extinguisher Inspection",
        category: "Safety",
        priority: "High",
        status: "Completed",
        submittedBy: "Charlie Wilson",
        submittedDate: "2024-01-11"
    }
];
function AdminDashboard() {
    _s();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const { isMobile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("overview");
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [stats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(mockStats);
    const [recentRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(mockRecentRequests);
    const [requests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(mockRequests);
    const [filteredRequests, setFilteredRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(requests);
    // Filter requests based on search query
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            const filtered = requests.filter({
                "AdminDashboard.useEffect.filtered": (request)=>request.title.toLowerCase().includes(searchQuery.toLowerCase()) || request.category.toLowerCase().includes(searchQuery.toLowerCase()) || request.submittedBy.toLowerCase().includes(searchQuery.toLowerCase())
            }["AdminDashboard.useEffect.filtered"]);
            setFilteredRequests(filtered);
        }
    }["AdminDashboard.useEffect"], [
        searchQuery,
        requests
    ]);
    const handleStatusUpdate = (requestId, newStatus)=>{
        console.log(`Updating request ${requestId} to status: ${newStatus}`);
    };
    const handleDeleteRequest = (requestId)=>{
        console.log(`Deleting request: ${requestId}`);
    };
    const viewRequestDetails = (request)=>{
        console.log("Viewing request details:", request);
    };
    const completionRate = stats.completionRate;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$AuthGuard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        requiredRole: "ADMIN",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen",
            style: {
                backgroundColor: themeConfig.colors.background
            },
            children: [
                isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    title: "Admin Dashboard",
                    breadcrumbs: [
                        {
                            label: "Home",
                            href: "/"
                        },
                        {
                            label: "Admin Dashboard"
                        }
                    ],
                    actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    zIndex: Z_INDEX.MAX,
                                    position: "relative"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeSwitcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                    lineNumber: 135,
                                    columnNumber: 19
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                lineNumber: 134,
                                columnNumber: 17
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push("/"),
                                className: "px-4 py-2 text-sm font-medium rounded-lg border transition-colors hover:bg-gray-50 active:scale-95",
                                style: {
                                    borderColor: themeConfig.colors.border,
                                    color: themeConfig.colors.text,
                                    fontFamily: "Inter, system-ui, sans-serif"
                                },
                                children: "Back to Home"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                lineNumber: 137,
                                columnNumber: 17
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                        lineNumber: 133,
                        columnNumber: 15
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                    lineNumber: 126,
                    columnNumber: 11
                }, this) : /* Original Desktop Header */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "px-8 py-6 border-b",
                    style: {
                        borderColor: themeConfig.colors.border
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-7xl mx-auto flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-3xl font-bold",
                                        style: {
                                            color: themeConfig.colors.text
                                        },
                                        children: "Admin Dashboard"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2",
                                        style: {
                                            color: themeConfig.colors.textSecondary
                                        },
                                        children: "Manage maintenance requests and monitor system performance"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 165,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                lineNumber: 158,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            zIndex: Z_INDEX.MAX,
                                            position: "relative"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeSwitcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                            lineNumber: 174,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 173,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>router.push("/"),
                                        className: "px-4 py-2 text-sm font-medium rounded-lg border transition-colors hover:bg-gray-50 active:scale-95",
                                        style: {
                                            borderColor: themeConfig.colors.border,
                                            color: themeConfig.colors.text
                                        },
                                        children: "Back to Home"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 176,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                lineNumber: 172,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                        lineNumber: 157,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                    lineNumber: 153,
                    columnNumber: 11
                }, this),
                isMobile ? /* Mobile Navigation */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 py-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex space-x-2 overflow-x-auto",
                        children: [
                            {
                                id: "overview",
                                label: "Overview",
                                icon: "📊"
                            },
                            {
                                id: "requests",
                                label: "Requests",
                                icon: "📋"
                            },
                            {
                                id: "analytics",
                                label: "Analytics",
                                icon: "📈"
                            }
                        ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab(tab.id),
                                className: `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${activeTab === tab.id ? "scale-105" : "hover:scale-102"}`,
                                style: {
                                    backgroundColor: activeTab === tab.id ? themeConfig.colors.primary : "transparent",
                                    color: activeTab === tab.id ? "white" : themeConfig.colors.textSecondary,
                                    border: `1px solid ${themeConfig.colors.border}`
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: tab.icon
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 219,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: tab.label
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 220,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, tab.id, true, {
                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                lineNumber: 201,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                        lineNumber: 195,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                    lineNumber: 194,
                    columnNumber: 11
                }, this) : /* Desktop Navigation */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-8 py-6 border-b",
                    style: {
                        borderColor: themeConfig.colors.border
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-7xl mx-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex space-x-1",
                            children: [
                                {
                                    id: "overview",
                                    label: "Overview",
                                    icon: "📊"
                                },
                                {
                                    id: "requests",
                                    label: "Requests",
                                    icon: "📋"
                                },
                                {
                                    id: "analytics",
                                    label: "Analytics",
                                    icon: "📈"
                                }
                            ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab(tab.id),
                                    className: `flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab.id ? "scale-105" : "hover:scale-102"}`,
                                    style: {
                                        backgroundColor: activeTab === tab.id ? themeConfig.colors.primary : themeConfig.colors.surface,
                                        color: activeTab === tab.id ? "white" : themeConfig.colors.text,
                                        border: `1px solid ${themeConfig.colors.border}`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: tab.icon
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                            lineNumber: 256,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: tab.label
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                            lineNumber: 257,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, tab.id, true, {
                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                    lineNumber: 238,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                            lineNumber: 232,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                        lineNumber: 231,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                    lineNumber: 227,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${isMobile ? "max-w-4xl" : "max-w-7xl"} mx-auto ${isMobile ? "px-4 py-4" : "px-8 py-8"}`,
                    children: [
                        activeTab === "overview" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-8",
                            children: [
                                isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebListGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebStatsList"], {
                                    stats: [
                                        {
                                            label: "Total Requests",
                                            value: stats.totalRequests
                                        },
                                        {
                                            label: "Pending",
                                            value: stats.pendingRequests
                                        },
                                        {
                                            label: "Completed",
                                            value: stats.completedRequests
                                        },
                                        {
                                            label: "Completion Rate",
                                            value: `${completionRate}%`
                                        }
                                    ],
                                    columns: 2,
                                    compact: true
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                    lineNumber: 273,
                                    columnNumber: 17
                                }, this) : /* Desktop Stats Cards */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-200",
                                            style: {
                                                borderColor: themeConfig.colors.border,
                                                backgroundColor: themeConfig.colors.surface
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-3xl font-bold mb-3",
                                                    style: {
                                                        color: themeConfig.colors.text
                                                    },
                                                    children: stats.totalRequests
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-medium",
                                                    style: {
                                                        color: themeConfig.colors.textSecondary
                                                    },
                                                    children: "Total Requests"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                    lineNumber: 299,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                            lineNumber: 286,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-200",
                                            style: {
                                                borderColor: themeConfig.colors.border,
                                                backgroundColor: themeConfig.colors.surface
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-3xl font-bold mb-3",
                                                    style: {
                                                        color: themeConfig.colors.text
                                                    },
                                                    children: stats.pendingRequests
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                    lineNumber: 313,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-medium",
                                                    style: {
                                                        color: themeConfig.colors.textSecondary
                                                    },
                                                    children: "Pending"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                    lineNumber: 319,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                            lineNumber: 306,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-200",
                                            style: {
                                                borderColor: themeConfig.colors.border,
                                                backgroundColor: themeConfig.colors.surface
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-3xl font-bold mb-3",
                                                    style: {
                                                        color: themeConfig.colors.text
                                                    },
                                                    children: stats.completedRequests
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                    lineNumber: 333,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-medium",
                                                    style: {
                                                        color: themeConfig.colors.textSecondary
                                                    },
                                                    children: "Completed"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                    lineNumber: 339,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                            lineNumber: 326,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-200",
                                            style: {
                                                borderColor: themeConfig.colors.border,
                                                backgroundColor: themeConfig.colors.surface
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-3xl font-bold mb-3",
                                                    style: {
                                                        color: themeConfig.colors.text
                                                    },
                                                    children: [
                                                        completionRate,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                    lineNumber: 353,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-medium",
                                                    style: {
                                                        color: themeConfig.colors.textSecondary
                                                    },
                                                    children: "Completion Rate"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                    lineNumber: 359,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                            lineNumber: 346,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                    lineNumber: 285,
                                    columnNumber: 17
                                }, this),
                                isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebListGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebListGroup"], {
                                    title: "Quick Actions",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebListGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebListGroupItem"], {
                                            title: "Generate Summary",
                                            subtitle: "Create maintenance summary report",
                                            leftIcon: "📄",
                                            onClick: ()=>router.push("/admin/summary-request")
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                            lineNumber: 372,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebListGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebListGroupItem"], {
                                            title: "Physical Plant Request",
                                            subtitle: "Submit new maintenance request",
                                            leftIcon: "🔧",
                                            onClick: ()=>router.push("/admin/physical-plant-request")
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                            lineNumber: 378,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebListGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebListGroupItem"], {
                                            title: "User Management",
                                            subtitle: "Manage system users",
                                            leftIcon: "👥",
                                            onClick: ()=>router.push("/admin/users")
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                            lineNumber: 384,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebListGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebListGroupItem"], {
                                            title: "View Reports",
                                            subtitle: "Access detailed reports",
                                            leftIcon: "📊",
                                            onClick: ()=>router.push("/admin/reports")
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                            lineNumber: 390,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                    lineNumber: 371,
                                    columnNumber: 17
                                }, this) : /* Desktop Quick Actions */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-semibold mb-6",
                                            style: {
                                                color: themeConfig.colors.text
                                            },
                                            children: "Quick Actions"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                            lineNumber: 400,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>router.push("/admin/summary-request"),
                                                    className: "p-6 rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95",
                                                    style: {
                                                        borderColor: themeConfig.colors.border,
                                                        backgroundColor: themeConfig.colors.surface
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-3xl mb-3",
                                                            children: "📄"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 415,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-semibold mb-2",
                                                            style: {
                                                                color: themeConfig.colors.text
                                                            },
                                                            children: "Generate Summary"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 416,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm",
                                                            style: {
                                                                color: themeConfig.colors.textSecondary
                                                            },
                                                            children: "Create maintenance summary report"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 422,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                    lineNumber: 407,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>router.push("/admin/physical-plant-request"),
                                                    className: "p-6 rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95",
                                                    style: {
                                                        borderColor: themeConfig.colors.border,
                                                        backgroundColor: themeConfig.colors.surface
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-3xl mb-3",
                                                            children: "🔧"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 439,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-semibold mb-2",
                                                            style: {
                                                                color: themeConfig.colors.text
                                                            },
                                                            children: "Physical Plant Request"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 440,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm",
                                                            style: {
                                                                color: themeConfig.colors.textSecondary
                                                            },
                                                            children: "Submit new maintenance request"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 446,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                    lineNumber: 429,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>router.push("/admin/users"),
                                                    className: "p-6 rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95",
                                                    style: {
                                                        borderColor: themeConfig.colors.border,
                                                        backgroundColor: themeConfig.colors.surface
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-3xl mb-3",
                                                            children: "👥"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 461,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-semibold mb-2",
                                                            style: {
                                                                color: themeConfig.colors.text
                                                            },
                                                            children: "User Management"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 462,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm",
                                                            style: {
                                                                color: themeConfig.colors.textSecondary
                                                            },
                                                            children: "Manage system users"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 468,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                    lineNumber: 453,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>router.push("/admin/reports"),
                                                    className: "p-6 rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95",
                                                    style: {
                                                        borderColor: themeConfig.colors.border,
                                                        backgroundColor: themeConfig.colors.surface
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-3xl mb-3",
                                                            children: "📊"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 483,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-semibold mb-2",
                                                            style: {
                                                                color: themeConfig.colors.text
                                                            },
                                                            children: "View Reports"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 484,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm",
                                                            style: {
                                                                color: themeConfig.colors.textSecondary
                                                            },
                                                            children: "Access detailed reports"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 490,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                    lineNumber: 475,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                            lineNumber: 406,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                    lineNumber: 399,
                                    columnNumber: 17
                                }, this),
                                isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebListGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebListGroup"], {
                                    title: "Recent Requests",
                                    children: recentRequests.slice(0, 5).map((request)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebListGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebListGroupItem"], {
                                            title: request.title,
                                            subtitle: `${request.category} • ${request.priority} • ${request.status}`,
                                            leftIcon: "📋",
                                            onClick: ()=>viewRequestDetails(request),
                                            badge: request.status
                                        }, request.id, false, {
                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                            lineNumber: 505,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                    lineNumber: 503,
                                    columnNumber: 17
                                }, this) : /* Desktop Recent Requests Table */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-semibold mb-4",
                                            style: {
                                                color: themeConfig.colors.text
                                            },
                                            children: "Recent Requests"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                            lineNumber: 518,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-lg border overflow-hidden",
                                            style: {
                                                borderColor: themeConfig.colors.border
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                className: "w-full",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                        style: {
                                                            backgroundColor: themeConfig.colors.surface
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
                                                                    style: {
                                                                        color: themeConfig.colors.textSecondary
                                                                    },
                                                                    children: "Request"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                    lineNumber: 533,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
                                                                    style: {
                                                                        color: themeConfig.colors.textSecondary
                                                                    },
                                                                    children: "Category"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                    lineNumber: 539,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
                                                                    style: {
                                                                        color: themeConfig.colors.textSecondary
                                                                    },
                                                                    children: "Priority"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                    lineNumber: 545,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
                                                                    style: {
                                                                        color: themeConfig.colors.textSecondary
                                                                    },
                                                                    children: "Status"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                    lineNumber: 551,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
                                                                    style: {
                                                                        color: themeConfig.colors.textSecondary
                                                                    },
                                                                    children: "Submitted By"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                    lineNumber: 557,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
                                                                    style: {
                                                                        color: themeConfig.colors.textSecondary
                                                                    },
                                                                    children: "Actions"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                    lineNumber: 563,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 532,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 529,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                        children: recentRequests.slice(0, 5).map((request)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                className: "border-t",
                                                                style: {
                                                                    borderColor: themeConfig.colors.border
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-6 py-4",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "font-medium",
                                                                            style: {
                                                                                color: themeConfig.colors.text
                                                                            },
                                                                            children: request.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                            lineNumber: 579,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                        lineNumber: 578,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-6 py-4",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                color: themeConfig.colors.textSecondary
                                                                            },
                                                                            children: request.category
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                            lineNumber: 587,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                        lineNumber: 586,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-6 py-4",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: `px-2 py-1 text-xs font-medium rounded-full ${request.priority === "High" ? "text-white" : request.priority === "Medium" ? "text-white" : "text-white"}`,
                                                                            style: {
                                                                                backgroundColor: request.priority === "High" ? themeConfig.colors.error : request.priority === "Medium" ? themeConfig.colors.warning : themeConfig.colors.primary
                                                                            },
                                                                            children: request.priority
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                            lineNumber: 596,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                        lineNumber: 595,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-6 py-4",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "px-2 py-1 text-xs font-medium rounded-full text-white",
                                                                            style: {
                                                                                backgroundColor: request.status === "Completed" ? themeConfig.colors.success : request.status === "In Progress" ? themeConfig.colors.primary : themeConfig.colors.warning
                                                                            },
                                                                            children: request.status
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                            lineNumber: 617,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                        lineNumber: 616,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-6 py-4",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                color: themeConfig.colors.textSecondary
                                                                            },
                                                                            children: request.submittedBy
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                            lineNumber: 632,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                        lineNumber: 631,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-6 py-4",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>viewRequestDetails(request),
                                                                            className: "text-blue-600 hover:text-blue-800 text-sm font-medium",
                                                                            children: "View"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                            lineNumber: 641,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                        lineNumber: 640,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, request.id, true, {
                                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                lineNumber: 573,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 571,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 528,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                            lineNumber: 524,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                    lineNumber: 517,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                            lineNumber: 270,
                            columnNumber: 13
                        }, this),
                        activeTab === "requests" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: [
                                isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border p-3",
                                    style: {
                                        backgroundColor: themeConfig.colors.surface,
                                        borderColor: themeConfig.colors.border
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Search requests...",
                                        value: searchQuery,
                                        onChange: (e)=>setSearchQuery(e.target.value),
                                        className: "w-full px-3 py-2 border rounded-lg text-sm",
                                        style: {
                                            borderColor: themeConfig.colors.border,
                                            backgroundColor: themeConfig.colors.background,
                                            color: themeConfig.colors.text,
                                            fontFamily: "Inter, system-ui, sans-serif"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 669,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                    lineNumber: 662,
                                    columnNumber: 17
                                }, this) : /* Desktop Search Bar */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 max-w-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "Search requests...",
                                            value: searchQuery,
                                            onChange: (e)=>setSearchQuery(e.target.value),
                                            className: "w-full px-4 py-2 border rounded-lg",
                                            style: {
                                                borderColor: themeConfig.colors.border,
                                                fontFamily: "Inter, system-ui, sans-serif"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                            lineNumber: 687,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 686,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                    lineNumber: 685,
                                    columnNumber: 17
                                }, this),
                                isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebListGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebListGroup"], {
                                    title: "All Requests",
                                    children: filteredRequests.slice(0, 10).map((request)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebListGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebListGroupItem"], {
                                            title: request.title,
                                            subtitle: `${request.category} • ${request.priority} • ${request.status}`,
                                            leftIcon: "📋",
                                            onClick: ()=>viewRequestDetails(request),
                                            badge: request.status
                                        }, request.id, false, {
                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                            lineNumber: 706,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                    lineNumber: 704,
                                    columnNumber: 17
                                }, this) : /* Desktop Requests Table */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border overflow-hidden",
                                    style: {
                                        borderColor: themeConfig.colors.border
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                style: {
                                                    backgroundColor: themeConfig.colors.surface
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
                                                            style: {
                                                                color: themeConfig.colors.textSecondary
                                                            },
                                                            children: "Request"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 727,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
                                                            style: {
                                                                color: themeConfig.colors.textSecondary
                                                            },
                                                            children: "Category"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 733,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
                                                            style: {
                                                                color: themeConfig.colors.textSecondary
                                                            },
                                                            children: "Priority"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 739,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
                                                            style: {
                                                                color: themeConfig.colors.textSecondary
                                                            },
                                                            children: "Status"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 745,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
                                                            style: {
                                                                color: themeConfig.colors.textSecondary
                                                            },
                                                            children: "Submitted By"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 751,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
                                                            style: {
                                                                color: themeConfig.colors.textSecondary
                                                            },
                                                            children: "Date"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 757,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
                                                            style: {
                                                                color: themeConfig.colors.textSecondary
                                                            },
                                                            children: "Actions"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 763,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                    lineNumber: 726,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 723,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: filteredRequests.map((request, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: `border-t ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`,
                                                        style: {
                                                            borderColor: themeConfig.colors.border
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-medium",
                                                                    style: {
                                                                        color: themeConfig.colors.text
                                                                    },
                                                                    children: request.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                    lineNumber: 781,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                lineNumber: 780,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        color: themeConfig.colors.textSecondary
                                                                    },
                                                                    children: request.category
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                    lineNumber: 789,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                lineNumber: 788,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `px-2 py-1 text-xs font-medium rounded-full ${request.priority === "High" ? "bg-red-100 text-red-800" : request.priority === "Medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`,
                                                                    children: request.priority
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                    lineNumber: 798,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                lineNumber: 797,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `px-2 py-1 text-xs font-medium rounded-full ${request.status === "Completed" ? "bg-green-100 text-green-800" : request.status === "In Progress" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`,
                                                                    children: request.status
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                    lineNumber: 811,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                lineNumber: 810,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        color: themeConfig.colors.textSecondary
                                                                    },
                                                                    children: request.submittedBy
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                    lineNumber: 824,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                lineNumber: 823,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        color: themeConfig.colors.textSecondary
                                                                    },
                                                                    children: request.submittedDate
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                    lineNumber: 833,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                lineNumber: 832,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex space-x-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>viewRequestDetails(request),
                                                                            className: "text-blue-600 hover:text-blue-800 text-sm font-medium",
                                                                            children: "View"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                            lineNumber: 843,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>handleStatusUpdate(request.id, "Completed"),
                                                                            className: "text-green-600 hover:text-green-800 text-sm font-medium",
                                                                            children: "Complete"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                            lineNumber: 849,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>handleDeleteRequest(request.id),
                                                                            className: "text-red-600 hover:text-red-800 text-sm font-medium",
                                                                            children: "Delete"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                            lineNumber: 857,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                    lineNumber: 842,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                lineNumber: 841,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, request.id, true, {
                                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 773,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 771,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 722,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                    lineNumber: 718,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                            lineNumber: 659,
                            columnNumber: 13
                        }, this),
                        activeTab === "analytics" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-8",
                            children: isMobile ? /* Mobile Analytics */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebListGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebListGroup"], {
                                        title: "Analytics Overview",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebListGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebListGroupItem"], {
                                                title: "Request Trends",
                                                subtitle: "Monthly request patterns",
                                                leftIcon: "📈"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 880,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebListGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebListGroupItem"], {
                                                title: "Category Distribution",
                                                subtitle: "Requests by category",
                                                leftIcon: "📊"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 885,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebListGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebListGroupItem"], {
                                                title: "Completion Rates",
                                                subtitle: "Performance metrics",
                                                leftIcon: "✅"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 890,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebListGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebListGroupItem"], {
                                                title: "Response Times",
                                                subtitle: "Average resolution time",
                                                leftIcon: "⏱️"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 895,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 879,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebListGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebListGroup"], {
                                        title: "Key Metrics",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebListGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebListGroupItem"], {
                                                title: "Average Response Time",
                                                subtitle: "2.3 days",
                                                leftIcon: "⏱️"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 903,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebListGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebListGroupItem"], {
                                                title: "Most Active Category",
                                                subtitle: "HVAC (45 requests)",
                                                leftIcon: "🔧"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 908,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebListGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebListGroupItem"], {
                                                title: "Top Performer",
                                                subtitle: "John Doe (12 completed)",
                                                leftIcon: "🏆"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 913,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 902,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                lineNumber: 878,
                                columnNumber: 17
                            }, this) : /* Desktop Analytics */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-6 rounded-lg border",
                                                style: {
                                                    borderColor: themeConfig.colors.border
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold mb-4",
                                                        style: {
                                                            color: themeConfig.colors.text
                                                        },
                                                        children: "Request Trends"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 928,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-64 flex items-center justify-center",
                                                        style: {
                                                            backgroundColor: themeConfig.colors.surface,
                                                            borderRadius: "8px"
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                color: themeConfig.colors.textSecondary
                                                            },
                                                            children: "📊 Chart placeholder - Request trends over time"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 941,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 934,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 924,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-6 rounded-lg border",
                                                style: {
                                                    borderColor: themeConfig.colors.border
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold mb-4",
                                                        style: {
                                                            color: themeConfig.colors.text
                                                        },
                                                        children: "Category Distribution"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 953,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-64 flex items-center justify-center",
                                                        style: {
                                                            backgroundColor: themeConfig.colors.surface,
                                                            borderRadius: "8px"
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                color: themeConfig.colors.textSecondary
                                                            },
                                                            children: "📈 Chart placeholder - Category breakdown"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                            lineNumber: 966,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 959,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 949,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 923,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-6 rounded-lg border",
                                        style: {
                                            borderColor: themeConfig.colors.border
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold mb-4",
                                                style: {
                                                    color: themeConfig.colors.text
                                                },
                                                children: "Performance Metrics"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 979,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-2xl font-bold mb-2",
                                                                style: {
                                                                    color: themeConfig.colors.text
                                                                },
                                                                children: "2.3 days"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                lineNumber: 987,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm",
                                                                style: {
                                                                    color: themeConfig.colors.textSecondary
                                                                },
                                                                children: "Average Response Time"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                lineNumber: 993,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 986,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-2xl font-bold mb-2",
                                                                style: {
                                                                    color: themeConfig.colors.text
                                                                },
                                                                children: "HVAC"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                lineNumber: 1001,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm",
                                                                style: {
                                                                    color: themeConfig.colors.textSecondary
                                                                },
                                                                children: "Most Active Category (45 requests)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                lineNumber: 1007,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 1000,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-2xl font-bold mb-2",
                                                                style: {
                                                                    color: themeConfig.colors.text
                                                                },
                                                                children: "John Doe"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                lineNumber: 1015,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm",
                                                                style: {
                                                                    color: themeConfig.colors.textSecondary
                                                                },
                                                                children: "Top Performer (12 completed)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                                lineNumber: 1021,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 1014,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 985,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 975,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                                lineNumber: 922,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                            lineNumber: 875,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
                    lineNumber: 266,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
            lineNumber: 120,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/app/admin/dashboard/page.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this);
}
_s(AdminDashboard, "UKPNDWuAVOKEWdkaqdJlosRcmxU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AdminDashboard;
var _c;
__turbopack_context__.k.register(_c, "AdminDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_web_src_b46cee27._.js.map