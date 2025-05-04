"use client";

import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronRight, Plus, Users, MapPin, Tag } from "lucide-react";
import Link from "next/link";

// Data dummy untuk event
const events = [
  {
    id: "123",
    name: "Kejuaraan Nasional Panahan 2025",
    description: "Kompetisi panahan nasional terbesar di Indonesia untuk tahun 2025.",
    location: "Lapangan Panahan Senayan, Jakarta",
    date: "15-17 Juni 2025",
    status: "Publikasi",
    participants: 80,
    categories: 8,
  },
  {
    id: "124",
    name: "Archery Open Junior 2025",
    description: "Turnamen panahan untuk atlet junior dengan kategori U-15 dan U-18.",
    location: "GOR Arcadia, Bandung",
    date: "1-2 Juni 2025",
    status: "Draft",
    participants: 30,
    categories: 4,
  },
  {
    id: "125",
    name: "Liga Panahan Kota 2025",
    description: "Kompetisi panahan antar klub di tingkat kota.",
    location: "Lapangan Panahan Kota, Surabaya",
    date: "25-27 April 2025",
    status: "Berlangsung",
    participants: 45,
    categories: 6,
  },
  {
    id: "126",
    name: "Invitational Archery Tournament",
    description: "Turnamen panahan khusus undangan untuk klub-klub terpilih.",
    location: "Lapangan Utama, Yogyakarta",
    date: "8-9 Juli 2025",
    status: "Selesai",
    participants: 60,
    categories: 6,
  },
];

export default function EventsPage() {
  // Helper function to get status badge classes based on status
  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case 'Publikasi':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Berlangsung':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Event Management</h1>
          <p className="text-slate-600">Kelola semua event panahan yang Anda selenggarakan.</p>
        </div>
        <Link href="/events/create">
          <Button className="flex items-center">
            <Plus size={16} className="mr-2" />
            Buat Event Baru
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Event</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{events.length}</p>
            <div className="text-sm text-blue-700 mt-1">Event yang Anda kelola</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Event Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">2</p>
            <div className="text-sm text-green-700 mt-1">Status Publikasi & Berlangsung</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Peserta</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">215</p>
            <div className="text-sm text-purple-700 mt-1">Dari semua event Anda</div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Daftar Event</h2>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm border p-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="mb-3 lg:mb-0">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold">{event.name}</h3>
                    <span className={`ml-3 text-xs px-2 py-1 rounded-full ${getStatusBadgeClasses(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mb-3">{event.description}</p>
                  <div className="flex flex-wrap gap-y-2 text-sm text-slate-600">
                    <div className="flex items-center mr-4">
                      <Calendar size={16} className="mr-1" />
                      {event.date}
                    </div>
                    <div className="flex items-center mr-4">
                      <MapPin size={16} className="mr-1" />
                      {event.location}
                    </div>
                    <div className="flex items-center mr-4">
                      <Users size={16} className="mr-1" />
                      {event.participants} peserta
                    </div>
                    <div className="flex items-center">
                      <Tag size={16} className="mr-1" />
                      {event.categories} kategori
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/events/${event.id}/configure`}
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded-md px-3 py-1.5"
                  >
                    Konfigurasi
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Preview
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}