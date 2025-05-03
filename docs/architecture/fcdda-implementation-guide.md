# Feature-Clustered Domain-Driven Architecture (FCDDA) Guide

Dokumen ini menjelaskan konsep, prinsip, dan langkah implementasi rinci arsitektur Feature-Clustered Domain-Driven (FCDDA) pada MyArchery Platform.

## 1. Ringkasan FCDDA

- **Feature-Clustered**: Semua kode (models, services, hooks, UI) terkait satu fitur dikumpulkan dalam folder yang sama.
- **Domain-Driven**: Model dan service mencerminkan istilah dan aturan bisnis (ubiquitous language, bounded context).
- **Role Adaptation Layer**: UI adapters memetakan domain ke tampilan spesifik per role (admin, organizer, customer).
- **Supabase Integration**: Data access melalui repository dengan RLS, edge functions, policy-driven security.

## 2. Struktur Utama

```
/features/<domain-feature>/
  ├── models/            # Domain models & validation
  ├── services/          # Business logic
  ├── repository.ts      # Data access (Supabase client)
  ├── hooks/             # React hooks untuk feature
  ├── utils/             # Utility functions khusus fitur
  └── ui/                # UI adapters per varian & role
      ├── shared/        # Komponen UI reuse dalam feature
      ├── <variant>/     # Varian domain (tournament, league, ...)
      │   ├── admin/     # UI untuk admin
      │   ├── organizer/ # UI untuk organizer
      │   └── customer/  # UI untuk customer
      └── index.ts       # Ekspor UI facade (optional)
```

## 3. Prinsip Implementasi

1. **Co-location**: Modul yang sering berubah bersama ditempatkan bersama.
2. **Isolation**: Fitur tidak bergantung langsung pada fitur lain.
3. **Single Responsibility**: Models, services, dan UI masing-masing punya tanggung jawab tunggal.
4. **Type Safety**: Gunakan TypeScript interface/generics untuk kontrak antar lapisan.
5. **Minimal Shared**: Shared folder hanya untuk komponen, hooks, utiliti yang benar-benar dipakai di >1 fitur.

## 3.1 Simplified Variant Clustering

Alih-alih membuat banyak subfolder di dalam `ui/`, kita konsolidasikan semua varian ke satu folder `variants/` di root feature:

```text
features/<feature-name>/
├── models/               # common models
├── services/             # common services
├── repository.ts         # data access
├── hooks/                # common hooks
├── utils/                # common utils
└── variants/             # semua varian dalam satu tempat
    ├── tournament/       # varian tournament
    │   ├── model.ts
    │   ├── service.ts
    │   ├── hook.ts
    │   └── ui.tsx        # UI adapter, bisa switch per role di dalam
    ├── league/          # varian league
    │   ├── model.ts
    │   ├── service.ts
    │   ├── hook.ts
    │   └── ui.tsx
    └── series/          # varian series
        ├── model.ts
        ├── service.ts
        ├── hook.ts
        └── ui.tsx
```

**Langkah implementasi:**
1. Ekstrak model, service, hook, util yang shared ke folder utama feature.
2. Buat folder `variants/` di root feature.
3. Buat subfolder per varian di dalam `variants/`.
4. Tulis code varian (model, service, hook, UI) di folder varian.
5. Tambahkan barrel export di `variants/index.ts` untuk kemudahan import.

Dengan pola ini, semua varian mudah ditemukan dan dikelola di satu lokasi tanpa mengorbankan isolasi per varian.

## 4. Langkah Implementasi Fitur Baru

1. **Buat Struktur Folder**  
   - `features/<feature>/models`  
   - `features/<feature>/services`  
   - `features/<feature>/repository.ts`  
   - `features/<feature>/hooks`  
   - `features/<feature>/utils`  
   - `features/<feature>/ui/shared`  
   - `features/<feature>/ui/<variant>/{admin,organizer,customer}`

2. **Definisikan Models**  
   - Representasi entitas bisnis  
   - Validasi domain level  
   - Contoh: `features/event-management/models/tournament.ts`

3. **Implementasi Repository**  
   - Abstraksi panggilan Supabase  
   - Kelas/fungsi CRUD  
   - Tangani error & parsing data

4. **Kembangkan Service Layer**  
   - Gunakan model & repository  
   - Pusatkan business rules dan validasi

5. **Custom Hooks**  
   - Panggil service, atur state loading/error/data  
   - `use<Feature><Variant>Data`

6. **Utility Functions**  
   - Formatter, validator, helper logic

7. **UI Adapters**  
   - Role-based UI components  
   - Gunakan hooks + service + shared UI

8. **Integrasi Route**  
   - Tambah page di `app/(roles)/<role>/<feature>/...`
   - Pakai layout role tunggal

9. **Testing**  
   - Unit test models & services  
   - Component test untuk adapters

10. **Dokumentasi**  
   - README di folder fitur  
   - Contoh import & usage

## 5. Contoh Kasus: Feature "Event Management"

1. **Folder Setup**
   ```bash
   mkdir -p features/event-management/{models,services,hooks,utils,ui/shared}
   mkdir -p features/event-management/ui/{tournament,league}/{admin,organizer,customer}
   ```

2. **Model** (`models/tournament.ts`)

3. **Repository** (`repository.ts`)

4. **Service** (`services/tournament.ts`)

5. **Hook** (`hooks/useTournaments.ts`)

6. **Shared UI** (`ui/shared/status-badge.tsx`)

7. **UI Adapter** (`ui/tournament/admin/TournamentList.tsx`)

8. **Page Route** (`app/(roles)/admin/events/tournament/page.tsx`)

## 6. Best Practices

- **Atomic Commits**: Satu unit perubahan logis per commit.
- **Feature Branch**: Isolasi pengembangan.
- **Barrel Files**: index.ts untuk public API tiap folder.
- **Factory Pattern**: Untuk varian service dan config.
- **Context Pattern**: Untuk state global/feature.
- **Lint & Format**: Konsisten dengan config ESLint/Prettier.

---

Dokumen ini menjadi panduan cepat untuk tim developer mengadopsi dan mengimplementasikan FCDDA secara konsisten dan terstruktur.