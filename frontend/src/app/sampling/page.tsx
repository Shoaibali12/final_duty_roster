"use client";
import { useState } from "react";

const SamplingPage = () => {
  const [selectedSampling, setSelectedSampling] = useState<string>("");

  const handleApply = () => {
    if (!selectedSampling) {
      alert("Please select a sampling algorithm.");
      return;
    }
    alert(`Applying duty assignment with: ${selectedSampling}`);
    // TODO: Add your duty assignment logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-10 sm:p-12">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
          Select Sampling Algorithm
        </h1>

        <div className="flex flex-col space-y-6 mb-10">
          {[
            "Random Sampling",
            "Stratified Random Sampling",
            "Convenient Sampling",
          ].map((option) => (
            <label
              key={option}
              className="relative flex cursor-pointer items-center space-x-5 rounded-lg border border-gray-300 px-5 py-4 hover:border-blue-500 transition"
            >
              <input
                type="radio"
                name="sampling"
                value={option}
                checked={selectedSampling === option}
                onChange={(e) => setSelectedSampling(e.target.value)}
                className="peer sr-only"
              />
              <div
                className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-gray-400
            peer-checked:border-blue-600 transition"
                aria-hidden="true"
              >
                <div className="w-3.5 h-3.5 rounded-full bg-blue-600 scale-0 peer-checked:scale-100 transition-transform"></div>
              </div>
              <span className="text-lg font-semibold text-gray-800 select-none">
                {option}
              </span>
            </label>
          ))}
        </div>

        <button
          onClick={handleApply}
          className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
          aria-label="Apply Sampling Algorithm"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default SamplingPage;
