import { useState } from "react";

interface SectionInputProps {
  setSections: (sections: any[]) => void;
}

const SectionInput = ({ setSections }: SectionInputProps) => {
  const [numSections, setNumSections] = useState<number | "">(0);
  const [roomData, setRoomData] = useState<
    { roomNo: number; capacity: number }[][]
  >([]);

  const handleSectionsChange = (value: number | "") => {
    if (value === "" || value < 0) {
      setNumSections("");
      setRoomData([]);
      setSections([]);
      return;
    }
    setNumSections(value);
    const newRoomData = Array.from({ length: value }, () => []);
    setRoomData(newRoomData);
    updateFinalSections(newRoomData);
  };

  const handleRoomsChange = (sectionIndex: number, numRooms: number | "") => {
    if (numRooms === "" || numRooms < 0) {
      // Set empty array for that section if invalid input
      const updated = [...roomData];
      updated[sectionIndex] = [];
      setRoomData(updated);
      updateFinalSections(updated);
      return;
    }

    const updated = [...roomData];
    updated[sectionIndex] = Array.from(
      { length: numRooms },
      (_, roomIndex) => ({
        roomNo: roomIndex + 1,
        capacity: 30,
      })
    );
    setRoomData(updated);
    updateFinalSections(updated);
  };

  const handleRoomSizeChange = (
    sectionIndex: number,
    roomIndex: number,
    value: number
  ) => {
    if (isNaN(value) || value < 0) return; // Ignore invalid input
    const updated = [...roomData];
    updated[sectionIndex][roomIndex].capacity = value;
    setRoomData(updated);
    updateFinalSections(updated);
  };

  const updateFinalSections = (
    roomData: { roomNo: number; capacity: number }[][]
  ) => {
    const formatted = roomData.map((rooms, index) => ({
      sectionNo: index + 1,
      rooms,
    }));
    setSections(formatted);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Number of Sections
        </label>
        <input
          type="number"
          min={0}
          value={numSections}
          onChange={(e) => {
            const val = e.target.value;
            handleSectionsChange(val === "" ? "" : parseInt(val));
          }}
          className="border rounded-md px-3 py-1 w-fit min-w-[6rem] max-w-[8rem]"
        />
      </div>

      {Array.from({
        length: typeof numSections === "number" ? numSections : 0,
      }).map((_, sectionIndex) => (
        <div
          key={sectionIndex}
          className="border rounded-lg p-4 bg-gray-50 space-y-4"
        >
          <h4 className="text-md font-semibold text-gray-800">
            Section {sectionIndex + 1}
          </h4>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Number of Rooms
            </label>
            <input
              type="number"
              min={1}
              value={
                roomData[sectionIndex]?.length !== undefined
                  ? roomData[sectionIndex].length
                  : ""
              }
              onChange={(e) => {
                const val = e.target.value;
                handleRoomsChange(
                  sectionIndex,
                  val === "" ? "" : parseInt(val)
                );
              }}
              className="border rounded-md px-3 py-1 w-fit min-w-[6rem] max-w-[8rem]"
            />
          </div>

          <div className="space-y-2">
            {roomData[sectionIndex]?.map((room, roomIndex) => (
              <div
                key={roomIndex}
                className="flex items-center gap-4 flex-wrap"
              >
                <span className="text-sm text-gray-700 font-medium">
                  Room {room.roomNo}
                </span>
                <input
                  type="number"
                  min={0}
                  value={room.capacity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    handleRoomSizeChange(sectionIndex, roomIndex, val);
                  }}
                  className="border rounded-md px-3 py-1 w-fit min-w-[6rem] max-w-[8rem]"
                />
                <span className="text-sm text-gray-600">Capacity</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionInput;
