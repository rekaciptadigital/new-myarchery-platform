import { Event, EventFormData, EventStatistics } from "../../core/models/event";
import { EventRepository } from "../../infrastructure/eventRepository";

export class EventService {
  private readonly repository: EventRepository;

  constructor() {
    this.repository = new EventRepository();
  }

  async getEvents(): Promise<Event[]> {
    try {
      return await this.repository.getEvents();
    } catch (error) {
      console.error("Failed to fetch events:", error);
      throw new Error("Failed to fetch events. Please try again.");
    }
  }

  async getEventById(id: string): Promise<Event | null> {
    try {
      return await this.repository.getEventById(id);
    } catch (error) {
      console.error(`Failed to fetch event with ID ${id}:`, error);
      throw new Error("Failed to fetch event details. Please try again.");
    }
  }

  async createEvent(eventData: EventFormData): Promise<Event> {
    try {
      // Validate event data
      this.validateEventData(eventData);
      return await this.repository.createEvent(eventData);
    } catch (error) {
      console.error("Failed to create event:", error);
      throw error;
    }
  }

  async updateEvent(id: string, eventData: Partial<EventFormData>): Promise<Event> {
    try {
      // Validate update data
      if (eventData.name) this.validateName(eventData.name);
      if (eventData.date) this.validateDate(eventData.date);
      
      return await this.repository.updateEvent(id, eventData);
    } catch (error) {
      console.error(`Failed to update event with ID ${id}:`, error);
      throw error;
    }
  }

  async deleteEvent(id: string): Promise<void> {
    try {
      await this.repository.deleteEvent(id);
    } catch (error) {
      console.error(`Failed to delete event with ID ${id}:`, error);
      throw new Error("Failed to delete event. Please try again.");
    }
  }

  async getEventStatistics(): Promise<EventStatistics> {
    try {
      return await this.repository.getEventStatistics();
    } catch (error) {
      console.error("Failed to fetch event statistics:", error);
      throw new Error("Failed to fetch event statistics. Please try again.");
    }
  }

  private validateEventData(data: EventFormData): void {
    this.validateName(data.name);
    this.validateDate(data.date);
    
    if (!data.location) {
      throw new Error("Event location is required");
    }
  }

  private validateName(name: string): void {
    if (!name || name.trim().length < 3) {
      throw new Error("Event name must be at least 3 characters long");
    }
  }

  private validateDate(date: string): void {
    if (!date) {
      throw new Error("Event date is required");
    }
    
    const eventDate = new Date(date);
    if (isNaN(eventDate.getTime())) {
      throw new Error("Invalid event date");
    }
  }
}
