import { OrganizerLayout } from "@/features/dashboard/adapters/organizer/components/OrganizerLayout";

export default function OrganizerLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OrganizerLayout>{children}</OrganizerLayout>;
}
