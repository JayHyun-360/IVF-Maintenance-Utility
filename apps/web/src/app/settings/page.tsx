"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import { Z_INDEX } from "@/lib/z-index";
import AuthGuard from "@/components/AuthGuard";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";

export default function SettingsPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const SettingRow = ({ title, desc, children, icon }: any) => (
    <div
      className="flex items-center justify-between py-6 gap-6 first:pt-0 last:pb-0 border-b last:border-0"
      style={{ borderColor: `${themeConfig.colors.border}30` }}
    >
      <div className="flex items-center gap-4 flex-1">
        {icon && (
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-inner"
            style={{ backgroundColor: `${themeConfig.colors.text}08` }}
          >
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-sm font-black uppercase tracking-wider mb-1">
            {title}
          </h3>
          <p className="text-xs font-medium opacity-70 max-w-sm">{desc}</p>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );

  const CustomSwitch = ({
    active,
    onClick,
  }: {
    active: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className="w-12 h-6 rounded-full transition-all duration-300 relative"
      style={{
        backgroundColor: active
          ? themeConfig.colors.primary
          : `${themeConfig.colors.text}10`,
        boxShadow: active ? `0 0 15px ${themeConfig.colors.primary}40` : "none",
      }}
    >
      <div
        className="w-4 h-4 rounded-full bg-white absolute top-1 transition-all duration-300 shadow-sm"
        style={{ left: active ? "calc(100% - 1.25rem)" : "0.25rem" }}
      />
    </button>
  );

  return (
    <AuthGuard>
      <div
        className="min-h-screen relative overflow-x-hidden"
        style={{
          backgroundColor: themeConfig.colors.background,
          color: themeConfig.colors.text,
        }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-10"
            style={{ backgroundColor: themeConfig.colors.primary }}
          />
        </div>

        {/* Header */}
        <header
          className="sticky top-0 z-30 backdrop-blur-xl border-b"
          style={{
            backgroundColor: `${themeConfig.colors.background}aa`,
            borderColor: `${themeConfig.colors.border}40`,
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/")}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                style={{
                  border: `1px solid ${themeConfig.colors.border}`,
                  backgroundColor: `${themeConfig.colors.text}08`,
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h1 className="text-xl font-black">Preferences</h1>
            </div>

            <div className="flex items-center gap-3">
              <BackButton fallback="/dashboard" />
              <ThemeSwitcher />
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12 relative z-10 space-y-12 animate-fade-in">
          {/* Appearance Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black px-4">Appearance</h2>
            <div
              className="p-8 rounded-[2.5rem] border backdrop-blur-md"
              style={{
                backgroundColor: `${themeConfig.colors.surface}80`,
                borderColor: themeConfig.colors.border,
              }}
            >
              <SettingRow
                title="Color Theme"
                desc="Personalize your maintenance interface with curated color palettes."
                icon="🎨"
              >
                <ThemeSwitcher />
              </SettingRow>
              <SettingRow
                title="Condensed Mode"
                desc="Reduce padding and text size for high-density information displays."
                icon="🎯"
              >
                <CustomSwitch active={false} onClick={() => {}} />
              </SettingRow>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black px-4">Notifications</h2>
            <div
              className="p-8 rounded-[2.5rem] border backdrop-blur-md"
              style={{
                backgroundColor: `${themeConfig.colors.surface}80`,
                borderColor: themeConfig.colors.border,
              }}
            >
              <SettingRow
                title="Email Alerts"
                desc="Receive structured summaries of maintenance progress in your inbox."
                icon="✉️"
              >
                <CustomSwitch
                  active={notifications.email}
                  onClick={() => toggleNotification("email")}
                />
              </SettingRow>
              <SettingRow
                title="Native Push"
                desc="Get real-time system alerts on your device for immediate attention."
                icon="🔔"
              >
                <CustomSwitch
                  active={notifications.push}
                  onClick={() => toggleNotification("push")}
                />
              </SettingRow>
              <SettingRow
                title="SMS Protocol"
                desc="Emergency protocol: receive text messages for critical facility failures."
                icon="📱"
              >
                <CustomSwitch
                  active={notifications.sms}
                  onClick={() => toggleNotification("sms")}
                />
              </SettingRow>
            </div>
          </section>

          {/* Security & Data Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black px-4">Security & Data</h2>
            <div
              className="p-8 rounded-[2.5rem] border backdrop-blur-md"
              style={{
                backgroundColor: `${themeConfig.colors.surface}80`,
                borderColor: themeConfig.colors.border,
              }}
            >
              <button className="w-full text-left group">
                <SettingRow
                  title="Credential Access"
                  desc="Change your authentication password and manage login methods."
                  icon="🔑"
                >
                  <svg
                    className="w-5 h-5 opacity-40 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </SettingRow>
              </button>
              <button className="w-full text-left group">
                <SettingRow
                  title="Audit Export"
                  desc="Download a comprehensive archive of your activity and maintenance data."
                  icon="📦"
                >
                  <svg
                    className="w-5 h-5 opacity-40 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </SettingRow>
              </button>
            </div>
          </section>

          {/* Footer Save */}
          <div
            className="pt-8 pb-12 flex items-center justify-between border-t"
            style={{ borderColor: `${themeConfig.colors.border}30` }}
          >
            <p className="text-xs font-medium opacity-60">
              System Version: v2.4.0-stable
            </p>
            <button
              className="px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
              }}
            >
              Apply Changes
            </button>
          </div>
        </main>

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>
      </div>
    </AuthGuard>
  );
}
