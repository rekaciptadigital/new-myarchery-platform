"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, Save, Trophy } from "lucide-react";

export default function TournamentCreatePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    registrationStartDate: "",
    registrationEndDate: "",
    eventType: "indoor",
    categories: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div>
      <div className="mb-4">
        <Link
          href="/organizer/events/create"
          className="text-slate-600 hover:text-slate-800 flex items-center text-sm font-medium"
        >
          <ChevronLeft size={16} className="mr-1" />
          Kembali ke pilihan jenis event
        </Link>
      </div>

      <div className="mb-8 flex items-center">
        <div className="bg-orange-100 p-2 rounded-full mr-3">
          <Trophy size={24} className="text-orange-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Buat Tournament / Kejuaraan</h1>
          <p className="text-slate-600">
            Isi detail tournament yang akan Anda selenggarakan
          </p>
        </div>
      </div>

      <div className="flex mb-6">
        <div className="flex items-center">
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
            }`}
          >
            1
          </div>
          <span className="ml-2 font-medium">Informasi Dasar</span>
        </div>
        <div className={`w-12 h-[2px] mx-2 ${step >= 2 ? "bg-blue-600" : "bg-slate-200"}`} />
        <div className="flex items-center">
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
            }`}
          >
            2
          </div>
          <span className="ml-2 font-medium">Kategori & Kelas</span>
        </div>
        <div className={`w-12 h-[2px] mx-2 ${step >= 3 ? "bg-blue-600" : "bg-slate-200"}`} />
        <div className="flex items-center">
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
            }`}
          >
            3
          </div>
          <span className="ml-2 font-medium">Pendaftaran & Biaya</span>
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Informasi Dasar Tournament</CardTitle>
            <CardDescription>
              Lengkapi informasi dasar tentang tournament yang akan Anda selenggarakan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Tournament</Label>
              <Input
                id="name"
                name="name"
                placeholder="Contoh: Kejuaraan Nasional Panahan 2025"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi Tournament</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Jelaskan detail tournament Anda"
                rows={5}
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Lokasi</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Lokasi venue tournament"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventType">Tipe Event</Label>
                <Select
                  value={formData.eventType}
                  onValueChange={(value) => handleSelectChange("eventType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indoor">Indoor</SelectItem>
                    <SelectItem value="outdoor">Outdoor</SelectItem>
                    <SelectItem value="hybrid">Hybrid (Indoor & Outdoor)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Tanggal Mulai</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Tanggal Selesai</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                />
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
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationEndDate">Tanggal Tutup Pendaftaran</Label>
                <Input
                  id="registrationEndDate"
                  name="registrationEndDate"
                  type="date"
                  value={formData.registrationEndDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleNext}>
                Lanjut ke Kategori & Kelas
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Kategori & Kelas Kompetisi</CardTitle>
            <CardDescription>
              Tentukan kategori dan kelas kompetisi yang tersedia dalam tournament
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Category and class configuration would go here */}
            <p className="text-slate-600 mb-4">Konten untuk pengaturan kategori dan kelas akan ditampilkan di sini.</p>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handlePrevious}>
                Kembali
              </Button>
              <Button onClick={handleNext}>
                Lanjut ke Pendaftaran & Biaya
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Pendaftaran & Biaya</CardTitle>
            <CardDescription>
              Atur opsi pendaftaran dan biaya pendaftaran untuk tournament
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Registration and fee configuration would go here */}
            <p className="text-slate-600 mb-4">Konten untuk pengaturan pendaftaran dan biaya akan ditampilkan di sini.</p>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handlePrevious}>
                Kembali
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Save size={16} className="mr-2" />
                Simpan Tournament
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}