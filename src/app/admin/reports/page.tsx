"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  requestedBy: string;
  createdAt: string;
  completedAt?: string;
}

export default function Reports() {
  const { data: session } = useSession();
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const mockReports: Report[] = [
      {
        id: "1",
        title: "Leaky Faucet in Room 201",
        description: "The faucet in the men's restroom is constantly dripping",
        category: "Plumbing",
        status: "Pending",
        priority: "Medium",
        requestedBy: "John Student",
        createdAt: "2024-01-15T10:30:00Z",
      },
      {
        id: "2",
        title: "Broken Light Fixture",
        description:
          "The overhead light fixture in the main hallway is flickering",
        category: "Electrical",
        status: "In Progress",
        priority: "High",
        requestedBy: "Jane Student",
        createdAt: "2024-01-14T14:20:00Z",
      },
      {
        id: "3",
        title: "Broken Door Handle",
        description: "The door handle to the conference room is broken",
        category: "Carpentry",
        status: "Completed",
        priority: "Medium",
        requestedBy: "Mike Student",
        createdAt: "2024-01-13T09:15:00Z",
        completedAt: "2024-01-14T16:30:00Z",
      },
    ];
    setReports(mockReports);
  }, []);

  const filteredReports = reports.filter((report) => {
    const matchesFilter =
      filter === "all" || report.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch = report.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1B4332]">Reports</h1>
          <p className="text-[#64748B] mt-2">
            View and manage maintenance reports
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332]"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Requested By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {report.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {report.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {report.category}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(report.status)}`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {report.priority}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {report.requestedBy}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
