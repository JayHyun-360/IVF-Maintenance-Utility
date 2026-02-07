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
"[project]/apps/web/src/components/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ThemeProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function Button({ children, onClick, type = "button", variant = "primary", size = "md", disabled = false, loading = false, className = "", fullWidth = false, hapticFeedback = true, onTouchStart, onTouchEnd }) {
    _s();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const triggerHapticFeedback = ()=>{
        if (hapticFeedback && "vibrate" in navigator) {
            navigator.vibrate(10);
        }
    };
    const handleTouchStart = ()=>{
        triggerHapticFeedback();
        onTouchStart?.();
    };
    const handleClick = ()=>{
        triggerHapticFeedback();
        onClick?.();
    };
    const getVariantStyles = ()=>{
        switch(variant){
            case "primary":
                return {
                    background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                    color: "#FFFFFF",
                    border: `1px solid ${themeConfig.colors.primary}`,
                    boxShadow: `0 4px 14px 0 ${themeConfig.colors.primary}25`
                };
            case "secondary":
                return {
                    backgroundColor: themeConfig.colors.surface,
                    color: themeConfig.colors.text,
                    border: `1px solid ${themeConfig.colors.border}`
                };
            case "danger":
                return {
                    background: `linear-gradient(135deg, ${themeConfig.colors.error} 0%, ${themeConfig.colors.error} 100%)`,
                    color: "#FFFFFF",
                    border: `1px solid ${themeConfig.colors.error}`,
                    boxShadow: `0 4px 14px 0 ${themeConfig.colors.error}25`
                };
            case "ghost":
                return {
                    backgroundColor: "transparent",
                    color: themeConfig.colors.text,
                    border: `1px solid ${themeConfig.colors.border}`
                };
            default:
                return {
                    background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                    color: "#FFFFFF",
                    border: `1px solid ${themeConfig.colors.primary}`,
                    boxShadow: `0 4px 14px 0 ${themeConfig.colors.primary}25`
                };
        }
    };
    const getSizeStyles = ()=>{
        switch(size){
            case "sm":
                return "px-3 py-2 text-xs sm:text-sm";
            case "md":
                return "px-4 py-3 text-sm sm:text-base";
            case "lg":
                return "px-6 py-4 text-base sm:text-lg";
            case "mobile":
                return "px-4 py-4 text-base min-h-[44px] min-w-[44px]";
            default:
                return "px-4 py-3 text-sm sm:text-base";
        }
    };
    const styles = getVariantStyles();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: type,
        onClick: handleClick,
        onTouchStart: handleTouchStart,
        onTouchEnd: onTouchEnd,
        disabled: disabled || loading,
        className: `
        ${getSizeStyles()}
        ${fullWidth ? "w-full" : ""}
        rounded-xl font-medium transition-all duration-300 
        hover:scale-105 hover:shadow-xl active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:scale-100 disabled:hover:shadow-lg
        ${hapticFeedback ? "haptic-feedback" : ""}
        touch-manipulation
        ${className}
      `,
        style: styles,
        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center space-x-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Button.tsx",
                    lineNumber: 129,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Loading..."
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Button.tsx",
                    lineNumber: 130,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/Button.tsx",
            lineNumber: 128,
            columnNumber: 9
        }, this) : children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/Button.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}
_s(Button, "t1HWFDcNHtTItr/ady3FNG/4+ho=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/role-selection/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RoleSelectionPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ThemeProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeSwitcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ThemeSwitcher.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$z$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/z-index.ts [app-client] (ecmascript)");
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
function RoleSelectionContent() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedRole, setSelectedRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoleSelectionContent.useEffect": ()=>{
            const checkSession = {
                "RoleSelectionContent.useEffect.checkSession": async ()=>{
                    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSession"])();
                    if (!session) {
                        router.push("/login");
                        return;
                    }
                    setUser(session.user);
                }
            }["RoleSelectionContent.useEffect.checkSession"];
            checkSession();
        }
    }["RoleSelectionContent.useEffect"], [
        router
    ]);
    const handleRoleSelection = async (role)=>{
        if (!user) return;
        setSelectedRole(role);
        setIsLoading(true);
        setError("");
        try {
            // Check if user exists in our system and get their actual role
            const response = await fetch("/api/auth/check-role", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: user.email
                })
            });
            const data = await response.json();
            if (!response.ok) {
                if (data.error === "User not found") {
                    setError("User not found in system. Please register first.");
                    return;
                }
                throw new Error(data.error || "Failed to verify role");
            }
            const userRole = data.role;
            // Role-based access validation
            if (role === "admin" && userRole !== "ADMIN") {
                setError("You are not authorized to access as Admin. Your role is User.");
                return;
            }
            if (role === "user" && userRole === "ADMIN") {
                setError("You are registered as an Admin. Please sign in as Admin.");
                return;
            }
            // If admin, redirect to PIN verification
            if (role === "admin") {
                router.push("/admin-pin-verification");
            } else {
                // If user, redirect directly to user page
                router.push("/student");
            }
        } catch (error) {
            setError("Failed to verify role. Please try again.");
        } finally{
            setIsLoading(false);
        }
    };
    const handleSignOut = async ()=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])({
            redirect: false
        });
        router.push("/login");
    };
    if (!user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            style: {
                backgroundColor: themeConfig.colors.background
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: themeConfig.colors.text
                        },
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                lineNumber: 101,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
            lineNumber: 97,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center px-4",
        style: {
            backgroundColor: themeConfig.colors.background
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 overflow-hidden pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-20 left-20 w-64 h-64 rounded-full opacity-10",
                        style: {
                            backgroundColor: themeConfig.colors.primary
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-10",
                        style: {
                            backgroundColor: themeConfig.colors.secondary
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-1/2 left-1/3 w-48 h-48 rounded-full opacity-10",
                        style: {
                            backgroundColor: themeConfig.colors.accent
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-8 right-8",
                style: {
                    zIndex: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$z$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Z_INDEX"].DROPDOWN
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeSwitcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-2xl relative z-10 rounded-2xl p-8",
                style: {
                    background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                    border: `1px solid ${themeConfig.colors.border}`,
                    boxShadow: `0 20px 40px ${themeConfig.colors.primary}20, 0 0 0 1px ${themeConfig.colors.border}20`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6 shadow-2xl transform hover:scale-110 transition-all duration-500",
                                style: {
                                    background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                                    boxShadow: `0 10px 30px ${themeConfig.colors.primary}30`
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-10 h-10 text-white",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                                        lineNumber: 162,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold mb-2",
                                style: {
                                    color: themeConfig.colors.text
                                },
                                children: [
                                    "Welcome, ",
                                    user.name || user.email
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: themeConfig.colors.textSecondary
                                },
                                children: "Choose how you'd like to sign in"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 p-4 rounded-xl text-center",
                        style: {
                            backgroundColor: `${themeConfig.colors.error}10`,
                            border: `1px solid ${themeConfig.colors.error}30`,
                            color: themeConfig.colors.error
                        },
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                        lineNumber: 183,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onClick: ()=>handleRoleSelection("admin"),
                                loading: isLoading && selectedRole === "admin",
                                disabled: isLoading,
                                size: "lg",
                                className: "p-8 flex flex-col items-center justify-center h-32",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-8 h-8 mb-3",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                                            lineNumber: 211,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                                        lineNumber: 205,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg font-semibold",
                                        children: "Sign in as Admin"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                                        lineNumber: 218,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm opacity-75 mt-1",
                                        children: "Full system access"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                                        lineNumber: 219,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onClick: ()=>handleRoleSelection("user"),
                                loading: isLoading && selectedRole === "user",
                                disabled: isLoading,
                                variant: "secondary",
                                size: "lg",
                                className: "p-8 flex flex-col items-center justify-center h-32",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-8 h-8 mb-3",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                                            lineNumber: 237,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                                        lineNumber: 231,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg font-semibold",
                                        children: "Sign in as User"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                                        lineNumber: 244,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm opacity-75 mt-1",
                                        children: "Submit maintenance requests"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                                        lineNumber: 245,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSignOut,
                            className: "text-sm transition-colors duration-200 hover:scale-105",
                            style: {
                                color: themeConfig.colors.textSecondary
                            },
                            children: "Not you? Sign out →"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                            lineNumber: 253,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_s(RoleSelectionContent, "S5udbrrXe38977WYA2USk3bOmpE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = RoleSelectionContent;
function RoleSelectionPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
                lineNumber: 271,
                columnNumber: 11
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
            lineNumber: 270,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RoleSelectionContent, {}, void 0, false, {
            fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
            lineNumber: 275,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/app/role-selection/page.tsx",
        lineNumber: 268,
        columnNumber: 5
    }, this);
}
_c1 = RoleSelectionPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "RoleSelectionContent");
__turbopack_context__.k.register(_c1, "RoleSelectionPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_3f609a6a._.js.map