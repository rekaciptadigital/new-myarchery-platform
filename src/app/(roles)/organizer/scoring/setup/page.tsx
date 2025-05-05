import { OrganizerScoringSetupAdapter } from "@/features/scoring-management/adapters/organizer/OrganizerScoringSetupAdapter";

export const metadata = {
  title: "Konfigurasi Scoring | MyArchery",
  description: "Setup dan konfigurasi scoring untuk event",
};

export default function ScoringSetupPage() {
  return <OrganizerScoringSetupAdapter />;
}
