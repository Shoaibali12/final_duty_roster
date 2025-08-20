import VenueForm from "@/components/venue/VenueForm";

export default function Page({ params }: { params: { eventId: string } }) {
  return <VenueForm eventId={params.eventId} />;
}
