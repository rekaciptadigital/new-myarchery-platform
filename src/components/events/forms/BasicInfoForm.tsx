"use client";

import { UploadCloud } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { EventFormInput } from "@/lib/validations/events";
import { EventType, EventVisibility } from "@/types/events";

interface BasicInfoFormProps {
  readonly form: UseFormReturn<EventFormInput>;
}

export function BasicInfoForm({ form }: BasicInfoFormProps) {
  const { register, formState: { errors }, watch, setValue } = form;
  const visibility = watch("visibility");

  const handleTypeChange = (value: string) => {
    setValue("type", value as EventType);
  };

  const handleVisibilityChange = (value: string) => {
    setValue("visibility", value as EventVisibility);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informasi Dasar & Branding</CardTitle>
          <CardDescription>
            Nama, deskripsi, dan branding visual tournament Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Nama Tournament *
            </Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Contoh: Kejuaraan Nasional Panahan 2025"
              className="mt-1"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium">
              Deskripsi Tournament *
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Jelaskan tentang tournament Anda..."
              rows={5}
              className="mt-1"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
            <p className="text-xs text-slate-500 mt-1">
              Jelaskan detail event, termasuk tingkat kompetisi, kategori utama, dan informasi penting lainnya.
            </p>
          </div>

          <div>
            <Label htmlFor="type" className="text-sm font-medium">
              Jenis Tournament *
            </Label>
            <Select onValueChange={handleTypeChange}>
              <SelectTrigger id="type" className="mt-1">
                <SelectValue placeholder="Pilih jenis tournament" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tournament">Tournament (Kompetisi)</SelectItem>
                <SelectItem value="league">Liga (Multi-Match)</SelectItem>
                <SelectItem value="workshop">Workshop (Edukasi)</SelectItem>
                <SelectItem value="training">Training Camp (Latihan)</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="eventBranding" className="text-sm font-medium">
              Branding (Logo/Banner)
            </Label>
            <div className="border-2 border-dashed border-gray-200 rounded-md p-6 text-center mt-1">
              <UploadCloud className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm font-medium mb-2">Drag & drop file logo atau banner</p>
              <p className="text-xs text-gray-500 mb-3">SVG, PNG, atau JPG (maks. 2MB)</p>
              <Button type="button" variant="outline" size="sm">
                Browse Files
              </Button>
              <input
                id="eventBranding"
                type="file"
                className="hidden"
                accept="image/svg+xml,image/png,image/jpeg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visibilitas Event</CardTitle>
          <CardDescription>
            Atur siapa saja yang dapat melihat dan mendaftar tournament Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Visibilitas *</Label>
            <Select onValueChange={handleVisibilityChange}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih visibilitas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public (Terlihat oleh semua)</SelectItem>
                <SelectItem value="private">Private (Hanya via undangan/kode)</SelectItem>
                <SelectItem value="unlisted">Unlisted (Hanya via link)</SelectItem>
              </SelectContent>
            </Select>
            {errors.visibility && (
              <p className="text-red-500 text-sm mt-1">{errors.visibility.message}</p>
            )}
          </div>
          
          {visibility === "private" && (
            <div>
              <Label htmlFor="inviteCode" className="text-sm font-medium">
                Kode Undangan
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="inviteCode"
                  {...register("inviteCode")}
                  placeholder="Contoh: ARCHERY2025"
                />
                <Button type="button" variant="outline">
                  Generate Kode
                </Button>
              </div>
              {errors.inviteCode && (
                <p className="text-red-500 text-sm mt-1">{errors.inviteCode.message}</p>
              )}
              <p className="text-xs text-slate-500 mt-1">
                Kode ini akan diperlukan untuk pendaftaran peserta.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
