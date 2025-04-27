# Panduan Struktur Layout & Halaman - MyArchery Platform

> **Dokumen Version Control**  
> **Dibuat**: 27 April 2025  
> **Penulis**: Engineering Team MyArchery  
> **Status**: Aktif

## Daftar Isi

1. [Pendahuluan](#1-pendahuluan)
2. [Prinsip Layout](#2-prinsip-layout)
3. [Struktur Layout Utama](#3-struktur-layout-utama)
4. [Layout Spesifik Role](#4-layout-spesifik-role)
5. [Anatomi Halaman](#5-anatomi-halaman)
6. [Komponen Layout](#6-komponen-layout)
7. [Responsivitas & Adaptasi Perangkat](#7-responsivitas--adaptasi-perangkat)
8. [Optimasi UI/UX Dashboard](#8-optimasi-uiux-dashboard)
9. [Best Practices & Checklist](#9-best-practices--checklist)
10. [Template & Contoh Implementasi](#10-template--contoh-implementasi)
11. [Panduan Implementasi Layout](#11-panduan-implementasi-layout)

## 1. Pendahuluan

Dokumen ini menyediakan panduan komprehensif tentang struktur layout dan halaman untuk MyArchery Platform. Tujuannya adalah memastikan konsistensi, usability, dan maintainability di seluruh aplikasi. Panduan ini menjadi referensi bagi designer dan developer untuk memahami dan mengimplementasikan layout yang sesuai dengan standar platform.

### Hubungan dengan Dokumen Lain

- **Architecture Guide**: Menentukan struktur folder dan organisasi kode
- **UI Styling Guide**: Mendefinisikan komponen UI, warna, tipografi, spacing
- **Frontend Guideline**: Prinsip frontend secara umum

### Role-Based Approach

Panduan ini mengikuti pendekatan **Role Adaptation Layer** dalam arsitektur MyArchery, mengoptimalkan UI/UX untuk tiga peran utama:
- **Admin**: Manajemen platform & pengawasan
- **Organizer**: Pengelolaan event & kompetisi
- **Customer/Athlete**: Pendaftaran, informasi & partisipasi

## 2. Prinsip Layout

### Konsistensi & Familiaritas

Layout di seluruh platform harus konsisten untuk mengurangi cognitive load pengguna:
- **Posisi elemen** yang konsisten (navigasi, header, konten utama)
- **Pola interaksi** yang familiar dan dapat diprediksi
- **Visual hierarchy** yang jelas dan konsisten

### Prioritas Konten

Layout harus memprioritaskan konten yang paling penting:
- **Content-first approach** - UI mendukung konten, bukan sebaliknya
- **Progressive disclosure** - Informasi tambahan ditampilkan sesuai kebutuhan
- **Task-oriented design** - Layout dioptimalkan untuk task yang sering dilakukan

### Efisiensi Navigasi

Layout harus memungkinkan navigasi yang efisien:
- **Jarak interaksi** yang minimal (Fitts's Law)
- **Wayfinding** yang jelas melalui breadcrumbs, header, dan visual cues
- **Contextual navigation** relevan dengan tugas yang sedang dilakukan

## 3. Struktur Layout Utama

MyArchery menggunakan struktur layout berbasis **sidebar** sebagai template utama aplikasi, dengan adaptasi spesifik untuk masing-masing peran.

### Struktur Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│ TopNavbar (stickey)                                     │
├─────────┬───────────────────────────────────────────────┤
│         │ PageHeader                                    │
│         ├───────────────────────────────────────────────┤
│ Sidebar │                                               │
│         │                                               │
│         │ MainContent                                   │
│         │                                               │
│         │                                               │
├─────────┴───────────────────────────────────────────────┤
│ Footer (opsional)                                       │
└─────────────────────────────────────────────────────────┘
```

### Ukuran & Proporsi

#### Sidebar
- **Expanded**: `w-64` (256px)
- **Collapsed**: `w-16` (64px)
- **Hidden**: `w-1` (4px)
- **Height**: `h-screen` (100% viewport height)
- **Z-Index**: `z-20`

#### Top Navbar
- **Height**: `h-16` (64px)
- **Z-Index**: `z-10`
- **Position**: `sticky top-0`

#### Main Content Area
- **Padding Default**: `px-6 py-4` (24px horizontal, 16px vertical)
- **Max Width**: `max-w-7xl` (1280px) dengan `mx-auto` (centered)
- **Margin Left** (Responsive to Sidebar):
  - Expanded Sidebar: `ml-64`
  - Collapsed Sidebar: `ml-16`
  - Hidden Sidebar: `ml-1`

### Grid System

Content menggunakan sistem grid Tailwind yang responsif:
- **Mobile**: 1 kolom (`grid-cols-1`)
- **Tablet**: 2 kolom (`md:grid-cols-2`)
- **Desktop**: 3-4 kolom (`lg:grid-cols-3 xl:grid-cols-4`)
- **Gap**: `gap-4` (16px) atau `gap-6` (24px) untuk komponen besar

## 4. Layout Spesifik Role

### Admin Layout

Fokus pada manajemen dan overview platform:

```
┌─────────────────────────────────────────────────────────┐
│ AdminTopBar (notifications, profile, etc)               │
├─────────┬───────────────────────────────────────────────┤
│         │ Admin Dashboard Title                         │
│         ├───────────────────────────────────────────────┤
│ Admin   │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌────────┐│
│ Sidebar │ │Stats Card│ │Stats Card│ │Stats Card│ │StatsCard││
│         │ └─────────┘ └─────────┘ └─────────┘ └────────┘│
│         ├───────────────────────────────────────────────┤
│         │ ┌───────────────────────┐ ┌─────────────────┐ │
│         │ │                       │ │                 │ │
│         │ │ Main Admin Content    │ │ Secondary Panel │ │
│         │ │ (Tables, Management)  │ │ (Filters, Info) │ │
│         │ │                       │ │                 │ │
│         │ └───────────────────────┘ └─────────────────┘ │
├─────────┴───────────────────────────────────────────────┤
│ System Footer                                           │
└─────────────────────────────────────────────────────────┘
```

- **Navigasi**: Akses ke semua aspek platform
- **Layout Content**: Layout grid untuk overview statistik, kemudian 2-kolom untuk konten utama
- **Privilegi Khusus**: Akses ke semua fitur konfigurasi & administrasi

### Organizer Layout

Fokus pada manajemen event dan peserta:

```
┌─────────────────────────────────────────────────────────┐
│ OrganizerTopBar (event selector, notifications)         │
├─────────┬───────────────────────────────────────────────┤
│         │ Event Dashboard / Management View             │
│         ├───────────────────────────────────────────────┤
│         │ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│Organizer│ │Event Card│ │Stats Card│ │Progress │           │
│Sidebar  │ └─────────┘ └─────────┘ └─────────┘           │
│         ├───────────────────────────────────────────────┤
│         │ ┌─────────────────────────────────────────────┤
│         │ │                                             │
│         │ │ Event Management Interface                  │
│         │ │ (Participants, Schedules, Scoring)          │
│         │ │                                             │
│         │ └─────────────────────────────────────────────┤
└─────────┴───────────────────────────────────────────────┘
```

- **Navigasi**: Fokus pada tools event management dan reporting
- **Layout Content**: Layout dengan highlight event aktif dan status
- **Privilegi Khusus**: Tools pembuatan event dan manajemen peserta

### Customer/Athlete Layout

Fokus pada informasi kompetisi dan profil atlet:

```
┌─────────────────────────────────────────────────────────┐
│ AthleteTopBar (competitions, notifications)             │
├─────────┬───────────────────────────────────────────────┤
│         │ My Dashboard / Competitions View              │
│         ├───────────────────────────────────────────────┤
│         │ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│ Athlete │ │Next Event│ │My Scores │ │Rankings │           │
│ Sidebar │ └─────────┘ └─────────┘ └─────────┘           │
│         ├───────────────────────────────────────────────┤
│         │ ┌───────────────────────┐ ┌─────────────────┐ │
│         │ │                       │ │                 │ │
│         │ │ Upcoming Competitions │ │ My Stats        │ │
│         │ │ (Cards, Registration) │ │ (Charts, Data)  │ │
│         │ │                       │ │                 │ │
│         │ └───────────────────────┘ └─────────────────┘ │
└─────────┴───────────────────────────────────────────────┘
```

- **Navigasi**: Fokus pada profil, kompetisi, dan scoring
- **Layout Content**: Layout yang menampilkan kompetisi mendatang dan performa
- **Privilegi Khusus**: Akses ke profil atlet dan statistik pribadi

## 5. Anatomi Halaman

Setiap halaman harus mengikuti struktur standar, dengan adaptasi sesuai kebutuhan.

### Header Halaman

```
┌─────────────────────────────────────────────────────────┐
│ ← Breadcrumbs / Back Navigation                         │
├─────────────────────────────────────────────────────────┤
│ [Icon] Page Title                     [Secondary Action] │
│ Optional Description                  [Primary Action]   │
└─────────────────────────────────────────────────────────┘
```

- **Tinggi**: 80-96px total
- **Padding**: `px-6 py-4`
- **Margin Bottom**: `mb-6` (24px)
- **Struktur**: Flex container dengan justify-between
- **Kiri**: Page title (text-2xl font-bold) dan deskripsi opsional (text-slate-600)
- **Kanan**: Action buttons, primary dan secondary

### Content Section

```
┌─────────────────────────────────────────────────────────┐
│ Section Title (opsional)                                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Content Cards / Tables / Forms                          │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ Pagination / Show More (opsional)                       │
└─────────────────────────────────────────────────────────┘
```

- **Margin Bottom**: `mb-8` (32px) per section
- **Title**: `text-xl font-semibold mb-4`
- **Content Wrapper**: Card dengan `bg-white` dan border `border-gray-200`
- **Pagination**: Centered dengan `mt-4`

### Forms & Data Entry

```
┌─────────────────────────────────────────────────────────┐
│ Form Title                                              │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────────┐  ┌─────────────────────┐        │
│ │ Form Field Group 1  │  │ Form Field Group 2  │        │
│ └─────────────────────┘  └─────────────────────┘        │
│ ┌─────────────────────┐                                 │
│ │ Form Field Group 3  │                                 │
│ └─────────────────────┘                                 │
├─────────────────────────────────────────────────────────┤
│ [Cancel] [Save as Draft]               [Submit/Save]    │
└─────────────────────────────────────────────────────────┘
```

- **Layout**: Responsif grid dengan `grid-cols-1 md:grid-cols-2 gap-4`
- **Field Groups**: `space-y-4` untuk vertical spacing antar fields
- **Label + Input**: Label selalu diatas input, `space-y-2`
- **Actions**: Flex container dengan `justify-between` atau `justify-end`

## 6. Komponen Layout

### Sidebar Component

```jsx
<aside 
  className={`fixed left-0 top-0 h-screen bg-primary-900 shadow-lg 
               transition-all duration-300 ease-in-out z-20
               ${sidebarWidthClass} ${isHidden ? 'hover:w-64' : ''}
               overflow-y-auto overflow-x-hidden hidden md:block`}
>
  {/* Sidebar Header */}
  <div className="px-4 py-3 border-b border-primary-800 flex items-center justify-between">
    {!isCollapsed && !isHidden && <Logo className="h-8 mr-auto" />}
    <button 
      className="p-2 rounded-md hover:bg-primary-800 transition-colors"
      onClick={toggleSidebar}
    >
      <ChevronLeftIcon className={`h-5 w-5 text-gray-400 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
    </button>
  </div>
  
  {/* Navigation Menu */}
  <nav className="px-3 py-2 mt-3 flex flex-col">
    {menuItems.map((item) => (
      <a
        key={item.href}
        href={item.href}
        className={`px-4 py-2 my-1 rounded-md flex items-center ${
          item.isActive ? 'bg-primary-800 text-white' : 'text-gray-400 hover:text-white hover:bg-primary-800/50'
        } transition-all duration-200`}
      >
        <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
        {(!isCollapsed && !isHidden) && <span className="text-sm font-medium">{item.label}</span>}
        {item.badgeCount && !isCollapsed && !isHidden && (
          <span className="ml-auto bg-primary-500 text-xs px-1.5 py-0.5 rounded-full">{item.badgeCount}</span>
        )}
      </a>
    ))}
  </nav>
  
  {/* User Profile */}
  <div className="px-4 py-3 mt-auto border-t border-primary-800 flex items-center">
    <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>
    {!isCollapsed && !isHidden && (
      <div className="ml-3">
        <p className="text-sm font-medium text-white">John Doe</p>
        <p className="text-xs text-gray-400">Organizer</p>
      </div>
    )}
    <button className="ml-auto p-1 rounded-md hover:bg-primary-800">
      <DotsVerticalIcon className="h-4 w-4 text-gray-400" />
    </button>
  </div>
</aside>
```

### Page Header Component

```jsx
<div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
  <div>
    {showBackNav && (
      <div className="flex items-center gap-2 mb-1">
        <Link href={backNavLink} className="hover:bg-gray-100 p-1 rounded">
          <ChevronLeft size={20} />
        </Link>
        <p className="text-sm text-gray-500">Back to {backNavText}</p>
      </div>
    )}
    <h1 className="text-2xl font-bold flex items-center gap-2">
      {icon && <Icon className="h-6 w-6 text-primary-600" />}
      {title}
    </h1>
    {description && <p className="text-slate-600 mt-1">{description}</p>}
  </div>
  <div className="flex gap-4 mt-4 sm:mt-0">
    {secondaryAction && (
      <Button variant="outline" onClick={secondaryAction.onClick}>
        {secondaryAction.label}
      </Button>
    )}
    {primaryAction && (
      <Button 
        className="bg-primary-600 hover:bg-primary-700" 
        onClick={primaryAction.onClick}
      >
        {primaryAction.icon && <Icon size={16} className="mr-2" />}
        {primaryAction.label}
      </Button>
    )}
  </div>
</div>
```

### Section Container Component

```jsx
<section className="mb-8">
  {title && (
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      {icon && <Icon className="h-5 w-5 text-primary-600" />}
      {title}
    </h2>
  )}
  <div className={`
    ${withCard ? 'bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm' : ''}
    ${withPadding ? 'p-6' : ''}
  `}>
    {children}
  </div>
</section>
```

## 7. Responsivitas & Adaptasi Perangkat

Layout memiliki behavior berbeda berdasarkan ukuran viewport.

### Mobile (< 640px)

- **Sidebar**: Disembunyikan (`hidden`), diakses melalui hamburger menu
- **Content**: Full width (`ml-0, px-4`)
- **Top Navbar**: Menampilkan hamburger menu
- **Navigation**: Menggunakan bottom navigation untuk akses cepat fitur utama
- **Grids**: Single column (`grid-cols-1`)

### Tablet (640px - 1023px)

- **Sidebar**: Collapsed mode default (`w-16`)
- **Content**: Padding standard dengan sidebar minimal (`ml-16, px-6`)
- **Grids**: 2 columns untuk content cards (`sm:grid-cols-2`)

### Desktop (1024px+)

- **Sidebar**: Expanded mode default (`w-64`)
- **Content**: Full padding dengan sidebar (`ml-64, px-6`)
- **Grids**: 3-4 columns untuk content cards (`lg:grid-cols-3 xl:grid-cols-4`)

### Implementasi Responsif

```jsx
// Sidebar toggle based on screen
const [isMobile, setIsMobile] = useState(false)

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768)
    
    // Auto collapse on mobile
    if (window.innerWidth < 768 && !isCollapsed) {
      setIsCollapsed(true)
    }
    
    // Auto expand on desktop
    if (window.innerWidth >= 1024 && isCollapsed) {
      setIsCollapsed(false)
    }
  }
  
  checkMobile()
  window.addEventListener('resize', checkMobile)
  return () => window.removeEventListener('resize', checkMobile)
}, [])
```

## 8. Optimasi UI/UX Dashboard

### Principles of Dashboard Design

1. **At-a-Glance Information**
   - Prioritaskan informasi penting di area "above the fold"
   - Gunakan visual hierarchy untuk highlight metrik kunci
   - Group related information

2. **Progressive Disclosure**
   - Start with overview, provide drill-down capabilities
   - Hide complexity until needed
   - Use cards with expand/collapse functionality

3. **Customizable Views**
   - Allow users to pin important sections
   - Provide filters and view options
   - Save user preferences

### Dashboard Patterns

#### Stats Grid
```
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ Stat 1  │ │ Stat 2  │ │ Stat 3  │ │ Stat 4  │
│ Value   │ │ Value   │ │ Value   │ │ Value   │
│ +20%    │ │ -5%     │ │ +10%    │ │ +2%     │
└─────────┘ └─────────┘ └─────────┘ └─────────┘
```

- **Layout**: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6`
- **Item**: `bg-white p-5 rounded-lg shadow-sm border border-gray-200`
- **Value**: `text-3xl font-bold text-gray-900 mt-1`
- **Label**: `text-sm text-gray-500`

#### Dashboard Layout Patterns

1. **Overview + Details Pattern**
   ```
   ┌───────────────────────────────────────────┐
   │ Overview Stats                            │
   ├───────────────┬───────────────────────────┤
   │               │                           │
   │ Chart/Visual  │ Detail List/Table         │
   │               │                           │
   ├───────────────┴───────────────────────────┤
   │ Secondary Information                     │
   └───────────────────────────────────────────┘
   ```

2. **Dashboard Cards Pattern**
   ```
   ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
   │ Card 1        │ │ Card 2        │ │ Card 3        │
   │ (Chart)       │ │ (Stats)       │ │ (List)        │
   └───────────────┘ └───────────────┘ └───────────────┘
   ┌───────────────────────┐ ┌───────────────────────┐
   │ Card 4                │ │ Card 5                │
   │ (Table)               │ │ (Activity)            │
   └───────────────────────┘ └───────────────────────┘
   ```

3. **Main + Sidebar Pattern**
   ```
   ┌───────────────────────────┬───────────────┐
   │ Main Content Area         │ Sidebar       │
   │                           │ (Filters,     │
   │ (Tables, Charts,          │ Notifications,│
   │  Management Interface)    │ Quick Actions)│
   │                           │               │
   └───────────────────────────┴───────────────┘
   ```

## 9. Best Practices & Checklist

### Layout Checklist

- [ ] **Konsistensi**: Layout mengikuti struktur standar untuk tipe halaman
- [ ] **Responsif**: Layout beradaptasi dengan baik di semua ukuran layar
- [ ] **Aksesibilitas**: Elemen penting dapat diakses melalui keyboard, focus state jelas
- [ ] **Hierarchy**: Visual hierarchy yang jelas, dengan elemen penting lebih menonjol
- [ ] **Navigasi**: User selalu tahu lokasi mereka dan cara kembali/lanjut
- [ ] **Breathing Room**: Spacing yang cukup antara elemen, tidak terlalu padat

### Common Layout Mistakes

- Overloaded pages dengan terlalu banyak konten/aksi
- Inconsistent navigation patterns antar halaman
- Poor information hierarchy yang membingungkan user
- Layout yang tidak responsif atau rusak di mobile
- Spacing yang tidak konsisten atau terlalu sempit
- Hidden functionality yang sulit ditemukan

### Performance Considerations

- Lazy load content yang tidak visible di viewport
- Minimize layout shifts dengan placeholder/skeleton
- Use virtualized lists untuk data besar (react-window/react-virtualized)
- Optimize image delivery (responsive images, WebP format)
- Use code splitting untuk route-based components

## 10. Template & Contoh Implementasi

### Template Dasar - Dashboard Page

```jsx
// app/(roles)/organizer/dashboard/page.tsx
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { StatsGrid } from '@/components/dashboard/StatsGrid'
import { RecentActivitySection } from '@/components/dashboard/RecentActivitySection'
import { UpcomingEventsSection } from '@/components/dashboard/UpcomingEventsSection'

export default function OrganizerDashboardPage() {
  return (
    <div>
      <DashboardHeader 
        title="Dashboard"
        description="Manage your events and participants"
        primaryAction={{
          label: "Create Event",
          icon: PlusIcon,
          onClick: () => {/* action */}
        }}
      />
      
      <StatsGrid 
        stats={[
          { label: "Active Events", value: "12", change: "+2", isPositive: true },
          { label: "Participants", value: "256", change: "+24", isPositive: true },
          { label: "Completed Events", value: "8", change: "0", isNeutral: true },
          { label: "Revenue", value: "$12.4k", change: "+8%", isPositive: true },
        ]}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UpcomingEventsSection />
        </div>
        <div>
          <RecentActivitySection />
        </div>
      </div>
    </div>
  )
}
```

### Template - Detail Page dengan Tabs

```jsx
// app/(roles)/organizer/events/[eventId]/page.tsx
import { EventDetailHeader } from '@/components/events/EventDetailHeader'
import { EventDetailTabs } from '@/components/events/EventDetailTabs'
import { EventOverviewPanel } from '@/components/events/EventOverviewPanel'
import { ParticipantsPanel } from '@/components/events/ParticipantsPanel'

export default function EventDetailPage({ params }) {
  const { eventId } = params
  const [activeTab, setActiveTab] = useState('overview')
  
  return (
    <div>
      <EventDetailHeader eventId={eventId} />
      
      <EventDetailTabs 
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'overview', label: 'Overview' },
          { id: 'participants', label: 'Participants' },
          { id: 'schedule', label: 'Schedule' },
          { id: 'scoring', label: 'Scoring' },
          { id: 'settings', label: 'Settings' },
        ]}
      />
      
      <div className="mt-6">
        {activeTab === 'overview' && <EventOverviewPanel eventId={eventId} />}
        {activeTab === 'participants' && <ParticipantsPanel eventId={eventId} />}
        {/* Other tab panels... */}
      </div>
    </div>
  )
}
```

### Template - Form Page

```jsx
// app/(roles)/organizer/events/create/page.tsx
import { PageHeader } from '@/components/ui/PageHeader'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { EventForm } from '@/features/event-management/components/EventForm'

export default function CreateEventPage() {
  return (
    <div>
      <PageHeader
        title="Create New Event"
        description="Fill out the form below to create a new archery event"
        showBackNav
        backNavLink="/organizer/events"
        backNavText="Events"
      />
      
      <SectionContainer withCard withPadding>
        <EventForm />
      </SectionContainer>
      
      <div className="mt-6 flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button variant="outline">Save as Draft</Button>
        <Button>Create Event</Button>
      </div>
    </div>
  )
}
```

## 11. Panduan Implementasi Layout

Konsistensi layout dan behavior antara fitur-fitur yang memiliki role yang sama adalah hal kritis untuk memastikan UX yang baik dan menjaga kejelasan arsitektur aplikasi. Dokumen ini menjelaskan cara yang benar untuk mengimplementasikan layout untuk role berbeda di MyArchery Platform.

### Prinsip Dasar Layout Role-Based

1. **Layout Inheritance Hierarchy**
   - Layout didefinisikan pada level role, bukan pada level fitur
   - Fitur-fitur baru harus mewarisi layout dari role terkait
   - Tidak boleh ada nested layouts yang redundan

2. **Single Source of Truth untuk Layout**
   - Setiap role memiliki **satu** layout definisi yang menjadi referensi
   - Dashboard layout untuk setiap role adalah acuan utama
   - Layout fitur lain harus menggunakan layout yang sama dengan dashboard

3. **Sidebar Consistency**
   - Sidebar width, behavior, dan transisi harus konsisten di semua fitur
   - State sidebar (collapsed, expanded, hidden) harus sinkron di semua fitur

### Struktur Layout yang Benar

```
app/(roles)/[role]/layout.tsx       # Layout utama untuk role (CORRECT ✓)
    └── [feature]/page.tsx          # Konten untuk feature, tidak memiliki layout sendiri
```

**BUKAN**:

```
app/(roles)/[role]/layout.tsx       # Layout utama untuk role
    └── [feature]/                  # INCORRECT ✗
        ├── layout.tsx              # Redundant nested layout
        └── page.tsx
```

### Implementasi yang Benar vs. Salah

#### ✅ BENAR:
1. Definisikan **satu layout** per role di `app/(roles)/[role]/layout.tsx`
2. Layout role mengimpor layout component dari feature dashboard:
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

3. Pages di features lain hanya mendefinisikan konten, tanpa layout tambahan:
   ```tsx
   // app/(roles)/organizer/events/page.tsx
   import { EventsManagementAdapter } from "@/features/event-management/adapters/organizer/EventsManagementAdapter";
   
   export default function EventsPage() {
     return <EventsManagementAdapter />;
   }
   ```

#### ❌ SALAH:
1. Mendefinisikan layout tambahan di feature level:
   ```tsx
   // app/(roles)/organizer/events/layout.tsx - JANGAN LAKUKAN INI
   import { OrganizerEventsLayout } from "@/features/event-management/adapters/organizer/components/OrganizerEventsLayout";
   
   export default function OrganizerEventsLayoutWrapper({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return <OrganizerEventsLayout>{children}</OrganizerEventsLayout>;
   }
   ```

2. Duplikasi layout dengan behavior yang berbeda:
   ```tsx
   // features/event-management/adapters/organizer/components/OrganizerEventsLayout.tsx - JANGAN LAKUKAN INI
   export default function OrganizerEventsLayout({ children }) {
     // Layout ini menduplikasi OrganizerLayout dengan implementasi berbeda
     return (
       <div className="different-layout-structure">
         <Sidebar />
         <main>{children}</main>
       </div>
     );
   }
   ```

### Sidebar State Management

Sidebar state harus konsisten di seluruh aplikasi. Implementasi yang benar:

1. Gunakan **shared context** untuk state sidebar:
   ```tsx
   // contexts/sidebar-context/index.tsx
   export const SidebarContext = createContext({
     isCollapsed: false,
     isHidden: false,
     setIsCollapsed: () => {},
     setIsHidden: () => {},
   });
   
   export function SidebarProvider({ children }) {
     // State implementation...
     return (
       <SidebarContext.Provider value={sidebarState}>
         {children}
       </SidebarContext.Provider>
     );
   }
   ```

2. Main content harus responsive terhadap sidebar state:
   ```tsx
   function MainContent({ children }) {
     const { isCollapsed, isHidden } = useSidebar();
     
     // Get appropriate margin class based on sidebar state
     const getMarginClass = () => {
       if (isHidden) return "ml-1";
       if (isCollapsed) return "ml-16";
       return "ml-64";
     };
     
     return (
       <main className={`${getMarginClass()} transition-all duration-200`}>
         {children}
       </main>
     );
   }
   ```

### Menangani Rute Dalam Layout

Karena semua halaman berbagi layout yang sama, gunakan route segment untuk mendeteksi halaman aktif:

```tsx
function OrganizerNavItems() {
  const pathname = usePathname();
  
  return (
    <nav>
      {navItems.map((item) => {
        // Check if current route matches this nav item
        const isActive = pathname === item.href || 
                         pathname.startsWith(`${item.href}/`);
        
        return (
          <Link 
            href={item.href}
            className={isActive ? "active-class" : "inactive-class"}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
```

### Checklist Implementasi Layout

Ketika membuat fitur baru, verifikasi bahwa:

- [ ] **Tidak** membuat layout baru untuk fitur ini
- [ ] Menggunakan layout role yang sudah ada
- [ ] Jika fitur membutuhkan lebar konten atau padding khusus, terapkan hanya pada component-level, bukan dengan layout baru
- [ ] Layout responsif terhadap state sidebar (collapsed, expanded, hidden)
- [ ] Sidebar dan navigation item menyorot item yang tepat berdasarkan route

### Resolusi Untuk Masalah Umum

1. **Jarak/Margin Tidak Konsisten**
   - Pastikan semua konten menggunakan ukuran margin yang sama (`ml-64`, `ml-16`, `ml-1`)
   - Jangan tambahkan margin tambahan di level container

2. **Behavior Sidebar Berbeda**
   - Gunakan context yang sama (`SidebarContext`) di semua komponen
   - Pastikan class dan transisi CSS konsisten

3. **Layout Nesting Redundan**
   - Hapus layout di level fitur jika sudah ada layout di level role

4. **Implementasi Fitur Baru**
   - Selalu mulai dengan mempelajari layout dashboard sebagai referensi
   - Gunakan pattern dan struktur yang sama

Dengan mengikuti pedoman ini, kita dapat memastikan konsistensi layout di seluruh platform MyArchery, memberikan pengalaman yang mulus bagi pengguna dan menjaga arsitektur yang bersih.

## 14. Pedoman Implementasi Layout yang Konsisten

Berdasarkan pengalaman mengatasi masalah layout di berbagai fitur, berikut adalah pedoman komprehensif untuk implementasi layout yang konsisten dan maintainable.

### 14.1 Prinsip Dasar Layout Next.js App Router

Next.js App Router memberikan mekanisme layout yang sangat kuat, tetapi juga memerlukan disiplin dan pemahaman yang jelas tentang hierarki layout. Prinsip-prinsip berikut akan membantu mengoptimalkan struktur aplikasi:

1. **Hierarki Layout yang Jelas**
   - Layout didefinisikan di level tertinggi yang sesuai, tidak lebih rendah
   - Layout harus mewarisi ke semua halaman di bawahnya
   - **Hindari nested layouts** yang memberikan fungsionalitas yang sama

2. **Role Layout sebagai Single Source of Truth**
   - Layout untuk role tertentu (`admin`, `organizer`, `customer`) didefinisikan di level role
   - Contoh yang tepat: `app/(roles)/[role]/layout.tsx`
   - Layout ini merupakan satu-satunya tempat yang mendefinisikan struktur utama UI untuk role tersebut

3. **Feature Pages Fokus pada Konten**
   - Pages (`page.tsx`) harus fokus pada konten spesifik feature
   - Pages **tidak perlu tahu** tentang layout, sidebar, atau navigasi
   - Gunakan adapter pattern untuk menghubungkan domain logic dengan UI

### 14.2 Struktur Layout yang Benar

```
app/(roles)/
  ├── admin/
  │   ├── layout.tsx            # Definisi layout admin (✓ BENAR)
  │   ├── page.tsx              # Admin landing page
  │   └── [feature]/
  │       └── page.tsx          # Feature page
  │       # TIDAK perlu layout.tsx di sini
  │
  ├── organizer/
  │   ├── layout.tsx            # Definisi layout organizer (✓ BENAR)
  │   ├── page.tsx              # Organizer landing page
  │   └── [feature]/
  │       └── page.tsx          # Feature page
  │       # TIDAK perlu layout.tsx di sini
  │
  └── customer/
      ├── layout.tsx            # Definisi layout customer (✓ BENAR)
      ├── page.tsx              # Customer landing page
      └── [feature]/
          └── page.tsx          # Feature page
          # TIDAK perlu layout.tsx di sini
```

### 14.3 Implementasi Layout Role yang Benar

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

```tsx
// features/dashboard/adapters/organizer/components/OrganizerLayout.tsx
"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "@/contexts/sidebar-context";
import OrganizerSidebar from "./OrganizerSidebar";
import OrganizerLayoutContent from "./OrganizerLayoutContent";

interface OrganizerLayoutProps {
  children: ReactNode;
}

export function OrganizerLayout({ children }: Readonly<OrganizerLayoutProps>) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-50">
        <OrganizerSidebar />
        <OrganizerLayoutContent>
          {children}
        </OrganizerLayoutContent>
      </div>
    </SidebarProvider>
  );
}
```

```tsx
// features/dashboard/adapters/organizer/components/OrganizerLayoutContent.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { useSidebar } from "@/contexts/sidebar-context";

interface OrganizerLayoutContentProps {
  children: ReactNode;
}

export default function OrganizerLayoutContent({ 
  children 
}: Readonly<OrganizerLayoutContentProps>) {
  const { isCollapsed, isHidden } = useSidebar();
  const [initialLoad, setInitialLoad] = useState(true);
  
  // Skip initial animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  // Calculate the appropriate margin based on sidebar state
  const getMainMarginClass = () => {
    if (isHidden) return "ml-1";
    if (isCollapsed) return "ml-16";
    return "ml-64";
  };

  const marginClass = getMainMarginClass();
  const transitionClasses = initialLoad ? "" : "transition-all duration-200 ease-out";
  
  return (
    <main className={`flex-1 ${marginClass} p-6 ${transitionClasses}`}>
      {children}
    </main>
  );
}
```

### 14.4 Masalah Umum dan Solusinya

#### 1. Nested Layout Redundan
**Masalah**: File `layout.tsx` di level feature yang membungkus konten dengan layout tambahan.

```tsx
// ⛔ SALAH: app/(roles)/organizer/events/layout.tsx
import { OrganizerEventsLayout } from "@/features/event-management/adapters/organizer/components";

export default function OrganizerEventsLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OrganizerEventsLayout>{children}</OrganizerEventsLayout>;
}
```

**Solusi**:
1. **Hapus file layout.tsx** di level feature jika memungkinkan (preferred)
2. Atau, jika diperlukan untuk tujuan routing, modifikasi untuk hanya meneruskan children:

```tsx
// ✅ BENAR: app/(roles)/organizer/events/layout.tsx
export default function OrganizerEventsLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

#### 2. Margin dan Spacing Inkonsisten
**Masalah**: Main content tidak responsif terhadap sidebar state, atau menggunakan margin yang berbeda.

**Solusi**: Pastikan semua komponen LayoutContent menggunakan perhitungan margin yang konsisten:

```tsx
// Konsisten di seluruh role dan feature
const getMainMarginClass = () => {
  if (isHidden) return "ml-1";    // Hidden sidebar width: 4px
  if (isCollapsed) return "ml-16"; // Collapsed sidebar width: 64px
  return "ml-64";                 // Expanded sidebar width: 256px
};
```

#### 3. Duplikasi Komponen Sidebar
**Masalah**: Beberapa feature mendefinisikan dan menggunakan sidebar mereka sendiri.

**Solusi**: 
1. Gunakan satu sumber komponen sidebar dari feature dashboard
2. Import dan gunakan komponen tersebut di seluruh aplikasi:

```tsx
// ✅ BENAR: Menggunakan sidebar dari feature dashboard
import OrganizerSidebar from "@/features/dashboard/adapters/organizer/components/OrganizerSidebar";
```

#### 4. Transisi yang Tidak Konsisten
**Masalah**: Behavior transisi berbeda antara feature saat sidebar berubah state.

**Solusi**: Gunakan property transisi yang identik di semua layout:

```tsx
// ✅ BENAR: Konsisten di semua komponen layout
const transitionClasses = initialLoad ? "" : "transition-all duration-200 ease-out";
```

### 14.5 Checklist Validasi Layout

Gunakan checklist ini untuk memverifikasi konsistensi layout di seluruh aplikasi:

- [ ] **Layout Hierarchy**: Layout didefinisikan hanya di level role, tidak ada nested layouts
- [ ] **Sidebar Component**: Semua feature menggunakan komponen sidebar yang sama
- [ ] **Sidebar State**: State sidebar (expanded, collapsed, hidden) konsisten di seluruh aplikasi
- [ ] **Margins & Spacing**: Main content margin responsif terhadap sidebar state
- [ ] **Transitions**: Transisi visual konsisten ketika sidebar berubah state
- [ ] **Route Detection**: Active route detection menggunakan pattern yang sama di seluruh aplikasi
- [ ] **Mobile Responsiveness**: Semua layout menangani mobile view dengan cara yang konsisten

### 14.6 Saat Membuat Feature Baru

1. **Langkah Persiapan**:
   - Pelajari layout role terkait di dashboard sebagai referensi
   - Identifikasi pola dan behavior yang perlu direplikasi
   - Teliti cara sidebar merespons perubahan state

2. **Langkah Implementasi**:
   - Buat file `page.tsx` untuk feature baru
   - **JANGAN** membuat file `layout.tsx` baru
   - Lakukan kustomisasi hanya di level page component

3. **Testing dan Validasi**:
   - Verifikasi behavior UI di berbagai viewport
   - Uji dengan berbagai state sidebar
   - Bandingkan dengan implementasi dashboard untuk memastikan konsistensi

### 14.7 Migrasi Layout yang Tidak Konsisten

Jika menemukan inconsistent layout pada feature yang sudah ada, ikuti langkah-langkah berikut:

1. **Identifikasi Root Cause**:
   - Periksa ada/tidaknya file `layout.tsx` di level feature
   - Periksa komponen layout yang mungkin menduplikasi sidebar
   - Bandingkan struktur markup dan margin dengan layout dashboard

2. **Langkah Perbaikan**:
   - Hapus layout redundan
   - Gunakan komponen layout yang sudah ada
   - Pastikan semua pages di feature terkait tetap berfungsi

3. **Validasi Hasil**:
   - Verifikasi bahwa sidebar behavior konsisten
   - Pastikan tidak ada regresi visual atau fungsional
   - Cek responsivitas dan transisi

Dengan mengikuti pedoman dan pola ini, aplikasi akan memiliki struktur layout yang konsisten, maintainable, dan memberikan pengalaman pengguna yang mulus di seluruh feature. Konsistensi ini juga akan memudahkan onboarding developer baru dan pengembangan feature di masa depan.