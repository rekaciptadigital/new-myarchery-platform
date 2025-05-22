# Event Management - Logic & Use Case Knowledge

## 1. Use Case Utama

### 1.1. Penyelenggara (Organizer)
- Membuat event/turnamen baru (multi-tab form: info dasar, lokasi, harga, kategori, dokumentasi)
- Mengedit event yang sudah ada
- Menghapus event
- Melihat daftar event yang dikelola (dashboard)
- Melihat statistik event (total event, aktif, peserta, pendapatan)
- Mencari dan memfilter event berdasarkan status/nama
- Mengatur status event (draft, published, active, completed, cancelled)
- Mengatur kuota peserta, kategori, harga, jadwal pendaftaran, early bird, late registration

### 1.2. Admin
- Override data event
- Fungsi administratif (edit, hapus, publish, dll.)

### 1.3. Pelanggan
- Melihat daftar event publik
- Melihat detail event
- Mendaftar ke event (fitur pendaftaran di luar scope dokumen ini)

---

## 2. Logic Utama

### 2.1. Struktur Data & Model
- Model dasar event (`BaseEventModel`) menyimpan informasi umum seperti id, nama, deskripsi, penyelenggara, visibilitas, status, dan timestamp. Model turnamen (`TournamentModel`) memperluas model dasar dengan menambahkan informasi spesifik seperti tipe event, logo, banner, lokasi, jadwal, harga, kuota, kategori, aturan, dan pengaturan countdown.

### 2.2. Repository Layer
- Repository layer menyediakan fungsi untuk mengambil daftar event dengan filter, mengambil detail event berdasarkan id, membuat event baru, mengupdate event, dan menghapus event. Fungsi-fungsi ini berinteraksi dengan database (misalnya Supabase) untuk operasi CRUD.

### 2.3. Service Layer
- Service layer terdiri dari `EventService` yang membungkus repository dan menambahkan logic tambahan seperti publish event, serta `TournamentService` yang menangani validasi data turnamen, proses upload gambar, menyimpan detail turnamen, mengupdate turnamen, dan mengambil detail turnamen.

### 2.4. Hooks
- Hooks seperti `useEvents` dan `useTournament` digunakan untuk mengambil data event dan turnamen, mengelola state loading dan error, serta menyediakan fungsi untuk menyimpan (create/update) turnamen.

### 2.5. UI Logic
- UI logic mencakup form multi-tab untuk pembuatan dan pengeditan event, dengan validasi per tab dan navigasi antar tab. Dashboard event menyediakan fitur pencarian, filter status, statistik, dan aksi CRUD. Komponen tab terdiri dari Info Dasar, Lokasi, Harga, Kategori, dan Dokumentasi.

### 2.6. Validasi
- Validasi dilakukan per tab (misalnya nama wajib, tanggal mulai wajib) dan validasi penuh sebelum submit untuk memastikan data yang dimasukkan valid.

### 2.7. Edge Case & Error Handling
- Penanganan error mencakup error saat fetch data, error submit, error validasi, dan error upload gambar. State loading, error, dan success digunakan untuk memberikan feedback kepada pengguna.

---

## 3. Use Case Detail

### Buat Event
- User ingin membuat event tournament baru. User mengisi form multi-tab yang mencakup informasi dasar, lokasi, harga, kategori, dan dokumentasi. Setelah selesai, user dapat menyimpan sebagai draft atau mempublikasikan event tersebut.

### Edit Event
- User (penyelenggara atau admin) ingin mengedit event yang sudah ada. User mengubah data event dan menyimpan perubahan.

### Hapus Event
- User (penyelenggara atau admin) ingin menghapus event dari sistem.

### Lihat Daftar Event
- User (penyelenggara atau admin) ingin melihat daftar event yang dikelola. User dapat memfilter dan mencari event berdasarkan status atau nama.

### Lihat Statistik
- User (penyelenggara) ingin melihat statistik event, seperti total event, event aktif, jumlah peserta, dan total pendapatan.

### Lihat Detail Event
- Semua user ingin melihat detail event, termasuk informasi lengkap dan tab info.

### Publish Event
- User (penyelenggara atau admin) ingin mengubah status event menjadi published.

### Validasi Form
- User (penyelenggara) ingin memastikan data yang dimasukkan valid dengan melakukan validasi per tab dan validasi penuh sebelum submit.

### Error Handling
- Semua user ingin mendapatkan feedback jika terjadi error saat fetch data, submit, validasi, atau upload gambar.

---

## 4. Integrasi & Arsitektur

- Folder utama: `/features/event-management/`
- Integrasi halaman: `/app/(roles)/organizer/events/...`
- State: React hooks & context
- API: Supabase, repository pattern

---

_Dokumen ini dapat dikembangkan lebih lanjut sesuai kebutuhan._ 