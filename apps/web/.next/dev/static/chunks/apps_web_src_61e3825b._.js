(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/src/lib/queryClient.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "invalidateQueries",
    ()=>invalidateQueries,
    "queryClient",
    ()=>queryClient,
    "queryKeys",
    ()=>queryKeys
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
;
const queryClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]({
    defaultOptions: {
        queries: {
            // Time in milliseconds
            staleTime: 5 * 60 * 1000,
            retry: 3,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true
        },
        mutations: {
            retry: 1
        }
    }
});
const queryKeys = {
    requests: [
        'requests'
    ],
    request: (id)=>[
            'requests',
            id
        ],
    users: [
        'users'
    ],
    user: (id)=>[
            'users',
            id
        ],
    stats: [
        'stats'
    ],
    notifications: [
        'notifications'
    ]
};
const invalidateQueries = {
    requests: ()=>queryClient.invalidateQueries({
            queryKey: queryKeys.requests
        }),
    request: (id)=>queryClient.invalidateQueries({
            queryKey: queryKeys.request(id)
        }),
    users: ()=>queryClient.invalidateQueries({
            queryKey: queryKeys.users
        }),
    stats: ()=>queryClient.invalidateQueries({
            queryKey: queryKeys.stats
        }),
    notifications: ()=>queryClient.invalidateQueries({
            queryKey: queryKeys.notifications
        })
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/QueryProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryProvider",
    ()=>QueryProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2d$devtools$2f$build$2f$modern$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query-devtools/build/modern/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$queryClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/queryClient.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function QueryProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$queryClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryClient"],
        children: [
            children,
            ("TURBOPACK compile-time value", "development") === 'development' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2d$devtools$2f$build$2f$modern$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactQueryDevtools"], {
                initialIsOpen: false
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/QueryProvider.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/QueryProvider.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = QueryProvider;
var _c;
__turbopack_context__.k.register(_c, "QueryProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$QueryProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/QueryProvider.tsx [app-client] (ecmascript)");
"use client";
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SessionProvider"], {
        refetchInterval: 5 * 60,
        refetchOnWindowFocus: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$QueryProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryProvider"], {
            children: children
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/providers.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/providers.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/lib/theme.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applySmartTheme",
    ()=>applySmartTheme,
    "applyTheme",
    ()=>applyTheme,
    "getSmartTheme",
    ()=>getSmartTheme,
    "getStoredTheme",
    ()=>getStoredTheme,
    "initializeTheme",
    ()=>initializeTheme,
    "setStoredTheme",
    ()=>setStoredTheme,
    "setupSystemPreferenceListener",
    ()=>setupSystemPreferenceListener,
    "themes",
    ()=>themes
]);
const themes = {
    standard: {
        name: "standard",
        displayName: "Academic Minimalist",
        colors: {
            primary: "#0F766E",
            secondary: "#FFFFFF",
            accent: "#6366F1",
            accent_amber: "#F59E0B",
            background: "#F8FAFC",
            surface: "#FFFFFF",
            text: "#1E293B",
            textSecondary: "#64748B",
            border: "#E2E8F0",
            success: "#10B981",
            warning: "#F59E0B",
            error: "#EF4444"
        }
    },
    light: {
        name: "light",
        displayName: "Academic Light",
        colors: {
            primary: "#0891B2",
            secondary: "#FFFFFF",
            accent: "#0EA5E9",
            accent_amber: "#F59E0B",
            background: "#F0F9FF",
            surface: "#FFFFFF",
            text: "#0C4A6E",
            textSecondary: "#64748B",
            border: "#BAE6FD",
            success: "#10B981",
            warning: "#F59E0B",
            error: "#EF4444"
        }
    },
    dark: {
        name: "dark",
        displayName: "Academic Dark",
        colors: {
            primary: "#1B4332",
            secondary: "#FFFFFF",
            accent: "#64748B",
            accent_amber: "#F59E0B",
            background: "#0F172A",
            surface: "#1E293B",
            text: "#F8FAFC",
            textSecondary: "#CBD5E1",
            border: "#334155",
            success: "#1B4332",
            warning: "#F59E0B",
            error: "#EF4444"
        }
    }
};
const getStoredTheme = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        const stored = localStorage.getItem("ivf-theme");
        return stored && themes[stored] ? stored : "standard";
    }
    //TURBOPACK unreachable
    ;
};
const setStoredTheme = (theme)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.setItem("ivf-theme", theme);
    }
};
const getSmartTheme = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Check for system dark/light mode preference
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const prefersLightScheme = window.matchMedia("(prefers-color-scheme: light)").matches;
    // Get current hour for time-based theming
    const currentHour = new Date().getHours();
    const isMorning = currentHour >= 6 && currentHour < 12;
    const isAfternoon = currentHour >= 12 && currentHour < 18;
    const isEvening = currentHour >= 18 && currentHour < 22;
    const isNight = currentHour >= 22 || currentHour < 6;
    // Smart theme logic
    if (prefersDarkScheme || isNight) {
        return "dark";
    } else if (prefersLightScheme || isMorning) {
        return "light";
    } else if (isAfternoon) {
        return "standard"; // Nature theme for afternoon
    } else {
        return "standard"; // Default to standard for evening
    }
};
const applySmartTheme = (theme)=>{
    let selectedTheme;
    if (theme) {
        // Use explicitly selected theme
        selectedTheme = theme;
    } else {
        // Use smart theme detection
        selectedTheme = getSmartTheme();
    }
    applyTheme(selectedTheme);
    setStoredTheme(selectedTheme);
};
const setupSystemPreferenceListener = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        // Listen for system dark/light mode changes
        const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const lightModeQuery = window.matchMedia("(prefers-color-scheme: light)");
        darkModeQuery.addEventListener("change", (e)=>{
            if (e.matches) {
                applySmartTheme("dark");
            }
        });
        lightModeQuery.addEventListener("change", (e)=>{
            if (e.matches) {
                applySmartTheme("light");
            }
        });
        // Set up time-based theme updates (check every hour)
        setInterval(()=>{
            const currentStoredTheme = getStoredTheme();
            const smartTheme = getSmartTheme();
            // Only auto-switch if user hasn't manually set a preference
            if (currentStoredTheme === smartTheme) {
                applySmartTheme();
            }
        }, 3600000); // Check every hour
    }
};
const applyTheme = (theme, skipAnimations = true)=>{
    // Only run on client-side
    if (("TURBOPACK compile-time value", "object") === "undefined" || typeof document === "undefined") {
        return;
    }
    const themeConfig = themes[theme];
    const root = document.documentElement;
    const body = document.body;
    // Apply CSS custom properties immediately
    root.style.setProperty("--color-primary", themeConfig.colors.primary);
    root.style.setProperty("--color-secondary", themeConfig.colors.secondary);
    root.style.setProperty("--color-accent", themeConfig.colors.accent);
    root.style.setProperty("--color-background", themeConfig.colors.background);
    root.style.setProperty("--color-surface", themeConfig.colors.surface);
    root.style.setProperty("--color-text", themeConfig.colors.text);
    root.style.setProperty("--color-text-secondary", themeConfig.colors.textSecondary);
    root.style.setProperty("--color-border", themeConfig.colors.border);
    root.style.setProperty("--color-success", themeConfig.colors.success);
    root.style.setProperty("--color-warning", themeConfig.colors.warning);
    root.style.setProperty("--color-error", themeConfig.colors.error);
    // Apply theme class to body
    body.className = `theme-${theme}`;
    // Store the theme
    setStoredTheme(theme);
};
const initializeTheme = ()=>{
    // Set up system preference listeners
    setupSystemPreferenceListener();
    // Apply smart theme on initialization
    const storedTheme = getStoredTheme();
    const smartTheme = getSmartTheme();
    // Use stored theme if user has manually set it, otherwise use smart detection
    const initialTheme = storedTheme !== smartTheme ? storedTheme : smartTheme;
    // Defer theme application to avoid blocking initial render
    if ("TURBOPACK compile-time truthy", 1) {
        // Apply theme after a short delay to allow page to render first
        setTimeout(()=>{
            applyTheme(initialTheme, true); // Skip animations on initial load
        }, 100);
    }
    return initialTheme;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/ThemeProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/theme.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function useTheme() {
    _s();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
_s(useTheme, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function ThemeProvider({ children }) {
    _s1();
    const [theme, setThemeState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ThemeProvider.useState": ()=>{
            // Return a simple default theme first to avoid blocking render
            return "standard";
        }
    }["ThemeProvider.useState"]);
    const [isInitialized, setIsInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Initialize theme in a useEffect to avoid blocking initial render
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            const initialTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeTheme"])();
            // Use flushSync to avoid cascading renders while still ensuring synchronous theme application
            __turbopack_context__.A("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript, async loader)").then({
                "ThemeProvider.useEffect": ({ flushSync })=>{
                    flushSync({
                        "ThemeProvider.useEffect": ()=>{
                            setThemeState(initialTheme);
                            setIsInitialized(true);
                        }
                    }["ThemeProvider.useEffect"]);
                }
            }["ThemeProvider.useEffect"]);
        }
    }["ThemeProvider.useEffect"], []);
    const setTheme = (newTheme)=>{
        // Only apply theme if it's different
        if (theme !== newTheme) {
            setThemeState(newTheme);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTheme"])(newTheme); // Allow animations for manual theme changes
        }
    };
    const themeConfig = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themes"][theme];
    const availableThemes = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themes"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            themeConfig,
            setTheme,
            availableThemes
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `theme-${theme} ${!isInitialized ? "theme-initializing" : ""}`,
            children: children
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ThemeProvider.tsx",
            lineNumber: 73,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/ThemeProvider.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_s1(ThemeProvider, "kpFIWH9JkFvfbjAMnLfQYzuuP1E=");
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_web_src_61e3825b._.js.map