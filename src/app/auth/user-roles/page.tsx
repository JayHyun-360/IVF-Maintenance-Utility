"use client";

import { useRouter } from "next/navigation";

export default function UserRolesPage() {
  const router = useRouter();

  const userRoles = [
    {
      id: "student",
      title: "Student",
      description: "Submit and track your maintenance requests",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      color: "bg-blue-600 text-white",
      hoverColor: "hover:bg-blue-700",
      route: "/login/user",
    },
    {
      id: "staff",
      title: "Staff Member",
      description: "Faculty and staff access for maintenance requests",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      color: "bg-green-600 text-white",
      hoverColor: "hover:bg-green-700",
      route: "/login/user",
    },
    {
      id: "visitor",
      title: "Visitor / Guest",
      description: "Submit maintenance requests without account",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      color: "bg-purple-600 text-white",
      hoverColor: "hover:bg-purple-700",
      route: "/request/guest",
    },
    {
      id: "parent",
      title: "Parent / Guardian",
      description: "Submit requests on behalf of students",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      color: "bg-orange-600 text-white",
      hoverColor: "hover:bg-orange-700",
      route: "/login/user",
    },
    {
      id: "contractor",
      title: "Contractor / Vendor",
      description: "External service providers and contractors",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      color: "bg-indigo-600 text-white",
      hoverColor: "hover:bg-indigo-700",
      route: "/login/user",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-60 h-60 bg-[#F59E0B]/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-[#64748B]/5 rounded-full blur-2xl"></div>

        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(147, 51, 234, 0.1) 35px, rgba(147, 51, 234, 0.1) 70px)`,
            }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-4xl">
          {/* Header with Enhanced Design */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl mb-6 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <svg
                className="relative w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                <path d="M19 14l-2-2m0 0l-2 2m2-2v6" />
              </svg>
              {/* Decorative corner accents */}
              <div className="absolute top-0 right-0 w-4 h-4 bg-white/20 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 bg-white/20 rounded-tr-full"></div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Select Your Role
            </h1>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed">
              Choose your role to access the appropriate user portal
            </p>
          </div>

          {/* Enhanced User Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {userRoles.map((role) => (
              <button
                key={role.id}
                onClick={() => router.push(role.route)}
                className={`group relative flex flex-col items-center justify-center p-6 ${role.color} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 overflow-hidden`}
              >
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Icon with enhanced design */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {role.icon}
                  {/* Decorative ring */}
                  <div className="absolute inset-0 border-2 border-white/30 rounded-2xl"></div>
                </div>

                <h3 className="text-lg font-bold mb-2 relative z-10">
                  {role.title}
                </h3>
                <p className="text-xs text-white/90 text-center relative z-10 leading-relaxed">
                  {role.description}
                </p>

                {/* Decorative elements */}
                <div className="absolute top-3 right-3 w-6 h-6 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-3 left-3 w-4 h-4 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
              </button>
            ))}
          </div>

          {/* Enhanced Footer */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center justify-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-[#64748B]">User Portal</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="text-sm text-[#64748B]">Equal Access</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-blue-600"
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
                  <span className="text-sm text-[#64748B]">Quick Submit</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <button
                onClick={() => router.push("/auth")}
                className="text-sm text-[#64748B] hover:text-purple-600 transition-colors inline-flex items-center space-x-2 group"
              >
                <svg
                  className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span>← Back to Login Options</span>
              </button>
              <button
                onClick={() => router.push("/")}
                className="text-sm text-[#64748B] hover:text-purple-600 transition-colors inline-flex items-center space-x-2 group block"
              >
                <svg
                  className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span>← Back to Home</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
