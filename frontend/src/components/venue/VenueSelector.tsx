import React from "react";
import {
  campusOptions,
  blockOptions,
  venueOptions,
} from "../../data/constants";

interface VenueSelectorProps {
  venueType: "campus" | "external";
  setVenueType: (value: "campus" | "external") => void;
  venueName: string;
  setVenueName: (value: string) => void;
  block: string;
  setBlock: (value: string) => void;
}

const VenueSelector: React.FC<VenueSelectorProps> = ({
  venueType,
  setVenueType,
  venueName,
  setVenueName,
  block,
  setBlock,
}) => {
  const venueList = venueType === "campus" ? campusOptions : venueOptions;

  // Temporary debug (remove in production)
  React.useEffect(() => {
    console.log("venueType", venueType);
    console.log("venueList", venueList);
    console.log("blockOptions", blockOptions);
  }, [venueType]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Venue Type */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Venue Type
          </label>
          <select
            value={venueType}
            onChange={(e) =>
              setVenueType(e.target.value as "campus" | "external")
            }
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          >
            <option value="campus">Campus</option>
            <option value="external">External</option>
          </select>
        </div>

        {/* Venue Name */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Venue Name
          </label>
          <select
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          >
            <option value="">Select Venue</option>
            {venueList && venueList.length > 0 ? (
              venueList.map((venue) => (
                <option key={venue.value} value={venue.value}>
                  {venue.label}
                </option>
              ))
            ) : (
              <option disabled>No venues available</option>
            )}
          </select>
        </div>

        {/* Block */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Block
          </label>
          <select
            value={block}
            onChange={(e) => setBlock(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          >
            <option value="">Select Block</option>
            {blockOptions && blockOptions.length > 0 ? (
              blockOptions.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))
            ) : (
              <option disabled>No blocks available</option>
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default VenueSelector;
