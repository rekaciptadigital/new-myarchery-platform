# Fitur Pengaturan Bantalan (Target Settings)

Dokumen ini menjelaskan cara kerja, fitur, dan alur penggunaan dari komponen Pengaturan Bantalan dalam platform MyArchery. Tujuan dari dokumen ini adalah memberikan pemahaman menyeluruh tentang fitur ini untuk keperluan onboarding engineer baru atau maintenance di masa depan.

## Daftar Isi
1. [Gambaran Umum](#1-gambaran-umum)
2. [Struktur Data](#2-struktur-data)
3. [Alur Pengguna (User Flow)](#3-alur-pengguna-user-flow)
4. [Fungsi Utama](#4-fungsi-utama)
5. [Validasi](#5-validasi)
6. [Algoritma Auto-Generate](#6-algoritma-auto-generate)
7. [Pengaturan Bantalan Gabungan](#7-pengaturan-bantalan-gabungan)
8. [Pengurutan Kategori](#8-pengurutan-kategori)
9. [Representasi Visual](#9-representasi-visual)
10. [Use Cases](#10-use-cases)
11. [Tips Pengembangan](#11-tips-pengembangan)

## 1. Gambaran Umum

Fitur Pengaturan Bantalan memungkinkan penyelenggara event panahan untuk mengatur distribusi bantalan (target) untuk setiap kategori dan hari pertandingan. Setiap pertandingan panahan membutuhkan alokasi bantalan yang efisien berdasarkan jumlah peserta, kategori peserta, dan jumlah bantalan yang tersedia.

### Tujuan Fitur
- Mengatur pembagian bantalan untuk setiap kategori peserta
- Memastikan bantalan cukup untuk semua peserta
- Meminimalkan jumlah bantalan yang dibutuhkan
- Memberikan visualisasi layout bantalan
- Mengotomatisasi distribusi bantalan
- Menyediakan opsi pengurutan kategori (otomatis atau manual)
- Mendukung optimalisasi dengan bantalan gabungan (shared targets)

### Penempatan dalam Aplikasi
Fitur ini terletak di jalur `/scoring/[eventId]/settings/target` dan merupakan bagian dari pengaturan event panahan.

## 2. Struktur Data

### State Utama (`daySettings`)
```typescript
[
  { 
    id: "day-1", 
    date: "2025-06-15", 
    startTime: "08:00",
    endTime: "09:00",
    sessionName: "Kloter Pagi",
    totalTargets: 15,
    startTargetNumber: 1,
    categoryTargets: [
      { categoryId: 1, startTarget: 1, endTarget: 5, totalParticipants: 15, targetFace: 3 },
      // ...more categories
    ]
  },
  // ...more days
]
```

### Tipe Data untuk Bantalan Gabungan (SharedTarget)
```typescript
type SharedTarget = {
  targetNumber: number;
  categories: number[]; // Array of categoryIds sharing this target
  participantCounts: Record<number, number>; // categoryId -> participant count
};
```

### State Konfigurasi
```typescript
// Toggle untuk bantalan gabungan
const [enableSharedTargets, setEnableSharedTargets] = useState<Record<string, boolean>>({
  "day-1-morning": true,
  // ...more days
});

// Toggle untuk bantalan kosong di antara kategori
const [enableEmptyTargets, setEnableEmptyTargets] = useState<Record<string, boolean>>({
  "day-1-morning": true,
  // ...more days
});

// Mode pengurutan kategori
const [sortMode, setSortMode] = useState<'auto' | 'manual'>('auto');

// Urutan kategori untuk mode manual
const [manualSortOrder, setManualSortOrder] = useState<number[]>(
  categories.map(cat => cat.id)
);
```

### Validation Errors
```typescript
{
  "day-1": {
    "totalTargets": "Minimum jumlah bantalan yang dibutuhkan adalah 10"
  }
}
```

## 3. Alur Pengguna (User Flow)

1. **Akses Halaman**: Pengguna (panitia) mengakses halaman pengaturan bantalan.
2. **Melihat Data**: Sistem menampilkan data hari pertandingan dan kategori yang terdaftar.
3. **Pengaturan Dasar**:
   - Pengguna menentukan jumlah bantalan tersedia
   - Pengguna menentukan nomor awal bantalan (opsional, default = 1)
4. **Konfigurasi Tambahan**:
   - Toggle bantalan gabungan (shared targets) untuk mengoptimalkan penggunaan bantalan
   - Toggle bantalan kosong (empty targets) untuk pemisahan visual antar kategori
   - Pilih mode pengurutan kategori (otomatis berdasarkan jarak atau manual)
5. **Pengurutan Kategori** (opsional):
   - Mode Otomatis: Pengurutan berdasarkan jarak (asc/desc)
   - Mode Manual: Drag & drop atau tombol panah untuk mengurutkan kategori
6. **Distribusi Bantalan** (salah satu dari dua cara):
   - **Manual**: Pengguna mengisi nomor bantalan awal dan akhir untuk setiap kategori
   - **Auto-Generate**: Pengguna mengklik tombol "Auto Generate" untuk distribusi otomatis
7. **Validasi**: Sistem memastikan jumlah bantalan mencukupi dan tidak ada konflik
8. **Visualisasi**: Pengguna melihat representasi visual dari distribusi bantalan
9. **Penyimpanan**: Pengguna menyimpan pengaturan bantalan

## 4. Fungsi Utama

### Manajemen State

#### `toggleSharedTargetsForDay(id, enabled)`
Mengaktifkan/menonaktifkan fitur bantalan gabungan untuk hari tertentu.

#### `toggleEmptyTargetsForDay(id, enabled)`
Mengaktifkan/menonaktifkan fitur bantalan kosong pemisah antar kategori.

#### `toggleSortMode()`
Beralih antara mode pengurutan otomatis dan manual.

#### `toggleSortDirection()`
Beralih arah pengurutan (asc/desc) untuk mode otomatis.

### Perhitungan dan Validasi

#### `calculateMinimumTargetsNeeded(dayId)`
Menghitung jumlah bantalan minimum yang dibutuhkan, dengan dua nilai:
- `basic`: Jumlah minimum tanpa optimasi
- `withSharing`: Jumlah minimum dengan bantalan gabungan

```typescript
const calculateMinimumTargetsNeeded = (dayId: string) => {
  // ...existing code...
  
  // If shared targets are enabled, calculate potential savings
  if (enableSharedTargets[dayId]) {
    const potentialPairs = findPotentialSharedTargets(dayId);
    
    // Calculate realistic maximum savings
    let possibleSavings = 0;
    const usedCategories = new Set<number>();
    
    for (const pair of potentialPairs) {
      // Skip if already used in another pairing
      if (usedCategories.has(pair.categoryA.categoryId) || 
          usedCategories.has(pair.categoryB.categoryId)) {
        continue;
      }
      
      // Add saving and mark categories as used
      possibleSavings += pair.potentialSavings;
      usedCategories.add(pair.categoryA.categoryId);
      usedCategories.add(pair.categoryB.categoryId);
    }
    
    // Calculate minimum with shared targets
    const minWithSharing = Math.max(totalTargetsNeeded - possibleSavings, 1);
    return { basic: totalTargetsNeeded, withSharing: minWithSharing };
  }
  
  return { basic: totalTargetsNeeded, withSharing: totalTargetsNeeded };
}
```

#### `validateTotalTargets(dayId, value)`
Validasi jumlah bantalan, memastikan jumlah mencukupi berdasarkan optimasi yang aktif.

#### `validateStartTargetNumber(dayId, value)`
Validasi nomor awal bantalan, memastikan cukup ruang untuk semua bantalan yang dibutuhkan.

### Manajemen Target 

#### `handleUpdateDay(id, field, value)`
Memperbarui pengaturan level hari (bantalan total, nomor awal) dengan validasi.

#### `handleUpdateCategoryTarget(dayId, categoryId, field, value)`
Memperbarui pengaturan target untuk kategori tertentu.

### Pengurutan Kategori

#### `getSortedCategories()`
Mendapatkan daftar kategori berdasarkan mode pengurutan yang aktif.

```typescript
const getSortedCategories = () => {
  // If using manual sort, return categories in the manual sort order
  if (sortMode === 'manual') {
    return manualSortOrder
      .map(id => categories.find(cat => cat.id === id))
      .filter((cat): cat is typeof categories[0] => !!cat); // Type guard
  }
  
  // Otherwise, use automatic sorting based on distance
  return [...categories].sort((a, b) => {
    const distanceA = parseInt(a.distance.replace(/[^\d]/g, ''));
    const distanceB = parseInt(b.distance.replace(/[^\d]/g, ''));
    
    return sortDirection === 'asc' 
      ? distanceA - distanceB  // Ascending: small to large
      : distanceB - distanceA; // Descending: large to small
  });
}
```

#### `moveCategory(categoryId, direction)`
Memindahkan kategori ke atas/bawah dalam urutan manual.

#### `handleDragReorder(result)`
Menangani proses reordering kategori via drag & drop.

### Generator Otomatis

#### `handleAutoGenerateTargets(dayId)`
Secara otomatis mendistribusikan bantalan berdasarkan jumlah peserta, pengurutan kategori aktif, dan konfigurasi yang dipilih.

#### `findPotentialSharedTargets(dayId)`
Mencari potensi bantalan gabungan berdasarkan aturan penggabungan.

```typescript
const findPotentialSharedTargets = (dayId: string) => {
  // ...existing code...
  
  // For each group of same category type and distance, find categories that could share targets
  Object.values(byCategoryAndDistance).forEach(group => {
    if (group.length < 2) return;
    
    // Check all possible combinations between categories within the same group
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        const catA = group[i];
        const catB = group[j];
        
        // Check if both categories have participants
        if (catA.totalParticipants === 0 || catB.totalParticipants === 0) continue;
        
        // Check if categories are adjacent in the sorted list
        const posA = categoryPositionMap.get(catA.categoryId);
        const posB = categoryPositionMap.get(catB.categoryId);
        
        if (posA === undefined || posB === undefined) continue;
        
        // Only allow sharing between adjacent categories (abs diff is 1)
        if (Math.abs(posA - posB) !== 1) continue;
        
        // Calculation for potential sharing...
      }
    }
  });
  
  // ...existing code...
}
```

### Visualisasi dan Display

#### `getSharedTargetInfo(dayId, targetNumber)`
Mendapatkan informasi tentang bantalan gabungan.

#### `getCategoryForTarget(dayId, targetNumber)`
Menentukan kategori yang ditugaskan ke nomor bantalan tertentu.

#### `getTargetStyleClasses(dayId, targetNumber)`
Menghasilkan kelas styling untuk representasi visual bantalan.

## 5. Validasi

### Validasi Jumlah Bantalan
- Tidak boleh melebihi 64 (batas maksimum)
- Tidak boleh kurang dari minimum yang dibutuhkan berdasarkan peserta
- Memperhitungkan optimasi bantalan gabungan jika diaktifkan

### Validasi Nomor Awal Bantalan
- Memastikan bahwa dengan nomor awal yang dipilih, masih cukup ruang untuk semua peserta
- Merespon perubahan pengaturan bantalan gabungan

### Tampilan Error
- Error ditampilkan sebagai teks merah di bawah input
- Input yang tidak valid diberi border merah
- Tombol "Auto Generate" dinonaktifkan jika ada error validasi
- Pesan error disesuaikan berdasarkan optimasi (tampilkan bantalan minimum dengan/tanpa optimasi)

## 6. Algoritma Auto-Generate

Algoritma auto-generate mendistribusikan bantalan dengan pendekatan yang efisien:

1. **Persiapan dan Pengurutan**:
   - Filter kategori dengan peserta > 0
   - Urutkan kategori berdasarkan mode pengurutan yang aktif:
     - **Mode Otomatis**: Urutkan berdasarkan jarak dan arah (asc/desc)
     - **Mode Manual**: Urutkan berdasarkan urutan yang ditentukan pengguna
   - Hitung bantalan minimum yang dibutuhkan

2. **Analisis Spacing**:
   - Hitung ruang tersedia (total - minimum)
   - Hitung jumlah transisi gender
   - Tentukan strategi spacing (semua kategori atau hanya transisi gender)

3. **Distribusi**:
   - Mulai dari nomor bantalan yang ditentukan pengguna
   - Untuk setiap kategori:
     - Tambahkan spacing (jika enableEmptyTargets = true) dan ruang mencukupi
     - Alokasikan bantalan berdasarkan jumlah peserta dan target face
     - Catat bantalan awal dan akhir untuk kategori

4. **Optimasi Bantalan Gabungan** (Jika enableSharedTargets = true):
   - Identifikasi kategori berdekatan dengan:
     - Jenis kategori yang sama (Recurve, Compound, Barebow)
     - Jarak tembak yang sama (70m, 50m)
     - Bersebelahan dalam urutan yang aktif saat ini
   - Evaluasi kandidat untuk berbagi:
     - Hitung sisa kapasitas pada setiap bantalan
     - Terapkan kombinasi yang optimal berdasarkan jumlah peserta dan kapasitas

5. **Finalisasi**:
   - Terapkan bantalan gabungan jika kriteria terpenuhi
   - Reset kategori tanpa peserta
   - Perbarui state dengan distribusi baru

```typescript
// Pseudo-code for the key parts of auto-generate
const handleAutoGenerateTargets = (dayId: string) => {
  // Get day data
  const day = daySettings.find(d => d.id === dayId);
  if (!day) return;
  
  // 1. Preparation and sorting
  const categoriesWithParticipants = day.categoryTargets
    .filter(cat => cat.totalParticipants > 0)
    .sort((a, b) => {
      // Using manual sort order if active
      if (sortMode === 'manual') {
        const indexA = manualSortOrder.indexOf(a.categoryId);
        const indexB = manualSortOrder.indexOf(b.categoryId);
        if (indexA >= 0 && indexB >= 0) return indexA - indexB;
        // ...additional sorting logic
      }
      
      // Default sorting based on distance
      // ...distance-based sorting logic
    });
  
  // 2 & 3. Space analysis and distribution
  // ...distribution logic with empty targets based on enableEmptyTargets

  // 4. Shared target optimization
  if (enableSharedTargets[dayId]) {
    const potentialSharedTargets = findPotentialSharedTargets(dayId);
    
    // Process potential shared targets
    for (const pair of potentialSharedTargets) {
      // ...implementation of shared target assignment
    }
  }
  
  // 5. Finalization
  // ...update state with new distribution
};
```

## 7. Pengaturan Bantalan Gabungan

Fitur bantalan gabungan mengoptimalkan penggunaan bantalan dengan menggabungkan dua kategori berbeda pada satu bantalan ketika memungkinkan.

### Kriteria Penggabungan
Dua kategori dapat berbagi bantalan jika memenuhi kriteria:

1. **Sama Jenis Kategori**: Kedua kategori harus sama jenis (Recurve-Recurve, Compound-Compound, dsb.)
2. **Sama Jarak Tembak**: Kedua kategori harus memiliki jarak tembak yang sama (70m-70m, 50m-50m, dsb.)
3. **Bersebelahan dalam Urutan**: Kategori harus berdekatan dalam urutan pengurutan yang aktif
4. **Penggunaan Tidak Penuh**: Kedua kategori harus memiliki sisa peserta yang tidak memenuhi bantalan penuh
5. **Total Peserta ≤ Target Face**: Jumlah total peserta gabungan tidak melebihi kapasitas bantalan (target face)

### Perhitungan Bantalan Gabungan
```typescript
// Example from findPotentialSharedTargets function:
// Calculate remaining participants that don't fill a target
const catARemainder = catA.totalParticipants % catA.targetFace;
const catBRemainder = catB.totalParticipants % catB.targetFace;

// If either category has no remainder, we can't optimize
if (catARemainder === 0 && catBRemainder === 0) continue;

// Check all possible combinations of remaining participants
for (let sharedA = 1; sharedA < maxTargetFace; sharedA++) {
  // Only consider valid combinations based on actual remainders
  if (sharedA > catARemainder) continue;
  
  for (let sharedB = 1; sharedB < maxTargetFace; sharedB++) {
    // Only consider valid combinations based on actual remainders
    if (sharedB > catBRemainder) continue;
    
    // Check if this combination fits on a single target
    if (sharedA + sharedB <= maxTargetFace) {
      // This is a valid shared target combination
      // ...
    }
  }
}
```

### Visualisasi Bantalan Gabungan
- Ditandai dengan gradien warna dari kedua kategori
- Memiliki ikon kecil "shared" di sudut
- Menampilkan tooltip dengan informasi detail saat dihover
- Menampilkan tabel khusus yang merinci distribusi bantalan gabungan

### Contoh Kasus
Dua kategori "Recurve Men" (15 peserta, targetFace=4) dan "Recurve Women" (17 peserta, targetFace=4):
- Tanpa optimasi: membutuhkan 4 bantalan untuk Men (dengan 1 slot kosong) dan 5 bantalan untuk Women (dengan 3 slot kosong) = 9 bantalan
- Dengan optimasi: dapat berbagi 1 bantalan untuk peserta ke-13, 14, 15 dari Men dengan peserta ke-17 dari Women = 8 bantalan

## 8. Pengurutan Kategori

### Mode Pengurutan

#### Mode Otomatis
- Kategori diurutkan berdasarkan jarak tembak
- Arah pengurutan dapat diubah (asc: pendek→jauh, desc: jauh→pendek)
- Saat fitur bantalan gabungan aktif, kategori dengan jenis dan jarak sama diposisikan berdekatan

#### Mode Manual
- Pengguna dapat mengurutkan kategori sesuai keinginan
- Interface drag & drop untuk mengubah urutan
- Tombol panah untuk memindahkan kategori ke atas/bawah
- Urutan manual memengaruhi algoritma auto-generate dan bantalan gabungan

### Interaksi Komponen GUI
```jsx
<Button onClick={toggleSortMode} className={sortMode === 'manual' ? 'active' : ''}>
  <span>{sortMode === 'auto' ? 'Auto Sort' : 'Manual Sort'}</span>
</Button>

{sortMode === 'auto' && (
  <Button onClick={toggleSortDirection}>
    <span>Jarak</span>
    {sortDirection === 'asc' && <ChevronUp />}
    {sortDirection === 'desc' && <ChevronDown />}
  </Button>
)}

{/* Table with drag & drop (when manual mode is active) */}
<tr 
  key={category.id} 
  draggable={sortMode === 'manual'}
  onDragStart={(e) => handleDragStart(e, index)}
  onDragEnd={handleDragEnd}
  onDragOver={handleDragOver}
  onDrop={handleDrop}
>
  {/* ... table cells ... */}
  <td>
    <Button onClick={() => moveCategory(category.id, 'up')}>Up</Button>
    <Button onClick={() => moveCategory(category.id, 'down')}>Down</Button>
  </td>
</tr>
```

## 9. Representasi Visual

### Grid Bantalan
- Setiap bantalan ditampilkan dengan nomor
- Warna untuk kategori: Recurve Men (biru), Recurve Women (pink), dll.
- Bantalan kosong ditampilkan dengan border abu-abu dan background putih
- Bantalan gabungan ditampilkan dengan warna gradien kombinasi dari kedua kategori
- Menyediakan toggle ukuran (compact/normal)

### Toggle dan Konfigurasi
- **Toggle Shared Targets**: Mengaktifkan/menonaktifkan bantalan gabungan
- **Toggle Empty Targets**: Mengaktifkan/menonaktifkan bantalan kosong pemisah
- **Toggle Compact View**: Mengubah ukuran tampilan grid bantalan

### Tabel Kategori
- Menampilkan semua kategori dengan pengaturannya
- Dalam mode manual, tabel memiliki fitur drag & drop
- Fields: Target Face, Bantalan Awal, Bantalan Akhir
- Fields readonly: Total Peserta, Bantalan Digunakan

### Informasi Tambahan
- **Distribusi Peserta per Bantalan**: Menampilkan rasio peserta/bantalan untuk setiap kategori
- **Ringkasan Bantalan**: Total tersedia, terpakai, dan jumlah peserta
- **Tabel Bantalan Gabungan**: Detail bantalan yang digunakan bersama

### Insight Box
- Muncul ketika potensi optimasi terdeteksi
- Menjelaskan potensi penghematan dengan bantalan gabungan
- Memberikan contoh spesifik dari kategori yang dapat berbagi bantalan

## 10. Use Cases

### Use Case 1: Distribusi Manual
Penyelenggara yang lebih suka kontrol penuh dapat mengalokasikan bantalan secara manual.

### Use Case 2: Distribusi Otomatis dengan Mode Auto Sort
Penyelenggara dapat menggunakan fitur auto-generate dengan pengurutan otomatis berdasarkan jarak.

### Use Case 3: Distribusi Otomatis dengan Mode Manual Sort
Penyelenggara dapat mengurutkan kategori secara manual terlebih dahulu, kemudian menggunakan auto-generate.

### Use Case 4: Optimasi dengan Bantalan Gabungan
Dengan fitur bantalan gabungan, penyelenggara dapat menghemat jumlah bantalan yang digunakan.

**Contoh Skenario:**
1. Total bantalan tersedia: 10
2. Distribusi peserta:
   - Recurve Men: 11 peserta (target face = 3) → 3.67 bantalan
   - Recurve Women: 10 peserta (target face = 3) → 3.33 bantalan
3. Tanpa optimasi: 4 + 4 = 8 bantalan
4. Dengan optimasi: 3 penuh untuk Men + 3 penuh untuk Women + 1 shared = 7 bantalan

### Use Case 5: Pengaturan Visual dengan Empty Targets
Penyelenggara dapat menggunakan fitur bantalan kosong untuk memisahkan kategori secara visual.

### Use Case 6: Kombinasi Semua Fitur
Penyelenggara menggunakan kombinasi pengurutan manual, bantalan gabungan, dan bantalan kosong untuk layout yang dioptimalkan sekaligus visual yang jelas.

## 11. Tips Pengembangan

### Pengujian Fitur
- **Uji Berbagai Skenario**: Test dengan jumlah peserta yang bervariasi
- **Validasi Edge Cases**: Pastikan algoritma bekerja dengan kasus ekstrem
- **Integrasi dengan Backend**: Pastikan API menangani struktur data yang diperbarui

### Perluasan Fitur
- **Import/Export Layout**: Tambahkan kemampuan untuk menyimpan dan memuat layout preset
- **Undo/Redo**: Tambahkan fitur untuk membatalkan/mengulangi perubahan
- **Drag Antar Bantalan**: Implementasikan drag & drop langsung di grid bantalan
- **Cetak Layout**: Generate PDF dari layout yang telah disusun

### Pemeliharaan
- Struktur komponen modular untuk perubahan yang terlokaslisasi
- Gunakan konstanta untuk nilai konfigurasi seperti batas maksimum bantalan
- Documentation inline di fungsi-fungsi kompleks

### Optimasi Performa
- Gunakan memoization (useMemo, useCallback) untuk kalkulasi yang intensif
- Terapkan virtualisasi untuk layout dengan banyak bantalan (>50)
- Pertimbangkan chunking untuk proses auto-generate pada dataset besar

---

Dokumen ini mencakup fitur-fitur terbaru pengaturan bantalan termasuk pengurutan manual, bantalan gabungan dengan aturan baru, dan toggle bantalan kosong. Panduan ini dapat membantu engineer memahami cara kerja sistem dan menjaga konsistensi implementasi dalam pengembangan.