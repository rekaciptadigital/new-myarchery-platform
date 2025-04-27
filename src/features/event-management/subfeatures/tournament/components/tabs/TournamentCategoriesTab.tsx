/**
 * TournamentCategoriesTab component
 * Fourth tab of the tournament creation form with categories and competition format settings
 */
// Combine React imports
import React, { useState } from "react"; 
// Import necessary types using the correct path alias
import { 
  TournamentFormData, 
  ImageInput, 
  AgeCategory
} from "@/features/event-management/subfeatures/tournament/core/models/tournament";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus, Users } from "lucide-react";

interface TournamentCategoriesTabProps {
  readonly formData: TournamentFormData;
  readonly onFieldChange: (field: keyof TournamentFormData, value: string | number | boolean | ImageInput | undefined | unknown[]) => void;
  // Add errors prop
  readonly errors: Record<string, string>; 
}

export function TournamentCategoriesTab({ 
  formData, 
  onFieldChange, 
  errors // Destructure errors prop
}: TournamentCategoriesTabProps) {
  // State for new age category
  const [newAgeCategory, setNewAgeCategory] = useState<Partial<AgeCategory>>({
    name: "",
    minAge: "",
    maxAge: ""
  });
  
  const handleCheckboxChange = (field: keyof TournamentFormData, checked: boolean) => {
    onFieldChange(field, checked);
  };
  
  const handleSelectChange = (name: keyof TournamentFormData, value: string) => {
    onFieldChange(name, value);
  };
  
  // Age category handlers
  const handleNewAgeCategoryChange = (field: keyof AgeCategory, value: string | number) => {
    setNewAgeCategory((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleAddAgeCategory = () => {
    if (!newAgeCategory.name || !newAgeCategory.minAge || !newAgeCategory.maxAge) {
      alert("Semua field kategori usia harus diisi");
      return;
    }
    
    const newCategory: AgeCategory = {
      name: newAgeCategory.name, 
      minAge: newAgeCategory.minAge,
      maxAge: newAgeCategory.maxAge
    };
    
    onFieldChange(
      "ageCategories", 
      [...(formData.ageCategories ?? []), newCategory] 
    );
    
    // Reset the form
    setNewAgeCategory({
      name: "",
      minAge: "",
      maxAge: ""
    });
  };
  
  const handleRemoveAgeCategory = (index: number) => {
    const updatedCategories = [...(formData.ageCategories ?? [])]; 
    updatedCategories.splice(index, 1);
    onFieldChange("ageCategories", updatedCategories);
  };
  
  return (
    <div className="space-y-6">
      {/* Display general categories error if present */}
      {errors.categories && <p className="text-sm text-red-500 mb-4">{errors.categories}</p>} 

      {/* Age Categories Card */}
      <Card>
        <CardHeader>
          <CardTitle>Kategori Usia</CardTitle>
          <CardDescription>
            Tentukan kategori berdasarkan usia untuk peserta tournament
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ageCalculationMethod">Metode Perhitungan Usia</Label>
            <Select
              value={formData.ageCalculationMethod ?? "competitionDate"} 
              onValueChange={(value) => handleSelectChange("ageCalculationMethod", value)}
            >
              <SelectTrigger id="ageCalculationMethod">
                <SelectValue placeholder="Pilih metode perhitungan usia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="competitionDate">Usia saat kompetisi berlangsung</SelectItem>
                <SelectItem value="yearOnly">Usia berdasarkan tahun kelahiran saja</SelectItem>
                <SelectItem value="birthDateRange">Rentang tanggal lahir</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-slate-500">
              Tentukan bagaimana usia peserta akan dihitung untuk penempatan kategori
            </p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox 
              id="autoPlaceByAge" 
              checked={formData.autoPlaceByAge ?? false} 
              onCheckedChange={(checked) => handleCheckboxChange("autoPlaceByAge", checked === true)}
            />
            <Label htmlFor="autoPlaceByAge">
              Tempatkan peserta secara otomatis ke kategori berdasarkan usia
            </Label>
          </div>
          
          <div className="mt-4 space-y-3">
            <Label>Kategori Usia</Label>
            
            {formData.ageCategories && formData.ageCategories.length > 0 ? ( 
              <div className="space-y-3">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="px-4 py-2 text-left text-sm font-medium text-slate-500">Nama Kategori</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-slate-500">Usia Minimum</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-slate-500">Usia Maksimum</th>
                        <th className="px-4 py-2 text-center text-sm font-medium text-slate-500">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(formData.ageCategories ?? []).map((category, index) => ( 
                        // Use category name and index for a more stable key
                        <tr key={`${category.name}-${index}`} className="border-t"> 
                          <td className="px-4 py-2">{category.name}</td>
                          <td className="px-4 py-2">{category.minAge} tahun</td>
                          <td className="px-4 py-2">{category.maxAge} tahun</td>
                          <td className="px-4 py-2 text-center">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveAgeCategory(index)}
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
              <div className="text-center p-4 border rounded-md bg-slate-50">
                <p className="text-slate-500">Belum ada kategori usia yang ditambahkan</p>
              </div>
            )}
            
            <div className="space-y-3 mt-4 p-4 border rounded-md">
              <Label>Tambah Kategori Usia</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newAgeCategoryName">Nama Kategori</Label>
                  <Input
                    id="newAgeCategoryName"
                    value={newAgeCategory.name ?? ""} 
                    onChange={(e) => handleNewAgeCategoryChange("name", e.target.value)}
                    placeholder="Contoh: U-15"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newAgeCategoryMin">Usia Minimum</Label>
                  <Input
                    id="newAgeCategoryMin"
                    type="number"
                    min="0"
                    value={newAgeCategory.minAge ?? ""} 
                    onChange={(e) => handleNewAgeCategoryChange("minAge", e.target.value)}
                    placeholder="Contoh: 13"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newAgeCategoryMax">Usia Maksimum</Label>
                  <Input
                    id="newAgeCategoryMax"
                    type="number"
                    min="0"
                    value={newAgeCategory.maxAge ?? ""} 
                    onChange={(e) => handleNewAgeCategoryChange("maxAge", e.target.value)}
                    placeholder="Contoh: 15"
                  />
                </div>
              </div>
              
              <Button
                type="button"
                onClick={handleAddAgeCategory}
                className="mt-2"
                disabled={!newAgeCategory.name || !newAgeCategory.minAge || !newAgeCategory.maxAge}
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Kategori Usia
              </Button>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-start">
              <Users className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-700 font-medium">Tips kategori usia</p>
                <p className="text-xs text-blue-600 mt-1">
                  Kategori usia yang umum digunakan adalah U-10, U-13, U-15, U-18, U-21, Senior,
                  dan Master. Pastikan rentang usia tidak tumpang tindih antar kategori untuk 
                  menghindari kebingungan pada saat pendaftaran.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Competition Categories Card */}
      {/* ... (Assuming similar structure, potentially display errors here too) ... */}
      
      {/* Team Categories Card */}
      {/* ... (Assuming similar structure, potentially display errors here too) ... */}
    </div>
  );
}