"use client";

import React, { useState, useEffect } from 'react';
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, Save } from "lucide-react";
import Link from "next/link";
import ScheduleSettingsCard from "@/components/scoring-settings/ScheduleSettingsCard";

export default function ScheduleSettingsPage({ params }: { params: Promise<{ eventId: string }> }) {
  // Unwrap params using React.use()
  const { eventId } = React.use(params);
  
  // Fetch event details including available dates
  // This would typically come from an API call
  const [eventDates, setEventDates] = useState<Array<{
    date: string;
    label: string;
  }>>([]);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock API call to get event details
    // In a real application, this would be an actual API call
    const fetchEventDates = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data - in real app, this would come from your API
        const mockEventDates = [
          {
            date: "2025-06-15",
            label: "Minggu, 15 Juni 2025"
          },
          {
            date: "2025-06-16",
            label: "Senin, 16 Juni 2025"
          }
        ];
        
        setEventDates(mockEventDates);
      } catch (error) {
        console.error("Failed to fetch event dates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDates();
  }, [eventId]);

  const handleSaveSettings = () => {
    // Here you would typically send the data to your API
    alert("Pengaturan jadwal berhasil disimpan!");
  };

  return (
    <MainLayout>
      <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {/* Use the unwrapped eventId variable instead of params.eventId */}
            <Link href={`/scoring/${eventId}/settings`} className="hover:bg-gray-100 p-1 rounded">
              <ChevronLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Calendar className="h-6 w-6 text-green-600" />Pengaturan Jadwal</h1>
          </div>
          <p className="text-slate-600">Atur jadwal pertandingan untuk setiap kategori</p>
        </div>
        <div className="flex gap-4">
          {/* Use the unwrapped eventId variable here too */}
          <Link href={`/scoring/${eventId}/settings`}>
            <Button variant="outline">Kembali</Button>
          </Link>
          <Button onClick={handleSaveSettings} className="bg-green-600 hover:bg-green-700">
            <Save size={16} className="mr-2" /> Simpan
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center p-12">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-t-green-600 border-r-green-600 border-b-green-200 border-l-green-200 rounded-full animate-spin mb-4 mx-auto"></div>
            <p className="text-gray-600">Memuat data jadwal...</p>
          </div>
        </div>
      ) : (
        <ScheduleSettingsCard eventId={eventId} availableDates={eventDates} />
      )}
      </div>
    </MainLayout>
  );
}