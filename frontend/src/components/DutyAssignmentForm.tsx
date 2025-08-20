"use client";
import React, { useState } from "react";
import InstructionCategoryInput from "./InstructionCategory";
import { useRouter } from "next/navigation";

const DutyAssignmentForm: React.FC = () => {
  const [testTitle, setTestTitle] = useState("");
  const [testDate, setTestDate] = useState("");
  const [totalApplicants, setTotalApplicants] = useState<number>(0);
  const router = useRouter();

  const [instructionFields, setInstructionFields] = useState<{
    [category: string]: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const instructionsArray = Object.entries(instructionFields).map(
      ([role, content]) => ({ role, content })
    );

    // ✅ Payload now includes backend-only fields with safe defaults
    const payload = {
      testTitle,
      testDate,
      totalApplicants,
      instructions: instructionsArray,
      overallTestInchargeId: null,
      overallCentreInchargeMainId: null,
      overallCentreInchargeSubId: null,
      testingAdministratorsIds: [], // empty array default
    };

    try {
      const res = await fetch(
        "http://localhost:5000/api/test-events/save-or-update",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to save duty assignment");
      }

      const data = await res.json();
      console.log("✅ Duty Assignment Saved to Backend:", data);

      alert("✅ Duty assignment saved successfully!");
      router.push("/venue-form");
    } catch (error) {
      console.error("❌ Error saving duty assignment:", error);
      alert("❌ Failed to save duty assignment. Check console for details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto bg-white p-8 rounded-3xl shadow-xl mt-10 border border-gray-200"
    >
      <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
        📝 <span>Duty Assignment Form</span>
      </h1>

      {/* Input Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Test Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            📘 Test Title
          </label>
          <input
            type="text"
            value={testTitle}
            onChange={(e) => setTestTitle(e.target.value)}
            placeholder="e.g. Entry Test 2025"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            required
          />
        </div>

        {/* Test Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            📅 Test Date
          </label>
          <input
            type="date"
            value={testDate}
            onChange={(e) => setTestDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            required
          />
        </div>

        {/* Total Applicants */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            👥 Total Applicants
          </label>
          <input
            type="number"
            value={totalApplicants}
            onChange={(e) => setTotalApplicants(Number(e.target.value))}
            placeholder="e.g. 1500"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            required
          />
        </div>
      </div>

      {/* Instruction Category Section */}
      <InstructionCategoryInput
        instructionFields={instructionFields}
        setInstructionFields={setInstructionFields}
        onSaveInstructions={() => alert("✅ Instructions saved in form state.")}
      />

      {/* Submit Button */}
      <div className="mt-10 text-center">
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-8 py-3 rounded-2xl shadow-md hover:bg-blue-700 transition duration-200"
        >
          Save and Continue
        </button>
      </div>
    </form>
  );
};

export default DutyAssignmentForm;
