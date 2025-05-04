"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Event, EventFormData, EventStatistics } from "../../core/models/event";
import { EventService } from "../services/eventService";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [statistics, setStatistics] = useState<EventStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const eventService = useMemo(() => new EventService(), []);
  
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const eventsData = await eventService.getEvents();
      setEvents(eventsData);
      
      const statsData = await eventService.getEventStatistics();
      setStatistics(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load events");
    } finally {
      setLoading(false);
    }
  }, [eventService]);
  
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);
  
  const createEvent = async (eventData: EventFormData): Promise<boolean> => {
    try {
      setLoading(true);
      await eventService.createEvent(eventData);
      await fetchEvents(); // Refresh the list
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create event");
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const updateEvent = async (id: string, eventData: Partial<EventFormData>): Promise<boolean> => {
    try {
      setLoading(true);
      await eventService.updateEvent(id, eventData);
      await fetchEvents(); // Refresh the list
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update event");
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const deleteEvent = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      await eventService.deleteEvent(id);
      await fetchEvents(); // Refresh the list
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete event");
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    events,
    statistics,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
}
