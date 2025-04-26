import { OrganizerEventsLayout } from "@/features/events/adapters/organizer/components/OrganizerEventsLayout";

export default function OrganizerEventsLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OrganizerEventsLayout>{children}</OrganizerEventsLayout>;
}