/**
 * TournamentCreationForm component
 * Main component for creating a new tournament with multi-tab form interface
 */
// Combine React imports
import React, { useState } from "react"; 
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save, ArrowLeft, ArrowRight, Check } from "lucide-react";
// Use absolute path alias for imports
import { TournamentBasicInfoTab } from "@/features/event-management/subfeatures/tournament/components/tabs/TournamentBasicInfoTab"; 
import { TournamentLocationTab } from "@/features/event-management/subfeatures/tournament/components/tabs/TournamentLocationTab";
import { TournamentPricingTab } from "@/features/event-management/subfeatures/tournament/components/tabs/TournamentPricingTab";
import { TournamentCategoriesTab } from "@/features/event-management/subfeatures/tournament/components/tabs/TournamentCategoriesTab";
import { TournamentDocumentationTab } from "@/features/event-management/subfeatures/tournament/components/tabs/TournamentDocumentationTab";
import { TournamentService } from "../core/services/tournament-service";
// Import additional types needed for handleFieldChange
import { 
  TournamentFormData, 
  ImageInput, 
  EarlyBirdSettings, 
  LateRegistrationSettings, 
  SinglePrice,
} from "../core/models/tournament"; 

// Create instance of TournamentService
const tournamentService = new TournamentService();

// Define tab values as constants
const TABS = {
  BASIC_INFO: "basic-info",
  LOCATION: "location-time",
  PRICING: "pricing-quota",
  CATEGORIES: "categories-formats",
  DOCUMENTATION: "documentation-rules"
};

// Default form data - Updated
const defaultFormData: TournamentFormData = {
  // Basic Info
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  registrationStartDate: "",
  registrationEndDate: "",
  eventType: "individual", // Assuming default is individual
  logo: null,
  bannerImage: null,
  featuredImage: null,

  // Location
  locationType: "offline", // Assuming default is offline
  address: "",
  city: "",
  province: "",
  venue: "", // Add venue if it exists in the model
  venueDetails: "",
  googleMapsUrl: "",
  onlineLink: "", // Add onlineLink

  // Pricing & Quota - Updated
  pricingType: "single", // Default to single price
  singlePrice: { price: 0, currency: "IDR" }, // Default single price object
  multiPricing: [], // Default empty array
  earlyBird: { enabled: false, discount: 0, endDate: "" }, // Default early bird settings
  lateRegistration: { enabled: false, fee: 0, startDate: "" }, // Default late registration settings
  // Change default value from undefined to 0
  maxParticipants: 0, 
  quotaType: "total", // Default to total quota
  categoryQuotas: [], // Default empty array

  // Categories - Updated (assuming these are the correct fields)
  ageCategories: [],

  // Documentation
  generalRules: "",
  technicalRules: "",
  dressCode: "",
  requireDocumentUpload: false,
  documentRequirements: [],
  schedule: "",
  termsAndConditions: "",
  requireTermsAcceptance: true,
  // Add status if it's part of the form data model, otherwise it's added on submit
  // status: "draft", 
};

export function TournamentCreationForm() {
  // State for tracking current tab
  const [activeTab, setActiveTab] = useState<string>(TABS.BASIC_INFO);
  
  // Form data state
  const [formData, setFormData] = useState<TournamentFormData>(defaultFormData);
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Handle field changes
  // Update the 'value' type to include Partial settings and price types
  const handleFieldChange = (
    field: keyof TournamentFormData, 
    value: string | number | boolean | ImageInput | undefined | unknown[] | Partial<EarlyBirdSettings> | Partial<LateRegistrationSettings> | Partial<SinglePrice>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  // Navigate to next tab
  const handleNextTab = () => {
    if (validateCurrentTab()) {
      switch (activeTab) {
        case TABS.BASIC_INFO:
          setActiveTab(TABS.LOCATION);
          break;
        case TABS.LOCATION:
          setActiveTab(TABS.PRICING);
          break;
        case TABS.PRICING:
          setActiveTab(TABS.CATEGORIES);
          break;
        case TABS.CATEGORIES:
          setActiveTab(TABS.DOCUMENTATION);
          break;
        default:
          break;
      }
    }
  };
  
  // Navigate to previous tab
  const handlePrevTab = () => {
    switch (activeTab) {
      case TABS.LOCATION:
        setActiveTab(TABS.BASIC_INFO);
        break;
      case TABS.PRICING:
        setActiveTab(TABS.LOCATION);
        break;
      case TABS.CATEGORIES:
        setActiveTab(TABS.PRICING);
        break;
      case TABS.DOCUMENTATION:
        setActiveTab(TABS.CATEGORIES);
        break;
      default:
        break;
    }
  };
  
  // --- Validation Helper Functions ---

  const validateBasicInfoTab = (data: TournamentFormData): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (!data.name?.trim()) {
      errors.name = "Nama tournament harus diisi";
    }
    if (!data.startDate) {
      errors.startDate = "Tanggal mulai tournament harus diisi";
    }
    if (!data.endDate) {
      errors.endDate = "Tanggal selesai tournament harus diisi";
    }
    if (!data.registrationStartDate) {
      errors.registrationStartDate = "Tanggal mulai pendaftaran harus diisi";
    }
    if (!data.registrationEndDate) {
      errors.registrationEndDate = "Tanggal selesai pendaftaran harus diisi";
    }
    // Add eventType validation if needed
    return errors;
  };

  const validateLocationTab = (data: TournamentFormData): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (data.locationType === "offline") {
      if (!data.address?.trim()) {
        errors.address = "Alamat venue harus diisi";
      }
      if (!data.city?.trim()) {
        errors.city = "Kota harus diisi";
      }
      if (!data.province?.trim()) {
        errors.province = "Provinsi harus diisi";
      }
    }
    // Add validation for online location if needed
    return errors;
  };

  // --- Pricing Tab Validation Helpers ---

  const validatePricingModel = (data: TournamentFormData, errors: Record<string, string>) => {
    if (data.pricingType === "single" && (!data.singlePrice?.price || data.singlePrice.price <= 0)) {
      errors.singlePrice = "Harga pendaftaran tunggal harus diisi dan lebih dari 0";
    } else if (data.pricingType === "multi" && (!data.multiPricing || data.multiPricing.length === 0)) {
      errors.multiPricing = "Minimal satu kategori harga harus ditambahkan untuk model harga per kategori";
    }
  };

  const validateQuota = (data: TournamentFormData, errors: Record<string, string>) => {
    if (data.quotaType === 'total' && (!data.maxParticipants || data.maxParticipants <= 0)) {
      errors.maxParticipants = "Jumlah maksimum peserta harus diisi dan lebih dari 0 jika kuota total dipilih";
    } else if (data.quotaType === 'category') {
      if (!data.categoryQuotas || data.categoryQuotas.length === 0) {
        errors.categoryQuotas = "Kuota harus ditentukan untuk setiap kategori jika kuota per kategori dipilih";
      } else {
        data.categoryQuotas.forEach((quota, index) => {
          const quotaValue = parseInt(quota.quota as string, 10);
          if (isNaN(quotaValue) || quotaValue <= 0) {
            errors[`categoryQuota_${index}`] = `Kuota untuk kategori "${quota.category}" harus diisi dan lebih dari 0`;
          }
        });
      }
    }
  };

  const validateEarlyBird = (data: TournamentFormData, errors: Record<string, string>) => {
    if (!data.earlyBird?.enabled) return; // Guard clause

    if (!data.earlyBird.endDate) {
      errors.earlyBirdEndDate = "Tanggal akhir early bird harus diisi";
    }
    const discountValue = parseInt(data.earlyBird.discount as string, 10);
    if (isNaN(discountValue) || discountValue <= 0) {
      errors.earlyBirdDiscount = "Persentase diskon early bird harus diisi dan lebih dari 0";
    }
  };

  const validateLateRegistration = (data: TournamentFormData, errors: Record<string, string>) => {
    if (!data.lateRegistration?.enabled) return; // Guard clause

    if (!data.lateRegistration.startDate) {
      errors.lateRegistrationStartDate = "Tanggal mulai denda keterlambatan harus diisi";
    }
    const feeValue = parseInt(data.lateRegistration.fee as string, 10);
    if (isNaN(feeValue) || feeValue <= 0) {
      errors.lateRegistrationFee = "Persentase denda keterlambatan harus diisi dan lebih dari 0";
    }
  };

  // Refactored validatePricingTab
  const validatePricingTab = (data: TournamentFormData): Record<string, string> => {
    const errors: Record<string, string> = {};

    validatePricingModel(data, errors);
    validateQuota(data, errors);
    validateEarlyBird(data, errors);
    validateLateRegistration(data, errors);

    return errors;
  };

  const validateCategoriesTab = (data: TournamentFormData): Record<string, string> => {
    const errors: Record<string, string> = {};
    // Check if at least one category type has entries - adjust based on actual requirements
    const hasAgeCategories = data.ageCategories && data.ageCategories.length > 0;

    if (!hasAgeCategories) { 
      // Use a more general error key or specific ones
      errors.categories = "Minimal satu jenis kategori (usia) harus ditambahkan"; // Updated error message
    }
    // Add more detailed validation for individual category entries if needed
    return errors;
  };

  const validateDocumentationTab = (data: TournamentFormData): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (!data.generalRules?.trim()) {
      errors.generalRules = "Peraturan umum harus diisi";
    }
    if (data.requireTermsAcceptance && !data.termsAndConditions?.trim()) {
      errors.termsAndConditions = "Syarat dan ketentuan harus diisi jika wajib diterima peserta";
    }
    // Add validation for document requirements if needed
    return errors;
  };

  // --- Main Validation Function ---

  // Validation for current tab - Refactored
  const validateCurrentTab = (): boolean => {
    let newErrors: Record<string, string> = {};
    
    switch (activeTab) {
      case TABS.BASIC_INFO:
        newErrors = validateBasicInfoTab(formData);
        break;
      case TABS.LOCATION:
        newErrors = validateLocationTab(formData);
        break;
      case TABS.PRICING:
        newErrors = validatePricingTab(formData);
        break;
      case TABS.CATEGORIES:
        newErrors = validateCategoriesTab(formData);
        break;
      case TABS.DOCUMENTATION:
        newErrors = validateDocumentationTab(formData);
        break;
      default:
        // Should not happen, but good practice
        console.warn("Unknown tab encountered during validation:", activeTab);
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Validate the entire form - Refactored (can combine all validation functions)
  const validateFullForm = (): boolean => {
    const allErrors = {
      ...validateBasicInfoTab(formData),
      ...validateLocationTab(formData),
      ...validatePricingTab(formData),
      ...validateCategoriesTab(formData),
      ...validateDocumentationTab(formData),
    };
    setErrors(allErrors);
    return Object.keys(allErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (event: React.FormEvent, isDraft: boolean = false) => {
    event.preventDefault();
    
    if (isDraft || validateFullForm()) {
      setIsSubmitting(true);
      
      try {
        // Call the service to create the tournament - remove unused 'response' assignment
        await tournamentService.createTournament({
          ...formData,
          status: isDraft ? "draft" : "published"
        });
        
        // Reset form or redirect to the tournament details page
        if (!isDraft) {
          // In a real implementation, you would redirect to the tournament page using the response id
          // router.push(`/organizer/events/${response.id}`); 
          alert("Tournament berhasil dibuat!");
        } else {
          alert("Draft tournament berhasil disimpan!");
        }
      } catch (error) {
        console.error("Error creating tournament:", error);
        alert("Terjadi kesalahan saat membuat tournament. Silakan coba lagi.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <form onSubmit={(e) => handleSubmit(e, false)}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <Card className="overflow-hidden">
          <TabsList className="w-full grid grid-cols-5 rounded-t-md rounded-b-none">
            <TabsTrigger value={TABS.BASIC_INFO}>
              Info Dasar
            </TabsTrigger>
            <TabsTrigger value={TABS.LOCATION}>
              Lokasi & Waktu
            </TabsTrigger>
            <TabsTrigger value={TABS.PRICING}>
              Harga & Kuota
            </TabsTrigger>
            <TabsTrigger value={TABS.CATEGORIES}>
              Kategori & Format
            </TabsTrigger>
            <TabsTrigger value={TABS.DOCUMENTATION}>
              Dokumentasi & Aturan
            </TabsTrigger>
          </TabsList>
          
          <div className="p-6">
            <TabsContent value={TABS.BASIC_INFO} className="m-0">
              <TournamentBasicInfoTab 
                formData={formData} 
                onFieldChange={handleFieldChange}
                errors={errors}
              />
            </TabsContent>
            
            <TabsContent value={TABS.LOCATION} className="m-0">
              <TournamentLocationTab 
                formData={formData} 
                onFieldChange={handleFieldChange}
                errors={errors} 
              />
            </TabsContent>
            
            <TabsContent value={TABS.PRICING} className="m-0">
              {/* Pass the updated handleFieldChange */}
              <TournamentPricingTab 
                formData={formData} 
                onFieldChange={handleFieldChange} 
                // errors={errors} // Pass errors if TournamentPricingTab expects it
              />
            </TabsContent>
            
            <TabsContent value={TABS.CATEGORIES} className="m-0">
              <TournamentCategoriesTab 
                formData={formData} 
                onFieldChange={handleFieldChange}
                errors={errors} 
              />
            </TabsContent>
            
            <TabsContent value={TABS.DOCUMENTATION} className="m-0">
              <TournamentDocumentationTab
                formData={formData}
                onFieldChange={handleFieldChange}
              />
            </TabsContent>
          </div>
        </Card>
        
        <div className="flex justify-between items-center mt-6">
          {activeTab !== TABS.BASIC_INFO ? (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevTab}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Sebelumnya
            </Button>
          ) : (
            <div /> /* Empty div to maintain layout */
          )}
          
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={(e) => handleSubmit(e, true)}
              disabled={isSubmitting}
            >
              <Save className="h-4 w-4 mr-2" />
              Simpan Draft
            </Button>
            
            {activeTab !== TABS.DOCUMENTATION ? (
              <Button
                type="button"
                onClick={handleNextTab}
              >
                Selanjutnya
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Buat Tournament
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </Tabs>
    </form>
  );
}