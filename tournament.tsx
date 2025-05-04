"use client";

import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, UploadCloud, Calendar, Users, DollarSign, Target, Info, Plus, X } from "lucide-react";
import Link from "next/link";

// Currency options
const currencies = [
  { value: "IDR", label: "IDR - Indonesian Rupiah" },
  { value: "USD", label: "USD - US Dollar" },
  { value: "SGD", label: "SGD - Singapore Dollar" },
  { value: "MYR", label: "MYR - Malaysian Ringgit" }
];

export default function CreateTournamentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  
  // Basic information
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    description: "",
    tournamentType: "individual", // individual, team, or mixed
    visibility: "public", // public, private, unlisted
    inviteCode: "",
  });

  // Location and date
  const [locationDate, setLocationDate] = useState({
    location: "",
    startDate: "",
    endDate: "",
    registrationDeadline: ""
  });

  // Countdown settings
  const [countdown, setCountdown] = useState({
    eventStart: true,
    registrationEnd: true
  });

  // Pricing settings
  const [pricingType, setPricingType] = useState("single"); // single or multi
  const [singlePrice, setSinglePrice] = useState({
    amount: "",
    currency: "IDR"
  });
  const [multiPricing, setMultiPricing] = useState<Array<{category: string, price: string, currency: string}>>([
    { category: "Recurve Men", price: "250000", currency: "IDR" },
    { category: "Recurve Women", price: "250000", currency: "IDR" }
  ]);
  const [newPricingCategory, setNewPricingCategory] = useState({
    category: "",
    price: "",
    currency: "IDR"
  });
  
  // Early bird and late registration settings
  const [earlyBird, setEarlyBird] = useState({
    enabled: false,
    endDate: "",
    discount: ""
  });
  const [lateRegistration, setLateRegistration] = useState({
    enabled: false,
    startDate: "",
    fee: ""
  });

  // Quota settings
  const [quotaType, setQuotaType] = useState("total"); // total or category
  const [totalQuota, setTotalQuota] = useState("");
  const [categoryQuotas, setCategoryQuotas] = useState<Array<{category: string, quota: string}>>([
    { category: "Recurve Men", quota: "50" },
    { category: "Recurve Women", quota: "50" }
  ]);

  // Age categories
  const [ageCategories, setAgeCategories] = useState<Array<{name: string, minAge: string, maxAge: string}>>([
    { name: "U-15", minAge: "10", maxAge: "15" },
    { name: "U-18", minAge: "16", maxAge: "18" },
    { name: "Senior", minAge: "19", maxAge: "45" },
    { name: "Master", minAge: "46", maxAge: "99" }
  ]);
  const [newAgeCategory, setNewAgeCategory] = useState({
    name: "",
    minAge: "",
    maxAge: ""
  });
  const [ageCalculation, setAgeCalculation] = useState("event"); // event or range

  // Format pertandingan
  const [competitionFormat, setCompetitionFormat] = useState("standard"); // standard, fita, 720, indoor, field, 3d, flight, clout, custom
  const [formatConfig, setFormatConfig] = useState({
    rounds: "4", // untuk FITA standard
    distances: ["70", "60", "50", "30"], // untuk FITA standard dan 720
    customRoundEnabled: false, // untuk FITA custom round
    customRound: "",
    seriesCount: "2", // untuk format 720
    indoorDistance: "18", // untuk indoor (18m atau 25m)
    fieldTargetCount: "24", // untuk field archery
    threeDTargetCount: "24", // untuk 3D archery
  });

  // Delegation type
  const [delegationType, setDelegationType] = useState("all"); // all, country, club, province, city
  const [verifyDelegation, setVerifyDelegation] = useState(false);
  
  // Enhanced delegation settings
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [clubRestrictionType, setClubRestrictionType] = useState("any"); // any, specific
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [selectedCountryForProvince, setSelectedCountryForProvince] = useState("");
  const [selectedCountryForCity, setSelectedCountryForCity] = useState("");
  const [selectedProvinceForCity, setSelectedProvinceForCity] = useState("");
  
  // Mock data for selections
  const countries = [
    { id: "ID", name: "Indonesia" },
    { id: "MY", name: "Malaysia" },
    { id: "SG", name: "Singapore" },
    { id: "TH", name: "Thailand" },
    { id: "PH", name: "Philippines" }
  ];
  
  const provinces = [
    { id: "JKT", countryId: "ID", name: "Jakarta" },
    { id: "JBR", countryId: "ID", name: "Jawa Barat" },
    { id: "JTM", countryId: "ID", name: "Jawa Timur" },
    { id: "JTG", countryId: "ID", name: "Jawa Tengah" },
    { id: "BLI", countryId: "ID", name: "Bali" },
    { id: "KL", countryId: "MY", name: "Kuala Lumpur" },
    { id: "SL", countryId: "MY", name: "Selangor" }
  ];
  
  const cities = [
    { id: "JKT-01", provinceId: "JKT", name: "Jakarta Pusat" },
    { id: "JKT-02", provinceId: "JKT", name: "Jakarta Barat" },
    { id: "JKT-03", provinceId: "JKT", name: "Jakarta Timur" },
    { id: "JKT-04", provinceId: "JKT", name: "Jakarta Selatan" },
    { id: "JKT-05", provinceId: "JKT", name: "Jakarta Utara" },
    { id: "BDG", provinceId: "JBR", name: "Bandung" },
    { id: "BGR", provinceId: "JBR", name: "Bogor" }
  ];
  
  const clubs = [
    { id: "ARC-01", name: "Perpani Jakarta" },
    { id: "ARC-02", name: "Perpani Bandung" },
    { id: "ARC-03", name: "Sahabat Panah Indonesia" },
    { id: "ARC-04", name: "Archers Academy" },
    { id: "ARC-05", name: "Busur Sakti Club" }
  ];

  // Sponsors
  const [sponsors, setSponsors] = useState<Array<{name: string, level: string}>>([]);
  const [newSponsor, setNewSponsor] = useState({
    name: "",
    level: "gold"
  });

  // Form handlers
  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBasicInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (section: string, name: string, value: string) => {
    if (section === "basicInfo") {
      setBasicInfo(prev => ({
        ...prev,
        [name]: value
      }));
    } else if (section === "pricing") {
      if (name === "type") {
        setPricingType(value);
      } else if (name === "currency") {
        setSinglePrice(prev => ({
          ...prev,
          currency: value
        }));
      }
    } else if (section === "quota") {
      setQuotaType(value);
    } else if (section === "delegation") {
      setDelegationType(value);
    }
  };

  const handleLocationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocationDate(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCountdownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCountdown(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSinglePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSinglePrice(prev => ({
      ...prev,
      amount: e.target.value
    }));
  };

  const handleAddPricingCategory = () => {
    if (newPricingCategory.category && newPricingCategory.price) {
      setMultiPricing(prev => [...prev, { ...newPricingCategory }]);
      setNewPricingCategory({
        category: "",
        price: "",
        currency: "IDR"
      });
    }
  };

  const handlePricingCategoryChange = (index: number, field: string, value: string) => {
    const updated = [...multiPricing];
    updated[index] = { ...updated[index], [field]: value };
    setMultiPricing(updated);
  };

  const handleRemovePricingCategory = (index: number) => {
    setMultiPricing(prev => prev.filter((_, i) => i !== index));
  };

  const handleEarlyBirdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEarlyBird(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleLateRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLateRegistration(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleQuotaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalQuota(e.target.value);
  };

  const handleCategoryQuotaChange = (index: number, value: string) => {
    const updated = [...categoryQuotas];
    updated[index] = { ...updated[index], quota: value };
    setCategoryQuotas(updated);
  };

  const handleAgeCategoryChange = (index: number, field: string, value: string) => {
    const updated = [...ageCategories];
    updated[index] = { ...updated[index], [field]: value };
    setAgeCategories(updated);
  };

  const handleNewAgeCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAgeCategory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAgeCategory = () => {
    if (newAgeCategory.name && newAgeCategory.minAge && newAgeCategory.maxAge) {
      setAgeCategories(prev => [...prev, { ...newAgeCategory }]);
      setNewAgeCategory({
        name: "",
        minAge: "",
        maxAge: ""
      });
    }
  };

  const handleRemoveAgeCategory = (index: number) => {
    setAgeCategories(prev => prev.filter((_, i) => i !== index));
  };

  const handleDelegationChange = (value: string) => {
    setDelegationType(value);
  };

  const handleVerifyDelegationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyDelegation(e.target.checked);
  };

  const handleNewSponsorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSponsor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSponsor = () => {
    if (newSponsor.name && newSponsor.level) {
      setSponsors(prev => [...prev, { ...newSponsor }]);
      setNewSponsor({
        name: "",
        level: "gold"
      });
    }
  };

  const handleRemoveSponsor = (index: number) => {
    setSponsors(prev => prev.filter((_, i) => i !== index));
  };

  const handleFormatChange = (value: string) => {
    setCompetitionFormat(value);
  };

  const handleFormatConfigChange = (field: string, value: string) => {
    setFormatConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDistanceChange = (index: number, value: string) => {
    const updatedDistances = [...formatConfig.distances];
    updatedDistances[index] = value;
    setFormatConfig(prev => ({
      ...prev,
      distances: updatedDistances
    }));
  };

  const handleCustomRoundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormatConfig(prev => ({
      ...prev,
      customRoundEnabled: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Compile all data
    const eventData = {
      basicInfo,
      locationDate,
      countdown,
      pricing: {
        type: pricingType,
        singlePrice,
        multiPricing,
        earlyBird,
        lateRegistration
      },
      quota: {
        type: quotaType,
        total: totalQuota,
        categoryQuotas
      },
      ageCategories,
      ageCalculation,
      delegationType,
      verifyDelegation,
      sponsors
    };

    // Simulate API call to create event
    setTimeout(() => {
      // In a real app, you would save this to your backend
      console.log("Creating event:", eventData);
      
      // Redirect to the events page or view the created event
      router.push("/events");
    }, 1000);
  };

  const goToNextTab = () => {
    if (activeTab === "basic") setActiveTab("datetime");
    else if (activeTab === "datetime") setActiveTab("pricing");
    else if (activeTab === "pricing") setActiveTab("categories");
    else if (activeTab === "categories") setActiveTab("additional");
  };

  const goToPrevTab = () => {
    if (activeTab === "additional") setActiveTab("categories");
    else if (activeTab === "categories") setActiveTab("pricing");
    else if (activeTab === "pricing") setActiveTab("datetime");
    else if (activeTab === "datetime") setActiveTab("basic");
  };

  return (
    <MainLayout>
      <div className="tournament-form-container">
        <div className="page-header">
          <Link href="/events/create" className="back-button">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="page-title">Buat Tournament / Kejuaraan Baru</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="tabs-list grid grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="basic" className="tab-trigger">
                <Info className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Info Dasar</span>
                <span className="sm:hidden">Info</span>
              </TabsTrigger>
              <TabsTrigger value="datetime" className="tab-trigger">
                <Calendar className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Lokasi & Waktu</span>
                <span className="sm:hidden">Waktu</span>
              </TabsTrigger>
              <TabsTrigger value="pricing" className="tab-trigger">
                <DollarSign className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Harga & Kuota</span>
                <span className="sm:hidden">Harga</span>
              </TabsTrigger>
              <TabsTrigger value="categories" className="tab-trigger">
                <Target className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Kategori</span>
                <span className="sm:hidden">Kategori</span>
              </TabsTrigger>
              <TabsTrigger value="additional" className="tab-trigger">
                <Users className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Tambahan</span>
                <span className="sm:hidden">Lainnya</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Basic Info */}
            <TabsContent value="basic" className="tab-content">
              <Card className="card">
                <CardHeader className="card-header">
                  <CardTitle className="card-title">Informasi Dasar & Branding</CardTitle>
                  <CardDescription className="card-description">Nama, deskripsi, dan branding visual tournament Anda.</CardDescription>
                </CardHeader>
                <CardContent className="card-content">
                  <div className="form-group">
                    <Label htmlFor="name" className="form-label required">Nama Tournament</Label>
                    <Input
                      id="name"
                      name="name"
                      value={basicInfo.name}
                      onChange={handleBasicInfoChange}
                      placeholder="Contoh: Kejuaraan Nasional Panahan 2025"
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="description" className="form-label">Deskripsi Tournament</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={basicInfo.description}
                      onChange={handleBasicInfoChange}
                      placeholder="Jelaskan tentang tournament Anda..."
                      rows={5}
                      className="form-textarea"
                    />
                    <span className="helper-text">Jelaskan detail event, termasuk tingkat kompetisi, kategori utama, dan informasi penting lainnya.</span>
                  </div>
                  <div className="form-group">
                    <Label htmlFor="tournamentType" className="form-label required">Jenis Tournament</Label>
                    <Select
                      value={basicInfo.tournamentType}
                      onValueChange={(value) => handleSelectChange("basicInfo", "tournamentType", value)}
                    >
                      <SelectTrigger id="tournamentType" className="select-trigger">
                        <SelectValue placeholder="Pilih jenis tournament" />
                      </SelectTrigger>
                      <SelectContent className="select-content">
                        <SelectItem value="individual">Individual (Perorangan)</SelectItem>
                        <SelectItem value="team">Team (Beregu)</SelectItem>
                        <SelectItem value="mixed">Mixed (Perorangan & Beregu)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="form-group">
                    <Label htmlFor="eventBranding" className="form-label">Branding (Logo/Banner)</Label>
                    <div className="border-2 border-dashed border-gray-200 rounded-md p-6 text-center">
                      <UploadCloud className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm font-medium mb-2">Drag & drop file logo atau banner</p>
                      <p className="text-xs text-gray-500 mb-3">SVG, PNG, atau JPG (maks. 2MB)</p>
                      <button type="button" className="btn btn-outline btn-sm">
                        Browse Files
                      </button>
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

              <Card className="card">
                <CardHeader className="card-header">
                  <CardTitle className="card-title">Visibilitas Event</CardTitle>
                  <CardDescription className="card-description">Atur siapa saja yang dapat melihat dan mendaftar tournament Anda.</CardDescription>
                </CardHeader>
                <CardContent className="card-content">
                  <div className="form-group">
                    <Label className="form-label">Visibilitas</Label>
                    <Select
                      value={basicInfo.visibility}
                      onValueChange={(value) => handleSelectChange("basicInfo", "visibility", value)}
                    >
                      <SelectTrigger className="select-trigger">
                        <SelectValue placeholder="Pilih visibilitas" />
                      </SelectTrigger>
                      <SelectContent className="select-content">
                        <SelectItem value="public">Public (Terlihat oleh semua)</SelectItem>
                        <SelectItem value="private">Private (Hanya via undangan/kode)</SelectItem>
                        <SelectItem value="unlisted">Unlisted (Hanya via link)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {basicInfo.visibility === "private" && (
                    <div className="form-group mt-4">
                      <Label htmlFor="inviteCode" className="form-label">Kode Undangan</Label>
                      <div className="flex gap-2">
                        <Input
                          id="inviteCode"
                          name="inviteCode"
                          value={basicInfo.inviteCode}
                          onChange={handleBasicInfoChange}
                          placeholder="Contoh: ARCHERY2025"
                          className="form-input"
                        />
                        <Button type="button" variant="outline" className="btn btn-outline">Generate Kode</Button>
                      </div>
                      <span className="helper-text">Kode ini akan diperlukan untuk pendaftaran peserta.</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="card">
                <CardHeader className="card-header">
                  <CardTitle className="card-title">Handbook/Technical Guide</CardTitle>
                  <CardDescription className="card-description">Upload dokumen panduan teknis untuk peserta.</CardDescription>
                </CardHeader>
                <CardContent className="card-content">
                  <div className="form-group">
                    <Label htmlFor="eventHandbook" className="form-label">Upload Handbook</Label>
                    <div className="border-2 border-dashed border-gray-200 rounded-md p-6 text-center">
                      <UploadCloud className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm font-medium mb-2">Drag & drop file handbook</p>
                      <p className="text-xs text-gray-500 mb-3">PDF, DOC, atau DOCX (maks. 10MB)</p>
                      <button type="button" className="btn btn-outline btn-sm">
                        Browse Files
                      </button>
                      <input
                        id="eventHandbook"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                      />
                    </div>
                    <span className="helper-text">Handbook akan dapat diunduh oleh peserta dari halaman event.</span>
                  </div>
                </CardContent>
              </Card>

              <div className="form-footer">
                <div></div>
                <Button type="button" onClick={goToNextTab} className="btn btn-primary">
                  Lanjutkan
                </Button>
              </div>
            </TabsContent>

            {/* Tab 2: Location & Date */}
            <TabsContent value="datetime" className="tab-content">
              <Card className="card">
                <CardHeader className="card-header">
                  <CardTitle className="card-title">Lokasi & Tanggal</CardTitle>
                  <CardDescription className="card-description">Tentukan tempat dan waktu pelaksanaan tournament.</CardDescription>
                </CardHeader>
                <CardContent className="card-content">
                  <div className="form-group">
                    <Label htmlFor="location" className="form-label required">Lokasi</Label>
                    <Input
                      id="location"
                      name="location"
                      value={locationDate.location}
                      onChange={handleLocationDateChange}
                      placeholder="Contoh: Lapangan Panahan Senayan"
                      required
                      className="form-input"
                    />
                    <span className="helper-text">Masukkan nama venue lengkap beserta alamatnya.</span>
                  </div>
                  
                  <div className="grid-2">
                    <div className="form-group">
                      <Label htmlFor="startDate" className="form-label required">Tanggal Mulai</Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={locationDate.startDate}
                        onChange={handleLocationDateChange}
                        required
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <Label htmlFor="endDate" className="form-label">Tanggal Selesai (Opsional)</Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={locationDate.endDate}
                        onChange={handleLocationDateChange}
                        min={locationDate.startDate}
                        className="form-input"
                      />
                      <span className="helper-text">Kosongkan jika event hanya satu hari.</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <Label htmlFor="registrationDeadline" className="form-label required">Deadline Pendaftaran</Label>
                    <Input
                      id="registrationDeadline"
                      name="registrationDeadline"
                      type="date"
                      value={locationDate.registrationDeadline}
                      onChange={handleLocationDateChange}
                      required
                      className="form-input"
                    />
                    <span className="helper-text">Pendaftaran akan otomatis ditutup pada tanggal ini pukul 23:59.</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="card">
                <CardHeader className="card-header">
                  <CardTitle className="card-title">Countdown Timer</CardTitle>
                  <CardDescription className="card-description">Pengaturan display countdown timer untuk event.</CardDescription>
                </CardHeader>
                <CardContent className="card-content">
                  <div className="form-group">
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="eventStart"
                        name="eventStart"
                        checked={countdown.eventStart}
                        onChange={handleCountdownChange}
                        className="checkbox"
                      />
                      <label htmlFor="eventStart" className="checkbox-label">Tampilkan countdown waktu hingga event dimulai</label>
                    </div>
                    
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="registrationEnd"
                        name="registrationEnd"
                        checked={countdown.registrationEnd}
                        onChange={handleCountdownChange}
                        className="checkbox"
                      />
                      <label htmlFor="registrationEnd" className="checkbox-label">Tampilkan countdown deadline pendaftaran</label>
                    </div>
                    
                    <span className="helper-text mt-4">
                      Countdown timer akan ditampilkan di halaman event dan dashboard peserta.
                    </span>
                  </div>
                </CardContent>
              </Card>

              <div className="form-footer">
                <Button type="button" variant="outline" onClick={goToPrevTab} className="btn btn-outline">
                  Kembali
                </Button>
                <Button type="button" onClick={goToNextTab} className="btn btn-primary">
                  Lanjutkan
                </Button>
              </div>
            </TabsContent>

            {/* Tab 3: Pricing & Quota */}
            <TabsContent value="pricing" className="tab-content">
              <Card className="card">
                <CardHeader className="card-header">
                  <CardTitle className="card-title">Mekanisme Harga</CardTitle>
                  <CardDescription className="card-description">Atur harga pendaftaran untuk peserta tournament.</CardDescription>
                </CardHeader>
                <CardContent className="card-content">
                  <div className="form-group">
                    <Label className="form-label">Jenis Harga</Label>
                    <Select
                      value={pricingType}
                      onValueChange={(value) => handleSelectChange("pricing", "type", value)}
                    >
                      <SelectTrigger className="select-trigger">
                        <SelectValue placeholder="Pilih jenis harga" />
                      </SelectTrigger>
                      <SelectContent className="select-content">
                        <SelectItem value="single">Single Price (Harga sama untuk semua kategori)</SelectItem>
                        <SelectItem value="multi">Multi Price (Harga berbeda per kategori)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {pricingType === "single" ? (
                    <div className="grid-2 mt-4">
                      <div className="form-group">
                        <Label htmlFor="basePrice" className="form-label required">Harga Dasar</Label>
                        <Input
                          id="basePrice"
                          type="number"
                          value={singlePrice.amount}
                          onChange={handleSinglePriceChange}
                          placeholder="250000"
                          className="form-input"
                          required={pricingType === "single"}
                        />
                      </div>
                      <div className="form-group">
                        <Label htmlFor="currency" className="form-label">Mata Uang</Label>
                        <Select
                          value={singlePrice.currency}
                          onValueChange={(value) => handleSelectChange("pricing", "currency", value)}
                        >
                          <SelectTrigger id="currency" className="select-trigger">
                            <SelectValue placeholder="Pilih mata uang" />
                          </SelectTrigger>
                          <SelectContent className="select-content">
                            {currencies.map(curr => (
                              <SelectItem key={curr.value} value={curr.value}>{curr.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <div className="section-title">Harga Per Kategori</div>
                      <div className="item-list">
                        {multiPricing.map((option, idx) => (
                          <div key={`pricing-${option.category.replace(/\s+/g, '-')}-${idx}`} className="item flex-center justify-between">
                            <div className="grid grid-cols-10 gap-3 w-full">
                              <div className="col-span-5 sm:col-span-4">
                                <Input
                                  value={option.category}
                                  onChange={(e) => handlePricingCategoryChange(idx, "category", e.target.value)}
                                  placeholder="Nama kategori"
                                  className="form-input"
                                />
                              </div>
                              <div className="col-span-3 sm:col-span-3">
                                <Input
                                  type="number"
                                  value={option.price}
                                  onChange={(e) => handlePricingCategoryChange(idx, "price", e.target.value)}
                                  placeholder="Harga"
                                  className="form-input"
                                />
                              </div>
                              <div className="col-span-2 sm:col-span-2">
                                <Select
                                  value={option.currency}
                                  onValueChange={(value) => handlePricingCategoryChange(idx, "currency", value)}
                                >
                                  <SelectTrigger className="select-trigger">
                                    <SelectValue placeholder="Mata Uang" />
                                  </SelectTrigger>
                                  <SelectContent className="select-content">
                                    {currencies.map(curr => (
                                      <SelectItem key={curr.value} value={curr.value}>{curr.value}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="btn btn-danger ml-2"
                              onClick={() => handleRemovePricingCategory(idx)}
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="divider"></div>
                      
                      <div className="grid grid-cols-10 gap-3 items-end">
                        <div className="col-span-5 sm:col-span-4">
                          <Label htmlFor="newCategoryName" className="form-label">Nama Kategori</Label>
                          <Input
                            id="newCategoryName"
                            value={newPricingCategory.category}
                            onChange={(e) => setNewPricingCategory({...newPricingCategory, category: e.target.value})}
                            placeholder="Contoh: Compound Men"
                            className="form-input"
                          />
                        </div>
                        <div className="col-span-3 sm:col-span-3">
                          <Label htmlFor="newCategoryPrice" className="form-label">Harga</Label>
                          <Input
                            id="newCategoryPrice"
                            type="number"
                            value={newPricingCategory.price}
                            onChange={(e) => setNewPricingCategory({...newPricingCategory, price: e.target.value})}
                            placeholder="300000"
                            className="form-input"
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-2">
                          <Label htmlFor="newCategoryCurrency" className="form-label">Mata Uang</Label>
                          <Select
                            value={newPricingCategory.currency}
                            onValueChange={(value) => setNewPricingCategory({...newPricingCategory, currency: value})}
                          >
                            <SelectTrigger id="newCategoryCurrency" className="select-trigger">
                              <SelectValue placeholder="Mata Uang" />
                            </SelectTrigger>
                            <SelectContent className="select-content">
                              {currencies.map(curr => (
                                <SelectItem key={curr.value} value={curr.value}>{curr.value}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="mt-4 col-span-10 sm:col-span-1">
                          <Button
                            type="button"
                            onClick={handleAddPricingCategory}
                            className="btn btn-primary w-full"
                          >
                            <Plus size={16} className="mr-1" /> Tambah
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="divider"></div>

                  <div className="grid-2">
                    <div className="form-group">
                      <div className="checkbox-group">
                        <input
                          type="checkbox"
                          id="enableEarlyBird"
                          name="enabled"
                          checked={earlyBird.enabled}
                          onChange={handleEarlyBirdChange}
                          className="checkbox"
                        />
                        <label htmlFor="enableEarlyBird" className="checkbox-label font-medium">Early Bird Discount</label>
                      </div>
                      {earlyBird.enabled && (
                        <div className="ml-6 mt-3 space-y-3">
                          <div className="form-group">
                            <Label htmlFor="earlyBirdDate" className="form-label">Tanggal Akhir Early Bird</Label>
                            <Input
                              id="earlyBirdDate"
                              name="endDate"
                              type="date"
                              value={earlyBird.endDate}
                              onChange={handleEarlyBirdChange}
                              required={earlyBird.enabled}
                              className="form-input"
                            />
                          </div>
                          <div className="form-group">
                            <Label htmlFor="earlyBirdDiscount" className="form-label">Diskon (%)</Label>
                            <Input
                              id="earlyBirdDiscount"
                              name="discount"
                              type="number"
                              value={earlyBird.discount}
                              onChange={handleEarlyBirdChange}
                              min="1"
                              max="100"
                              required={earlyBird.enabled}
                              className="form-input"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <div className="checkbox-group">
                        <input
                          type="checkbox"
                          id="enableLateFee"
                          name="enabled"
                          checked={lateRegistration.enabled}
                          onChange={handleLateRegistrationChange}
                          className="checkbox"
                        />
                        <label htmlFor="enableLateFee" className="checkbox-label font-medium">Late Registration Fee</label>
                      </div>
                      {lateRegistration.enabled && (
                        <div className="ml-6 mt-3 space-y-3">
                          <div className="form-group">
                            <Label htmlFor="lateFeeDate" className="form-label">Tanggal Mulai Late Registration</Label>
                            <Input
                              id="lateFeeDate"
                              name="startDate"
                              type="date"
                              value={lateRegistration.startDate}
                              onChange={handleLateRegistrationChange}
                              required={lateRegistration.enabled}
                              className="form-input"
                            />
                          </div>
                          <div className="form-group">
                            <Label htmlFor="lateFeeAmount" className="form-label">Biaya Tambahan (%)</Label>
                            <Input
                              id="lateFeeAmount"
                              name="fee"
                              type="number"
                              value={lateRegistration.fee}
                              onChange={handleLateRegistrationChange}
                              min="1"
                              max="100"
                              required={lateRegistration.enabled}
                              className="form-input"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card">
                <CardHeader className="card-header">
                  <CardTitle className="card-title">Kuota Peserta</CardTitle>
                  <CardDescription className="card-description">Tentukan batas maksimal jumlah peserta yang dapat mendaftar.</CardDescription>
                </CardHeader>
                <CardContent className="card-content">
                  <div className="form-group">
                    <Label className="form-label">Jenis Kuota</Label>
                    <Select
                      value={quotaType}
                      onValueChange={(value) => handleSelectChange("quota", "type", value)}
                    >
                      <SelectTrigger className="select-trigger">
                        <SelectValue placeholder="Pilih jenis kuota" />
                      </SelectTrigger>
                      <SelectContent className="select-content">
                        <SelectItem value="total">Total (Batasi total keseluruhan peserta)</SelectItem>
                        <SelectItem value="category">Per Kategori (Batasi peserta per kategori)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {quotaType === "total" ? (
                    <div className="form-group mt-4">
                      <Label htmlFor="totalQuota" className="form-label required">Total Kuota Peserta</Label>
                      <Input
                        id="totalQuota"
                        type="number"
                        value={totalQuota}
                        onChange={handleQuotaChange}
                        min="1"
                        placeholder="200"
                        required={quotaType === "total"}
                        className="form-input"
                      />
                      <span className="helper-text">Masukkan maksimum jumlah peserta yang dapat mendaftar.</span>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <div className="section-title">Kuota Per Kategori</div>
                      <div className="item-list">
                        {categoryQuotas.map((cat, idx) => (
                          <div key={`quota-${cat.category.replace(/\s+/g, '-')}-${idx}`} className="item grid grid-cols-2 gap-4 items-center">
                            <div className="font-medium">{cat.category}</div>
                            <Input
                              type="number"
                              value={cat.quota}
                              onChange={(e) => handleCategoryQuotaChange(idx, e.target.value)}
                              min="1"
                              placeholder="50"
                              className="form-input"
                            />
                          </div>
                        ))}
                      </div>
                      <span className="helper-text mt-3">Sistem akan secara otomatis membatasi pendaftaran untuk setiap kategori.</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="form-footer">
                <Button type="button" variant="outline" onClick={goToPrevTab} className="btn btn-outline">
                  Kembali
                </Button>
                <Button type="button" onClick={goToNextTab} className="btn btn-primary">
                  Lanjutkan
                </Button>
              </div>
            </TabsContent>

            {/* Tab 4: Categories */}
            <TabsContent value="categories" className="tab-content">
              <Card className="card">
                <CardHeader className="card-header">
                  <CardTitle className="card-title">Kategori Berbasis Umur</CardTitle>
                  <CardDescription className="card-description">Konfigurasi kategori umur untuk peserta tournament.</CardDescription>
                </CardHeader>
                <CardContent className="card-content">
                  <div className="grid grid-cols-12 gap-3 mb-4 font-medium">
                    <div className="col-span-4 sm:col-span-4">Nama Kategori</div>
                    <div className="col-span-3 sm:col-span-3">Umur Minimal</div>
                    <div className="col-span-3 sm:col-span-3">Umur Maksimal</div>
                    <div className="col-span-2 sm:col-span-2">Aksi</div>
                  </div>
                  
                  <div className="item-list">
                    {ageCategories.map((cat, idx) => (
                      <div key={`age-category-${cat.name.replace(/\s+/g, '-')}-${idx}`} className="item grid grid-cols-12 gap-3 items-center">
                        <div className="col-span-4 sm:col-span-4">
                          <Input
                            value={cat.name}
                            onChange={(e) => handleAgeCategoryChange(idx, "name", e.target.value)}
                            className="form-input"
                          />
                        </div>
                        <div className="col-span-3 sm:col-span-3">
                          <Input
                            type="number"
                            value={cat.minAge}
                            onChange={(e) => handleAgeCategoryChange(idx, "minAge", e.target.value)}
                            min="0"
                            className="form-input"
                          />
                        </div>
                        <div className="col-span-3 sm:col-span-3">
                          <Input
                            type="number"
                            value={cat.maxAge}
                            onChange={(e) => handleAgeCategoryChange(idx, "maxAge", e.target.value)}
                            min={cat.minAge}
                            className="form-input"
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-2 text-right">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="btn btn-danger"
                            onClick={() => handleRemoveAgeCategory(idx)}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="divider"></div>

                  <div className="section-title">Tambah Kategori Baru</div>
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-4 sm:col-span-4">
                      <Label htmlFor="categoryName" className="form-label">Nama</Label>
                      <Input
                        id="categoryName"
                        name="name"
                        value={newAgeCategory.name}
                        onChange={handleNewAgeCategoryChange}
                        placeholder="U-15, Senior, Master, dll"
                        className="form-input"
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-3">
                      <Label htmlFor="minAge" className="form-label">Umur Minimal</Label>
                      <Input
                        id="minAge"
                        name="minAge"
                        type="number"
                        value={newAgeCategory.minAge}
                        onChange={handleNewAgeCategoryChange}
                        min="0"
                        className="form-input"
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-3">
                      <Label htmlFor="maxAge" className="form-label">Umur Maksimal</Label>
                      <Input
                        id="maxAge"
                        name="maxAge"
                        type="number"
                        value={newAgeCategory.maxAge}
                        onChange={handleNewAgeCategoryChange}
                        min={newAgeCategory.minAge || "0"}
                        className="form-input"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-2 flex items-end">
                      <Button type="button" onClick={handleAddAgeCategory} className="btn btn-primary mt-5 w-full">
                        <Plus size={16} className="mr-1" /> Tambah
                      </Button>
                    </div>
                  </div>
                  <span className="helper-text mt-3">
                    Sistem akan menempatkan peserta ke kategori yang sesuai berdasarkan data tanggal lahir mereka.
                  </span>

                  <div className="divider"></div>

                  <div className="section-title">Kalkulasi Umur</div>
                  <div className="radio-group">
                    <div className="checkbox-group">
                      <input
                        type="radio"
                        id="ageAtEvent"
                        name="ageCalculation"
                        value="event"
                        checked={ageCalculation === "event"}
                        onChange={() => setAgeCalculation("event")}
                        className="radio"
                      />
                      <label htmlFor="ageAtEvent" className="radio-label">Hitung umur saat pertandingan berlangsung</label>
                    </div>
                    <div className="checkbox-group">
                      <input
                        type="radio"
                        id="specificRange"
                        name="ageCalculation"
                        value="range"
                        checked={ageCalculation === "range"}
                        onChange={() => setAgeCalculation("range")}
                        className="radio"
                      />
                      <label htmlFor="specificRange" className="radio-label">Berdasarkan range tanggal lahir spesifik</label>
                    </div>
                  </div>
                  
                  <div className="divider"></div>
                  
                  <div className="checkbox-group">
                    <input type="checkbox" id="autoPlace" className="checkbox" defaultChecked />
                    <label htmlFor="autoPlace" className="checkbox-label">Auto-penempatan peserta ke kategori berdasarkan tanggal lahir</label>
                  </div>
                </CardContent>
              </Card>

              <Card className="card">
                <CardHeader className="card-header">
                  <CardTitle className="card-title">Format Pertandingan</CardTitle>
                  <CardDescription className="card-description">Konfigurasi format pertandingan untuk tournament ini.</CardDescription>
                </CardHeader>
                <CardContent className="card-content">
                  <div className="form-group">
                    <Label className="form-label required">Format Pertandingan</Label>
                    <Select
                      value={competitionFormat}
                      onValueChange={handleFormatChange}
                    >
                      <SelectTrigger className="select-trigger">
                        <SelectValue placeholder="Pilih format pertandingan" />
                      </SelectTrigger>
                      <SelectContent className="select-content">
                        <SelectItem value="standard">Standard (Basic Format)</SelectItem>
                        <SelectItem value="fita">FITA Standard</SelectItem>
                        <SelectItem value="720">Format 720</SelectItem>
                        <SelectItem value="indoor">Indoor Round (18m/25m)</SelectItem>
                        <SelectItem value="field">Field Archery</SelectItem>
                        <SelectItem value="3d">3D Archery</SelectItem>
                        <SelectItem value="flight">Flight Archery</SelectItem>
                        <SelectItem value="clout">Clout Archery</SelectItem>
                        <SelectItem value="custom">Format Kustom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* FITA Standard Format Settings */}
                  {competitionFormat === "fita" && (
                    <div className="mt-4">
                      <div className="section-title">Pengaturan FITA Standard</div>
                      
                      <div className="form-group mt-3">
                        <Label htmlFor="rounds" className="form-label">Jumlah Ronde</Label>
                        <Select
                          value={formatConfig.rounds}
                          onValueChange={(value) => handleFormatConfigChange("rounds", value)}
                        >
                          <SelectTrigger id="rounds" className="select-trigger">
                            <SelectValue placeholder="Pilih jumlah ronde" />
                          </SelectTrigger>
                          <SelectContent className="select-content">
                            <SelectItem value="1">1 Ronde</SelectItem>
                            <SelectItem value="2">2 Ronde</SelectItem>
                            <SelectItem value="3">3 Ronde</SelectItem>
                            <SelectItem value="4">4 Ronde (Standard)</SelectItem>
                            <SelectItem value="6">6 Ronde</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="divider mt-4"></div>
                      <div className="section-title">Jarak Tembak</div>
                      <div className="grid-2 gap-4 mt-3">
                        {formatConfig.distances.slice(0, parseInt(formatConfig.rounds)).map((distance, idx) => (
                          <div className="form-group" key={`distance-round-${idx+1}-${distance}`}>
                            <Label htmlFor={`distance-${idx}`} className="form-label">Jarak Ronde {idx + 1} (meter)</Label>
                            <Input
                              id={`distance-${idx}`}
                              type="number"
                              value={distance}
                              onChange={(e) => handleDistanceChange(idx, e.target.value)}
                              className="form-input"
                              min="1"
                              max="90"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="checkbox-group mt-4">
                        <input
                          type="checkbox"
                          id="customRound"
                          checked={formatConfig.customRoundEnabled}
                          onChange={handleCustomRoundChange}
                          className="checkbox"
                        />
                        <label htmlFor="customRound" className="checkbox-label">Aktifkan Custom Round</label>
                      </div>
                      
                      {formatConfig.customRoundEnabled && (
                        <div className="form-group mt-3">
                          <Label htmlFor="customRoundDesc" className="form-label">Deskripsi Custom Round</Label>
                          <Textarea
                            id="customRoundDesc"
                            value={formatConfig.customRound}
                            onChange={(e) => handleFormatConfigChange("customRound", e.target.value)}
                            placeholder="Contoh: FITA Double Round (2x70m) + Elimination Round"
                            rows={3}
                            className="form-textarea"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Format 720 Settings */}
                  {competitionFormat === "720" && (
                    <div className="mt-4">
                      <div className="section-title">Pengaturan Format 720</div>
                      
                      <div className="form-group mt-3">
                        <Label htmlFor="seriesCount" className="form-label">Jumlah Seri</Label>
                        <Select
                          value={formatConfig.seriesCount}
                          onValueChange={(value) => handleFormatConfigChange("seriesCount", value)}
                        >
                          <SelectTrigger id="seriesCount" className="select-trigger">
                            <SelectValue placeholder="Pilih jumlah seri" />
                          </SelectTrigger>
                          <SelectContent className="select-content">
                            <SelectItem value="1">1 Seri (36 anak panah)</SelectItem>
                            <SelectItem value="2">2 Seri (72 anak panah, standard)</SelectItem>
                            <SelectItem value="3">3 Seri (108 anak panah)</SelectItem>
                            <SelectItem value="4">4 Seri (144 anak panah)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="form-group mt-3">
                        <Label htmlFor="distance720" className="form-label">Jarak Tembak (meter)</Label>
                        <Input
                          id="distance720"
                          type="number"
                          value={formatConfig.distances[0]}
                          onChange={(e) => handleDistanceChange(0, e.target.value)}
                          className="form-input"
                          min="1"
                          max="90"
                        />
                      </div>
                    </div>
                  )}

                  {/* Indoor Format Settings */}
                  {competitionFormat === "indoor" && (
                    <div className="mt-4">
                      <div className="section-title">Pengaturan Indoor Round</div>
                      
                      <div className="form-group mt-3">
                        <Label className="form-label">Jarak Tembak</Label>
                        <div className="radio-group">
                          <div className="checkbox-group">
                            <input
                              type="radio"
                              id="indoor18m"
                              name="indoorDistance"
                              value="18"
                              checked={formatConfig.indoorDistance === "18"}
                              onChange={(e) => handleFormatConfigChange("indoorDistance", e.target.value)}
                              className="radio"
                            />
                            <label htmlFor="indoor18m" className="radio-label">18 meter</label>
                          </div>
                          <div className="checkbox-group">
                            <input
                              type="radio"
                              id="indoor25m"
                              name="indoorDistance"
                              value="25"
                              checked={formatConfig.indoorDistance === "25"}
                              onChange={(e) => handleFormatConfigChange("indoorDistance", e.target.value)}
                              className="radio"
                            />
                            <label htmlFor="indoor25m" className="radio-label">25 meter</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Field Archery Settings */}
                  {competitionFormat === "field" && (
                    <div className="mt-4">
                      <div className="section-title">Pengaturan Field Archery</div>
                      
                      <div className="form-group mt-3">
                        <Label htmlFor="fieldTargetCount" className="form-label">Jumlah Target</Label>
                        <Select
                          value={formatConfig.fieldTargetCount}
                          onValueChange={(value) => handleFormatConfigChange("fieldTargetCount", value)}
                        >
                          <SelectTrigger id="fieldTargetCount" className="select-trigger">
                            <SelectValue placeholder="Pilih jumlah target" />
                          </SelectTrigger>
                          <SelectContent className="select-content">
                            <SelectItem value="12">12 Target</SelectItem>
                            <SelectItem value="24">24 Target (Standard)</SelectItem>
                            <SelectItem value="28">28 Target</SelectItem>
                            <SelectItem value="32">32 Target</SelectItem>
                            <SelectItem value="48">48 Target (2 Courses)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* 3D Archery Settings */}
                  {competitionFormat === "3d" && (
                    <div className="mt-4">
                      <div className="section-title">Pengaturan 3D Archery</div>
                      
                      <div className="form-group mt-3">
                        <Label htmlFor="threeDTargetCount" className="form-label">Jumlah Target</Label>
                        <Select
                          value={formatConfig.threeDTargetCount}
                          onValueChange={(value) => handleFormatConfigChange("threeDTargetCount", value)}
                        >
                          <SelectTrigger id="threeDTargetCount" className="select-trigger">
                            <SelectValue placeholder="Pilih jumlah target" />
                          </SelectTrigger>
                          <SelectContent className="select-content">
                            <SelectItem value="12">12 Target</SelectItem>
                            <SelectItem value="20">20 Target</SelectItem>
                            <SelectItem value="24">24 Target (Standard)</SelectItem>
                            <SelectItem value="28">28 Target</SelectItem>
                            <SelectItem value="40">40 Target (2 Courses)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Flight & Clout Archery (Simple Settings) */}
                  {(competitionFormat === "flight" || competitionFormat === "clout") && (
                    <div className="mt-4">
                      <div className="section-title">Pengaturan {competitionFormat === "flight" ? "Flight" : "Clout"} Archery</div>
                      
                      <div className="form-group mt-3">
                        <Label htmlFor="customFormatDesc" className="form-label">Deskripsi Format Pertandingan</Label>
                        <Textarea
                          id="customFormatDesc"
                          value={formatConfig.customRound}
                          onChange={(e) => handleFormatConfigChange("customRound", e.target.value)}
                          placeholder={`Jelaskan detil format ${competitionFormat === "flight" ? "Flight" : "Clout"} Archery yang akan digunakan...`}
                          rows={4}
                          className="form-textarea"
                        />
                      </div>
                    </div>
                  )}

                  {/* Custom Format */}
                  {competitionFormat === "custom" && (
                    <div className="mt-4">
                      <div className="section-title">Format Kustom</div>
                      
                      <div className="form-group mt-3">
                        <Label htmlFor="customFormatDesc" className="form-label">Deskripsi Format Pertandingan</Label>
                        <Textarea
                          id="customFormatDesc"
                          value={formatConfig.customRound}
                          onChange={(e) => handleFormatConfigChange("customRound", e.target.value)}
                          placeholder="Jelaskan detil format pertandingan yang akan digunakan..."
                          rows={4}
                          className="form-textarea"
                        />
                        <span className="helper-text">
                          Deskripsikan secara detail bagaimana format pertandingan akan dilakukan, termasuk jumlah anak panah, jarak tembak, sistem penilaian, dsb.
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="form-footer">
                <Button type="button" variant="outline" onClick={goToPrevTab} className="btn btn-outline">
                  Kembali
                </Button>
                <Button type="button" onClick={goToNextTab} className="btn btn-primary">
                  Lanjutkan
                </Button>
              </div>
            </TabsContent>

            {/* Tab 5: Additional */}
            <TabsContent value="additional" className="tab-content">
              <Card className="card">
                <CardHeader className="card-header">
                  <CardTitle className="card-title">Tipe Delegasi Peserta</CardTitle>
                  <CardDescription className="card-description">Atur jenis delegasi yang diperbolehkan untuk mendaftar.</CardDescription>
                </CardHeader>
                <CardContent className="card-content">
                  <div className="radio-group">
                    <div className="checkbox-group">
                      <input
                        type="radio"
                        id="delegationAll"
                        name="delegationType"
                        value="all"
                        checked={delegationType === "all"}
                        onChange={() => handleDelegationChange("all")}
                        className="radio"
                      />
                      <label htmlFor="delegationAll" className="radio-label">Bebas (peserta dapat memilih club, negara, wilayah)</label>
                    </div>
                    <div className="checkbox-group">
                      <input
                        type="radio"
                        id="delegationCountry"
                        name="delegationType"
                        value="country"
                        checked={delegationType === "country"}
                        onChange={() => handleDelegationChange("country")}
                        className="radio"
                      />
                      <label htmlFor="delegationCountry" className="radio-label">Khusus negara saja</label>
                    </div>
                    <div className="checkbox-group">
                      <input
                        type="radio"
                        id="delegationProvince"
                        name="delegationType"
                        value="province"
                        checked={delegationType === "province"}
                        onChange={() => handleDelegationChange("province")}
                        className="radio"
                      />
                      <label htmlFor="delegationProvince" className="radio-label">Khusus provinsi saja</label>
                    </div>
                    <div className="checkbox-group">
                      <input
                        type="radio"
                        id="delegationCity"
                        name="delegationType"
                        value="city"
                        checked={delegationType === "city"}
                        onChange={() => handleDelegationChange("city")}
                        className="radio"
                      />
                      <label htmlFor="delegationCity" className="radio-label">Khusus kota/kabupaten saja</label>
                    </div>
                    <div className="checkbox-group">
                      <input
                        type="radio"
                        id="delegationClub"
                        name="delegationType"
                        value="club"
                        checked={delegationType === "club"}
                        onChange={() => handleDelegationChange("club")}
                        className="radio"
                      />
                      <label htmlFor="delegationClub" className="radio-label">Khusus klub saja</label>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="verifyDelegation"
                        checked={verifyDelegation}
                        onChange={handleVerifyDelegationChange}
                        className="checkbox"
                      />
                      <label htmlFor="verifyDelegation" className="checkbox-label">Verifikasi data delegasi dengan database</label>
                    </div>
                    <span className="helper-text ml-6">
                      Sistem akan memverifikasi bahwa peserta benar-benar terdaftar dalam klub/wilayah yang dipilih.
                    </span>
                  </div>

                  {/* Country delegation type */}
                  {delegationType === "country" && (
                    <div className="mt-6">
                      <div className="divider"></div>
                      <div className="section-title">Pilih Negara yang Diizinkan</div>
                      <span className="helper-text mb-3">Peserta hanya dapat mendaftar dari negara-negara berikut:</span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                        {countries.map(country => (
                          <div key={country.id} className="checkbox-group">
                            <input
                              type="checkbox"
                              id={`country-${country.id}`}
                              value={country.id}
                              checked={selectedCountries.includes(country.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedCountries([...selectedCountries, country.id]);
                                } else {
                                  setSelectedCountries(selectedCountries.filter(id => id !== country.id));
                                }
                              }}
                              className="checkbox"
                            />
                            <label htmlFor={`country-${country.id}`} className="checkbox-label">{country.name}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Province delegation type */}
                  {delegationType === "province" && (
                    <div className="mt-6">
                      <div className="divider"></div>
                      <div className="form-group">
                        <Label className="form-label">Pilih Negara</Label>
                        <Select
                          value={selectedCountryForProvince}
                          onValueChange={(value) => {
                            setSelectedCountryForProvince(value);
                            setSelectedProvinces([]);
                          }}
                        >
                          <SelectTrigger className="select-trigger">
                            <SelectValue placeholder="Pilih negara" />
                          </SelectTrigger>
                          <SelectContent className="select-content">
                            {countries.map(country => (
                              <SelectItem key={country.id} value={country.id}>{country.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span className="helper-text">Pilih negara terlebih dahulu untuk melihat provinsinya.</span>
                      </div>

                      {selectedCountryForProvince && (
                        <div className="form-group mt-4">
                          <div className="section-title">Pilih Provinsi yang Diizinkan</div>
                          <span className="helper-text mb-3">Peserta hanya dapat mendaftar dari provinsi-provinsi berikut:</span>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                            {provinces
                              .filter(province => province.countryId === selectedCountryForProvince)
                              .map(province => (
                                <div key={province.id} className="checkbox-group">
                                  <input
                                    type="checkbox"
                                    id={`province-${province.id}`}
                                    value={province.id}
                                    checked={selectedProvinces.includes(province.id)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedProvinces([...selectedProvinces, province.id]);
                                      } else {
                                        setSelectedProvinces(selectedProvinces.filter(id => id !== province.id));
                                      }
                                    }}
                                    className="checkbox"
                                  />
                                  <label htmlFor={`province-${province.id}`} className="checkbox-label">{province.name}</label>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* City delegation type */}
                  {delegationType === "city" && (
                    <div className="mt-6">
                      <div className="divider"></div>
                      <div className="form-group">
                        <Label className="form-label">Pilih Negara</Label>
                        <Select
                          value={selectedCountryForCity}
                          onValueChange={(value) => {
                            setSelectedCountryForCity(value);
                            setSelectedProvinceForCity("");
                            setSelectedCities([]);
                          }}
                        >
                          <SelectTrigger className="select-trigger">
                            <SelectValue placeholder="Pilih negara" />
                          </SelectTrigger>
                          <SelectContent className="select-content">
                            {countries.map(country => (
                              <SelectItem key={country.id} value={country.id}>{country.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {selectedCountryForCity && (
                        <div className="form-group mt-4">
                          <Label className="form-label">Pilih Provinsi</Label>
                          <Select
                            value={selectedProvinceForCity}
                            onValueChange={(value) => {
                              setSelectedProvinceForCity(value);
                              setSelectedCities([]);
                            }}
                          >
                            <SelectTrigger className="select-trigger">
                              <SelectValue placeholder="Pilih provinsi" />
                            </SelectTrigger>
                            <SelectContent className="select-content">
                              {provinces
                                .filter(province => province.countryId === selectedCountryForCity)
                                .map(province => (
                                  <SelectItem key={province.id} value={province.id}>{province.name}</SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      
                      {selectedProvinceForCity && (
                        <div className="form-group mt-4">
                          <div className="section-title">Pilih Kota/Kabupaten yang Diizinkan</div>
                          <span className="helper-text mb-3">Peserta hanya dapat mendaftar dari kota/kabupaten berikut:</span>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                            {cities
                              .filter(city => city.provinceId === selectedProvinceForCity)
                              .map(city => (
                                <div key={city.id} className="checkbox-group">
                                  <input
                                    type="checkbox"
                                    id={`city-${city.id}`}
                                    value={city.id}
                                    checked={selectedCities.includes(city.id)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedCities([...selectedCities, city.id]);
                                      } else {
                                        setSelectedCities(selectedCities.filter(id => id !== city.id));
                                      }
                                    }}
                                    className="checkbox"
                                  />
                                  <label htmlFor={`city-${city.id}`} className="checkbox-label">{city.name}</label>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Club delegation type */}
                  {delegationType === "club" && (
                    <div className="mt-6">
                      <div className="divider"></div>
                      <div className="section-title">Batasan Klub</div>
                      <div className="radio-group">
                        <div className="checkbox-group">
                          <input
                            type="radio"
                            id="clubAny"
                            name="clubRestrictionType"
                            value="any"
                            checked={clubRestrictionType === "any"}
                            onChange={() => setClubRestrictionType("any")}
                            className="radio"
                          />
                          <label htmlFor="clubAny" className="radio-label">Klub bebas (peserta dapat memilih atau membuat klub sendiri)</label>
                        </div>
                        <div className="checkbox-group">
                          <input
                            type="radio"
                            id="clubSpecific"
                            name="clubRestrictionType"
                            value="specific"
                            checked={clubRestrictionType === "specific"}
                            onChange={() => setClubRestrictionType("specific")}
                            className="radio"
                          />
                          <label htmlFor="clubSpecific" className="radio-label">Batasi hanya pada klub tertentu (bisa pilih lebih dari satu)</label>
                        </div>
                      </div>
                      
                      {clubRestrictionType === "specific" && (
                        <div className="form-group mt-4">
                          <div className="section-title">Pilih Klub yang Diizinkan</div>
                          <span className="helper-text mb-3">Peserta hanya dapat mendaftar dari klub-klub berikut:</span>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                            {clubs.map(club => (
                              <div key={club.id} className="checkbox-group">
                                <input
                                  type="checkbox"
                                  id={`club-${club.id}`}
                                  value={club.id}
                                  checked={selectedClubs.includes(club.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedClubs([...selectedClubs, club.id]);
                                    } else {
                                      setSelectedClubs(selectedClubs.filter(id => id !== club.id));
                                    }
                                  }}
                                  className="checkbox"
                                />
                                <label htmlFor={`club-${club.id}`} className="checkbox-label">{club.name}</label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="card">
                <CardHeader className="card-header">
                  <CardTitle className="card-title">Sponsor & Partner Event</CardTitle>
                  <CardDescription className="card-description">Kelola daftar sponsor dan partner untuk event ini.</CardDescription>
                </CardHeader>
                <CardContent className="card-content">
                  <div className="item-list">
                    {sponsors.map((sponsor, idx) => (
                      <div key={`sponsor-${sponsor.name.replace(/\s+/g, '-')}-${sponsor.level}-${idx}`} className="item flex-center justify-between">
                        <div>
                          <div className="font-medium">{sponsor.name}</div>
                          <div className="text-sm text-slate-500">Level: {sponsor.level}</div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="btn btn-danger"
                          onClick={() => handleRemoveSponsor(idx)}
                        >
                          <X size={16} className="mr-1" /> Hapus
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="divider"></div>
                  
                  <div className="section-title">Tambah Sponsor Baru</div>
                  <div className="grid-3">
                    <div className="form-group">
                      <Label htmlFor="sponsorName" className="form-label">Nama Sponsor</Label>
                      <Input
                        id="sponsorName"
                        name="name"
                        value={newSponsor.name}
                        onChange={handleNewSponsorChange}
                        placeholder="Nama perusahaan/organisasi"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <Label htmlFor="sponsorLevel" className="form-label">Level</Label>
                      <Select
                        value={newSponsor.level}
                        onValueChange={(value) => setNewSponsor({...newSponsor, level: value})}
                      >
                        <SelectTrigger id="sponsorLevel" className="select-trigger">
                          <SelectValue placeholder="Pilih level" />
                        </SelectTrigger>
                        <SelectContent className="select-content">
                          <SelectItem value="platinum">Platinum</SelectItem>
                          <SelectItem value="gold">Gold</SelectItem>
                          <SelectItem value="silver">Silver</SelectItem>
                          <SelectItem value="bronze">Bronze</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="form-group">
                      <Label htmlFor="sponsorLogo" className="form-label">Logo</Label>
                      <div className="border-2 border-dashed border-gray-200 rounded-md p-3 text-center">
                        <p className="text-xs text-gray-500 mb-2">SVG, PNG, atau JPG (maks. 2MB)</p>
                        <button type="button" className="btn btn-outline btn-sm">
                          <UploadCloud size={14} className="mr-1" /> Browse
                        </button>
                        <input
                          id="sponsorLogo"
                          type="file"
                          className="hidden"
                          accept="image/svg+xml,image/png,image/jpeg"
                        />
                      </div>
                    </div>
                  </div>
                  <Button type="button" className="btn btn-primary mt-4" onClick={handleAddSponsor}>
                    <Plus size={16} className="mr-1" /> Tambah Sponsor
                  </Button>
                </CardContent>
              </Card>

              <div className="form-footer">
                <Button type="button" variant="outline" onClick={goToPrevTab} className="btn btn-outline">
                  Kembali
                </Button>
                <Button type="submit" disabled={isSubmitting} className="btn btn-submit">
                  {isSubmitting ? "Memproses..." : "Buat Tournament"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </MainLayout>
  );
}