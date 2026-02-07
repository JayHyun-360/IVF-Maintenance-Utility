"use client";

// Physical Plant Request Form - Mobile/Desktop Conditional Version
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Z_INDEX } from "@/lib/z-index";
import AuthGuard from "@/components/AuthGuard";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import WebHeader from "@/components/WebHeader";
import { WebForm, WebFormField, WebFormSection } from "@/components/WebForm";

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
}

export default function PhysicalPlantRequestPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const printRef = useRef<HTMLDivElement>(null);

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

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Record<string, string | number>) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Physical Plant Request submitted successfully!");
    setIsLoading(false);

    // Reset form or redirect as needed
    router.push("/admin/dashboard");
  };

  const handlePrint = () => {
    // Only run on client-side
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  return (
    <AuthGuard requiredRole="ADMIN">
      <div
        className="min-h-screen"
        style={{ backgroundColor: themeConfig.colors.background }}
      >
        {/* Header - Conditional based on device */}
        {isMobile ? (
          <WebHeader
            title="Physical Plant Request"
            breadcrumbs={[
              { label: "Admin Dashboard", href: "/admin/dashboard" },
              { label: "Physical Plant Request" },
            ]}
            actions={
              <div style={{ zIndex: Z_INDEX.MAX, position: "relative" }}>
                <ThemeSwitcher />
              </div>
            }
          />
        ) : (
          /* Original Desktop Header */
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
                  <div style={{ zIndex: Z_INDEX.MAX, position: "relative" }}>
                    <ThemeSwitcher />
                  </div>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Main Content - Conditional based on device */}
        {isMobile ? (
          <div className="px-4 py-4">
            <div className="max-w-4xl mx-auto">
              <WebForm
                title="Physical Plant Request"
                subtitle="Submit a facilities maintenance request"
                onSubmit={handleSubmit}
                loading={isLoading}
                submitText="Submit Request"
              >
                <WebFormSection title="Request Type">
                  <div className="space-y-3">
                    {[
                      { key: "plumbing", label: "Plumbing" },
                      { key: "carpentry", label: "Carpentry" },
                      { key: "electrical", label: "Electrical" },
                      { key: "personnelServices", label: "Personnel Services" },
                    ].map(({ key, label }) => (
                      <label
                        key={key}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <input
                          type="checkbox"
                          checked={
                            formData.requestType[
                              key as keyof typeof formData.requestType
                            ]
                          }
                          onChange={(e) => {
                            const newRequestType = {
                              ...formData.requestType,
                            };
                            newRequestType[
                              key as keyof typeof formData.requestType
                            ] = e.target.checked;
                            setFormData({
                              ...formData,
                              requestType: newRequestType,
                            });
                          }}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span
                          className="text-sm font-medium"
                          style={{ color: themeConfig.colors.text }}
                        >
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </WebFormSection>

                <WebFormSection title="Request Details">
                  <WebFormField
                    name="urgency"
                    label="Urgency"
                    type="select"
                    options={[
                      { label: "Not Urgent", value: "not_urgent" },
                      { label: "Urgent", value: "urgent" },
                      { label: "Very Urgent", value: "very_urgent" },
                    ]}
                  />
                  <WebFormField
                    name="date"
                    label="Date Needed"
                    type="date"
                    required
                  />
                  <WebFormField
                    name="time"
                    label="Time Needed"
                    type="time"
                    required
                  />
                  <WebFormField
                    name="location"
                    label="Location"
                    placeholder="Building, room, or area"
                    required
                  />
                  <WebFormField
                    name="description"
                    label="Description"
                    type="textarea"
                    placeholder="Describe the issue or work needed..."
                    required
                  />
                </WebFormSection>
              </WebForm>
            </div>
          </div>
        ) : (
          /* Original Desktop Layout */
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {/* Form Container */}
                  <div
                    ref={printRef}
                    className="rounded-xl shadow-lg p-8"
                    style={{
                      backgroundColor: themeConfig.colors.surface,
                      border: `2px solid ${themeConfig.colors.primary}`,
                    }}
                  >
                    {/* Header */}
                    <div className="text-center mb-8">
                      <h1
                        className="text-2xl font-bold mb-2"
                        style={{ color: themeConfig.colors.primary }}
                      >
                        PHYSICAL PLANT / FACILITIES REQUEST
                      </h1>
                      <p
                        className="text-lg font-semibold"
                        style={{ color: themeConfig.colors.primary }}
                      >
                        DE LA SALLE JOHN BOSCO COLLEGE
                      </p>
                    </div>

                    {/* Nature of Request */}
                    <div className="mb-8">
                      <h3
                        className="font-bold mb-4 text-lg"
                        style={{ color: themeConfig.colors.primary }}
                      >
                        Nature of Request:
                      </h3>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {[
                          { key: "plumbing", label: "Plumbing" },
                          { key: "carpentry", label: "Carpentry" },
                          { key: "electrical", label: "Electrical" },
                          {
                            key: "personnelServices",
                            label: "Personnel Services",
                          },
                        ].map(({ key, label }) => (
                          <label
                            key={key}
                            className="flex items-center space-x-2"
                          >
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
                              style={{
                                accentColor: themeConfig.colors.primary,
                              }}
                            />
                            <span
                              className="font-medium"
                              style={{ color: themeConfig.colors.text }}
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
                          style={{ color: themeConfig.colors.primary }}
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
                                style={{
                                  accentColor: themeConfig.colors.primary,
                                }}
                              />
                              <span style={{ color: themeConfig.colors.text }}>
                                {label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Date and Time */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            className="block font-semibold mb-1"
                            style={{ color: themeConfig.colors.text }}
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
                            style={{
                              backgroundColor: themeConfig.colors.background,
                              borderColor: themeConfig.colors.border,
                              color: themeConfig.colors.text,
                            }}
                          />
                        </div>
                        <div>
                          <label
                            className="block font-semibold mb-1"
                            style={{ color: themeConfig.colors.text }}
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
                            style={{
                              backgroundColor: themeConfig.colors.background,
                              borderColor: themeConfig.colors.border,
                              color: themeConfig.colors.text,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Details of Request */}
                    <div className="mb-8">
                      <h3
                        className="font-bold mb-4 text-lg"
                        style={{ color: themeConfig.colors.primary }}
                      >
                        Details of Request:
                      </h3>
                      <div className="overflow-x-auto">
                        <table
                          className="w-full border-collapse border"
                          style={{ borderColor: themeConfig.colors.border }}
                        >
                          <thead>
                            <tr
                              style={{
                                backgroundColor: themeConfig.colors.primary,
                                color: "white",
                              }}
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
                                    style={{
                                      backgroundColor:
                                        themeConfig.colors.background,
                                      borderColor: themeConfig.colors.border,
                                      color: themeConfig.colors.text,
                                    }}
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
                                    style={{
                                      backgroundColor:
                                        themeConfig.colors.background,
                                      borderColor: themeConfig.colors.border,
                                      color: themeConfig.colors.text,
                                    }}
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
                                    style={{
                                      backgroundColor:
                                        themeConfig.colors.background,
                                      borderColor: themeConfig.colors.border,
                                      color: themeConfig.colors.text,
                                    }}
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
                                    style={{
                                      backgroundColor:
                                        themeConfig.colors.background,
                                      borderColor: themeConfig.colors.border,
                                      color: themeConfig.colors.text,
                                    }}
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
                          backgroundColor: themeConfig.colors.primary,
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
                        style={{ color: themeConfig.colors.primary }}
                      >
                        Requestor Information:
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label
                            className="block font-semibold mb-1"
                            style={{ color: themeConfig.colors.text }}
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
                            style={{
                              backgroundColor: themeConfig.colors.background,
                              borderColor: themeConfig.colors.border,
                              color: themeConfig.colors.text,
                            }}
                          />
                        </div>
                        <div>
                          <label
                            className="block font-semibold mb-1"
                            style={{ color: themeConfig.colors.text }}
                          >
                            Name of Employee
                          </label>
                          <input
                            type="text"
                            value={formData.nameOfEmployee}
                            onChange={(e) =>
                              handleInputChange(
                                "nameOfEmployee",
                                e.target.value,
                              )
                            }
                            className="w-full p-2 border rounded"
                            style={{
                              backgroundColor: themeConfig.colors.background,
                              borderColor: themeConfig.colors.border,
                              color: themeConfig.colors.text,
                            }}
                          />
                        </div>
                        <div>
                          <label
                            className="block font-semibold mb-1"
                            style={{ color: themeConfig.colors.text }}
                          >
                            Department Head
                          </label>
                          <input
                            type="text"
                            value={formData.departmentHead}
                            onChange={(e) =>
                              handleInputChange(
                                "departmentHead",
                                e.target.value,
                              )
                            }
                            className="w-full p-2 border rounded"
                            style={{
                              backgroundColor: themeConfig.colors.background,
                              borderColor: themeConfig.colors.border,
                              color: themeConfig.colors.text,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Approval and Work Evaluation */}
                    <div className="mb-8">
                      <h3
                        className="font-bold mb-4 text-lg"
                        style={{ color: themeConfig.colors.primary }}
                      >
                        Approval and Work Evaluation:
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            className="block font-semibold mb-1"
                            style={{ color: themeConfig.colors.text }}
                          >
                            Approved by: Administrative Affairs & Services
                            Division
                          </label>
                          <input
                            type="text"
                            value={formData.approvedBy}
                            onChange={(e) =>
                              handleInputChange("approvedBy", e.target.value)
                            }
                            className="w-full p-2 border rounded"
                            style={{
                              backgroundColor: themeConfig.colors.background,
                              borderColor: themeConfig.colors.border,
                              color: themeConfig.colors.text,
                            }}
                          />
                        </div>
                        <div>
                          <label
                            className="block font-semibold mb-1"
                            style={{ color: themeConfig.colors.text }}
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
                            style={{
                              backgroundColor: themeConfig.colors.background,
                              borderColor: themeConfig.colors.border,
                              color: themeConfig.colors.text,
                            }}
                          />
                        </div>
                        <div>
                          <label
                            className="block font-semibold mb-1"
                            style={{ color: themeConfig.colors.text }}
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
                            style={{
                              backgroundColor: themeConfig.colors.background,
                              borderColor: themeConfig.colors.border,
                              color: themeConfig.colors.text,
                            }}
                          />
                        </div>
                        <div>
                          <label
                            className="block font-semibold mb-1"
                            style={{ color: themeConfig.colors.text }}
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
                            style={{
                              backgroundColor: themeConfig.colors.background,
                              borderColor: themeConfig.colors.border,
                              color: themeConfig.colors.text,
                            }}
                          />
                        </div>
                        <div>
                          <label
                            className="block font-semibold mb-1"
                            style={{ color: themeConfig.colors.text }}
                          >
                            Date/Time Received
                          </label>
                          <input
                            type="datetime-local"
                            value={formData.dateTimeReceived}
                            onChange={(e) =>
                              handleInputChange(
                                "dateTimeReceived",
                                e.target.value,
                              )
                            }
                            className="w-full p-2 border rounded"
                            style={{
                              backgroundColor: themeConfig.colors.background,
                              borderColor: themeConfig.colors.border,
                              color: themeConfig.colors.text,
                            }}
                          />
                        </div>
                        <div>
                          <label
                            className="block font-semibold mb-1"
                            style={{ color: themeConfig.colors.text }}
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
                            style={{
                              backgroundColor: themeConfig.colors.background,
                              borderColor: themeConfig.colors.border,
                              color: themeConfig.colors.text,
                            }}
                          />
                        </div>
                        <div>
                          <label
                            className="block font-semibold mb-1"
                            style={{ color: themeConfig.colors.text }}
                          >
                            Date/Time Completed
                          </label>
                          <input
                            type="datetime-local"
                            value={formData.dateTimeCompleted}
                            onChange={(e) =>
                              handleInputChange(
                                "dateTimeCompleted",
                                e.target.value,
                              )
                            }
                            className="w-full p-2 border rounded"
                            style={{
                              backgroundColor: themeConfig.colors.background,
                              borderColor: themeConfig.colors.border,
                              color: themeConfig.colors.text,
                            }}
                          />
                        </div>
                        <div>
                          <label
                            className="block font-semibold mb-1"
                            style={{ color: themeConfig.colors.text }}
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
                            style={{
                              backgroundColor: themeConfig.colors.background,
                              borderColor: themeConfig.colors.border,
                              color: themeConfig.colors.text,
                            }}
                          />
                        </div>
                      </div>

                      {/* Work Evaluation */}
                      <div className="mt-6">
                        <h4
                          className="font-semibold mb-4"
                          style={{ color: themeConfig.colors.text }}
                        >
                          Work Evaluation:
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            {
                              label: "Outstanding",
                              desc: "All work completed exceeds expectations",
                            },
                            {
                              label: "Very Satisfactory",
                              desc: "All work completed meets expectations",
                            },
                            {
                              label: "Satisfactory",
                              desc: "Work completed with minor issues",
                            },
                            {
                              label: "Poor",
                              desc: "Work completed with major issues",
                            },
                          ].map(({ label, desc }, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <div
                                className="w-4 h-4 mt-1 rounded-full border-2"
                                style={{
                                  borderColor: themeConfig.colors.border,
                                  backgroundColor:
                                    themeConfig.colors.background,
                                }}
                              />
                              <div>
                                <span
                                  className="font-medium"
                                  style={{ color: themeConfig.colors.text }}
                                >
                                  {label}
                                </span>
                                <p
                                  className="text-sm"
                                  style={{
                                    color: themeConfig.colors.textSecondary,
                                  }}
                                >
                                  {desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="flex-1 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: themeConfig.colors.primary,
                        color: "white",
                      }}
                    >
                      🖨️ Print Form
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
                </div>
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
                      <p
                        className="text-sm"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
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
                      <p
                        className="text-sm"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Provide specific location, problem description, and
                        required actions.
                      </p>
                    </div>
                    <div>
                      <h4
                        className="font-medium mb-1"
                        style={{ color: themeConfig.colors.text }}
                      >
                        3. Requestor Information
                      </h4>
                      <p
                        className="text-sm"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
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
                      <p
                        className="text-sm"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Use the Print Form button to generate a printable
                        version.
                      </p>
                    </div>
                  </div>

                  <div
                    className="mt-6 p-4 rounded-xl"
                    style={{
                      backgroundColor: `${themeConfig.colors.primary}10`,
                    }}
                  >
                    <h4
                      className="font-medium mb-2"
                      style={{ color: themeConfig.colors.primary }}
                    >
                      💡 Tip
                    </h4>
                    <p
                      className="text-sm"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      You can add multiple request rows by clicking the &quot;+
                      Add Row&quot; button in the Details section.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
