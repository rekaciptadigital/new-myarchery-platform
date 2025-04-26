"use client";

import { AuthLayout } from "@/features/auth/adapters/organizer/layouts/AuthLayout";
import { OrganizerLoginAdapter } from "@/features/auth/adapters/organizer/OrganizerLoginAdapter";

export default function OrganizerLoginPage() {
  return (
    <AuthLayout 
      title="Platform Manajemen Panahan Terbaik"
      subtitle="Kelola event, kompetisi, dan klub panahan Anda dengan mudah. Solusi all-in-one untuk penyelenggara kompetisi panahan."
      benefits={[
        "Buat dan kelola event dengan mudah",
        "Sistem scoring digital real-time",
        "Kelola pendaftaran dan pembayaran otomatis"
      ]}
      accentColor="blue"
    >
      <OrganizerLoginAdapter />
    </AuthLayout>
  );
}
