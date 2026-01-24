"use client";

// IVF Maintenance Utility - Deployed to Vercel
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.refresh();
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // If user is not logged in, show landing page with login
  if (status === "unauthenticated") {
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
                Sign In to Access Full Features
              </h3>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
                    placeholder="Email address"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
                    placeholder="Password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-[#1B4332] text-white font-medium rounded-lg hover:bg-[#2d5a47] focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </form>
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

  // If user is logged in, show dashboard options
  if (status === "authenticated") {
    return (
      <div className="min-h-screen bg-white flex">
        <div className="w-full flex items-center justify-center p-8">
          <div className="w-full max-w-2xl text-center">
            {/* Logo/Brand */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1B4332] rounded-2xl mb-4">
                <span className="text-white text-2xl font-bold">IVF</span>
              </div>
              <h1 className="text-4xl font-bold text-[#1B4332] mb-2">
                Welcome back, {session.user?.name}!
              </h1>
              <p className="text-[#64748B] text-lg">
                What would you like to do today?
              </p>
            </div>

            {/* Navigation Options */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <button
                onClick={() => router.push("/student")}
                className="p-8 bg-gradient-to-br from-[#1B4332] to-[#2d5a47] text-white rounded-xl hover:shadow-lg transition-all duration-200"
              >
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Submit Request</h3>
                <p className="text-white/80">
                  Create a new maintenance request
                </p>
              </button>

              {(session.user?.role === "ADMIN" ||
                session.user?.role === "STAFF") && (
                <button
                  onClick={() => router.push("/admin/dashboard")}
                  className="p-8 border-2 border-[#1B4332] text-[#1B4332] rounded-xl hover:bg-[#1B4332] hover:text-white transition-all duration-200"
                >
                  <div className="w-16 h-16 bg-[#1B4332]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-[#1B4332]"
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
                  <h3 className="text-xl font-semibold mb-2">
                    Admin Dashboard
                  </h3>
                  <p className="text-[#1B4332]/80">
                    Manage requests and analytics
                  </p>
                </button>
              )}
            </div>

            {/* User Info & Logout */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-[#64748B]">Logged in as</p>
                  <p className="font-medium text-[#1B4332]">
                    {session.user?.email}
                  </p>
                  <p className="text-sm text-[#64748B]">
                    Role: {session.user?.role}
                  </p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="px-6 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8">
              <p className="text-sm text-[#64748B]">
                © 2026 IVF Maintenance Utility. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-[#1B4332] rounded-2xl mb-4 mx-auto flex items-center justify-center">
          <span className="text-white text-2xl font-bold">IVF</span>
        </div>
        <p className="text-[#64748B]">Loading...</p>
      </div>
    </div>
  );
}
