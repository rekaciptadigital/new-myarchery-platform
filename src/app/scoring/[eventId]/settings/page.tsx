"use client";

import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Calendar, Target, Info, Settings } from "lucide-react";
import Link from "next/link";
import { useParams } from 'next/navigation';

export default function ScoringSettingsPage() {
  // Use the useParams hook instead of receiving params directly
  const params = useParams();
  const eventId = params.eventId as string;

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Link href={`/scoring/${eventId}/dashboard`} className="text-slate-600 hover:text-slate-900">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Pengaturan Pertandingan</h1>
        </div>
        <p className="text-slate-600">Konfigurasi jadwal, bracket, FOP, dan bantalan untuk event dengan ID: {eventId}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Jadwal Card */}
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Jadwal
            </CardTitle>
            <CardDescription>
              Atur jadwal spesifik untuk berbagai aktivitas dalam pertandingan
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-slate-600">
              Konfigurasi waktu spesifik jam dan hari, kategori, gender, jarak kategori, dan jenis aktivitas untuk setiap sesi pertandingan.
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Link href={`/scoring/${eventId}/settings/schedule`} className="w-full">
              <Button variant="outline" className="w-full" size="sm">
                <Settings size={14} className="mr-2" />
                Pengaturan
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Bracket Card */}
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Bracket
            </CardTitle>
            <CardDescription>
              Atur ukuran bracket dan penomoran bantalan untuk setiap kategori
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-slate-600">
              Pilih ukuran bracket (64, 32, 16, 8, 4) dan konfigurasikan nomor bantalan baik secara manual atau otomatis.
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Link href={`/scoring/${eventId}/settings/bracket`} className="w-full">
              <Button variant="outline" className="w-full" size="sm">
                <Settings size={14} className="mr-2" />
                Pengaturan
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* FOP Card */}
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-amber-600" />
              Field of Play (FOP)
            </CardTitle>
            <CardDescription>
              Konfigurasi layout lapangan untuk pertandingan
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-slate-600">
              Pilih layout lapangan, atur jarak antar bantalan, dan buat konfigurasi khusus untuk lapangan pertandingan.
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Link href={`/scoring/${eventId}/settings/fop`} className="w-full">
              <Button variant="outline" className="w-full" size="sm">
                <Settings size={14} className="mr-2" />
                Pengaturan
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Target/Bantalan Card */}
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              Bantalan
            </CardTitle>
            <CardDescription>
              Atur jumlah dan distribusi bantalan untuk setiap kategori
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-slate-600">
              Tentukan jumlah maksimal bantalan tersedia dan distribusikan peserta ke masing-masing bantalan berdasarkan hari dan kategori.
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Link href={`/scoring/${eventId}/settings/target`} className="w-full">
              <Button variant="outline" className="w-full" size="sm">
                <Settings size={14} className="mr-2" />
                Pengaturan
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="flex justify-end my-10">
        <Link href={`/scoring/${eventId}/dashboard`}>
          <Button variant="outline">Kembali</Button>
        </Link>
      </div>
    </MainLayout>
  );
}