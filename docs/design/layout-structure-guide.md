<!-- filepath: /Users/ltmoerdani/RCD/github/new-myarchery-platform/docs/design/layout-structure-guide.md -->
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

## Kesimpulan

Panduan ini menyediakan struktur dan pola yang jelas untuk layout dan halaman di MyArchery Platform. Dengan mengikuti panduan ini, tim dapat memastikan konsistensi visual dan fungsional di seluruh aplikasi, meningkatkan user experience dan maintainability kode. 

Layout yang baik adalah fondasi dari UI/UX yang baik—mari kita pastikan aplikasi MyArchery menyediakan pengalaman yang intuitif, efisien, dan menyenangkan bagi seluruh pengguna, dari admin hingga atlet.