"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/events/EventCard";
import { EventStats } from "@/components/events/EventStats";
import { useEventsManagement } from "@/hooks/useEventsManagement";

export default function EventsPage() {
  const { events, stats, isLoading, error, deleteEvent } = useEventsManagement();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus event ini?")) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteEvent(id);
    } catch (err) {
      console.error("Failed to delete event:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditEvent = (id: string) => {
    // Navigate to edit page or open modal
    console.log("Edit event:", id);
  };

  if (error) {
    return (
      <MainLayout>
        <div className="text-center py-8">
          <p className="text-red-600">Error: {error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Reload Page
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Event Management</h1>
            <p className="text-slate-600">
              Kelola semua event panahan yang Anda selenggarakan dengan sistem manajemen yang komprehensif.
            </p>
          </div>
          <Link href="/events/create">
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Buat Event Baru
            </Button>
          </Link>
        </div>

        {/* Statistics */}
        <EventStats stats={stats} />

        {/* Events List */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-900">Daftar Event</h2>
            {isLoading && (
              <div className="text-sm text-slate-500">Loading...</div>
            )}
          </div>

          {events.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border">
              <div className="text-slate-400 mb-4">
                <Plus size={48} className="mx-auto mb-2" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                Belum Ada Event
              </h3>
              <p className="text-slate-600 mb-4">
                Mulai dengan membuat event pertama Anda.
              </p>
              <Link href="/events/create">
                <Button>Buat Event Pertama</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onEdit={handleEditEvent}
                  onDelete={deletingId === event.id ? undefined : handleDeleteEvent}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}