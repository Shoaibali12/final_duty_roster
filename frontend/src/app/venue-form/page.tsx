"use client";

import VenueForm from "@/components/venue/VenueForm";

const VenuePage = () => {
  const eventId = "64dceac58e97be3a5f0c236a";

  return (
    <div className="p-4 ">
      <VenueForm eventId={eventId} />
    </div>
  );
};

export default VenuePage;
