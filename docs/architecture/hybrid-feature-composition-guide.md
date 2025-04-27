# Panduan Implementasi Domain-Driven Modular Architecture dengan Hybrid Feature Composition

> **Dokumen Version Control**  
> **Dibuat**: 27 April 2025  
> **Diperbarui Terakhir**: 27 April 2025  
> **Penulis**: Laksmana Tri Moerdani  
> **Status**: Aktif

## Daftar Isi

1. [Pendahuluan](#1-pendahuluan)
2. [Konsep Hybrid Feature Composition](#2-konsep-hybrid-feature-composition)
3. [Struktur Folder dan Organisasi Kode](#3-struktur-folder-dan-organisasi-kode)
4. [Subfitur vs Module: Panduan Keputusan](#4-subfitur-vs-module-panduan-keputusan)
5. [Implementasi Subfitur](#5-implementasi-subfitur)
6. [Implementasi Module](#6-implementasi-module)
7. [Integrasi Subfitur dan Module](#7-integrasi-subfitur-dan-module)
8. [Komunikasi Antar Komponen](#8-komunikasi-antar-komponen)
9. [Evolution Pattern: Dari Subfitur ke Module](#9-evolution-pattern-dari-subfitur-ke-module)
10. [Testing dan Quality Assurance](#10-testing-dan-quality-assurance)
11. [Best Practices dan Checklist](#11-best-practices-dan-checklist)
12. [Contoh Implementasi](#12-contoh-implementasi)

## 1. Pendahuluan

Panduan ini melengkapi dokumen Architecture Guide utama dengan fokus pada implementasi **Hybrid Feature Composition** dalam arsitektur Domain-Driven Modular dengan Role Adaptation Layer. Pendekatan hybrid ini memungkinkan pengembangan yang fleksibel dengan dua cara pengelolaan fitur: **Subfitur** (domain-specific) dan **Module** (cross-domain, reusable).

### Tujuan Panduan

- Memberikan kerangka kerja untuk menentukan kapan menggunakan subfitur vs module
- Menyediakan pola implementasi yang konsisten untuk setiap pendekatan
- Mendukung evolusi komponen seiring pertumbuhan aplikasi
- Memastikan maintainability dan scalability jangka panjang
- Meningkatkan developer experience dan onboarding

### Integrasi dengan Dokumen Lain

Dokumen ini memperluas konsep yang dijelaskan dalam:
- **Architecture Guide** - Prinsip dan struktur arsitektur utama
- **Frontend Guideline** - Praktik frontend umum dan teknologi yang digunakan
- **Layout Structure Guide** - Struktur layout untuk berbagai peran pengguna

## 2. Konsep Hybrid Feature Composition

Hybrid Feature Composition adalah pendekatan arsitektur yang mengkombinasikan pengelolaan fungsionalitas melalui dua pola berbeda yang saling melengkapi:

### Subfitur (Domain-Specific Components)

- **Definisi**: Bagian dari fitur utama yang masih terikat erat dengan domain bisnis tersebut
- **Karakteristik**:
  - Berada dalam konteks domain bisnis yang sama dengan fitur induknya
  - Memiliki ketergantungan pada model dan state fitur induk
  - Spesifik untuk satu area bisnis dan jarang digunakan di luar domain tersebut
  - Mengikuti alur bisnis yang sama dengan fitur induknya

- **Contoh**: Dalam fitur "Event Management", subfitur dapat berupa "Categories Management", "Schedule Management", atau "Participant Management"

### Module (Cross-Domain Reusable Components)

- **Definisi**: Unit fungsionalitas independen yang dapat digunakan oleh berbagai fitur
- **Karakteristik**:
  - Agnostik terhadap domain bisnis spesifik
  - Tidak bergantung pada fitur manapun, berdiri sendiri
  - Menyediakan kapabilitas teknis yang reusable di seluruh aplikasi
  - Memiliki interface publik yang jelas dan konsisten

- **Contoh**: "File Upload", "PDF Generator", "Rich Text Editor", "Notification System"

### Hybrid Approach Benefits

1. **Fleksibilitas Pengembangan** - Dapat memilih pendekatan yang paling sesuai dengan kebutuhan spesifik
2. **Skalabilitas** - Komponen dapat berevolusi dari subfitur menjadi module saat penggunaannya meluas
3. **Kode Reuse** - Technical capabilities dapat digunakan ulang tanpa duplikasi kode
4. **Domain Boundary** - Tetap menjaga batasan domain yang jelas
5. **Development Efficiency** - Tim dapat bekerja pada komponen secara paralel dengan minimal conflicts

## 3. Struktur Folder dan Organisasi Kode

Hybrid Feature Composition diterapkan dengan struktur folder berikut:

```
/src/
  ├── features/                     # Domain-driven features
  │   ├── event-management/         # Fitur domain utama
  │   │   ├── core/                 # Core domain logic
  │   │   │   ├── models/           # Domain models
  │   │   │   ├── services/         # Business logic
  │   │   │   └── utils/            # Domain-specific utils
  │   │   │
  │   │   ├── components/           # Shared UI components untuk semua role
  │   │   │
  │   │   ├── subfeatures/          # Domain-specific subfeatures
  │   │   │   ├── categories/       # Subfitur: Event Categories
  │   │   │   │   ├── core/         # Subfitur core (models, services)
  │   │   │   │   ├── components/   # UI components spesifik subfitur
  │   │   │   │   └── index.ts      # Public API subfitur
  │   │   │   │
  │   │   │   └── target-assignment/ # Subfitur: Target Assignment 
  │   │   │       └── [struktur serupa]
  │   │   │
  │   │   ├── adapters/             # Role-specific adapters
  │   │   │   ├── admin/            # Admin UI implementation
  │   │   │   ├── organizer/        # Organizer UI implementation
  │   │   │   └── customer/         # Customer UI implementation
  │   │   │
  │   │   └── index.ts              # Public API fitur
  │   │
  │   └── scoring/                  # Fitur domain lainnya
  │       └── [struktur serupa]
  │
  └── modules/                      # Cross-domain reusable modules
      ├── file-upload/              # Module: File Upload
      │   ├── components/           # UI components module
      │   ├── services/             # Services module
      │   ├── hooks/                # Custom hooks
      │   └── index.ts              # Public API module
      │
      ├── notifications/            # Module: Notifications
      │   └── [struktur serupa]
      │
      └── pdf-generator/            # Module: PDF Generator
          └── [struktur serupa]
```

### Penting untuk Diperhatikan:

1. **Subfitur berada dalam fitur induk** - Mengikuti struktur namespace fitur
2. **Module berada di root level** - Terpisah dari context domain-specific
3. **Konsistensi Internal** - Baik subfitur maupun module harus mengikuti struktur internal yang konsisten
4. **Public API** - Keduanya mengekspos hanya apa yang diperlukan melalui index.ts
5. **Namespacing yang Jelas** - Import path merefleksikan hubungan hierarkis

## 4. Subfitur vs Module: Panduan Keputusan

Gunakan decision framework berikut untuk menentukan implementasi yang tepat:

### Decision Tree

```
Apakah fungsionalitas spesifik untuk domain bisnis tertentu?
├─ Ya → Apakah akan digunakan oleh fitur lain?
│      ├─ Ya → Apakah perlu konteks domain spesifik?
│      │      ├─ Ya → Subfitur (dengan shared API jika perlu)
│      │      └─ Tidak → Pertimbangkan Module
│      └─ Tidak → Subfitur
│
└─ Tidak → Apakah menyediakan technical capability umum?
        ├─ Ya → Module
        └─ Tidak → Evaluasi kembali domain boundary
```

### Empat Pertanyaan Kunci

1. **Pertanyaan Domain**: Apakah fungsionalitas ini spesifik untuk domain bisnis tertentu?
   - **Ya** → Subfitur
   - **Tidak** → Module

2. **Pertanyaan Reusability**: Apakah akan digunakan oleh banyak fitur berbeda?
   - **Ya** → Module
   - **Tidak** → Subfitur

3. **Pertanyaan Context**: Apakah perlu mengakses state/model dari fitur induk?
   - **Ya** → Subfitur
   - **Tidak** → Module

4. **Pertanyaan Evolution**: Bisakah ini berkembang menjadi kapabilitas mandiri?
   - **Ya, tapi tetap domain-specific** → Subfitur (yang mungkin jadi fitur)
   - **Ya, dan benar-benar generik** → Module

### Situasi "Grey Area" dan Rekomendasi

| Situasi | Rekomendasi | Pertimbangan |
|---------|-------------|--------------|
| Domain-specific tapi reusable | Mulai sebagai Subfitur dengan clean API | Rancang untuk evolusi ke Module jika dibutuhkan |
| Technical utility dengan domain logic | Extract domain logic ke service terpisah | Module menggunakan service dari feature |
| Shared UI dengan business rules | Pisahkan UI (Module) dari rules (Domain) | Module UI menggunakan domain services |
| State management kompleks | Evaluasi scope data dan penggunaan | Global state → Context, Feature state → Internal |

## 5. Implementasi Subfitur

### Struktur Subfitur yang Direkomendasikan

```
/features/[feature-name]/subfeatures/[subfeature-name]/
  ├── core/                      # Subfeature core
  │   ├── models/                # Domain models spesifik subfitur
  │   └── services/              # Business logic subfitur
  │
  ├── components/                # UI Components shared 
  │   ├── [Component1].tsx
  │   └── [Component2].tsx
  │
  └── index.ts                   # Public API subfitur
```

### Implementasi Public API Subfitur

```typescript
// features/event-management/subfeatures/categories/index.ts
// Export only what should be accessible to parent feature or adapters

// Core exports
export { CategoryService } from './core/services/category-service';
export type { Category, CategoryFormData } from './core/models/category';

// Component exports 
export { CategoryList } from './components/CategoryList';
export { CategoryForm } from './components/CategoryForm';
```

### Akses ke Fitur Induk

Subfitur dapat mengakses core services dan models dari fitur induknya.

```typescript
// features/event-management/subfeatures/categories/core/services/category-service.ts
import { supabase } from '@/lib/supabase/client';
import type { Event } from '../../../core/models/event'; // Mengakses model dari parent
import { EventService } from '../../../core/services/event-service'; // Mengakses service dari parent
import type { Category } from '../models/category';

export const CategoryService = {
  async getCategoriesByEventId(eventId: string): Promise<Category[]> {
    // Implementasi
  },
  
  async validateCategoryForEvent(category: Category, eventId: string): Promise<boolean> {
    // Menggunakan EventService dari parent feature
    const event = await EventService.getEventById(eventId);
    // Validasi category berdasarkan aturan event
    return /* validasi logic */;
  }
};
```

### Penggunaan Subfitur dalam Adapters

```tsx
// features/event-management/adapters/organizer/EventDetailsOrganizerAdapter.tsx
import { useEvent } from '../../core/hooks/useEvent';
import { CategoryList } from '../../subfeatures/categories'; // Import dari subfeature

export function EventDetailsOrganizerAdapter({ eventId }: { eventId: string }) {
  const { event, isLoading } = useEvent(eventId);
  
  if (isLoading) return <Spinner />;
  
  return (
    <div>
      <h1>{event.name}</h1>
      <section>
        <h2>Categories</h2>
        <CategoryList eventId={eventId} /> {/* Menggunakan komponen dari subfeature */}
      </section>
    </div>
  );
}
```

## 6. Implementasi Module

### Struktur Module yang Direkomendasikan

```
/modules/[module-name]/
  ├── components/              # UI Components 
  │   ├── [Component1].tsx
  │   └── [Component2].tsx
  │
  ├── services/                # Services module
  │   └── [service-name].ts
  │
  ├── hooks/                   # Custom hooks
  │   └── use[HookName].ts
  │
  ├── types.ts                 # Type definitions
  └── index.ts                 # Public API module
```

### Implementasi Public API Module

```typescript
// modules/file-upload/index.ts
// Expose clean public API

// Main components
export { FileUploader } from './components/FileUploader';
export { FilePreview } from './components/FilePreview';

// Hooks
export { useFileUpload } from './hooks/useFileUpload';

// Services (biasanya tidak langsung diekspos, tapi melalui hooks)
// export { FileUploadService } from './services/file-upload-service';

// Types
export type { 
  FileUploadConfig, 
  FileUploadResult, 
  SupportedFileTypes 
} from './types';
```

### Implementasi Module yang Independent

Module harus independen dan tidak memiliki ketergantungan pada fitur spesifik.

```typescript
// modules/file-upload/services/file-upload-service.ts
import { supabase } from '@/lib/supabase/client';
import type { FileUploadConfig, FileUploadResult } from '../types';

export const FileUploadService = {
  async uploadFile(
    file: File, 
    config: FileUploadConfig
  ): Promise<FileUploadResult> {
    const { bucket = 'default', path = '' } = config;
    
    // Upload file to Supabase Storage
    const filePath = `${path}/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);
      
    if (error) throw new Error(`Upload failed: ${error.message}`);
    
    // Generate public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
      
    return {
      path: filePath,
      url: publicUrl,
      filename: file.name,
      size: file.size,
      type: file.type
    };
  }
  
  // Metode lain seperti getFiles, deleteFile, dll
};
```

### Contoh Custom Hook dalam Module

```typescript
// modules/file-upload/hooks/useFileUpload.ts
import { useState } from 'react';
import { FileUploadService } from '../services/file-upload-service';
import type { FileUploadConfig, FileUploadResult } from '../types';

export function useFileUpload(defaultConfig?: Partial<FileUploadConfig>) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  
  async function uploadFile(
    file: File, 
    config?: Partial<FileUploadConfig>
  ): Promise<FileUploadResult> {
    try {
      setIsUploading(true);
      setProgress(0);
      setError(null);
      
      // Combine default config with provided config
      const fullConfig = { ...defaultConfig, ...config } as FileUploadConfig;
      
      // Simulate progress (in a real implementation, use upload progress events)
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);
      
      const result = await FileUploadService.uploadFile(file, fullConfig);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown upload error'));
      throw err;
    } finally {
      setIsUploading(false);
    }
  }
  
  return {
    uploadFile,
    isUploading,
    progress,
    error
  };
}
```

### Penggunaan Module dalam Fitur

```tsx
// features/event-management/adapters/organizer/components/EventMediaUploader.tsx
import { useFileUpload } from '@/modules/file-upload'; // Import dari module

export function EventMediaUploader({ eventId }: { eventId: string }) {
  const { uploadFile, isUploading, progress } = useFileUpload({
    bucket: 'event-media',
    path: `events/${eventId}`
  });
  
  const handleFileSelect = async (file: File) => {
    try {
      const result = await uploadFile(file);
      // Update event dengan URL media baru
    } catch (error) {
      // Handle error
    }
  };
  
  return (
    <div>
      <h3>Upload Event Media</h3>
      <FileUploader 
        onFileSelect={handleFileSelect}
        isUploading={isUploading}
        progress={progress}
        accept="image/*"
      />
    </div>
  );
}
```

## 7. Integrasi Subfitur dan Module

Hybrid Feature Composition memungkinkan penggunaan subfitur dan module secara bersamaan. Berikut adalah pola untuk mengintegrasikannya.

### Subfitur Menggunakan Module

Subfitur dapat menggunakan module untuk fungsionalitas teknis umum.

```tsx
// features/event-management/subfeatures/categories/components/CategoryForm.tsx
import { useForm } from 'react-hook-form';
import { useFileUpload } from '@/modules/file-upload'; // Menggunakan module
import { RichTextEditor } from '@/modules/rich-text-editor'; // Menggunakan module lain
import { CategoryService } from '../core/services/category-service';

export function CategoryForm({ eventId }: { eventId: string }) {
  const { register, handleSubmit, setValue } = useForm();
  const { uploadFile, isUploading } = useFileUpload({
    bucket: 'categories',
    path: `events/${eventId}/categories`
  });
  
  const onSubmit = async (data) => {
    // Handle form submit
    if (data.iconFile) {
      const uploadResult = await uploadFile(data.iconFile[0]);
      data.iconUrl = uploadResult.url;
    }
    
    await CategoryService.createCategory(eventId, data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
      <div>
        <label>Category Name</label>
        <input {...register('name')} />
      </div>
      
      <div>
        <label>Description</label>
        <RichTextEditor 
          onChange={(content) => setValue('description', content)} 
        />
      </div>
      
      <div>
        <label>Category Icon</label>
        <input type="file" {...register('iconFile')} />
        {isUploading && <ProgressBar />}
      </div>
      
      <button type="submit">Save Category</button>
    </form>
  );
}
```

### Module Mendukung Domain-Specific Use Cases

Module dapat menyediakan konfigurasi untuk use case domain-specific tanpa coupling langsung.

```typescript
// modules/notifications/components/NotificationProvider.tsx
import { ReactNode, createContext, useContext } from 'react';
import { NotificationService } from '../services/notification-service';
import type { NotificationTemplate, NotificationType } from '../types';

// Context untuk konfigurasi domain-specific
interface NotificationContextValue {
  notify: (type: NotificationType, message: string, meta?: any) => void;
  notifyWithTemplate: (template: NotificationTemplate, data: any) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

// Provider dapat menerima konfigurasi domain-specific
export function NotificationProvider({ 
  children,
  templates = {}, // Domain-specific templates
  channels = ['ui'], // Notification channels (ui, email, push)
}: { 
  children: ReactNode;
  templates?: Record<string, NotificationTemplate>;
  channels?: string[];
}) {
  const notify = (type: NotificationType, message: string, meta?: any) => {
    NotificationService.sendNotification({ type, message, meta, channels });
  };
  
  const notifyWithTemplate = (template: NotificationTemplate, data: any) => {
    const templateConfig = templates[template] || {};
    const message = generateMessageFromTemplate(templateConfig, data);
    notify(templateConfig.type || 'info', message, data);
  };
  
  return (
    <NotificationContext.Provider value={{ notify, notifyWithTemplate }}>
      {children}
    </NotificationContext.Provider>
  );
}

// Hook untuk mengakses fungsi notifikasi
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

// Helper privat
function generateMessageFromTemplate(template: any, data: any): string {
  // Generate message from template and data
  return template.messageTemplate.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key] || '');
}
```

### Penggunaan di Level Aplikasi

```tsx
// app/layout.tsx atau app/(roles)/organizer/layout.tsx
import { NotificationProvider } from '@/modules/notifications';
import { eventNotificationTemplates } from '@/features/event-management/core/utils/notification-templates';
import { scoringNotificationTemplates } from '@/features/scoring/core/utils/notification-templates';

export default function AppLayout({ children }: { children: ReactNode }) {
  // Combine domain-specific templates
  const templates = {
    ...eventNotificationTemplates,
    ...scoringNotificationTemplates
  };
  
  return (
    <html lang="en">
      <body>
        <NotificationProvider templates={templates} channels={['ui', 'email']}>
          {children}
        </NotificationProvider>
      </body>
    </html>
  );
}
```

## 8. Komunikasi Antar Komponen

Dalam Hybrid Feature Composition, pola komunikasi berbeda berdasarkan lingkup dan hubungan antar komponen.

### Komunikasi Subfitur dengan Parent Feature

1. **Direct Import** - Parent feature dapat langsung mengimpor dari subfitur
   ```typescript
   // features/event-management/adapters/admin/EventAdminAdapter.tsx
   import { CategoryService } from '../../subfeatures/categories';
   ```

2. **Service Injection** - Subfitur dapat menerima services dari parent
   ```typescript
   // features/event-management/subfeatures/categories/components/CategoryList.tsx
   interface Props {
     eventId: string;
     eventService?: typeof EventService; // Optional injection
   }
   
   export function CategoryList({ 
     eventId, 
     eventService = defaultEventService 
   }: Props) {
     // Gunakan eventService yang diinjeksi atau default
   }
   ```

3. **Context API** - Shared state melalui React Context
   ```typescript
   // features/event-management/core/context/event-context.tsx
   export const EventContext = createContext(null);
   
   // Dalam subfitur
   function CategoryComponent() {
     const eventContext = useContext(EventContext);
     // Akses state event parent
   }
   ```

### Komunikasi Antar Subfitur

Subfitur seharusnya **tidak berkomunikasi langsung**. Gunakan pola berikut:

1. **Parent Feature sebagai Mediator**
   ```typescript
   // features/event-management/adapters/organizer/EventDetailPage.tsx
   import { CategoryList } from '../../subfeatures/categories';
   import { ScheduleTimeline } from '../../subfeatures/scheduling';
   
   export function EventDetailPage({ eventId }: { eventId: string }) {
     // Parent feature bertindak sebagai mediator
     const [selectedCategoryId, setSelectedCategoryId] = useState(null);
     
     return (
       <div>
         <CategoryList 
           eventId={eventId} 
           onCategorySelect={setSelectedCategoryId} 
         />
         
         <ScheduleTimeline 
           eventId={eventId}
           categoryId={selectedCategoryId} // Pass data from one subfeature to another
         />
       </div>
     );
   }
   ```

2. **Event Bus Pattern** (untuk use case lebih kompleks)
   ```typescript
   // lib/utils/event-bus.ts
   type EventHandler = (data: any) => void;
   
   const eventBus = {
     events: {} as Record<string, EventHandler[]>,
     
     subscribe(event: string, callback: EventHandler) {
       if (!this.events[event]) this.events[event] = [];
       this.events[event].push(callback);
       
       return () => {
         this.events[event] = this.events[event].filter(cb => cb !== callback);
       };
     },
     
     publish(event: string, data: any) {
       if (this.events[event]) {
         this.events[event].forEach(callback => callback(data));
       }
     }
   };
   
   export default eventBus;
   ```

### Komunikasi dengan Module

Module berkomunikasi melalui interfaces publik yang jelas:

1. **Component Props** - Passing data/callbacks melalui props
   ```tsx
   // Menggunakan module di subfeature
   import { FileUploader } from '@/modules/file-upload';
   
   function CategoryIconUploader() {
     return (
       <FileUploader 
         accept="image/*"
         maxSize={2 * 1024 * 1024} // 2MB
         onUpload={handleUpload}
       />
     );
   }
   ```

2. **Custom Hooks** - Module menyediakan hooks untuk state & logic
   ```tsx
   // Menggunakan hook dari module
   import { useNotification } from '@/modules/notifications';
   
   function SuccessHandler() {
     const { notify } = useNotification();
     
     const handleSuccess = () => {
       notify('success', 'Category created successfully!');
     };
     
     return <button onClick={handleSuccess}>Create</button>;
   }
   ```

3. **Service API** - Module menyediakan service APIs
   ```typescript
   import { PDFGeneratorService } from '@/modules/pdf-generator';
   
   async function generateCategoryReport(eventId: string) {
     const categories = await CategoryService.getCategoriesByEventId(eventId);
     
     await PDFGeneratorService.generatePDF({
       template: 'category-report',
       data: { categories, eventId },
       filename: `categories-${eventId}.pdf`
     });
   }
   ```

## 9. Evolution Pattern: Dari Subfitur ke Module

Arsitektur ini memungkinkan evolusi komponen dari subfitur ke module saat kebutuhan berkembang.

### Indikator untuk Evolusi

Pertimbangkan evolusi subfitur menjadi module ketika:
1. Subfitur mulai digunakan oleh lebih dari satu fitur utama
2. Logika business domain bisa dipisahkan dari logika teknis reusable
3. Implementasi UI bisa diabstraksikan dari model domain spesifik
4. Ada kebutuhan untuk reuse di berbagai context domain

### Proses Evolusi

#### 1. Persiapan dan Analisis

- Identifikasi bagian yang domain-specific vs reusable technical capabilities
- Pisahkan interface dari implementasi
- Buat abstraksi domain-agnostic untuk bagian reusable

#### 2. Refactoring Step-by-Step

```
1. Extract interfaces dan contracts
2. Buat module stub di /modules/
3. Pindahkan technical capabilities ke module baru
4. Buat adapter layer di subfitur yang menggunakan module
5. Update import paths di semua file yang terpengaruh
6. Deploy secara incremental dan test
```

#### 3. Contoh: Evolusi Target Assignment

**Awalnya sebagai Subfitur**:
```typescript
// features/event-management/subfeatures/target-assignment/core/services/target-service.ts
export const TargetService = {
  assignParticipantToTarget(eventId: string, participantId: string, targetId: string) {
    // Implementation dengan logika spesifik event
  },
  // Other event-specific methods
};
```

**Identifikasi Reusable Patterns**:
- Core assignment logic reusable untuk berbagai skenario (bukan hanya event)
- UI drag & drop reusable
- Storage patterns reusable

**Extract Module**:
```typescript
// modules/assignment-manager/services/assignment-service.ts
export const AssignmentService = {
  // Generic assignment function
  createAssignment(
    contextType: string, // 'event', 'class', 'tournament', etc.
    contextId: string,   // The specific instance ID
    subjectId: string,   // What's being assigned (participant, student, etc)
    targetId: string,    // Where it's assigned to
    config?: AssignmentConfig
  ) {
    // Generic implementation
  },
  // Other generic methods
};
```

**Adapter Layer di Subfitur Asli**:
```typescript
// features/event-management/subfeatures/target-assignment/core/services/target-service.ts
import { AssignmentService } from '@/modules/assignment-manager';

export const TargetService = {
  // Domain-specific wrapper using generic module
  assignParticipantToTarget(eventId: string, participantId: string, targetId: string) {
    return AssignmentService.createAssignment(
      'event',
      eventId,
      participantId,
      targetId,
      { 
        validateUnique: true,
        // Event-specific config
        eventRules: { /* event specific rules */ }
      }
    );
  },
  // Other domain-specific methods
};
```

#### 4. Deprecation Strategy

Setelah modul stabil, pertimbangkan untuk deprecated subfitur asli:

```typescript
// features/event-management/subfeatures/target-assignment/index.ts
import * as AssignmentModule from '@/modules/assignment-manager';

/**
 * @deprecated Use @/modules/assignment-manager directly instead.
 * This subfeature will be removed in future versions.
 */
export const TargetAssignmentService = {
  ...AssignmentModule.AssignmentService, 
  // Event-specific methods not in the module
  getEventSpecificAssignments: (eventId: string) => {
    // Implementation
  }
};
```

## 10. Testing dan Quality Assurance

### Strategi Testing untuk Hybrid Composition

#### Testing Subfitur

1. **Unit Tests**
   - Test subfitur core service isolation
   - Mock dependencies dari parent feature
   - Verifikasi business logic spesifik domain

2. **Integration Tests**
   - Test interaksi subfitur dengan parent feature
   - Verifikasi contract antara subfitur dan parent

3. **Component Tests**
   - Test UI components subfitur
   - Gunakan mock services untuk data

#### Testing Module

1. **Unit Tests**
   - Test module services isolation
   - Fokus pada technical capabilities
   - Test berbagai konfigurasi

2. **Integration Tests**
   - Test module dengan berbagai consumers
   - Verifikasi bahwa module bekerja di berbagai konteks

3. **Component Tests**
   - Test module UI components
   - Pastikan reusable di berbagai konteks

#### Testing Integrasi Keduanya

1. **Feature-Level Tests**
   - Test feature lengkap termasuk subfitur dan module
   - Verifikasi alur end-to-end

2. **Mocking Strategy**
   - Mock modules saat testing subfitur
   - Mock domain services saat testing modules

### Contoh Unit Test untuk Subfitur

```typescript
// features/event-management/subfeatures/categories/__tests__/category-service.test.ts
import { CategoryService } from '../core/services/category-service';
import { EventService } from '../../../core/services/event-service'; 

// Mock parent feature service
jest.mock('../../../core/services/event-service');

describe('CategoryService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('validateCategoryForEvent checks event rules', async () => {
    // Arrange
    const mockEvent = { id: 'event-1', maxCategoriesAllowed: 5 };
    (EventService.getEventById as jest.Mock).mockResolvedValue(mockEvent);
    
    const category = { id: 'cat-1', name: 'Test Category' };
    
    // Act
    const result = await CategoryService.validateCategoryForEvent(category, 'event-1');
    
    // Assert
    expect(EventService.getEventById).toHaveBeenCalledWith('event-1');
    expect(result).toBe(true);
  });
});
```

### Contoh Unit Test untuk Module

```typescript
// modules/file-upload/__tests__/file-upload-service.test.ts
import { FileUploadService } from '../services/file-upload-service';
import { supabase } from '@/lib/supabase/client';

jest.mock('@/lib/supabase/client');

describe('FileUploadService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('uploadFile successfully uploads file to specified bucket and path', async () => {
    // Arrange
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const mockUploadResponse = { data: { path: 'some/path' }, error: null };
    const mockPublicUrlResponse = { data: { publicUrl: 'https://example.com/test.jpg' } };
    
    (supabase.storage.from as jest.Mock).mockReturnValue({
      upload: jest.fn().mockResolvedValue(mockUploadResponse),
      getPublicUrl: jest.fn().mockReturnValue(mockPublicUrlResponse)
    });
    
    // Act
    const result = await FileUploadService.uploadFile(mockFile, {
      bucket: 'test-bucket',
      path: 'test-path'
    });
    
    // Assert
    expect(supabase.storage.from).toHaveBeenCalledWith('test-bucket');
    expect(result.url).toBe('https://example.com/test.jpg');
  });
});
```

## 11. Best Practices dan Checklist

### Namespacing dan Import Conventions

- **Subfitur**: Impor relatif dari parent feature
  ```typescript
  // BENAR
  import { EventModel } from '../../../core/models/event';
  
  // SALAH - Terlalu verbose dan tidak menunjukkan hubungan hirarki
  import { EventModel } from '@/features/event-management/core/models/event';
  ```

- **Module**: Impor absolut dari root module
  ```typescript
  // BENAR
  import { FileUploader } from '@/modules/file-upload';
  
  // SALAH - Terlalu spesifik implementasi internal
  import { FileUploader } from '@/modules/file-upload/components/FileUploader';
  ```

### Public API Best Practices

- Export hanya yang benar-benar perlu diakses dari luar
- Gunakan barrel exports (index.ts) untuk API yang bersih
- Pertahankan semantic versioning contract (tidak mengubah interface publik tanpa versi baru)

### Dependency Management

- Subfitur boleh bergantung pada parent feature
- Subfitur boleh menggunakan modules
- Module **tidak boleh** bergantung pada specific features
- Parent feature tidak boleh bergantung pada subfitur secara tight-coupling

### State Management Recommendations

- **Module**: Gunakan internal state dan expose melalui hooks
- **Subfitur**: Gunakan kombinasi internal state dan context dari parent feature
- **Shared State**: Jika perlu state sharing antar fitur, gunakan module pattern

### Checklist untuk Review Code

#### Subfitur Checklist

- [ ] Subfitur berada di dalam folder fitur induk yang tepat
- [ ] Strukturnya mengikuti pattern standard (core, components, etc)
- [ ] Hanya mengekspor yang diperlukan melalui index.ts
- [ ] Tidak mengakses subfitur lain secara langsung
- [ ] Penggunaan module didokumentasikan jika relevan
- [ ] Terdapat unit test untuk service dan business logic

#### Module Checklist

- [ ] Module memiliki fokus fungsional yang jelas
- [ ] Tidak memiliki ketergantungan pada fitur domain spesifik
- [ ] Menyediakan public API yang bersih melalui index.ts
- [ ] Memiliki dokumentasi penggunaan dengan contoh
- [ ] Menggunakan parameter konfigurasi untuk fleksibilitas
- [ ] Terdapat unit test untuk service dan components

## 12. Contoh Implementasi

### Contoh Subfitur: Event Categories

```typescript
// features/event-management/subfeatures/categories/core/models/category.ts
export interface Category {
  id: string;
  eventId: string;
  name: string;
  description?: string;
  maxParticipants: number;
  ageRange?: {
    min: number;
    max: number;
  };
  iconUrl?: string;
}

// features/event-management/subfeatures/categories/core/services/category-service.ts
import { supabase } from '@/lib/supabase/client';
import { Category } from '../models/category';
import { EventService } from '../../../core/services/event-service';

export const CategoryService = {
  async getCategoriesByEventId(eventId: string): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('event_id', eventId)
      .order('name');
      
    if (error) throw new Error(`Failed to fetch categories: ${error.message}`);
    return data || [];
  },
  
  async createCategory(eventId: string, categoryData: Omit<Category, 'id'>): Promise<Category> {
    // Validate against event rules
    const event = await EventService.getEventById(eventId);
    
    if (!event) {
      throw new Error('Event not found');
    }
    
    // Check if max categories reached
    const existingCategories = await this.getCategoriesByEventId(eventId);
    if (event.maxCategories && existingCategories.length >= event.maxCategories) {
      throw new Error(`Maximum categories (${event.maxCategories}) reached for this event`);
    }
    
    // Insert category
    const { data, error } = await supabase
      .from('categories')
      .insert({
        event_id: eventId,
        name: categoryData.name,
        description: categoryData.description || '',
        max_participants: categoryData.maxParticipants,
        age_range: categoryData.ageRange,
        icon_url: categoryData.iconUrl
      })
      .select()
      .single();
      
    if (error) throw new Error(`Failed to create category: ${error.message}`);
    return data;
  },
  
  // Other methods...
};

// features/event-management/subfeatures/categories/components/CategoryList.tsx
import { useEffect, useState } from 'react';
import { CategoryService } from '../core/services/category-service';
import { Category } from '../core/models/category';

interface CategoryListProps {
  eventId: string;
  onCategorySelect?: (categoryId: string) => void;
}

export function CategoryList({ eventId, onCategorySelect }: CategoryListProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true);
        const data = await CategoryService.getCategoriesByEventId(eventId);
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories');
      } finally {
        setLoading(false);
      }
    }
    
    loadCategories();
  }, [eventId]);
  
  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="category-list">
      <h3>Event Categories</h3>
      {categories.length === 0 ? (
        <p>No categories defined for this event yet.</p>
      ) : (
        <ul>
          {categories.map(category => (
            <li 
              key={category.id}
              onClick={() => onCategorySelect?.(category.id)}
              className="category-item"
            >
              {category.iconUrl && (
                <img src={category.iconUrl} alt="" className="category-icon" />
              )}
              <div>
                <h4>{category.name}</h4>
                <p>Max participants: {category.maxParticipants}</p>
                {category.ageRange && (
                  <p>Age: {category.ageRange.min} - {category.ageRange.max}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// features/event-management/subfeatures/categories/index.ts
export { CategoryService } from './core/services/category-service';
export type { Category } from './core/models/category';
export { CategoryList } from './components/CategoryList';
export { CategoryForm } from './components/CategoryForm'; // Not shown in example
```

### Contoh Module: PDF Generator

```typescript
// modules/pdf-generator/types.ts
export interface PDFGenerationOptions {
  template: string;
  data: Record<string, any>;
  filename?: string;
  orientation?: 'portrait' | 'landscape';
  pageSize?: 'A4' | 'Letter' | 'Legal';
}

export interface PDFTemplate {
  name: string;
  layout: any; // Template layout structure
  defaultData?: Record<string, any>;
}

// modules/pdf-generator/services/pdf-service.ts
import { jsPDF } from 'jspdf';
import type { PDFGenerationOptions, PDFTemplate } from '../types';

// Register available templates
const templates: Record<string, PDFTemplate> = {
  'basic': {
    name: 'Basic Template',
    layout: { /* template definition */ }
  },
  'certificate': {
    name: 'Certificate Template',
    layout: { /* template definition */ }
  },
  'report': {
    name: 'Report Template',
    layout: { /* template definition */ }
  }
};

export const PDFService = {
  async generatePDF(options: PDFGenerationOptions): Promise<Blob> {
    const { 
      template,
      data,
      filename = 'document.pdf',
      orientation = 'portrait',
      pageSize = 'A4'
    } = options;
    
    // Get template or use basic
    const templateConfig = templates[template] || templates.basic;
    
    // Create PDF document
    const doc = new jsPDF({
      orientation,
      unit: 'mm',
      format: pageSize
    });
    
    // Apply template layout with data
    this.applyTemplate(doc, templateConfig, data);
    
    // Return as blob
    return doc.output('blob');
  },
  
  async generateAndDownload(options: PDFGenerationOptions): Promise<void> {
    const blob = await this.generatePDF(options);
    const url = URL.createObjectURL(blob);
    
    // Create link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = options.filename || 'document.pdf';
    link.click();
    
    // Cleanup
    URL.revokeObjectURL(url);
  },
  
  getAvailableTemplates(): string[] {
    return Object.keys(templates);
  },
  
  // Private methods
  private applyTemplate(doc: any, template: PDFTemplate, data: Record<string, any>): void {
    // Combine default data with provided data
    const mergedData = { ...template.defaultData, ...data };
    
    // Apply template layout using the merged data
    // This would use the template's layout configuration
    // to position elements on the PDF
    
    // Example implementation
    if (mergedData.title) {
      doc.setFontSize(20);
      doc.text(mergedData.title, 20, 20);
    }
    
    if (mergedData.subtitle) {
      doc.setFontSize(16);
      doc.text(mergedData.subtitle, 20, 30);
    }
    
    // And so on for other template elements
  }
};

// modules/pdf-generator/components/PDFGenerator.tsx
import { useState } from 'react';
import { PDFService } from '../services/pdf-service';
import type { PDFGenerationOptions } from '../types';

interface PDFGeneratorProps {
  template: string;
  data: Record<string, any>;
  filename?: string;
  onGenerated?: (blob: Blob) => void;
  showDownloadButton?: boolean;
  orientation?: 'portrait' | 'landscape';
  pageSize?: 'A4' | 'Letter' | 'Legal';
}

export function PDFGenerator({
  template,
  data,
  filename,
  onGenerated,
  showDownloadButton = true,
  orientation = 'portrait',
  pageSize = 'A4'
}: PDFGeneratorProps) {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleGenerate = async () => {
    try {
      setGenerating(true);
      setError(null);
      
      const options: PDFGenerationOptions = {
        template,
        data,
        filename,
        orientation,
        pageSize
      };
      
      if (showDownloadButton) {
        await PDFService.generateAndDownload(options);
      } else {
        const blob = await PDFService.generatePDF(options);
        onGenerated?.(blob);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate PDF');
    } finally {
      setGenerating(false);
    }
  };
  
  return (
    <div className="pdf-generator">
      {error && <div className="error-message">{error}</div>}
      
      <button 
        onClick={handleGenerate}
        disabled={generating}
        className="generate-button"
      >
        {generating ? 'Generating...' : 'Generate PDF'}
      </button>
    </div>
  );
}

// modules/pdf-generator/hooks/usePDFGenerator.ts
import { useState } from 'react';
import { PDFService } from '../services/pdf-service';
import type { PDFGenerationOptions } from '../types';

export function usePDFGenerator() {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const generatePDF = async (options: PDFGenerationOptions): Promise<Blob | null> => {
    try {
      setGenerating(true);
      setError(null);
      
      const blob = await PDFService.generatePDF(options);
      return blob;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to generate PDF');
      setError(error);
      return null;
    } finally {
      setGenerating(false);
    }
  };
  
  const downloadPDF = async (options: PDFGenerationOptions): Promise<void> => {
    try {
      setGenerating(true);
      setError(null);
      
      await PDFService.generateAndDownload(options);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to download PDF');
      setError(error);
    } finally {
      setGenerating(false);
    }
  };
  
  const availableTemplates = PDFService.getAvailableTemplates();
  
  return {
    generatePDF,
    downloadPDF,
    generating,
    error,
    availableTemplates
  };
}

// modules/pdf-generator/index.ts
export { PDFService } from './services/pdf-service';
export { PDFGenerator } from './components/PDFGenerator';
export { usePDFGenerator } from './hooks/usePDFGenerator';
export type { PDFGenerationOptions, PDFTemplate } from './types';
```

### Penggunaan dalam Fitur

```tsx
// features/event-management/adapters/organizer/components/EventReportGenerator.tsx
import { useEvent } from '../../../core/hooks/useEvent';
import { CategoryService } from '../../../subfeatures/categories';
import { usePDFGenerator } from '@/modules/pdf-generator';

export function EventReportGenerator({ eventId }: { eventId: string }) {
  const { event, isLoading: loadingEvent } = useEvent(eventId);
  const { 
    downloadPDF, 
    generating, 
    error 
  } = usePDFGenerator();
  
  const handleGenerateReport = async () => {
    if (!event) return;
    
    try {
      // Get categories from subfeature
      const categories = await CategoryService.getCategoriesByEventId(eventId);
      
      // Create report data combining event and categories
      const reportData = {
        title: `Event Report: ${event.name}`,
        eventDate: event.startDate,
        location: event.location,
        organizer: event.organizer,
        categories: categories.map(cat => ({
          name: cat.name,
          maxParticipants: cat.maxParticipants,
          // Other category data
        }))
      };
      
      // Use PDF Generator module
      await downloadPDF({
        template: 'report',
        data: reportData,
        filename: `event-report-${eventId}.pdf`,
        orientation: 'landscape'
      });
    } catch (err) {
      console.error('Failed to generate report:', err);
    }
  };
  
  if (loadingEvent) return <div>Loading event...</div>;
  if (!event) return <div>Event not found</div>;
  
  return (
    <div className="report-generator">
      <h3>Event Report Generator</h3>
      {error && <div className="error">{error.message}</div>}
      <button 
        onClick={handleGenerateReport}
        disabled={generating}
      >
        {generating ? 'Generating Report...' : 'Generate Event Report'}
      </button>
    </div>
  );
}
```

Dokumen ini memberikan panduan lengkap untuk mengimplementasikan Domain-Driven Modular Architecture dengan Hybrid Feature Composition. Pendekatan ini memungkinkan fleksibilitas maksimal dalam pengembangan sambil tetap mempertahankan batasan domain yang jelas dan reusability kode. Dengan mengikuti panduan ini, tim dapat mengembangkan aplikasi secara efisien dengan memilih pendekatan yang tepat (subfitur atau module) untuk setiap fungsionalitas baru.