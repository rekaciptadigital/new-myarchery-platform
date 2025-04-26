import { OrganizerScoringLayout } from "@/features/scoring/adapters/organizer/components/OrganizerScoringLayout";

export default function OrganizerScoringLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OrganizerScoringLayout>{children}</OrganizerScoringLayout>;
}