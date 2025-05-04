"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEvents } from "../../application/hooks/useEvents";
import { EventFormData, EventStatus } from "../../core/models/event";
import { EventList } from "./components/EventList";
import { EventForm } from "./components/EventForm";
import { EventStatistics } from "./components/EventStatistics";

const defaultFormState: EventFormData = {
  name: "",
  description: "",
  location: "",
  date: "",
  status: "Draft",
};

const statusOptions: EventStatus[] = ["Draft", "Publikasi", "Berlangsung", "Selesai"];

export function EventManagementAdapter() {
  const { events, statistics, loading, error, createEvent, updateEvent } = useEvents();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EventFormData>({...defaultFormState});
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      const success = await updateEvent(editingId, form);
      if (success) {
        setEditingId(null);
        setShowForm(false);
        setForm({...defaultFormState});
      }
    } else {
      const success = await createEvent(form);
      if (success) {
        setForm({...defaultFormState});
        setShowForm(false);
      }
    }
  };
  
  const handleEdit = (id: string) => {
    const eventToEdit = events.find(event => event.id === id);
    if (eventToEdit) {
      setForm({
        name: eventToEdit.name,
        description: eventToEdit.description,
        location: eventToEdit.location,
        date: eventToEdit.date,
        status: eventToEdit.status,
      });
      setEditingId(id);
      setShowForm(true);
      // Scroll to form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handlePreview = (id: string) => {
    // This would normally navigate to a preview page
    alert(`Preview event: ${id}`);
  };
  
  if (loading && !events.length) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-t-blue-600 border-r-blue-600 border-b-blue-200 border-l-blue-200 rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-gray-600">Memuat data events...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
        <p className="font-medium">Error loading events:</p>
        <p>{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-2">
          Reload
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Event Management</h1>
          <p className="text-slate-600">Kelola semua event panahan yang Anda selenggarakan.</p>
        </div>
        <Link href="/organizer/events/create">
          <Button className="flex items-center">
            <Plus size={16} className="mr-2" />
            Buat Event Baru
          </Button>
        </Link>
      </div>

      {showForm && (
        <EventForm
          form={form}
          statusList={statusOptions}
          editingId={editingId}
          onSubmit={handleFormSubmit}
          onChange={handleFormChange}
        />
      )}

      {statistics && <EventStatistics statistics={statistics} />}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Daftar Event</h2>
        <EventList
          events={events}
          onEdit={handleEdit}
          onPreview={handlePreview}
        />
      </div>
    </div>
  );
}
