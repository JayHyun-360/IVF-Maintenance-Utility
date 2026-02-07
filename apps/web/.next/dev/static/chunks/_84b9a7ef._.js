(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/apps/web/src/components/WebForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GasReadingField",
    ()=>GasReadingField,
    "PhoneNumberField",
    ()=>PhoneNumberField,
    "TemperatureField",
    ()=>TemperatureField,
    "WebForm",
    ()=>WebForm,
    "WebFormField",
    ()=>WebFormField,
    "WebFormSection",
    ()=>WebFormSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ThemeProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/useMobileOptimizations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
function WebForm({ children, title, subtitle, onSubmit, submitText = "Submit", cancelText = "Cancel", onCancel, loading = false, disabled = false, className = "" }) {
    _s();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const { isMobile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"])();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (onSubmit && !loading && !disabled) {
            onSubmit(formData);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `rounded-lg border ${className}`,
        style: {
            backgroundColor: themeConfig.colors.surface,
            borderColor: themeConfig.colors.border
        },
        children: [
            (title || subtitle) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-4 border-b",
                style: {
                    borderColor: themeConfig.colors.border
                },
                children: [
                    title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold",
                        style: {
                            color: themeConfig.colors.text,
                            fontFamily: "Inter, system-ui, sans-serif"
                        },
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/WebForm.tsx",
                        lineNumber: 94,
                        columnNumber: 13
                    }, this),
                    subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm mt-1",
                        style: {
                            color: themeConfig.colors.textSecondary,
                            fontFamily: "Inter, system-ui, sans-serif"
                        },
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/WebForm.tsx",
                        lineNumber: 105,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/WebForm.tsx",
                lineNumber: 89,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "p-4 space-y-4",
                children: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Children.map(children, (child)=>{
                        if (/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isValidElement(child) && child.type === WebFormField) {
                            const childProps = child.props;
                            return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cloneElement(child, {
                                value: formData[childProps.name] || "",
                                onChange: (value)=>{
                                    setFormData((prev)=>({
                                            ...prev,
                                            [childProps.name]: value
                                        }));
                                }
                            });
                        }
                        return child;
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-end space-x-3 pt-4 border-t",
                        style: {
                            borderColor: themeConfig.colors.border
                        },
                        children: [
                            onCancel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onCancel,
                                disabled: loading,
                                className: "px-4 py-2 text-sm font-medium rounded-lg border transition-colors active:scale-95",
                                style: {
                                    borderColor: themeConfig.colors.border,
                                    color: themeConfig.colors.text,
                                    fontFamily: "Inter, system-ui, sans-serif"
                                },
                                children: cancelText
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/WebForm.tsx",
                                lineNumber: 142,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: loading || disabled,
                                className: "px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors active:scale-95 disabled:opacity-50",
                                style: {
                                    backgroundColor: themeConfig.colors.primary,
                                    fontFamily: "Inter, system-ui, sans-serif"
                                },
                                children: loading ? "Submitting..." : submitText
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/WebForm.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/WebForm.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/WebForm.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/WebForm.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_s(WebForm, "Ry3Uz04hAlNugK5wfGBgQ+aw/Mo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"]
    ];
});
_c = WebForm;
function WebFormField({ label, name, type = "text", placeholder, value, onChange, required = false, disabled = false, error, helper, options = [], min, max, step, className = "", autoFocus = false }) {
    _s1();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const { isMobile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"])();
    const handleChange = (e)=>{
        const newValue = type === "number" ? parseFloat(e.target.value) || "" : e.target.value;
        onChange?.(newValue);
    };
    const getInputProps = ()=>{
        const baseProps = {
            id: name,
            name,
            value: value || "",
            onChange: handleChange,
            required,
            disabled,
            autoFocus,
            className: `
        w-full px-3 py-2 text-sm rounded-lg border transition-colors
        ${error ? "border-red-500" : "border-gray-300"}
        ${disabled ? "bg-gray-50 cursor-not-allowed" : "bg-white"}
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        ${className}
      `,
            style: {
                fontFamily: "Inter, system-ui, sans-serif",
                borderColor: error ? themeConfig.colors.error : themeConfig.colors.border,
                backgroundColor: disabled ? themeConfig.colors.surface : themeConfig.colors.background,
                outlineColor: themeConfig.colors.primary
            },
            placeholder
        };
        if (type === "number") {
            return {
                ...baseProps,
                type: "number",
                inputMode: "decimal",
                pattern: "[0-9]*",
                min,
                max,
                step: step || "any"
            };
        }
        if (type === "tel") {
            return {
                ...baseProps,
                type: "tel",
                inputMode: "tel"
            };
        }
        if (type === "email") {
            return {
                ...baseProps,
                type: "email",
                inputMode: "email"
            };
        }
        if (type === "password") {
            return {
                ...baseProps,
                type: "password"
            };
        }
        return {
            ...baseProps,
            type: type
        };
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: name,
                className: "block text-sm font-medium mb-1",
                style: {
                    color: themeConfig.colors.text,
                    fontFamily: "Inter, system-ui, sans-serif"
                },
                children: [
                    label,
                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: themeConfig.colors.error
                        },
                        children: " *"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/WebForm.tsx",
                        lineNumber: 287,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/WebForm.tsx",
                lineNumber: 277,
                columnNumber: 9
            }, this),
            type === "textarea" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                ...getInputProps(),
                "aria-invalid": error ? "true" : "false",
                "aria-describedby": error ? `${name}-error` : undefined
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/WebForm.tsx",
                lineNumber: 292,
                columnNumber: 9
            }, this) : type === "select" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                ...getInputProps(),
                "aria-invalid": error ? "true" : "false",
                "aria-describedby": error ? `${name}-error` : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "",
                        children: "Select an option"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/WebForm.tsx",
                        lineNumber: 303,
                        columnNumber: 11
                    }, this),
                    options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: option.value,
                            children: option.label
                        }, option.value, false, {
                            fileName: "[project]/apps/web/src/components/WebForm.tsx",
                            lineNumber: 305,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/WebForm.tsx",
                lineNumber: 298,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ...getInputProps(),
                "aria-invalid": error ? "true" : "false",
                "aria-describedby": error ? `${name}-error` : undefined
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/WebForm.tsx",
                lineNumber: 311,
                columnNumber: 9
            }, this),
            helper && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs mt-1",
                style: {
                    color: themeConfig.colors.textSecondary,
                    fontFamily: "Inter, system-ui, sans-serif"
                },
                children: helper
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/WebForm.tsx",
                lineNumber: 318,
                columnNumber: 9
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: `${name}-error`,
                className: "text-xs mt-1",
                role: "alert",
                style: {
                    color: themeConfig.colors.error,
                    fontFamily: "Inter, system-ui, sans-serif"
                },
                children: error
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/WebForm.tsx",
                lineNumber: 329,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/WebForm.tsx",
        lineNumber: 275,
        columnNumber: 5
    }, this);
}
_s1(WebFormField, "YeWNVV84zNWb4f0+Vd0hSIpxtAI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"]
    ];
});
_c1 = WebFormField;
function WebFormSection({ title, subtitle, children, className = "" }) {
    _s2();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `space-y-4 ${className}`,
        children: [
            (title || subtitle) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base font-semibold",
                        style: {
                            color: themeConfig.colors.text,
                            fontFamily: "Inter, system-ui, sans-serif"
                        },
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/WebForm.tsx",
                        lineNumber: 358,
                        columnNumber: 13
                    }, this),
                    subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm mt-1",
                        style: {
                            color: themeConfig.colors.textSecondary,
                            fontFamily: "Inter, system-ui, sans-serif"
                        },
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/WebForm.tsx",
                        lineNumber: 369,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/WebForm.tsx",
                lineNumber: 356,
                columnNumber: 9
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/WebForm.tsx",
        lineNumber: 354,
        columnNumber: 5
    }, this);
}
_s2(WebFormSection, "t1HWFDcNHtTItr/ady3FNG/4+ho=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c2 = WebFormSection;
function TemperatureField(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WebFormField, {
        ...props,
        type: "number",
        step: 0.1,
        min: -50,
        max: 100,
        placeholder: "e.g., 37.5",
        helper: "Temperature in Celsius"
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/WebForm.tsx",
        lineNumber: 389,
        columnNumber: 5
    }, this);
}
_c3 = TemperatureField;
function GasReadingField(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WebFormField, {
        ...props,
        type: "number",
        step: 0.01,
        min: 0,
        max: 100,
        placeholder: "e.g., 5.00",
        helper: "Gas concentration percentage"
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/WebForm.tsx",
        lineNumber: 403,
        columnNumber: 5
    }, this);
}
_c4 = GasReadingField;
function PhoneNumberField(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WebFormField, {
        ...props,
        type: "tel",
        placeholder: "+1 (555) 123-4567",
        helper: "Include country code for international numbers"
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/WebForm.tsx",
        lineNumber: 417,
        columnNumber: 5
    }, this);
}
_c5 = PhoneNumberField;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "WebForm");
__turbopack_context__.k.register(_c1, "WebFormField");
__turbopack_context__.k.register(_c2, "WebFormSection");
__turbopack_context__.k.register(_c3, "TemperatureField");
__turbopack_context__.k.register(_c4, "GasReadingField");
__turbopack_context__.k.register(_c5, "PhoneNumberField");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/login/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Login page component - Fixed for Vercel deployment
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ThemeProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeSwitcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ThemeSwitcher.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$z$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/z-index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/useMobileOptimizations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/WebForm.tsx [app-client] (ecmascript)");
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
function LoginPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const { isMobile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"])();
    // State management handled by WebForm component
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isGoogleLoading, setIsGoogleLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleGoogleSignIn = async ()=>{
        setIsGoogleLoading(true);
        setError("");
        try {
            // Check if Google OAuth is properly configured
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
                setError("Google OAuth is not configured. Please use email/password login.");
                return;
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signIn"])("google", {
                callbackUrl: "/role-selection",
                redirect: true
            });
        } catch (error) {
            console.error("Google sign-in error:", error);
            setError("Google sign-in failed. Please try again or use email/password.");
        } finally{
            setIsGoogleLoading(false);
        }
    };
    const handleSubmit = async (data)=>{
        setIsLoading(true);
        setError("");
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signIn"])("credentials", {
                email: data.email,
                password: data.password,
                redirect: false
            });
            if (result?.error) {
                setError("Invalid email or password");
            } else {
                // Successfully authenticated, redirect to role selection
                router.push("/role-selection");
            }
        } catch  {
            setError("Login failed. Please try again.");
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen mobile-scroll",
        style: {
            backgroundColor: themeConfig.colors.background
        },
        children: [
            isMobile ? /* Mobile Background */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 overflow-hidden pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-8 sm:top-10 md:top-12 lg:top-16 left-8 sm:left-10 md:left-12 lg:left-16 w-24 sm:w-32 md:w-40 lg:w-48 h-24 sm:h-32 md:h-40 lg:h-48 rounded-full opacity-5 sm:opacity-8 md:opacity-10",
                        style: {
                            backgroundColor: themeConfig.colors.primary
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/login/page.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-8 sm:bottom-10 md:bottom-12 lg:bottom-16 right-8 sm:right-10 md:right-12 lg:right-16 w-32 sm:w-40 md:w-48 lg:w-56 h-32 sm:h-40 md:h-48 lg:h-56 rounded-full opacity-5 sm:opacity-8 md:opacity-10",
                        style: {
                            backgroundColor: themeConfig.colors.secondary
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/login/page.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-1/3 sm:top-1/2 left-1/4 sm:left-1/3 w-20 sm:w-24 md:w-32 lg:w-40 h-20 sm:h-24 md:h-32 lg:h-40 rounded-full opacity-5 sm:opacity-8 md:opacity-10",
                        style: {
                            backgroundColor: themeConfig.colors.accent
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/login/page.tsx",
                        lineNumber: 92,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/login/page.tsx",
                lineNumber: 83,
                columnNumber: 9
            }, this) : /* Desktop Background - Original */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 overflow-hidden pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-8 sm:top-10 md:top-12 lg:top-16 left-8 sm:left-10 md:left-12 lg:left-16 w-24 sm:w-32 md:w-40 lg:w-48 h-24 sm:h-32 md:h-40 lg:h-48 rounded-full opacity-5 sm:opacity-8 md:opacity-10",
                        style: {
                            backgroundColor: themeConfig.colors.primary
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/login/page.tsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-8 sm:bottom-10 md:bottom-12 lg:bottom-16 right-8 sm:right-10 md:right-12 lg:right-16 w-32 sm:w-40 md:w-48 lg:w-56 h-32 sm:h-40 md:h-48 lg:h-56 rounded-full opacity-5 sm:opacity-8 md:opacity-10",
                        style: {
                            backgroundColor: themeConfig.colors.secondary
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/login/page.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-1/3 sm:top-1/2 left-1/4 sm:left-1/3 w-20 sm:w-24 md:w-32 lg:w-40 h-20 sm:h-24 md:h-32 lg:h-40 rounded-full opacity-5 sm:opacity-8 md:opacity-10",
                        style: {
                            backgroundColor: themeConfig.colors.accent
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/login/page.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/login/page.tsx",
                lineNumber: 99,
                columnNumber: 9
            }, this),
            isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 mobile-safe-padding-top",
                style: {
                    zIndex: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$z$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Z_INDEX"].DROPDOWN
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeSwitcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/apps/web/src/app/login/page.tsx",
                    lineNumber: 121,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/login/page.tsx",
                lineNumber: 117,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-6 right-6",
                style: {
                    zIndex: 1000
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeSwitcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/apps/web/src/app/login/page.tsx",
                    lineNumber: 125,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/login/page.tsx",
                lineNumber: 124,
                columnNumber: 9
            }, this),
            isMobile ? /* Mobile Login Form */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 mobile-safe-padding",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-sm sm:max-w-md relative z-10 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8",
                    style: {
                        background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                        border: `1px solid ${themeConfig.colors.border}`,
                        boxShadow: `0 12px 24px ${themeConfig.colors.primary}15, 0 0 0 1px ${themeConfig.colors.border}15`
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-4 sm:mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg sm:shadow-xl md:shadow-2xl transform hover:scale-105 transition-all duration-500",
                                    style: {
                                        background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                                        boxShadow: `0 6px 16px ${themeConfig.colors.primary}25`
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/login/page.tsx",
                                            lineNumber: 156,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/login/page.tsx",
                                        lineNumber: 150,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/login/page.tsx",
                                    lineNumber: 143,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2",
                                    style: {
                                        color: themeConfig.colors.text
                                    },
                                    children: "IVF Maintenance Utility"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/login/page.tsx",
                                    lineNumber: 164,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm sm:text-base",
                                    style: {
                                        color: themeConfig.colors.textSecondary
                                    },
                                    children: "Sign in to access the maintenance system"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/login/page.tsx",
                                    lineNumber: 170,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/app/login/page.tsx",
                            lineNumber: 142,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebForm"], {
                            title: "Sign In",
                            subtitle: "Enter your credentials to continue",
                            onSubmit: handleSubmit,
                            loading: isLoading,
                            submitText: "Sign In",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebFormField"], {
                                    name: "email",
                                    label: "Email",
                                    type: "email",
                                    placeholder: "Enter your email",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/login/page.tsx",
                                    lineNumber: 186,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebFormField"], {
                                    name: "password",
                                    label: "Password",
                                    type: "password",
                                    placeholder: "Enter your password",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/login/page.tsx",
                                    lineNumber: 193,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/app/login/page.tsx",
                            lineNumber: 179,
                            columnNumber: 13
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 p-3 rounded-lg text-sm text-center",
                            style: {
                                backgroundColor: `${themeConfig.colors.error}20`,
                                color: themeConfig.colors.error,
                                border: `1px solid ${themeConfig.colors.error}50`
                            },
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/login/page.tsx",
                            lineNumber: 204,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push("/register"),
                                className: "text-sm",
                                style: {
                                    color: themeConfig.colors.primary
                                },
                                children: "Don't have an account? Create one →"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/login/page.tsx",
                                lineNumber: 218,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/login/page.tsx",
                            lineNumber: 217,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/app/login/page.tsx",
                    lineNumber: 133,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/login/page.tsx",
                lineNumber: 132,
                columnNumber: 9
            }, this) : /* Desktop Login Form - Improved Layout */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen flex items-center justify-center px-4 py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-lg",
                    style: {
                        backgroundColor: themeConfig.colors.surface,
                        border: `1px solid ${themeConfig.colors.border}`,
                        boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)`,
                        borderRadius: "1rem"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4",
                                    style: {
                                        background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                                        boxShadow: `0 4px 15px ${themeConfig.colors.primary}20`
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
                                            d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/login/page.tsx",
                                            lineNumber: 254,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/login/page.tsx",
                                        lineNumber: 248,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/login/page.tsx",
                                    lineNumber: 241,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2",
                                    style: {
                                        color: themeConfig.colors.text
                                    },
                                    children: "IVF Maintenance Utility"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/login/page.tsx",
                                    lineNumber: 262,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm sm:text-base",
                                    style: {
                                        color: themeConfig.colors.textSecondary
                                    },
                                    children: "Access your maintenance dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/login/page.tsx",
                                    lineNumber: 268,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/app/login/page.tsx",
                            lineNumber: 240,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebForm"], {
                            title: "Sign In",
                            subtitle: "Access your maintenance dashboard",
                            onSubmit: handleSubmit,
                            loading: isLoading,
                            submitText: isLoading ? "Signing in..." : "Sign in",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebFormField"], {
                                    name: "email",
                                    label: "Email",
                                    type: "email",
                                    placeholder: "Enter your email",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/login/page.tsx",
                                    lineNumber: 282,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WebForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebFormField"], {
                                    name: "password",
                                    label: "Password",
                                    type: "password",
                                    placeholder: "Enter your password",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/login/page.tsx",
                                    lineNumber: 289,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    id: "remember",
                                                    className: "h-4 w-4 rounded border-gray-300 focus:ring-blue-500",
                                                    style: {
                                                        accentColor: themeConfig.colors.primary
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/login/page.tsx",
                                                    lineNumber: 298,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "remember",
                                                    className: "ml-2 block text-sm",
                                                    style: {
                                                        color: themeConfig.colors.text
                                                    },
                                                    children: "Remember me"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/login/page.tsx",
                                                    lineNumber: 304,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/app/login/page.tsx",
                                            lineNumber: 297,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            className: "text-sm hover:underline",
                                            style: {
                                                color: themeConfig.colors.primary
                                            },
                                            children: "Forgot password?"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/login/page.tsx",
                                            lineNumber: 312,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/app/login/page.tsx",
                                    lineNumber: 296,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/app/login/page.tsx",
                            lineNumber: 275,
                            columnNumber: 13
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 p-3 rounded-lg text-sm text-center",
                            style: {
                                backgroundColor: `${themeConfig.colors.error}20`,
                                color: themeConfig.colors.error,
                                border: `1px solid ${themeConfig.colors.error}50`
                            },
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/login/page.tsx",
                            lineNumber: 324,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/app/login/page.tsx",
                    lineNumber: 231,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/login/page.tsx",
                lineNumber: 230,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/app/login/page.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_s(LoginPage, "JZonHxp3ar6Y+l54eRv7OglvX1s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$useMobileOptimizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileOptimizations"]
    ];
});
_c = LoginPage;
var _c;
__turbopack_context__.k.register(_c, "LoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_84b9a7ef._.js.map