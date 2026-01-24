"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GuestRequestPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    description: "",
    category: "PLUMBING",
    priority: "MEDIUM",
    location: "",
    isVisitor: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // TODO: Implement guest request submission to database
      console.log("Guest maintenance request submitted:", formData);

      // Simulate successful submission
      setTimeout(() => {
        setSuccess(true);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError("An error occurred while submitting your request");
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#1B4332] mb-4">
            Request Submitted Successfully!
          </h1>
          <p className="text-[#64748B] mb-8">
            Your maintenance request has been submitted. We'll review it and get
            back to you soon.
          </p>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg text-left">
              <h3 className="font-semibold text-[#1B4332] mb-2">
                Request Details:
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Title:</strong> {formData.title}
                </p>
                <p>
                  <strong>Location:</strong> {formData.location}
                </p>
                <p>
                  <strong>Category:</strong> {formData.category}
                </p>
                <p>
                  <strong>Priority:</strong> {formData.priority}
                </p>
                <p>
                  <strong>Contact Email:</strong> {formData.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push("/")}
              className="w-full py-3 px-4 bg-[#1B4332] text-white font-medium rounded-lg hover:bg-[#2d5a47] focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:ring-offset-2 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Guest Request Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl mb-4">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-purple-600 mb-2">
              Guest Maintenance Request
            </h1>
            <p className="text-[#64748B]">
              Submit a maintenance request without creating an account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-600">
                Contact Information
              </h3>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-purple-600 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 placeholder-gray-600 focus:placeholder-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-purple-600 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 placeholder-gray-600 focus:placeholder-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-purple-600 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 placeholder-gray-600 focus:placeholder-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            {/* Request Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-600">
                Request Details
              </h3>

              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-purple-600 mb-2"
                >
                  Request Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 placeholder-gray-600 focus:placeholder-transparent"
                  placeholder="Brief description of the issue"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-purple-600 mb-2"
                >
                  Detailed Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 placeholder-gray-600 focus:placeholder-transparent"
                  placeholder="Provide detailed information about the maintenance issue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-purple-600 mb-2"
                  >
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-700"
                  >
                    <option value="PLUMBING">Plumbing</option>
                    <option value="ELECTRICAL">Electrical</option>
                    <option value="CARPENTRY">Carpentry</option>
                    <option value="PERSONNEL">Personnel</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-purple-600 mb-2"
                  >
                    Priority *
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-700"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-purple-600 mb-2"
                >
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 placeholder-gray-600 focus:placeholder-transparent"
                  placeholder="Building, room, or specific location"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Submitting..." : "Submit Request"}
            </button>
          </form>

          {/* Navigation */}
          <div className="mt-6 text-center space-y-2">
            <button
              onClick={() => router.push("/auth")}
              className="text-sm text-[#64748B] hover:text-purple-600 block"
            >
              ← Different user type?
            </button>
            <button
              onClick={() => router.push("/")}
              className="text-sm text-[#64748B] hover:text-purple-600 block"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Guest Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-purple-700 items-center justify-center p-8">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-bold mb-4">Quick & Easy Access</h2>
            <p className="text-lg text-white/80 leading-relaxed">
              No account required. Submit maintenance requests quickly as a
              visitor or guest.
            </p>
          </div>

          {/* Guest Benefits */}
          <div className="space-y-4 mt-12">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-left text-sm text-white/80">
                No registration required
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-left text-sm text-white/80">
                Quick submission process
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <p className="text-left text-sm text-white/80">
                Email updates on request status
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
