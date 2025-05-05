import { OrganizerScoringManagementAdapter } from "@/features/scoring-management/adapters/organizer/OrganizerScoringManagementAdapter";

export const metadata = {
  title: "Scoring Management | MyArchery",
  description: "Kelola dan pantau scoring untuk semua event panahan",
};

export default function ScoringManagementPage() {
  return <OrganizerScoringManagementAdapter />;
}
