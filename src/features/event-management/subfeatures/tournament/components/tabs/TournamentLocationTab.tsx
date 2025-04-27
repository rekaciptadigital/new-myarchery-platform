/**
 * TournamentLocationTab component
 * Second tab of the tournament creation form with location and schedule settings
 */
import React from "react";
// Import necessary types
import { TournamentFormData, ImageInput } from "@/features/event-management/subfeatures/tournament/core/models/tournament";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// Import missing components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface TournamentLocationTabProps {
  readonly formData: TournamentFormData;
  readonly onFieldChange: (field: keyof TournamentFormData, value: string | number | boolean | ImageInput | undefined | unknown[]) => void;
  // Add errors prop
  readonly errors: Record<string, string>; 
}

export function TournamentLocationTab({ 
  formData, 
  onFieldChange, 
  errors // Destructure errors prop
}: TournamentLocationTabProps) {
  // Handlers for form inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onFieldChange(e.target.name as keyof TournamentFormData, e.target.value);
  };
  
  return (
    <div className="space-y-6">
      {/* Location Type RadioGroup */}
      <Card>
        <CardHeader>
          <CardTitle>Tipe Lokasi</CardTitle>
          <CardDescription>
            Pilih tipe lokasi untuk tournament ini
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="locationTypeOffline" className="cursor-pointer">
                <Input
                  type="radio"
                  id="locationTypeOffline"
                  name="locationType"
                  value="offline"
                  checked={formData.locationType === "offline"}
                  onChange={handleInputChange}
                  className="hidden peer"
                />
                <span className="flex items-center p-4 border rounded-lg cursor-pointer peer-checked:border-blue-500">
                  <MapPin className="h-6 w-6 text-blue-500 mr-2" />
                  <span className="block text-sm font-medium">Lokasi Offline</span>
                </span>
              </Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="locationTypeOnline" className="cursor-pointer">
                <Input
                  type="radio"
                  id="locationTypeOnline"
                  name="locationType"
                  value="online"
                  checked={formData.locationType === "online"}
                  onChange={handleInputChange}
                  className="hidden peer"
                />
                <span className="flex items-center p-4 border rounded-lg cursor-pointer peer-checked:border-blue-500">
                  <MapPin className="h-6 w-6 text-blue-500 mr-2" />
                  <span className="block text-sm font-medium">Lokasi Online</span>
                </span>
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {formData.locationType === "offline" && (
        <Card>
          <CardHeader>
            <CardTitle>Lokasi Tournament</CardTitle>
            <CardDescription>
              Tentukan lokasi penyelenggaraan tournament
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
              {/* Display error message */}
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
                {/* Display error message */}
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
                {/* Display error message */}
                {errors.province && <p className="text-sm text-red-500 mt-1">{errors.province}</p>} 
              </div>
            </div>
            
            <div className="space-y-2">
              {/* Ensure 'name' matches the property in TournamentFormData ('venue') */}
              <Label htmlFor="venue">Nama Venue <span className="text-red-500">*</span></Label>
              <Input
                id="venue"
                name="venue" // Should match the property name in the model
                value={formData.venue ?? ""}
                onChange={handleInputChange}
                placeholder="Contoh: Lapangan Panahan Senayan"
              />
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

      {/* Online Location Card (if applicable) */}
      {formData.locationType === "online" && (
        <Card>
          <CardHeader>
            <CardTitle>Lokasi Tournament</CardTitle>
            <CardDescription>
              Masukkan link untuk lokasi online
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="onlineLink">Link Lokasi Online <span className="text-red-500">*</span></Label>
              <Input
                id="onlineLink"
                name="onlineLink" // This should now be valid
                value={formData.onlineLink ?? ""} // Accessing the now valid property
                onChange={handleInputChange}
                placeholder="Contoh: https://zoom.us/j/123456789"
              />
              {/* Add error display for onlineLink if needed */}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}