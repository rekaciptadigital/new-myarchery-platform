# Panduan Arsitektur MyArchery Platform

> **Dokumen Version Control**  
> **Dibuat**: 10 Januari 2024  
> **Diperbarui Terakhir**: 26 April 2025  
> **Penulis**: Laksmana Tri Moerdani  
> **Kontributor**: Engineering Team

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
13. [Konsistensi Layout dalam Role Adaptation](#13-konsistensi-layout-dalam-role-adaptation)
14. [Model-Driven Architecture](#14-model-driven-architecture)

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

### Isolasi dan Komunikasi Antar Feature

1. **Strict Module Boundaries** - Feature harus diisolasi sepenuhnya dari feature lain
   - Tidak boleh melakukan import langsung dari feature lain
   - Tidak boleh mengakses state internal feature lain
   - Tidak boleh memanggil fungsi/service dari feature lain tanpa melalui API publik

2. **Public API Pattern** - Setiap feature harus mendefinisikan API publik yang jelas
   ```typescript
   // features/event-management/index.ts (Public API)
   export { EventService } from './core/services';
   export type { Event, EventDetail } from './core/models';
   export { EventAdminAdapter } from './adapters/admin';
   export { EventOrganizerAdapter } from './adapters/organizer';
   // Hanya ekspor yang diperlukan oleh feature lain
   ```

3. **Komunikasi Antar Feature** - Pattern yang direkomendasikan:
   - **Facade Pattern** - Feature besar dapat menyediakan facade untuk feature lain
   - **Event-based Communication** - Gunakan event emitter/subscriber untuk komunikasi loose-coupling
   - **Shared Core Services** - Berbagi data melalui service di `/lib`

4. **Shared State Management** - Jika beberapa feature perlu berbagi state:
   - Pindahkan state ke level yang lebih tinggi (global context)
   - Atau gunakan service pattern dengan state yang terkelola di `/lib`

5. **Dependency Injection** - Gunakan DI untuk mengurangi coupling langsung:
   ```typescript
   // Contoh Dependency Injection
   function FeatureComponent({ eventService = defaultEventService }) {
     // Component menggunakan eventService yang di-inject
   }
   ```

6. **Monitoring Dependensi** - Gunakan tools untuk memantau dependensi:
   - ESLint rules untuk mencegah import dari feature lain
   - Dependency graph generator untuk visualisasi hubungan antar module

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

### Prinsip Konsistensi State Management

1. **Pemisahan State Berdasarkan Konteks**
   - **Global State** - Informasi yang dibutuhkan di seluruh aplikasi (auth, theme, preferences)
   - **Feature State** - State yang hanya relevan untuk satu feature
   - **Component State** - State lokal yang hanya dibutuhkan oleh satu komponen
   - **Server State** - Data dari API/backend yang perlu di-cache dan disinkronkan

2. **Role-Specific State Segregation**
   - State untuk tiap role harus dipisahkan untuk menghindari kebocoran data
   - Implementasi melalui:
     ```typescript
     // contexts/role-specific/admin-context.tsx
     const AdminContext = createContext(null);
     
     // contexts/role-specific/organizer-context.tsx
     const OrganizerContext = createContext(null);
     
     // Contoh penggunaan di layout
     function AdminLayout({ children }) {
       // Hanya menyediakan konteks yang relevan untuk admin
       return (
         <AdminContext.Provider value={adminState}>
           {children}
         </AdminContext.Provider>
       );
     }
     ```

3. **Standar Implementasi Context**
   - Pola Context Module dengan Provider dan Hook
   - Semua provider harus dibuat dengan:
     - Interface standar (`initialState`, `reducer`, `actions`)
     - Error boundary
     - Type safety dengan TypeScript
   - Contoh pattern standar:
     ```typescript
     // 1. Create context module
     const createContext = () => {
       // State setup
       const [state, dispatch] = useReducer(reducer, initialState);
       
       // Memoized actions
       const actions = useMemo(() => ({
         action1: () => {...},
         action2: () => {...},
       }), [dependencies]);
       
       return { state, actions };
     }
     
     // 2. Create context and provider
     const Context = createContext(null);
     
     export const Provider = ({ children }) => {
       const contextValue = createContext();
       return (
         <Context.Provider value={contextValue}>
           {children}
         </Context.Provider>
       );
     }
     
     // 3. Create hook for consumption
     export const useFeatureContext = () => {
       const context = useContext(Context);
       if (!context) throw new Error("useFeatureContext must be used within Provider");
       return context;
     }
     ```

4. **React Query/SWR Usage Patterns**
   - Standar untuk query keys:
     ```typescript
     // Format: [domain, entity, id?, params?]
     const queryKey = ['events', 'list', { status: 'active' }];
     const { data } = useQuery(queryKey, fetchEvents);
     ```
   
   - Centralized query client configuration:
     ```typescript
     // lib/react-query/config.ts
     export const queryClient = new QueryClient({
       defaultOptions: {
         queries: {
           staleTime: 5 * 60 * 1000, // 5 minutes
           retry: 1,
           refetchOnWindowFocus: import.meta.env.PROD,
         },
       },
     });
     ```

5. **State Testing Strategy**
   - Unit test untuk reducers dan actions
   - Integration test untuk keseluruhan context
   - Mocking context dengan values yang spesifik untuk testing komponen

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

### Implementasi Auth Protection yang Konsisten

1. **Middleware-First Approach**
   - Proteksi rute dimulai dari middleware sebagai first line of defense
   - Middleware harus mencakup semua rute spesifik role dengan matcher yang tepat
   - Pastikan exclude pattern tidak membuka celah keamanan yang tidak diinginkan

2. **Defense in Depth**
   - Selain middleware, gunakan server components untuk verifikasi kedua
   - Selalu verifikasi role di server components untuk mengakses data sensitif
   ```typescript
   // app/(roles)/admin/dashboard/page.tsx
   import { redirect } from 'next/navigation';
   import { createServerSupabaseClient } from '@/lib/supabase/server';
   
   export default async function AdminDashboardPage() {
     const supabase = createServerSupabaseClient();
     const { data: { session } } = await supabase.auth.getSession();
     
     if (!session || session.user?.user_metadata?.role !== 'admin') {
       redirect('/unauthorized');
     }
     
     // Lanjutkan dengan konten admin
   }
   ```

3. **Error Handling & Redirects**
   - Standardisasi error pages dan redirect flows:
     - `/unauthorized` - Untuk akses tidak diizinkan (role salah)
     - `/login` - Untuk user tidak terautentikasi
     - `/forbidden` - Untuk user terautentikasi tapi tidak punya izin spesifik

4. **Role-Based Layout Wrapper**
   - Gunakan layout untuk menambahkan lapisan proteksi tambahan
   ```typescript
   // app/(roles)/admin/layout.tsx
   import { redirect } from 'next/navigation';
   import { createServerSupabaseClient } from '@/lib/supabase/server';
   
   export default async function AdminLayout({ children }) {
     const supabase = createServerSupabaseClient();
     const { data: { session } } = await supabase.auth.getSession();
     
     if (!session || session.user?.user_metadata?.role !== 'admin') {
       redirect('/unauthorized');
     }
     
     return (
       <AdminLayoutUI>
         {children}
       </AdminLayoutUI>
     );
   }
   ```

5. **Client-Side Protection**
   - Tambahkan client-side protection untuk navigasi UI:
   ```typescript
   // components/navigation/RoleProtectedLink.tsx
   import { useAuth } from '@/contexts/auth-context';
   
   export function RoleProtectedLink({ href, role, children }) {
     const { user } = useAuth();
     const hasAccess = user?.role === role;
     
     if (!hasAccess) return null;
     
     return <Link href={href}>{children}</Link>;
   }
   ```

6. **Testing Strategi Proteksi**
   - Test middleware untuk setiap role scenario
   - Test redirects dan error handling
   - Simulasi berbagai kondisi autentikasi

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

### 8. Konsistensi Implementasi

- **Code Review Checklist** - Menggunakan checklist berikut untuk setiap PR:
  - Apakah Core Logic terpisah dari UI Components?
  - Apakah adapters memanfaatkan core services?
  - Apakah permissions/role-checks diimplementasikan dengan benar?
  - Apakah ada direct access antar features yang melanggar arsitektur?
  - Apakah feature mengikuti struktur folder yang ditetapkan?

- **Feature Completeness Matrix** - Pastikan setiap feature memiliki:
  - Core models yang terdefinisi dengan baik
  - Core services dengan error handling standar
  - Adapters untuk setiap role yang relevan 
  - Tests untuk core services

- **API Contract Enforcement** - Setiap service harus:
  - Menggunakan schema validation (Zod/Yup) untuk input
  - Mengembalikan struktur respons yang konsisten
  - Menggunakan interface TypeScript untuk mendefinisikan kontrak
  - Menerapkan error handling pattern yang seragam

- **Role-Based Implementation Audit** - Lakukan audit rutin terhadap:
  - Konsistensi adapters di seluruh roles (admin/organizer/customer)
  - Permission checks di setiap adapter
  - Supabase RLS policies untuk setiap entitas

- **Pemantauan Dependency Graph** - Review berkala:
  - Dependensi antar features 
  - Dependensi cyclic yang perlu dihindari
  - Ukuran bundle untuk optimasi performa

- **Component Library Compliance** - Memastikan UI components:
  - Menggunakan design system yang konsisten
  - Menerapkan accessibility (a11y) standards
  - Responsif di seluruh device/viewport
  - Dapat di-reuse tanpa side effects

## 13. Konsistensi Layout dalam Role Adaptation

Memastikan konsistensi layout antar fitur dengan role yang sama adalah aspek kritis dalam arsitektur ini.

### 13.1 Prinsip Layout Inheritance

1. **Single Source of Truth untuk Layout**
   - Setiap role (admin, organizer, customer) memiliki **satu** layout definisi yang menjadi referensi
   - Layout didefinisikan **hanya** di `app/(roles)/[role]/layout.tsx`
   - Layout ini menggunakan komponen layout dari feature dashboard (feature referensi)
   ```tsx
   // app/(roles)/organizer/layout.tsx
   import { OrganizerLayout } from "@/features/dashboard/adapters/organizer/components/OrganizerLayout";
   
   export default function OrganizerLayoutPage({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return <OrganizerLayout>{children}</OrganizerLayout>;
   }
   ```

2. **Avoid Nested Layouts**
   - **TIDAK boleh ada** nested layout di level fitur (`app/(roles)/[role]/[feature]/layout.tsx`)
   - Features hanya mendefinisikan konten melalui page.tsx, **bukan** layout tambahan
   - Jika terdapat `layout.tsx` di level fitur, sebaiknya **hanya meneruskan children tanpa membungkusnya**
   ```tsx
   // app/(roles)/organizer/events/layout.tsx - Jika memang diperlukan
   export default function OrganizerEventsLayoutWrapper({
     children,
   }: {
     children: React.ReactNode;
   }) {
     // Tidak membungkus dengan layout tambahan
     return <>{children}</>;
   }
   ```

3. **Struktur Layout yang Benar vs. Salah**
   - ✅ **BENAR:**
     ```
     app/(roles)/[role]/layout.tsx       # Layout definisi tunggal
         └── [feature]/page.tsx          # Hanya konten, tanpa layout
     ```
   
   - ❌ **SALAH:**
     ```
     app/(roles)/[role]/layout.tsx       # Layout utama
         └── [feature]/                  
             ├── layout.tsx              # Layout nested (redundant)
             └── page.tsx                
     ```

### 13.2 Implementasi Sidebar Konsisten

1. **Centralized Sidebar State**
   - State sidebar (collapsed, expanded, hidden) dikelola melalui context
   - Semua feature mengakses state yang sama melalui hooks
   ```typescript
   // contexts/sidebar-context/index.tsx
   export const SidebarContext = createContext({
     isCollapsed: false,
     isHidden: false,
     setIsCollapsed: () => {},
     setIsHidden: () => {},
   });
   ```

2. **Margin dan Spacing Konsisten**
   - Main content harus responsif terhadap sidebar state dengan margin yang konsisten
   - Gunakan nilai margin yang standar:
     - Sidebar expanded: `ml-64` (sidebar width 256px)
     - Sidebar collapsed: `ml-16` (sidebar width 64px)
     - Sidebar hidden: `ml-1` (sidebar width 4px)
   
   ```tsx
   function MainContent({ children }) {
     const { isCollapsed, isHidden } = useSidebar();
     
     // Calculate appropriate margin based on sidebar state
     const getMainMarginClass = () => {
       if (isHidden) return "ml-1";
       if (isCollapsed) return "ml-16";
       return "ml-64";
     };
     
     return (
       <main className={`flex-1 ${getMainMarginClass()} p-6 transition-all duration-200`}>
         {children}
       </main>
     );
   }
   ```

### 13.3 Resolusi Masalah Layout Inkonsisten

1. **Diagnosis Layout Redundan**
   - Periksa struktur folder untuk menemukan nested layouts
   - Identifikasi file `layout.tsx` di level fitur yang membungkus konten dengan layout tambahan
   - Periksa komponen-komponen yang mungkin menduplikasi sidebar atau struktur layout

2. **Langkah Perbaikan**
   - Hapus file `layout.tsx` di level fitur jika memungkinkan
   - Atau, modifikasi file tersebut untuk hanya meneruskan children tanpa wrapping
   - Refaktor komponen yang menduplikasi sidebar untuk menggunakan sidebar yang terpusat

3. **Validasi Konsistensi**
   - Verifikasi bahwa main content margin merespons dengan benar terhadap state sidebar
   - Pastikan tidak ada layout yang bersarang atau sidebar yang terduplikasi
   - Cek konsistensi visual antar fitur dengan role yang sama

### 13.4 Best Practices dan Panduan

1. **Saat Membuat Feature Baru**
   - **JANGAN** membuat layout baru di level fitur
   - Gunakan dashboard sebagai referensi layout untuk setiap role
   - Reuse komponen layout dari feature dashboard
   - Jika perlu kostumisasi khusus, lakukan di level page component, bukan dengan layout baru

2. **Pengembangan Komponen UI**
   - Komponen UI spesifik fitur harus menyesuaikan diri dengan layout parent
   - Hindari hard-coding margin yang mungkin bertentangan dengan layout utama
   - Gunakan CSS yang responsif terhadap sidebar state melalui context

3. **Rute dan Navigasi**
   - Konsistensi pengelolaan route active state di sidebar antar fitur
   - Gunakan pattern yang sama untuk mendeteksi route aktif
   ```tsx
   function SidebarNavItems() {
     const pathname = usePathname();
     
     return (
       <nav>
         {navItems.map((item) => {
           const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
           
           return (
             <Link 
               href={item.href}
               className={isActive ? "active-nav-class" : "inactive-nav-class"}
             >
               {item.label}
             </Link>
           );
         })}
       </nav>
     );
   }
   ```

Dengan mematuhi prinsip-prinsip ini, aplikasi akan memiliki pengalaman pengguna yang konsisten di seluruh fitur untuk setiap role, sekaligus mempertahankan arsitektur yang bersih dan mudah di-maintain.

## 14. Model-Driven Architecture

Panduan ini memperjelas pendekatan model-driven yang digunakan dalam arsitektur MyArchery Platform, dengan fokus pada perbedaan antara model domain dan subfeature.

### 14.1 Domain Model vs Subfeature

#### Definisi

- **Domain Model**: Representasi data dan logika bisnis yang merupakan entitas domain utama (Tournament, Event, Category, dll).
- **Subfeature**: Fungsionalitas UI dan layanan spesifik yang mengimplementasikan cara berinteraksi dengan model domain.

Dalam pendekatan model-driven:
- Model domain menjadi entitas sentral 
- Subfeature dianggap sebagai implementasi UI terhadap model domain

#### Contoh

```
Event (Domain Model)
├── Tournament (Domain Model)
│   ├── Category (Domain Model)
│   │   └── Participant (Domain Model) 
```

Hubungan antar model ini adalah relasi domain bisnis, bukan relasi teknikal antar subfeature.

### 14.2 Reorganisasi Struktur Feature

Struktur feature berbasis model diorganisir sebagai berikut:

```
/features/event-management/
  /core/
    /models/              # Domain models
      event.ts            # Model Event
      tournament.ts       # Model Tournament
      category.ts         # Model Category
      participant.ts      # Model Participant
      
    /services/            # Business logic untuk model
      event-service.ts    # Service untuk Event
      tournament-service.ts # Service untuk Tournament
      category-service.ts # Service untuk Category
      
    /repositories/        # Interface untuk data access
      event-repository.ts
      tournament-repository.ts
      
  /adapters/              # UI implementations
    /admin/
      EventAdminAdapter.tsx
      TournamentAdminAdapter.tsx
      CategoryAdminAdapter.tsx
      
    /organizer/
      EventOrganizerAdapter.tsx
      TournamentOrganizerAdapter.tsx
```

### 14.3 Model Implementation

Domain model mengimplementasikan entitas bisnis dengan tipe dan metode domain:

```typescript
// features/event-management/core/models/tournament.ts
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

export interface TournamentSettings {
  registrationDeadline: string;
  maxParticipants?: number;
  scoringSystem: "cumulative" | "elimination" | "custom";
}

export type CategoryReference = {
  id: string;
  name: string;
};

// Domain methods
export function createEmptyTournament(): TournamentFormData {
  return {
    name: "",
    startDate: "",
    endDate: "",
    categories: [],
    settings: {
      registrationDeadline: "",
      scoringSystem: "cumulative"
    }
  };
}
```

### 14.4 Service Implementation

Service mengelola logika bisnis terkait model domain:

```typescript
// features/event-management/core/services/tournament-service.ts
import { TournamentFormData } from "../models/tournament";
import { tournamentRepository } from "../repositories/tournament-repository";

export class TournamentService {
  static async getTournamentById(id: string): Promise<TournamentFormData> {
    return tournamentRepository.findById(id);
  }
  
  static async createTournament(data: TournamentFormData): Promise<string> {
    // Validasi dan business rules
    if (new Date(data.startDate) > new Date(data.endDate)) {
      throw new Error("Start date cannot be after end date");
    }
    
    return tournamentRepository.create(data);
  }
  
  static async updateTournament(id: string, data: TournamentFormData): Promise<void> {
    return tournamentRepository.update(id, data);
  }
}
```

### 14.5 Adapter Implementation

Adapter menghubungkan model domain dengan UI spesifik berdasarkan role:

```typescript
// features/event-management/adapters/admin/TournamentAdminAdapter.tsx
import React from 'react';
import { TournamentService } from '../../core/services/tournament-service';
import { TournamentFormData, createEmptyTournament } from '../../core/models/tournament';

interface TournamentAdminAdapterProps {
  readonly eventId: string;      // Parent event ID
  readonly tournamentId?: string; // Optional for create new scenario
}

export function TournamentAdminAdapter({
  eventId,
  tournamentId
}: TournamentAdminAdapterProps) {
  const [tournamentData, setTournamentData] = React.useState<TournamentFormData | null>(
    tournamentId ? null : createEmptyTournament()
  );
  
  // Implementasi fetch, update, UI rendering
}
```

### 14.6 Prinsip Implementasi Model-Driven

1. **Relationship First** - Tentukan hubungan antar model terlebih dahulu sebelum implementasi UI
2. **Model Agnostic UI** - UI harus beradaptasi terhadap model, bukan sebaliknya
3. **Core Domain Isolation** - Model domain harus independen dari lapisan UI
4. **Business Logic Centralization** - Logika bisnis terletak dalam service, bukan UI
5. **Role-Specific Presentation** - Adapter menghandel role-specific implementation

### 14.7 Panduan Konversi dari Subfeature ke Model-Driven

Untuk project yang sudah menggunakan struktur subfeature, berikut langkah konversi:

1. **Identifikasi Model Domain Utama**
   - Review subfeature dan ekstrak model domain yang mendasarinya
   - Definisikan relasi antar model

2. **Restrukturisasi Folder**
   - Pindahkan model dari subfeature ke core/models
   - Pindahkan service dari subfeature ke core/services
   - Pertahankan adapter di adapter role yang sesuai

3. **Update Imports**
   - Update semua import path yang terdampak

4. **Migrasi UI Components**
   - Migrasi UI Components ke adapter role yang sesuai
   - Pastikan semua components menggunakan service core

5. **Validasi**
   - Pastikan semua fitur tetap berfungsi dengan benar
   - Verifikasi bahwa model domain terpisah dengan jelas dari UI

### 14.8 Contoh Kategori Event Types

Kategori Event dalam MyArchery adalah contoh sempurna dari model domain:

```typescript
// features/event-management/core/models/category.ts
export enum CategoryType {
  RECURVE = "recurve",
  COMPOUND = "compound",
  TRADITIONAL = "traditional",
  BAREBOW = "barebow",
  NASIONAL = "nasional"
}

export interface CategorySettings {
  distanceInMeters: number;
  maxArrows: number;
  scoringSystem: "cumulative" | "elimination";
  minParticipants?: number;
  maxParticipants?: number;
  ageRestriction?: {
    minAge?: number;
    maxAge?: number;
  };
}

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  settings: CategorySettings;
  tournamentId: string;
}
```

Implementasi ini menunjukkan bagaimana CategoryType menjadi model domain yang mendeskripsikan variasi dari entitas Category, bukan sebagai subfeature terpisah.

### 14.9 Kesimpulan

Pendekatan model-driven menawarkan keunggulan:

1. **Maintainability Lebih Baik** - Model domain yang jelas mempermudah pemeliharaan
2. **Fokus Bisnis Yang Tepat** - Struktur kode mencerminkan domain bisnis 
3. **Testability** - Model dan service lebih mudah diuji secara terpisah
4. **Reusability** - Model domain dapat digunakan di berbagai adapter
5. **Onboarding** - Developer baru lebih mudah memahami domain bisnis

Dengan mengikuti pendekatan ini, struktur aplikasi akan lebih mencerminkan domain bisnis yang sesungguhnya dan mengurangi kompleksitas serta redundansi dalam implementasi.