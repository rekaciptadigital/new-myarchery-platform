# MyArchery Platform UI Styling Guide

Dokumen ini berisi panduan styling dan pola desain visual untuk platform MyArchery. Panduan ini dibuat berdasarkan analisis komponen-komponen yang ada, khususnya komponen "Pengaturan Jadwal", dan bertujuan untuk membantu mempertahankan konsistensi desain di seluruh aplikasi.

## 1. Palet Warna

### Warna Utama
- **Biru**: `#3B82F6` - Digunakan untuk tombol utama, aksen, dan elemen UI penting
- **Hijau**: `#10B981` - Digunakan untuk status sukses, konfirmasi, dan aksi "tambah"
- **Merah**: `#E63946` - Digunakan untuk peringatan, error, dan aksi penghapusan

### Warna Sekunder
- **Kuning/Amber**: `#F59E0B` - Digunakan untuk peringatan, notifikasi, dan highlight
- **Ungu**: `#8B5CF6` - Digunakan untuk fitur khusus atau highlight sekunder
- **Cyan**: `#0EA5E9` - Digunakan untuk informasi dan elemen pelengkap

### Warna Netral
- **Putih**: `#FFFFFF` - Warna latar untuk kartu dan area konten utama
- **Abu-abu Terang**: `#F7F7F7` / `#F1F5F9` - Latar untuk area sekunder, status hover
- **Abu-abu 50**: `#F9FAFB` - Latar untuk tabel, baris bergantian
- **Abu-abu 100**: `#F3F4F6` - Border, separator, status disabled
- **Abu-abu 200**: `#E5E7EB` - Border yang lebih kuat, background
- **Abu-abu 300**: `#D1D5DB` - Border input, divider
- **Abu-abu 500**: `#6B7280` - Teks sekunder, placeholder
- **Abu-abu 700**: `#374151` - Teks utama untuk elemen UI
- **Abu-abu 900**: `#111827` - Teks utama, judul

## 2. Tipografi

### Font Family
- Font utama: "Inter" atau system font stack
- Fallback: sans-serif

### Ukuran Font
- **XS**: `0.75rem` (12px) - Teks helper, informasi tambahan
- **SM**: `0.875rem` (14px) - Elemen form, konten tabel, teks sekunder
- **Base**: `1rem` (16px) - Teks body, tombol
- **LG**: `1.125rem` (18px) - Judul kartu, header seksi
- **XL**: `1.25rem` (20px) - Sub judul halaman
- **2XL**: `1.5rem` (24px) - Judul halaman

### Ketebalan Font
- **Normal**: `400` - Teks body, label form
- **Medium**: `500` - Header tabel, judul sekunder
- **Semibold**: `600` - Judul kartu, judul seksi
- **Bold**: `700` - Judul halaman, elemen yang ditekankan

## 3. Sistem Spacing

### Unit Dasar
- `0.25rem` (4px) - Spacing minimal
- `0.5rem` (8px) - Spacing ketat, komponen kecil
- `0.75rem` (12px) - Spacing standar kompak
- `1rem` (16px) - Spacing default
- `1.5rem` (24px) - Spacing sedang
- `2rem` (32px) - Spacing besar
- `3rem` (48px) - Spacing ekstra besar

### Spacing Komponen
- **Padding Kartu**: `1.5rem` (24px)
- **Padding Header Kartu**: `1.5rem` untuk atas/samping, `1.25rem` untuk bawah
- **Padding Konten Kartu**: `1.5rem`
- **Padding Sel Tabel**: `0.75rem` horizontal, `0.5rem` vertikal
- **Padding Tombol**: `0.625rem` horizontal, `0.5rem` vertikal
- **Margin Form Group**: `1rem` bawah

## 4. Border Radius

- **XS**: `0.25rem` (4px) - Elemen kecil seperti tag
- **SM**: `0.375rem` (6px) - Input form, select field
- **Base**: `0.5rem` (8px) - Kartu, tombol, elemen standar
- **MD**: `0.75rem` (12px) - Komponen yang lebih besar
- **LG**: `1rem` (16px) - Dialog modal, kartu besar
- **Full**: `9999px` - Elemen melingkar, badge

## 5. Bayangan dan Elevasi

- **None**: Tanpa bayangan - Sebagian besar elemen, desain flat
- **SM**: `0 1px 2px rgba(0, 0, 0, 0.05)` - Elevasi halus untuk kartu
- **MD**: `0 4px 6px -1px rgba(0, 0, 0, 0.1)` - Dropdown, popover
- **LG**: `0 10px 15px -3px rgba(0, 0, 0, 0.1)` - Modal, dialog penting

## 6. Styling Komponen

### Tombol
- **Primary**: Background biru (`#3B82F6`), teks putih, hover menjadi lebih gelap `#2563EB`
- **Success/Action**: Background hijau (`#10B981`), teks putih
- **Outline**: Background putih, border dan teks berwarna, hover menambahkan background yang terang
- **Ghost**: Background transparan, teks berwarna, hover menambahkan background yang terang
- **Size SM**: Padding `0.375rem 0.75rem`, font-size `0.875rem`
- **Size MD**: Padding `0.5rem 1rem`, font-size `0.875rem`
- **Size LG**: Padding `0.625rem 1.25rem`, font-size `1rem`

### Kartu
- Background putih
- Border: `1px solid #E2E8F0`
- Border radius: `0.375rem`
- Shadow: Tidak ada atau sangat halus
- Header dengan border bawah: `1px solid rgba(0, 0, 0, 0.05)`

### Elemen Form
- **Tinggi Input**: `2.5rem` (40px)
- **Tinggi Select**: `2.5rem` (40px)
- **Border**: `1px solid #D1D5DB`
- **Border Radius**: `0.375rem`
- **Focus State**: Warna border `#3B82F6`, box shadow `0 0 0 3px rgba(59, 130, 246, 0.12)`

### Tabel
- **Header**: Background abu-abu terang (`#F3F4F6`), teks uppercase, font-weight medium
- **Border**: Divider horizontal antara baris (`#E5E7EB`)
- **Row Hover**: Background sedikit lebih gelap
- **Alignment Sel**: Kiri untuk teks, kanan untuk aksi/nilai numerik

### Ikon
- **Size SM**: `14px` - Tombol kecil, inline dengan teks
- **Size MD**: `16px` - Ikon tombol standar, elemen visual kecil
- **Size LG**: `20px` - Elemen UI yang lebih besar, navigasi
- **Size XL**: `24px` - Ikon fitur, penanda seksi

## 7. Pola Interaksi

### Status Tombol
- **Default**: Status normal
- **Hover**: Shade lebih gelap untuk background, lebih terang untuk teks
- **Focus**: Outline ring (untuk aksesibilitas)
- **Active/Pressed**: Sedikit lebih gelap dari hover
- **Disabled**: Opacity lebih rendah, cursor not-allowed

### Status Elemen Form
- **Default**: Status normal dengan border terang
- **Hover**: Border sedikit lebih gelap
- **Focus**: Border berwarna dengan ring/shadow terang
- **Error**: Border merah dengan pesan error opsional
- **Disabled**: Opacity lebih rendah, background abu-abu

### Interaksi Kartu
- **Hover**: Perubahan warna border opsional
- **Active**: Shadow halus opsional

## 8. Breakpoint Responsif

- **SM**: `640px` - Perangkat kecil
- **MD**: `768px` - Perangkat menengah (tablet)
- **LG**: `1024px` - Perangkat besar (laptop)
- **XL**: `1280px` - Perangkat sangat besar (desktop)
- **2XL**: `1536px` - Layar ultra lebar

## 9. Pola Layout Halaman

### Spacing Seksi
- **Margin Header Halaman**: `1.5rem` bawah (24px)
- **Margin Seksi**: `2rem` bawah (32px)
- **Gap Grup Kartu**: `1.5rem` (24px)

### Pola Header
- Container flex dengan space between
- Sisi kiri: Judul + subtitle/deskripsi opsional
- Sisi kanan: Tombol aksi dengan spacing konsisten

### Pola Konten
- Kartu untuk pengelompokan konten
- Padding konsisten dalam komponen
- Sistem grid untuk layout responsif: 1 kolom di mobile, 2-3 kolom di layar lebih besar

## 10. Ikonografi

- **Ikon Utama**: Lucide icons (berat dan gaya konsisten)
- **Ikon + Teks**: Spacing konsisten (`0.5rem` atau 8px di antara)
- **Ikon Fungsional**: Gunakan ikon yang tepat dan jelas untuk aksi
- **Warna Semantik**: Ikon sesuai dengan warna teks kecuali untuk menyoroti aksi

## 11. Pertimbangan Aksesibilitas

- **Kontras Warna**: Minimum 4.5:1 untuk teks, 3:1 untuk teks besar
- **Indikator Fokus**: Status fokus yang terlihat untuk navigasi keyboard
- **Ukuran Teks**: Hindari ukuran piksel tetap, gunakan unit rem
- **Target Sentuh**: Minimum 44x44px untuk interaksi mobile

## 12. Animasi dan Transisi

- **Durasi**: 200ms (0.2s) untuk transisi standar
- **Easing**: Ease-in-out untuk perasaan natural
- **Efek Hover**: Transisi halus dan cepat
- **Transisi Halaman**: Fade sederhana atau tidak ada

## Contoh Implementasi Komponen

### 1. Header Halaman Standar

```tsx
<div className="mb-6 flex justify-between items-center">
  <div>
    <div className="flex items-center gap-2 mb-1">
      <Link href={`/kembali`} className="hover:bg-gray-100 p-1 rounded">
        <ChevronLeft size={20} />
      </Link>
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Icon className="h-6 w-6 text-green-600" />Judul Halaman
      </h1>
    </div>
    <p className="text-slate-600">Deskripsi singkat halaman</p>
  </div>
  <div className="flex gap-4">
    <Link href={`/kembali`}>
      <Button variant="outline">Kembali</Button>
    </Link>
    <Button className="bg-green-600 hover:bg-green-700">
      <Icon size={16} className="mr-2" /> Aksi Utama
    </Button>
  </div>
</div>
```

### 2. Card Dengan Header

```tsx
<Card className="bg-white border-gray-200">
  <CardHeader className="bg-white">
    <CardTitle className="text-lg font-semibold flex items-center gap-2">
      <Icon className="h-4 w-4" />
      Judul Card
    </CardTitle>
  </CardHeader>
  <CardContent>
    {/* Konten card di sini */}
  </CardContent>
</Card>
```

### 3. Tabel Data

```tsx
<div className="border rounded-md bg-gray-50">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Header 1</th>
        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Header 2</th>
        <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
      </tr>
    </thead>
    <tbody className="bg-gray-50 divide-y divide-gray-200">
      <tr>
        <td className="px-3 py-2 whitespace-nowrap text-sm">Data 1</td>
        <td className="px-3 py-2 whitespace-nowrap text-sm">Data 2</td>
        <td className="px-3 py-2 whitespace-nowrap text-right text-sm font-medium">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-800"
          >
            <Icon size={16} />
          </Button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### 4. Loading State

```tsx
<div className="flex justify-center items-center p-12">
  <div className="text-center">
    <div className="w-10 h-10 border-4 border-t-green-600 border-r-green-600 border-b-green-200 border-l-green-200 rounded-full animate-spin mb-4 mx-auto"></div>
    <p className="text-gray-600">Memuat data...</p>
  </div>
</div>
```

### 5. Form Group

```tsx
<div className="space-y-4">
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div className="space-y-2">
      <Label htmlFor="field1">Label</Label>
      <Input 
        id="field1" 
        className="h-10 text-sm border-gray-300" 
        placeholder="Placeholder"
      />
      <p className="text-xs text-gray-500">Helper text</p>
    </div>
    
    <div className="space-y-2">
      <Label htmlFor="field2">Label</Label>
      <Select 
        options={options}
        className="h-10 text-sm" 
        placeholder="Pilih opsi..." 
      />
    </div>
  </div>
</div>
```

## Catatan Implementasi

Panduan styling ini diimplementasikan melalui kombinasi:
1. Kelas utilitas Tailwind CSS untuk spacing, warna, dan tipografi yang konsisten
2. Komponen ShadcnUI yang mengikuti panduan ini
3. Custom component styles ketika dibutuhkan (seperti terlihat dengan styling react-select)
4. Variabel CSS global untuk theming

Dengan mengikuti panduan ini, kita dapat memastikan konsistensi visual di seluruh platform MyArchery dan menyediakan fondasi yang solid untuk mengembangkan fitur baru sambil mempertahankan bahasa desain yang telah ditetapkan.

## Integrasi dengan Teknologi Frontend

Referensi dari panduan frontend MyArchery platform, styling ini diimplementasikan menggunakan:
- **Next.js 14**: Framework utama dengan App Router
- **TypeScript**: Untuk type-checking dan maintainability kode
- **Tailwind CSS**: Framework styling utama yang memungkinkan styling cepat dan konsisten
- **ShadcnUI & Radix UI**: Library komponen yang menyediakan UI primitives yang aksesibel
- **Lucide Icons**: Untuk ikonografi konsisten di seluruh aplikasi

## Kesimpulan

Dokumen panduan styling ini berfungsi sebagai referensi komprehensif untuk memastikan konsistensi desain di seluruh platform MyArchery. Dengan mengikuti pola dan prinsip yang ditentukan dalam dokumen ini, tim pengembangan dapat mempertahankan tampilan profesional dan pengalaman pengguna yang mulus di seluruh platform.