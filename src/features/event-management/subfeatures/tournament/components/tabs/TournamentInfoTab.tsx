/**
 * TournamentInfoTab component
 * First tab of the tournament creation form with basic info and branding settings
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TournamentFormData } from "@/features/event-management/subfeatures/tournament/core/models/tournament"; 
import { Globe, Upload, Users } from "lucide-react";
import Image from "next/image"; 

interface TournamentInfoTabProps {
  readonly formData: TournamentFormData;
  readonly onFieldChange: (field: keyof TournamentFormData, value: unknown) => void;
  readonly onSocialMediaChange: (platform: string, value: string) => void;
}

export function TournamentInfoTab({ 
  formData, 
  onFieldChange,
  onSocialMediaChange
}: TournamentInfoTabProps) {
  // Handlers for form inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onFieldChange(e.target.name as keyof TournamentFormData, e.target.value);
  };
  
  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSocialMediaChange(e.target.name, e.target.value);
  };
  
  const handleSelectChange = (name: keyof TournamentFormData, value: string) => {
    onFieldChange(name, value);
  };
  
  return (
    <div className="space-y-6">
      {/* Basic Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Informasi Dasar</CardTitle>
          <CardDescription>
            Lengkapi informasi dasar tentang tournament yang akan Anda selenggarakan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Tournament <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              placeholder="Contoh: Kejuaraan Nasional Panahan 2025"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Tournament <span className="text-red-500">*</span></Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              placeholder="Jelaskan detail tournament Anda"
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="organizer">Penyelenggara <span className="text-red-500">*</span></Label>
            <Input
              id="organizer"
              name="organizer"
              value={formData.organizer ?? ""}
              onChange={handleInputChange}
              placeholder="Nama organisasi penyelenggara tournament"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="visibility">Visibilitas Event</Label>
            <Select
              value={formData.visibility ?? "public"}
              onValueChange={(value) => handleSelectChange("visibility", value)}
            >
              <SelectTrigger id="visibility">
                <SelectValue placeholder="Pilih visibilitas event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Publik - Dapat dilihat oleh semua orang</SelectItem>
                <SelectItem value="unlisted">Unlisted - Hanya bisa diakses melalui link</SelectItem>
                <SelectItem value="private">Private - Hanya untuk peserta undangan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* Branding Card */}
      <Card>
        <CardHeader>
          <CardTitle>Branding Tournament</CardTitle>
          <CardDescription>
            Tambahkan elemen visual untuk tournament Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="mb-2 block">Logo Tournament</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {formData.logo ? (
                  <div className="relative h-32 w-full">
                    <Image 
                      src={typeof formData.logo === 'string' ? formData.logo : URL.createObjectURL(formData.logo)} 
                      alt="Logo tournament" 
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 z-10"
                      onClick={() => onFieldChange("logo", null)}
                    >
                      Hapus Logo
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto h-10 w-10 text-slate-300 mb-2" />
                    <p className="text-sm text-slate-500 mb-2">Upload logo tournament Anda</p>
                    <p className="text-xs text-slate-400 mb-3">Format: PNG, JPG, SVG (maks. 2MB)</p>
                    <Button variant="outline" size="sm">
                      Pilih File
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <Label className="mb-2 block">Banner Event</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {formData.bannerImage ? (
                  <div className="relative h-32 w-full">
                    <Image 
                      src={typeof formData.bannerImage === 'string' ? formData.bannerImage : URL.createObjectURL(formData.bannerImage)} 
                      alt="Banner tournament" 
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 z-10"
                      onClick={() => onFieldChange("bannerImage", null)}
                    >
                      Hapus Banner
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto h-10 w-10 text-slate-300 mb-2" />
                    <p className="text-sm text-slate-500 mb-2">Upload banner event Anda</p>
                    <p className="text-xs text-slate-400 mb-3">Rekomendasi: 1200x630px (maks. 4MB)</p>
                    <Button variant="outline" size="sm">
                      Pilih File
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Contact Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Informasi Kontak</CardTitle>
          <CardDescription>
            Tambahkan informasi kontak untuk komunikasi dengan peserta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email Kontak <span className="text-red-500">*</span></Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={formData.contactEmail ?? ""}
                onChange={handleInputChange}
                placeholder="Email untuk komunikasi dengan peserta"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Nomor Telepon/WhatsApp</Label>
              <Input
                id="contactPhone"
                name="contactPhone"
                value={formData.contactPhone ?? ""}
                onChange={handleInputChange}
                placeholder="Nomor untuk komunikasi dengan peserta"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="eventWebsite">Website Event</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm">
                <Globe size={16} />
              </span>
              <Input
                id="eventWebsite"
                name="eventWebsite"
                value={formData.eventWebsite ?? ""}
                onChange={handleInputChange}
                placeholder="https://www.eventanda.com"
                className="rounded-l-none"
              />
            </div>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <h4 className="text-sm font-medium mb-3 flex items-center">
              <Users size={16} className="mr-2" />
              Media Sosial
            </h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm w-36">
                  Instagram
                </span>
                <Input
                  name="instagram"
                  value={formData.socialMedia?.instagram ?? ""}
                  onChange={handleSocialChange}
                  placeholder="@username"
                  className="rounded-l-none"
                />
              </div>
              
              <div className="flex items-center">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm w-36">
                  Facebook
                </span>
                <Input
                  name="facebook"
                  value={formData.socialMedia?.facebook ?? ""}
                  onChange={handleSocialChange}
                  placeholder="username atau URL"
                  className="rounded-l-none"
                />
              </div>
              
              <div className="flex items-center">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm w-36">
                  Twitter/X
                </span>
                <Input
                  name="twitter"
                  value={formData.socialMedia?.twitter ?? ""}
                  onChange={handleSocialChange}
                  placeholder="@username"
                  className="rounded-l-none"
                />
              </div>
              
              <div className="flex items-center">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm w-36">
                  YouTube
                </span>
                <Input
                  name="youtube"
                  value={formData.socialMedia?.youtube ?? ""}
                  onChange={handleSocialChange}
                  placeholder="URL channel"
                  className="rounded-l-none"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}