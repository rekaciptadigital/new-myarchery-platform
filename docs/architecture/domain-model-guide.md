# Panduan Implementasi Domain Model pada MyArchery Platform

> **Dokumen Version Control**  
> **Dibuat**: 28 April 2025  
> **Diperbarui Terakhir**: 28 April 2025  
> **Penulis**: Laksmana Tri Moerdani  
> **Status**: Aktif

## Daftar Isi

1. [Pendahuluan](#1-pendahuluan)
2. [Domain Model vs Subfeature](#2-domain-model-vs-subfeature)
3. [Model Domain Utama](#3-model-domain-utama)
4. [Implementasi Model](#4-implementasi-model)
5. [Relasi Antar Model](#5-relasi-antar-model)
6. [Service Layer](#6-service-layer)
7. [Repository Pattern](#7-repository-pattern)
8. [Integrasi dengan Adapter Pattern](#8-integrasi-dengan-adapter-pattern)
9. [Panduan Konversi dari Struktur Subfeature](#9-panduan-konversi-dari-struktur-subfeature)
10. [Best Practices dan Checklist](#10-best-practices-dan-checklist)
11. [Validasi dan Pengujian Model](#11-validasi-dan-pengujian-model)
12. [Contoh Implementasi](#12-contoh-implementasi)

## 1. Pendahuluan

Dokumen ini berfungsi sebagai panduan implementasi Domain Model pada arsitektur MyArchery Platform, dengan fokus pada pemisahan yang jelas antara model domain bisnis dan implementasi UI/layanan.

### Tujuan Dokumen

- Memberikan pemahaman tentang perbedaan antara "Domain Model" dan "Subfeature"
- Menjelaskan struktur model domain utama pada aplikasi MyArchery
- Memberikan panduan implementasi model yang konsisten
- Menunjukkan relasi antar model dalam domain bisnis panahan
- Memberikan langkah-langkah konversi dari pendekatan subfeature ke model-driven

### Manfaat Pendekatan Model-Driven

1. **Maintainability** - Kode yang lebih mudah dipelihara karena struktur merefleksikan bisnis domain
2. **Clarity** - Memperjelas batasan dan tanggung jawab model domain
3. **Reusability** - Model dapat digunakan oleh berbagai bagian aplikasi
4. **Testing** - Unit testing yang lebih sederhana dan fokus
5. **Onboarding** - Mempermudah pemahaman developer baru tentang domain bisnis

## 2. Domain Model vs Subfeature

### Definisi Domain Model

**Domain Model** adalah representasi data dan logika yang mencerminkan entitas bisnis nyata dalam domain tertentu, terlepas dari implementasi UI atau teknis lainnya.

Karakteristik Domain Model:
- Fokus pada data dan logika bisnis
- Independen dari UI atau framework
- Mewakili konsep dan entitas bisnis riil
- Berisi validasi dan aturan bisnis

### Definisi Subfeature

**Subfeature** adalah implementasi UI dan layanan spesifik yang menangani bagian tertentu dari fitur yang lebih besar.

Karakteristik Subfeature:
- Fokus pada implementasi UI dan interaksi pengguna
- Sering bergantung pada framework atau library tertentu
- Menggunakan model domain untuk data dan logika bisnis
- Menangani presentasi dan interaksi pengguna

### Perbedaan Utama

| Aspek | Domain Model | Subfeature |
|-------|-------------|------------|
| Fokus | Entitas bisnis dan aturan | Implementasi UI dan interaksi |
| Ketergantungan | Independent (minimal) | Dependent pada framework/libraries |
| Reusability | Tinggi, di seluruh fitur | Terbatas, biasanya dalam satu fitur |
| Testing | Unit testing sederhana | Integration/UI testing lebih kompleks |
| Lifetime | Stabil, jarang berubah | Bisa berubah saat UI/UX diperbarui |

Dalam arsitektur MyArchery:
- **Models** berada dalam `/features/[feature-name]/core/models/`
- **Subfeature UI** berada dalam `/features/[feature-name]/subfeatures/` (untuk kode lama) atau `/features/[feature-name]/adapters/[role]/` (untuk model-driven)

## 3. Model Domain Utama

Berikut adalah model domain utama pada aplikasi MyArchery:

### Hierarki Model Domain

```
Event
├── Tournament
│   ├── Category
│   │   ├── Participant
│   │   └── Target
│   └── Schedule
├── Venue
└── Organizer
```

### Deskripsi Model Domain Utama

#### Event

Event adalah kompetisi panahan yang diselenggarakan pada waktu dan tempat tertentu.

```typescript
interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  organizerId: string;
  status: 'draft' | 'published' | 'completed' | 'cancelled';
  bannerUrl?: string;
  settings: EventSettings;
}

interface EventSettings {
  registrationDeadline: string;
  maxParticipants?: number;
  publicRegistration: boolean;
  requireVerification: boolean;
  // Event-specific settings
}
```

#### Tournament

Tournament adalah jenis kompetisi spesifik dalam suatu event.

```typescript
interface Tournament {
  id: string;
  eventId: string;
  name: string;
  startDate: string;
  endDate: string;
  description?: string;
  type: TournamentType;
  settings: TournamentSettings;
}

enum TournamentType {
  QUALIFICATION = 'qualification',
  ELIMINATION = 'elimination',
  MIXED_TEAM = 'mixed-team',
  TEAM = 'team'
}

interface TournamentSettings {
  scoringSystem: 'cumulative' | 'elimination' | 'custom';
  maxParticipants?: number;
  registrationDeadline: string;
  // Tournament-specific settings
}
```

#### Category

Category mendefinisikan kelompok peserta berdasarkan klasifikasi tertentu (usia, jenis busur, dll).

```typescript
interface Category {
  id: string;
  tournamentId: string;
  name: string;
  type: CategoryType;
  settings: CategorySettings;
}

enum CategoryType {
  RECURVE = 'recurve',
  COMPOUND = 'compound',
  TRADITIONAL = 'traditional',
  BAREBOW = 'barebow',
  NASIONAL = 'nasional'
}

interface CategorySettings {
  distanceInMeters: number;
  maxArrows: number;
  scoringSystem: 'cumulative' | 'elimination';
  minParticipants?: number;
  maxParticipants?: number;
  ageRestriction?: {
    minAge?: number;
    maxAge?: number;
  };
}
```

#### Participant

Participant mewakili peserta yang terdaftar dalam kategori tertentu.

```typescript
interface Participant {
  id: string;
  categoryId: string;
  userId: string;
  registrationDate: string;
  status: 'pending' | 'verified' | 'active' | 'disqualified';
  bibNumber?: string;
  teamId?: string;
  scores: ScoreRecord[];
  participantProfile: ParticipantProfile;
}

interface ParticipantProfile {
  fullName: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  clubName?: string;
  province?: string;
  city?: string;
  phoneNumber?: string;
  emergencyContact?: string;
}

interface ScoreRecord {
  round: number;
  arrows: number[];
  totalScore: number;
  timestamp: string;
}
```

#### Target

Target mewakili target fisik dalam kompetisi panahan.

```typescript
interface Target {
  id: string;
  categoryId: string;
  targetNumber: number;
  participantIds: string[];
  position?: {
    x: number;
    y: number;
  };
}
```

#### Venue

Venue adalah lokasi fisik tempat kompetisi diselenggarakan.

```typescript
interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  capacity: number;
  contactPerson?: string;
  contactPhone?: string;
  facilities: string[];
  mapCoordinates?: {
    latitude: number;
    longitude: number;
  };
}
```

#### Organizer

Organizer adalah entitas yang mengadakan event.

```typescript
interface Organizer {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  contactEmail: string;
  contactPhone: string;
  websiteUrl?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  verified: boolean;
}
```

## 4. Implementasi Model

### Struktur Folder

```text
/features/<domain-feature>/
  ├── models/              # Domain models & validation
  │   ├── common.ts        # Shared types across variants
  │   ├── <variant1>.ts    # Model varian domain (tournament, league, etc.)
  │   ├── <variant2>.ts    # Model varian domain lainnya
  │   └── index.ts         # Public exports
  ├── services/            # Business logic untuk model
  ├── repository.ts        # Data access layer
  ├── hooks/               # Custom hooks untuk fitur
  ├── utils/               # Utility functions khusus model
  └── ui/                  # UI adapters untuk role spesifik
      ├── shared/
      └── <variant>/
          ├── admin/
          ├── organizer/
          └── customer/
```
> **Catatan:** Letakkan semua file model di dalam `features/<feature>/models/` sesuai prinsip FCDDA.

### Implementasi Model

#### 1. Pendekatan File Terpisah

```typescript
// features/event-management/core/models/types/enums.ts
export enum TournamentType {
  QUALIFICATION = 'qualification',
  ELIMINATION = 'elimination',
  MIXED_TEAM = 'mixed-team',
  TEAM = 'team'
}

export enum CategoryType {
  RECURVE = 'recurve',
  COMPOUND = 'compound',
  TRADITIONAL = 'traditional',
  BAREBOW = 'barebow',
  NASIONAL = 'nasional'
}

// features/event-management/core/models/event.ts
import { Venue } from './venue';
import { Organizer } from './organizer';

export interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  organizerId: string;
  status: 'draft' | 'published' | 'completed' | 'cancelled';
  bannerUrl?: string;
  settings: EventSettings;
  
  // Optional relations (for when data is loaded with related entities)
  venue?: Venue;
  organizer?: Organizer;
}

export interface EventSettings {
  registrationDeadline: string;
  maxParticipants?: number;
  publicRegistration: boolean;
  requireVerification: boolean;
}

// Domain methods on the model
export function isEventActive(event: Event): boolean {
  return event.status === 'published' && 
    new Date(event.endDate) >= new Date();
}

export function canRegisterForEvent(event: Event): boolean {
  return event.status === 'published' && 
    new Date(event.settings.registrationDeadline) >= new Date();
}

export function createEmptyEvent(): Event {
  return {
    id: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    organizerId: '',
    status: 'draft',
    settings: {
      registrationDeadline: '',
      publicRegistration: true,
      requireVerification: false
    }
  };
}
```

#### 2. Validasi Model

Model harus memiliki validasi domain untuk memastikan data valid:

```typescript
// features/event-management/core/models/tournament.ts
import { TournamentType } from './types/enums';

export interface Tournament {
  id: string;
  eventId: string;
  name: string;
  startDate: string;
  endDate: string;
  description?: string;
  type: TournamentType;
  settings: TournamentSettings;
}

export interface TournamentSettings {
  scoringSystem: 'cumulative' | 'elimination' | 'custom';
  maxParticipants?: number;
  registrationDeadline: string;
}

// Validasi domain
export function validateTournament(tournament: Tournament): string[] {
  const errors: string[] = [];
  
  if (!tournament.name) {
    errors.push('Tournament name is required');
  }
  
  if (!tournament.startDate) {
    errors.push('Start date is required');
  }
  
  if (!tournament.endDate) {
    errors.push('End date is required');
  }
  
  if (new Date(tournament.startDate) > new Date(tournament.endDate)) {
    errors.push('Start date cannot be after end date');
  }
  
  if (!tournament.eventId) {
    errors.push('Tournament must be associated with an event');
  }
  
  if (!Object.values(TournamentType).includes(tournament.type)) {
    errors.push('Invalid tournament type');
  }
  
  if (tournament.settings.registrationDeadline && 
      new Date(tournament.settings.registrationDeadline) > new Date(tournament.startDate)) {
    errors.push('Registration deadline should be before tournament start date');
  }
  
  return errors;
}

// Factory method
export function createEmptyTournament(eventId: string = ''): Tournament {
  return {
    id: '',
    eventId,
    name: '',
    startDate: '',
    endDate: '',
    type: TournamentType.QUALIFICATION,
    settings: {
      scoringSystem: 'cumulative',
      registrationDeadline: ''
    }
  };
}
```

## 5. Relasi Antar Model

Relasi antar model harus jelas untuk memastikan integritas data dan hubungan bisnis yang benar.

### Tipe Relasi

1. **One-to-Many**
   - Event → Tournaments
   - Tournament → Categories
   - Category → Participants

2. **Many-to-One**
   - Tournament → Event
   - Category → Tournament
   - Participant → Category

3. **Many-to-Many**
   - Participant ↔ Target

### Implementasi Relasi

```typescript
// features/event-management/core/models/category.ts
import { CategoryType } from './types/enums';
import { Participant } from './participant';
import { Target } from './target';

export interface Category {
  id: string;
  tournamentId: string;
  name: string;
  type: CategoryType;
  settings: CategorySettings;
  
  // Optional relations
  participants?: Participant[];
  targets?: Target[];
}

// features/event-management/core/models/participant.ts
export interface Participant {
  id: string;
  categoryId: string;
  userId: string;
  registrationDate: string;
  status: 'pending' | 'verified' | 'active' | 'disqualified';
  bibNumber?: string;
  teamId?: string;
  scores: ScoreRecord[];
  participantProfile: ParticipantProfile;
  
  // Optional - the target this participant is assigned to
  targetId?: string;
  target?: Target;
}
```

### Relational Integrity

Model domain harus menjaga integritas relasional meskipun diimplementasikan di frontend:

```typescript
// features/event-management/core/models/event.ts
export function validateEventDates(event: Event, tournaments: Tournament[]): string[] {
  const errors: string[] = [];
  
  // Check that all tournaments are within event dates
  for (const tournament of tournaments) {
    if (new Date(tournament.startDate) < new Date(event.startDate)) {
      errors.push(`Tournament ${tournament.name} starts before event start date`);
    }
    
    if (new Date(tournament.endDate) > new Date(event.endDate)) {
      errors.push(`Tournament ${tournament.name} ends after event end date`);
    }
  }
  
  return errors;
}
```

## 6. Service Layer

Service layer menangani logika bisnis yang bekerja dengan model domain.

### Struktur Service Layer

```
/features/event-management/
  /core/
    /services/
      event-service.ts
      tournament-service.ts
      category-service.ts
      participant-service.ts
      target-service.ts
      venue-service.ts
      organizer-service.ts
```

### Implementasi Service

```typescript
// features/event-management/core/services/event-service.ts
import { supabase } from '@/lib/supabase/client';
import { Event, EventSettings, validateEvent } from '../models/event';
import { Tournament } from '../models/tournament';
import { eventRepository } from '../repositories/event-repository';

export class EventService {
  // Read operations
  static async getEvents(): Promise<Event[]> {
    return eventRepository.findAll();
  }
  
  static async getEventById(id: string): Promise<Event | null> {
    return eventRepository.findById(id);
  }
  
  static async getEventWithTournaments(eventId: string): Promise<{event: Event, tournaments: Tournament[]}> {
    const event = await this.getEventById(eventId);
    if (!event) throw new Error(`Event with ID ${eventId} not found`);
    
    // Get related tournaments
    const tournaments = await tournamentRepository.findByEventId(eventId);
    
    return { event, tournaments };
  }
  
  // Write operations
  static async createEvent(eventData: Omit<Event, 'id'>): Promise<string> {
    // Domain validation
    const errors = validateEvent(eventData);
    if (errors.length > 0) {
      throw new Error(`Event validation failed: ${errors.join(', ')}`);
    }
    
    // Persist to repository
    return eventRepository.create(eventData);
  }
  
  static async updateEvent(id: string, eventData: Partial<Event>): Promise<void> {
    // Get existing event
    const existingEvent = await this.getEventById(id);
    if (!existingEvent) {
      throw new Error(`Event with ID ${id} not found`);
    }
    
    // Merge data
    const updatedEvent = { ...existingEvent, ...eventData };
    
    // Domain validation
    const errors = validateEvent(updatedEvent);
    if (errors.length > 0) {
      throw new Error(`Event validation failed: ${errors.join(', ')}`);
    }
    
    // Persist to repository
    return eventRepository.update(id, updatedEvent);
  }
  
  static async deleteEvent(id: string): Promise<void> {
    // Check if can be deleted (e.g., no active registrations)
    const canDelete = await this.canDeleteEvent(id);
    if (!canDelete.allowed) {
      throw new Error(`Cannot delete event: ${canDelete.reason}`);
    }
    
    // Persist to repository
    return eventRepository.delete(id);
  }
  
  // Business logic
  static async canDeleteEvent(id: string): Promise<{allowed: boolean, reason?: string}> {
    const event = await this.getEventById(id);
    if (!event) return { allowed: false, reason: 'Event not found' };
    
    // Check if there are participants
    const participantCount = await participantRepository.countByEventId(id);
    if (participantCount > 0) {
      return { 
        allowed: false, 
        reason: `Cannot delete event with ${participantCount} participants` 
      };
    }
    
    return { allowed: true };
  }
  
  // Other business operations
  static async publishEvent(id: string): Promise<void> {
    const event = await this.getEventById(id);
    if (!event) throw new Error(`Event with ID ${id} not found`);
    
    // Additional validation before publishing
    if (event.status === 'published') {
      throw new Error('Event is already published');
    }
    
    if (!event.name || !event.startDate || !event.endDate || !event.location) {
      throw new Error('Event is missing required fields for publishing');
    }
    
    // Update status
    return this.updateEvent(id, { status: 'published' });
  }
}
```

## 7. Repository Pattern

Repository pattern memisahkan logika akses data dari model domain.

### Struktur Repository

```
/features/event-management/
  /core/
    /repositories/
      event-repository.ts
      tournament-repository.ts
      category-repository.ts
      participant-repository.ts
      target-repository.ts
```

### Implementasi Repository

```typescript
// features/event-management/core/repositories/event-repository.ts
import { supabase } from '@/lib/supabase/client';
import { Event } from '../models/event';

export interface EventRepository {
  findAll(): Promise<Event[]>;
  findById(id: string): Promise<Event | null>;
  findByOrganizerId(organizerId: string): Promise<Event[]>;
  create(data: Omit<Event, 'id'>): Promise<string>;
  update(id: string, data: Partial<Event>): Promise<void>;
  delete(id: string): Promise<void>;
}

// Implementasi dengan Supabase
export const eventRepository: EventRepository = {
  async findAll(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw new Error(`Failed to fetch events: ${error.message}`);
    return data || [];
  },
  
  async findById(id: string): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error && error.code !== 'PGRST116') { // PGRST116 = not found
      throw new Error(`Failed to fetch event: ${error.message}`);
    }
    
    return data || null;
  },
  
  async findByOrganizerId(organizerId: string): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('organizer_id', organizerId)
      .order('created_at', { ascending: false });
      
    if (error) throw new Error(`Failed to fetch events: ${error.message}`);
    return data || [];
  },
  
  async create(data: Omit<Event, 'id'>): Promise<string> {
    const { data: result, error } = await supabase
      .from('events')
      .insert([
        {
          name: data.name,
          description: data.description,
          start_date: data.startDate,
          end_date: data.endDate,
          location: data.location,
          organizer_id: data.organizerId,
          status: data.status,
          banner_url: data.bannerUrl,
          settings: data.settings
        }
      ])
      .select('id')
      .single();
      
    if (error) throw new Error(`Failed to create event: ${error.message}`);
    return result.id;
  },
  
  async update(id: string, data: Partial<Event>): Promise<void> {
    const updateData: any = {};
    
    // Map camelCase to snake_case
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.startDate !== undefined) updateData.start_date = data.startDate;
    if (data.endDate !== undefined) updateData.end_date = data.endDate;
    if (data.location !== undefined) updateData.location = data.location;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.bannerUrl !== undefined) updateData.banner_url = data.bannerUrl;
    if (data.settings !== undefined) updateData.settings = data.settings;
    
    const { error } = await supabase
      .from('events')
      .update(updateData)
      .eq('id', id);
      
    if (error) throw new Error(`Failed to update event: ${error.message}`);
  },
  
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
      
    if (error) throw new Error(`Failed to delete event: ${error.message}`);
  }
};
```

## 8. Integrasi dengan Adapter Pattern

Model domain terintegrasi dengan adapter pattern untuk mendukung berbagai role.

### Adapter Structure

```
/features/event-management/
  /adapters/
    /admin/
      EventAdminAdapter.tsx
      TournamentAdminAdapter.tsx
      CategoryAdminAdapter.tsx
    /organizer/
      EventOrganizerAdapter.tsx
      TournamentOrganizerAdapter.tsx
    /customer/
      EventCustomerAdapter.tsx
```

### Implementasi Adapter

```typescript
// features/event-management/adapters/admin/EventAdminAdapter.tsx
import React, { useEffect, useState } from 'react';
import { Event } from '../../core/models/event';
import { EventService } from '../../core/services/event-service';

interface EventAdminAdapterProps {
  eventId?: string; // Optional for create new scenario
}

export function EventAdminAdapter({ eventId }: EventAdminAdapterProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (eventId) {
      loadEvent(eventId);
    } else {
      // New event scenario
      setEvent(createEmptyEvent());
      setLoading(false);
    }
  }, [eventId]);
  
  const loadEvent = async (id: string) => {
    try {
      setLoading(true);
      const eventData = await EventService.getEventById(id);
      setEvent(eventData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load event');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSave = async (updatedEventData: Event) => {
    try {
      if (eventId) {
        // Update existing event
        await EventService.updateEvent(eventId, updatedEventData);
      } else {
        // Create new event
        const newId = await EventService.createEvent(updatedEventData);
        // Handle redirect or state update with new ID
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save event');
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>Event not found</div>;
  
  return (
    <div className="event-admin-adapter">
      <h1>{eventId ? 'Edit Event' : 'Create New Event'}</h1>
      
      {/* Event form would go here */}
      <EventForm
        initialData={event}
        onSave={handleSave}
      />
      
      {/* Admin-specific actions */}
      {eventId && (
        <div className="admin-actions">
          <button onClick={() => EventService.publishEvent(eventId)}>
            Publish Event
          </button>
        </div>
      )}
    </div>
  );
}
```

## 9. Panduan Konversi dari Struktur Subfeature

Berikut langkah-langkah untuk mengkonversi dari struktur subfeature ke model-driven:

### 1. Identifikasi Model Domain

Langkah pertama adalah mengidentifikasi model domain dari subfeature yang ada:

```
1. Identifikasi entitas utama dalam subfeature (contoh: Tournament dalam subfeature tournaments)
2. Daftar properti dan method dari entitas tersebut
3. Pisahkan antara logika bisnis domain dengan logika UI/interaksi
4. Identifikasi relasi dengan entitas domain lainnya
```

### 2. Ekstraksi Model dari Subfeature

```typescript
// SEBELUM: /features/event-management/subfeatures/tournament/core/models/tournament.ts
export interface TournamentFormData {
  id?: string;
  name: string;
  startDate: string;
  endDate: string;
  description?: string;
  location?: string;
  categories: CategoryReference[];
  settings: TournamentSettings;
}

// SESUDAH: /features/event-management/core/models/tournament.ts
export interface Tournament {
  id: string;
  eventId: string;
  name: string;
  startDate: string;
  endDate: string;
  description?: string;
  type: TournamentType;
  settings: TournamentSettings;
}
```

### 3. Ekstraksi Service dari Subfeature

```typescript
// SEBELUM: /features/event-management/subfeatures/tournament/core/services/tournament-service.ts
export const TournamentService = {
  async getTournamentById(id: string): Promise<TournamentFormData> {
    // Implementasi
  },
  // ...
};

// SESUDAH: /features/event-management/core/services/tournament-service.ts
export class TournamentService {
  static async getTournamentById(id: string): Promise<Tournament | null> {
    return tournamentRepository.findById(id);
  }
  // ...
}
```

### 4. Implementasi Adapter dari Subfeature

```typescript
// SEBELUM: /features/event-management/subfeatures/tournament/adapters/admin/TournamentAdminAdapter.tsx
export function TournamentAdminAdapter({
  tournamentId
}: TournamentAdminAdapterProps) {
  // Implementasi
}

// SESUDAH: /features/event-management/adapters/admin/TournamentAdminAdapter.tsx
export function TournamentAdminAdapter({
  eventId,
  tournamentId
}: TournamentAdminAdapterProps) {
  // Implementasi yang menggunakan TournamentService dari core
}
```

### 5. Langkah Migrasi

```
1. Buat struktur model domain baru di core/models
2. Copy dan refactor model dari subfeature ke core
3. Perbarui service untuk menggunakan model domain baru
4. Implementasikan adapter untuk menggunakan service core
5. Update semua imports yang terdampak
6. Validasi bahwa semua fitur tetap berfungsi
7. Tambahkan unit tests untuk model domain baru
```

## 10. Best Practices dan Checklist

### Checklist Model Domain

- [ ] Model domain ditempatkan dalam folder core/models
- [ ] Model memiliki interface/type yang jelas
- [ ] Model berisi validasi domain untuk menjaga integritas data
- [ ] Model menyediakan factory methods untuk membuat instance baru
- [ ] Relasi antar model terdefinisi dengan jelas
- [ ] Model tidak memiliki ketergantungan pada UI atau framework spesifik
- [ ] Model dieksport dari index.ts untuk API publik yang bersih

### Pedoman Implementasi

1. **Value Type vs Entity**
   - Entity memiliki identitas (ID)
   - Value Type tidak memiliki identitas, nilainya = identitasnya (seperti Address, FullName)

2. **Immutability**
   - Gunakan readonly properties untuk model domain ketika memungkinkan
   - Hindari mutasi langsung, gunakan copy + modification pattern

3. **Domain Methods**
   - Tambahkan method domain yang menangani logika bisnis spesifik
   - Gunakan static methods atau functions untuk operasi pada model

4. **Interface Contracts**
   - Definisikan interface contracts yang jelas antar layer
   - Gunakan TypeScript untuk strict type checking

5. **Naming Convention**
   - Gunakan noun untuk entity dan model
   - Gunakan verb untuk service methods
   - Konsisten dengan casing (camelCase untuk properties, PascalCase untuk types)

### Anti-Patterns yang Dihindari

- ❌ **Model Anemic** - Model tanpa logika bisnis, hanya data
- ❌ **God Object** - Model yang terlalu besar dan menangani terlalu banyak responsibilities
- ❌ **UI State dalam Model Domain** - Mencampurkan state UI dengan model domain
- ❌ **Direct Database Access** - Model domain secara langsung mengakses database

## 11. Validasi dan Pengujian Model

### Pendekatan Validasi

1. **Schema Validation**
   - Gunakan Zod/Yup untuk validasi schema di runtime
   - Definisikan schema yang sesuai dengan model domain

```typescript
// features/event-management/core/models/validation/tournament-schema.ts
import { z } from 'zod';
import { TournamentType } from '../types/enums';

export const tournamentSchema = z.object({
  id: z.string().optional(),
  eventId: z.string().min(1, 'Event ID is required'),
  name: z.string().min(1, 'Name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  description: z.string().optional(),
  type: z.nativeEnum(TournamentType),
  settings: z.object({
    scoringSystem: z.enum(['cumulative', 'elimination', 'custom']),
    maxParticipants: z.number().positive().optional(),
    registrationDeadline: z.string()
  })
});

export type TournamentSchemaType = z.infer<typeof tournamentSchema>;

// Usage in service
export function validateTournamentData(data: any): string[] {
  try {
    tournamentSchema.parse(data);
    return [];
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
    }
    return ['Invalid tournament data'];
  }
}
```

2. **Business Rule Validation**
   - Implement business rule validation dalam domain model
   - Pisahkan dari schema validation

```typescript
// features/event-management/core/models/tournament.ts
export function validateTournamentBusinessRules(tournament: Tournament): string[] {
  const errors: string[] = [];
  
  // Business rules
  if (new Date(tournament.startDate) > new Date(tournament.endDate)) {
    errors.push('Start date cannot be after end date');
  }
  
  if (tournament.settings.registrationDeadline && 
      new Date(tournament.settings.registrationDeadline) > new Date(tournament.startDate)) {
    errors.push('Registration deadline must be before start date');
  }
  
  // More business rules...
  
  return errors;
}
```

### Strategi Testing

1. **Unit Testing Model Domain**

```typescript
// features/event-management/core/models/__tests__/tournament.test.ts
import { Tournament, validateTournament, createEmptyTournament } from '../tournament';
import { TournamentType } from '../types/enums';

describe('Tournament Model', () => {
  describe('validateTournament', () => {
    test('should validate valid tournament', () => {
      const tournament: Tournament = {
        id: '1',
        eventId: '1',
        name: 'Test Tournament',
        startDate: '2025-05-01',
        endDate: '2025-05-03',
        type: TournamentType.QUALIFICATION,
        settings: {
          scoringSystem: 'cumulative',
          registrationDeadline: '2025-04-28'
        }
      };
      
      const errors = validateTournament(tournament);
      expect(errors).toHaveLength(0);
    });
    
    test('should return errors for invalid tournament', () => {
      const tournament: Tournament = {
        id: '1',
        eventId: '1',
        name: '',  // Invalid: empty name
        startDate: '2025-05-05',
        endDate: '2025-05-03',  // Invalid: end before start
        type: TournamentType.QUALIFICATION,
        settings: {
          scoringSystem: 'cumulative',
          registrationDeadline: '2025-05-10' // Invalid: after start date
        }
      };
      
      const errors = validateTournament(tournament);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors).toContain('Tournament name is required');
      expect(errors).toContain('Start date cannot be after end date');
      expect(errors).toContain('Registration deadline should be before tournament start date');
    });
  });
  
  describe('createEmptyTournament', () => {
    test('should create empty tournament with default values', () => {
      const tournament = createEmptyTournament('event-1');
      
      expect(tournament.eventId).toBe('event-1');
      expect(tournament.name).toBe('');
      expect(tournament.type).toBe(TournamentType.QUALIFICATION);
      expect(tournament.settings.scoringSystem).toBe('cumulative');
    });
  });
});
```

2. **Integration Testing dengan Service**

```typescript
// features/event-management/core/services/__tests__/tournament-service.test.ts
import { TournamentService } from '../tournament-service';
import { tournamentRepository } from '../../repositories/tournament-repository';
import { Tournament, TournamentType } from '../../models/tournament';

// Mock repository
jest.mock('../../repositories/tournament-repository');

describe('TournamentService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  
  describe('createTournament', () => {
    test('should create valid tournament', async () => {
      // Arrange
      const newTournament: Omit<Tournament, 'id'> = {
        eventId: 'event-1',
        name: 'Test Tournament',
        startDate: '2025-05-01',
        endDate: '2025-05-03',
        type: TournamentType.QUALIFICATION,
        settings: {
          scoringSystem: 'cumulative',
          registrationDeadline: '2025-04-28'
        }
      };
      
      (tournamentRepository.create as jest.Mock).mockResolvedValue('new-id');
      
      // Act
      const result = await TournamentService.createTournament(newTournament);
      
      // Assert
      expect(result).toBe('new-id');
      expect(tournamentRepository.create).toHaveBeenCalledWith(newTournament);
    });
    
    test('should throw error for invalid tournament', async () => {
      // Arrange
      const invalidTournament: Omit<Tournament, 'id'> = {
        eventId: 'event-1',
        name: '',  // Invalid: empty name
        startDate: '2025-05-05',
        endDate: '2025-05-03',  // Invalid: end before start
        type: TournamentType.QUALIFICATION,
        settings: {
          scoringSystem: 'cumulative',
          registrationDeadline: '2025-05-10'
        }
      };
      
      // Act & Assert
      await expect(
        TournamentService.createTournament(invalidTournament)
      ).rejects.toThrow('Tournament validation failed');
      
      expect(tournamentRepository.create).not.toHaveBeenCalled();
    });
  });
});
```

## 12. Contoh Implementasi

Berikut adalah contoh implementasi lengkap untuk domain model Category:

### Model Implementation

```typescript
// features/event-management/core/models/types/enums.ts
export enum CategoryType {
  RECURVE = 'recurve',
  COMPOUND = 'compound',
  TRADITIONAL = 'traditional',
  BAREBOW = 'barebow',
  NASIONAL = 'nasional'
}

// features/event-management/core/models/category.ts
import { CategoryType } from './types/enums';
import { z } from 'zod';

export interface Category {
  id: string;
  tournamentId: string;
  name: string;
  type: CategoryType;
  settings: CategorySettings;
}

export interface CategorySettings {
  distanceInMeters: number;
  maxArrows: number;
  scoringSystem: 'cumulative' | 'elimination';
  minParticipants?: number;
  maxParticipants?: number;
  ageRestriction?: {
    minAge?: number;
    maxAge?: number;
  };
}

// Zod schema for validation
export const categorySchema = z.object({
  id: z.string().optional(),
  tournamentId: z.string().min(1, 'Tournament ID is required'),
  name: z.string().min(1, 'Category name is required'),
  type: z.nativeEnum(CategoryType),
  settings: z.object({
    distanceInMeters: z.number().positive('Distance must be positive'),
    maxArrows: z.number().positive('Maximum arrows must be positive'),
    scoringSystem: z.enum(['cumulative', 'elimination']),
    minParticipants: z.number().positive().optional(),
    maxParticipants: z.number().positive().optional(),
    ageRestriction: z.object({
      minAge: z.number().nonnegative().optional(),
      maxAge: z.number().positive().optional()
    }).optional()
  })
});

export type CategorySchemaType = z.infer<typeof categorySchema>;

// Validation function
export function validateCategory(category: Category): string[] {
  try {
    categorySchema.parse(category);
    
    const errors: string[] = [];
    
    // Additional business rules
    if (category.settings.ageRestriction) {
      const { minAge, maxAge } = category.settings.ageRestriction;
      if (minAge !== undefined && maxAge !== undefined && minAge >= maxAge) {
        errors.push('Minimum age must be less than maximum age');
      }
    }
    
    if (category.settings.minParticipants !== undefined && 
        category.settings.maxParticipants !== undefined && 
        category.settings.minParticipants > category.settings.maxParticipants) {
      errors.push('Minimum participants must be less than or equal to maximum participants');
    }
    
    return errors;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
    }
    return ['Invalid category data'];
  }
}

// Factory method
export function createEmptyCategory(tournamentId: string = ''): Category {
  return {
    id: '',
    tournamentId,
    name: '',
    type: CategoryType.RECURVE,
    settings: {
      distanceInMeters: 70,
      maxArrows: 72,
      scoringSystem: 'cumulative'
    }
  };
}

// Domain methods
export function canAcceptMoreParticipants(category: Category, currentCount: number): boolean {
  if (!category.settings.maxParticipants) return true;
  return currentCount < category.settings.maxParticipants;
}

export function isParticipantEligibleByAge(category: Category, age: number): boolean {
  if (!category.settings.ageRestriction) return true;
  
  const { minAge, maxAge } = category.settings.ageRestriction;
  
  if (minAge !== undefined && age < minAge) return false;
  if (maxAge !== undefined && age > maxAge) return false;
  
  return true;
}
```

### Repository Implementation

```typescript
// features/event-management/core/repositories/category-repository.ts
import { supabase } from '@/lib/supabase/client';
import { Category, CategorySettings, CategoryType } from '../models/category';

export interface CategoryRepository {
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  findByTournamentId(tournamentId: string): Promise<Category[]>;
  create(data: Omit<Category, 'id'>): Promise<string>;
  update(id: string, data: Partial<Category>): Promise<void>;
  delete(id: string): Promise<void>;
}

// Transform functions between DB and domain model
function dbToCategory(dbRecord: any): Category {
  return {
    id: dbRecord.id,
    tournamentId: dbRecord.tournament_id,
    name: dbRecord.name,
    type: dbRecord.type as CategoryType,
    settings: dbRecord.settings as CategorySettings
  };
}

function categoryToDb(category: Omit<Category, 'id'>): any {
  return {
    tournament_id: category.tournamentId,
    name: category.name,
    type: category.type,
    settings: category.settings
  };
}

// Supabase implementation
export const categoryRepository: CategoryRepository = {
  async findAll(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*');
      
    if (error) throw new Error(`Failed to fetch categories: ${error.message}`);
    return (data || []).map(dbToCategory);
  },
  
  async findById(id: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error && error.code !== 'PGRST116') { // PGRST116 = not found
      throw new Error(`Failed to fetch category: ${error.message}`);
    }
    
    return data ? dbToCategory(data) : null;
  },
  
  async findByTournamentId(tournamentId: string): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('tournament_id', tournamentId);
      
    if (error) throw new Error(`Failed to fetch categories: ${error.message}`);
    return (data || []).map(dbToCategory);
  },
  
  async create(data: Omit<Category, 'id'>): Promise<string> {
    const { data: result, error } = await supabase
      .from('categories')
      .insert([categoryToDb(data)])
      .select('id')
      .single();
      
    if (error) throw new Error(`Failed to create category: ${error.message}`);
    return result.id;
  },
  
  async update(id: string, data: Partial<Category>): Promise<void> {
    const updateData: any = {};
    
    if (data.name !== undefined) updateData.name = data.name;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.settings !== undefined) updateData.settings = data.settings;
    
    const { error } = await supabase
      .from('categories')
      .update(updateData)
      .eq('id', id);
      
    if (error) throw new Error(`Failed to update category: ${error.message}`);
  },
  
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
      
    if (error) throw new Error(`Failed to delete category: ${error.message}`);
  }
};
```

### Service Implementation

```typescript
// features/event-management/core/services/category-service.ts
import { Category, validateCategory, CategoryType } from '../models/category';
import { categoryRepository } from '../repositories/category-repository';
import { tournamentRepository } from '../repositories/tournament-repository';

export class CategoryService {
  // Read operations
  static async getCategories(): Promise<Category[]> {
    return categoryRepository.findAll();
  }
  
  static async getCategoryById(id: string): Promise<Category | null> {
    return categoryRepository.findById(id);
  }
  
  static async getCategoriesByTournamentId(tournamentId: string): Promise<Category[]> {
    return categoryRepository.findByTournamentId(tournamentId);
  }
  
  // Write operations
  static async createCategory(categoryData: Omit<Category, 'id'>): Promise<string> {
    // Validate data
    const errors = validateCategory(categoryData as Category);
    if (errors.length > 0) {
      throw new Error(`Category validation failed: ${errors.join(', ')}`);
    }
    
    // Verify tournament exists
    const tournament = await tournamentRepository.findById(categoryData.tournamentId);
    if (!tournament) {
      throw new Error(`Tournament with ID ${categoryData.tournamentId} not found`);
    }
    
    // Create category
    return categoryRepository.create(categoryData);
  }
  
  static async updateCategory(id: string, categoryData: Partial<Category>): Promise<void> {
    // Get existing category
    const existingCategory = await this.getCategoryById(id);
    if (!existingCategory) {
      throw new Error(`Category with ID ${id} not found`);
    }
    
    // Merge data
    const updatedCategory = { ...existingCategory, ...categoryData };
    
    // Validate merged data
    const errors = validateCategory(updatedCategory);
    if (errors.length > 0) {
      throw new Error(`Category validation failed: ${errors.join(', ')}`);
    }
    
    // Update category
    return categoryRepository.update(id, categoryData);
  }
  
  static async deleteCategory(id: string): Promise<void> {
    // Check if can be deleted (e.g., no participants)
    const canDelete = await this.canDeleteCategory(id);
    if (!canDelete.allowed) {
      throw new Error(`Cannot delete category: ${canDelete.reason}`);
    }
    
    // Delete category
    return categoryRepository.delete(id);
  }
  
  // Business logic
  static async canDeleteCategory(id: string): Promise<{allowed: boolean, reason?: string}> {
    // This would check business rules like:
    // - Are there participants in this category?
    // - Has the tournament already started?
    
    // Simplified example:
    const participantCount = await this.getParticipantCountForCategory(id);
    if (participantCount > 0) {
      return { 
        allowed: false, 
        reason: `Cannot delete category with ${participantCount} participants` 
      };
    }
    
    return { allowed: true };
  }
  
  // Example helper method
  private static async getParticipantCountForCategory(categoryId: string): Promise<number> {
    // In a real implementation, this would call the participant repository
    return 0; // Simplified for example
  }
}
```

### Adapter Implementation

```typescript
// features/event-management/adapters/admin/CategoryAdminAdapter.tsx
import React, { useEffect, useState } from 'react';
import { Category, CategoryType, createEmptyCategory } from '../../core/models/category';
import { CategoryService } from '../../core/services/category-service';

interface CategoryAdminAdapterProps {
  tournamentId: string;
  categoryId?: string; // Optional for create new scenario
}

export function CategoryAdminAdapter({ 
  tournamentId, 
  categoryId 
}: CategoryAdminAdapterProps) {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (categoryId) {
      loadCategory(categoryId);
    } else {
      // New category scenario
      setCategory(createEmptyCategory(tournamentId));
      setLoading(false);
    }
  }, [categoryId, tournamentId]);
  
  const loadCategory = async (id: string) => {
    try {
      setLoading(true);
      const categoryData = await CategoryService.getCategoryById(id);
      setCategory(categoryData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load category');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSave = async (updatedCategoryData: Category) => {
    try {
      if (categoryId) {
        // Update existing category
        await CategoryService.updateCategory(categoryId, updatedCategoryData);
      } else {
        // Create new category
        const newId = await CategoryService.createCategory(updatedCategoryData);
        // Handle redirect or state update with new ID
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save category');
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!category) return <div>Category not found</div>;
  
  return (
    <div className="category-admin-adapter">
      <h1>{categoryId ? 'Edit Category' : 'Create New Category'}</h1>
      
      {/* Category form would go here */}
      <CategoryForm
        initialData={category}
        onSave={handleSave}
      />
      
      {/* Type options */}
      <div className="category-types">
        <h3>Category Types</h3>
        <p>Available types:</p>
        <ul>
          {Object.values(CategoryType).map(type => (
            <li key={type}>{type}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Simple form component for the example
function CategoryForm({ 
  initialData, 
  onSave 
}: { 
  initialData: Category, 
  onSave: (data: Category) => void 
}) {
  const [formData, setFormData] = useState<Category>(initialData);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  // Form implementation would go here
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <div>
        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
        />
      </div>
      
      <div>
        <label>Type</label>
        <select
          value={formData.type}
          onChange={e => setFormData({...formData, type: e.target.value as CategoryType})}
        >
          {Object.values(CategoryType).map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label>Distance (meters)</label>
        <input
          type="number"
          value={formData.settings.distanceInMeters}
          onChange={e => setFormData({
            ...formData, 
            settings: {
              ...formData.settings,
              distanceInMeters: parseInt(e.target.value)
            }
          })}
        />
      </div>
      
      <button type="submit">Save Category</button>
    </form>
  );
}
```

Implementasi di atas menunjukkan pendekatan model-driven lengkap untuk entitas Category, termasuk model domain, repository, service, dan adapter. Ini dapat digunakan sebagai referensi untuk mengimplementasikan model domain lainnya dalam arsitektur MyArchery Platform.