"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import AuthGuard from "@/components/AuthGuard";
import BackButton from "@/components/BackButton";
import { motion } from "framer-motion";

export default function AdminSettings() {
  const { isMobile } = useMobileOptimizations();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    maintenanceMode: false,
    debugMode: false,
    logLevel: "info",
    sessionTimeout: "24",
  });

  useEffect(() => {
    setMounted(true);
    // Simulate loading settings
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    // Simulate saving settings
    console.log("Saving settings:", settings);
    // Add actual API call here
  };

  if (!mounted) {
    return (
      <AuthGuard requiredRole="ADMIN">
        <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="min-h-screen bg-[#0B0E11] relative overflow-hidden">
        {/* Technical Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <g fill="none" fillRule="evenodd">
              <g stroke="#14b8a6" strokeWidth="0.5" opacity="0.3">
                <path d="M0 0h40v40H0z M10 0v40M20 0v40M30 0v40M0 10h40M0 20h40M0 30h40" />
              </g>
            </g>
          </svg>
        </div>

        {/* Teal Mesh Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-cyan-500/10 blur-3xl"></div>

        {/* Main Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div
              className="flex items-center justify-between h-14 md:h-16"
              style={{ maxWidth: "1400px", margin: "0 auto" }}
            >
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 md:gap-3"
              >
                <motion.div
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/25"
                  whileHover={{ scale: 1.05, rotate: 3 }}
                >
                  <svg
                    className="w-4 h-4 md:w-6 md:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </motion.div>
                <div className="hidden sm:block">
                  <h1 className="text-lg md:text-xl font-bold text-gray-100">
                    IVF Admin
                  </h1>
                  <p className="text-xs text-gray-400">System Settings</p>
                </div>
              </motion.div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-2 md:gap-4 ml-auto">
                <BackButton fallback="/admin/dashboard" />
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="pt-24 md:pt-28 px-4 sm:px-6 lg:px-12 pb-12">
          <div className="max-w-7xl mx-auto" style={{ maxWidth: "1400px" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
                  Settings
                </h1>
                <p className="text-gray-400 text-lg">
                  Configure system settings and preferences
                </p>
              </div>

              {/* Settings Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Notification Settings */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="backdrop-blur-xl rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <h2 className="text-xl font-bold text-gray-100 mb-6">
                    Notifications
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-100 font-medium">
                          Email Notifications
                        </label>
                        <p className="text-gray-400 text-sm">
                          Receive email alerts for new requests
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleSettingChange(
                            "emailNotifications",
                            !settings.emailNotifications,
                          )
                        }
                        className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                          settings.emailNotifications
                            ? "bg-teal-500"
                            : "bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                            settings.emailNotifications
                              ? "translate-x-6"
                              : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-100 font-medium">
                          Push Notifications
                        </label>
                        <p className="text-gray-400 text-sm">
                          Receive browser push notifications
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleSettingChange(
                            "pushNotifications",
                            !settings.pushNotifications,
                          )
                        }
                        className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                          settings.pushNotifications
                            ? "bg-teal-500"
                            : "bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                            settings.pushNotifications
                              ? "translate-x-6"
                              : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* System Settings */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="backdrop-blur-xl rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <h2 className="text-xl font-bold text-gray-100 mb-6">
                    System Configuration
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-100 font-medium">
                          Maintenance Mode
                        </label>
                        <p className="text-gray-400 text-sm">
                          Temporarily disable user access
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleSettingChange(
                            "maintenanceMode",
                            !settings.maintenanceMode,
                          )
                        }
                        className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                          settings.maintenanceMode
                            ? "bg-red-500"
                            : "bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                            settings.maintenanceMode
                              ? "translate-x-6"
                              : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-100 font-medium">
                          Debug Mode
                        </label>
                        <p className="text-gray-400 text-sm">
                          Enable detailed logging
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleSettingChange("debugMode", !settings.debugMode)
                        }
                        className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                          settings.debugMode ? "bg-amber-500" : "bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                            settings.debugMode
                              ? "translate-x-6"
                              : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>

                    <div>
                      <label className="text-gray-100 font-medium block mb-2">
                        Log Level
                      </label>
                      <select
                        value={settings.logLevel}
                        onChange={(e) =>
                          handleSettingChange("logLevel", e.target.value)
                        }
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-gray-100 focus:border-teal-500 focus:outline-none"
                      >
                        <option value="error">Error</option>
                        <option value="warn">Warning</option>
                        <option value="info">Info</option>
                        <option value="debug">Debug</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-gray-100 font-medium block mb-2">
                        Session Timeout (hours)
                      </label>
                      <input
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) =>
                          handleSettingChange("sessionTimeout", e.target.value)
                        }
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-gray-100 focus:border-teal-500 focus:outline-none"
                        min="1"
                        max="168"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Save Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center"
              >
                <button
                  onClick={handleSaveSettings}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transform hover:-translate-y-1"
                >
                  Save Settings
                </button>
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
