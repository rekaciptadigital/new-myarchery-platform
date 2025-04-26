"use client";

import MainLayout from "@/components/layouts/MainLayout";
import { OrganizerDashboardAdapter } from "@/features/dashboard/adapters/organizer/OrganizerDashboardAdapter";

export default function OrganizerDashboardPage() {
  return (
    <MainLayout>
      <OrganizerDashboardAdapter />
    </MainLayout>
  );
}
