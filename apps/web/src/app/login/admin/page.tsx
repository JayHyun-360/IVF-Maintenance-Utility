"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else if (result?.ok) {
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Admin Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1B4332] rounded-2xl mb-4">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[#1B4332] mb-2">
              Admin Sign In
            </h1>
            <p className="text-[#64748B]">
              Access the system administration dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#1B4332] mb-2"
              >
                Admin Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent text-gray-900 placeholder-gray-400 focus:placeholder-transparent"
                placeholder="admin@test.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#1B4332] mb-2"
              >
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent text-gray-900 placeholder-gray-400 focus:placeholder-transparent"
                placeholder="admin12345"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#1B4332] text-white font-medium rounded-lg hover:bg-[#2d5a47] focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Access Admin Dashboard"}
            </button>
          </form>

          {/* Demo Account */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-[#1B4332] mb-2">
              Demo Admin Account:
            </h3>
            <div className="text-xs text-gray-600">
              <div>Email: admin@test.com</div>
              <div>Password: admin12345</div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 text-center space-y-2">
            <button
              onClick={() => router.push("/auth")}
              className="text-sm text-[#64748B] hover:text-[#1B4332] block"
            >
              ← Different user type?
            </button>
            <button
              onClick={() => router.push("/")}
              className="text-sm text-[#64748B] hover:text-[#1B4332] block"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Admin Features */}
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-bold mb-4">Admin Control Center</h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Complete control over maintenance operations, user management, and
              system analytics.
            </p>
          </div>

          {/* Admin Features */}
          <div className="space-y-4 mt-12">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100 4h2a1 1 0 100 2 2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-left text-sm text-white/80">
                Manage all maintenance requests
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <p className="text-left text-sm text-white/80">
                User management and permissions
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <p className="text-left text-sm text-white/80">
                Analytics and reporting tools
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
