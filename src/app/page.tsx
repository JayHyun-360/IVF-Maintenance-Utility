"use client";

// IVF Maintenance Utility - Deployed to Vercel
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Landing Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1B4332] rounded-2xl mb-4">
              <span className="text-white text-2xl font-bold">IVF</span>
            </div>
            <h1 className="text-3xl font-bold text-[#1B4332] mb-2">
              Integrated Visual Feedback & Maintenance Utility
            </h1>
            <p className="text-[#64748B]">
              Streamline your maintenance operations with our comprehensive
              system
            </p>
          </div>

          {/* Navigation Options */}
          <div className="space-y-4 mb-8">
            <button
              onClick={() => router.push("/student")}
              className="w-full py-3 px-4 bg-[#1B4332] text-white font-medium rounded-lg hover:bg-[#2d5a47] focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:ring-offset-2 transition-colors"
            >
              Submit Maintenance Request
            </button>
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="w-full py-3 px-4 border border-[#1B4332] text-[#1B4332] font-medium rounded-lg hover:bg-[#1B4332] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:ring-offset-2 transition-colors"
            >
              Admin Dashboard
            </button>
          </div>

          {/* Login Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-[#1B4332] mb-4 text-center">
              System Status: Active
            </h3>
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
              ✓ Application successfully deployed to Vercel
            </div>
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
              ℹ️ Database integration coming soon
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[#64748B]">
              © 2026 IVF Maintenance Utility. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Visual Element */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1B4332] to-[#2d5a47] items-center justify-center p-8">
        <div className="text-center text-white max-w-md">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-3xl mb-6">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Efficient Maintenance Management
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Streamline your maintenance operations with our comprehensive
              visual feedback system. Track requests, monitor progress, and
              optimize workflows all in one place.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 gap-6 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
              <h3 className="font-semibold mb-1">Real-time Updates</h3>
              <p className="text-sm text-white/70">Instant notifications</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Analytics</h3>
              <p className="text-sm text-white/70">Detailed insights</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
