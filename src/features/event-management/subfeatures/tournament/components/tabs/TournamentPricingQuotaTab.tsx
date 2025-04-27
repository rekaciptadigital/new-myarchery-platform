/**
 * TournamentPricingQuotaTab component
 * Third tab of the tournament creation form with pricing and quota settings
 */
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// Import necessary types
import { 
  TournamentFormData, 
  PricingCategory, 
  TournamentFormDataValue, // Import the value union type
  EarlyBirdSettings,       // Import EarlyBirdSettings
  LateRegistrationSettings, // Import LateRegistrationSettings
  SinglePrice // Import SinglePrice type
} from "@/features/event-management/subfeatures/tournament/core/models/tournament"; 
import { Plus, Trash2 } from "lucide-react"; 

interface TournamentPricingQuotaTabProps {
  readonly formData: TournamentFormData;
  // Use the specific value type
  readonly onFieldChange: (field: keyof TournamentFormData, value: TournamentFormDataValue) => void; 
  // Use specific types for section changes
  readonly onEarlyBirdChange: (data: Partial<EarlyBirdSettings>) => void;
  readonly onLateRegistrationChange: (data: Partial<LateRegistrationSettings>) => void;
}

export function TournamentPricingQuotaTab({ 
  formData, 
  onFieldChange,
  onEarlyBirdChange,
  onLateRegistrationChange
}: TournamentPricingQuotaTabProps) {
  // State for new pricing category
  const [newCategory, setNewCategory] = useState<Partial<PricingCategory>>({
    category: "",
    // Initialize price as 0 (number) instead of "" (string)
    price: 0, 
    currency: "IDR"
  });
  
  // Handlers for form inputs
  const handleRadioChange = (name: keyof TournamentFormData, value: string) => {
    onFieldChange(name, value);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange(e.target.name as keyof TournamentFormData, e.target.value);
  };
  
  const handleSinglePriceChange = (field: keyof SinglePrice, value: string) => { // Use keyof SinglePrice
    // Ensure singlePrice exists before spreading
    const currentSinglePrice = formData.singlePrice ?? {}; 
    
    // Determine the processed value based on the field
    let processedValue: string | number;
    if (field === 'price') {
      processedValue = value ? parseInt(value) : 0; // Parse if it's the price field
    } else {
      processedValue = value; // Otherwise, use the string value directly
    }

    onFieldChange("singlePrice", {
      ...currentSinglePrice,
      // Use the processed value
      [field]: processedValue 
    });
  };
  
  // Early bird handlers
  const handleEarlyBirdToggle = (checked: boolean) => {
    // Ensure earlyBird exists before spreading
    const currentEarlyBird = formData.earlyBird ?? {}; 
    onEarlyBirdChange({
      ...currentEarlyBird,
      enabled: checked
    });
  };
  
  const handleEarlyBirdChange = (field: keyof Omit<EarlyBirdSettings, 'enabled'>, value: string) => { // Use keyof EarlyBirdSettings
    // Ensure earlyBird exists before spreading
    const currentEarlyBird = formData.earlyBird ?? {}; 
    onEarlyBirdChange({
      ...currentEarlyBird,
      [field]: value // Consider converting value to number if field is 'discount'
    });
  };
  
  // Late registration handlers
  const handleLateRegistrationToggle = (checked: boolean) => {
    // Ensure lateRegistration exists before spreading
    const currentLateReg = formData.lateRegistration ?? {}; 
    onLateRegistrationChange({
      ...currentLateReg,
      enabled: checked
    });
  };
  
  const handleLateRegistrationChange = (field: keyof Omit<LateRegistrationSettings, 'enabled'>, value: string) => { // Use keyof LateRegistrationSettings
    // Ensure lateRegistration exists before spreading
    const currentLateReg = formData.lateRegistration ?? {}; 
    onLateRegistrationChange({
      ...currentLateReg,
      [field]: value // Consider converting value to number if field is 'fee'
    });
  };

  // Multi pricing handlers
  const handleNewCategoryInputChange = (field: keyof PricingCategory, value: string) => { // Use keyof PricingCategory
    // Determine the processed value based on the field
    let processedValue: string | number;
    if (field === 'price') {
      processedValue = value ? parseInt(value) : 0; // Parse if it's the price field
    } else {
      processedValue = value; // Otherwise, use the string value directly
    }

    setNewCategory(prev => ({
      ...prev,
      // Use the processed value
      [field]: processedValue 
    }));
  };
  
  const addPricingCategory = () => {
    // Check might need adjustment if 0 is a valid price
    if (!newCategory.category || newCategory.price === undefined) { 
      alert("Kategori dan harga harus diisi");
      return;
    }
    
    const newPricingCategory: PricingCategory = { // Ensure type is PricingCategory
      category: newCategory.category, 
      price: newCategory.price,     
      currency: newCategory.currency ?? "IDR" 
    };
    
    onFieldChange("multiPricing", [...(formData.multiPricing ?? []), newPricingCategory]); 
    
    // Reset form
    setNewCategory({
      category: "",
      // Reset price to 0
      price: 0, 
      currency: "IDR"
    });
  };
  
  const removePricingCategory = (index: number) => { // Add type 'number' to index
    // Use ?? instead of ||
    const updatedCategories = [...(formData.multiPricing ?? [])]; 
    updatedCategories.splice(index, 1);
    onFieldChange("multiPricing", updatedCategories);
  };
  
  // Category quota handlers
  const handleCategoryQuotaChange = (index: number, value: string) => {
    if (!formData.categoryQuotas) return;
    
    const updatedQuotas = [...formData.categoryQuotas];
    updatedQuotas[index] = {
      ...updatedQuotas[index],
      quota: value
    };
    
    onFieldChange("categoryQuotas", updatedQuotas);
  };
  
  // Initialize or update category quotas when pricing type or multi pricing changes
  const updateCategoryQuotas = () => {
    if (formData.pricingType === "multi" && formData.multiPricing && formData.multiPricing.length > 0) {
      // Create quotas for each pricing category if they don't exist
      const currentCategories = formData.multiPricing.map(item => item.category);
      // Use ?? instead of ||
      const currentQuotas = formData.categoryQuotas ?? []; 
      
      // Filter out any quotas for categories that no longer exist
      const filteredQuotas = currentQuotas.filter(quota => 
        currentCategories.includes(quota.category)
      );
      
      // Add quotas for any new categories
      const newQuotas = currentCategories
        .filter(category => !filteredQuotas.some(quota => quota.category === category))
        .map(category => ({ category, quota: "" }));
      
      onFieldChange("categoryQuotas", [...filteredQuotas, ...newQuotas]);
    }
  };
  
  // Update quotas whenever pricing changes
  if (formData.pricingType === "multi" && formData.quotaType === "category") {
    updateCategoryQuotas();
  }
  
  return (
    <div className="space-y-6">
      {/* Pricing Mechanism Card */}
      <Card>
        <CardHeader>
          <CardTitle>Mekanisme Harga</CardTitle>
          <CardDescription>
            Atur jenis penetapan harga dan tarif pendaftaran tournament
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Jenis Harga</Label>
            <RadioGroup 
              value={formData.pricingType} 
              onValueChange={(value) => handleRadioChange("pricingType", value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="single" id="pricing-single" />
                <Label htmlFor="pricing-single" className="font-normal">
                  Single Price - Satu harga untuk semua kategori
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multi" id="pricing-multi" />
                <Label htmlFor="pricing-multi" className="font-normal">
                  Multi Price - Harga berbeda untuk setiap kategori
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Single price form */}
          {formData.pricingType === "single" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                {/* Update Label htmlFor */}
                <Label htmlFor="singlePriceAmount">Harga Pendaftaran</Label> 
                <Input
                  id="singlePriceAmount"
                  type="number"
                  // Use formData.singlePrice?.price instead of amount
                  value={formData.singlePrice?.price ?? ""} 
                  // Use "price" instead of "amount"
                  onChange={(e) => handleSinglePriceChange("price", e.target.value)} 
                  placeholder="Contoh: 250000"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="singlePriceCurrency">Mata Uang</Label>
                <Select
                  // Use ?? instead of ||
                  value={formData.singlePrice?.currency ?? "IDR"} 
                  onValueChange={(value) => handleSinglePriceChange("currency", value)}
                >
                  <SelectTrigger id="singlePriceCurrency">
                    <SelectValue placeholder="Pilih mata uang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IDR">IDR - Rupiah</SelectItem>
                    <SelectItem value="USD">USD - Dollar Amerika</SelectItem>
                    <SelectItem value="SGD">SGD - Dollar Singapura</SelectItem>
                    <SelectItem value="MYR">MYR - Ringgit Malaysia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {/* Multi price form */}
          {formData.pricingType === "multi" && (
            <div className="space-y-4 mt-4">
              {/* List of existing categories */}
              {formData.multiPricing && formData.multiPricing.length > 0 ? (
                <div className="space-y-3">
                  <Label>Kategori Harga</Label>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-slate-500">Kategori</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-slate-500">Harga</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-slate-500">Mata Uang</th>
                          <th className="px-4 py-2 text-center text-sm font-medium text-slate-500">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.multiPricing.map((item, index) => (
                          // Use item category and index for a more stable key
                          <tr key={`${item.category}-${index}`} className="border-t"> 
                            <td className="px-4 py-2">{item.category}</td>
                            <td className="px-4 py-2">{item.price}</td>
                            <td className="px-4 py-2">{item.currency}</td>
                            <td className="px-4 py-2 text-center">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removePricingCategory(index)}
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
              <div className="space-y-3 mt-5">
                <Label>Tambah Kategori Harga Baru</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newCategoryName">Nama Kategori</Label>
                    <Input
                      id="newCategoryName"
                      // Use ?? instead of ||
                      value={newCategory.category ?? ""} 
                      onChange={(e) => handleNewCategoryInputChange("category", e.target.value)}
                      placeholder="Contoh: Recurve Men"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newCategoryPrice">Harga</Label>
                    <Input
                      id="newCategoryPrice"
                      type="number"
                      // Value should now correctly be a number or empty string for display
                      value={newCategory.price ?? ""} 
                      onChange={(e) => handleNewCategoryInputChange("price", e.target.value)}
                      placeholder="Contoh: 250000"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newCategoryCurrency">Mata Uang</Label>
                    <Select
                      // Use ?? instead of ||
                      value={newCategory.currency ?? "IDR"} 
                      onValueChange={(value) => handleNewCategoryInputChange("currency", value)}
                    >
                      <SelectTrigger id="newCategoryCurrency">
                        <SelectValue placeholder="Pilih mata uang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IDR">IDR - Rupiah</SelectItem>
                        <SelectItem value="USD">USD - Dollar Amerika</SelectItem>
                        <SelectItem value="SGD">SGD - Dollar Singapura</SelectItem>
                        <SelectItem value="MYR">MYR - Ringgit Malaysia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button
                  type="button"
                  onClick={addPricingCategory}
                  className="mt-2"
                  // Adjust disabled check if 0 is a valid price
                  disabled={!newCategory.category || newCategory.price === undefined} 
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Kategori
                </Button>
              </div>
            </div>
          )}
          
          {/* Early Bird Discount */}
          <div className="border-t pt-4 mt-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="earlyBirdEnabled" 
                // Use ?? instead of ||
                checked={formData.earlyBird?.enabled ?? false} 
                onCheckedChange={(checked) => handleEarlyBirdToggle(checked === true)}
              />
              <Label 
                htmlFor="earlyBirdEnabled"
                className="font-medium"
              >
                Aktifkan Early Bird Discount
              </Label>
            </div>
            
            {formData.earlyBird?.enabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                <div className="space-y-2">
                  <Label htmlFor="earlyBirdEndDate">Tanggal Akhir Early Bird</Label>
                  <Input
                    id="earlyBirdEndDate"
                    type="date"
                    // Use ?? instead of ||
                    value={formData.earlyBird?.endDate ?? ""} 
                    onChange={(e) => handleEarlyBirdChange("endDate", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="earlyBirdDiscount">Persentase Diskon (%)</Label>
                  <Input
                    id="earlyBirdDiscount"
                    type="number"
                    // Use ?? instead of ||
                    value={formData.earlyBird?.discount ?? ""} 
                    onChange={(e) => handleEarlyBirdChange("discount", e.target.value)}
                    placeholder="Contoh: 15"
                    min="1"
                    max="99"
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Late Registration Fee */}
          <div className="border-t pt-4 mt-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="lateRegistrationEnabled" 
                // Use ?? instead of ||
                checked={formData.lateRegistration?.enabled ?? false} 
                onCheckedChange={(checked) => handleLateRegistrationToggle(checked === true)}
              />
              <Label 
                htmlFor="lateRegistrationEnabled"
                className="font-medium"
              >
                Aktifkan Late Registration Fee
              </Label>
            </div>
            
            {formData.lateRegistration?.enabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                <div className="space-y-2">
                  <Label htmlFor="lateRegistrationStartDate">Tanggal Mulai Late Registration</Label>
                  <Input
                    id="lateRegistrationStartDate"
                    type="date"
                    // Use ?? instead of ||
                    value={formData.lateRegistration?.startDate ?? ""} 
                    onChange={(e) => handleLateRegistrationChange("startDate", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lateRegistrationFee">Persentase Tambahan Biaya (%)</Label>
                  <Input
                    id="lateRegistrationFee"
                    type="number"
                    // Use ?? instead of ||
                    value={formData.lateRegistration?.fee ?? ""} 
                    onChange={(e) => handleLateRegistrationChange("fee", e.target.value)}
                    placeholder="Contoh: 10"
                    min="1"
                    max="99"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Participant Quota Card */}
      <Card>
        <CardHeader>
          <CardTitle>Kuota Peserta</CardTitle>
          <CardDescription>
            Atur batasan jumlah peserta yang dapat mendaftar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Jenis Kuota</Label>
            <RadioGroup 
              value={formData.quotaType} 
              onValueChange={(value) => handleRadioChange("quotaType", value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="total" id="quota-total" />
                <Label htmlFor="quota-total" className="font-normal">
                  Total - Batasan jumlah total peserta
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="category" id="quota-category" />
                <Label htmlFor="quota-category" className="font-normal">
                  Per Kategori - Batasan jumlah peserta untuk setiap kategori
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Total quota form */}
          {formData.quotaType === "total" && (
            <div className="space-y-2 mt-4">
              <Label htmlFor="totalQuota">Jumlah Maksimum Peserta</Label>
              <Input
                id="totalQuota"
                name="totalQuota"
                type="number"
                // Use ?? instead of ||
                value={formData.totalQuota ?? ""} 
                onChange={handleInputChange}
                placeholder="Contoh: 200"
                min="1"
              />
              <p className="text-xs text-slate-500">
                Atur batasan maksimum jumlah total peserta yang dapat mendaftar.
              </p>
            </div>
          )}
          
          {/* Category quota form */}
          {formData.quotaType === "category" && formData.pricingType === "multi" && formData.multiPricing && (
            <div className="space-y-4 mt-4">
              <Label>Kuota Per Kategori</Label>
              
              {formData.categoryQuotas && formData.categoryQuotas.length > 0 ? (
                <div className="space-y-2">
                  {formData.categoryQuotas.map((item, index) => (
                    // Use item category and index for a more stable key
                    <div key={`${item.category}-${index}`} className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-3 rounded-md"> 
                      <div className="font-medium">{item.category}</div>
                      <div>
                        <Input
                          type="number"
                          value={item.quota}
                          onChange={(e) => handleCategoryQuotaChange(index, e.target.value)}
                          placeholder="Jumlah maksimum peserta"
                          min="1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 border rounded-md bg-slate-50">
                  <p className="text-slate-500">
                    {formData.pricingType === "multi" && formData.multiPricing.length === 0 ? 
                      "Tambahkan kategori harga terlebih dahulu" : 
                      "Belum ada kuota kategori yang ditambahkan"}
                  </p>
                </div>
              )}
              
              {formData.pricingType !== "multi" && (
                <p className="text-xs text-yellow-600">
                  Untuk menggunakan kuota per kategori, pilih jenis harga &quot;Multi Price&quot; pada pengaturan sebelumnya.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}