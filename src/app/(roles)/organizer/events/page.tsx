import { EventManagementAdapter } from "@/features/event-management/adapters/organizer/EventManagementAdapter";

export const metadata = {
  title: 'Event Management - MyArchery',
  description: 'Manage your archery events and tournaments',
};

export default function EventsPage() {
  return <EventManagementAdapter />;
}