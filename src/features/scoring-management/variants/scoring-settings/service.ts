import { ScoringSettingConfig, ScoringSettingOption } from "./model";

export class ScoringSettingsService {
  /**
   * Mendapatkan konfigurasi pengaturan scoring untuk event tertentu
   * @param eventId ID event
   * @param sourceUrl URL sumber navigasi (optional)
   */
  getSettingsConfig(eventId: string, sourceUrl?: string): ScoringSettingConfig {
    // Determine back link based on source URL
    const getBackLink = () => {
      // If sourceUrl includes 'setup', go back to setup page
      if (sourceUrl?.includes('setup')) {
        return `/organizer/scoring/setup?eventId=${eventId}`;
      }
      // Default: go back to manage page
      return `/organizer/scoring/${eventId}/manage`;
    };

    // Mock data untuk keperluan demo
    const settingsOptions: ScoringSettingOption[] = [
      {
        id: "schedule",
        title: "Jadwal",
        description: "Atur jadwal spesifik untuk berbagai aktivitas dalam pertandingan",
        icon: "Calendar",
        color: "bg-green-50 border-green-200",
        path: `schedule`
      },
      {
        id: "target",
        title: "Bantalan",
        description: "Atur jumlah dan distribusi bantalan untuk setiap kategori",
        icon: "Target",
        color: "bg-purple-50 border-purple-200",
        path: `target`
      },
      {
        id: "bracket",
        title: "Bracket",
        description: "Atur ukuran bracket dan penomoran bantalan untuk setiap kategori",
        icon: "Target",
        color: "bg-blue-50 border-blue-200",
        path: `bracket`
      },
      {
        id: "fop",
        title: "Field of Play (FOP)",
        description: "Konfigurasi layout lapangan untuk pertandingan",
        icon: "Info",
        color: "bg-amber-50 border-amber-200",
        path: `fop`
      }
    ];

    return {
      eventId,
      title: "Pengaturan Pertandingan",
      description: "Konfigurasi berbagai aspek pertandingan",
      options: settingsOptions,
      backLink: getBackLink()
    };
  }
}
