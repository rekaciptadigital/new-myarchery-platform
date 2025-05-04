import { TournamentFormData } from "./model";

export class TournamentService {
  validateTournamentData(data: TournamentFormData): { isValid: boolean; errors?: Record<string, string> } {
    const errors: Record<string, string> = {};
    
    // Name validation
    if (!data.name || data.name.trim().length < 3) {
      errors.name = "Nama tournament harus minimal 3 karakter";
    }
    
    // Date validation
    if (!data.date) {
      errors.date = "Tanggal tournament harus diisi";
    } else {
      const eventDate = new Date(data.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (isNaN(eventDate.getTime())) {
        errors.date = "Format tanggal tidak valid";
      } else if (eventDate < today) {
        errors.date = "Tanggal tidak boleh di masa lalu";
      }
    }
    
    // Location validation
    if (!data.location || data.location.trim().length < 3) {
      errors.location = "Lokasi tournament harus diisi";
    }

    // Registration fee validation
    if (data.registrationFee !== undefined && data.registrationFee < 0) {
      errors.registrationFee = "Biaya pendaftaran tidak boleh negatif";
    }
    
    // Max participants validation
    if (data.maxParticipants !== undefined && data.maxParticipants < 1) {
      errors.maxParticipants = "Jumlah peserta maksimal minimal 1";
    }
    
    return { 
      isValid: Object.keys(errors).length === 0,
      errors: Object.keys(errors).length > 0 ? errors : undefined
    };
  }

  async createTournament(data: TournamentFormData): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      // Validate data first
      const validation = this.validateTournamentData(data);
      if (!validation.isValid) {
        return { 
          success: false, 
          error: "Data tournament tidak valid" 
        };
      }

      // In a real implementation, this would make an API call to create the tournament
      // For now, we'll simulate a successful creation
      return {
        success: true,
        id: Math.random().toString(36).substring(2, 9)
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create tournament"
      };
    }
  }
}
