/**
 * TournamentDocumentationTab component
 * Fifth tab of the tournament creation form with documentation and rules settings
 */
import React, { useState } from "react"; 
// Import necessary types, including DocumentRequirement and ImageInput
import { TournamentFormData, ImageInput, DocumentRequirement } from "@/features/event-management/subfeatures/tournament/core/models/tournament"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, FileText, Plus, Trash2, Upload } from "lucide-react";

interface TournamentDocumentationTabProps {
  readonly formData: TournamentFormData;
  // Update the onFieldChange signature to match the parent
  readonly onFieldChange: (field: keyof TournamentFormData, value: string | number | boolean | ImageInput | undefined | unknown[]) => void;
  // Assuming errors might be needed here too, add if necessary
  // readonly errors: Record<string, string>; 
}

export function TournamentDocumentationTab({ formData, onFieldChange }: TournamentDocumentationTabProps) {
  // State for new document requirement
  const [newDocRequirement, setNewDocRequirement] = useState<Partial<DocumentRequirement>>({
    name: "",
    description: "",
    required: true
  });
  
  // Handlers for form inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onFieldChange(e.target.name as keyof TournamentFormData, e.target.value);
  };
  
  const handleSwitchChange = (field: keyof TournamentFormData, checked: boolean) => {
    onFieldChange(field, checked);
  };
  
  // Document requirement handlers
  const handleNewDocRequirementChange = (field: keyof DocumentRequirement, value: string | boolean) => {
    setNewDocRequirement((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleAddDocRequirement = () => {
    if (!newDocRequirement.name) {
      alert("Nama dokumen harus diisi");
      return;
    }
    
    const newRequirement: DocumentRequirement = {
      name: newDocRequirement.name, 
      description: newDocRequirement.description ?? "", 
      required: newDocRequirement.required ?? true 
    };
    
    onFieldChange(
      "documentRequirements", 
      [...(formData.documentRequirements ?? []), newRequirement] 
    );
    
    // Reset the form
    setNewDocRequirement({
      name: "",
      description: "",
      required: true
    });
  };
  
  const handleRemoveDocRequirement = (index: number) => {
    const updatedRequirements = [...(formData.documentRequirements ?? [])]; 
    updatedRequirements.splice(index, 1);
    onFieldChange("documentRequirements", updatedRequirements);
  };
  
  // File upload handlers (placeholders)
  const handleRulesFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Use optional chaining
    const file = e.target.files?.[0]; 
    if (file) {
      // In a real implementation, you would upload the file to a server
      // and set the URL in formData
      // Using object URL temporarily for display, but this won't persist
      onFieldChange("rulesFileUrl", URL.createObjectURL(file)); 
      onFieldChange("rulesFileName", file.name);
    }
  };
  
  const handleScheduleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Use optional chaining
    const file = e.target.files?.[0]; 
    if (file) {
      // In a real implementation, you would upload the file to a server
      // and set the URL in formData
      // Using object URL temporarily for display, but this won't persist
      onFieldChange("scheduleFileUrl", URL.createObjectURL(file));
      onFieldChange("scheduleFileName", file.name);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Tournament Rules Card */}
      <Card>
        <CardHeader>
          <CardTitle>Peraturan Tournament</CardTitle>
          <CardDescription>
            Definisikan peraturan dan ketentuan untuk tournament
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="generalRules">Peraturan Umum</Label>
            <Textarea
              id="generalRules"
              name="generalRules"
              rows={5}
              value={formData.generalRules ?? ""} 
              onChange={handleInputChange}
              placeholder="Masukkan peraturan umum tournament..."
            />
            <p className="text-xs text-slate-500">
              Jelaskan peraturan umum yang berlaku untuk tournament Anda
            </p>
          </div>
          
          <div className="space-y-2 mt-4">
            <Label htmlFor="technicalRules">Peraturan Teknis</Label>
            <Textarea
              id="technicalRules"
              name="technicalRules"
              rows={5}
              value={formData.technicalRules ?? ""} 
              onChange={handleInputChange}
              placeholder="Masukkan peraturan teknis tournament..."
            />
            <p className="text-xs text-slate-500">
              Jelaskan peraturan teknis kompetisi seperti sistem penilaian, ukuran target, dll.
            </p>
          </div>
          
          <div className="space-y-2 mt-4">
            <Label htmlFor="dressCode">Dress Code</Label>
            <Textarea
              id="dressCode"
              name="dressCode"
              rows={3}
              value={formData.dressCode ?? ""} 
              onChange={handleInputChange}
              placeholder="Masukkan ketentuan pakaian yang berlaku untuk peserta..."
            />
          </div>
          
          <div className="mt-6 space-y-3">
            <Label>Unggah File Peraturan (Opsional)</Label>
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <span>
                    {formData.rulesFileName ?? "Belum ada file yang diunggah"} 
                  </span>
                </div>
                <div>
                  <label htmlFor="rulesFileUpload">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => document.getElementById('rulesFileUpload')?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Unggah File
                    </Button>
                    <input
                      id="rulesFileUpload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleRulesFileChange}
                    />
                  </label>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Format yang didukung: PDF, DOC, DOCX (Maks. 5MB)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Schedule Card */}
      <Card>
        <CardHeader>
          <CardTitle>Jadwal & Agenda</CardTitle>
          <CardDescription>
            Tetapkan jadwal dan agenda kegiatan tournament
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="schedule">Jadwal Kegiatan</Label>
            <Textarea
              id="schedule"
              name="schedule"
              rows={5}
              value={formData.schedule ?? ""} 
              onChange={handleInputChange}
              placeholder="Masukkan jadwal kegiatan tournament..."
            />
            <p className="text-xs text-slate-500">
              Jelaskan jadwal kegiatan dari awal hingga akhir tournament (Technical Meeting, Kualifikasi, Eliminasi, dll)
            </p>
          </div>
          
          <div className="mt-6 space-y-3">
            <Label>Unggah File Jadwal (Opsional)</Label>
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <span>
                    {formData.scheduleFileName ?? "Belum ada file yang diunggah"} 
                  </span>
                </div>
                <div>
                  <label htmlFor="scheduleFileUpload">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => document.getElementById('scheduleFileUpload')?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Unggah File
                    </Button>
                    <input
                      id="scheduleFileUpload"
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                      className="hidden"
                      onChange={handleScheduleFileChange}
                    />
                  </label>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Format yang didukung: PDF, DOC, DOCX, XLS, XLSX (Maks. 5MB)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Document Requirements Card */}
      <Card>
        <CardHeader>
          <CardTitle>Dokumen Persyaratan</CardTitle>
          <CardDescription>
            Atur dokumen yang harus diunggah peserta saat mendaftar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="requireDocumentUpload" className="text-base">Wajibkan Dokumen</Label>
              <p className="text-sm text-slate-500">
                Aktifkan jika peserta harus mengunggah dokumen saat mendaftar
              </p>
            </div>
            <Switch
              id="requireDocumentUpload"
              checked={formData.requireDocumentUpload ?? false} 
              onCheckedChange={(checked) => handleSwitchChange("requireDocumentUpload", checked)}
            />
          </div>
          
          {formData.requireDocumentUpload && (
            <>
              {formData.documentRequirements && formData.documentRequirements.length > 0 ? (
                <div className="space-y-3 mt-4">
                  <Label>Daftar Dokumen yang Diperlukan</Label>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="px-4 py-2 text-left text-sm font-medium text-slate-500">Nama Dokumen</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-slate-500">Deskripsi</th>
                          <th className="px-4 py-2 text-center text-sm font-medium text-slate-500">Wajib</th>
                          <th className="px-4 py-2 text-center text-sm font-medium text-slate-500">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(formData.documentRequirements ?? []).map((doc, index) => ( 
                          // Use doc name and index for a more stable key
                          <tr key={`${doc.name}-${index}`} className="border-t"> 
                            <td className="px-4 py-2">{doc.name}</td>
                            <td className="px-4 py-2">{doc.description}</td>
                            <td className="px-4 py-2 text-center">
                              {doc.required ? 
                                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Wajib</span> : 
                                <span className="px-2 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-medium">Opsional</span>
                              }
                            </td>
                            <td className="px-4 py-2 text-center">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveDocRequirement(index)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center p-4 border rounded-md bg-slate-50 mt-4">
                  <p className="text-slate-500">Belum ada persyaratan dokumen yang ditambahkan</p>
                </div>
              )}
              
              <div className="space-y-3 mt-4 p-4 border rounded-md">
                <Label>Tambah Persyaratan Dokumen</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newDocName">Nama Dokumen</Label>
                    <Input
                      id="newDocName"
                      value={newDocRequirement.name ?? ""} 
                      onChange={(e) => handleNewDocRequirementChange("name", e.target.value)}
                      placeholder="Contoh: KTP / Kartu Pelajar"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newDocDescription">Deskripsi</Label>
                    <Input
                      id="newDocDescription"
                      value={newDocRequirement.description ?? ""} 
                      onChange={(e) => handleNewDocRequirementChange("description", e.target.value)}
                      placeholder="Contoh: Scan KTP / Kartu Pelajar yang masih berlaku"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-2">
                  <Switch
                    id="newDocRequired"
                    checked={newDocRequirement.required ?? false} 
                    onCheckedChange={(checked) => handleNewDocRequirementChange("required", checked)}
                  />
                  <Label htmlFor="newDocRequired">
                    Wajib diunggah oleh peserta
                  </Label>
                </div>
                
                <Button
                  type="button"
                  onClick={handleAddDocRequirement}
                  className="mt-2"
                  disabled={!newDocRequirement.name}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Dokumen
                </Button>
              </div>
              
              <Alert variant="info" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Pastikan persyaratan dokumen yang Anda minta sesuai dengan tujuan event dan tidak berlebihan.
                  Terlalu banyak persyaratan dokumen dapat menghalangi peserta untuk mendaftar.
                </AlertDescription>
              </Alert>
            </>
          )}
        </CardContent>
      </Card>
      
      {/* Terms & Conditions Card */}
      <Card>
        <CardHeader>
          <CardTitle>Syarat dan Ketentuan</CardTitle>
          <CardDescription>
            Tetapkan syarat dan ketentuan yang berlaku untuk tournament Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="termsAndConditions">Syarat dan Ketentuan</Label>
            <Textarea
              id="termsAndConditions"
              name="termsAndConditions"
              rows={8}
              value={formData.termsAndConditions ?? ""} 
              onChange={handleInputChange}
              placeholder="Masukkan syarat dan ketentuan tournament..."
            />
            <p className="text-xs text-slate-500">
              Tuliskan syarat dan ketentuan yang berlaku untuk tournament Anda. 
              Ini akan ditampilkan kepada peserta saat melakukan pendaftaran.
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="space-y-0.5">
              <Label htmlFor="requireTermsAcceptance" className="text-base">Wajibkan Penerimaan</Label>
              <p className="text-sm text-slate-500">
                Aktifkan jika peserta wajib menyetujui syarat dan ketentuan untuk mendaftar
              </p>
            </div>
            <Switch
              id="requireTermsAcceptance"
              checked={formData.requireTermsAcceptance ?? false} 
              onCheckedChange={(checked) => handleSwitchChange("requireTermsAcceptance", checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}