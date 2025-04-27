"use client";

import Link from "next/link";
import { ChevronLeft, Trophy } from "lucide-react";
import { TournamentCreationForm } from "@/features/event-management/subfeatures/tournament/components/TournamentCreationForm";

export default function TournamentCreatePage() {
  return (
    <>
      <div className="mb-4">
        <Link
          href="/organizer/events/create"
          className="text-slate-600 hover:text-slate-800 flex items-center text-sm font-medium"
        >
          <ChevronLeft size={16} className="mr-1" />
          Kembali ke pilihan jenis event
        </Link>
      </div>

      <div className="mb-8 flex items-center">
        <div className="bg-orange-100 p-2 rounded-full mr-3">
          <Trophy size={24} className="text-orange-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Buat Tournament / Kejuaraan</h1>
          <p className="text-slate-600">
            Isi detail tournament yang akan Anda selenggarakan
          </p>
        </div>
      </div>

      <TournamentCreationForm />
    </>
  );
}