import { OrganizerScoringSetupAdapter } from "@/features/scoring-management/adapters/organizer/OrganizerScoringSetupAdapter";

export const metadata = {
  title: "Setup Scoring Baru | MyArchery",
  description: "Setup dan konfigurasi scoring untuk event baru",
};

export default function ScoringSetupPage() {
  return <OrganizerScoringSetupAdapter />;
}
