import React from "react";
import { blockOptions } from "../../data/constants";

interface Block {
  block: string;
}

interface BlockSelectorProps {
  venueType: "campus" | "external";
  blocks: Block[];
  setBlocks: (value: Block[]) => void;
}

export default function BlockSelector({
  venueType,
  blocks,
  setBlocks,
}: BlockSelectorProps) {
  if (venueType !== "campus") return null;

  const handleBlockChange = (index: number, value: string) => {
    const updated = [...blocks];
    updated[index].block = value;
    setBlocks(updated);
  };

  const handleAddBlock = () => {
    setBlocks([...blocks, { block: "" }]);
  };

  const handleRemoveBlock = (index: number) => {
    const updated = [...blocks];
    updated.splice(index, 1);
    setBlocks(updated);
  };

  return (
    <div className="mt-4">
      <label className="font-semibold block mb-2 text-gray-800">
        Academic Blocks
      </label>
      {blocks.map((b, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <select
            value={b.block}
            onChange={(e) => handleBlockChange(index, e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Block</option>
            {blockOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {blocks.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveBlock(index)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddBlock}
        className="mt-2 px-4 py-1 text-sm bg-blue-600 text-white rounded"
      >
        ➕ Add Another Block
      </button>
    </div>
  );
}
