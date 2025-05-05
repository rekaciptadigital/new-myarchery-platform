import { OrganizerScoringSettingsAdapter } from "@/features/scoring-management/variants/scoring-settings";

export const metadata = {
  title: "Pengaturan Pertandingan | MyArchery",
  description: "Konfigurasi berbagai aspek pertandingan panahan",
};

export default function ScoringSettingsPage({ params }: { params: { eventId: string } }) {
  return <OrganizerScoringSettingsAdapter eventId={params.eventId} />;
}
