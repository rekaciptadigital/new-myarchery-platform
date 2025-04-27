/**
 * TournamentPricingTab component
 * Third tab of the tournament creation form with pricing and quota settings
 */
// Combine React imports
import React, { useState } from "react"; 
// Import necessary types using the correct path alias
import { 
  TournamentFormData, 
  ImageInput, 
  PricingCategory, 
  CategoryQuota,
  // Import settings types
  EarlyBirdSettings,
  LateRegistrationSettings,
  // Import SinglePrice type
  SinglePrice 
} from "@/features/event-management/subfeatures/tournament/core/models/tournament"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
// Import Select components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; 
import { CalendarIcon, Trash2, Plus, Tag, DollarSign } from "lucide-react";

interface TournamentPricingTabProps {
  readonly formData: TournamentFormData;
  // Update the onFieldChange signature to include settings and SinglePrice types
  readonly onFieldChange: (
    field: keyof TournamentFormData, 
    value: string | number | boolean | ImageInput | undefined | unknown[] | Partial<EarlyBirdSettings> | Partial<LateRegistrationSettings> | Partial<SinglePrice>
  ) => void;
}

export function TournamentPricingTab({ 
  formData, 
  onFieldChange, 
}: TournamentPricingTabProps) {
  // State for new category inputs
  const [newCategory, setNewCategory] = useState<Partial<PricingCategory>>({
    category: "", 
    // Initialize price as 0 (number)
    price: 0, 
    currency: "IDR", 
  });
  
  const [newQuota, setNewQuota] = useState<Partial<CategoryQuota>>({
    // Rename 'categoryName' to 'category'
    category: "", 
    quota: 0
  });
  
  // Handlers for form inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onFieldChange(e.target.name as keyof TournamentFormData, e.target.value);
  };
  
  // This handler might need adjustment or removal if 'basePrice' is fully replaced
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as keyof TournamentFormData;
    const value = e.target.value ? parseInt(e.target.value) : "";
    // Check if the field is NOT singlePrice related before calling onFieldChange
    if (fieldName !== 'singlePrice') { 
        onFieldChange(fieldName, value);
    }
    // If it was intended for singlePrice, it's now handled by handleSinglePriceChange
  };
  
  // Handle changes for the single price object
  const handleSinglePriceChange = (field: keyof SinglePrice, value: string | number) => {
    // Determine the processed value based on the field
    let processedValue: string | number;
    if (field === 'price') {
      // Parse if it's the price field, default to 0 if value is empty/falsy
      processedValue = value ? parseInt(value as string) : 0; 
    } else {
      // Otherwise, use the value directly (likely for currency)
      processedValue = value; 
    }

    onFieldChange("singlePrice", {
      ...(formData.singlePrice ?? { currency: "IDR" }), // Default currency if needed
      // Use the processed value
      [field]: processedValue 
    });
  };
  
  // Handle radio group changes - converting onValueChange to onChange for compatibility
  const handleRadioGroupChange = (name: keyof TournamentFormData, value: string) => {
    onFieldChange(name, value);
  };
  
  // Pricing category handlers
  const handleNewCategoryChange = (field: keyof PricingCategory, value: string | number) => {
    // Determine the processed value based on the field
    let processedValue: string | number;
    if (field === 'price') {
      // Parse if it's the price field, default to 0 if value is empty/falsy
      processedValue = value ? parseInt(value as string) : 0; 
    } else {
      // Otherwise, use the value directly (likely for category name or currency)
      processedValue = value; 
    }

    setNewCategory((prev) => ({
      ...prev,
      // Use the processed value
      [field]: processedValue 
    }));
  };
  
  const handleAddPricingCategory = () => {
    // The check for undefined might still be relevant if price could be 0
    if (!newCategory.category || newCategory.price === undefined) { 
      alert("Nama kategori dan harga harus diisi");
      return;
    }
    
    const newCategoryComplete: PricingCategory = {
      category: newCategory.category, 
      price: newCategory.price,     
      currency: newCategory.currency ?? "IDR", 
    };
    
    onFieldChange(
      "multiPricing", 
      [...(formData.multiPricing ?? []), newCategoryComplete] 
    );
    
    // Reset the form
    setNewCategory({
      category: "", 
      // Reset price to 0
      price: 0, 
      currency: "IDR", 
    });
  };
  
  const handleRemovePricingCategory = (index: number) => {
    // Use 'multiPricing' instead of 'pricingCategories'
    const updatedCategories = [...(formData.multiPricing ?? [])]; 
    updatedCategories.splice(index, 1);
    // Use 'multiPricing' instead of 'pricingCategories'
    onFieldChange("multiPricing", updatedCategories); 
  };
  
  // Quota handlers
  const handleNewQuotaChange = (field: keyof CategoryQuota, value: string | number) => {
    // Determine the processed value based on the field
    let processedValue: string | number;
    if (field === 'quota') {
      // Parse if it's the quota field, default to 0 if value is empty/falsy
      processedValue = value ? parseInt(value as string) : 0; 
    } else {
      // Otherwise, use the value directly (likely for category name)
      processedValue = value; 
    }

    setNewQuota((prev) => ({
      ...prev,
      // Use the processed value
      [field]: processedValue 
    }));
  };
  
  const handleAddCategoryQuota = () => {
    // Check for 'category' instead of 'categoryName'
    if (!newQuota.category || newQuota.quota === undefined) { 
      alert("Nama kategori dan kuota harus diisi");
      return;
    }
    
    const newQuotaComplete: CategoryQuota = {
      // Use 'category' instead of 'categoryName'
      category: newQuota.category, 
      quota: newQuota.quota
    };
    
    onFieldChange(
      "categoryQuotas", 
      [...(formData.categoryQuotas ?? []), newQuotaComplete] 
    );
    
    // Reset the form
    setNewQuota({
      // Use 'category' instead of 'categoryName'
      category: "", 
      quota: 0
    });
  };
  
  const handleRemoveCategoryQuota = (index: number) => {
    const updatedQuotas = [...(formData.categoryQuotas ?? [])]; 
    updatedQuotas.splice(index, 1);
    onFieldChange("categoryQuotas", updatedQuotas);
  };
  
  // Early bird handlers
  const handleEarlyBirdToggle = (checked: boolean) => {
    onFieldChange("earlyBird", {
      ...(formData.earlyBird ?? {}), 
      enabled: checked
    });
  };
  
  const handleEarlyBirdChange = (field: string, value: string | number) => {
    // Determine the processed value based on the field
    let processedValue: string | number;
    if (field === 'discount') {
      // Parse if it's the discount field, default to 0 if value is empty/falsy
      processedValue = value ? parseInt(value as string) : 0; 
    } else {
      // Otherwise, use the value directly (likely for endDate)
      processedValue = value; 
    }

    onFieldChange("earlyBird", {
      ...(formData.earlyBird ?? { enabled: false }), 
      // Use the processed value
      [field as keyof EarlyBirdSettings]: processedValue 
    });
  };
  
  // Late registration handlers
  const handleLateRegistrationToggle = (checked: boolean) => {
    onFieldChange("lateRegistration", {
      ...(formData.lateRegistration ?? {}), 
      enabled: checked
    });
  };
  
  const handleLateRegistrationChange = (field: string, value: string | number) => {
    // Determine the processed value based on the field
    let processedValue: string | number;
    if (field === 'fee') {
      // Parse if it's the fee field, default to 0 if value is empty/falsy
      processedValue = value ? parseInt(value as string) : 0; 
    } else {
      // Otherwise, use the value directly (likely for startDate)
      processedValue = value; 
    }

    onFieldChange("lateRegistration", {
      ...(formData.lateRegistration ?? { enabled: false }), 
      // Use the processed value
      [field as keyof LateRegistrationSettings]: processedValue 
    });
  };
  
  // Format price to rupiah
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };
  
  return (
    <div className="space-y-6">
      {/* Pricing Card */}
      <Card>
        <CardHeader>
          <CardTitle>Pendaftaran dan Harga</CardTitle>
          <CardDescription>
            Atur harga dan tipe pendaftaran untuk tournament Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Model Pendaftaran</Label>
            <RadioGroup 
              // Use 'multi' as the value for category pricing
              value={formData.pricingType ?? "single"} 
              onValueChange={(value) => handleRadioGroupChange("pricingType", value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="free" id="free" />
                <Label htmlFor="free" className="cursor-pointer">Gratis - Tidak ada biaya pendaftaran</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="single" id="single" />
                <Label htmlFor="single" className="cursor-pointer">Harga Tunggal - Satu harga untuk semua kategori</Label>
              </div>
              <div className="flex items-center space-x-2">
                {/* Change value from "categories" to "multi" */}
                <RadioGroupItem value="multi" id="multi" /> 
                {/* Update label htmlFor */}
                <Label htmlFor="multi" className="cursor-pointer">Per Kategori - Harga berbeda untuk tiap kategori</Label> 
              </div>
            </RadioGroup>
          </div>
          
          {formData.pricingType === "single" && (
            <div className="mt-4 space-y-2">
              {/* Update Label htmlFor */}
              <Label htmlFor="singlePrice">Harga Pendaftaran (Rp) <span className="text-red-500">*</span></Label> 
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm">
                  <DollarSign className="h-4 w-4" />
                </span>
                <Input
                  // Update id and name
                  id="singlePrice" 
                  name="singlePrice" 
                  type="number"
                  min="0"
                  step="1000"
                  // Use formData.singlePrice?.price
                  value={formData.singlePrice?.price ?? ""} 
                  // Use the new handler for price changes
                  onChange={(e) => handleSinglePriceChange("price", e.target.value)} 
                  placeholder="Contoh: 150000"
                  className="rounded-l-none"
                />
                {/* Consider adding a currency selector here if needed for single price */}
              </div>
            </div>
          )}
          
          {/* Change condition from "categories" to "multi" */}
          {formData.pricingType === "multi" && ( 
            <div className="mt-4 space-y-3">
              <Label>Harga Per Kategori</Label>
              
              {/* Use 'multiPricing' instead of 'pricingCategories' */}
              {formData.multiPricing && formData.multiPricing.length > 0 ? ( 
                <div className="space-y-3">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="px-4 py-2 text-left text-sm font-medium text-slate-500">Kategori</th> 
                          <th className="px-4 py-2 text-left text-sm font-medium text-slate-500">Harga</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-slate-500">Mata Uang</th> 
                          <th className="px-4 py-2 text-center text-sm font-medium text-slate-500">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Use 'multiPricing' instead of 'pricingCategories' */}
                        {(formData.multiPricing ?? []).map((category, index) => ( 
                          <tr key={`${category.category}-${index}`} className="border-t"> 
                            <td className="px-4 py-2">{category.category}</td> 
                            <td className="px-4 py-2">{formatPrice(category.price)}</td>
                            <td className="px-4 py-2">{category.currency}</td> 
                            <td className="px-4 py-2 text-center">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemovePricingCategory(index)}
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
                  <p className="text-slate-500">Belum ada kategori harga yang ditambahkan</p>
                </div>
              )}
              
              {/* Form to add new category */}
              <div className="space-y-3 mt-4 p-4 border rounded-md">
                <Label>Tambah Kategori Baru</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> 
                  <div className="space-y-2">
                    <Label htmlFor="newCategoryName">Nama Kategori</Label>
                    <Input
                      id="newCategoryName"
                      value={newCategory.category ?? ""} 
                      onChange={(e) => handleNewCategoryChange("category", e.target.value)} 
                      placeholder="Contoh: U-15 Putra"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newCategoryPrice">Harga (Rp)</Label>
                    <Input
                      id="newCategoryPrice"
                      type="number"
                      min="0"
                      step="1000"
                      // Value should now correctly be a number or empty string for display
                      value={newCategory.price ?? ""} 
                      onChange={(e) => handleNewCategoryChange("price", e.target.value)}
                      placeholder="Contoh: 150000"
                    />
                  </div>
                  
                  {/* Add Currency Select */}
                  <div className="space-y-2">
                    <Label htmlFor="newCategoryCurrency">Mata Uang</Label>
                    <Select
                      value={newCategory.currency ?? "IDR"}
                      onValueChange={(value) => handleNewCategoryChange("currency", value)}
                    >
                      <SelectTrigger id="newCategoryCurrency">
                        <SelectValue placeholder="Pilih mata uang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IDR">IDR - Rupiah</SelectItem>
                        <SelectItem value="USD">USD - Dollar Amerika</SelectItem>
                        {/* Add other currencies if needed */}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button
                  type="button"
                  onClick={handleAddPricingCategory}
                  className="mt-2"
                  // Check might need adjustment if 0 is a valid price but shouldn't disable
                  disabled={!newCategory.category || newCategory.price === undefined} 
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Kategori
                </Button>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
            <div className="space-y-2">
              <Label htmlFor="registrationStartDate">Tanggal Mulai Pendaftaran <span className="text-red-500">*</span></Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm">
                  <CalendarIcon className="h-4 w-4" />
                </span>
                <Input
                  id="registrationStartDate"
                  name="registrationStartDate"
                  type="date"
                  value={formData.registrationStartDate ?? ""} 
                  onChange={handleInputChange}
                  className="rounded-l-none"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="registrationEndDate">Tanggal Tutup Pendaftaran <span className="text-red-500">*</span></Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm">
                  <CalendarIcon className="h-4 w-4" />
                </span>
                <Input
                  id="registrationEndDate"
                  name="registrationEndDate"
                  type="date"
                  value={formData.registrationEndDate ?? ""} 
                  onChange={handleInputChange}
                  className="rounded-l-none"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="earlyBirdEnabled" className="text-base">Early Bird Discount</Label>
                <p className="text-sm text-slate-500">Berikan diskon untuk pendaftar awal</p>
              </div>
              <Switch
                id="earlyBirdEnabled"
                checked={formData.earlyBird?.enabled ?? false} 
                onCheckedChange={handleEarlyBirdToggle}
              />
            </div>
            
            {formData.earlyBird?.enabled && (
              <div className="pl-4 border-l-2 border-blue-100 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {/* Use 'discount' instead of 'percentage' */}
                    <Label htmlFor="earlyBirdDiscount">Persentase Diskon (%)</Label> 
                    <Input
                      // Use 'discount' instead of 'percentage'
                      id="earlyBirdDiscount" 
                      type="number"
                      min="1"
                      max="100"
                      // Use 'discount' instead of 'percentage'
                      value={formData.earlyBird?.discount ?? ""} 
                      // Use 'discount' instead of 'percentage'
                      onChange={(e) => handleEarlyBirdChange("discount", e.target.value)} 
                      placeholder="Contoh: 15"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    {/* Use 'endDate' instead of 'deadline' */}
                    <Label htmlFor="earlyBirdEndDate">Berlaku Hingga</Label> 
                    <Input
                      // Use 'endDate' instead of 'deadline'
                      id="earlyBirdEndDate" 
                      type="date"
                      // Use 'endDate' instead of 'deadline'
                      value={formData.earlyBird?.endDate ?? ""} 
                      // Use 'endDate' instead of 'deadline'
                      onChange={(e) => handleEarlyBirdChange("endDate", e.target.value)} 
                    />
                  </div>
                </div>
                
                {/* Remove Early Bird Description Input */}
                {/* 
                <div className="space-y-2">
                  <Label htmlFor="earlyBirdDescription">Deskripsi (Opsional)</Label>
                  <Input
                    id="earlyBirdDescription"
                    value={formData.earlyBird?.description ?? ""} 
                    onChange={(e) => handleEarlyBirdChange("description", e.target.value)}
                    placeholder="Contoh: Diskon 15% untuk pendaftar sebelum 30 April"
                  />
                </div> 
                */}
              </div>
            )}
            
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <Label htmlFor="lateRegistrationEnabled" className="text-base">Denda Pendaftaran Terlambat</Label>
                <p className="text-sm text-slate-500">Tambahkan biaya untuk pendaftar yang mendaftar mendekati hari-H</p>
              </div>
              <Switch
                id="lateRegistrationEnabled"
                checked={formData.lateRegistration?.enabled ?? false} 
                onCheckedChange={handleLateRegistrationToggle}
              />
            </div>
            
            {formData.lateRegistration?.enabled && (
              <div className="pl-4 border-l-2 border-orange-100 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {/* Use 'fee' instead of 'percentage' */}
                    <Label htmlFor="lateRegistrationFee">Persentase Penambahan (%)</Label> 
                    <Input
                      // Use 'fee' instead of 'percentage'
                      id="lateRegistrationFee" 
                      type="number"
                      min="1"
                      max="100"
                      // Use 'fee' instead of 'percentage'
                      value={formData.lateRegistration?.fee ?? ""} 
                      // Use 'fee' instead of 'percentage'
                      onChange={(e) => handleLateRegistrationChange("fee", e.target.value)} 
                      placeholder="Contoh: 20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lateRegistrationStartDate">Berlaku Mulai</Label>
                    <Input
                      id="lateRegistrationStartDate"
                      type="date"
                      value={formData.lateRegistration?.startDate ?? ""} 
                      onChange={(e) => handleLateRegistrationChange("startDate", e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Remove Late Registration Description Input */}
                {/* 
                <div className="space-y-2">
                  <Label htmlFor="lateRegistrationDescription">Deskripsi (Opsional)</Label>
                  <Input
                    id="lateRegistrationDescription"
                    value={formData.lateRegistration?.description ?? ""} 
                    onChange={(e) => handleLateRegistrationChange("description", e.target.value)}
                    placeholder="Contoh: Tambahan 20% untuk pendaftar setelah 15 Mei"
                  />
                </div> 
                */}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Quota Card */}
      <Card>
        <CardHeader>
          <CardTitle>Kuota Peserta</CardTitle>
          <CardDescription>
            Atur kuota maksimal untuk tournament Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="maxParticipants">Total Maksimum Peserta</Label>
            <Input
              id="maxParticipants"
              name="maxParticipants"
              type="number"
              min="1"
              value={formData.maxParticipants ?? ""} 
              onChange={handleNumberInputChange}
              placeholder="Contoh: 200"
            />
            <p className="text-xs text-slate-500">
              Biarkan kosong jika tidak ada batasan jumlah peserta
            </p>
          </div>
          
          <div className="space-y-2 mt-3">
            <Label>Distribusi Kuota</Label>
            <RadioGroup 
              // Use 'quotaType' instead of 'participantDistribution'
              value={formData.quotaType ?? "automatic"} 
              // Use 'quotaType' instead of 'participantDistribution'
              onValueChange={(value) => handleRadioGroupChange("quotaType", value)} 
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="automatic" id="automatic" />
                <Label htmlFor="automatic" className="cursor-pointer">Otomatis - Pendaftaran berdasarkan first-come first-served hingga kuota terpenuhi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="category" id="category" />
                <Label htmlFor="category" className="cursor-pointer">Per Kategori - Menetapkan kuota spesifik untuk setiap kategori</Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Use 'quotaType' instead of 'participantDistribution' */}
          {formData.quotaType === "category" && ( 
            <div className="mt-4 space-y-3">
              <Label>Kuota Per Kategori</Label>
              
              {formData.categoryQuotas && formData.categoryQuotas.length > 0 ? ( 
                <div className="space-y-3">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="px-4 py-2 text-left text-sm font-medium text-slate-500">Kategori</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-slate-500">Kuota</th>
                          <th className="px-4 py-2 text-center text-sm font-medium text-slate-500">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(formData.categoryQuotas ?? []).map((quota, index) => ( 
                          // Use quota category name and index for a more stable key
                          // Assuming the data property is 'category'
                          <tr key={`${quota.category}-${index}`} className="border-t"> 
                            <td className="px-4 py-2">{quota.category}</td> 
                            <td className="px-4 py-2">{quota.quota} peserta</td>
                            <td className="px-4 py-2 text-center">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveCategoryQuota(index)}
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
                  <p className="text-slate-500">Belum ada kuota per kategori yang ditambahkan</p>
                </div>
              )}
              
              <div className="space-y-3 mt-4 p-4 border rounded-md">
                <Label>Tambah Kuota Kategori</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newQuotaCategory">Nama Kategori</Label>
                    <Input
                      id="newQuotaCategory"
                      // Use 'category' instead of 'categoryName'
                      value={newQuota.category ?? ""} 
                      // Use 'category' instead of 'categoryName'
                      onChange={(e) => handleNewQuotaChange("category", e.target.value)} 
                      placeholder="Contoh: U-15 Putra"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newQuotaAmount">Jumlah Kuota</Label>
                    <Input
                      id="newQuotaAmount"
                      type="number"
                      min="1"
                      value={newQuota.quota ?? ""} 
                      onChange={(e) => handleNewQuotaChange("quota", e.target.value)}
                      placeholder="Contoh: 30"
                    />
                  </div>
                </div>
                
                <Button
                  type="button"
                  onClick={handleAddCategoryQuota}
                  className="mt-2"
                  // Use 'category' instead of 'categoryName'
                  disabled={!newQuota.category || !newQuota.quota} 
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Kuota Kategori
                </Button>
              </div>
            </div>
          )}
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-start">
              <Tag className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-700 font-medium">Tips kuota</p>
                <p className="text-xs text-blue-600 mt-1">
                  Pertimbangkan kapasitas venue dan batasan teknis saat menentukan kuota peserta.
                  Menetapkan kuota per kategori membantu memastikan distribusi peserta yang seimbang.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}