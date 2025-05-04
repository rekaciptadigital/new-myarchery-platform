"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, BookOpen, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

// Event type definitions
const eventTypes = [
  {
    id: "tournament",
    title: "Tournament / Kejuaraan",
    description: "Kompetisi panahan skala kecil atau besar dengan berbagai kategori dan sistem penilaian.",
    icon: <Trophy size={36} className="text-orange-500" />,
    link: "/organizer/events/create/tournament",
    popular: true,
  },
  {
    id: "league",
    title: "Liga",
    description: "Format multi-match yang berjalan dalam jangka waktu yang panjang dengan sistem poin dan klasemen.",
    icon: <Trophy size={36} className="text-blue-500" />,
    link: "/organizer/events/create/league",
    coming: true,
  },
  {
    id: "series",
    title: "Series",
    description: "Rangkaian turnamen terkait dengan peringkat kumulatif dan grand final.",
    icon: <Calendar size={36} className="text-purple-500" />,
    link: "/organizer/events/create/series",
    coming: true,
  },
  {
    id: "workshop",
    title: "Workshop",
    description: "Acara edukasi dan pelatihan teknik panahan untuk berbagai level kemampuan.",
    icon: <BookOpen size={36} className="text-green-500" />,
    link: "/organizer/events/create/workshop",
    coming: true,
  },
  {
    id: "training",
    title: "Training Camp",
    description: "Program latihan intensif jangka pendek atau panjang dengan pelatih berpengalaman.",
    icon: <Users size={36} className="text-red-500" />,
    link: "/organizer/events/create/training",
    coming: true,
  },
];

export function CreateEventType() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Buat Event Baru</h1>
        <p className="text-slate-600">
          Pilih jenis event yang ingin Anda buat. Setiap jenis event memiliki fitur konfigurasi yang sesuai dengan kebutuhannya.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventTypes.map((type) => (
          <Card 
            key={type.id} 
            className={`overflow-hidden ${type.popular ? 'border-blue-200 bg-blue-50' : 'hover:border-slate-300'} transition-all`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                {type.icon}
                {type.popular && (
                  <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Popular
                  </span>
                )}
                {type.coming && (
                  <span className="bg-slate-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Coming Soon
                  </span>
                )}
              </div>
              <CardTitle className="mt-4">{type.title}</CardTitle>
              <CardDescription>{type.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pb-4">
              {type.coming ? (
                <button disabled className="text-slate-500 flex items-center text-sm cursor-not-allowed">
                  Akan Datang <ArrowRight size={14} className="ml-2" />
                </button>
              ) : (
                <Link 
                  href={type.link} 
                  className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                >
                  Buat Event <ArrowRight size={14} className="ml-2" />
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
