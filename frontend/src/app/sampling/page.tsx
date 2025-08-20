"use client";
import { useState } from "react";

const SamplingPage = () => {
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/dutyAssignment/generate-assignments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId: "64dceac58e97be3a5f0c236a", // TODO: Replace dynamically if needed
            overallVenueId: "68a554bde0fb337aa95a39c3", // TODO: Replace dynamically if needed
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert(
          `✅ ${data.message}\nAssignments Created: ${data.assignmentsCreated}`
        );
      } else {
        alert(`❌ Failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error generating assignments:", error);
      alert("Something went wrong while generating the report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={handleGenerateReport}
        disabled={loading}
        className={`px-6 py-3 rounded-lg font-semibold shadow-md transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {loading ? "Generating..." : "Generate Report"}
      </button>
    </div>
  );
};

export default SamplingPage;
