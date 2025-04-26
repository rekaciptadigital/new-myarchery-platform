import { OrganizerEventsLayout } from "@/features/event-management/adapters/organizer/components";

export default function OrganizerEventsLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OrganizerEventsLayout>{children}</OrganizerEventsLayout>;
}