"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, User, Users, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Logo and Welcome Message */}
      <div className="flex-grow flex flex-col items-center justify-center p-8 md:p-12 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-6xl w-full mx-auto text-center mb-12">
          <div className="flex justify-center mb-8">
            <Image 
              src="/logos/logo_myarchery.svg" 
              alt="MyArchery Logo" 
              width={240} 
              height={80} 
              priority
            />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-slate-800">
            Platform <span className="text-blue-600">Manajemen Panahan</span> Terbaik
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-4 max-w-3xl mx-auto">
            Kelola event, kompetisi, dan klub panahan dengan mudah. 
            Solusi all-in-one untuk komunitas panahan.
          </p>
        </div>
        
        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
          {/* Customer Card */}
          <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 flex flex-col items-center text-center h-full">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold mb-2">Atlet & Peserta</h2>
                <p className="text-slate-600 mb-6 flex-grow">
                  Daftar event, lihat jadwal pertandingan, dan pantau skor secara realtime.
                </p>
                <Link href="/login/customer" className="w-full">
                  <Button className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center">
                    Masuk sebagai Peserta
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Organizer Card */}
          <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 flex flex-col items-center text-center h-full">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold mb-2">Penyelenggara Event</h2>
                <p className="text-slate-600 mb-6 flex-grow">
                  Buat dan kelola event panahan, pendaftaran peserta, dan sistem scoring.
                </p>
                <Link href="/organizer/login" className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center">
                    Masuk sebagai Organizer
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Admin Card */}
          <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 flex flex-col items-center text-center h-full">
                <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold mb-2">Administrator</h2>
                <p className="text-slate-600 mb-6 flex-grow">
                  Akses panel admin untuk mengatur platform secara keseluruhan.
                </p>
                <Link href="/admin" className="w-full">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center">
                    Masuk sebagai Admin
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white py-4 px-6 border-t border-slate-200">
        <div className="max-w-6xl mx-auto text-center text-slate-500 text-sm">
          © 2025 MyArchery Platform. Seluruh hak cipta dilindungi.
        </div>
      </footer>
    </div>
  );
}
