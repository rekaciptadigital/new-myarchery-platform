"use client";

import { useState, useEffect } from "react";
import { DashboardService, statusList } from "../../core/services/dashboard-service";
import { Event, EventFormData } from "../../core/models/dashboard";
import { EventStats } from "./components/EventStats";
import { EventForm } from "./components/EventForm";
import { EventList } from "./components/EventList";
import { DashboardHeader } from "./components/DashboardHeader";
import { EventChecklist } from "./components/EventChecklist";

export function OrganizerDashboardAdapter() {
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState<EventFormData>({ name: "", date: "", status: "Draft" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await DashboardService.getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to load events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadEvents();
  }, []);
  
  // Form handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        const updatedEvent = await DashboardService.updateEvent(editingId, form);
        setEvents(events.map(ev => ev.id === editingId ? updatedEvent : ev));
        setEditingId(null);
      } else {
        const newEvent = await DashboardService.addEvent(form);
        setEvents([...events, newEvent]);
      }
      setForm({ name: "", date: "", status: "Draft" });
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };
  
  const handleEdit = (id: number) => {
    const ev = events.find(e => e.id === id);
    if (ev) {
      setForm({ name: ev.name, date: ev.date, status: ev.status });
      setEditingId(id);
    }
  };
  
  const handleDelete = async (id: number) => {
    try {
      await DashboardService.deleteEvent(id);
      setEvents(events.filter(e => e.id !== id));
      if (editingId === id) setEditingId(null);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  
  // Calculate statistics
  const stats = DashboardService.getStatusStats(events);
  const totalParticipants = DashboardService.getTotalParticipants(events);
  const totalIncome = DashboardService.getTotalIncome(events);
  
  if (isLoading) {
    return <div>Loading dashboard data...</div>;
  }
  
  return (
    <div>
      <DashboardHeader />
      
      {/* Stats grid */}
      <EventStats 
        stats={stats} 
        totalParticipants={totalParticipants} 
        totalIncome={totalIncome} 
      />
      
      {/* Event form */}
      <EventForm 
        form={form} 
        statusList={statusList}
        editingId={editingId}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
      
      {/* Event list */}
      <EventList 
        events={events} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
      
      {/* Checklist */}
      <EventChecklist />
    </div>
  );
}
