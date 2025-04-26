"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Plus, 
  Calendar, 
  ChevronRight, 
  Users, 
  MapPin, 
  Tag,
  BarChart,
  Filter,
  Search,
  ArrowUpDown,
  Edit,
  Eye,
  Trash2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Data dummy untuk event - akan diganti dengan data dari API
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
    revenue: 12000000,
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
    revenue: 4500000,
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
    revenue: 7500000,
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
    revenue: 9000000,
  },
];

export function OrganizerEventsListingAdapter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Helper function untuk mendapatkan status badge classes
  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case 'Publikasi':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Berlangsung':
        return 'bg-blue-100 text-blue-800';
      case 'Selesai':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  // Filter events berdasarkan pencarian dan status
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Statistik untuk panel atas
  const totalEvents = events.length;
  const activeEvents = events.filter(e => e.status === "Berlangsung" || e.status === "Publikasi").length;
  const totalParticipants = events.reduce((sum, event) => sum + event.participants, 0);
  const totalRevenue = events.reduce((sum, event) => sum + event.revenue, 0);

  return (
    <div>
      {/* Page Header sesuai dengan panduan layout */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary-600" />
            Manajemen Event
          </h1>
          <p className="text-slate-600 mt-1">Kelola semua event panahan yang Anda selenggarakan</p>
        </div>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link href="/organizer/events/create">
            <Button className="bg-primary-600 hover:bg-primary-700">
              <Plus size={16} className="mr-2" />
              Buat Event Baru
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid sesuai dengan pola dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Event</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{totalEvents}</p>
            <div className="text-sm text-blue-700 mt-1">Event yang Anda kelola</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Event Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{activeEvents}</p>
            <div className="text-sm text-green-700 mt-1">Status Publikasi & Berlangsung</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Peserta</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">{totalParticipants}</p>
            <div className="text-sm text-purple-700 mt-1">Dari semua event Anda</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Pendapatan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-600">Rp {(totalRevenue / 1000000).toFixed(1)}jt</p>
            <div className="text-sm text-amber-700 mt-1">Dari semua event Anda</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter dan Search Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
          <div className="w-full md:w-96">
            <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">
              Cari Event
            </label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                id="search"
                type="text"
                placeholder="Nama atau deskripsi event..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-full md:w-64">
            <label htmlFor="status-filter" className="block text-sm font-medium text-slate-700 mb-1">
              Filter Status
            </label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="status-filter" className="w-full">
                <SelectValue placeholder="Filter berdasarkan status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Publikasi">Publikasi</SelectItem>
                <SelectItem value="Berlangsung">Sedang Berlangsung</SelectItem>
                <SelectItem value="Selesai">Selesai</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Button variant="outline" className="flex items-center gap-2 h-10">
              <Filter size={16} />
              Filter Lanjutan
            </Button>
          </div>
          
          <div>
            <Button variant="outline" className="flex items-center gap-2 h-10">
              <ArrowUpDown size={16} />
              Urutkan
            </Button>
          </div>
        </div>
      </div>

      {/* Section Container untuk daftar event */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary-600" />
          Daftar Event
        </h2>
        
        <div className="space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-sm border p-5">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                  <div className="mb-3 lg:mb-0 lg:pr-6 lg:w-8/12">
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
                    <Link href={`/organizer/events/${event.id}/configure`}
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded-md px-3 py-1.5"
                    >
                      Kelola Event
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                    
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      <Button variant="outline" size="sm" className="h-9">
                        <Edit size={14} className="mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="h-9">
                        <Eye size={14} className="mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 h-9">
                        <Trash2 size={14} className="mr-1" />
                        Hapus
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Statistik event mini - hanya tampil untuk event aktif */}
                {(event.status === "Berlangsung" || event.status === "Publikasi") && (
                  <div className="mt-4 pt-3 border-t">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-sm bg-slate-50 rounded p-2">
                        <div className="font-medium">Pendaftaran</div>
                        <div className="text-green-600 font-bold">{event.participants} peserta</div>
                      </div>
                      <div className="text-sm bg-slate-50 rounded p-2">
                        <div className="font-medium">Pendapatan</div>
                        <div className="text-blue-600 font-bold">Rp {(event.revenue/1000000).toFixed(1)}jt</div>
                      </div>
                      <div className="text-sm bg-slate-50 rounded p-2">
                        <div className="font-medium">Aktivitas Terbaru</div>
                        <div className="text-slate-600">5 pendaftaran baru</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <div className="text-slate-400 mb-2">
                <Calendar size={48} className="mx-auto mb-2 opacity-30" />
              </div>
              <h3 className="text-lg font-medium text-slate-700 mb-1">Tidak ada event ditemukan</h3>
              <p className="text-slate-500 mb-4">Tidak ada event yang sesuai dengan pencarian atau filter</p>
              <Button variant="outline" onClick={() => {setSearchTerm(""); setStatusFilter("all");}}>
                Reset Filter
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Panel bantuan dan statistik di bawah */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-5 md:col-span-2">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <BarChart size={18} className="mr-2 text-primary-600" />
            Statistik Event & Aktivitas
          </h3>
          <div className="text-sm text-slate-600">
            <p className="mb-4">Berikut adalah ringkasan aktivitas event Anda:</p>
            <ul className="space-y-2 list-disc pl-5">
              <li>Total <span className="font-medium">{totalParticipants}</span> peserta telah mendaftar pada semua event</li>
              <li><span className="font-medium">{activeEvents}</span> event sedang aktif dengan status Publikasi atau Berlangsung</li>
              <li>Performa pendaftaran meningkat <span className="text-green-600 font-medium">8.5%</span> dibanding bulan lalu</li>
              <li>Total pendapatan <span className="font-medium">Rp {(totalRevenue/1000000).toFixed(1)} juta</span> dari semua event</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-5">
          <h3 className="font-semibold text-lg mb-4">Checklist Pengelolaan</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5 mr-2">1</div>
              <div>
                <p className="font-medium text-sm">Buat event baru</p>
                <p className="text-xs text-slate-500">Atur kategori kompetisi & harga</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5 mr-2">2</div>
              <div>
                <p className="font-medium text-sm">Konfigurasi scoring</p>
                <p className="text-xs text-slate-500">Atur bantalan, bracket & jadwal</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5 mr-2">3</div>
              <div>
                <p className="font-medium text-sm">Publikasikan event</p>
                <p className="text-xs text-slate-500">Buka pendaftaran peserta</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5 mr-2">4</div>
              <div>
                <p className="font-medium text-sm">Jalankan kompetisi</p>
                <p className="text-xs text-slate-500">Pantau scoring & hasil secara real-time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}