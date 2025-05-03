# Guide to Feature Variant Clustering

> **Dokumen Version Control**  
> **Dibuat**: 3 Mei 2025  
> **Penulis**: Laksmana Tri Moerdani  
> **Status**: Draft

## 1. Pendahuluan

Feature Variant Clustering adalah pola organisasi dalam arsitektur FCDDA yang mengelompokkan varian–varian dari satu fitur domain utama di dalam direktori fitur yang sama. Tujuan utama:

- **Maintainability**: Memudahkan pemeliharaan dengan memusatkan semua code varian.
- **Scalability**: Mendukung penambahan varian baru tanpa mengubah struktur global.
- **Discoverability**: Memudahkan developer menemukan kode varian tertentu.
- **Isolation**: Mencegah kebocoran kode atau dependensi antar varian.

## 2. Konsep Utama

1. **Domain Feature**: Fitur utama (contoh: `event-management`).
2. **Variants**: Sub-tipe domain dalam fitur (contoh: `tournament`, `league`, `series`).
3. **Common Resources**: Model, service, hook, util yang berlaku untuk semua varian.
4. **Variant-Specific Resources**: Model, service, hook, util, UI adapter yang khusus untuk satu varian.

## 3. Struktur Folder Standar

```text
/features/<feature-name>/
  ├── models/               # common + variant-specific
  ├── services/             # common + variant-specific
  ├── repository.ts         # data access
  ├── hooks/                # common + variant-specific
  ├── utils/                # common + variant-specific
  └── ui/
      ├── shared/           # UI reuse dalam feature
      ├── <variant1>/       # e.g. tournament
      │   ├── admin/
      │   ├── organizer/
      │   └── customer/
      ├── <variant2>/       # e.g. league
      │   ├── admin/
      │   ├── organizer/
      │   └── customer/
      └── <variant3>/       # e.g. series
          ├── admin/
          ├── organizer/
          └── customer/
```

## 4. Langkah Implementasi

1. **Identifikasi Variants**: Daftar varian domain utama.
2. **Ekstrak Common Files**: Model, service, hook, util yang shared pindahkan ke folder `models` atau `services` tanpa subfolder.
3. **Pisahkan Variant Files**: Buat subfolder `hooks/<variant>`, `utils/<variant>` untuk code varian.
4. **Organisasi UI Adapters**: Di `ui/<variant>/<role>/` simpan komponen UI khusus.
5. **Barrel Exports**: Tambahkan index.ts untuk menggabungkan exports common dan per varian.
6. **Update Imports**: Pastikan semua file import menggunakan path baru.

## 5. Contoh Kasus

**Fitur**: `event-management`  
**Variants**: `tournament`, `league`  
**Code**:

```
features/event-management/
  models/
    common.ts
    tournament.ts
    league.ts
    index.ts
  services/
    common.ts
    tournament.ts
    league.ts
    index.ts
  hooks/
    useEvents.ts          # common
    useTournament.ts      # variant-specific
    useLeague.ts          # variant-specific
  ui/
    shared/
      StatusBadge.tsx
    tournament/
      admin/ButtonGroup.tsx
      organizer/TournamentView.tsx
    league/
      admin/LeagueSettings.tsx
      customer/LeagueOverview.tsx
```

## 6. Best Practices dan Checklist

- [ ] Models dan services yang shared diletakkan di folder utama fitur, bukan di subfolder variant.
- [ ] Hooks/Utils varian terpisah dengan nama folder sesuai varian.
- [ ] UI adapter per role konsisten di dalam `ui/<variant>/<role>/`.
- [ ] Barrel file (`index.ts`) menggabungkan export common dan per varian.
- [ ] Tidak ada code duplication antar subfolder variant.
- [ ] Buat dokumentasi singkat di tiap subfolder variant untuk menjelaskan peran file.

## 7. Kendala dan Solusi Umum

- **Dependensi Silang**: Hindari import antar varian. Gunakan common services.
- **Redundansi UI**: Abstract component ke `ui/shared` saat muncul di 2+ varian.
- **Kompleksitas Barrel**: Gunakan path alias (`@/features/...`) untuk kemudahan import.

## 8. Kesimpulan

Feature Variant Clustering membantu menjaga struktur project tetap terorganisir dan scalable. Dengan mengikuti panduan ini, tim developer dapat menambah, memelihara, dan menguji varian baru dengan konsisten.
