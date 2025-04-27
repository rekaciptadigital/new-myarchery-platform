import React from "react";
import { TournamentFormData } from "../../core/models/tournament";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { TournamentImageUpload } from "./TournamentImageUpload"; // Import the new component
import { TournamentDateField } from "./TournamentDateFields"; // Import the new component

interface TournamentBasicInfoTabProps {
  readonly formData: TournamentFormData;
  readonly onFieldChange: (field: keyof TournamentFormData, value: string | File | null | undefined) => void;
  readonly errors: Record<string, string>;
}

export function TournamentBasicInfoTab({
  formData,
  onFieldChange,
  errors
}: TournamentBasicInfoTabProps) {
  // Function to handle file uploads - passed down to subcomponent
  const handleFileUpload = (field: keyof TournamentFormData, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Cast value to File | null for onFieldChange compatibility if needed, or adjust onFieldChange type
      onFieldChange(field, file as File | null); 
    }
  };

  // Cast onFieldChange for date fields if necessary, or adjust type in TournamentDateFieldProps
  const handleDateChange = (field: keyof TournamentFormData, value: string) => {
    onFieldChange(field, value);
  };

  // Cast onFieldChange for image fields if necessary
  const handleImageChange = (field: keyof TournamentFormData, value: File | null) => {
    onFieldChange(field, value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Informasi Dasar Tournament</h3>
        <p className="text-sm text-muted-foreground">
          Berikan informasi umum tentang tournament yang akan Anda selenggarakan.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Tournament Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Nama Tournament <span className="text-red-500">*</span></Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onFieldChange("name", e.target.value)}
            placeholder="Masukkan nama tournament"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Tournament Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Deskripsi Tournament</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => onFieldChange("description", e.target.value)}
            placeholder="Deskripsi singkat tentang tournament"
            rows={4}
          />
        </div>

        {/* Event Type */}
        <div className="space-y-2">
          <Label htmlFor="eventType">Tipe Event <span className="text-red-500">*</span></Label>
          <Select 
            value={formData.eventType} 
            onValueChange={(value) => onFieldChange("eventType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih tipe event" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="team">Team</SelectItem>
              <SelectItem value="mixed">Campuran (Individual & Team)</SelectItem>
            </SelectContent>
          </Select>
          {/* Consider adding error display for eventType if applicable */}
        </div>

        {/* Tournament Dates */}
        <div className="grid grid-cols-2 gap-4">
          <TournamentDateField 
            field="startDate"
            label="Tanggal Mulai Tournament"
            dateValue={formData.startDate}
            error={errors.startDate}
            onFieldChange={handleDateChange}
          />
          <TournamentDateField 
            field="endDate"
            label="Tanggal Selesai Tournament"
            dateValue={formData.endDate}
            error={errors.endDate}
            onFieldChange={handleDateChange}
          />
        </div>

        {/* Registration Dates */}
        <div className="grid grid-cols-2 gap-4">
           <TournamentDateField 
            field="registrationStartDate"
            label="Tanggal Mulai Pendaftaran"
            dateValue={formData.registrationStartDate}
            error={errors.registrationStartDate}
            onFieldChange={handleDateChange}
          />
           <TournamentDateField 
            field="registrationEndDate"
            label="Tanggal Selesai Pendaftaran"
            dateValue={formData.registrationEndDate}
            error={errors.registrationEndDate}
            onFieldChange={handleDateChange}
          />
        </div>

        {/* Tournament Images */}
        <div>
          <h4 className="text-base font-medium mb-4">Media Tournament</h4>
          <div className="grid grid-cols-3 gap-4">
            <TournamentImageUpload 
              field="logo"
              label="Logo Tournament"
              imageValue={formData.logo}
              onFieldChange={handleImageChange}
              handleFileUpload={handleFileUpload}
            />
            <TournamentImageUpload 
              field="bannerImage"
              label="Banner Tournament"
              imageValue={formData.bannerImage}
              onFieldChange={handleImageChange}
              handleFileUpload={handleFileUpload}
            />
            <TournamentImageUpload 
              field="featuredImage"
              label="Gambar Utama"
              imageValue={formData.featuredImage}
              onFieldChange={handleImageChange}
              handleFileUpload={handleFileUpload}
            />
          </div>
          {/* Consider adding error display for images if applicable */}
        </div>
      </div>
    </div>
  );
}