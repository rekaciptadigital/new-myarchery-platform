import { OrganizerScoringSystemAdapter } from "@/features/scoring-management/variants/scoring-system";

export const metadata = {
  title: "Kelola Scoring Event | MyArchery",
  description: "Kelola dan pantau scoring untuk event panahan",
};

export default function ScoringManagePage({ params }: { params: { eventId: string } }) {
  return <OrganizerScoringSystemAdapter eventId={params.eventId} />;
}
