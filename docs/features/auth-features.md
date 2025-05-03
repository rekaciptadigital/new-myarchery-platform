# Fitur Autentikasi MyArchery Platform

> **Dokumen ini dibuat pada:** 27 April 2025, 10:00 WIB  
> **Terakhir diperbarui:** 3 May 2025, 16:45 WIB

## Daftar Isi
1. [Gambaran Umum](#1-gambaran-umum)
2. [Arsitektur Fitur Autentikasi dengan FCDDA](#2-arsitektur-fitur-autentikasi-dengan-fcdda)
3. [Struktur Folder dan Organisasi Kode](#3-struktur-folder-dan-organisasi-kode)
4. [Domain Models dan Validasi](#4-domain-models-dan-validasi)
5. [Repository dan Service Layer](#5-repository-dan-service-layer)
6. [Custom Hooks dan State Management](#6-custom-hooks-dan-state-management)
7. [Variants dan Role-Specific UI](#7-variants-dan-role-specific-ui)
8. [Implementasi Sistem Warna dan Styling](#8-implementasi-sistem-warna-dan-styling)
9. [Alur Autentikasi dan Validasi](#9-alur-autentikasi-dan-validasi)
10. [Row Level Security dan Keamanan](#10-row-level-security-dan-keamanan)
11. [Best Practices dan Patterns](#11-best-practices-dan-patterns)
12. [Panduan Implementasi dan Replikasi](#12-panduan-implementasi-dan-replikasi)

## 1. Gambaran Umum

Dokumen ini menjelaskan implementasi fitur autentikasi pada MyArchery Platform menggunakan pendekatan **Feature-Clustered Domain-Driven Architecture (FCDDA)** dengan **Simplified Variant Clustering**. Dokumen ini berfungsi sebagai panduan komprehensif untuk pengembangan dan replikasi fitur autentikasi yang konsisten di seluruh aplikasi.

### Tujuan Dokumentasi
- Memberikan panduan yang jelas untuk implementasi fitur autentikasi dengan FCDDA
- Memastikan konsistensi desain dan logic di seluruh aplikasi
- Menyediakan blueprint lengkap untuk replikasi fitur autentikasi
- Mendukung developer dalam mengimplementasikan pendekatan role-based
- Memfasilitasi maintainability dan extensibility jangka panjang

## 2. Arsitektur Fitur Autentikasi dengan FCDDA

Fitur autentikasi mengimplementasikan arsitektur **Feature-Clustered Domain-Driven Architecture (FCDDA)** dengan **Simplified Variant Clustering**, yang merupakan evolusi dari pendekatan Domain-Driven Modular dengan Role Adaptation Layer.

### Perbandingan dengan Arsitektur Sebelumnya

#### Arsitektur Sebelumnya:
```
src/features/auth/
├── core/                # Domain logic
│   ├── models/
│   ├── services/
│   └── hooks/
├── components/          # Shared UI components
└── adapters/            # Role adaptation layer
    ├── admin/
    ├── organizer/
    └── customer/
```

#### Arsitektur FCDDA Baru:
```
src/features/auth/
├── models/              # Domain models
├── services/            # Business logic
├── repository.ts        # Data access abstraction
├── hooks/               # React hooks untuk auth
├── utils/               # Auth-specific utils
└── variants/            # Simplified variant clustering
    ├── admin/           # Admin variant
    │   ├── model.ts     # Admin-specific model extensions
    │   ├── service.ts   # Admin-specific services
    │   ├── hook.ts      # Admin-specific hooks
    │   └── ui.tsx       # Admin UI implementation
    ├── organizer/       # Organizer variant
    │   └── [same structure]
    └── customer/        # Customer variant
        └── [same structure]
```

### Keunggulan Arsitektur Baru:

1. **Domain-Driven Centralization** - Domain model dan validasi berada di level feature
2. **Simplified Variant Clustering** - Semua variant-specific code (model, service, hook, UI) berada dalam folder variants
3. **Repository Pattern** - Data access abstraction terpusat di repository.ts
4. **Clear Separation of Concerns** - Pemisahan yang jelas antara domain logic, data access, dan UI
5. **Improved Testability** - Dependency inversion memudahkan testing dan mocking
6. **Model-Driven Approach** - Domain model menjadi pusat arsitektur

## 3. Struktur Folder dan Organisasi Kode

### 3.1 Struktur Folder Lengkap

```
src/features/auth/
├── models/                # Domain models
│   ├── user.ts            # User entity model
│   ├── credentials.ts     # Login credentials model
│   ├── validation.ts      # Domain validation rules
│   └── index.ts           # Public exports
│
├── services/              # Business logic
│   ├── auth-service.ts    # Core authentication service
│   ├── token-service.ts   # Token management
│   └── index.ts           # Public exports
│
├── repository.ts          # Data access abstraction
│
├── hooks/                 # React hooks
│   ├── useAuthService.ts  # Core auth hook
│   ├── useSession.ts      # Session management
│   └── index.ts           # Public exports
│
├── utils/                 # Utility functions
│   ├── token.ts           # Token parsing & validation
│   ├── storage.ts         # Local storage helpers
│   └── index.ts           # Public exports
│
└── variants/              # Role-specific implementations
    ├── admin/             # Admin variant
    │   ├── model.ts       # Admin-specific model extensions
    │   ├── service.ts     # Admin auth services
    │   ├── hook.ts        # Admin auth hooks
    │   └── ui.tsx         # Admin login UI
    │
    ├── organizer/         # Organizer variant
    │   └── [same structure]
    │
    └── customer/          # Customer variant
        └── [same structure]
```

### 3.2 Integration dengan App Router

```
src/app/(roles)/
├── admin/
│   └── login/
│       └── page.tsx       # Imports from auth/variants/admin/ui.tsx
│
├── organizer/
│   └── login/
│       └── page.tsx       # Imports from auth/variants/organizer/ui.tsx
│
└── customer/
    └── login/
        └── page.tsx       # Imports from auth/variants/customer/ui.tsx
```

### 3.3 Shared UI Components Integration

```
src/shared/
└── ui/
    └── auth/              # Shared auth UI components
        ├── AuthLayout.tsx # Common auth layout
        ├── InputField.tsx # Reusable input component
        └── LoginForm.tsx  # Base login form
```

## 4. Domain Models dan Validasi

Domain model merupakan pusat arsitektur, mendefinisikan entitas dan aturan bisnis terkait autentikasi.

### 4.1 User Model

```typescript
// features/auth/models/user.ts
export enum UserRole {
  ADMIN = "admin",
  ORGANIZER = "organizer",
  CUSTOMER = "customer"
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  role: UserRole;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// Domain methods
export function isAdmin(user: User): boolean {
  return user.role === UserRole.ADMIN;
}

export function isOrganizer(user: User): boolean {
  return user.role === UserRole.ORGANIZER;
}

export function isCustomer(user: User): boolean {
  return user.role === UserRole.CUSTOMER;
}
```

### 4.2 Login Credentials Model

```typescript
// features/auth/models/credentials.ts
import { UserRole } from './user';

export interface LoginCredentials {
  email: string;
  password: string;
  role?: UserRole;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error?: string;
}

export interface Session {
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
}
```

### 4.3 Validation Rules

```typescript
// features/auth/models/validation.ts
import { LoginCredentials } from './credentials';
import { UserRole } from './user';

export function validateCredentials(credentials: LoginCredentials): string[] {
  const errors: string[] = [];
  
  if (!credentials.email) {
    errors.push('Email is required');
  } else if (!/^\S+@\S+\.\S+$/.test(credentials.email)) {
    errors.push('Email format is invalid');
  }
  
  if (!credentials.password) {
    errors.push('Password is required');
  } else if (credentials.password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  
  // Role validation is optional
  if (credentials.role && !Object.values(UserRole).includes(credentials.role)) {
    errors.push('Invalid role specified');
  }
  
  return errors;
}
```

## 5. Repository dan Service Layer

Repository layer mengabstraksi interaksi dengan Supabase, dan Service layer mengimplementasikan logika bisnis.

### 5.1 Repository Implementation

```typescript
// features/auth/repository.ts
import { supabase } from '@/lib/supabase/client';
import { LoginCredentials, AuthResponse } from './models/credentials';
import { User, UserRole } from './models/user';

export const AuthRepository = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw new Error(error.message);
      
      return { 
        user: data.user ? mapToUserModel(data.user) : null, 
        session: data.session 
      };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  
  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  },
  
  async getCurrentUser(): Promise<User | null> {
    const { data } = await supabase.auth.getUser();
    return data?.user ? mapToUserModel(data.user) : null;
  },
  
  async getSession(): Promise<Session | null> {
    const { data } = await supabase.auth.getSession();
    return data?.session || null;
  }
};

// Helper to map Supabase user to our domain model
function mapToUserModel(supabaseUser: any): User {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email,
    displayName: supabaseUser.user_metadata?.display_name,
    role: supabaseUser.user_metadata?.role || UserRole.CUSTOMER,
    metadata: supabaseUser.user_metadata,
    createdAt: supabaseUser.created_at,
    updatedAt: supabaseUser.updated_at
  };
}
```

### 5.2 Auth Service Implementation

```typescript
// features/auth/services/auth-service.ts
import { LoginCredentials, AuthResponse } from '../models/credentials';
import { validateCredentials } from '../models/validation';
import { AuthRepository } from '../repository';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Domain validation
    const errors = validateCredentials(credentials);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
    
    const response = await AuthRepository.login(credentials);
    
    // Role verification if specified
    if (credentials.role && response.user?.role !== credentials.role) {
      throw new Error(`Unauthorized: User does not have ${credentials.role} role`);
    }
    
    return response;
  }
  
  static async logout(): Promise<void> {
    return AuthRepository.logout();
  }
  
  static async getCurrentUser() {
    return AuthRepository.getCurrentUser();
  }
  
  static async getSession() {
    return AuthRepository.getSession();
  }
}
```

### 5.3 Token Service

```typescript
// features/auth/services/token-service.ts
import { Session } from '../models/credentials';
import { parseJwt, isTokenExpired } from '../utils/token';

export class TokenService {
  static getTokenInfo(token: string) {
    return parseJwt(token);
  }
  
  static isSessionValid(session: Session | null): boolean {
    if (!session?.access_token) return false;
    
    // Check if token is expired
    if (session.expires_at && session.expires_at < Date.now() / 1000) {
      return false;
    }
    
    return !isTokenExpired(session.access_token);
  }
  
  static getRoleFromToken(token: string): string | null {
    try {
      const payload = parseJwt(token);
      return payload?.user_metadata?.role || null;
    } catch (e) {
      return null;
    }
  }
}
```

## 6. Custom Hooks dan State Management

Custom hooks menyediakan abstraksi yang mudah digunakan untuk komponen React, dengan pengelolaan state yang konsisten.

### 6.1 Core Auth Hook

```typescript
// features/auth/hooks/useAuthService.ts
import { useState } from 'react';
import { LoginCredentials, AuthResponse } from '../models/credentials';
import { User } from '../models/user';
import { AuthService } from '../services/auth-service';

export function useAuthService() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await AuthService.login(credentials);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await AuthService.logout();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentUser = async (): Promise<User | null> => {
    try {
      return await AuthService.getCurrentUser();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get user';
      setError(errorMessage);
      return null;
    }
  };

  return {
    login,
    logout,
    getCurrentUser,
    isLoading,
    error,
  };
}
```

### 6.2 Session Hook

```typescript
// features/auth/hooks/useSession.ts
import { useState, useEffect } from 'react';
import { Session } from '../models/credentials';
import { User } from '../models/user';
import { AuthService } from '../services/auth-service';
import { TokenService } from '../services/token-service';

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchSessionAndUser = async () => {
      try {
        const sessionData = await AuthService.getSession();
        setSession(sessionData);
        
        if (sessionData && TokenService.isSessionValid(sessionData)) {
          const userData = await AuthService.getCurrentUser();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSessionAndUser();
    
    // Optional: Set up a listener for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setSession(session);
          AuthService.getCurrentUser().then(setUser);
        } else if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
        }
      }
    );
    
    return () => {
      subscription?.unsubscribe();
    };
  }, []);
  
  return {
    session,
    user,
    loading,
    isAuthenticated: !!session && !!user,
  };
}
```

## 7. Variants dan Role-Specific UI

Implementasi UI spesifik untuk setiap role (admin, organizer, customer) menggunakan pendekatan Simplified Variant Clustering.

### 7.1 Admin Variant Implementation

```typescript
// features/auth/variants/admin/model.ts
import { LoginCredentials } from '../../models/credentials';
import { UserRole } from '../../models/user';

export interface AdminLoginCredentials extends LoginCredentials {
  role: UserRole.ADMIN;
}

export const adminBenefits = [
  "Akses ke manajemen pengguna dan role",
  "Pantau dan kelola seluruh event pada platform",
  "Konfigurasi sistem dan pengaturan platform",
  "Akses laporan analitik lengkap"
];
```

```typescript
// features/auth/variants/admin/service.ts
import { AuthService } from '../../services/auth-service';
import { AdminLoginCredentials } from './model';
import { AuthResponse } from '../../models/credentials';

export class AdminAuthService {
  static async login(credentials: Omit<AdminLoginCredentials, 'role'>): Promise<AuthResponse> {
    // Always set role to ADMIN
    const adminCredentials: AdminLoginCredentials = {
      ...credentials,
      role: 'admin'
    };
    
    return AuthService.login(adminCredentials);
  }
}
```

```typescript
// features/auth/variants/admin/hook.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminAuthService } from './service';

export function useAdminAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await AdminAuthService.login({ email, password });
      router.push('/admin/dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    login,
    isLoading,
    error
  };
}
```

```tsx
// features/auth/variants/admin/ui.tsx
import { useState } from 'react';
import { useAdminAuth } from './hook';
import { AuthLayout } from '@/shared/ui/auth/AuthLayout';
import { InputField } from '@/shared/ui/auth/InputField';
import { adminBenefits } from './model';

export function AdminLoginUI() {
  const { login, isLoading, error } = useAdminAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <AuthLayout
      title="Admin Control Panel"
      subtitle="Akses ke manajemen platform MyArchery secara keseluruhan dengan tools dan fitur khusus admin."
      benefits={adminBenefits}
      accentColor="purple"
    >
      <div className="w-full max-w-md">
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          
          <InputField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-medium disabled:bg-purple-300"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
```

### 7.2 Organizer Variant Implementation

```typescript
// features/auth/variants/organizer/model.ts
import { LoginCredentials } from '../../models/credentials';
import { UserRole } from '../../models/user';

export interface OrganizerLoginCredentials extends LoginCredentials {
  role: UserRole.ORGANIZER;
}

export const organizerBenefits = [
  "Kelola event panahan dengan tools lengkap",
  "Pantau pendaftaran dan pembayaran peserta",
  "Akses sistem scoring dan manajemen hasil",
  "Analisis performa event dan statistik peserta"
];
```

```typescript
// features/auth/variants/organizer/service.ts
import { AuthService } from '../../services/auth-service';
import { OrganizerLoginCredentials } from './model';
import { AuthResponse } from '../../models/credentials';

export class OrganizerAuthService {
  static async login(credentials: Omit<OrganizerLoginCredentials, 'role'>): Promise<AuthResponse> {
    // Always set role to ORGANIZER
    const organizerCredentials: OrganizerLoginCredentials = {
      ...credentials,
      role: 'organizer'
    };
    
    return AuthService.login(organizerCredentials);
  }
}
```

```typescript
// features/auth/variants/organizer/hook.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OrganizerAuthService } from './service';

export function useOrganizerAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await OrganizerAuthService.login({ email, password });
      router.push('/organizer/dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    login,
    isLoading,
    error
  };
}
```

```tsx
// features/auth/variants/organizer/ui.tsx
import { useState } from 'react';
import { useOrganizerAuth } from './hook';
import { AuthLayout } from '@/shared/ui/auth/AuthLayout';
import { InputField } from '@/shared/ui/auth/InputField';
import { organizerBenefits } from './model';

export function OrganizerLoginUI() {
  const { login, isLoading, error } = useOrganizerAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <AuthLayout
      title="Organizer Dashboard"
      subtitle="Platform lengkap untuk pengelolaan event panahan dari perencanaan hingga pelaksanaan."
      benefits={organizerBenefits}
      accentColor="blue"
    >
      <div className="w-full max-w-md">
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          
          <InputField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
```

### 7.3 Customer Variant Implementation

```typescript
// features/auth/variants/customer/model.ts
import { LoginCredentials } from '../../models/credentials';
import { UserRole } from '../../models/user';

export interface CustomerLoginCredentials extends LoginCredentials {
  role: UserRole.CUSTOMER;
}

export const customerBenefits = [
  "Daftar event panahan dengan mudah",
  "Akses informasi event terbaru",
  "Pantau skor dan ranking Anda",
  "Kelola profil dan data atlet Anda"
];
```

```typescript
// features/auth/variants/customer/service.ts
import { AuthService } from '../../services/auth-service';
import { CustomerLoginCredentials } from './model';
import { AuthResponse } from '../../models/credentials';

export class CustomerAuthService {
  static async login(credentials: Omit<CustomerLoginCredentials, 'role'>): Promise<AuthResponse> {
    // Always set role to CUSTOMER
    const customerCredentials: CustomerLoginCredentials = {
      ...credentials,
      role: 'customer'
    };
    
    return AuthService.login(customerCredentials);
  }
}
```

```typescript
// features/auth/variants/customer/hook.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CustomerAuthService } from './service';

export function useCustomerAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await CustomerAuthService.login({ email, password });
      router.push('/customer/dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    login,
    isLoading,
    error
  };
}
```

```tsx
// features/auth/variants/customer/ui.tsx
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useCustomerAuth } from './hook';
import { AuthLayout } from '@/shared/ui/auth/AuthLayout';
import { InputField } from '@/shared/ui/auth/InputField';
import { customerBenefits } from './model';

export function CustomerLoginUI() {
  const { login, isLoading, error } = useCustomerAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <AuthLayout
      title="Akun Pengguna MyArchery"
      subtitle="Akses ke platform event panahan dengan fitur lengkap untuk peserta dan penggemar panahan."
      benefits={customerBenefits}
      accentColor="green"
    >
      <div className="w-full max-w-md">
        <div className="mb-4">
          <Link href="/" className="text-slate-600 hover:text-slate-800 flex items-center text-sm font-medium">
            <ArrowLeft size={16} className="mr-1" />
            Kembali ke halaman utama
          </Link>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          
          <InputField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium disabled:bg-green-300"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Belum punya akun?{" "}
              <Link href="/customer/register" className="text-green-600 hover:text-green-500 font-medium">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
```

## 8. Implementasi Sistem Warna dan Styling

Komponen UI yang memiliki stok bersama dipindahkan ke shared UI components.

### 8.1 Shared Auth Layout

```tsx
// shared/ui/auth/AuthLayout.tsx
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  benefits: string[];
  accentColor?: "green" | "blue" | "purple";
}

export function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  benefits, 
  accentColor = "purple" 
}: Readonly<AuthLayoutProps>) {
  // Color mapping for different roles
  const colorMap = {
    green: {
      gradient: "bg-gradient-to-br from-green-500 to-green-600",
      highlight: "text-yellow-300",
      checkBg: "bg-green-400",
      text: "text-green-50",
      textHighlight: "text-green-100"
    },
    blue: {
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
      highlight: "text-blue-300",
      checkBg: "bg-blue-500", // Slightly different from admin/customer
      text: "text-blue-50",
      textHighlight: "text-blue-100"
    },
    purple: {
      gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
      highlight: "text-purple-300",
      checkBg: "bg-purple-400",
      text: "text-purple-50",
      textHighlight: "text-purple-100"
    }
  };
  
  const colors = colorMap[accentColor];
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow grid md:grid-cols-2 items-stretch w-full">
        {/* Left column with login form */}
        <div className="flex items-center justify-center bg-white p-8 md:p-12 order-2 md:order-1">
          {children}
        </div>
        
        {/* Right column with colored background */}
        <div className={`${colors.gradient} text-white p-8 md:p-12 flex items-center justify-center order-1 md:order-2`}>
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {title.split(" ").map((word, i, arr) => 
                i === arr.length - 1 ? 
                  <span key={`title-word-${word}-${i}`} className={colors.highlight}>{word} </span> : 
                  <span key={`title-word-${word}-${i}`}>{word} </span>
              )}
            </h1>
            <p className={`text-lg ${colors.textHighlight} mb-8`}>
              {subtitle}
            </p>
            <div className="space-y-4">
              {benefits.map((benefit) => (
                <div key={`benefit-${benefit}`} className="flex items-center">
                  <div className={`${colors.checkBg} p-2 rounded-full mr-3`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className={colors.text}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
```

### 8.2 Shared Input Field

```tsx
// shared/ui/auth/InputField.tsx
interface InputFieldProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export function InputField({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  error,
  required,
  className
}: InputFieldProps) {
  return (
    <div className={`space-y-2 ${className || ''}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
          error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        }`}
        placeholder={placeholder}
        required={required}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
```

### 8.3 Styling System Overview

Sistem warna pada fitur auth diimplementasikan dengan pendekatan konsisten:

1. **Role-Specific Colors**:
   - **Admin**: Ungu (`purple`) - `bg-gradient-to-br from-purple-500 to-purple-600`
   - **Organizer**: Biru (`blue`) - `bg-gradient-to-br from-blue-500 to-blue-600`
   - **Customer**: Hijau (`green`) - `bg-gradient-to-br from-green-500 to-green-600`

2. **Typography**:
   - **Headings**: `text-4xl md:text-5xl font-bold` dengan kata terakhir di-highlight
   - **Subtitles**: `text-lg` dengan warna sesuai role
   - **Body**: Default styling dengan kontras tinggi terhadap background

3. **Spacing**:
   - **Container**: `p-8 md:p-12` - responsive padding
   - **Vertical rhythm**: `mb-4` (heading → subtitle), `mb-8` (subtitle → content), `space-y-4` (list)

4. **Icons**:
   - Container: `p-2 rounded-full` dengan background color dinamis
   - Icon: `h-5 w-5 text-white`

5. **Responsiveness**:
   - **Mobile**: Single column dengan branding di atas, form di bawah
   - **Desktop**: Two columns dengan form kiri, branding kanan
   - **Spacing & Typography**: Adaptive berdasarkan viewport

## 9. Alur Autentikasi dan Validasi

### 9.1 Alur Login

1. **User mengakses URL login role-specific**
   - `/admin/login`
   - `/organizer/login`
   - `/customer/login`

2. **Next.js App Router merender UI component sesuai role**
   - `app/(roles)/admin/login/page.tsx` → `AdminLoginUI`
   - `app/(roles)/organizer/login/page.tsx` → `OrganizerLoginUI`
   - `app/(roles)/customer/login/page.tsx` → `CustomerLoginUI`

3. **User mengisi form dan submit**
   - Email dan password input dikirim ke role-specific hook
   - Hook memanggil service dengan role yang sudah ditentukan
   - Service melakukan validasi domain dan memanggil repository
   - Repository berkomunikasi dengan Supabase

4. **Role verification**
   - Service memverifikasi bahwa user memiliki role yang sesuai
   - RLS di database membatasi akses berdasarkan role

5. **Error handling atau redirect**
   - Jika sukses, user diredirect ke dashboard sesuai role
   - Jika gagal, pesan error ditampilkan

### 9.2 Validasi Input

1. **Client-Side Validation**
   - Required fields (HTML5 validation)
   - Email format (type="email")
   - State management untuk error display

2. **Domain-Level Validation**
   - Model validation rules seperti format email dan password length
   - Spesifik validasi per role jika diperlukan

3. **Service-Level Validation**
   - Validasi role-specific (role matching)
   - Business rules validation

4. **Database-Level Validation**
   - RLS policies berdasarkan role
   - Database constraints

## 10. Row Level Security dan Keamanan

### 10.1 Supabase RLS Policies

```sql
-- supabase/policies/auth.sql

-- Users Table Policies

-- Admin can view all users
CREATE POLICY "Admin can view all users" ON auth.users
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Users can view themselves
CREATE POLICY "Users can view themselves" ON auth.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Admin can update any user
CREATE POLICY "Admin can update any user" ON auth.users
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Users can update themselves
CREATE POLICY "Users can update themselves" ON auth.users
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = id);
```

### 10.2 Edge Functions for Auth

```typescript
// supabase/functions/verify-role/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const { email, requestedRole } = await req.json();
  
  // Create a Supabase client with the service role key
  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );
  
  try {
    // Get user by email
    const { data: users, error } = await supabaseAdmin
      .from('users')
      .select('role')
      .eq('email', email)
      .single();
    
    if (error) throw error;
    
    // Verify role
    const hasRole = users.role === requestedRole;
    
    return new Response(
      JSON.stringify({ hasRole }),
      { headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }
});
```

### 10.3 Token Security Utils

```typescript
// features/auth/utils/token.ts
export function parseJwt(token: string): any {
  if (!token) return null;
  
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Error parsing JWT:', e);
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return true;
  
  const expiryDate = new Date(payload.exp * 1000); // Convert seconds to milliseconds
  return expiryDate <= new Date();
}
```

### 10.4 Storage Security

```typescript
// features/auth/utils/storage.ts
export const StorageKeys = {
  AUTH_TOKEN: 'myarchery_auth_token',
  USER_ROLE: 'myarchery_user_role'
};

export const SecureStorage = {
  setItem(key: string, value: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, value);
  },
  
  getItem(key: string): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
  },
  
  removeItem(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
  
  clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(StorageKeys.AUTH_TOKEN);
    localStorage.removeItem(StorageKeys.USER_ROLE);
  }
};
```

## 11. Best Practices dan Patterns

### 11.1 Factory Pattern untuk Auth Service

```typescript
// features/auth/services/index.ts
import { AuthService } from './auth-service';
import { AdminAuthService } from '../variants/admin/service';
import { OrganizerAuthService } from '../variants/organizer/service';
import { CustomerAuthService } from '../variants/customer/service';
import { UserRole } from '../models/user';

export function getAuthServiceForRole(role: UserRole) {
  switch(role) {
    case UserRole.ADMIN:
      return AdminAuthService;
    case UserRole.ORGANIZER:
      return OrganizerAuthService;
    case UserRole.CUSTOMER:
      return CustomerAuthService;
    default:
      return AuthService;
  }
}
```

### 11.2 Composition Pattern untuk UI Components

```tsx
// Contoh composition pattern di login UI
function LoginUI({ 
  title,
  subtitle,
  benefits,
  accentColor,
  onSubmit,
  isLoading,
  error
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };
  
  // Composable form component
  const LoginForm = (
    <div className="w-full max-w-md">
      {error && <ErrorBanner message={error} />}
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton isLoading={isLoading} color={accentColor} />
      </form>
    </div>
  );
  
  return (
    <AuthLayout
      title={title}
      subtitle={subtitle}
      benefits={benefits}
      accentColor={accentColor}
    >
      {LoginForm}
    </AuthLayout>
  );
}
```

### 11.3 Role-Specific Button Component

```tsx
// shared/ui/auth/RoleButton.tsx
interface RoleButtonProps {
  role: 'admin' | 'organizer' | 'customer';
  children: React.ReactNode;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

export function RoleButton({
  role,
  children,
  isLoading = false,
  type = 'button',
  onClick,
  disabled = false
}: RoleButtonProps) {
  // Role-specific styling
  const roleStyles = {
    admin: "bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300",
    organizer: "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300",
    customer: "bg-green-600 hover:bg-green-700 disabled:bg-green-300"
  };
  
  // Base styles
  const baseStyles = "w-full text-white py-2 px-4 rounded-md font-medium";
  
  return (
    <button
      type={type}
      className={`${baseStyles} ${roleStyles[role]}`}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading ? "Processing..." : children}
    </button>
  );
}
```

## 12. Panduan Implementasi dan Replikasi

Untuk mengimplementasi atau mereplikasi fitur autentikasi dengan arsitektur FCDDA, ikuti langkah-langkah berikut:

### 12.1 Setup Folder Structure

1. Buat struktur folder dasar:
```
features/auth/
├── models/
├── services/
├── repository.ts
├── hooks/
├── utils/
└── variants/
    ├── admin/
    ├── organizer/
    └── customer/
```

2. Buat shared UI components:
```
shared/ui/auth/
├── AuthLayout.tsx
├── InputField.tsx
└── RoleButton.tsx
```

### 12.2 Implementasi Models

1. Definisikan domain models (user.ts, credentials.ts)
2. Implementasi validasi domain (validation.ts)
3. Buat role-specific model extensions di folder variants

### 12.3 Implementasi Repository

1. Buat repository.ts dengan abstraksi untuk data access
2. Implementasi metode untuk login, logout, getCurrentUser, dan getSession
3. Integrasi dengan Supabase atau provider auth lainnya

### 12.4 Implementasi Services

1. Buat core auth-service.ts dengan logika autentikasi umum
2. Buat token-service.ts untuk verifikasi token dan session
3. Implementasi factory pattern untuk role-based service access

### 12.5 Implementasi Hooks

1. Buat core hooks useAuthService dan useSession
2. Implementasi role-specific hooks di folder variants

### 12.6 Implementasi UI

1. Buat shared components (AuthLayout, InputField, RoleButton) 
2. Implementasi role-specific UI di folder variants
3. Integrasikan UI dengan Next.js App Router

### 12.7 Setup Security

1. Definisi RLS policies di Supabase
2. Implementasi Edge Functions jika diperlukan
3. Setup token security dan storage utilities

### 12.8 Integrasi dengan Project

1. Konfigurasi Supabase client
2. Setup middleware untuk auth protection
3. Implementasi route handlers untuk setiap role
4. Integrate dengan global state management jika diperlukan

Dengan mengikuti panduan ini, fitur autentikasi dapat diimplementasi dengan arsitektur yang konsisten dan dapat di-maintain untuk jangka panjang.