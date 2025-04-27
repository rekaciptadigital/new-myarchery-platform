/**
 * TournamentLocationTimeTab component
 * Second tab of the tournament creation form with location and time settings
 */
import React from "react"; // Import React if not already present
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
// Import RadioGroup components and MapPin icon
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; 
import { MapPin } from "lucide-react";
// Correct the import path using the '@' alias and import CountdownSettings
import { TournamentFormData, CountdownSettings, ImageInput } from "@/features/event-management/subfeatures/tournament/core/models/tournament"; 

interface TournamentLocationTimeTabProps {
  readonly formData: TournamentFormData;
  // Update value type to include ImageInput and unknown[]
  readonly onFieldChange: (field: keyof TournamentFormData, value: string | number | boolean | ImageInput | undefined | unknown[]) => void; 
  // Use the specific CountdownSettings type
  readonly onSectionChange: (data: CountdownSettings) => void; 
  // Add errors prop if validation messages need to be displayed
  readonly errors?: Record<string, string>; 
}

export function TournamentLocationTimeTab({ 
  formData, 
  onFieldChange,
  onSectionChange,
  errors = {} // Destructure errors with default
}: TournamentLocationTimeTabProps) {
  // Handlers for form inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { // Allow TextAreaElement
    onFieldChange(e.target.name as keyof TournamentFormData, e.target.value);
  };
  
  // Handler for RadioGroup
  const handleRadioGroupChange = (name: keyof TournamentFormData, value: string) => {
    onFieldChange(name, value);
  };

  const handleCountdownChange = (field: keyof CountdownSettings, checked: boolean) => {
    onSectionChange({
      // Ensure formData.countdown exists before spreading
      ...(formData.countdown ?? { eventStart: false, registrationEnd: false }), 
      [field]: checked
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Location Type Card */}
      <Card>
        <CardHeader>
          <CardTitle>Tipe Lokasi</CardTitle>
          <CardDescription>
            Pilih tipe lokasi untuk tournament ini
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Use RadioGroup for locationType */}
          <RadioGroup
            value={formData.locationType ?? "offline"}
            onValueChange={(value) => handleRadioGroupChange("locationType", value)}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <Label htmlFor="locationTypeOffline" className="cursor-pointer">
              <RadioGroupItem value="offline" id="locationTypeOffline" className="peer sr-only" />
              <div className="flex items-center p-4 border rounded-lg cursor-pointer peer-checked:border-blue-500">
                <MapPin className="h-6 w-6 text-blue-500 mr-2" />
                <span className="block text-sm font-medium">Lokasi Offline</span>
              </div>
            </Label>
            <Label htmlFor="locationTypeOnline" className="cursor-pointer">
              <RadioGroupItem value="online" id="locationTypeOnline" className="peer sr-only" />
              <div className="flex items-center p-4 border rounded-lg cursor-pointer peer-checked:border-blue-500">
                <MapPin className="h-6 w-6 text-blue-500 mr-2" />
                <span className="block text-sm font-medium">Lokasi Online</span>
              </div>
            </Label>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Offline Location Details Card */}
      {formData.locationType === "offline" && (
        <Card>
          <CardHeader>
            <CardTitle>Detail Lokasi Offline</CardTitle>
            <CardDescription>
              Masukkan detail alamat untuk lokasi offline
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Alamat Venue <span className="text-red-500">*</span></Label>
              <Input
                id="address"
                name="address"
                value={formData.address ?? ""}
                onChange={handleInputChange}
                placeholder="Contoh: Jl. Merdeka No. 10"
              />
              {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Kota <span className="text-red-500">*</span></Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city ?? ""}
                  onChange={handleInputChange}
                  placeholder="Contoh: Jakarta Selatan"
                />
                {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="province">Provinsi <span className="text-red-500">*</span></Label>
                <Input
                  id="province"
                  name="province"
                  value={formData.province ?? ""}
                  onChange={handleInputChange}
                  placeholder="Contoh: DKI Jakarta"
                />
                {errors.province && <p className="text-sm text-red-500 mt-1">{errors.province}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="venue">Nama Venue</Label> 
              <Input
                id="venue"
                name="venue"
                value={formData.venue ?? ""}
                onChange={handleInputChange}
                placeholder="Contoh: Lapangan Panahan Senayan"
              />
              {/* Add error display if venue becomes required */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="googleMapsUrl">Google Maps URL</Label>
              <Input
                id="googleMapsUrl"
                name="googleMapsUrl"
                value={formData.googleMapsUrl ?? ""}
                onChange={handleInputChange}
                placeholder="Contoh: https://goo.gl/maps/xyz"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Online Location Details Card */}
      {formData.locationType === "online" && (
        <Card>
          <CardHeader>
            <CardTitle>Detail Lokasi Online</CardTitle>
            <CardDescription>
              Masukkan link untuk lokasi online
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="onlineLink">Link Lokasi Online <span className="text-red-500">*</span></Label>
              <Input
                id="onlineLink"
                name="onlineLink"
                value={formData.onlineLink ?? ""}
                onChange={handleInputChange}
                placeholder="Contoh: https://zoom.us/j/123456789"
              />
              {/* Add error display if onlineLink validation exists */}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Date Card */}
      <Card>
        <CardHeader>
          <CardTitle>Tanggal Pelaksanaan & Pendaftaran</CardTitle>
          <CardDescription>
            Atur jadwal penting untuk tournament
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Removed the old single location input */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="required">Tanggal Mulai</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
              {errors.startDate && <p className="text-sm text-red-500 mt-1">{errors.startDate}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">Tanggal Selesai</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate ?? ""} 
                onChange={handleInputChange}
              />
              {errors.endDate && <p className="text-sm text-red-500 mt-1">{errors.endDate}</p>}
              <p className="text-xs text-slate-500">
                Opsional. Kosongkan jika tournament berlangsung hanya satu hari.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="registrationStartDate">Tanggal Mulai Pendaftaran</Label>
              <Input
                id="registrationStartDate"
                name="registrationStartDate"
                type="date"
                value={formData.registrationStartDate}
                onChange={handleInputChange}
              />
              {errors.registrationStartDate && <p className="text-sm text-red-500 mt-1">{errors.registrationStartDate}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="registrationEndDate" className="required">Tanggal Tutup Pendaftaran</Label>
              <Input
                id="registrationEndDate"
                name="registrationEndDate"
                type="date"
                value={formData.registrationEndDate}
                onChange={handleInputChange}
                required
              />
              {errors.registrationEndDate && <p className="text-sm text-red-500 mt-1">{errors.registrationEndDate}</p>}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Countdown Timer Card */}
      <Card>
        <CardHeader>
          <CardTitle>Countdown Timer</CardTitle>
          <CardDescription>
            Atur countdown timer untuk menampilkan waktu mundur ke tournament
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="eventStartCountdown" 
              checked={formData.countdown?.eventStart ?? false} 
              onCheckedChange={(checked) => handleCountdownChange("eventStart", checked === true)}
            />
            <Label 
              htmlFor="eventStartCountdown"
              className="font-normal"
            >
              Tampilkan countdown ke awal event
            </Label>
          </div>
          <p className="text-xs text-slate-500 ml-6">
            Menampilkan countdown tanggal tournament dimulai pada halaman publik event.
          </p>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="registrationEndCountdown" 
              checked={formData.countdown?.registrationEnd ?? false} 
              onCheckedChange={(checked) => handleCountdownChange("registrationEnd", checked === true)}
            />
            <Label 
              htmlFor="registrationEndCountdown"
              className="font-normal"
            >
              Tampilkan countdown ke deadline pendaftaran
            </Label>
          </div>
          <p className="text-xs text-slate-500 ml-6">
            Menampilkan countdown deadline pendaftaran pada halaman publik event.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}