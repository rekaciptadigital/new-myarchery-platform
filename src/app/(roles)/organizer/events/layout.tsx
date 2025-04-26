import { OrganizerEventsLayout } from "@/features/event-management/adapters/organizer/components/OrganizerEventsLayout";

export default function OrganizerEventsLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OrganizerEventsLayout>{children}</OrganizerEventsLayout>;
}