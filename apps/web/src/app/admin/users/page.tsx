"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import Button from "@/components/Button";
import BackButton from "@/components/BackButton";
import { Z_INDEX } from "@/lib/z-index";
import AuthGuard from "@/components/AuthGuard";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import WebHeader from "@/components/WebHeader";
import { WebListGroup, WebListGroupItem } from "@/components/WebListGroup";

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
  const { isMobile } = useMobileOptimizations();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/users");
      if (response.ok) {
        const data = await response.json();
        // Map Prisma data to local User interface
        const mappedUsers = data.map((u: any) => ({
          ...u,
          department: "Facilities", // Prisma model doesn't have department, defaulting for UI
          status: "ACTIVE", // Prisma model doesn't have status, defaulting for UI
          lastLogin: new Date(u.createdAt), // Using createdAt as mock for lastLogin
        }));
        setUsers(mappedUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          password: "password123", // Default password for new users
        }),
      });

      if (response.ok) {
        await fetchUsers();
        setShowAddModal(false);
        setFormData({
          name: "",
          email: "",
          role: "STUDENT",
          department: "",
          status: "ACTIVE",
        });
        setFormErrors({});
      } else {
        const error = await response.json();
        alert(error.error || "Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUser = async () => {
    if (!validateForm()) return;

    if (!selectedUser) return;

    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
        }),
      });

      if (response.ok) {
        await fetchUsers();
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
      } else {
        const error = await response.json();
        alert(error.error || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchUsers();
        setShowDeleteModal(false);
        setSelectedUser(null);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
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
        {/* Header - Conditional based on device */}
        {isMobile ? (
          <div className="relative">
            <BackButton
              fallback="/admin/dashboard"
              className="absolute top-4 left-4 z-10"
            />
            <WebHeader
              title="User Management"
              breadcrumbs={[
                { label: "Admin Dashboard", href: "/admin/dashboard" },
                { label: "User Management" },
              ]}
              actions={
                <Button onClick={() => setShowAddModal(true)} size="sm">
                  Add User
                </Button>
              }
            />
          </div>
        ) : (
          /* Original Desktop Header */
          <header
            className="px-8 py-6 border-b"
            style={{ borderColor: themeConfig.colors.border }}
          >
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center">
                <BackButton fallback="/admin/dashboard" className="mr-4" />
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
        )}

        {/* Main Content - Conditional based on device */}
        {isMobile ? (
          <div className="px-4 py-4">
            <div className="max-w-4xl mx-auto space-y-4">
              {/* Mobile Search and Filter */}
              <div
                className="bg-white rounded-lg border p-3"
                style={{ borderColor: "#E5E7EB" }}
              >
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm mb-3"
                  style={{
                    backgroundColor: "#F9FAFB",
                    borderColor: "#E5E7EB",
                    color: themeConfig.colors.text,
                    border: "1px solid",
                  }}
                />
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-3 py-2 rounded-lg border text-sm"
                    style={{
                      backgroundColor: "#F9FAFB",
                      borderColor: "#E5E7EB",
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
                    className="px-3 py-2 rounded-lg border text-sm"
                    style={{
                      backgroundColor: "#F9FAFB",
                      borderColor: "#E5E7EB",
                      color: themeConfig.colors.text,
                    }}
                  >
                    <option value="ALL">All Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Mobile User List */}
              <WebListGroup title="Users">
                {filteredUsers.map((user) => (
                  <WebListGroupItem
                    key={user.id}
                    title={user.name}
                    subtitle={`${user.email} • ${user.department}`}
                    rightElement={
                      <div className="flex flex-col items-end space-y-1">
                        <span
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor:
                              user.role === "ADMIN"
                                ? `${themeConfig.colors.primary}20`
                                : user.role === "STAFF"
                                  ? `${themeConfig.colors.secondary}20`
                                  : `${themeConfig.colors.success}20`,
                            color:
                              user.role === "ADMIN"
                                ? themeConfig.colors.primary
                                : user.role === "STAFF"
                                  ? themeConfig.colors.secondary
                                  : themeConfig.colors.success,
                          }}
                        >
                          {user.role}
                        </span>
                        <span
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor:
                              user.status === "ACTIVE"
                                ? `${themeConfig.colors.success}20`
                                : `${themeConfig.colors.error}20`,
                            color:
                              user.status === "ACTIVE"
                                ? themeConfig.colors.success
                                : themeConfig.colors.error,
                          }}
                        >
                          {user.status}
                        </span>
                      </div>
                    }
                    onClick={() => {
                      setSelectedUser(user);
                      setShowEditModal(true);
                    }}
                  />
                ))}
              </WebListGroup>
            </div>
          </div>
        ) : (
          /* Original Desktop Layout */
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
        )}

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
