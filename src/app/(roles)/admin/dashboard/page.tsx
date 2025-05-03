"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProtectedRoute } from "@/shared/ui/auth";
import { UserRole } from "@/features/auth/models/user";

export default function AdminDashboardPage() {
  // Helper function to get status badge classes
  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case 'Publikasi':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Berlangsung':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <ProtectedRoute roles={UserRole.ADMIN} redirectTo="/admin/login">
      <AdminLayout>
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Dashboard Admin</h1>
          <p className="text-slate-600">Selamat datang di panel administrator MyArchery.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Event</CardTitle>
              <CardDescription>Semua event di platform</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">138</p>
              <div className="text-sm text-green-600 mt-1">+12% dibanding bulan lalu</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Pengguna</CardTitle>
              <CardDescription>Organizer, atlet, dan official</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">2,457</p>
              <div className="text-sm text-green-600 mt-1">+8% dibanding bulan lalu</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Transaksi</CardTitle>
              <CardDescription>Dari pendaftaran event</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">Rp 124.5jt</p>
              <div className="text-sm text-green-600 mt-1">+15% dibanding bulan lalu</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Terbaru</CardTitle>
              <CardDescription>Event yang baru ditambahkan ke platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Kejuaraan Nasional Panahan 2025", organizer: "Perpani", date: "15 Mei 2025", status: "Publikasi" },
                  { name: "Archery Open Junior 2025", organizer: "Klub Panah Muda", date: "1 Juni 2025", status: "Draft" },
                  { name: "Liga Panahan Kota 2025", organizer: "Dinas Olahraga Jakarta", date: "25 April 2025", status: "Berlangsung" },
                  { name: "Turnamen Panahan Kampus", organizer: "Universitas Indonesia", date: "22 Mei 2025", status: "Publikasi" },
                ].map((event, idx) => (
                  <div key={`event-${event.name.replace(/\s+/g, '-')}-${idx}`} className="p-3 rounded border border-slate-200">
                    <div className="font-medium">{event.name}</div>
                    <div className="text-sm text-slate-500">
                      <span>{event.organizer}</span> • <span>{event.date}</span>
                    </div>
                    <div className="mt-1">
                      <span className={`text-xs px-2 py-1 rounded ${getStatusBadgeClasses(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Sistem</CardTitle>
              <CardDescription>Log aktivitas terbaru di platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { user: "admin@myarchery.com", action: "Login ke sistem", time: "10 menit yang lalu" },
                  { user: "perpani@example.com", action: "Membuat event baru", time: "2 jam yang lalu" },
                  { user: "system", action: "Backup database otomatis", time: "6 jam yang lalu" },
                  { user: "superadmin@myarchery.com", action: "Update pengaturan sistem", time: "1 hari yang lalu" },
                  { user: "system", action: "Pemeliharaan sistem", time: "2 hari yang lalu" },
                ].map((log, idx) => (
                  <div key={`activity-${log.user.replace(/[^a-zA-Z0-9]/g, '-')}-${log.action.replace(/\s+/g, '-')}-${idx}`} className="flex items-start">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 mr-3"></div>
                    <div>
                      <div className="font-medium">{log.action}</div>
                      <div className="text-sm text-slate-500">
                        <span>{log.user}</span> • <span>{log.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}