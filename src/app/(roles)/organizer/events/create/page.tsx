// This file is a Server Component by default
import { CreateEventAdapter } from "@/features/event-management/adapters/organizer/CreateEventAdapter";

export const metadata = {
  title: 'Create New Event - MyArchery',
  description: 'Create a new archery event or tournament',
};

export default function CreateEventPage() {
  return <CreateEventAdapter />;
}