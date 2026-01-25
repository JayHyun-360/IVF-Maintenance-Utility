"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STAFF" | "STUDENT";
  department: string;
  status: "ACTIVE" | "INACTIVE";
  lastLogin: Date;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "John Administrator",
      email: "admin@campus.edu",
      role: "ADMIN",
      department: "Facilities",
      status: "ACTIVE",
      lastLogin: new Date("2026-01-25T10:30:00Z"),
    },
    {
      id: "2",
      name: "Sarah Staff",
      email: "sarah.staff@campus.edu",
      role: "STAFF",
      department: "Maintenance",
      status: "ACTIVE",
      lastLogin: new Date("2026-01-24T14:20:00Z"),
    },
    {
      id: "3",
      name: "Mike Student",
      email: "mike.student@campus.edu",
      role: "STUDENT",
      department: "Student Affairs",
      status: "ACTIVE",
      lastLogin: new Date("2026-01-23T09:15:00Z"),
    },
  ]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-100 text-purple-800";
      case "STAFF":
        return "bg-blue-100 text-blue-800";
      case "STUDENT":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "ACTIVE"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div
      style={{ backgroundColor: themeConfig.colors.background }}
      className="min-h-screen"
    >
      <header
        className="px-8 py-6 border-b"
        style={{ borderColor: themeConfig.colors.border }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="p-3 rounded-xl mr-4"
              style={{
                backgroundColor: themeConfig.colors.surface,
                color: themeConfig.colors.text,
                border: `1px solid ${themeConfig.colors.border}`,
              }}
            >
              ←
            </button>
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ color: themeConfig.colors.text }}
              >
                User Management
              </h1>
            </div>
          </div>
          <button
            className="px-6 py-3 rounded-xl font-semibold"
            style={{
              background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
              color: "#FFFFFF",
            }}
          >
            Add User
          </button>
        </div>
      </header>

      <main className="px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-xl overflow-hidden"
            style={{
              backgroundColor: themeConfig.colors.surface,
              borderColor: themeConfig.colors.border,
              border: "1px solid",
            }}
          >
            <table className="w-full">
              <thead
                style={{
                  backgroundColor: themeConfig.colors.background,
                  borderBottom: "1px solid",
                }}
              >
                <tr>
                  <th
                    className="px-6 py-4 text-left text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    User
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Role
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Department
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Status
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Last Login
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    style={{
                      borderBottom: `1px solid ${themeConfig.colors.border}`,
                    }}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div
                          className="font-medium"
                          style={{ color: themeConfig.colors.text }}
                        >
                          {user.name}
                        </div>
                        <div
                          className="text-sm mt-1"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="text-sm"
                        style={{ color: themeConfig.colors.text }}
                      >
                        {user.department}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="text-sm"
                        style={{ color: themeConfig.colors.text }}
                      >
                        {user.lastLogin.toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
