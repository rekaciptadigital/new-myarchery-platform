import { ScoringSetup } from "../models/scoring-setup";

/**
 * Service untuk mengelola setup scoring
 */
export class ScoringSetupService {
  /**
   * Mendapatkan data scoring setup untuk halaman setup
   */
  async getScoringSetupData(): Promise<ScoringSetup> {
    // Ini adalah data dummy seperti di create-scoring.tsx
    return {
      eventDetail: {
        id: "123",
        name: "Kejuaraan Nasional Panahan 2025",
        location: "Lapangan Panahan Senayan, Jakarta",
        date: "15-17 Juni 2025",
        currentSession: "Kualifikasi Putaran 2",
        activeArchers: 72,
        categories: 8,
        status: "Sedang Berlangsung",
      },
      scoringMenus: [
        {
          id: "settings",
          title: "Pengaturan Pertandingan",
          description: "Setting bantalan, bracket, FOP, dan jadwal",
          icon: "Cog",
          color: "bg-blue-50 border-blue-200",
          path: "settings"
        },
        {
          id: "participants",
          title: "Daftar Peserta",
          description: "Kelola peserta individu, team dan mix team",
          icon: "Users",
          color: "bg-green-50 border-green-200",
          path: "participants"
        },
        {
          id: "scoring",
          title: "Data Pertandingan",
          description: "Input dan kelola skor kualifikasi dan eliminasi",
          icon: "Tablet",
          color: "bg-amber-50 border-amber-200",
          path: "scoring"
        },
        {
          id: "dashboard",
          title: "Dashboard Pertandingan",
          description: "Leaderboard dan statistik pertandingan",
          icon: "BarChart4",
          color: "bg-purple-50 border-purple-200",
          path: "dashboard"
        },
        {
          id: "certificates",
          title: "Konfigurasi Sertifikat",
          description: "Desain dan kelola sertifikat pertandingan",
          icon: "Award",
          color: "bg-cyan-50 border-cyan-200",
          path: "certificates"
        },
        {
          id: "users",
          title: "Manajemen User",
          description: "Kelola akses user ke sistem scoring",
          icon: "UserCog",
          color: "bg-indigo-50 border-indigo-200",
          path: "user-access"
        },
      ],
      statistics: [
        { 
          id: "active-participants", 
          title: "Peserta Aktif", 
          value: 72, 
          secondaryInfo: "dari 128 terdaftar",
          trend: "+3 dari kemarin",
          trendUp: true,
          icon: "Users",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-700"
        },
        { 
          id: "categories", 
          title: "Kategori", 
          value: 8, 
          secondaryInfo: "Recurve terpopuler",
          trend: "6 aktif hari ini",
          trendUp: true,
          icon: "Flag",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-700"
        },
        { 
          id: "targets", 
          title: "Bantalan", 
          value: 24, 
          secondaryInfo: "16 sedang digunakan",
          trend: "8 tersedia",
          trendUp: null,
          icon: "LucideTarget",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          textColor: "text-amber-700"
        },
        { 
          id: "active-judges", 
          title: "Juri Aktif", 
          value: 12, 
          secondaryInfo: "4 sesi terjadwal",
          trend: "3 pending konfirmasi",
          trendUp: false,
          icon: "UserCog",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-200",
          textColor: "text-purple-700"
        },
      ],
      topScores: [
        { rank: 1, name: "Ahmad Fauzi", club: "Arcadia Archery Club", category: "Recurve Senior Putra", score: 675 },
        { rank: 2, name: "Dimas Prayoga", club: "Golden Arrow Archery", category: "Recurve Senior Putra", score: 672 },
        { rank: 3, name: "Maya Sari", club: "Arcadia Archery Club", category: "Recurve Senior Putri", score: 668 },
        { rank: 4, name: "Dewi Anggraini", club: "Royal Archery", category: "Recurve Senior Putri", score: 665 },
        { rank: 5, name: "Rizky Pratama", club: "Bandung Archery Club", category: "Recurve Senior Putra", score: 662 },
      ],
      upcomingMatches: [
        { time: "10:30", fieldOfPlay: "FOP A", category: "Recurve Senior Putra 1/8", status: "Akan Datang" },
        { time: "11:45", fieldOfPlay: "FOP B", category: "Compound Senior Putri 1/4", status: "Akan Datang" },
        { time: "13:15", fieldOfPlay: "FOP A", category: "Recurve Senior Putri 1/4", status: "Akan Datang" },
        { time: "14:30", fieldOfPlay: "FOP C", category: "Compound Senior Putra Semifinal", status: "Akan Datang" },
      ]
    };
  }
}
