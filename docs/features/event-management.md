# Event Management Feature Documentation

> **Document Version Control**  
> **Created**: May 4, 2025  
> **Author**: Laksmana Tri Moerdani  
> **Status**: Draft  
> **Last Updated**: May 5, 2025
> **Latest Changes**: Menambahkan detail komponen tab, implementasi spesifik UI, dan nilai defaultFormData

## Table of Contents

1. [Overview](#1-overview)
2. [Feature Architecture](#2-feature-architecture)
3. [Domain Models](#3-domain-models)
4. [Core Services](#4-core-services)
5. [UI Implementation](#5-ui-implementation)
6. [Form Validation](#6-form-validation)
7. [Styling and Design](#7-styling-and-design)
8. [Testing Strategy](#8-testing-strategy)
9. [Implementation Checklist](#9-implementation-checklist)
10. [Detailed Component Implementation](#10-detailed-component-implementation)
11. [Default Values and Configuration](#11-default-values-and-configuration)
12. [State Management Details](#12-state-management-details)
13. [Edge Cases and Error Handling](#13-edge-cases-and-error-handling)

## 1. Overview

Fitur Manajemen Event memungkinkan para penyelenggara untuk membuat, mengonfigurasi, dan mengelola event panahan melalui antarmuka yang komprehensif. Fitur ini sangat penting bagi platform MyArchery karena berfungsi sebagai landasan untuk pembuatan dan pengelolaan turnamen.

### 1.1 Fungsi Utama

- Membuat dan mengonfigurasi turnamen dengan pengaturan detail
- Menentukan lokasi turnamen, harga, dan kategori peserta
- Mengatur jadwal pendaftaran dan opsi early bird/pendaftaran terlambat
- Mengonfigurasi kuota dan batasan peserta
- Tampilan dasbor semua event yang dikelola dengan metrik utama

### 1.2 Peran Pengguna

- **Penyelenggara**: Peran utama, kemampuan manajemen event lengkap
- **Admin**: Kemampuan override, fungsi administratif
- **Pelanggan**: Melihat event, akses pendaftaran

## 2. Feature Architecture

Fitur Manajemen Event mengikuti Arsitektur Domain-Driven yang Dikelompokkan Fitur (FCDDA) dengan Pengelompokan Varian.

### 2.1 Struktur Folder

```
/features/event-management/
├── index.ts                 # Public API exports
├── models/                  # Common domain models
│   ├── event.ts             # Base event model
│   ├── validation.ts        # Shared validation logic
│   └── index.ts             # Barrel exports
├── services/                # Common business logic
│   ├── event-service.ts     # Base event service
│   └── index.ts             # Barrel exports
├── repository.ts            # Data access layer for Supabase
├── hooks/                   # Common React hooks
│   ├── useEvents.ts         # Hook for fetching events
│   ├── useEventSearch.ts    # Hook for search functionality
│   └── index.ts             # Barrel exports
├── utils/                   # Common utilities
│   ├── date-formatting.ts   # Date utilities
│   ├── pricing-calculator.ts # Pricing utilities
│   └── index.ts             # Barrel exports
└── variants/                # Event variants
    ├── tournament/          # Tournament variant
    │   ├── model.ts         # Tournament-specific model extensions
    │   ├── service.ts       # Tournament-specific business logic
    │   ├── hooks.ts         # Tournament-specific hooks
    │   ├── components/      # Tournament-specific UI components
    │   │   ├── TournamentCreationForm.tsx
    │   │   ├── TournamentDetails.tsx
    │   │   └── tabs/
    │   │       ├── BasicInfoTab.tsx
    │   │       ├── LocationTab.tsx
    │   │       ├── PricingTab.tsx
    │   │       ├── CategoriesTab.tsx
    │   │       ├── DocumentationTab.tsx
    │   │       └── ...other tabs
    │   ├── ui/              # Role-specific UI adapters
    │   │   ├── admin/
    │   │   │   └── TournamentAdminAdapter.tsx
    │   │   ├── organizer/
    │   │   │   └── TournamentOrganizerAdapter.tsx
    │   │   └── customer/
    │   │       └── TournamentCustomerAdapter.tsx
    │   └── index.ts         # Barrel exports for tournament
    ├── league/              # League variant (future)
    └── series/              # Series variant (future)
```

### 2.2 Titik Integrasi

- **Page Routes**: `/app/(roles)/organizer/events/...`
- **Layout Integration**: Uses `OrganizerLayout` from shared layouts
- **State Management**: Combination of React hooks and context
- **API Layer**: Repository pattern with Supabase client

## 3. Domain Models

### 3.1 Base Event Model

```typescript
// features/event-management/models/event.ts
export interface BaseEventModel {
  id?: string;
  name: string;
  description: string;
  organizer?: string;
  visibility?: 'public' | 'unlisted' | 'private';
  status: EventStatus;
  createdAt?: string;
  updatedAt?: string;
}

export enum EventStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
```

### 3.2 Tournament Model

```typescript
// features/event-management/variants/tournament/model.ts
import { BaseEventModel } from '../../models/event';

export interface TournamentModel extends BaseEventModel {
  // Basic info additional fields
  eventType: string;
  logo: ImageInput;
  bannerImage: ImageInput;
  featuredImage: ImageInput;

  // Location
  locationType: "offline" | "online";
  address?: string;
  city?: string;
  province?: string;
  venue?: string;
  googleMapsUrl?: string;
  onlineLink?: string;

  // Schedule
  startDate: string;
  endDate?: string;
  registrationStartDate?: string;
  registrationEndDate: string;
  
  // Pricing
  pricingType: "single" | "multi";
  singlePrice?: SinglePrice;
  multiPricing?: PricingCategory[];
  earlyBird?: EarlyBirdSettings;
  lateRegistration?: LateRegistrationSettings;
  
  // Capacity
  maxParticipants: number;
  quotaType: "total" | "category";
  categoryQuotas?: CategoryQuota[];
  
  // Categories
  ageCategories?: AgeCategory[];
  equipmentCategories?: EquipmentCategory[];
  
  // Additional settings
  generalRules?: string;
  schedule?: string;
  termsAndConditions?: string;
  requireTermsAcceptance?: boolean;
  countdown?: CountdownSettings;
}

export interface SinglePrice {
  price: number;
  currency: string;
}

export interface PricingCategory {
  category: string;
  price: number;
  currency: string;
}

export interface EarlyBirdSettings {
  enabled: boolean;
  discount: number;
  endDate: string;
}

export interface LateRegistrationSettings {
  enabled: boolean;
  fee: number;
  startDate: string;
}

export interface CategoryQuota {
  category: string;
  quota: number | string;
}

export interface AgeCategory {
  name: string;
  minAge: number;
  maxAge: number;
}

export interface EquipmentCategory {
  name: string;
  description?: string;
}

export interface CountdownSettings {
  eventStart?: boolean;
  registrationEnd?: boolean;
}

export interface ImageInput {
  url?: string;
  file?: File;
  preview?: string;
}

export type TournamentFormData = TournamentModel;
```

## 4. Core Services

### 4.1 Repository Layer

```typescript
// features/event-management/repository.ts
import { supabaseClient } from '@/lib/supabase';
import { BaseEventModel } from './models/event';

export const eventRepository = {
  async getEvents(filters?: any): Promise<BaseEventModel[]> {
    const query = supabaseClient.from('events').select('*');
    
    // Apply filters if provided
    if (filters?.status) {
      query.eq('status', filters.status);
    }
    
    if (filters?.searchTerm) {
      query.or(`name.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },
  
  async getEventById(id: string): Promise<BaseEventModel | null> {
    const { data, error } = await supabaseClient
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  },
  
  async createEvent(eventData: BaseEventModel): Promise<string> {
    const { data, error } = await supabaseClient
      .from('events')
      .insert([{
        ...eventData,
        created_at: new Date().toISOString()
      }])
      .select('id')
      .single();
      
    if (error) throw error;
    return data.id;
  },
  
  async updateEvent(id: string, eventData: Partial<BaseEventModel>): Promise<boolean> {
    const { error } = await supabaseClient
      .from('events')
      .update({
        ...eventData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);
      
    return !error;
  },
  
  async deleteEvent(id: string): Promise<boolean> {
    const { error } = await supabaseClient
      .from('events')
      .delete()
      .eq('id', id);
      
    return !error;
  }
};
```

### 4.2 Common Event Service

```typescript
// features/event-management/services/event-service.ts
import { BaseEventModel, EventStatus } from '../models/event';
import { eventRepository } from '../repository';

export class EventService {
  static async getEvents(filters?: any): Promise<BaseEventModel[]> {
    return eventRepository.getEvents(filters);
  }
  
  static async getEventById(id: string): Promise<BaseEventModel | null> {
    return eventRepository.getEventById(id);
  }
  
  static async createEvent(eventData: BaseEventModel): Promise<string> {
    return eventRepository.createEvent(eventData);
  }
  
  static async updateEvent(id: string, eventData: Partial<BaseEventModel>): Promise<boolean> {
    return eventRepository.updateEvent(id, eventData);
  }
  
  static async deleteEvent(id: string): Promise<boolean> {
    return eventRepository.deleteEvent(id);
  }
  
  static async publishEvent(id: string): Promise<boolean> {
    return eventRepository.updateEvent(id, { status: EventStatus.PUBLISHED });
  }
}
```

### 4.3 Tournament Service

```typescript
// features/event-management/variants/tournament/service.ts
import { TournamentModel } from './model';
import { EventStatus } from '../../models/event';
import { EventService } from '../../services/event-service';
import { eventRepository } from '../../repository';

export class TournamentService extends EventService {
  static async createTournament(tournamentData: TournamentModel): Promise<string> {
    // Add tournament-specific validation
    this.validateTournamentData(tournamentData);
    
    // Process image uploads if needed
    const processedData = await this.processImages(tournamentData);
    
    // Create the base event
    const tournamentId = await eventRepository.createEvent({
      ...processedData,
      eventType: 'tournament'
    });
    
    // Add tournament-specific data
    await this.saveTournamentDetails(tournamentId, processedData);
    
    return tournamentId;
  }
  
  static async getTournament(id: string): Promise<TournamentModel | null> {
    const event = await eventRepository.getEventById(id);
    if (!event || event.eventType !== 'tournament') return null;
    
    // Fetch additional tournament details
    const tournamentDetails = await this.fetchTournamentDetails(id);
    
    // Combine base event with tournament details
    return {
      ...event,
      ...tournamentDetails
    } as TournamentModel;
  }
  
  static async updateTournament(id: string, tournamentData: Partial<TournamentModel>): Promise<boolean> {
    this.validateTournamentData(tournamentData as TournamentModel);
    
    const processedData = await this.processImages(tournamentData as TournamentModel);
    
    // Update base event properties
    const baseUpdated = await eventRepository.updateEvent(id, {
      name: processedData.name,
      description: processedData.description,
      visibility: processedData.visibility,
      status: processedData.status
    });
    
    // Update tournament specific properties
    const detailsUpdated = await this.updateTournamentDetails(id, processedData);
    
    return baseUpdated && detailsUpdated;
  }
  
  private static validateTournamentData(data: TournamentModel): void {
    // Implement extensive validation
    if (!data.name?.trim()) {
      throw new Error("Tournament name is required");
    }
    
    if (!data.startDate) {
      throw new Error("Tournament start date is required");
    }
    
    if (!data.registrationEndDate) {
      throw new Error("Registration end date is required");
    }
    
    // More validations...
  }
  
  private static async processImages(data: TournamentModel): Promise<TournamentModel> {
    // Process and upload images
    // Return updated data with image URLs
    return data;
  }
  
  private static async saveTournamentDetails(id: string, data: TournamentModel): Promise<boolean> {
    // Save tournament-specific details to a separate table
    return true;
  }
  
  private static async fetchTournamentDetails(id: string): Promise<Partial<TournamentModel>> {
    // Fetch tournament-specific details
    return {};
  }
  
  private static async updateTournamentDetails(id: string, data: Partial<TournamentModel>): Promise<boolean> {
    // Update tournament-specific details
    return true;
  }
}
```

### 4.4 Event Hooks

```typescript
// features/event-management/hooks/useEvents.ts
import { useState, useEffect } from 'react';
import { BaseEventModel } from '../models/event';
import { EventService } from '../services/event-service';

export function useEvents(filters?: any) {
  const [events, setEvents] = useState<BaseEventModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await EventService.getEvents(filters);
        setEvents(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, [JSON.stringify(filters)]);
  
  return { events, loading, error };
}
```

```typescript
// features/event-management/variants/tournament/hooks.ts
import { useState, useEffect } from 'react';
import { TournamentModel } from './model';
import { TournamentService } from './service';

export function useTournament(id?: string) {
  const [tournament, setTournament] = useState<TournamentModel | null>(null);
  const [loading, setLoading] = useState(id ? true : false);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    if (!id) return;
    
    const fetchTournament = async () => {
      try {
        setLoading(true);
        const data = await TournamentService.getTournament(id);
        setTournament(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching tournament:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTournament();
  }, [id]);
  
  const saveTournament = async (data: TournamentModel) => {
    try {
      setLoading(true);
      let tournamentId: string;
      
      if (id) {
        await TournamentService.updateTournament(id, data);
        tournamentId = id;
      } else {
        tournamentId = await TournamentService.createTournament(data);
      }
      
      const updatedTournament = await TournamentService.getTournament(tournamentId);
      setTournament(updatedTournament);
      setError(null);
      return tournamentId;
    } catch (err) {
      console.error("Error saving tournament:", err);
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return { 
    tournament, 
    loading, 
    error, 
    saveTournament 
  };
}
```

## 5. UI Implementation

### 5.1 Tournament Creation Form

The tournament creation form is implemented as a multi-tab form with progressive disclosure of information:

```tsx
// features/event-management/variants/tournament/components/TournamentCreationForm.tsx
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { TournamentBasicInfoTab } from './tabs/TournamentBasicInfoTab';
import { TournamentLocationTab } from './tabs/TournamentLocationTab';
import { TournamentPricingTab } from './tabs/TournamentPricingTab';
import { TournamentCategoriesTab } from './tabs/TournamentCategoriesTab';
import { TournamentDocumentationTab } from './tabs/TournamentDocumentationTab';

import { TournamentFormData } from '../model';
import { defaultFormData } from '../utils/defaults';

export interface TournamentCreationFormProps {
  initialData?: Partial<TournamentFormData>;
  onSubmit: (formData: TournamentFormData) => Promise<string>;
  isEditMode?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}

const TABS = {
  BASIC_INFO: 'basic-info',
  LOCATION: 'location',
  PRICING: 'pricing',
  CATEGORIES: 'categories',
  DOCUMENTATION: 'documentation',
};

export function TournamentCreationForm({
  initialData,
  onSubmit,
  isEditMode = false,
  canEdit = true,
  canDelete = false,
}: TournamentCreationFormProps) {
  const [activeTab, setActiveTab] = useState<string>(TABS.BASIC_INFO);
  const [formData, setFormData] = useState<TournamentFormData>({
    ...defaultFormData,
    ...initialData
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Field change handler
  const handleFieldChange = (
    field: keyof TournamentFormData, 
    value: any
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  // Generic input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handleFieldChange(name as keyof TournamentFormData, value);
  };
  
  // Tab validation functions
  const validateBasicInfoTab = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) {
      newErrors.name = "Nama tournament harus diisi";
    }
    // More validations...
    return newErrors;
  };
  
  const validateCurrentTab = (): boolean => {
    let newErrors: Record<string, string> = {};
    
    switch (activeTab) {
      case TABS.BASIC_INFO:
        newErrors = validateBasicInfoTab();
        break;
      case TABS.LOCATION:
        // Location validation
        break;
      case TABS.PRICING:
        // Pricing validation
        break;
      case TABS.CATEGORIES:
        // Categories validation
        break;
      case TABS.DOCUMENTATION:
        // Documentation validation
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateFullForm = (): boolean => {
    // Combine all tab validations
    const allErrors = {
      ...validateBasicInfoTab(),
      // Add other tab validations...
    };
    
    setErrors(allErrors);
    return Object.keys(allErrors).length === 0;
  };
  
  // Tab navigation
  const handleNextTab = () => {
    if (validateCurrentTab()) {
      switch (activeTab) {
        case TABS.BASIC_INFO: 
          setActiveTab(TABS.LOCATION); 
          break;
        case TABS.LOCATION: 
          setActiveTab(TABS.PRICING); 
          break;
        case TABS.PRICING: 
          setActiveTab(TABS.CATEGORIES); 
          break;
        case TABS.CATEGORIES: 
          setActiveTab(TABS.DOCUMENTATION); 
          break;
      }
    }
  };
  
  const handlePreviousTab = () => {
    switch (activeTab) {
      case TABS.LOCATION: 
        setActiveTab(TABS.BASIC_INFO); 
        break;
      case TABS.PRICING: 
        setActiveTab(TABS.LOCATION); 
        break;
      case TABS.CATEGORIES: 
        setActiveTab(TABS.PRICING); 
        break;
      case TABS.DOCUMENTATION: 
        setActiveTab(TABS.CATEGORIES); 
        break;
    }
  };
  
  // Form submission
  const handleSubmit = async (e: React.FormEvent, isDraft: boolean) => {
    e.preventDefault();
    
    if (isDraft || validateFullForm()) {
      setIsSubmitting(true);
      
      try {
        await onSubmit({
          ...formData,
          status: isDraft ? "draft" : "published"
        });
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  // Disabled if not editable or submitting
  const isDisabled = isSubmitting || !canEdit;
  
  return (
    <form onSubmit={(e) => handleSubmit(e, false)}>
      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? 'Edit Tournament' : 'Buat Tournament Baru'}</CardTitle>
          <CardDescription>
            Lengkapi informasi untuk {isEditMode ? 'mengubah' : 'membuat'} tournament panahan
          </CardDescription>
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="px-6">
            <TabsTrigger value={TABS.BASIC_INFO}>Info Dasar</TabsTrigger>
            <TabsTrigger value={TABS.LOCATION}>Lokasi</TabsTrigger>
            <TabsTrigger value={TABS.PRICING}>Harga & Pendaftaran</TabsTrigger>
            <TabsTrigger value={TABS.CATEGORIES}>Kategori</TabsTrigger>
            <TabsTrigger value={TABS.DOCUMENTATION}>Dokumentasi</TabsTrigger>
          </TabsList>
          
          <div className="p-6">
            <TabsContent value={TABS.BASIC_INFO}>
              <TournamentBasicInfoTab 
                formData={formData} 
                onFieldChange={handleFieldChange}
                onInputChange={handleInputChange}
                errors={errors}
                disabled={isDisabled}
              />
            </TabsContent>
            
            <TabsContent value={TABS.LOCATION}>
              <TournamentLocationTab 
                formData={formData} 
                onFieldChange={handleFieldChange}
                onInputChange={handleInputChange}
                errors={errors}
                disabled={isDisabled}
              />
            </TabsContent>
            
            <TabsContent value={TABS.PRICING}>
              <TournamentPricingTab 
                formData={formData} 
                onFieldChange={handleFieldChange}
                onInputChange={handleInputChange}
                errors={errors}
                disabled={isDisabled}
              />
            </TabsContent>
            
            <TabsContent value={TABS.CATEGORIES}>
              <TournamentCategoriesTab 
                formData={formData} 
                onFieldChange={handleFieldChange}
                onInputChange={handleInputChange}
                errors={errors}
                disabled={isDisabled}
              />
            </TabsContent>
            
            <TabsContent value={TABS.DOCUMENTATION}>
              <TournamentDocumentationTab 
                formData={formData} 
                onFieldChange={handleFieldChange}
                onInputChange={handleInputChange}
                errors={errors}
                disabled={isDisabled}
              />
            </TabsContent>
          </div>
        </Tabs>
        
        {/* Navigation and submit buttons */}
        <div className="flex justify-between items-center p-6 pt-0">
          {activeTab !== TABS.BASIC_INFO ? (
            <Button 
              type="button" 
              variant="outline" 
              onClick={handlePreviousTab}
              disabled={isDisabled}
            >
              Sebelumnya
            </Button>
          ) : (
            <div></div> // Empty div to maintain flex spacing
          )}
          
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={(e) => handleSubmit(e, true)}
              disabled={isDisabled}
            >
              Simpan Draft
            </Button>
            
            {activeTab !== TABS.DOCUMENTATION ? (
              <Button 
                type="button" 
                onClick={handleNextTab}
                disabled={isDisabled}
              >
                Lanjutkan
              </Button>
            ) : (
              <Button 
                type="submit"
                disabled={isDisabled}
              >
                {isEditMode ? 'Simpan Perubahan' : 'Publikasikan Tournament'}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </form>
  );
}
```

### 5.2 Event Dashboard

```tsx
// features/event-management/variants/tournament/ui/organizer/EventsDashboard.tsx
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Eye, Trash, Calendar, MapPin, Users } from 'lucide-react';

import { useEvents } from '../../../../hooks/useEvents';
import { formatCurrency } from '../../../../utils/formatters';

export interface EventsDashboardProps {
  onCreateEvent: () => void;
  onEditEvent: (id: string) => void;
  onViewEvent: (id: string) => void;
  onDeleteEvent: (id: string) => void;
}

export function EventsDashboard({
  onCreateEvent,
  onEditEvent,
  onViewEvent,
  onDeleteEvent
}: EventsDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Fetch events using hook
  const { events, loading, error } = useEvents();
  
  // Filter events based on search and status
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Calculate statistics
  const totalEvents = events.length;
  const activeEvents = events.filter(e => e.status === "active" || e.status === "published").length;
  const totalParticipants = events.reduce((sum, event) => sum + (event.participants || 0), 0);
  const totalRevenue = events.reduce((sum, event) => sum + (event.revenue || 0), 0);
  
  // Status badge classes
  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-slate-100 text-slate-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };
  
  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Event Management</h1>
          <p className="text-slate-600">Kelola semua event panahan Anda</p>
        </div>
        <Button onClick={onCreateEvent} className="bg-green-600 hover:bg-green-700">
          <Plus size={16} className="mr-2" />
          Buat Event Baru
        </Button>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Event</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{totalEvents}</p>
            <div className="text-sm text-blue-700 mt-1">Event yang Anda kelola</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Event Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{activeEvents}</p>
            <div className="text-sm text-green-700 mt-1">Event yang sedang berjalan</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Peserta</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">{totalParticipants}</p>
            <div className="text-sm text-purple-700 mt-1">Jumlah semua peserta</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Pendapatan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-600">{formatCurrency(totalRevenue, 'IDR')}</p>
            <div className="text-sm text-amber-700 mt-1">Total pendapatan event</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
          {/* Search input */}
          <div className="w-full md:w-1/3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <Input
                className="pl-10"
                placeholder="Cari event..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Status filter */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              className="text-sm h-9"
              onClick={() => setStatusFilter("all")}
            >
              Semua
            </Button>
            <Button
              variant={statusFilter === "published" ? "default" : "outline"}
              className="text-sm h-9"
              onClick={() => setStatusFilter("published")}
            >
              Dipublikasi
            </Button>
            <Button
              variant={statusFilter === "draft" ? "default" : "outline"}
              className="text-sm h-9"
              onClick={() => setStatusFilter("draft")}
            >
              Draft
            </Button>
            <Button
              variant={statusFilter === "active" ? "default" : "outline"}
              className="text-sm h-9"
              onClick={() => setStatusFilter("active")}
            >
              Berlangsung
            </Button>
            <Button
              variant={statusFilter === "completed" ? "default" : "outline"}
              className="text-sm h-9"
              onClick={() => setStatusFilter("completed")}
            >
              Selesai
            </Button>
          </div>
        </div>
      </div>

      {/* Event List */}
      {loading ? (
        <div className="flex justify-center items-center p-12">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-t-blue-600 border-r-blue-600 border-b-blue-200 border-l-blue-200 rounded-full animate-spin mb-4 mx-auto"></div>
            <p className="text-gray-600">Memuat data event...</p>
          </div>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow-sm border border-slate-200 text-center">
          <p className="text-lg text-slate-500 mb-4">Tidak ada event yang ditemukan</p>
          <Button onClick={onCreateEvent}>
            <Plus size={16} className="mr-2" />
            Buat Event Baru
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm border p-5">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* Left column: Event details */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{event.name}</h3>
                    <Badge className={getStatusBadgeClasses(event.status)}>
                      {event.status === 'published' ? 'Dipublikasi' : 
                       event.status === 'draft' ? 'Draft' : 
                       event.status === 'active' ? 'Berlangsung' : 
                       event.status === 'completed' ? 'Selesai' : 
                       event.status === 'cancelled' ? 'Dibatalkan' : 
                       'Status lain'}
                    </Badge>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{event.startDate ? new Date(event.startDate).toLocaleDateString('id-ID') : 'TBA'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{event.locationType === 'offline' ? (event.city || 'TBA') : 'Online'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{event.participants || 0} peserta</span>
                    </div>
                  </div>
                </div>
                
                {/* Right column: Actions */}
                <div className="flex flex-col justify-between">
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEditEvent(event.id as string)}
                    >
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewEvent(event.id as string)}
                    >
                      <Eye size={14} className="mr-1" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => onDeleteEvent(event.id as string)}
                    >
                      <Trash size={14} className="mr-1" />
                      Hapus
                    </Button>
                  </div>
                  
                  <div className="mt-4 text-right">
                    <div className="text-xs text-slate-500">Total Pendapatan</div>
                    <div className="font-semibold text-lg">
                      {formatCurrency(event.revenue || 0, 'IDR')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### 5.3 Role-specific Adapters

```tsx
// features/event-management/variants/tournament/ui/organizer/TournamentOrganizerAdapter.tsx
import { useRouter } from 'next/navigation';
import { TournamentCreationForm } from '../../components/TournamentCreationForm';
import { TournamentFormData } from '../../model';
import { useTournament } from '../../hooks';

export interface TournamentOrganizerAdapterProps {
  tournamentId?: string;
  initialData?: Partial<TournamentFormData>;
  onSubmitSuccess?: (tournamentId: string) => void;
}

export function TournamentOrganizerAdapter({
  tournamentId,
  initialData,
  onSubmitSuccess,
}: TournamentOrganizerAdapterProps) {
  const router = useRouter();
  const { tournament, loading, error, saveTournament } = useTournament(tournamentId);
  
  // Organizer-specific permissions
  const canEdit = true;
  const canDelete = true;
  
  // Form submission handler
  const handleSubmit = async (formData: TournamentFormData) => {
    try {
      const id = await saveTournament(formData);
      
      if (onSubmitSuccess) {
        onSubmitSuccess(id);
      } else {
        // Default behavior: redirect to event management
        router.push(`/organizer/events/tournament/${id}/dashboard`);
      }
      
      return id;
    } catch (error) {
      console.error('Error submitting tournament data:', error);
      throw error;
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-t-blue-600 border-r-blue-600 border-b-blue-200 border-l-blue-200 rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-gray-600">Memuat data tournament...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center">
        <p className="text-red-600 mb-2">Terjadi kesalahan saat memuat tournament</p>
        <p className="text-sm text-red-500">{error.message}</p>
      </div>
    );
  }
  
  return (
    <div className="tournament-organizer-wrapper">
      <TournamentCreationForm 
        initialData={tournament || initialData}
        onSubmit={handleSubmit}
        isEditMode={!!tournamentId}
        canEdit={canEdit}
        canDelete={canDelete}
      />
    </div>
  );
}
```

## 6. Form Validation

### 6.1 Strategi Validasi

Implementasi formulir menggunakan strategi validasi yang kuat:

1. **Validasi Tingkat Tab**: 
   - Memvalidasi tab saat ini sebelum memungkinkan navigasi ke tab berikutnya
   - Menampilkan kesalahan secara inline untuk setiap field
   - Mencegah pengiriman formulir hingga semua field yang diperlukan valid

2. **Validasi Tingkat Field**:
   - Menghapus kesalahan saat field diubah
   - Memvalidasi jenis field tertentu (angka, tanggal, URL)
   - Menegakkan aturan bisnis seperti "tanggal selesai harus setelah tanggal mulai"

3. **Validasi Pengiriman Formulir**:
   - Melakukan validasi formulir lengkap sebelum pengiriman
   - Pengecualian untuk menyimpan sebagai draft, yang memungkinkan data tidak lengkap

### 6.2 Contoh Logika Validasi

```typescript
// Basic Info Tab Validation
const validateBasicInfoTab = (data: TournamentFormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!data.name?.trim()) {
    errors.name = "Nama tournament harus diisi";
  }
  
  if (!data.startDate) {
    errors.startDate = "Tanggal mulai tournament harus diisi";
  }
  
  if (!data.endDate) {
    errors.endDate = "Tanggal selesai tournament harus diisi";
  } else if (data.startDate && data.endDate && new Date(data.endDate) <= new Date(data.startDate)) {
    errors.endDate = "Tanggal selesai harus setelah tanggal mulai";
  }
  
  if (!data.registrationStartDate) {
    errors.registrationStartDate = "Tanggal mulai pendaftaran harus diisi";
  }
  
  if (!data.registrationEndDate) {
    errors.registrationEndDate = "Tanggal selesai pendaftaran harus diisi";
  } else if (data.registrationStartDate && data.registrationEndDate && 
             new Date(data.registrationEndDate) <= new Date(data.registrationStartDate)) {
    errors.registrationEndDate = "Tanggal selesai pendaftaran harus setelah tanggal mulai";
  }
  
  if (data.registrationEndDate && data.startDate && 
      new Date(data.registrationEndDate) > new Date(data.startDate)) {
    errors.registrationEndDate = "Pendaftaran harus ditutup sebelum event dimulai";
  }
  
  return errors;
};

// Location Tab Validation
const validateLocationTab = (data: TournamentFormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (data.locationType === "offline") {
    if (!data.address?.trim()) {
      errors.address = "Alamat venue harus diisi";
    }
    if (!data.city?.trim()) {
      errors.city = "Kota harus diisi";
    }
    if (!data.province?.trim()) {
      errors.province = "Provinsi harus diisi";
    }
  } else if (data.locationType === "online") {
    if (!data.onlineLink?.trim()) {
      errors.onlineLink = "Link lokasi online harus diisi";
    } else if (!/^https?:\/\/.+/.test(data.onlineLink)) {
      errors.onlineLink = "Link harus diawali dengan http:// atau https://";
    }
  }
  
  return errors;
};

// Pricing Tab Validation
const validatePricingTab = (data: TournamentFormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  // Pricing model validation
  if (data.pricingType === "single") {
    if (!data.singlePrice?.price || data.singlePrice.price <= 0) {
      errors.singlePrice = "Harga pendaftaran harus diisi dan lebih dari 0";
    }
  } else if (data.pricingType === "multi") {
    if (!data.multiPricing || data.multiPricing.length === 0) {
      errors.multiPricing = "Minimal satu kategori harga harus ditambahkan";
    } else {
      // Validate each price category
      data.multiPricing.forEach((category, index) => {
        if (!category.category?.trim()) {
          errors[`multiPricing_${index}_category`] = "Nama kategori harus diisi";
        }
        if (!category.price || category.price <= 0) {
          errors[`multiPricing_${index}_price`] = "Harga harus diisi dan lebih dari 0";
        }
      });
    }
  }
  
  // Early bird validation
  if (data.earlyBird?.enabled) {
    if (!data.earlyBird.discount || data.earlyBird.discount <= 0 || data.earlyBird.discount >= 100) {
      errors.earlyBirdDiscount = "Diskon early bird harus antara 1-99%";
    }
    if (!data.earlyBird.endDate) {
      errors.earlyBirdEndDate = "Tanggal akhir early bird harus diisi";
    } else if (data.registrationStartDate && data.earlyBird.endDate && 
              (new Date(data.earlyBird.endDate) <= new Date(data.registrationStartDate) || 
               new Date(data.earlyBird.endDate) >= new Date(data.registrationEndDate))) {
      errors.earlyBirdEndDate = "Tanggal akhir early bird harus dalam periode pendaftaran";
    }
  }
  
  // Late registration validation
  if (data.lateRegistration?.enabled) {
    if (!data.lateRegistration.fee || data.lateRegistration.fee <= 0) {
      errors.lateRegistrationFee = "Biaya denda keterlambatan harus diisi dan lebih dari 0";
    }
    if (!data.lateRegistration.startDate) {
      errors.lateRegistrationStartDate = "Tanggal mulai denda keterlambatan harus diisi";
    } else if (data.registrationStartDate && data.lateRegistration.startDate && 
              (new Date(data.lateRegistration.startDate) <= new Date(data.registrationStartDate) || 
               new Date(data.lateRegistration.startDate) >= new Date(data.registrationEndDate))) {
      errors.lateRegistrationStartDate = "Tanggal mulai denda harus dalam periode pendaftaran";
    }
  }
  
  // Quota validation
  if (data.quotaType === "total") {
    if (!data.maxParticipants || data.maxParticipants <= 0) {
      errors.maxParticipants = "Jumlah maksimum peserta harus diisi dan lebih dari 0";
    }
  } else if (data.quotaType === "category") {
    if (!data.categoryQuotas || data.categoryQuotas.length === 0) {
      errors.categoryQuotas = "Kuota harus ditentukan untuk setiap kategori";
    } else {
      // Validate each category quota
      data.categoryQuotas.forEach((quota, index) => {
        if (!quota.category?.trim()) {
          errors[`categoryQuota_${index}_category`] = "Nama kategori harus diisi";
        }
        const quotaValue = parseInt(quota.quota as string, 10);
        if (isNaN(quotaValue) || quotaValue <= 0) {
          errors[`categoryQuota_${index}_quota`] = "Kuota harus diisi dan lebih dari 0";
        }
      });
    }
  }
  
  return errors;
};
```

## 7. Styling and Design

### 7.1 Prinsip Desain

Fitur Manajemen Event mengikuti prinsip desain berikut:

1. **Tata Letak Kartu yang Konsisten**: Semua konten dikelompokkan dalam kartu dengan padding dan spasi yang konsisten
2. **Hierarki Visual**: Hierarki tipografi yang jelas dari judul halaman hingga teks bantuan
3. **Warna Semantik**: Warna status membedakan status dan tindakan event
4. **Pengungkapan Bertahap**: Formulir multi-tab mengungkapkan kompleksitas secara bertahap
5. **Desain Responsif**: Beradaptasi dari mobile ke desktop dengan tata letak yang fleksibel

### 7.2 Warna Semantik

```typescript
// Status colors
const statusColors = {
  published: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200'
  },
  draft: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-200'
  },
  active: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200'
  },
  completed: {
    bg: 'bg-slate-100',
    text: 'text-slate-800',
    border: 'border-slate-200'
  },
  cancelled: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200'
  },
};

// Action colors
const actionColors = {
  create: 'bg-green-600 hover:bg-green-700',
  edit: 'bg-blue-600 hover:bg-blue-700',
  delete: 'text-red-600 border-red-200 hover:bg-red-50',
  cancel: 'bg-slate-200 hover:bg-slate-300 text-slate-800',
};
```

### 7.3 Sistem Spasi

Fitur ini menggunakan skala spasi yang konsisten:

- **Card padding**: `p-6` (1.5rem)
- **Form group spacing**: `space-y-4` (1rem)
- **Field spacing**: `space-y-2` (0.5rem)
- **Button spacing**: `gap-3` (0.75rem)
- **Section spacing**: `mb-6` (1.5rem)
- **Card content spacing**: `p-6` (1.5rem)

### 7.4 Breakpoint Responsif

```css
/* Mobile first */
.grid-cols-1 /* Default single column */

/* Tablet breakpoint */
@media (min-width: 768px) {
  .md\:grid-cols-2
  .md\:flex-row
}

/* Desktop breakpoint */
@media (min-width: 1024px) {
  .lg\:grid-cols-4
}
```

## 8. Testing Strategy

### 8.1 Unit Tests

Unit tests should focus on:

1. **Domain Model Validation**: Verify model constraints and business rules
2. **Service Layer Logic**: Test domain services in isolation with mocked repository
3. **Utility Functions**: Validate helper functions for formatting, calculations, etc.

Example unit test for validation:

```typescript
// tests/features/event-management/models/validation.test.ts
import { validateTournamentData } from '@/features/event-management/models/validation';
import { TournamentFormData } from '@/features/event-management/variants/tournament/model';

describe('Tournament Validation', () => {
  test('should validate required fields', () => {
    const emptyData = {} as TournamentFormData;
    const errors = validateTournamentData(emptyData);
    
    expect(errors.name).toBeDefined();
    expect(errors.startDate).toBeDefined();
    expect(errors.registrationEndDate).toBeDefined();
  });
  
  test('should validate date logic', () => {
    const invalidDates = {
      startDate: '2023-05-20',
      endDate: '2023-05-15', // End before start
      registrationStartDate: '2023-04-01',
      registrationEndDate: '2023-05-25' // Registration ends after event starts
    } as TournamentFormData;
    
    const errors = validateTournamentData(invalidDates);
    
    expect(errors.endDate).toBeDefined();
    expect(errors.registrationEndDate).toBeDefined();
  });
  
  test('should validate pricing', () => {
    const invalidPricing = {
      pricingType: 'single',
      singlePrice: { price: -100, currency: 'IDR' } // Negative price
    } as unknown as TournamentFormData;
    
    const errors = validateTournamentData(invalidPricing);
    
    expect(errors.singlePrice).toBeDefined();
  });
});
```

### 8.2 Component Tests

Component tests should verify:

1. **Form Functionality**: Test validation, submission, and tab navigation
2. **UI Adapters**: Ensure adapters correctly render based on role and permissions
3. **Dashboard Filtering**: Verify search and filter functionality

Example component test for form:

```typescript
// tests/features/event-management/components/TournamentCreationForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TournamentCreationForm } from '@/features/event-management/variants/tournament/components/TournamentCreationForm';

describe('TournamentCreationForm', () => {
  const mockSubmit = jest.fn();
  
  beforeEach(() => {
    mockSubmit.mockClear();
  });
  
  test('should show validation errors and prevent navigation when fields are empty', async () => {
    render(<TournamentCreationForm onSubmit={mockSubmit} />);
    
    // Try to navigate to next tab without filling required fields
    fireEvent.click(screen.getByText('Lanjutkan'));
    
    // Check if error messages are shown
    expect(screen.getByText('Nama tournament harus diisi')).toBeInTheDocument();
    expect(screen.getByText('Tanggal mulai tournament harus diisi')).toBeInTheDocument();
    
    // Check that the tab didn't change
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Info Dasar');
  });
  
  test('should allow navigation when fields are valid', async () => {
    render(<TournamentCreationForm onSubmit={mockSubmit} />);
    
    // Fill required fields in the basic info tab
    fireEvent.change(screen.getByLabelText(/Nama Tournament/), {
      target: { value: 'Test Tournament' }
    });
    
    // Fill dates
    // ... (more field filling)
    
    // Try to navigate to next tab
    fireEvent.click(screen.getByText('Lanjutkan'));
    
    // Check that the tab changed
    await waitFor(() => {
      expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Lokasi');
    });
  });
  
  test('should allow saving as draft with incomplete data', async () => {
    render(<TournamentCreationForm onSubmit={mockSubmit} />);
    
    // Fill only name
    fireEvent.change(screen.getByLabelText(/Nama Tournament/), {
      target: { value: 'Draft Tournament' }
    });
    
    // Save as draft
    fireEvent.click(screen.getByText('Simpan Draft'));
    
    // Check if the submit function was called with the right data
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ 
          name: 'Draft Tournament',
          status: 'draft' 
        })
      );
    });
  });
});
```

### 8.3 Integration Tests

Integration tests should verify:

1. **Complete User Flows**: Test end-to-end paths like creating and publishing an event
2. **Service-Repository Integration**: Verify services correctly interact with the data layer
3. **Edge Cases**: Test error handling and recovery paths

## 9. Implementation Checklist

### 9.1 Struktur Dasar

- [ ] Buat struktur folder fitur mengikuti pola FCDDA
- [ ] Buat file barrel export untuk setiap direktori
- [ ] Siapkan file route yang diperlukan di `/app/(roles)/organizer/events/...`

### 9.2 Model Domain

- [ ] Implementasikan model event dasar
- [ ] Implementasikan ekstensi model turnamen
- [ ] Buat utilitas validasi

### 9.3 Layanan dan Repository

- [ ] Buat repository event dengan operasi CRUD
- [ ] Implementasikan layanan event dasar
- [ ] Implementasikan layanan varian turnamen

### 9.4 Komponen UI

- [ ] Bangun tab formulir untuk pembuatan turnamen
- [ ] Implementasikan dasbor event
- [ ] Buat adapter khusus peran

### 9.5 Integrasi Peran

- [ ] Hubungkan route penyelenggara
- [ ] Implementasikan logika izin
- [ ] Tambahkan tampilan khusus peran

### 9.6 Pengujian

- [ ] Tulis unit tests untuk model dan layanan
- [ ] Buat component tests untuk formulir dan dasbor
- [ ] Implementasikan integration tests untuk alur utama

## 10. Detailed Component Implementation

This section provides detailed implementation of individual UI components necessary for exact replication of the Event Management feature.

### 10.1 Tab Components

#### 10.1.1 Basic Info Tab

```tsx
// features/event-management/variants/tournament/components/tabs/TournamentBasicInfoTab.tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { TournamentFormData } from "../../model";
import { TournamentImageUpload } from "../TournamentImageUpload";

export interface TournamentTabProps {
  formData: TournamentFormData;
  onFieldChange: (field: keyof TournamentFormData, value: any) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: Record<string, string>;
  disabled?: boolean;
}

export function TournamentBasicInfoTab({
  formData,
  onFieldChange,
  onInputChange,
  errors,
  disabled = false
}: TournamentTabProps) {
  // File upload handler
  const handleFileUpload = (field: keyof TournamentFormData, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFieldChange(field, { file, preview: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informasi Dasar</CardTitle>
          <CardDescription>Lengkapi informasi dasar tournament Anda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Tournament <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={onInputChange}
              placeholder="Nama lengkap tournament"
              disabled={disabled}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Tournament <span className="text-red-500">*</span></Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={onInputChange}
              placeholder="Deskripsi tournament"
              rows={4}
              disabled={disabled}
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="organizer">Penyelenggara <span className="text-red-500">*</span></Label>
            <Input
              id="organizer"
              name="organizer"
              value={formData.organizer || ""}
              onChange={onInputChange}
              placeholder="Nama organisasi penyelenggara tournament"
              disabled={disabled}
            />
            {errors.organizer && <p className="text-sm text-red-500 mt-1">{errors.organizer}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="visibility">Visibilitas Event</Label>
            <Select
              value={formData.visibility || "public"}
              onValueChange={(value) => onFieldChange("visibility", value)}
              disabled={disabled}
            >
              <SelectTrigger id="visibility">
                <SelectValue placeholder="Pilih visibilitas event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Publik - Dapat dilihat oleh semua orang</SelectItem>
                <SelectItem value="unlisted">Unlisted - Hanya bisa diakses melalui link</SelectItem>
                <SelectItem value="private">Private - Hanya untuk peserta undangan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Dates */}
      <Card>
        <CardHeader>
          <CardTitle>Tanggal Tournament</CardTitle>
          <CardDescription>Tentukan tanggal pelaksanaan dan pendaftaran</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Tanggal Mulai <span className="text-red-500">*</span></Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate || ""}
                onChange={onInputChange}
                disabled={disabled}
              />
              {errors.startDate && <p className="text-sm text-red-500 mt-1">{errors.startDate}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">Tanggal Selesai</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate || ""}
                onChange={onInputChange}
                disabled={disabled}
              />
              <p className="text-xs text-slate-500">
                Opsional. Kosongkan jika tournament berlangsung hanya satu hari.
              </p>
              {errors.endDate && <p className="text-sm text-red-500 mt-1">{errors.endDate}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="registrationStartDate">Tanggal Mulai Pendaftaran <span className="text-red-500">*</span></Label>
              <Input
                id="registrationStartDate"
                name="registrationStartDate"
                type="date"
                value={formData.registrationStartDate || ""}
                onChange={onInputChange}
                disabled={disabled}
              />
              {errors.registrationStartDate && <p className="text-sm text-red-500 mt-1">{errors.registrationStartDate}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="registrationEndDate">Tanggal Tutup Pendaftaran <span className="text-red-500">*</span></Label>
              <Input
                id="registrationEndDate"
                name="registrationEndDate"
                type="date"
                value={formData.registrationEndDate || ""}
                onChange={onInputChange}
                disabled={disabled}
              />
              {errors.registrationEndDate && <p className="text-sm text-red-500 mt-1">{errors.registrationEndDate}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media */}
      <Card>
        <CardHeader>
          <CardTitle>Media Tournament</CardTitle>
          <CardDescription>Tambahkan gambar untuk tournament Anda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TournamentImageUpload
              field="logo"
              label="Logo Tournament"
              imageValue={formData.logo}
              onFieldChange={onFieldChange}
              handleFileUpload={handleFileUpload}
              disabled={disabled}
            />
            
            <TournamentImageUpload
              field="bannerImage"
              label="Banner Tournament"
              imageValue={formData.bannerImage}
              onFieldChange={onFieldChange}
              handleFileUpload={handleFileUpload}
              disabled={disabled}
            />
            
            <TournamentImageUpload
              field="featuredImage"
              label="Gambar Utama"
              imageValue={formData.featuredImage}
              onFieldChange={onFieldChange}
              handleFileUpload={handleFileUpload}
              disabled={disabled}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

#### 10.1.2 Location Tab

```tsx
// features/event-management/variants/tournament/components/tabs/TournamentLocationTab.tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TournamentTabProps } from "./TournamentBasicInfoTab";

export function TournamentLocationTab({
  formData,
  onFieldChange,
  onInputChange,
  errors,
  disabled = false
}: TournamentTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Jenis Lokasi</CardTitle>
          <CardDescription>Pilih jenis lokasi tournament</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={formData.locationType} 
            onValueChange={(value) => onFieldChange("locationType", value)}
            className="space-y-3"
            disabled={disabled}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="offline" id="locationOffline" />
              <Label htmlFor="locationOffline">Offline - Tournament di lokasi fisik</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="online" id="locationOnline" />
              <Label htmlFor="locationOnline">Online - Tournament virtual</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      
      {formData.locationType === "offline" && (
        <Card>
          <CardHeader>
            <CardTitle>Detail Lokasi Offline</CardTitle>
            <CardDescription>
              Masukkan detail alamat untuk lokasi offline
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="venue">Nama Venue <span className="text-red-500">*</span></Label>
              <Input
                id="venue"
                name="venue"
                value={formData.venue || ""}
                onChange={onInputChange}
                placeholder="Contoh: Gelanggang Olahraga Senayan"
                disabled={disabled}
              />
              {errors.venue && <p className="text-sm text-red-500 mt-1">{errors.venue}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Alamat Venue <span className="text-red-500">*</span></Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address || ""}
                onChange={onInputChange}
                placeholder="Contoh: Jl. Merdeka No. 10"
                rows={3}
                disabled={disabled}
              />
              {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Kota <span className="text-red-500">*</span></Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city || ""}
                  onChange={onInputChange}
                  placeholder="Contoh: Jakarta Pusat"
                  disabled={disabled}
                />
                {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="province">Provinsi <span className="text-red-500">*</span></Label>
                <Input
                  id="province"
                  name="province"
                  value={formData.province || ""}
                  onChange={onInputChange}
                  placeholder="Contoh: DKI Jakarta"
                  disabled={disabled}
                />
                {errors.province && <p className="text-sm text-red-500 mt-1">{errors.province}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="googleMapsUrl">Link Google Maps</Label>
              <Input
                id="googleMapsUrl"
                name="googleMapsUrl"
                value={formData.googleMapsUrl || ""}
                onChange={onInputChange}
                placeholder="Contoh: https://goo.gl/maps/..."
                disabled={disabled}
              />
              <p className="text-xs text-slate-500">Opsional. Link Google Maps untuk memudahkan navigasi ke lokasi.</p>
              {errors.googleMapsUrl && <p className="text-sm text-red-500 mt-1">{errors.googleMapsUrl}</p>}
            </div>
          </CardContent>
        </Card>
      )}
      
      {formData.locationType === "online" && (
        <Card>
          <CardHeader>
            <CardTitle>Detail Lokasi Online</CardTitle>
            <CardDescription>
              Masukkan detail untuk tournament online
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="onlineLink">Link Lokasi Online <span className="text-red-500">*</span></Label>
              <Input
                id="onlineLink"
                name="onlineLink"
                value={formData.onlineLink || ""}
                onChange={onInputChange}
                placeholder="Contoh: https://meet.google.com/... atau https://zoom.us/..."
                disabled={disabled}
              />
              <p className="text-xs text-slate-500">Link meeting atau platform untuk tournament online</p>
              {errors.onlineLink && <p className="text-sm text-red-500 mt-1">{errors.onlineLink}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="venueDetails">Petunjuk Lokasi Online</Label>
              <Textarea
                id="venueDetails"
                name="venueDetails"
                value={formData.venueDetails || ""}
                onChange={onInputChange}
                placeholder="Masukkan petunjuk tambahan untuk lokasi online..."
                rows={3}
                disabled={disabled}
              />
              <p className="text-xs text-slate-500">Opsional. Petunjuk detail untuk mengakses lokasi online.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
```

#### 10.1.3 Pricing Tab

```tsx
// features/event-management/variants/tournament/components/tabs/TournamentPricingTab.tsx
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus } from "lucide-react";
import { TournamentTabProps } from "./TournamentBasicInfoTab";
import { PricingCategory, SinglePrice } from "../../model";

export function TournamentPricingTab({
  formData,
  onFieldChange,
  onInputChange,
  errors,
  disabled = false
}: TournamentTabProps) {
  // Handler for single price changes
  const handleSinglePriceChange = (field: keyof SinglePrice, value: string | number) => {
    const numValue = field === 'price' ? Number(value) : value;
    onFieldChange("singlePrice", {
      ...(formData.singlePrice || { currency: "IDR" }),
      [field]: numValue
    });
  };
  
  // Handler for early bird settings changes
  const handleEarlyBirdChange = (field: keyof any, value: any) => {
    onFieldChange("earlyBird", {
      ...(formData.earlyBird || { enabled: false, discount: 0, endDate: "" }),
      [field]: field === 'discount' ? Number(value) : value
    });
  };
  
  // Handler for late registration settings changes
  const handleLateRegistrationChange = (field: keyof any, value: any) => {
    onFieldChange("lateRegistration", {
      ...(formData.lateRegistration || { enabled: false, fee: 0, startDate: "" }),
      [field]: field === 'fee' ? Number(value) : value
    });
  };
  
  // Handler for adding a new price category
  const handleAddPriceCategory = () => {
    const newCategory: PricingCategory = { 
      category: "", 
      price: 0, 
      currency: "IDR" 
    };
    
    onFieldChange("multiPricing", [
      ...(formData.multiPricing || []),
      newCategory
    ]);
  };
  
  // Handler for updating a price category
  const handleUpdatePriceCategory = (index: number, field: keyof PricingCategory, value: any) => {
    if (!formData.multiPricing) return;
    
    const updated = [...formData.multiPricing];
    updated[index] = {
      ...updated[index],
      [field]: field === 'price' ? Number(value) : value
    };
    
    onFieldChange("multiPricing", updated);
  };
  
  // Handler for removing a price category
  const handleRemovePriceCategory = (index: number) => {
    if (!formData.multiPricing) return;
    
    const updated = formData.multiPricing.filter((_, i) => i !== index);
    onFieldChange("multiPricing", updated);
  };
  
  return (
    <div className="space-y-6">
      {/* Pricing Model */}
      <Card>
        <CardHeader>
          <CardTitle>Model Biaya Pendaftaran</CardTitle>
          <CardDescription>Pilih cara menerapkan biaya pendaftaran</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={formData.pricingType || "single"} 
            onValueChange={(value) => onFieldChange("pricingType", value)}
            className="space-y-3"
            disabled={disabled}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="single" id="pricingSingle" />
              <Label htmlFor="pricingSingle">Harga Tunggal - Satu harga untuk semua peserta</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="multi" id="pricingMulti" />
              <Label htmlFor="pricingMulti">Harga Per Kategori - Harga berbeda untuk kategori berbeda</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="free" id="pricingFree" />
              <Label htmlFor="pricingFree">Gratis - Tidak ada biaya pendaftaran</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      
      {/* Single Price */}
      {formData.pricingType === "single" && (
        <Card>
          <CardHeader>
            <CardTitle>Harga Tunggal</CardTitle>
            <CardDescription>Tentukan harga pendaftaran untuk semua peserta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="singlePrice">Harga Pendaftaran <span className="text-red-500">*</span></Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm">
                    IDR
                  </span>
                  <Input
                    id="singlePrice"
                    type="number"
                    min="0"
                    value={formData.singlePrice?.price || ""}
                    onChange={(e) => handleSinglePriceChange("price", e.target.value)}
                    placeholder="Contoh: 250000"
                    className="rounded-l-none"
                    disabled={disabled}
                  />
                </div>
                {errors.singlePrice && <p className="text-sm text-red-500 mt-1">{errors.singlePrice}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Multi-category Pricing */}
      {formData.pricingType === "multi" && (
        <Card>
          <CardHeader>
            <CardTitle>Harga Per Kategori</CardTitle>
            <CardDescription>Tentukan harga untuk setiap kategori</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(!formData.multiPricing || formData.multiPricing.length === 0) ? (
              <div className="text-center p-8 border border-dashed rounded-md">
                <p className="text-slate-500 mb-4">Belum ada kategori harga yang ditambahkan</p>
                <Button 
                  type="button" 
                  onClick={handleAddPriceCategory} 
                  variant="outline"
                  disabled={disabled}
                >
                  <Plus size={16} className="mr-2" />
                  Tambah Kategori Harga
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {formData.multiPricing.map((category, index) => (
                    <div key={index} className="flex items-end gap-3 border p-3 rounded-md">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`category-${index}`}>Nama Kategori</Label>
                        <Input
                          id={`category-${index}`}
                          value={category.category}
                          onChange={(e) => handleUpdatePriceCategory(index, "category", e.target.value)}
                          placeholder="Nama kategori"
                          disabled={disabled}
                        />
                      </div>
                      <div className="w-1/3 space-y-2">
                        <Label htmlFor={`price-${index}`}>Harga</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm">
                            IDR
                          </span>
                          <Input
                            id={`price-${index}`}
                            type="number"
                            min="0"
                            value={category.price || ""}
                            onChange={(e) => handleUpdatePriceCategory(index, "price", e.target.value)}
                            className="rounded-l-none"
                            disabled={disabled}
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemovePriceCategory(index)}
                        className="mb-1"
                        disabled={disabled}
                      >
                        <Trash2 size={18} className="text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <Button 
                  type="button" 
                  onClick={handleAddPriceCategory} 
                  variant="outline" 
                  size="sm"
                  className="mt-2"
                  disabled={disabled}
                >
                  <Plus size={16} className="mr-2" />
                  Tambah Kategori Harga
                </Button>
                
                {errors.multiPricing && (
                  <p className="text-sm text-red-500">{errors.multiPricing}</p>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* Additional Pricing Options - Early Bird */}
      {formData.pricingType !== "free" && (
        <Card>
          <CardHeader>
            <CardTitle>Opsi Tambahan Pendaftaran</CardTitle>
            <CardDescription>Pengaturan diskon dan biaya tambahan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Early Bird */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">Diskon Early Bird</h3>
                  <p className="text-sm text-slate-500">
                    Berikan diskon untuk pendaftar awal
                  </p>
                </div>
                <Switch
                  checked={formData.earlyBird?.enabled || false}
                  onCheckedChange={(checked) => handleEarlyBirdChange("enabled", checked)}
                  disabled={disabled}
                />
              </div>
              
              {formData.earlyBird?.enabled && (
                <div className="pl-4 border-l-2 border-blue-200 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="earlyBirdDiscount">Persentase Diskon <span className="text-red-500">*</span></Label>
                      <div className="flex">
                        <Input
                          id="earlyBirdDiscount"
                          type="number"
                          min="1"
                          max="99"
                          value={formData.earlyBird?.discount || ""}
                          onChange={(e) => handleEarlyBirdChange("discount", e.target.value)}
                          disabled={disabled}
                        />
                        <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-slate-300 bg-slate-50 text-slate-500 text-sm">
                          %
                        </span>
                      </div>
                      {errors.earlyBirdDiscount && (
                        <p className="text-sm text-red-500 mt-1">{errors.earlyBirdDiscount}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="earlyBirdEndDate">Tanggal Berakhir <span className="text-red-500">*</span></Label>
                      <Input
                        id="earlyBirdEndDate"
                        type="date"
                        value={formData.earlyBird?.endDate || ""}
                        onChange={(e) => handleEarlyBirdChange("endDate", e.target.value)}
                        disabled={disabled}
                      />
                      {errors.earlyBirdEndDate && (
                        <p className="text-sm text-red-500 mt-1">{errors.earlyBirdEndDate}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Late Registration */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">Denda Pendaftaran Terlambat</h3>
                  <p className="text-sm text-slate-500">
                    Tetapkan biaya tambahan untuk pendaftaran terlambat
                  </p>
                </div>
                <Switch
                  checked={formData.lateRegistration?.enabled || false}
                  onCheckedChange={(checked) => handleLateRegistrationChange("enabled", checked)}
                  disabled={disabled}
                />
              </div>
              
              {formData.lateRegistration?.enabled && (
                <div className="pl-4 border-l-2 border-amber-200 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lateRegistrationFee">Biaya Tambahan <span className="text-red-500">*</span></Label>
                      <div className="flex">
                        <Input
                          id="lateRegistrationFee"
                          type="number"
                          min="0"
                          value={formData.lateRegistration?.fee || ""}
                          onChange={(e) => handleLateRegistrationChange("fee", e.target.value)}
                          disabled={disabled}
                        />
                        <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-slate-300 bg-slate-50 text-slate-500 text-sm">
                          IDR
                        </span>
                      </div>
                      {errors.lateRegistrationFee && (
                        <p className="text-sm text-red-500 mt-1">{errors.lateRegistrationFee}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lateRegistrationStartDate">Tanggal Mulai <span className="text-red-500">*</span></Label>
                      <Input
                        id="lateRegistrationStartDate"
                        type="date"
                        value={formData.lateRegistration?.startDate || ""}
                        onChange={(e) => handleLateRegistrationChange("startDate", e.target.value)}
                        disabled={disabled}
                      />
                      {errors.lateRegistrationStartDate && (
                        <p className="text-sm text-red-500 mt-1">{errors.lateRegistrationStartDate}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Quota Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Kuota</CardTitle>
          <CardDescription>Tetapkan batasan jumlah peserta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup 
            value={formData.quotaType || "total"} 
            onValueChange={(value) => onFieldChange("quotaType", value)}
            className="space-y-3"
            disabled={disabled}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="total" id="quotaTotal" />
              <Label htmlFor="quotaTotal">Kuota Total - Batasan total seluruh peserta</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="category" id="quotaCategory" />
              <Label htmlFor="quotaCategory">Kuota Per Kategori - Batasan jumlah peserta per kategori</Label>
            </div>
          </RadioGroup>
          
          {formData.quotaType === "total" && (
            <div className="space-y-2 mt-4">
              <Label htmlFor="maxParticipants">Jumlah Maksimum Peserta <span className="text-red-500">*</span></Label>
              <Input
                id="maxParticipants"
                name="maxParticipants"
                type="number"
                min="1"
                value={formData.maxParticipants || ""}
                onChange={onInputChange}
                placeholder="Contoh: 200"
                disabled={disabled}
              />
              {errors.maxParticipants && (
                <p className="text-sm text-red-500 mt-1">{errors.maxParticipants}</p>
              )}
            </div>
          )}
          
          {/* Category quotas would be handled in the Categories tab */}
        </CardContent>
      </Card>
    </div>
  );
}
```

#### 10.1.4 Categories Tab

```tsx
// features/event-management/variants/tournament/components/tabs/TournamentCategoriesTab.tsx
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { TournamentTabProps } from "./TournamentBasicInfoTab";
import { AgeCategory, EquipmentCategory } from "../../model";

export function TournamentCategoriesTab({
  formData,
  onFieldChange,
  onInputChange,
  errors,
  disabled = false
}: TournamentTabProps) {
  // Handler for adding a new age category
  const handleAddAgeCategory = () => {
    const newCategory: AgeCategory = { 
      name: "", 
      minAge: 0, 
      maxAge: 0 
    };
    
    onFieldChange("ageCategories", [
      ...(formData.ageCategories || []),
      newCategory
    ]);
  };
  
  // Handler for updating an age category
  const handleUpdateAgeCategory = (index: number, field: keyof AgeCategory, value: any) => {
    if (!formData.ageCategories) return;
    
    const updated = [...formData.ageCategories];
    updated[index] = {
      ...updated[index],
      [field]: field === 'minAge' || field === 'maxAge' ? Number(value) : value
    };
    
    onFieldChange("ageCategories", updated);
  };
  
  // Handler for removing an age category
  const handleRemoveAgeCategory = (index: number) => {
    if (!formData.ageCategories) return;
    
    const updated = formData.ageCategories.filter((_, i) => i !== index);
    onFieldChange("ageCategories", updated);
  };
  
  // Handler for adding a new equipment category
  const handleAddEquipmentCategory = () => {
    const newCategory: EquipmentCategory = { 
      name: "", 
      description: "" 
    };
    
    onFieldChange("equipmentCategories", [
      ...(formData.equipmentCategories || []),
      newCategory
    ]);
  };
  
  // Handler for updating an equipment category
  const handleUpdateEquipmentCategory = (index: number, field: keyof EquipmentCategory, value: any) => {
    if (!formData.equipmentCategories) return;
    
    const updated = [...formData.equipmentCategories];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    
    onFieldChange("equipmentCategories", updated);
  };
  
  // Handler for removing an equipment category
  const handleRemoveEquipmentCategory = (index: number) => {
    if (!formData.equipmentCategories) return;
    
    const updated = formData.equipmentCategories.filter((_, i) => i !== index);
    onFieldChange("equipmentCategories", updated);
  };

  return (
    <div className="space-y-6">
      {/* Age Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Kategori Umur</CardTitle>
          <CardDescription>
            Tentukan kategori berdasarkan umur peserta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(!formData.ageCategories || formData.ageCategories.length === 0) ? (
            <div className="text-center p-8 border border-dashed rounded-md">
              <p className="text-slate-500 mb-4">
                Belum ada kategori umur yang ditambahkan
              </p>
              <Button 
                type="button" 
                onClick={handleAddAgeCategory} 
                variant="outline"
                disabled={disabled}
              >
                <Plus size={16} className="mr-2" />
                Tambah Kategori Umur
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {formData.ageCategories.map((category, index) => (
                  <div key={index} className="flex items-end gap-3 border p-4 rounded-md">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={`ageCategoryName-${index}`}>Nama Kategori</Label>
                      <Input
                        id={`ageCategoryName-${index}`}
                        value={category.name}
                        onChange={(e) => handleUpdateAgeCategory(index, "name", e.target.value)}
                        placeholder="Contoh: U-15, Senior, Master"
                        disabled={disabled}
                      />
                    </div>
                    <div className="w-1/4 space-y-2">
                      <Label htmlFor={`minAge-${index}`}>Umur Min</Label>
                      <Input
                        id={`minAge-${index}`}
                        type="number"
                        min="0"
                        value={category.minAge || ""}
                        onChange={(e) => handleUpdateAgeCategory(index, "minAge", e.target.value)}
                        disabled={disabled}
                      />
                    </div>
                    <div className="w-1/4 space-y-2">
                      <Label htmlFor={`maxAge-${index}`}>Umur Maks</Label>
                      <Input
                        id={`maxAge-${index}`}
                        type="number"
                        min="0"
                        value={category.maxAge || ""}
                        onChange={(e) => handleUpdateAgeCategory(index, "maxAge", e.target.value)}
                        disabled={disabled}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveAgeCategory(index)}
                      className="mb-1"
                      disabled={disabled}
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <Button 
                type="button" 
                onClick={handleAddAgeCategory} 
                variant="outline" 
                size="sm"
                disabled={disabled}
              >
                <Plus size={16} className="mr-2" />
                Tambah Kategori Umur
              </Button>
            </>
          )}
          
          {errors.ageCategories && (
            <p className="text-sm text-red-500">{errors.ageCategories}</p>
          )}
        </CardContent>
      </Card>
      
      {/* Equipment Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Kategori Peralatan</CardTitle>
          <CardDescription>
            Tentukan jenis peralatan yang dapat digunakan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(!formData.equipmentCategories || formData.equipmentCategories.length === 0) ? (
            <div className="text-center p-8 border border-dashed rounded-md">
              <p className="text-slate-500 mb-4">
                Belum ada kategori peralatan yang ditambahkan
              </p>
              <Button 
                type="button" 
                onClick={handleAddEquipmentCategory} 
                variant="outline"
                disabled={disabled}
              >
                <Plus size={16} className="mr-2" />
                Tambah Kategori Peralatan
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {formData.equipmentCategories.map((category, index) => (
                  <div key={index} className="flex items-end gap-3 border p-4 rounded-md">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={`equipmentName-${index}`}>Nama Peralatan</Label>
                      <Input
                        id={`equipmentName-${index}`}
                        value={category.name}
                        onChange={(e) => handleUpdateEquipmentCategory(index, "name", e.target.value)}
                        placeholder="Contoh: Recurve, Compound, Barebow"
                        disabled={disabled}
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={`equipmentDesc-${index}`}>Deskripsi (Opsional)</Label>
                      <Input
                        id={`equipmentDesc-${index}`}
                        value={category.description || ""}
                        onChange={(e) => handleUpdateEquipmentCategory(index, "description", e.target.value)}
                        placeholder="Deskripsi singkat"
                        disabled={disabled}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveEquipmentCategory(index)}
                      className="mb-1"
                      disabled={disabled}
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <Button 
                type="button" 
                onClick={handleAddEquipmentCategory} 
                variant="outline" 
                size="sm"
                disabled={disabled}
              >
                <Plus size={16} className="mr-2" />
                Tambah Kategori Peralatan
              </Button>
            </>
          )}
          
          {errors.equipmentCategories && (
            <p className="text-sm text-red-500">{errors.equipmentCategories}</p>
          )}
        </CardContent>
      </Card>

      {/* Category Quotas */}
      {formData.quotaType === "category" && (
        <Card>
          <CardHeader>
            <CardTitle>Kuota Per Kategori</CardTitle>
            <CardDescription>
              Tentukan kuota peserta untuk setiap kategori
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category quotas implementation would go here */}
              {/* Simplified example for now */}
              <div className="space-y-2">
                <Label>Kategori</Label>
                <Input placeholder="Kategori" disabled={disabled} />
              </div>
              <div className="space-y-2">
                <Label>Kuota</Label>
                <Input type="number" placeholder="0" disabled={disabled} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
```

#### 10.1.5 Documentation Tab

```tsx
// features/event-management/variants/tournament/components/tabs/TournamentDocumentationTab.tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TournamentTabProps } from "./TournamentBasicInfoTab";
import { FileUpload } from "lucide-react";

export function TournamentDocumentationTab({
  formData,
  onFieldChange,
  onInputChange,
  errors,
  disabled = false
}: TournamentTabProps) {
  return (
    <div className="space-y-6">
      {/* General Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Peraturan Umum</CardTitle>
          <CardDescription>
            Tentukan peraturan umum tournament
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="generalRules">Peraturan Umum</Label>
            <Textarea
              id="generalRules"
              name="generalRules"
              rows={6}
              value={formData.generalRules || ""}
              onChange={onInputChange}
              placeholder="Masukkan peraturan umum tournament di sini..."
              disabled={disabled}
            />
            {errors.generalRules && (
              <p className="text-sm text-red-500 mt-1">{errors.generalRules}</p>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Tournament Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Jadwal Tournament</CardTitle>
          <CardDescription>
            Masukkan detail jadwal tournament
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="schedule">Detail Jadwal</Label>
            <Textarea
              id="schedule"
              name="schedule"
              rows={6}
              value={formData.schedule || ""}
              onChange={onInputChange}
              placeholder="Masukkan detail jadwal tournament di sini..."
              disabled={disabled}
            />
            <p className="text-xs text-slate-500">
              Contoh: Hari 1 (08:00 - 12:00): Kualifikasi, Hari 1 (13:00 - 17:00): Eliminasi
            </p>
            {errors.schedule && (
              <p className="text-sm text-red-500 mt-1">{errors.schedule}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium">Countdown Jadwal</h3>
                <p className="text-sm text-slate-500">
                  Tampilkan countdown untuk jadwal penting
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Switch
                    id="countdownEventStart"
                    checked={formData.countdown?.eventStart || false}
                    onCheckedChange={(checked) => 
                      onFieldChange("countdown", { 
                        ...(formData.countdown || {}),
                        eventStart: checked 
                      })
                    }
                    disabled={disabled}
                  />
                  <Label htmlFor="countdownEventStart">Mulai Tournament</Label>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch
                    id="countdownRegistrationEnd"
                    checked={formData.countdown?.registrationEnd || false}
                    onCheckedChange={(checked) => 
                      onFieldChange("countdown", { 
                        ...(formData.countdown || {}),
                        registrationEnd: checked 
                      })
                    }
                    disabled={disabled}
                  />
                  <Label htmlFor="countdownRegistrationEnd">Tutup Pendaftaran</Label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Terms and Conditions */}
      <Card>
        <CardHeader>
          <CardTitle>Syarat dan Ketentuan</CardTitle>
          <CardDescription>
            Tentukan syarat dan ketentuan untuk peserta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="termsAndConditions">Syarat dan Ketentuan</Label>
            <Textarea
              id="termsAndConditions"
              name="termsAndConditions"
              rows={6}
              value={formData.termsAndConditions || ""}
              onChange={onInputChange}
              placeholder="Masukkan syarat dan ketentuan di sini..."
              disabled={disabled}
            />
            {errors.termsAndConditions && (
              <p className="text-sm text-red-500 mt-1">{errors.termsAndConditions}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="requireTermsAcceptance"
              name="requireTermsAcceptance"
              checked={formData.requireTermsAcceptance || false}
              onCheckedChange={(checked) => onFieldChange("requireTermsAcceptance", checked)}
              disabled={disabled}
            />
            <Label htmlFor="requireTermsAcceptance">
              Wajibkan peserta untuk menyetujui syarat dan ketentuan
            </Label>
          </div>
        </CardContent>
      </Card>
      
      {/* Additional Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Dokumen Tambahan</CardTitle>
          <CardDescription>
            Unggah dan kelola dokumen tambahan untuk tournament
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Switch
              id="requireDocumentUpload"
              name="requireDocumentUpload"
              checked={formData.requireDocumentUpload || false}
              onCheckedChange={(checked) => onFieldChange("requireDocumentUpload", checked)}
              disabled={disabled}
            />
            <Label htmlFor="requireDocumentUpload">
              Wajibkan peserta mengunggah dokumen pendukung
            </Label>
          </div>
          
          {formData.requireDocumentUpload && (
            <div className="pl-4 border-l-2 border-blue-200 space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <FileUpload className="h-10 w-10 text-blue-500 mx-auto mb-2" />
                <h3 className="text-lg font-medium mb-1">Unggah Dokumen</h3>
                <p className="text-sm text-slate-500 mb-4">
                  Unggah dokumen template yang perlu diisi oleh peserta
                </p>
                <label>
                  <Button variant="outline" className="cursor-pointer" disabled={disabled}>
                    Pilih File
                  </Button>
                  <input
                    type="file"
                    className="hidden"
                    disabled={disabled}
                  />
                </label>
                <p className="text-xs text-slate-400 mt-2">
                  Format yang didukung: PDF, DOC, DOCX (maks. 5MB)
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="documentRequirements">Deskripsi Persyaratan Dokumen</Label>
                <Textarea
                  id="documentRequirements"
                  name="documentRequirements"
                  rows={3}
                  value={formData.documentRequirements || ""}
                  onChange={onInputChange}
                  placeholder="Jelaskan dokumen apa yang perlu diunggah peserta..."
                  disabled={disabled}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

### 10.2 Helper Components

#### 10.2.1 Image Upload Component

```tsx
// features/event-management/variants/tournament/components/TournamentImageUpload.tsx
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { ImageInput, TournamentFormData } from "../model";

interface TournamentImageUploadProps {
  readonly field: keyof TournamentFormData;
  readonly label: string;
  readonly imageValue: ImageInput;
  readonly onFieldChange: (field: keyof TournamentFormData, value: ImageInput | null) => void;
  readonly handleFileUpload: (field: keyof TournamentFormData, e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly disabled?: boolean;
}

export function TournamentImageUpload({
  field,
  label,
  imageValue,
  onFieldChange,
  handleFileUpload,
  disabled = false
}: TournamentImageUploadProps) {
  const getImageUrl = () => {
    if (!imageValue) return null;
    
    if (typeof imageValue === 'string') {
      return imageValue;
    }
    
    if (imageValue.url) {
      return imageValue.url;
    }
    
    if (imageValue.preview) {
      return imageValue.preview;
    }
    
    if (imageValue.file) {
      return URL.createObjectURL(imageValue.file);
    }
    
    return null;
  };
  
  const imageUrl = getImageUrl();

  return (
    <div>
      <Label className="mb-2 block">{label}</Label>
      <div className="border-2 border-dashed rounded-lg p-4 text-center">
        {imageUrl ? (
          <div className="relative h-32 w-full">
            <img
              src={imageUrl}
              alt={label}
              className="h-full mx-auto object-contain"
            />
            <Button
              variant="outline"
              size="sm"
              className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 z-10"
              onClick={() => onFieldChange(field, null)}
              disabled={disabled}
            >
              Hapus Gambar
            </Button>
          </div>
        ) : (
          <div>
            <Upload className="mx-auto h-10 w-10 text-slate-300 mb-2" />
            <p className="text-sm text-slate-500 mb-2">Upload {label}</p>
            <p className="text-xs text-slate-400 mb-3">
              {field === "logo" && "Rekomendasi: 200x200px (maks. 2MB)"}
              {field === "bannerImage" && "Rekomendasi: 1200x630px (maks. 4MB)"}
              {field === "featuredImage" && "Rekomendasi: 800x600px (maks. 3MB)"}
            </p>
            <label>
              <Button variant="outline" size="sm" className="cursor-pointer" disabled={disabled}>
                Pilih File
              </Button>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileUpload(field, e)}
                disabled={disabled}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
```

## 11. Default Values and Configuration

To ensure consistent event creation and improve user experience, we've implemented default values and configurations.

### 11.1 Tournament Default Configuration

```typescript
// features/event-management/variants/tournament/config.ts
import { TournamentFormData } from "./model";

/**
 * Default values for tournament creation form
 */
export const DEFAULT_TOURNAMENT_VALUES: Partial<TournamentFormData> = {
  name: "",
  description: "",
  location: {
    venue: "",
    address: "",
    city: "",
    province: "",
    googleMapsUrl: ""
  },
  eventType: "offline",
  registrationType: "individual",
  registrationStart: null,
  registrationEnd: null,
  eventStart: null,
  eventEnd: null,
  timezone: "Asia/Jakarta",
  registrationFee: 0,
  currency: "IDR",
  maxParticipants: 100,
  quotaType: "total",
  ageCategories: [],
  equipmentCategories: [],
  generalRules: "",
  schedule: "",
  termsAndConditions: "",
  requireTermsAcceptance: true,
  requireDocumentUpload: false,
  documentRequirements: "",
  countdown: {
    eventStart: true,
    registrationEnd: true
  },
  status: "draft"
};

/**
 * Tournament form validation schema
 */
export const validateTournamentForm = (data: Partial<TournamentFormData>): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  // Validate basic info
  if (!data.name) errors.name = "Nama tournament harus diisi";
  if (data.name && data.name.length < 5) errors.name = "Nama tournament minimal 5 karakter";
  if (!data.description) errors.description = "Deskripsi tournament harus diisi";
  if (data.description && data.description.length < 20) errors.description = "Deskripsi minimal 20 karakter";
  
  // Validate location for offline events
  if (data.eventType === "offline") {
    if (!data.location?.venue) errors["location.venue"] = "Nama venue harus diisi";
    if (!data.location?.address) errors["location.address"] = "Alamat venue harus diisi";
    if (!data.location?.city) errors["location.city"] = "Kota harus diisi";
    if (!data.location?.province) errors["location.province"] = "Provinsi harus diisi";
  }
  
  // Validate dates
  if (!data.registrationStart) errors.registrationStart = "Tanggal mulai pendaftaran harus diisi";
  if (!data.registrationEnd) errors.registrationEnd = "Tanggal akhir pendaftaran harus diisi";
  if (!data.eventStart) errors.eventStart = "Tanggal mulai event harus diisi";
  if (!data.eventEnd) errors.eventEnd = "Tanggal akhir event harus diisi";
  
  // Validate date sequence
  if (data.registrationStart && data.registrationEnd && 
      new Date(data.registrationStart) >= new Date(data.registrationEnd)) {
    errors.registrationEnd = "Tanggal akhir pendaftaran harus setelah tanggal mulai";
  }
  
  if (data.registrationEnd && data.eventStart && 
      new Date(data.registrationEnd) > new Date(data.eventStart)) {
    errors.eventStart = "Tanggal mulai event harus setelah tanggal akhir pendaftaran";
  }
  
  if (data.eventStart && data.eventEnd && 
      new Date(data.eventStart) >= new Date(data.eventEnd)) {
    errors.eventEnd = "Tanggal akhir event harus setelah tanggal mulai";
  }
  
  // Validate registration details
  if (data.registrationFee < 0) errors.registrationFee = "Biaya pendaftaran tidak boleh negatif";
  if (data.maxParticipants && data.maxParticipants <= 0) errors.maxParticipants = "Jumlah peserta maksimal harus lebih dari 0";
  
  // Validate categories
  if (data.ageCategories?.length === 0 && data.equipmentCategories?.length === 0) {
    errors.ageCategories = "Minimal satu kategori umur atau peralatan harus diisi";
  }
  
  // Validate categories data
  if (data.ageCategories && data.ageCategories.length > 0) {
    const invalidAgeCats = data.ageCategories.some(cat => !cat.name || cat.minAge < 0 || cat.maxAge <= 0 || cat.minAge >= cat.maxAge);
    if (invalidAgeCats) errors.ageCategories = "Semua kategori umur harus diisi dengan benar";
  }
  
  if (data.equipmentCategories && data.equipmentCategories.length > 0) {
    const invalidEquipCats = data.equipmentCategories.some(cat => !cat.name);
    if (invalidEquipCats) errors.equipmentCategories = "Semua kategori peralatan harus memiliki nama";
  }
  
  return errors;
};
```

### 11.2 Form State Management Hook

```typescript
// features/event-management/variants/tournament/hooks/useTournamentForm.ts
import { useState, useCallback } from "react";
import { TournamentFormData } from "../model";
import { DEFAULT_TOURNAMENT_VALUES, validateTournamentForm } from "../config";

interface UseTournamentFormResult {
  formData: Partial<TournamentFormData>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  setFormData: (data: Partial<TournamentFormData>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleFieldChange: <K extends keyof TournamentFormData>(field: K, value: TournamentFormData[K]) => void;
  handleBlur: (field: string) => void;
  validate: () => boolean;
  resetForm: () => void;
  isValid: boolean;
}

/**
 * Hook untuk mengelola state form tournament
 * @param initialData - Data awal tournament (opsional)
 */
export function useTournamentForm(initialData?: Partial<TournamentFormData>): UseTournamentFormResult {
  const [formData, setFormData] = useState<Partial<TournamentFormData>>(
    initialData || DEFAULT_TOURNAMENT_VALUES
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  
  // Handler untuk field individual (input, textarea, select)
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => {
      // Handle nested properties (e.g. "location.city")
      if (name.includes(".")) {
        const [parent, child] = name.split(".");
        return {
          ...prev,
          [parent]: {
            ...prev[parent as keyof TournamentFormData],
            [child]: type === "number" ? Number(value) : value,
          },
        };
      }
      
      // Handle regular properties
      return {
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      };
    });
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  }, []);
  
  // Handler untuk mengubah field objek secara langsung
  const handleFieldChange = useCallback(<K extends keyof TournamentFormData>(
    field: K, 
    value: TournamentFormData[K]
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Mark field as touched
    setTouched(prev => ({
      [field as string]: true,
    }));
  }, []);
  
  // Handler untuk blur event
  const handleBlur = useCallback((field: string) => {
    setTouched(prev => ({
      ...prev,
      [field]: true,
    }));
    
    // Validate on blur
    const validationErrors = validateTournamentForm(formData);
    setErrors(validationErrors);
    setIsValid(Object.keys(validationErrors).length === 0);
  }, [formData]);
  
  // Full form validation
  const validate = useCallback(() => {
    const validationErrors = validateTournamentForm(formData);
    setErrors(validationErrors);
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {});
    setTouched(allTouched);
    
    const isFormValid = Object.keys(validationErrors).length === 0;
    setIsValid(isFormValid);
    return isFormValid;
  }, [formData]);
  
  // Reset form to initial state
  const resetForm = useCallback(() => {
    setFormData(initialData || DEFAULT_TOURNAMENT_VALUES);
    setErrors({});
    setTouched({});
    setIsValid(false);
  }, [initialData]);
  
  return {
    formData,
    errors,
    touched,
    setFormData,
    handleChange,
    handleFieldChange,
    handleBlur,
    validate,
    resetForm,
    isValid
  };
}
```

## 12. Repository Implementation

### 12.1 Tournament Repository

The repository layer handles data access operations between our application and the Supabase backend:

```typescript
// features/event-management/repository.ts
import { supabase } from "@/lib/supabase/client";
import { 
  TournamentFormData, 
  Tournament, 
  TournamentWithParticipantCount,
  TournamentStatus
} from "./variants/tournament/model";

/**
 * Repository untuk operasi data event tournament
 */
export class TournamentRepository {
  private tableName = "tournaments";
  
  /**
   * Mendapatkan daftar tournament dengan filter
   */
  async getTournaments(
    options: {
      organizerId?: string;
      status?: TournamentStatus | TournamentStatus[];
      limit?: number;
      offset?: number;
      includeParticipantCount?: boolean;
    } = {}
  ): Promise<TournamentWithParticipantCount[]> {
    const { 
      organizerId, 
      status, 
      limit = 10, 
      offset = 0,
      includeParticipantCount = false
    } = options;
    
    let query = supabase
      .from(this.tableName)
      .select(
        includeParticipantCount 
          ? `*, participants:tournament_participants(count)`
          : `*`
      );
    
    // Apply filters
    if (organizerId) {
      query = query.eq("organizer_id", organizerId);
    }
    
    if (status) {
      if (Array.isArray(status)) {
        query = query.in("status", status);
      } else {
        query = query.eq("status", status);
      }
    }
    
    // Apply pagination
    query = query.range(offset, offset + limit - 1);
    
    // Order by created date, newest first
    query = query.order("created_at", { ascending: false });
    
    const { data, error } = await query;
    
    if (error) {
      console.error("Error fetching tournaments:", error);
      throw new Error(`Failed to fetch tournaments: ${error.message}`);
    }
    
    return data as TournamentWithParticipantCount[];
  }
  
  /**
   * Mendapatkan detail tournament berdasarkan ID
   */
  async getTournamentById(id: string): Promise<Tournament> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select("*")
      .eq("id", id)
      .single();
      
    if (error) {
      console.error(`Error fetching tournament ${id}:`, error);
      throw new Error(`Failed to fetch tournament: ${error.message}`);
    }
    
    return data as Tournament;
  }
  
  /**
   * Membuat tournament baru
   */
  async createTournament(formData: TournamentFormData, organizerId: string): Promise<Tournament> {
    // Transform form data to database schema
    const tournamentData = {
      name: formData.name,
      description: formData.description,
      location: formData.location,
      event_type: formData.eventType,
      registration_type: formData.registrationType,
      registration_start: formData.registrationStart,
      registration_end: formData.registrationEnd,
      event_start: formData.eventStart,
      event_end: formData.eventEnd,
      timezone: formData.timezone,
      registration_fee: formData.registrationFee,
      currency: formData.currency,
      max_participants: formData.maxParticipants,
      quota_type: formData.quotaType,
      age_categories: formData.ageCategories,
      equipment_categories: formData.equipmentCategories,
      general_rules: formData.generalRules,
      schedule: formData.schedule,
      terms_and_conditions: formData.termsAndConditions,
      require_terms_acceptance: formData.requireTermsAcceptance,
      require_document_upload: formData.requireDocumentUpload,
      document_requirements: formData.documentRequirements,
      countdown: formData.countdown,
      status: formData.status || "draft",
      organizer_id: organizerId
    };
    
    const { data, error } = await supabase
      .from(this.tableName)
      .insert(tournamentData)
      .select()
      .single();
      
    if (error) {
      console.error("Error creating tournament:", error);
      throw new Error(`Failed to create tournament: ${error.message}`);
    }
    
    return data as Tournament;
  }
  
  /**
   * Memperbarui data tournament
   */
  async updateTournament(id: string, formData: Partial<TournamentFormData>): Promise<Tournament> {
    // Transform form data to database schema
    const tournamentData: Record<string, any> = {};
    
    // Map form fields to database columns
    Object.entries(formData).forEach(([key, value]) => {
      // Convert camelCase to snake_case for db columns
      const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      tournamentData[snakeKey] = value;
    });
    
    const { data, error } = await supabase
      .from(this.tableName)
      .update(tournamentData)
      .eq("id", id)
      .select()
      .single();
      
    if (error) {
      console.error(`Error updating tournament ${id}:`, error);
      throw new Error(`Failed to update tournament: ${error.message}`);
    }
    
    return data as Tournament;
  }
  
  /**
   * Mengubah status tournament
   */
  async updateTournamentStatus(id: string, status: TournamentStatus): Promise<Tournament> {
    const { data, error } = await supabase
      .from(this.tableName)
      .update({ status })
      .eq("id", id)
      .select()
      .single();
      
    if (error) {
      console.error(`Error updating tournament status ${id}:`, error);
      throw new Error(`Failed to update tournament status: ${error.message}`);
    }
    
    return data as Tournament;
  }
  
  /**
   * Menghapus tournament
   */
  async deleteTournament(id: string): Promise<void> {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq("id", id);
      
    if (error) {
      console.error(`Error deleting tournament ${id}:`, error);
      throw new Error(`Failed to delete tournament: ${error.message}`);
    }
  }
}