# Panduan Arsitektur MyArchery Platform

## Domain-Driven Modular Architecture dengan Role Adaptation Layer dan Supabase Integration

### Daftar Isi

1. [Pendahuluan](#1-pendahuluan)
2. [Prinsip Arsitektur](#2-prinsip-arsitektur)
3. [Struktur Folder](#3-struktur-folder)
4. [Core Layer](#4-core-layer)
5. [Feature Layer](#5-feature-layer)
6. [Role Adaptation Layer](#6-role-adaptation-layer)
7. [Supabase Integration](#7-supabase-integration)
8. [State Management](#8-state-management)
9. [Routing dan Auth Protection](#9-routing-dan-auth-protection)
10. [Panduan Implementasi Feature Baru](#10-panduan-implementasi-feature-baru)
11. [Testing dan Quality Assurance](#11-testing-dan-quality-assurance)
12. [Best Practices](#12-best-practices)

## 1. Pendahuluan

Platform MyArchery menerapkan arsitektur **Domain-Driven Modular dengan Role Adaptation Layer dan Supabase Integration**. Arsitektur ini dikembangkan untuk memenuhi kebutuhan spesifik aplikasi super app yang melayani berbagai jenis pengguna dengan domain bisnis yang kompleks.

### Tujuan Arsitektur

- **Skalabilitas Enterprise-Level** - Mendukung pertumbuhan aplikasi dan fitur baru
- **Maintainability Jangka Panjang** - Memudahkan pemeliharaan kode seiring berkembangnya platform
- **Separation of Concerns** - Memisahkan business logic dari presentation layer
- **Role-Specific User Experience** - Mengoptimalkan UX untuk setiap tipe pengguna
- **Konsistensi Codebase** - Menyediakan pola yang konsisten untuk seluruh aplikasi
- **Developer Experience** - Memudahkan onboarding dan kolaborasi tim developer

### Komponen Utama Arsitektur

1. **Domain-Driven Design (DDD)** - Pengorganisasian kode berdasarkan domain bisnis
2. **Hexagonal Architecture / Ports and Adapters** - Role adapters sebagai port ke UI yang berbeda
3. **Clean Architecture** - Separation of concerns yang jelas
4. **Backend-as-a-Service Integration** - Supabase sebagai backend yang terintegrat
5. **Role-Based Multi-Tenant** - Pemisahan akses di multiple layers

## 2. Prinsip Arsitektur

### Domain-Driven Design (DDD)

- **Bounded Context** - Setiap domain bisnis (events, scoring, dll) memiliki boundary yang jelas
- **Ubiquitous Language** - Terminologi yang konsisten di seluruh codebase dan tim
- **Entities & Value Objects** - Model yang mewakili domain bisnis

### Clean Architecture

- **Dependency Rule** - Layers dalam tidak boleh bergantung pada layers luar
- **Business Logic Isolation** - Core logic terpisah dari detail implementasi
- **Use Case Driven** - Fitur diorganisir berdasarkan use case bisnis

### Hexagonal Architecture (Ports & Adapters)

- **Core Domain** - Business rules di pusat aplikasi
- **Adapters** - Interface ke dunia luar (UI, database, services)
- **Ports** - Entry points terstandarisasi ke aplikasi

## 3. Struktur Folder

```
/
├── supabase/
│   ├── migrations/         # Migrasi database terdefinisi
│   ├── seed/               # Data awal
│   ├── functions/          # Edge Functions & Database Functions
│   ├── triggers/           # Database triggers
│   └── policies/           # RLS policies untuk tiap peran (admin/organizer/customer)
│
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (auth)/         # Rute autentikasi
│   │   ├── (public)/       # Rute publik
│   │   ├── (roles)/        # Rute spesifik peran
│   │   │   ├── admin/[...routes]/
│   │   │   ├── organizer/[...routes]/
│   │   │   └── customer/[...routes]/
│   │   └── api/            # API routes
│   │
│   ├── features/           # Domain-driven features
│   │   ├── event-management/
│   │   │   ├── core/       # Logika inti fitur
│   │   │   │   ├── services/
│   │   │   │   ├── models/
│   │   │   │   └── utils/
│   │   │   ├── components/ # Komponen bersama
│   │   │   └── adapters/   # Adaptasi peran
│   │   │       ├── admin/
│   │   │       ├── organizer/
│   │   │       └── customer/
│   │   │
│   │   └── scoring/
│   │       └── [struktur serupa]
│   │
│   ├── components/         # Komponen UI bersama
│   │   ├── ui/
│   │   ├── layouts/
│   │   └── role-specific/  # Ekstensi khusus peran
│   │       ├── admin/
│   │       ├── organizer/
│   │       └── customer/
│   │
│   ├── lib/                # Utilitas bersama
│   │   ├── supabase/       # Konfigurasi & utilitas Supabase
│   │   │   ├── client.ts   # Client Supabase terinisialisasi
│   │   │   ├── server.ts   # Server component client
│   │   │   ├── admin.ts    # Client dengan hak akses admin
│   │   │   └── types/      # Type yang digenerate dari database
│   │   ├── auth/           # Logika autentikasi & otorisasi
│   │   ├── api-client/     # Client untuk API eksternal
│   │   ├── hooks/          # Custom hooks
│   │   └── utils/          # Utilitas umum
│   │
│   └── contexts/           # Manajemen state global
│       ├── auth-context/   # Konteks autentikasi
│       └── role-context/   # Manajemen state berbasis peran
│
└── middleware.ts           # Middleware Next.js untuk routing & auth
```

## 4. Core Layer

Core Layer berisi logika bisnis yang independen dari UI dan kebutuhan spesifik user role.

### Struktur Core Layer

```
/features/[feature-name]/core/
  ├── models/               # Definisi tipe & interface
  ├── services/             # Business logic & use cases
  │   ├── [service-name].ts # Service untuk area fungsi tertentu 
  │   └── index.ts          # Ekspor publik dari services
  └── utils/                # Fungsi utilitas khusus domain
```

### Prinsip Core Layer

1. **Pure Business Logic** - Tidak mengandung UI components atau logika presentasi
2. **Framework Agnostic** - Minimal ketergantungan pada framework (Next.js, React)
3. **Single Responsibility** - Tiap service memiliki area tanggung jawab yang jelas
4. **Input/Output Typing** - Menggunakan TypeScript interfaces untuk I/O yang jelas
5. **Domain Models** - Menggunakan tipe yang merepresentasikan bisnis domain

### Contoh Implementasi Service

```typescript
// features/event-management/core/services/event-service.ts
import { Event, EventDetail, CreateEventParams } from '../models/event';
import { supabase } from '@/lib/supabase/client';

export const EventService = {
  async getEvents(): Promise<Event[]> {
    // Implementasi untuk mendapatkan daftar event
  },
  
  async getEventById(id: string): Promise<EventDetail> {
    // Implementasi untuk mendapatkan detail event
  },
  
  async createEvent(params: CreateEventParams): Promise<Event> {
    // Implementasi untuk membuat event baru
  }
};
```

## 5. Feature Layer

Feature Layer mengorganisir kode berdasarkan domain bisnis dan fitur utama aplikasi.

### Struktur Feature Layer

```
/features/
  ├── event-management/    # Domain/fitur untuk event management
  ├── scoring/             # Domain/fitur untuk scoring
  ├── registration/        # Domain/fitur untuk registration
  └── payment/             # Domain/fitur untuk payment
```

### Prinsip Feature Layer

1. **Domain Separation** - Fitur dipisahkan berdasarkan domain bisnis
2. **Bounded Context** - Setiap fitur memiliki boundary yang jelas
3. **Shared Components** - Komponen UI yang dapat dibagikan di seluruh role
4. **Core Logic Encapsulation** - Business logic terkapsulasi di folder core

### Relasi Antar Feature

- Features dapat menggunakan Core Libraries (`/lib/*`)
- Features dapat mengakses komponen UI umum (`/components/*`)
- Features TIDAK boleh mengakses langsung feature lain, harus melalui ekspor publik 

## 6. Role Adaptation Layer

Role Adaptation Layer adalah kunci dari arsitektur ini. Layer ini mengadaptasi fitur core untuk kebutuhan UI spesifik tiap role.

### Struktur Role Adaptation Layer

```
/features/[feature-name]/adapters/
  ├── admin/               # Adaptasi untuk admin
  │   ├── components/      # Komponen UI spesifik admin
  │   └── hooks/           # Hooks spesifik admin
  ├── organizer/           # Adaptasi untuk organizer
  └── customer/            # Adaptasi untuk customer
```

### Prinsip Role Adaptation Layer

1. **Single Source of Truth** - Menggunakan core logic yang sama untuk semua role
2. **Role-Specific UI** - UI yang dioptimalkan untuk kebutuhan tiap role
3. **Permission Handling** - Menerapkan logic akses dan permission di adapter
4. **Consistent Interface Contract** - Interface yang konsisten antara core dan adapters

### Contoh Implementasi Adapter

```typescript
// features/event-management/adapters/admin/EventAdminAdapter.tsx
import { EventCore } from "../../core/models"
import { AdminEventActions } from "./AdminEventActions"

export function EventAdminAdapter({ eventData }: { eventData: EventCore }) {
  // Admin-specific logic and permissions
  const canApprove = checkAdminPermission('approve_events')
  
  return (
    <div className="admin-event-wrapper">
      <h2>{eventData.name}</h2>
      <EventDetails data={eventData} />
      {canApprove && <AdminEventActions eventId={eventData.id} />}
    </div>
  )
}
```

```typescript
// features/event-management/adapters/organizer/EventOrganizerAdapter.tsx
import { EventCore } from "../../core/models"
import { OrganizerEventControls } from "./OrganizerEventControls"

export function EventOrganizerAdapter({ eventData }: { eventData: EventCore }) {
  // Organizer-specific logic
  const isOwner = checkEventOwnership(eventData.id)
  
  return (
    <div className="organizer-event-wrapper">
      <h2>{eventData.name}</h2>
      <EventDetails data={eventData} />
      {isOwner && <OrganizerEventControls eventId={eventData.id} />}
    </div>
  )
}
```

## 7. Supabase Integration

Integrasi Supabase secara native ke dalam arsitektur aplikasi.

### Struktur Supabase

```
/supabase/
  ├── migrations/          # Migrasi database menggunakan Supabase CLI
  ├── seed/                # Seed data untuk development
  ├── functions/           # Edge functions & database functions
  ├── triggers/            # Database triggers untuk business rules
  └── policies/            # RLS policies untuk tiap peran
```

### Prinsip Supabase Integration

1. **Database-as-Code** - Struktur dan schema database disimpan dalam repository
2. **Role-Based Security** - Keamanan di level database dengan Row Level Security
3. **Serverless Edge Functions** - Logic backend di edge functions
4. **Type Safety End-to-End** - Types yang digenerate dari database schema

### Client Initialization

```typescript
// lib/supabase/client.ts - Client untuk browser
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

```typescript
// lib/supabase/server.ts - Client untuk server components
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createServerSupabaseClient = () => {
  const cookieStore = cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}
```

### Row Level Security (RLS)

```sql
-- supabase/policies/events.sql
-- Kebijakan untuk tabel events

-- Admin dapat melihat semua event
CREATE POLICY "Admin dapat melihat semua event" ON events
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Organizer hanya dapat melihat event yang mereka buat
CREATE POLICY "Organizer hanya dapat melihat event mereka" ON events
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt() ->> 'role' = 'organizer' 
    AND created_by = auth.uid()
  );

-- Customer dapat melihat event publik 
CREATE POLICY "Customer dapat melihat event publik" ON events
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt() ->> 'role' = 'customer' 
    AND is_published = true
  );
```

## 8. State Management

Pendekatan state management yang terstruktur dan sesuai dengan arsitektur aplikasi.

### Strategi State Management

1. **Context API** - Untuk state global yang sederhana
2. **React Query / SWR** - Untuk state server dan manajemen cache
3. **Zustand / Jotai** - Untuk state management yang lebih kompleks (opsional)
4. **Role-Specific State** - Pemisahan state berdasarkan role

### Global Context

```typescript
// contexts/auth-context/index.tsx
import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  
  // Auth logic implementasi
  
  return (
    <AuthContext.Provider value={{ user, role, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

### Feature-Specific State with Context Module Pattern

```typescript
// features/event-management/core/context/event-context.tsx
import { createContext, useContext, useReducer } from 'react'
import { EventService } from '../services/event-service'

// Context module pattern
export const createEventContext = () => {
  // State logic
  const [state, dispatch] = useReducer(reducer, initialState)
  
  // Actions yang terisolasi
  const actions = {
    fetchEvents: async () => {
      dispatch({ type: 'FETCH_EVENTS_START' })
      try {
        const events = await EventService.getEvents()
        dispatch({ type: 'FETCH_EVENTS_SUCCESS', payload: events })
      } catch (error) {
        dispatch({ type: 'FETCH_EVENTS_ERROR', payload: error })
      }
    },
    // Other actions
  }
  
  return { state, actions }
}

// Create and export the context
const EventContext = createContext(null)

export const EventProvider = ({ children }) => {
  const eventModule = createEventContext()
  
  return (
    <EventContext.Provider value={eventModule}>
      {children}
    </EventContext.Provider>
  )
}

export const useEvent = () => useContext(EventContext)
```

## 9. Routing dan Auth Protection

Menggunakan Next.js App Router dengan proteksi rute berbasis role.

### Struktur Routing

```
/app/
  ├── (auth)/              # Rute autentikasi (login, register)
  ├── (public)/            # Rute publik (landing page, informasi umum)
  └── (roles)/             # Rute dengan proteksi role
      ├── admin/
      │   ├── dashboard/   # Dashboard admin
      │   └── [...]/       # Rute admin lainnya
      ├── organizer/
      │   ├── dashboard/   # Dashboard organizer
      │   └── [...]/       # Rute organizer lainnya
      └── customer/
          ├── dashboard/   # Dashboard customer
          └── [...]/       # Rute customer lainnya
```

### Route Guards dengan Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  // Check authentication
  if (!session) {
    // Redirect non-authenticated users to login
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/login'
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }
  
  // Check role-based access
  const path = req.nextUrl.pathname
  const userRole = session.user?.user_metadata?.role
  
  // Admin routes protection
  if (path.startsWith('/admin') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }
  
  // Organizer routes protection
  if (path.startsWith('/organizer') && userRole !== 'organizer') {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }
  
  // Customer routes protection
  if (path.startsWith('/customer') && userRole !== 'customer') {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }
  
  return res
}

export const config = {
  matcher: [
    // Apply this middleware to all routes that require auth
    '/admin/:path*',
    '/organizer/:path*',
    '/customer/:path*',
    // Exclude auth routes
    '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)',
  ],
}
```

## 10. Panduan Implementasi Feature Baru

Langkah-langkah implementasi feature baru menggunakan arsitektur ini.

### 1. Definisikan Domain Model dan Core Logic

```typescript
// 1. Definisikan model data di models/
// features/new-feature/core/models/index.ts
export interface FeatureEntity {
  id: string;
  name: string;
  // ... properti lainnya
}

// 2. Implementasikan service core
// features/new-feature/core/services/feature-service.ts
import { FeatureEntity } from '../models';

export const FeatureService = {
  async getAll(): Promise<FeatureEntity[]> {
    // Implementasi logic
  },
  
  async getById(id: string): Promise<FeatureEntity> {
    // Implementasi logic
  },
  
  // ... methods lainnya
};
```

### 2. Buat Role Adapters

```typescript
// 3. Buat adapters untuk setiap role yang membutuhkan
// features/new-feature/adapters/admin/FeatureAdminAdapter.tsx
import { FeatureEntity } from '../../core/models';
import { FeatureService } from '../../core/services/feature-service';

export function FeatureAdminList() {
  // Admin-specific logic
  const { data: features } = useQuery('admin-features', FeatureService.getAll);
  
  return (
    <div>
      <h1>Admin Feature Management</h1>
      {/* Admin-specific UI components */}
    </div>
  );
}

// Repeat for other roles as needed
```

### 3. Integrasikan dengan Route

```tsx
// 4. Buat halaman di app router
// app/(roles)/admin/new-feature/page.tsx
import { FeatureAdminList } from '@/features/new-feature/adapters/admin/FeatureAdminAdapter';

export default function AdminFeaturePage() {
  return (
    <AdminLayout>
      <FeatureAdminList />
    </AdminLayout>
  );
}

// Repeat for other roles as needed
```

### 4. Buat RLS Policy di Supabase

```sql
-- 5. Define RLS policies
-- supabase/policies/new-feature.sql

-- Admin policies
CREATE POLICY "Admin full access" ON new_feature
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Organizer policies
CREATE POLICY "Organizer read/update own" ON new_feature
  FOR SELECT USING (
    auth.jwt() ->> 'role' = 'organizer' 
    AND created_by = auth.uid()
  );

-- ... additional policies
```

## 11. Testing dan Quality Assurance

Strategi testing untuk memastikan kualitas codebase.

### Testing Strategy

1. **Unit Testing**:
   - Core logic (service modules) 
   - Utility functions
   - Isolatable components

2. **Integration Testing**:
   - API calls
   - Supabase RLS policies
   - Role adapter behavior

3. **E2E Testing**:
   - Role-specific user flows
   - Auth protection

### Contoh Unit Test

```typescript
// features/event-management/core/services/__tests__/event-service.test.ts
import { EventService } from '../event-service';
import { supabase } from '@/lib/supabase/client';

jest.mock('@/lib/supabase/client');

describe('EventService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('getEvents returns events array', async () => {
    // Arrange
    const mockEvents = [{ id: '1', name: 'Event 1' }];
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        data: mockEvents,
        error: null
      })
    });
    
    // Act
    const result = await EventService.getEvents();
    
    // Assert
    expect(result).toEqual(mockEvents);
    expect(supabase.from).toHaveBeenCalledWith('events');
  });
});
```

### Contoh Integration Test

```typescript
// features/event-management/adapters/admin/__tests__/EventAdminAdapter.test.tsx
import { render, screen } from '@testing-library/react'
import { EventAdminAdapter } from '../EventAdminAdapter'

describe('EventAdminAdapter', () => {
  test('renders event name', () => {
    // Arrange
    const eventData = { id: '1', name: 'Test Event' }
    
    // Act
    render(<EventAdminAdapter eventData={eventData} />)
    
    // Assert
    expect(screen.getByText('Test Event')).toBeInTheDocument()
  })
  
  test('shows approve button for admin with permission', () => {
    // Arrange & mock permission check
    // Act & Assert
  })
})
```

## 12. Best Practices

### 1. Naming Conventions

- **Fitur Domain**: Kata benda, deskriptif domain (`event-management`, `user-profiles`)
- **Services**: Nama domain + "Service" (`EventService`, `ScoringService`)
- **Adapters**: Role + Domain + "Adapter" (`EventAdminAdapter`, `ScoringOrganizerAdapter`)
- **Components**: PascalCase, deskriptif fungsi (`EventCard`, `ScoringTable`)
- **Hooks**: camelCase dengan prefix "use" (`useEventData`, `useScoring`)

### 2. File Organisation Guidelines

- Group by feature/domain first, then by technical role
- Maintain consistent folder structure within each feature
- Use index.ts files for clean public APIs
- Limit exports to what's needed by consumers

### 3. Interface Contracts

- Define clear TypeScript interfaces between layers
- Use TypeScript generics for reusable patterns
- Consider zod for runtime validation

### 4. Authentication & Authorization

- Auth state should be globally accessible via context
- Role-based checks should happen in adapters
- Complex permissions should be modeled as domain concepts

### 5. Error Handling

- Core services should return errors, not throw them
- UI layer should handle display of errors
- Use consistent error patterns across the application

### 6. Performance Considerations

- Utilize React Query / SWR for data fetching & caching
- Implement code-splitting at route level
- Use appropriate memoization techniques

### 7. Documentation

- Document domain models and business rules
- Add JSDoc comments on public APIs
- Create example implementations for complex features

## Kesimpulan

Arsitektur Domain-Driven Modular dengan Role Adaptation Layer dan Supabase Integration memberikan fondasi yang kuat untuk MyArchery Platform. Pendekatan ini mendukung:

- **Skalabilitas**: Struktur modular memudahkan penambahan fitur baru
- **Maintainability**: Pemisahan concerns yang jelas memudahkan maintenance
- **Reusability**: Core logic yang sama digunakan di berbagai roles
- **Optimasi User Experience**: UX yang dioptimalkan per role melalui adapters
- **Kinerja Tim**: Tim dapat bekerja secara independen di features yang berbeda

Dengan mengikuti panduan ini, developer dapat memanfaatkan kerangka yang konsisten sambil mempertahankan fleksibilitas dalam implementasi detail.