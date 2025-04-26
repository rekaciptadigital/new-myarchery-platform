# Fitur Autentikasi MyArchery Platform

> **Dokumen ini dibuat pada:** 27 April 2025, 10:00 WIB  
> **Terakhir diperbarui:** 27 April 2025, 14:35 WIB

## Daftar Isi
1. [Gambaran Umum](#1-gambaran-umum)
2. [Arsitektur Fitur Autentikasi](#2-arsitektur-fitur-autentikasi)
3. [Struktur Komponen](#3-struktur-komponen)
4. [Pola Login/Register](#4-pola-loginregister)
5. [Sistem Warna dan Styling](#5-sistem-warna-dan-styling)
6. [Adaptasi Peran (Role)](#6-adaptasi-peran-role)
7. [Alur Pengguna (User Flow)](#7-alur-pengguna-user-flow)
8. [Validasi Form](#8-validasi-form)
9. [Best Practices](#9-best-practices)
10. [Tips Pengembangan](#10-tips-pengembangan)

## 1. Gambaran Umum

Dokumen ini mencakup pola, struktur layout, dan styling dari fitur autentikasi (login dan register) pada platform MyArchery. Panduan ini berfungsi sebagai referensi untuk pengembangan dan pemeliharaan fitur autentikasi dengan pendekatan yang konsisten, sesuai dengan arsitektur Domain-Driven Modular dengan Role Adaptation Layer.

### Tujuan Dokumentasi
- Memberikan panduan yang jelas untuk implementasi fitur autentikasi
- Memastikan konsistensi desain di seluruh aplikasi
- Membuat dokumentasi referensi untuk onboarding developer baru
- Mempermudah maintenance dan pengembangan fitur autentikasi

## 2. Arsitektur Fitur Autentikasi

Fitur autentikasi mengimplementasikan arsitektur Domain-Driven Modular dengan Role Adaptation Layer sesuai dengan pedoman arsitektur platform MyArchery.

### Pendekatan Route Group `(roles)` vs `(auth)`

MyArchery Platform mengadopsi pendekatan route group `(roles)` daripada `(auth)` untuk struktur folder aplikasi dengan alasan sebagai berikut:

1. **Pemisahan Concern yang Lebih Jelas**
   - Pendekatan `(roles)` mengorganisir rute berdasarkan peran pengguna, bukan hanya fungsionalitas
   - Setiap role memiliki area terpisah yang mencakup seluruh fitur untuk peran tersebut, termasuk halaman autentikasi

2. **Keamanan dan Otorisasi yang Lebih Kuat**
   - Struktur path yang berbasis role (`/admin/*`, `/organizer/*`, `/customer/*`) memudahkan implementasi middleware protection
   - Mengurangi risiko akses silang antar role yang tidak diinginkan

3. **Struktur URL yang Lebih Intuitif**
   - URL seperti `/admin/login` dan `/organizer/login` lebih deskriptif dan menunjukkan tujuan dengan jelas
   - Pattern URL konsisten di seluruh aplikasi (semua akses admin melalui `/admin/*`)

4. **Konsistensi dengan Arsitektur Role Adaptation Layer**
   - Mendukung prinsip role adaptation layer dengan memisahkan UI dan fungsionalitas berdasarkan peran
   - Memungkinkan pengembangan UI yang sepenuhnya khusus untuk setiap peran

5. **Skalabilitas**
   - Lebih mudah menambahkan fitur baru untuk peran tertentu tanpa mempengaruhi rute lain
   - Mendukung penambahan role baru di masa depan tanpa perubahan struktur besar

Implementasi role-based routing ini merupakan pilihan yang lebih baik dibandingkan dengan pendekatan parameter-based (seperti `/login?role=admin`) karena memberikan pemisahan yang lebih bersih dalam codebase, URL yang lebih bermakna, dan perlindungan rute yang lebih kuat.

### Hubungan antara `features/auth` dan Route Group `(roles)`

Perlu dipahami bahwa dalam arsitektur MyArchery terdapat pembedaan penting antara:

1. **Pengorganisasian Domain Bisnis** - Folder `features/auth`
2. **Struktur Routing Aplikasi** - Folder `app/(roles)/...`

Keduanya memiliki tujuan berbeda namun bekerja sama dalam arsitektur aplikasi:

#### `features/auth`: Domain Bisnis Autentikasi

Folder `features/auth` berada dalam struktur **domain bisnis** aplikasi mengikuti prinsip Domain-Driven Design:

- `features/` berisi domain bisnis yang diorganisir berdasarkan fitur atau kemampuan aplikasi
- `auth/` adalah domain fitur untuk semua operasi terkait autentikasi (login, register, reset password)

Domain autentikasi mencakup **logika universal untuk semua peran** karena fungsi core seperti login, register, dan verifikasi adalah konsep yang berlaku untuk semua pengguna terlepas dari perannya.

#### `app/(roles)/`: Struktur Routing untuk UI

Folder `app/(roles)/` berada dalam struktur **routing Next.js** yang menentukan:

- URL yang tersedia dalam aplikasi (misalnya `/admin/login`)
- Halaman mana yang ditampilkan untuk URL tertentu 
- Bagaimana rute dikelompokkan untuk middleware dan proteksi

Pendekatan role-based routing digunakan di sini karena ini adalah **titik akses UI** yang spesifik untuk setiap peran.

#### Alur Data dan Kolaborasi

Struktur ini mengimplementasikan arsitektur **Client-Domain-Routing** di mana:

```
┌─────────────────────┐      ┌─────────────────────┐      ┌─────────────────────┐
│   app/(roles)/...   │      │  features/auth/     │      │  lib/supabase       │
│   (Routing Layer)   │─────▶│  (Domain Layer)     │─────▶│  (Data Layer)       │
└─────────────────────┘      └─────────────────────┘      └─────────────────────┘
         ▲                            │
         │                            │
         │                            ▼
┌─────────────────────┐      ┌─────────────────────┐
│ components/auth/... │      │ features/auth/      │
│ (UI Components)     │◀─────│ adapters/...        │
└─────────────────────┘      │ (Adaptation Layer)  │
                             └─────────────────────┘
```

Contoh alur ketika user mengakses `/admin/login`:

1. User mengakses URL `/admin/login`
2. Next.js merender `app/(roles)/admin/login/page.tsx`
3. Page component memuat `AdminLoginAdapter`
4. `AdminLoginAdapter` menggunakan komponen UI `LoginForm` dengan props khusus admin
5. `LoginForm` menggunakan `useAuthService` hook dari domain auth
6. `useAuthService` memanggil `AuthService.login()` dari domain autentikasi
7. Setelah login berhasil, adapter melakukan verifikasi role dan redirect

Ini menunjukkan bagaimana pendekatan route group `(roles)` dan domain bisnis `features/auth` saling melengkapi dan bukan bertentangan satu sama lain. Keduanya bekerja bersama dalam layer berbeda dari arsitektur aplikasi.

### Struktur Folder

```
src/
├── features/
│   └── auth/                    # Domain fitur autentikasi
│       ├── core/                # Logika bisnis autentikasi
│       │   ├── models/          # Tipe dan interface
│       │   │   ├── auth.ts      # Model autentikasi (LoginCredentials, RegisterData, dll)
│       │   │   └── index.ts     # Export untuk models
│       │   ├── services/        # Business logic
│       │   │   ├── auth-service.ts  # Service autentikasi
│       │   │   └── index.ts     # Export untuk services
│       │   └── hooks/           # Custom hooks
│       │       ├── useAuthService.ts # Hook untuk autentikasi
│       │       └── index.ts     # Export untuk hooks
│       ├── components/          # Komponen UI yang dapat digunakan ulang
│       │   ├── LoginForm.tsx    # Form login yang reusable
│       │   ├── RegisterForm.tsx # Form register yang reusable
│       │   └── index.ts         # Export untuk komponen
│       └── adapters/            # Role adaptation layer
│           ├── LoginAdapter.tsx # Generic adapter untuk login
│           ├── admin/           # Adaptasi untuk admin
│           │   └── AdminLoginAdapter.tsx
│           ├── organizer/       # Adaptasi untuk penyelenggara
│           │   └── OrganizerLoginAdapter.tsx
│           └── customer/        # Adaptasi untuk pelanggan
│               └── CustomerLoginAdapter.tsx
├── components/
│   └── auth/                    # Komponen reusable untuk autentikasi
│       ├── LoginForm.tsx        # Form login yang digunakan di UI
│       └── RegisterForm.tsx     # Form register yang digunakan di UI
├── app/
│   └── (roles)/                 # Rute berbasis peran
│       ├── admin/               # Rute khusus admin
│       │   └── login/           # Halaman login admin
│       │       └── page.tsx     # Root component halaman login admin
│       ├── organizer/           # Rute khusus organizer
│       │   └── login/           # Halaman login organizer
│       │       └── page.tsx     # Root component halaman login organizer
│       └── customer/            # Rute khusus customer
│           └── login/           # Halaman login customer
│               └── page.tsx     # Root component halaman login customer
│   └── register/                # Halaman register umum
│       └── page.tsx             # Root component halaman register
└── lib/
    └── supabase/                # Integrasi Supabase
        └── client.ts            # Client untuk autentikasi
```

### Komponen Utama

1. **Core Layer**
   - `AuthService`: Menangani operasi autentikasi seperti login, register, dan logout
   - `useAuthService`: Custom hook yang memungkinkan komponen React untuk mengakses fungsi autentikasi

2. **Role Adaptation Layer**
   - Adapters yang menyediakan UI dan logika autentikasi spesifik untuk setiap peran (admin, organizer, customer)

3. **Pages Layer**
   - Halaman login dan register yang menerapkan Role Adapters yang sesuai berdasarkan parameter peran

## 3. Struktur Komponen

### Core Services
```typescript
// features/auth/core/services/auth-service.ts
import { supabase } from '@/lib/supabase/client';
import { LoginCredentials, RegisterData, AuthResponse } from '../models';

export const AuthService = {
  async login({ email, password }: LoginCredentials): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);
      return { user: data.user, session: data.session };
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: { 
          data: { 
            role: userData.role,
            full_name: userData.fullName
          }
        }
      });

      if (error) throw new Error(error.message);
      return { user: data.user, session: data.session };
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  },

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(`Logout failed: ${error.message}`);
  },

  async resetPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw new Error(`Password reset failed: ${error.message}`);
  }
};
```

### Custom Hooks
```typescript
// features/auth/core/hooks/useAuthService.ts
import { useState } from 'react';
import { AuthService } from '../services/auth-service';
import { LoginCredentials, RegisterData, AuthResponse } from '../models';

export function useAuthService() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuthService.login(credentials);
      return response;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuthService.register(userData);
      return response;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await AuthService.logout();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    register,
    logout,
    isLoading,
    error
  };
}
```

### Reusable Login Component
```tsx
// features/auth/components/LoginForm.tsx
import { useState } from 'react';
import { useAuthService } from '../core/hooks/useAuthService';

interface LoginFormProps {
  onSuccess?: (user: any) => void;
  isAdminLogin?: boolean;
  isOrganizerLogin?: boolean;
  isCustomerLogin?: boolean;
}

export function LoginForm({ 
  onSuccess, 
  isAdminLogin = false,
  isOrganizerLogin = false,
  isCustomerLogin = false 
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login, isLoading, error } = useAuthService();

  // Determine role-specific classes
  const accentColor = isAdminLogin 
    ? 'bg-purple-600 hover:bg-purple-700' 
    : isOrganizerLogin 
      ? 'bg-blue-600 hover:bg-blue-700' 
      : 'bg-green-600 hover:bg-green-700';

  // Determine role-specific form title
  const formTitle = isAdminLogin 
    ? 'Admin Login' 
    : isOrganizerLogin 
      ? 'Organizer Login' 
      : 'Archer Login';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login({ email, password });
    if (result && onSuccess) {
      onSuccess(result.user);
    }
  };

  return (
    <div className="w-full max-w-md p-8 md:p-12 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">{formTitle}</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 h-12 bg-slate-100 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 h-12 bg-slate-100 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>
        
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full h-12 flex justify-center items-center ${accentColor} text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${isLoading ? 'opacity-70' : ''}`}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Sign In'
          )}
        </button>
        
        {isCustomerLogin && (
          <div className="text-center text-sm">
            Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Sign up</a>
          </div>
        )}
      </form>
    </div>
  );
}
```

## 4. Pola Login/Register

### Struktur Layout

Fitur login dan register menggunakan struktur layout split-screen yang konsisten:

```
+---------------------------+---------------------------+
|                           |                           |
|                           |     Role-specific         |
|      Login Form           |     branding dan          |
|                           |     content               |
|                           |                           |
+---------------------------+---------------------------+
```

1. **Sisi Kiri**: 
   - Form login atau register
   - Latar belakang putih
   - Styling konsisten dengan rounded corners dan shadow
   - Komponen yang reusable

2. **Sisi Kanan**:
   - Warna background spesifik sesuai role (Admin: Purple, Organizer: Blue, Customer: Green)
   - Konten marketing yang menjelaskan manfaat untuk role tersebut
   - Logo dan elemen branding MyArchery

### Responsivitas

Layout mengubah urutan elemen pada tampilan mobile:

1. **Desktop**:
   - Grid dengan dua kolom sejajar
   - Formulir di sebelah kiri, branding di sebelah kanan

2. **Mobile**:
   - Stack secara vertikal
   - Branding di atas, formulir di bawah
   - Implementasi dengan class: `order-2 md:order-1` dan `order-1 md:order-2`

## 5. Sistem Warna dan Styling

### Warna Spesifik Role

Warna aksen disesuaikan berdasarkan peran pengguna:

- **Admin**: 
  - Primary: Purple (`#8B5CF6` / `bg-purple-600`)
  - Gradient: `bg-gradient-to-br from-purple-900 to-purple-700`

- **Organizer**: 
  - Primary: Blue (`#3B82F6` / `bg-blue-600`)
  - Gradient: `bg-gradient-to-br from-blue-800 to-blue-600`

- **Customer**: 
  - Primary: Green (`#10B981` / `bg-green-600`)
  - Gradient: `bg-gradient-to-br from-green-800 to-green-600`

### Konsistensi Styling Form

Form menjaga konsistensi dengan pola berikut:

- **Container**:
  - Padding: `p-8 md:p-12`
  - Background: `bg-white`
  - Border Radius: `rounded-lg`
  - Shadow: `shadow-lg`

- **Heading**:
  - Font Size: `text-2xl`
  - Font Weight: `font-bold`
  - Text Align: `text-center`
  - Margin Bottom: `mb-6`

- **Input Fields**:
  - Height: `h-12`
  - Padding: `px-4 py-2`
  - Background: `bg-slate-100`
  - Border: `border border-slate-200`
  - Border Radius: `rounded-md`
  - Focus State: `focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white`

- **Labels**:
  - Font Size: `text-sm`
  - Font Weight: `font-medium`
  - Color: `text-gray-700`

- **Button**:
  - Width: `w-full`
  - Height: `h-12`
  - Border Radius: `rounded-md`
  - Font Weight: `font-medium`
  - Transition: `transition-colors`
  - Focus: `focus:outline-none focus:ring-2 focus:ring-offset-2`

- **Error Messages**:
  - Background: `bg-red-50`
  - Text Color: `text-red-500`
  - Padding: `p-3`
  - Border Radius: `rounded-md`
  - Font Size: `text-sm`

## 6. Adaptasi Peran (Role)

### Admin Login Adapter

```tsx
// features/auth/adapters/admin/AdminLoginAdapter.tsx
import { useRouter } from 'next/navigation';
import { LoginForm } from '../../components/LoginForm';

export function AdminLoginAdapter() {
  const router = useRouter();
  
  const handleLoginSuccess = (user: any) => {
    // Verifikasi bahwa user memiliki role 'admin'
    if (user.user_metadata?.role !== 'admin') {
      // Handle unauthorized access
      return;
    }
    
    // Redirect ke dashboard admin
    router.push('/admin/dashboard');
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center p-4 md:p-8 order-2 md:order-1">
        <LoginForm
          onSuccess={handleLoginSuccess}
          isAdminLogin={true}
        />
      </div>
      
      <div className="flex flex-col justify-center p-8 bg-gradient-to-br from-purple-900 to-purple-700 text-white order-1 md:order-2">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Admin Portal
          </h1>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="mt-1 bg-white bg-opacity-20 p-2 rounded-full">
                {/* Icon */}
              </div>
              <div>
                <h3 className="font-medium">Comprehensive Control</h3>
                <p className="text-sm opacity-90">Manage all aspects of the MyArchery platform</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="mt-1 bg-white bg-opacity-20 p-2 rounded-full">
                {/* Icon */}
              </div>
              <div>
                <h3 className="font-medium">User Management</h3>
                <p className="text-sm opacity-90">Administer user accounts and permissions</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="mt-1 bg-white bg-opacity-20 p-2 rounded-full">
                {/* Icon */}
              </div>
              <div>
                <h3 className="font-medium">Platform Insights</h3>
                <p className="text-sm opacity-90">Access comprehensive analytics and reports</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Organizer dan Customer Login Adapters

Adapter untuk Organizer dan Customer mengikuti pola yang sama dengan perubahan pada:
- Warna sesuai role
- Konten marketing yang spesifik
- Redirect destination yang berbeda
- Verifikasi role yang sesuai

## 7. Alur Pengguna (User Flow)

### Login Flow

1. User mengakses URL login sesuai peran:
   - Admin: `/admin/login`
   - Organizer: `/organizer/login` 
   - Customer: `/customer/login`

2. Server component melakukan pengecekan apakah user sudah login
   - Jika sudah, redirect ke dashboard sesuai role
   - Jika belum, tampilkan halaman login yang sesuai dengan role

3. User memasukkan credentials (email dan password)

4. Client mengirim request ke Supabase Auth API melalui AuthService

5. Jika berhasil:
   - User metadata (termasuk role) diperiksa
   - Redirect ke dashboard sesuai role:
     - Admin: `/admin/dashboard`
     - Organizer: `/organizer/dashboard`
     - Customer: `/customer/dashboard`

6. Jika gagal:
   - Tampilkan pesan error
   - User dapat mencoba kembali

### Register Flow

1. User mengakses URL register sesuai peran:
   - Customer: `/register` atau `/register/customer`
   - Organizer: `/register/organizer`

2. Server component melakukan pengecekan apakah user sudah login
   - Jika sudah, redirect ke dashboard sesuai role
   - Jika belum, tampilkan form register yang sesuai

3. User mengisi data registrasi (nama, email, password, role)

4. Form melakukan validasi client-side

5. Data dikirim ke Supabase Auth API

6. Jika berhasil:
   - User diarahkan ke halaman verifikasi email atau langsung ke dashboard
   - Role disimpan dalam user_metadata

7. Jika gagal:
   - Tampilkan pesan error
   - User dapat mencoba kembali

### Middleware dan Route Protection

Semua rute spesifik role dilindungi oleh middleware yang memeriksa:

1. Apakah user sudah login (melalui verifikasi session Supabase)

2. Apakah role user sesuai dengan segment path utama URL:
   - Rute `/admin/*` hanya bisa diakses role "admin"
   - Rute `/organizer/*` hanya bisa diakses role "organizer"
   - Rute `/customer/*` hanya bisa diakses role "customer"

3. Implementasi dalam `middleware.ts`:
   ```typescript
   // Contoh implementasi middleware protection
   export async function middleware(request: NextRequest) {
     const { pathname } = request.nextUrl;
     
     // Periksa apakah ini adalah route yang protected
     const isAdminRoute = pathname.startsWith('/admin');
     const isOrganizerRoute = pathname.startsWith('/organizer');
     const isCustomerRoute = pathname.startsWith('/customer');
     
     // Jika bukan protected route, lanjutkan
     if (!isAdminRoute && !isOrganizerRoute && !isCustomerRoute) {
       return NextResponse.next();
     }
     
     // Get session dan periksa apakah user logged in
     const supabase = createMiddlewareClient({ cookies });
     const { data: { session } } = await supabase.auth.getSession();
     
     if (!session) {
       // Redirect ke login page yang sesuai
       if (isAdminRoute) return NextResponse.redirect(new URL('/admin/login', request.url));
       if (isOrganizerRoute) return NextResponse.redirect(new URL('/organizer/login', request.url));
       if (isCustomerRoute) return NextResponse.redirect(new URL('/customer/login', request.url));
     }
     
     // Periksa apakah role user sesuai dengan route
     const userRole = session.user.user_metadata?.role;
     
     if (isAdminRoute && userRole !== 'admin') {
       return NextResponse.redirect(new URL('/unauthorized', request.url));
     }
     
     if (isOrganizerRoute && userRole !== 'organizer') {
       return NextResponse.redirect(new URL('/unauthorized', request.url));
     }
     
     if (isCustomerRoute && userRole !== 'customer') {
       return NextResponse.redirect(new URL('/unauthorized', request.url));
     }
     
     // User memiliki role yang sesuai, lanjutkan
     return NextResponse.next();
   }
   ```

4. Implementasi ini memastikan:
   - Pengguna yang belum login akan diarahkan ke halaman login yang sesuai
   - Pengguna yang sudah login hanya dapat mengakses area yang sesuai dengan role mereka
   - Pengguna yang mencoba mengakses area yang tidak sesuai dengan role akan diarahkan ke halaman unauthorized

## 8. Validasi Form

### Validasi Login Form

- **Email**: Tidak boleh kosong, format email valid
- **Password**: Tidak boleh kosong

### Validasi Register Form

- **Full Name**: Minimal 3 karakter
- **Email**: Format email valid
- **Password**: Minimal 8 karakter
- **Confirm Password**: Harus sama dengan password
- **Terms Agreement**: Harus dicentang

### Implementasi Validasi Client-Side 

```typescript
// Contoh validasi register form
const validate = () => {
  const errors: Record<string, string> = {};
  
  if (fullName.trim().length < 3) {
    errors.fullName = 'Full name must be at least 3 characters';
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  
  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  if (!agreeToTerms) {
    errors.agreeToTerms = 'You must agree to the terms and conditions';
  }
  
  setValidationErrors(errors);
  return Object.keys(errors).length === 0;
};
```

## 9. Best Practices

### Shared Components

- Gunakan komponen reusable untuk form login dan register
- Implementasikan props untuk kustomisasi spesifik role
- Periksa role user sebelum redirect

### Role-Specific Styling

- Gunakan variabel warna untuk setiap role
- Terapkan warna secara konsisten di seluruh aplikasi
- Gunakan Tailwind classes untuk konsistensi

### Security

- Lakukan validasi client-side sebelum mengirim request
- Verifikasi role di server-side setelah login
- Implementasikan middleware untuk proteksi rute
- Jangan simpan data sensitif di local storage

### Error Handling

- Tampilkan pesan error yang jelas dan membantu
- Jangan tampilkan error teknis ke pengguna
- Log error untuk debugging

### Performance

- Gunakan form libraries ringan seperti react-hook-form
- Lakukan lazy loading untuk komponen yang tidak langsung dibutuhkan
- Implementasikan optimistic UI untuk pengalaman yang lebih responsif

## 10. Tips Pengembangan

### Kustomisasi dan Ekstensi

1. **Menambahkan Social Login**
   - Tambahkan metode social login di AuthService
   - Tambahkan tombol social login di component LoginForm
   - Gunakan warna yang konsisten dengan branding platform social

2. **Menambahkan Role Baru**
   - Duplikasi dan modifikasi adapter yang ada
   - Sesuaikan warna dan konten untuk role baru
   - Update middleware untuk proteksi rute

3. **Mengubah Styling**
   - Ubah variabel warna di theme
   - Update classes Tailwind di komponen
   - Pastikan perubahan konsisten di seluruh aplikasi

### Debugging

1. **Masalah Autentikasi**
   - Periksa session di Supabase dashboard
   - Verifikasi route protection di middleware
   - Periksa error di browser console

2. **Masalah UI**
   - Gunakan React DevTools untuk memeriksa props dan state
   - Verifikasi responsivitas dengan DevTools Mobile View
   - Periksa konsistensi style dengan design system

### Testing

1. **Unit Testing**
   - Test AuthService dengan mock untuk Supabase
   - Test validasi form

2. **Integration Testing**
   - Test alur autentikasi end-to-end
   - Test form submission dan handling response
   - Test redirect setelah login berhasil

3. **Accessibility Testing**
   - Verifikasi bahwa form dapat diakses dengan keyboard
   - Pastikan color contrast sesuai standar WCAG
   - Test dengan screen reader