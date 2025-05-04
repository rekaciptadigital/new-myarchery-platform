"use client";

import { Button } from "@/components/ui/button";
import { TournamentFormData } from "../../model";
import { 
  Calendar, 
  MapPin, 
  FileText, 
  Tag,
  Users,
  Medal,
  Save,
  ChevronRight,
  DollarSign
} from "lucide-react";
import Link from "next/link";

interface TournamentFormProps {
  form: TournamentFormData;
  errors: Record<string, string>;
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function TournamentForm({
  form,
  errors,
  isSubmitting,
  onChange,
  onSubmit,
}: Readonly<TournamentFormProps>) {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Basic Information Section */}
      <div>
        <div className="flex items-center gap-2 mb-4 text-blue-600">
          <FileText size={20} />
          <h2 className="text-lg font-semibold">Informasi Dasar</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
              Nama Tournament <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={onChange}
              className={`w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-slate-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Masukkan nama tournament"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            <p className="text-xs text-slate-500 mt-1">Contoh: Kejuaraan Nasional Panahan 2025</p>
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={onChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Draft">Draft</option>
              <option value="Publikasi">Publikasi</option>
              <option value="Berlangsung">Berlangsung</option>
              <option value="Selesai">Selesai</option>
            </select>
            <p className="text-xs text-slate-500 mt-1">Draft tidak akan terlihat oleh publik</p>
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
              Deskripsi Tournament
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={onChange}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Jelaskan tentang tournament ini"
            />
          </div>
        </div>
      </div>
      
      {/* Location and Date Section */}
      <div>
        <div className="flex items-center gap-2 mb-4 text-green-600">
          <Calendar size={20} />
          <h2 className="text-lg font-semibold">Waktu & Lokasi</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">
              Tanggal Tournament <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={onChange}
              className={`w-full px-3 py-2 border ${errors.date ? 'border-red-300' : 'border-slate-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
          </div>
          
          <div>
            <label htmlFor="timeStart" className="block text-sm font-medium text-slate-700 mb-1">
              Waktu Mulai
            </label>
            <input
              type="time"
              id="timeStart"
              name="timeStart"
              value={form.timeStart}
              onChange={onChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="timeEnd" className="block text-sm font-medium text-slate-700 mb-1">
              Waktu Selesai
            </label>
            <input
              type="time"
              id="timeEnd"
              name="timeEnd"
              value={form.timeEnd}
              onChange={onChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="md:col-span-3">
            <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">
              Lokasi <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <MapPin size={16} className="text-slate-400 mr-2" />
              <input
                type="text"
                id="location"
                name="location"
                value={form.location}
                onChange={onChange}
                className={`w-full px-3 py-2 border ${errors.location ? 'border-red-300' : 'border-slate-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Masukkan lokasi pelaksanaan"
              />
            </div>
            {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
          </div>
        </div>
      </div>
      
      {/* Tournament Details Section */}
      <div>
        <div className="flex items-center gap-2 mb-4 text-purple-600">
          <Medal size={20} />
          <h2 className="text-lg font-semibold">Detail Tournament</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="categories" className="block text-sm font-medium text-slate-700 mb-1">
              Jumlah Kategori
            </label>
            <div className="flex items-center">
              <Tag size={16} className="text-slate-400 mr-2" />
              <input
                type="number"
                id="categories"
                name="categories"
                value={form.categories}
                onChange={onChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Anda dapat mengatur detail kategori di langkah berikutnya
            </p>
          </div>
          
          <div>
            <label htmlFor="maxParticipants" className="block text-sm font-medium text-slate-700 mb-1">
              Jumlah Peserta Maksimal
            </label>
            <div className="flex items-center">
              <Users size={16} className="text-slate-400 mr-2" />
              <input
                type="number"
                id="maxParticipants"
                name="maxParticipants"
                value={form.maxParticipants}
                onChange={onChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="registrationFee" className="block text-sm font-medium text-slate-700 mb-1">
              Biaya Pendaftaran
            </label>
            <div className="flex items-center">
              <DollarSign size={16} className="text-slate-400 mr-2" />
              <input
                type="number"
                id="registrationFee"
                name="registrationFee"
                value={form.registrationFee}
                onChange={onChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="scoringSystem" className="block text-sm font-medium text-slate-700 mb-1">
              Sistem Penilaian
            </label>
            <select
              id="scoringSystem"
              name="scoringSystem"
              value={form.scoringSystem}
              onChange={onChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="standard">Standard (10-1)</option>
              <option value="modified">Modified (11-10-9...)</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="roundsSetup" className="block text-sm font-medium text-slate-700 mb-1">
              Format Ronde
            </label>
            <select
              id="roundsSetup"
              name="roundsSetup"
              value={form.roundsSetup}
              onChange={onChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="qualification_elimination">Kualifikasi + Eliminasi</option>
              <option value="elimination_only">Hanya Eliminasi</option>
              <option value="qualification_only">Hanya Kualifikasi</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Form Error */}
      {errors.form && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          <p>{errors.form}</p>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-200">
        <Link href="/organizer/events/create" className="text-slate-600 hover:text-slate-800">
          &larr; Kembali ke pilihan jenis
        </Link>
        
        <div className="flex gap-3">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => window.history.back()}
          >
            Batal
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <Save size={16} className="mr-2" />
            Simpan Draft
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Memproses...
              </>
            ) : (
              <>
                Lanjutkan
                <ChevronRight size={16} className="ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
