"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { ScoringEventCard } from "@/components/scoring/ScoringEventCard";
import { ScoringStats } from "@/components/scoring/ScoringStats";
import { useScoring } from "@/hooks/useScoring";

export default function ScoringPage() {
  const { events, statistics, isLoading, error, updateEventStatus, refreshEventData } = useScoring();
  const [updatingEventId, setUpdatingEventId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, status: typeof events[0]["status"]) => {
    setUpdatingEventId(id);
    try {
      await updateEventStatus(id, status);
    } catch (err) {
      console.error("Failed to update event status:", err);
    } finally {
      setUpdatingEventId(null);
    }
  };

  const handleRefresh = async (id: string) => {
    try {
      await refreshEventData(id);
    } catch (err) {
      console.error("Failed to refresh event data:", err);
    }
  };

  if (error) {
    return (
      <MainLayout>
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>
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
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Manajemen Scoring</h1>
            <p className="text-slate-600">
              Kelola dan pantau scoring untuk semua event panahan dengan sistem yang terintegrasi.
            </p>
          </div>
          <Link href="/scoring/setup">
            <Button className="flex items-center gap-2">
              <BarChart3 size={16} />
              Setup Scoring Baru
            </Button>
          </Link>
        </div>

        {/* Statistics */}
        <ScoringStats stats={statistics} />

        {/* Events List */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-900">Daftar Event Scoring</h2>
            {isLoading && (
              <div className="text-sm text-slate-500">Loading...</div>
            )}
          </div>

          {events.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border">
              <div className="text-slate-400 mb-4">
                <BarChart3 size={48} className="mx-auto mb-2" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                Belum Ada Event Scoring
              </h3>
              <p className="text-slate-600 mb-4">
                Mulai dengan setup scoring untuk event pertama Anda.
              </p>
              <Link href="/scoring/setup">
                <Button>Setup Scoring Pertama</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <ScoringEventCard
                  key={event.id}
                  event={event}
                  onStatusChange={updatingEventId === event.id ? undefined : handleStatusChange}
                  onRefresh={handleRefresh}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}