"use client";

import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("general");

  const themeOptions = [
    {
      value: "standard",
      label: "Standard",
      description: "Default light theme",
    },
    { value: "dark", label: "Dark", description: "Dark mode theme" },
    { value: "light", label: "Light", description: "Bright light theme" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1B4332]">Settings</h1>
        <p className="text-[#64748B] mt-2">
          Manage your account and system preferences
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {["general", "appearance", "security"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? "border-[#1B4332] text-[#1B4332]"
                    : "border-transparent text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Theme Settings
                </h3>
                <div className="space-y-4">
                  {themeOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`relative rounded-lg border-2 p-4 cursor-pointer ${
                        theme === option.value
                          ? "border-[#1B4332] bg-[#1B4332]/5"
                          : "border-gray-200"
                      }`}
                      onClick={() => setTheme(option.value as any)}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full border-2 mr-3 ${
                            theme === option.value
                              ? "border-[#1B4332] bg-[#1B4332]"
                              : "border-gray-300"
                          }`}
                        >
                          {theme === option.value && (
                            <div className="w-2 h-2 rounded-full bg-white mx-auto mt-0.5"></div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {option.label}
                          </div>
                          <div className="text-sm text-gray-500">
                            {option.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "general" && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                General Settings
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Name
                </label>
                <input
                  type="text"
                  defaultValue="IVF Maintenance Utility"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Security Settings
              </h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">
                    Two-Factor Authentication
                  </span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-gray-700">Session Timeout</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
