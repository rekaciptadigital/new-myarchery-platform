"use client";

import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { EventForm } from "@/components/dashboard/EventForm";
import { EventTable } from "@/components/dashboard/EventTable";
import { TimelineChecklist } from "@/components/dashboard/TimelineChecklist";
import { useEventManagement } from "@/hooks/useEventManagement";
import { EventFormData } from "@/types/event";

export default function DashboardPage() {
  const {
    events,
    metrics,
    statusList,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
  } = useEventManagement();

  const [editingId, setEditingId] = useState<number | null>(null);

  const handleFormSubmit = (formData: EventFormData) => {
    if (editingId) {
      updateEvent(editingId, formData);
      setEditingId(null);
    } else {
      addEvent(formData);
    }
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleDelete = (id: number) => {
    deleteEvent(id);
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const editingEvent = editingId ? getEventById(editingId) : null;
  const initialFormData = editingEvent ? {
    name: editingEvent.name,
    date: editingEvent.date,
    status: editingEvent.status,
  } : undefined;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Dashboard Pengelolaan Event
          </h1>
          <p className="text-slate-600">
            Kelola event, pantau status, statistik, dan persiapan event panahan Anda.
          </p>
        </div>

        {/* Status Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {metrics.eventStats.map((stat) => (
            <StatCard
              key={stat.status}
              title={stat.status}
              value={stat.count}
            />
          ))}
        </div>

        {/* Main Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            title="Statistik Pendaftaran"
            value={metrics.totalParticipants}
            subtitle="Total peserta terdaftar"
            variant="success"
          />
          <StatCard
            title="Keuangan Event"
            value={`Rp ${metrics.totalIncome.toLocaleString()}`}
            subtitle="Total pemasukan"
            variant="primary"
          />
        </div>

        {/* Event Form */}
        <EventForm
          onSubmit={handleFormSubmit}
          initialData={initialFormData}
          isEditing={!!editingId}
          statusOptions={statusList}
        />

        {/* Events Table */}
        <EventTable
          events={events}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Timeline Checklist */}
        <TimelineChecklist />
      </div>
    </MainLayout>
  );
}