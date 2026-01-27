"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import Button from "@/components/Button";
import { Z_INDEX } from "@/lib/z-index";
import AuthGuard from "@/components/AuthGuard";

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
  const [users, setUsers] = useState<User[]>([
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

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "STUDENT" as "ADMIN" | "STAFF" | "STUDENT",
    department: "",
    status: "ACTIVE" as "ACTIVE" | "INACTIVE",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const getRoleColor = (role: string, themeConfig: any) => {
    switch (role) {
      case "ADMIN":
        return {
          backgroundColor: `${themeConfig.colors.primary}20`,
          color: themeConfig.colors.primary,
        };
      case "STAFF":
        return {
          backgroundColor: `${themeConfig.colors.secondary}20`,
          color: themeConfig.colors.secondary,
        };
      case "STUDENT":
        return {
          backgroundColor: `${themeConfig.colors.success}20`,
          color: themeConfig.colors.success,
        };
      default:
        return {
          backgroundColor: `${themeConfig.colors.textSecondary}20`,
          color: themeConfig.colors.textSecondary,
        };
    }
  };

  const getStatusColor = (status: string, themeConfig: any) => {
    return status === "ACTIVE"
      ? {
          backgroundColor: `${themeConfig.colors.success}20`,
          color: themeConfig.colors.success,
        }
      : {
          backgroundColor: `${themeConfig.colors.error}20`,
          color: themeConfig.colors.error,
        };
  };

  const handleAddUser = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
        lastLogin: new Date(),
      };
      setUsers([...users, newUser]);
      setShowAddModal(false);
      setFormData({
        name: "",
        email: "",
        role: "STUDENT",
        department: "",
        status: "ACTIVE",
      });
      setFormErrors({});
    } catch (error) {
      console.error("Error adding user:", error);
      // Could add toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUser = async () => {
    if (!validateForm()) return;

    if (!selectedUser) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, ...formData } : user,
        ),
      );
      setShowEditModal(false);
      setSelectedUser(null);
      setFormData({
        name: "",
        email: "",
        role: "STUDENT",
        department: "",
        status: "ACTIVE",
      });
      setFormErrors({});
    } catch (error) {
      console.error("Error updating user:", error);
      // Could add toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      setUsers(users.filter((user) => user.id !== selectedUser.id));
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      // Could add toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      status: user.status,
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.department.trim()) {
      errors.department = "Department is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = filterRole === "ALL" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "ALL" || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <AuthGuard requiredRole="ADMIN">
      <div
        className="min-h-screen"
        style={{ backgroundColor: themeConfig.colors.background }}
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
            <Button onClick={() => setShowAddModal(true)}>Add User</Button>
          </div>
        </header>

        <main className="px-8 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Search and Filter Controls */}
            <div
              className="rounded-2xl p-6 mb-6"
              style={{
                backgroundColor: themeConfig.colors.surface,
                border: `1px solid ${themeConfig.colors.border}`,
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-4">
                <div className="lg:col-span-2">
                  <input
                    type="text"
                    placeholder="Search by name, email, or department..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.text,
                    }}
                  />
                </div>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-4 py-2 rounded-lg border"
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.text,
                  }}
                >
                  <option value="ALL">All Roles</option>
                  <option value="ADMIN">Admin</option>
                  <option value="STAFF">Staff</option>
                  <option value="STUDENT">Student</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 rounded-lg border"
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.text,
                  }}
                >
                  <option value="ALL">All Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>

            <div
              className="rounded-xl overflow-hidden"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
                border: "1px solid",
              }}
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
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
                    {filteredUsers.map((user) => (
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
                              style={{
                                color: themeConfig.colors.textSecondary,
                              }}
                            >
                              {user.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className="px-2 py-1 rounded-full text-xs"
                            style={getRoleColor(user.role, themeConfig)}
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
                            className="px-2 py-1 rounded-full text-xs"
                            style={getStatusColor(user.status, themeConfig)}
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
                            <button
                              onClick={() => openEditModal(user)}
                              className="text-sm px-3 py-1 rounded-xl transition-all duration-200 hover:scale-105"
                              style={{
                                backgroundColor: `${themeConfig.colors.primary}20`,
                                color: themeConfig.colors.primary,
                                border: `1px solid ${themeConfig.colors.primary}30`,
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => openDeleteModal(user)}
                              className="text-sm px-3 py-1 rounded-xl transition-all duration-200 hover:scale-105"
                              style={{
                                backgroundColor: `${themeConfig.colors.error}20`,
                                color: themeConfig.colors.error,
                                border: `1px solid ${themeConfig.colors.error}30`,
                              }}
                            >
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
          </div>
        </main>

        {/* Add User Modal */}
        {showAddModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            style={{ zIndex: Z_INDEX.MODAL_BACKDROP }}
          >
            <div
              className="rounded-2xl p-6 w-full max-w-md"
              style={{
                backgroundColor: themeConfig.colors.surface,
                border: `1px solid ${themeConfig.colors.border}`,
                zIndex: Z_INDEX.MODAL,
              }}
            >
              <h2
                className="text-xl font-bold mb-4"
                style={{ color: themeConfig.colors.text }}
              >
                Add New User
              </h2>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      borderColor: formErrors.name
                        ? "#EF4444"
                        : themeConfig.colors.border,
                      color: themeConfig.colors.text,
                    }}
                  />
                  {formErrors.name && (
                    <p
                      className="text-xs mt-1"
                      style={{ color: themeConfig.colors.error }}
                    >
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      borderColor: formErrors.email
                        ? "#EF4444"
                        : themeConfig.colors.border,
                      color: themeConfig.colors.text,
                    }}
                  />
                  {formErrors.email && (
                    <p
                      className="text-xs mt-1"
                      style={{ color: themeConfig.colors.error }}
                    >
                      {formErrors.email}
                    </p>
                  )}
                </div>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value as any })
                  }
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.text,
                  }}
                >
                  <option value="STUDENT">Student</option>
                  <option value="STAFF">Staff</option>
                  <option value="ADMIN">Admin</option>
                </select>
                <div>
                  <input
                    type="text"
                    placeholder="Department"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      borderColor: formErrors.department
                        ? "#EF4444"
                        : themeConfig.colors.border,
                      color: themeConfig.colors.text,
                    }}
                  />
                  {formErrors.department && (
                    <p
                      className="text-xs mt-1"
                      style={{ color: themeConfig.colors.error }}
                    >
                      {formErrors.department}
                    </p>
                  )}
                </div>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as any })
                  }
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.text,
                  }}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddUser} loading={isLoading}>
                  Add User
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {showEditModal && selectedUser && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            style={{ zIndex: Z_INDEX.MODAL_BACKDROP }}
          >
            <div
              className="rounded-2xl p-6 w-full max-w-md"
              style={{
                backgroundColor: themeConfig.colors.surface,
                border: `1px solid ${themeConfig.colors.border}`,
                zIndex: Z_INDEX.MODAL,
              }}
            >
              <h2
                className="text-xl font-bold mb-4"
                style={{ color: themeConfig.colors.text }}
              >
                Edit User
              </h2>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      borderColor: formErrors.name
                        ? "#EF4444"
                        : themeConfig.colors.border,
                      color: themeConfig.colors.text,
                    }}
                  />
                  {formErrors.name && (
                    <p
                      className="text-xs mt-1"
                      style={{ color: themeConfig.colors.error }}
                    >
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      borderColor: formErrors.email
                        ? "#EF4444"
                        : themeConfig.colors.border,
                      color: themeConfig.colors.text,
                    }}
                  />
                  {formErrors.email && (
                    <p
                      className="text-xs mt-1"
                      style={{ color: themeConfig.colors.error }}
                    >
                      {formErrors.email}
                    </p>
                  )}
                </div>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value as any })
                  }
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.text,
                  }}
                >
                  <option value="STUDENT">Student</option>
                  <option value="STAFF">Staff</option>
                  <option value="ADMIN">Admin</option>
                </select>
                <div>
                  <input
                    type="text"
                    placeholder="Department"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      borderColor: formErrors.department
                        ? "#EF4444"
                        : themeConfig.colors.border,
                      color: themeConfig.colors.text,
                    }}
                  />
                  {formErrors.department && (
                    <p
                      className="text-xs mt-1"
                      style={{ color: themeConfig.colors.error }}
                    >
                      {formErrors.department}
                    </p>
                  )}
                </div>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as any })
                  }
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.text,
                  }}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleEditUser} loading={isLoading}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Delete User Modal */}
        {showDeleteModal && selectedUser && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            style={{ zIndex: Z_INDEX.MODAL_BACKDROP }}
          >
            <div
              className="rounded-2xl p-6 w-full max-w-md"
              style={{
                backgroundColor: themeConfig.colors.surface,
                border: `1px solid ${themeConfig.colors.border}`,
                zIndex: Z_INDEX.MODAL,
              }}
            >
              <h2
                className="text-xl font-bold mb-4"
                style={{ color: themeConfig.colors.text }}
              >
                Delete User
              </h2>
              <p style={{ color: themeConfig.colors.textSecondary }}>
                Are you sure you want to delete {selectedUser.name}? This action
                cannot be undone.
              </p>
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDeleteUser}
                  loading={isLoading}
                >
                  Delete User
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
