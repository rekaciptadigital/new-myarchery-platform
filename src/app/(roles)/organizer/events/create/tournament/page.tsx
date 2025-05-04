import { TournamentFormAdapter } from "@/features/event-management/variants/tournament/ui/organizer/TournamentFormAdapter";

export const metadata = {
  title: 'Create Tournament Event - MyArchery',
  description: 'Create a new tournament event for your archery competition',
};

export default function CreateTournamentPage() {
  return <TournamentFormAdapter />;
}