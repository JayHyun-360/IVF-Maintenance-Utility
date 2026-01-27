"use client";

// Physical Plant Request Form - Desktop Only Version
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";

interface FormData {
  // Nature of Request
  requestType: {
    plumbing: boolean;
    carpentry: boolean;
    electrical: boolean;
    personnelServices: boolean;
  };
  urgency: "very_urgent" | "urgent" | "not_urgent";
  date: string;
  time: string;

  // Details of Request
  requests: Array<{
    location: string;
    description: string;
    whatWillBeDone: string;
    supportingReason: string;
  }>;

  // Requestor Information
  requestedBy: string;
  nameOfEmployee: string;
  departmentHead: string;

  // Approval and Work Evaluation
  approvedBy: string;
  vpAASD: string;
  receivedBy: string;
  gmsHead: string;
  dateTimeReceived: string;
  performedBy: string;
  dateTimeCompleted: string;
  acknowledgeBy: string;
  workEvaluation: "outstanding" | "very_satisfactory" | "satisfactory" | "poor";
  workEvaluationEnabled: boolean;
}

export default function PhysicalPlantRequestPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const printRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    requestType: {
      plumbing: false,
      carpentry: false,
      electrical: false,
      personnelServices: false,
    },
    urgency: "not_urgent",
    date: "",
    time: "",
    requests: [
      {
        location: "",
        description: "",
        whatWillBeDone: "",
        supportingReason: "",
      },
    ],
    requestedBy: "",
    nameOfEmployee: "",
    departmentHead: "",
    approvedBy: "",
    vpAASD: "",
    receivedBy: "",
    gmsHead: "",
    dateTimeReceived: "",
    performedBy: "",
    dateTimeCompleted: "",
    acknowledgeBy: "",
    workEvaluation: "satisfactory",
    workEvaluationEnabled: true,
  });

  const handleRequestTypeChange = (type: keyof typeof formData.requestType) => {
    setFormData((prev) => ({
      ...prev,
      requestType: {
        ...prev.requestType,
        [type]: !prev.requestType[type],
      },
    }));
  };

  const handleRequestChange = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      requests: prev.requests.map((req, i) =>
        i === index ? { ...req, [field]: value } : req,
      ),
    }));
  };

  const addRequestRow = () => {
    setFormData((prev) => ({
      ...prev,
      requests: [
        ...prev.requests,
        {
          location: "",
          description: "",
          whatWillBeDone: "",
          supportingReason: "",
        },
      ],
    }));
  };

  const removeRequestRow = (index: number) => {
    if (formData.requests.length > 1) {
      setFormData((prev) => ({
        ...prev,
        requests: prev.requests.filter((_, i) => i !== index),
      }));
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggleWorkEvaluation = () => {
    setFormData((prev) => ({
      ...prev,
      workEvaluationEnabled: !prev.workEvaluationEnabled,
    }));
  };

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Physical plant request submitted successfully!");
      router.push("/admin/dashboard");
    } catch (error) {
      alert("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: themeConfig.colors.background }}
    >
      {/* Header */}
      <header
        className="border-b"
        style={{ borderColor: themeConfig.colors.border }}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="p-2 rounded-xl mr-4 transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  color: themeConfig.colors.text,
                  border: `1px solid ${themeConfig.colors.border}`,
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
              <h1
                className="text-xl font-bold"
                style={{ color: themeConfig.colors.text }}
              >
                Physical Plant/Facilities Request
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: themeConfig.colors.primary,
                  color: "white",
                }}
              >
                🖨️ Print Form
              </button>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Container */}
              <div
                ref={printRef}
                className="rounded-xl shadow-lg p-8 bg-white"
                style={{ border: "2px solid #1B4332" }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <h1
                    className="text-2xl font-bold mb-2"
                    style={{ color: "#1B4332" }}
                  >
                    PHYSICAL PLANT / FACILITIES REQUEST
                  </h1>
                  <p
                    className="text-lg font-semibold"
                    style={{ color: "#1B4332" }}
                  >
                    DE LA SALLE JOHN BOSCO COLLEGE
                  </p>
                </div>

                {/* Nature of Request */}
                <div className="mb-8">
                  <h3
                    className="font-bold mb-4 text-lg"
                    style={{ color: "#1B4332" }}
                  >
                    Nature of Request:
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {[
                      { key: "plumbing", label: "Plumbing" },
                      { key: "carpentry", label: "Carpentry" },
                      { key: "electrical", label: "Electrical" },
                      { key: "personnelServices", label: "Personnel Services" },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={
                            formData.requestType[
                              key as keyof typeof formData.requestType
                            ]
                          }
                          onChange={() =>
                            handleRequestTypeChange(
                              key as keyof typeof formData.requestType,
                            )
                          }
                          className="w-4 h-4"
                          style={{ accentColor: "#1B4332" }}
                        />
                        <span
                          className="font-medium"
                          style={{ color: "#1B4332" }}
                        >
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Urgency Level */}
                  <div className="mb-4">
                    <h4
                      className="font-semibold mb-2"
                      style={{ color: "#1B4332" }}
                    >
                      Urgency:
                    </h4>
                    <div className="space-y-2">
                      {[
                        {
                          value: "very_urgent",
                          label: "Very Urgent/Emergency",
                        },
                        { value: "urgent", label: "Urgent" },
                        { value: "not_urgent", label: "Not Urgent" },
                      ].map(({ value, label }) => (
                        <label
                          key={value}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            name="urgency"
                            value={value}
                            checked={formData.urgency === value}
                            onChange={(e) =>
                              handleInputChange("urgency", e.target.value)
                            }
                            className="w-4 h-4"
                            style={{ accentColor: "#1B4332" }}
                          />
                          <span style={{ color: "#1B4332" }}>{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block font-semibold mb-1"
                        style={{ color: "#1B4332" }}
                      >
                        Date:
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          handleInputChange("date", e.target.value)
                        }
                        className="w-full p-2 border rounded"
                        style={{ borderColor: "#1B4332" }}
                      />
                    </div>
                    <div>
                      <label
                        className="block font-semibold mb-1"
                        style={{ color: "#1B4332" }}
                      >
                        Time:
                      </label>
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) =>
                          handleInputChange("time", e.target.value)
                        }
                        className="w-full p-2 border rounded"
                        style={{ borderColor: "#1B4332" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Details of Request */}
                <div className="mb-8">
                  <h3
                    className="font-bold mb-4 text-lg"
                    style={{ color: "#1B4332" }}
                  >
                    Details of Request:
                  </h3>
                  <div className="overflow-x-auto">
                    <table
                      className="w-full border-collapse border"
                      style={{ borderColor: "#1B4332" }}
                    >
                      <thead>
                        <tr
                          style={{ backgroundColor: "#1B4332", color: "white" }}
                        >
                          <th className="border p-2 text-left">Location</th>
                          <th className="border p-2 text-left">
                            Description of Problem
                          </th>
                          <th className="border p-2 text-left">
                            What will be done
                          </th>
                          <th className="border p-2 text-left">
                            Supporting Reason(s)
                          </th>
                          <th className="border p-2 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.requests.map((request, index) => (
                          <tr key={index}>
                            <td className="border p-2">
                              <input
                                type="text"
                                value={request.location}
                                onChange={(e) =>
                                  handleRequestChange(
                                    index,
                                    "location",
                                    e.target.value,
                                  )
                                }
                                className="w-full p-1 border rounded"
                                style={{ borderColor: "#1B4332" }}
                              />
                            </td>
                            <td className="border p-2">
                              <textarea
                                value={request.description}
                                onChange={(e) =>
                                  handleRequestChange(
                                    index,
                                    "description",
                                    e.target.value,
                                  )
                                }
                                className="w-full p-1 border rounded"
                                style={{ borderColor: "#1B4332" }}
                                rows={2}
                              />
                            </td>
                            <td className="border p-2">
                              <textarea
                                value={request.whatWillBeDone}
                                onChange={(e) =>
                                  handleRequestChange(
                                    index,
                                    "whatWillBeDone",
                                    e.target.value,
                                  )
                                }
                                className="w-full p-1 border rounded"
                                style={{ borderColor: "#1B4332" }}
                                rows={2}
                              />
                            </td>
                            <td className="border p-2">
                              <textarea
                                value={request.supportingReason}
                                onChange={(e) =>
                                  handleRequestChange(
                                    index,
                                    "supportingReason",
                                    e.target.value,
                                  )
                                }
                                className="w-full p-1 border rounded"
                                style={{ borderColor: "#1B4332" }}
                                rows={2}
                              />
                            </td>
                            <td className="border p-2 text-center">
                              <button
                                type="button"
                                onClick={() => removeRequestRow(index)}
                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                disabled={formData.requests.length === 1}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    type="button"
                    onClick={addRequestRow}
                    className="mt-4 px-4 py-2 rounded transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: "#1B4332",
                      color: "white",
                    }}
                  >
                    + Add Row
                  </button>
                </div>

                {/* Requestor Information */}
                <div className="mb-8">
                  <h3
                    className="font-bold mb-4 text-lg"
                    style={{ color: "#1B4332" }}
                  >
                    Requestor Information:
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label
                        className="block font-semibold mb-1"
                        style={{ color: "#1B4332" }}
                      >
                        Requested by: (Requesting Department)
                      </label>
                      <input
                        type="text"
                        value={formData.requestedBy}
                        onChange={(e) =>
                          handleInputChange("requestedBy", e.target.value)
                        }
                        className="w-full p-2 border rounded"
                        style={{ borderColor: "#1B4332" }}
                      />
                    </div>
                    <div>
                      <label
                        className="block font-semibold mb-1"
                        style={{ color: "#1B4332" }}
                      >
                        Name of Employee
                      </label>
                      <input
                        type="text"
                        value={formData.nameOfEmployee}
                        onChange={(e) =>
                          handleInputChange("nameOfEmployee", e.target.value)
                        }
                        className="w-full p-2 border rounded"
                        style={{ borderColor: "#1B4332" }}
                      />
                    </div>
                    <div>
                      <label
                        className="block font-semibold mb-1"
                        style={{ color: "#1B4332" }}
                      >
                        Department Head
                      </label>
                      <input
                        type="text"
                        value={formData.departmentHead}
                        onChange={(e) =>
                          handleInputChange("departmentHead", e.target.value)
                        }
                        className="w-full p-2 border rounded"
                        style={{ borderColor: "#1B4332" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Approval and Work Evaluation */}
                <div className="mb-8">
                  <h3
                    className="font-bold mb-4 text-lg"
                    style={{ color: "#1B4332" }}
                  >
                    Approval and Work Evaluation:
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block font-semibold mb-1"
                        style={{ color: "#1B4332" }}
                      >
                        Approved by: Administrative Affairs & Services Division
                      </label>
                      <input
                        type="text"
                        value={formData.approvedBy}
                        onChange={(e) =>
                          handleInputChange("approvedBy", e.target.value)
                        }
                        className="w-full p-2 border rounded"
                        style={{ borderColor: "#1B4332" }}
                      />
                    </div>
                    <div>
                      <label
                        className="block font-semibold mb-1"
                        style={{ color: "#1B4332" }}
                      >
                        VP - AASD
                      </label>
                      <input
                        type="text"
                        value={formData.vpAASD}
                        onChange={(e) =>
                          handleInputChange("vpAASD", e.target.value)
                        }
                        className="w-full p-2 border rounded"
                        style={{ borderColor: "#1B4332" }}
                      />
                    </div>
                    <div>
                      <label
                        className="block font-semibold mb-1"
                        style={{ color: "#1B4332" }}
                      >
                        Received by:
                      </label>
                      <input
                        type="text"
                        value={formData.receivedBy}
                        onChange={(e) =>
                          handleInputChange("receivedBy", e.target.value)
                        }
                        className="w-full p-2 border rounded"
                        style={{ borderColor: "#1B4332" }}
                      />
                    </div>
                    <div>
                      <label
                        className="block font-semibold mb-1"
                        style={{ color: "#1B4332" }}
                      >
                        GMS Head
                      </label>
                      <input
                        type="text"
                        value={formData.gmsHead}
                        onChange={(e) =>
                          handleInputChange("gmsHead", e.target.value)
                        }
                        className="w-full p-2 border rounded"
                        style={{ borderColor: "#1B4332" }}
                      />
                    </div>
                    <div>
                      <label
                        className="block font-semibold mb-1"
                        style={{ color: "#1B4332" }}
                      >
                        Date/Time Received
                      </label>
                      <input
                        type="datetime-local"
                        value={formData.dateTimeReceived}
                        onChange={(e) =>
                          handleInputChange("dateTimeReceived", e.target.value)
                        }
                        className="w-full p-2 border rounded"
                        style={{ borderColor: "#1B4332" }}
                      />
                    </div>
                    <div>
                      <label
                        className="block font-semibold mb-1"
                        style={{ color: "#1B4332" }}
                      >
                        Performed by:
                      </label>
                      <input
                        type="text"
                        value={formData.performedBy}
                        onChange={(e) =>
                          handleInputChange("performedBy", e.target.value)
                        }
                        className="w-full p-2 border rounded"
                        style={{ borderColor: "#1B4332" }}
                      />
                    </div>
                    <div>
                      <label
                        className="block font-semibold mb-1"
                        style={{ color: "#1B4332" }}
                      >
                        Date/Time Completed
                      </label>
                      <input
                        type="datetime-local"
                        value={formData.dateTimeCompleted}
                        onChange={(e) =>
                          handleInputChange("dateTimeCompleted", e.target.value)
                        }
                        className="w-full p-2 border rounded"
                        style={{ borderColor: "#1B4332" }}
                      />
                    </div>
                    <div>
                      <label
                        className="block font-semibold mb-1"
                        style={{ color: "#1B4332" }}
                      >
                        Acknowledge by:
                      </label>
                      <input
                        type="text"
                        value={formData.acknowledgeBy}
                        onChange={(e) =>
                          handleInputChange("acknowledgeBy", e.target.value)
                        }
                        className="w-full p-2 border rounded"
                        style={{ borderColor: "#1B4332" }}
                      />
                    </div>
                  </div>

                  {/* Work Evaluation */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4
                        className="font-semibold mb-0"
                        style={{ color: "#1B4332" }}
                      >
                        Work Evaluation:
                      </h4>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.workEvaluationEnabled}
                          onChange={handleToggleWorkEvaluation}
                          className="w-4 h-4"
                          style={{ accentColor: "#1B4332" }}
                        />
                        <span
                          className="text-sm font-medium"
                          style={{ color: "#1B4332" }}
                        >
                          Enable Evaluation
                        </span>
                      </label>
                    </div>

                    {formData.workEvaluationEnabled && (
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          {
                            value: "outstanding",
                            label: "Outstanding",
                            desc: "All work completed exceeds expectations",
                          },
                          {
                            value: "very_satisfactory",
                            label: "Very Satisfactory",
                            desc: "All work completed meets expectations",
                          },
                          {
                            value: "satisfactory",
                            label: "Satisfactory",
                            desc: "Work completed with minor issues",
                          },
                          {
                            value: "poor",
                            label: "Poor",
                            desc: "Work completed with major issues",
                          },
                        ].map(({ value, label, desc }) => (
                          <label
                            key={value}
                            className="flex items-start space-x-2"
                          >
                            <input
                              type="radio"
                              name="workEvaluation"
                              value={value}
                              checked={formData.workEvaluation === value}
                              onChange={(e) =>
                                handleInputChange(
                                  "workEvaluation",
                                  e.target.value,
                                )
                              }
                              className="w-4 h-4 mt-1"
                              style={{ accentColor: "#1B4332" }}
                            />
                            <div>
                              <span
                                className="font-medium"
                                style={{ color: "#1B4332" }}
                              >
                                {label}
                              </span>
                              <p
                                className="text-sm"
                                style={{ color: "#374151" }}
                              >
                                {desc}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}

                    {!formData.workEvaluationEnabled && (
                      <div
                        className="p-4 rounded-lg text-center"
                        style={{
                          backgroundColor: "#F3F4F6",
                          border: "1px solid #E5E7EB",
                        }}
                      >
                        <p className="text-sm" style={{ color: "#6B7280" }}>
                          Work evaluation is currently disabled. Toggle the
                          switch above to enable evaluation options.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                  style={{
                    backgroundColor: "#1B4332",
                    color: "white",
                  }}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/admin/dashboard")}
                  className="px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: themeConfig.colors.surface,
                    color: themeConfig.colors.text,
                    border: `1px solid ${themeConfig.colors.border}`,
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Instructions Panel */}
          <div className="lg:col-span-1">
            <div
              className="rounded-xl shadow-lg p-6 sticky top-8"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
                border: "1px solid",
              }}
            >
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: themeConfig.colors.text }}
              >
                📋 Instructions
              </h3>
              <div className="space-y-3">
                <div>
                  <h4
                    className="font-medium mb-1"
                    style={{ color: themeConfig.colors.text }}
                  >
                    1. Nature of Request
                  </h4>
                  <p className="text-sm" style={{ color: "#4B5563" }}>
                    Select the type of service needed and urgency level.
                  </p>
                </div>
                <div>
                  <h4
                    className="font-medium mb-1"
                    style={{ color: themeConfig.colors.text }}
                  >
                    2. Details of Request
                  </h4>
                  <p className="text-sm" style={{ color: "#4B5563" }}>
                    Provide specific location, problem description, and required
                    actions.
                  </p>
                </div>
                <div>
                  <h4
                    className="font-medium mb-1"
                    style={{ color: themeConfig.colors.text }}
                  >
                    3. Requestor Information
                  </h4>
                  <p className="text-sm" style={{ color: "#4B5563" }}>
                    Fill in your details and department information.
                  </p>
                </div>
                <div>
                  <h4
                    className="font-medium mb-1"
                    style={{ color: themeConfig.colors.text }}
                  >
                    4. Print Option
                  </h4>
                  <p className="text-sm" style={{ color: "#4B5563" }}>
                    Use the Print Form button to generate a printable version.
                  </p>
                </div>
              </div>

              <div
                className="mt-6 p-4 rounded-xl"
                style={{ backgroundColor: "#1B433210" }}
              >
                <h4 className="font-medium mb-2" style={{ color: "#1B4332" }}>
                  💡 Tip
                </h4>
                <p className="text-sm" style={{ color: "#4B5563" }}>
                  You can add multiple request rows by clicking the "+ Add Row"
                  button in the Details section.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
