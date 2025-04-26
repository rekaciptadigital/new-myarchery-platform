"use client";

import { AuthLayout } from "@/features/auth/adapters/customer/layouts/AuthLayout";
import { CustomerLoginAdapter } from "@/features/auth/adapters/customer/CustomerLoginAdapter";

export default function CustomerLoginPage() {
  return (
    <AuthLayout 
      title="Portal Atlet & Peserta"
      subtitle="Ikuti kompetisi panahan, pantau jadwal pertandingan, dan lihat skor secara real-time."
      benefits={[
        "Daftar kompetisi dengan mudah",
        "Pantau skor pertandingan real-time",
        "Lihat dan unduh sertifikat partisipasi"
      ]}
      accentColor="green"
    >
      <CustomerLoginAdapter />
    </AuthLayout>
  );
}
