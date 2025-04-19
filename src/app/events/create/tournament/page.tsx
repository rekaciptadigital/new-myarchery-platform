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
import { ChevronLeft } from "lucide-react";
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
      <div className="flex items-center mb-6">
        <Link href="/events/create" className="text-slate-600 hover:text-slate-900 mr-3">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Buat Tournament / Kejuaraan Baru</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
            <TabsTrigger value="basic">Info Dasar</TabsTrigger>
            <TabsTrigger value="datetime">Lokasi & Waktu</TabsTrigger>
            <TabsTrigger value="pricing">Harga & Kuota</TabsTrigger>
            <TabsTrigger value="categories">Kategori</TabsTrigger>
            <TabsTrigger value="additional">Tambahan</TabsTrigger>
          </TabsList>

          {/* Tab 1: Basic Info */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Dasar & Branding</CardTitle>
                <CardDescription>Nama, deskripsi, dan branding visual tournament Anda.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Tournament <span className="text-red-500">*</span></Label>
                  <Input
                    id="name"
                    name="name"
                    value={basicInfo.name}
                    onChange={handleBasicInfoChange}
                    placeholder="Contoh: Kejuaraan Nasional Panahan 2025"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Deskripsi Tournament</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={basicInfo.description}
                    onChange={handleBasicInfoChange}
                    placeholder="Jelaskan tentang tournament Anda..."
                    rows={5}
                  />
                </div>
                <div>
                  <Label htmlFor="tournamentType">Jenis Tournament <span className="text-red-500">*</span></Label>
                  <Select
                    value={basicInfo.tournamentType}
                    onValueChange={(value) => handleSelectChange("basicInfo", "tournamentType", value)}
                  >
                    <SelectTrigger id="tournamentType">
                      <SelectValue placeholder="Pilih jenis tournament" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual (Perorangan)</SelectItem>
                      <SelectItem value="team">Team (Beregu)</SelectItem>
                      <SelectItem value="mixed">Mixed (Perorangan & Beregu)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="eventBranding">Branding (Logo/Banner)</Label>
                  <Input id="eventBranding" type="file" />
                  <p className="text-xs text-slate-500 mt-1">Upload logo atau banner tournament.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visibilitas Event</CardTitle>
                <CardDescription>Atur siapa saja yang dapat melihat dan mendaftar tournament Anda.</CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor="eventVisibility">Visibilitas</Label>
                <Select
                  value={basicInfo.visibility}
                  onValueChange={(value) => handleSelectChange("basicInfo", "visibility", value)}
                >
                  <SelectTrigger id="eventVisibility">
                    <SelectValue placeholder="Pilih visibilitas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public (Terlihat oleh semua)</SelectItem>
                    <SelectItem value="private">Private (Hanya via undangan/kode)</SelectItem>
                    <SelectItem value="unlisted">Unlisted (Hanya via link)</SelectItem>
                  </SelectContent>
                </Select>
                
                {basicInfo.visibility === "private" && (
                  <div className="mt-4">
                    <Label htmlFor="inviteCode">Kode Undangan</Label>
                    <div className="flex">
                      <Input
                        id="inviteCode"
                        name="inviteCode"
                        value={basicInfo.inviteCode}
                        onChange={handleBasicInfoChange}
                        placeholder="Contoh: ARCHERY2025"
                        className="w-1/2"
                      />
                      <Button variant="outline" type="button" className="ml-2">Generate Kode</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Handbook/Technical Guide</CardTitle>
                <CardDescription>Upload dokumen panduan teknis untuk peserta.</CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor="eventHandbook">Upload Handbook</Label>
                <Input id="eventHandbook" type="file" accept=".pdf,.doc,.docx" />
                <p className="text-xs text-slate-500 mt-1">Format yang didukung: PDF, DOC, DOCX.</p>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="button" onClick={goToNextTab}>Lanjutkan</Button>
            </div>
          </TabsContent>

          {/* Tab 2: Location & Date */}
          <TabsContent value="datetime" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lokasi & Tanggal</CardTitle>
                <CardDescription>Tentukan tempat dan waktu pelaksanaan tournament.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="location">Lokasi <span className="text-red-500">*</span></Label>
                  <Input
                    id="location"
                    name="location"
                    value={locationDate.location}
                    onChange={handleLocationDateChange}
                    placeholder="Contoh: Lapangan Panahan Senayan"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Tanggal Mulai <span className="text-red-500">*</span></Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={locationDate.startDate}
                      onChange={handleLocationDateChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">Tanggal Selesai (Opsional)</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={locationDate.endDate}
                      onChange={handleLocationDateChange}
                      min={locationDate.startDate}
                    />
                    <p className="text-xs text-slate-500 mt-1">Kosongkan jika event hanya satu hari.</p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="registrationDeadline">Deadline Pendaftaran <span className="text-red-500">*</span></Label>
                  <Input
                    id="registrationDeadline"
                    name="registrationDeadline"
                    type="date"
                    value={locationDate.registrationDeadline}
                    onChange={handleLocationDateChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Countdown Timer</CardTitle>
                <CardDescription>Pengaturan display countdown timer untuk event.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="eventStart"
                    name="eventStart"
                    checked={countdown.eventStart}
                    onChange={handleCountdownChange}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="eventStart">Tampilkan countdown waktu hingga event dimulai</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="registrationEnd"
                    name="registrationEnd"
                    checked={countdown.registrationEnd}
                    onChange={handleCountdownChange}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="registrationEnd">Tampilkan countdown deadline pendaftaran</Label>
                </div>
                
                <div className="text-xs text-slate-500 mt-1">
                  Countdown timer akan ditampilkan di halaman event dan dashboard peserta.
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={goToPrevTab}>Kembali</Button>
              <Button type="button" onClick={goToNextTab}>Lanjutkan</Button>
            </div>
          </TabsContent>

          {/* Tab 3: Pricing & Quota */}
          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mekanisme Harga</CardTitle>
                <CardDescription>Atur harga pendaftaran untuk peserta tournament.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="pricingType">Jenis Harga</Label>
                  <Select
                    value={pricingType}
                    onValueChange={(value) => handleSelectChange("pricing", "type", value)}
                  >
                    <SelectTrigger id="pricingType">
                      <SelectValue placeholder="Pilih jenis harga" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Price (Harga sama untuk semua kategori)</SelectItem>
                      <SelectItem value="multi">Multi Price (Harga berbeda per kategori)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {pricingType === "single" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="basePrice">Harga Dasar <span className="text-red-500">*</span></Label>
                      <Input
                        id="basePrice"
                        type="number"
                        value={singlePrice.amount}
                        onChange={handleSinglePriceChange}
                        placeholder="250000"
                        required={pricingType === "single"}
                      />
                    </div>
                    <div>
                      <Label htmlFor="currency">Mata Uang</Label>
                      <Select
                        value={singlePrice.currency}
                        onValueChange={(value) => handleSelectChange("pricing", "currency", value)}
                      >
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Pilih mata uang" />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map(curr => (
                            <SelectItem key={curr.value} value={curr.value}>{curr.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-sm font-medium">Harga Per Kategori</div>
                    {multiPricing.map((option, idx) => (
                      <div key={`pricing-${option.category.replace(/\s+/g, '-')}-${idx}`} className="grid grid-cols-5 gap-2 items-center border-b pb-2">
                        <div className="col-span-2">
                          <Input
                            value={option.category}
                            onChange={(e) => handlePricingCategoryChange(idx, "category", e.target.value)}
                            placeholder="Nama kategori"
                          />
                        </div>
                        <div>
                          <Input
                            type="number"
                            value={option.price}
                            onChange={(e) => handlePricingCategoryChange(idx, "price", e.target.value)}
                            placeholder="Harga"
                          />
                        </div>
                        <div>
                          <Select
                            value={option.currency}
                            onValueChange={(value) => handlePricingCategoryChange(idx, "currency", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Mata Uang" />
                            </SelectTrigger>
                            <SelectContent>
                              {currencies.map(curr => (
                                <SelectItem key={curr.value} value={curr.value}>{curr.value}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-red-500"
                            onClick={() => handleRemovePricingCategory(idx)}
                          >
                            Hapus
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="grid grid-cols-5 gap-2 items-end">
                      <div className="col-span-2">
                        <Label htmlFor="newCategoryName">Nama Kategori</Label>
                        <Input
                          id="newCategoryName"
                          value={newPricingCategory.category}
                          onChange={(e) => setNewPricingCategory({...newPricingCategory, category: e.target.value})}
                          placeholder="Contoh: Compound Men"
                        />
                      </div>
                      <div>
                        <Label htmlFor="newCategoryPrice">Harga</Label>
                        <Input
                          id="newCategoryPrice"
                          type="number"
                          value={newPricingCategory.price}
                          onChange={(e) => setNewPricingCategory({...newPricingCategory, price: e.target.value})}
                          placeholder="300000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="newCategoryCurrency">Mata Uang</Label>
                        <Select
                          value={newPricingCategory.currency}
                          onValueChange={(value) => setNewPricingCategory({...newPricingCategory, currency: value})}
                        >
                          <SelectTrigger id="newCategoryCurrency">
                            <SelectValue placeholder="Mata Uang" />
                          </SelectTrigger>
                          <SelectContent>
                            {currencies.map(curr => (
                              <SelectItem key={curr.value} value={curr.value}>{curr.value}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Button
                          type="button"
                          onClick={handleAddPricingCategory}
                        >
                          Tambah
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <input
                        type="checkbox"
                        id="enableEarlyBird"
                        name="enabled"
                        checked={earlyBird.enabled}
                        onChange={handleEarlyBirdChange}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="enableEarlyBird">Early Bird Discount</Label>
                    </div>
                    {earlyBird.enabled && (
                      <div className="space-y-2 pl-6">
                        <div>
                          <Label htmlFor="earlyBirdDate">Tanggal Akhir Early Bird</Label>
                          <Input
                            id="earlyBirdDate"
                            name="endDate"
                            type="date"
                            value={earlyBird.endDate}
                            onChange={handleEarlyBirdChange}
                            required={earlyBird.enabled}
                          />
                        </div>
                        <div>
                          <Label htmlFor="earlyBirdDiscount">Diskon (%)</Label>
                          <Input
                            id="earlyBirdDiscount"
                            name="discount"
                            type="number"
                            value={earlyBird.discount}
                            onChange={handleEarlyBirdChange}
                            min="1"
                            max="100"
                            required={earlyBird.enabled}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <input
                        type="checkbox"
                        id="enableLateFee"
                        name="enabled"
                        checked={lateRegistration.enabled}
                        onChange={handleLateRegistrationChange}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="enableLateFee">Late Registration Fee</Label>
                    </div>
                    {lateRegistration.enabled && (
                      <div className="space-y-2 pl-6">
                        <div>
                          <Label htmlFor="lateFeeDate">Tanggal Mulai Late Registration</Label>
                          <Input
                            id="lateFeeDate"
                            name="startDate"
                            type="date"
                            value={lateRegistration.startDate}
                            onChange={handleLateRegistrationChange}
                            required={lateRegistration.enabled}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lateFeeAmount">Biaya Tambahan (%)</Label>
                          <Input
                            id="lateFeeAmount"
                            name="fee"
                            type="number"
                            value={lateRegistration.fee}
                            onChange={handleLateRegistrationChange}
                            min="1"
                            max="100"
                            required={lateRegistration.enabled}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kuota Peserta</CardTitle>
                <CardDescription>Tentukan batas maksimal jumlah peserta yang dapat mendaftar.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="quotaType">Jenis Kuota</Label>
                  <Select
                    value={quotaType}
                    onValueChange={(value) => handleSelectChange("quota", "type", value)}
                  >
                    <SelectTrigger id="quotaType">
                      <SelectValue placeholder="Pilih jenis kuota" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="total">Total (Batasi total keseluruhan peserta)</SelectItem>
                      <SelectItem value="category">Per Kategori (Batasi peserta per kategori)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {quotaType === "total" ? (
                  <div>
                    <Label htmlFor="totalQuota">Total Kuota Peserta <span className="text-red-500">*</span></Label>
                    <Input
                      id="totalQuota"
                      type="number"
                      value={totalQuota}
                      onChange={handleQuotaChange}
                      min="1"
                      placeholder="200"
                      required={quotaType === "total"}
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-sm font-medium">Kuota Per Kategori</div>
                    {categoryQuotas.map((cat, idx) => (
                      <div key={`quota-${cat.category.replace(/\s+/g, '-')}-${idx}`} className="grid grid-cols-2 gap-2 items-center border-b pb-2">
                        <div className="text-sm">{cat.category}</div>
                        <Input
                          type="number"
                          value={cat.quota}
                          onChange={(e) => handleCategoryQuotaChange(idx, e.target.value)}
                          min="1"
                          placeholder="50"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={goToPrevTab}>Kembali</Button>
              <Button type="button" onClick={goToNextTab}>Lanjutkan</Button>
            </div>
          </TabsContent>

          {/* Tab 4: Categories */}
          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kategori Berbasis Umur</CardTitle>
                <CardDescription>Konfigurasi kategori umur untuk peserta tournament.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-12 gap-2 font-medium">
                  <div className="col-span-4">Nama Kategori</div>
                  <div className="col-span-3">Umur Minimal</div>
                  <div className="col-span-3">Umur Maksimal</div>
                  <div className="col-span-2">Aksi</div>
                </div>
                
                {ageCategories.map((cat, idx) => (
                  <div key={`age-category-${cat.name.replace(/\s+/g, '-')}-${idx}`} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-4">
                      <Input
                        value={cat.name}
                        onChange={(e) => handleAgeCategoryChange(idx, "name", e.target.value)}
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        type="number"
                        value={cat.minAge}
                        onChange={(e) => handleAgeCategoryChange(idx, "minAge", e.target.value)}
                        min="0"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        type="number"
                        value={cat.maxAge}
                        onChange={(e) => handleAgeCategoryChange(idx, "maxAge", e.target.value)}
                        min={cat.minAge}
                      />
                    </div>
                    <div className="col-span-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-red-500"
                        onClick={() => handleRemoveAgeCategory(idx)}
                      >
                        Hapus
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 mt-4">
                  <div className="text-sm font-medium mb-2">Tambah Kategori Baru</div>
                  <div className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-4">
                      <Label htmlFor="categoryName">Nama</Label>
                      <Input
                        id="categoryName"
                        name="name"
                        value={newAgeCategory.name}
                        onChange={handleNewAgeCategoryChange}
                        placeholder="U-15, Senior, Master, dll"
                      />
                    </div>
                    <div className="col-span-3">
                      <Label htmlFor="minAge">Umur Minimal</Label>
                      <Input
                        id="minAge"
                        name="minAge"
                        type="number"
                        value={newAgeCategory.minAge}
                        onChange={handleNewAgeCategoryChange}
                        min="0"
                      />
                    </div>
                    <div className="col-span-3">
                      <Label htmlFor="maxAge">Umur Maksimal</Label>
                      <Input
                        id="maxAge"
                        name="maxAge"
                        type="number"
                        value={newAgeCategory.maxAge}
                        onChange={handleNewAgeCategoryChange}
                        min={newAgeCategory.minAge || "0"}
                      />
                    </div>
                    <div className="col-span-2">
                      <Button type="button" onClick={handleAddAgeCategory}>Tambah</Button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Sistem akan menempatkan peserta ke kategori yang sesuai berdasarkan data tanggal lahir mereka.
                  </p>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="text-sm font-medium mb-2">Kalkulasi Umur</div>
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="radio"
                      id="ageAtEvent"
                      name="ageCalculation"
                      value="event"
                      checked={ageCalculation === "event"}
                      onChange={() => setAgeCalculation("event")}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="ageAtEvent">Hitung umur saat pertandingan berlangsung</Label>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="radio"
                      id="specificRange"
                      name="ageCalculation"
                      value="range"
                      checked={ageCalculation === "range"}
                      onChange={() => setAgeCalculation("range")}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="specificRange">Berdasarkan range tanggal lahir spesifik</Label>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="autoPlace" className="w-4 h-4" defaultChecked />
                    <Label htmlFor="autoPlace">Auto-penempatan peserta ke kategori berdasarkan tanggal lahir</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={goToPrevTab}>Kembali</Button>
              <Button type="button" onClick={goToNextTab}>Lanjutkan</Button>
            </div>
          </TabsContent>

          {/* Tab 5: Additional */}
          <TabsContent value="additional" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tipe Delegasi Peserta</CardTitle>
                <CardDescription>Atur jenis delegasi yang diperbolehkan untuk mendaftar.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="delegationAll"
                      name="delegationType"
                      value="all"
                      checked={delegationType === "all"}
                      onChange={() => handleDelegationChange("all")}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="delegationAll">Bebas (peserta dapat memilih club, negara, wilayah)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="delegationCountry"
                      name="delegationType"
                      value="country"
                      checked={delegationType === "country"}
                      onChange={() => handleDelegationChange("country")}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="delegationCountry">Khusus negara saja</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="delegationProvince"
                      name="delegationType"
                      value="province"
                      checked={delegationType === "province"}
                      onChange={() => handleDelegationChange("province")}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="delegationProvince">Khusus provinsi saja</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="delegationCity"
                      name="delegationType"
                      value="city"
                      checked={delegationType === "city"}
                      onChange={() => handleDelegationChange("city")}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="delegationCity">Khusus kota/kabupaten saja</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="delegationClub"
                      name="delegationType"
                      value="club"
                      checked={delegationType === "club"}
                      onChange={() => handleDelegationChange("club")}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="delegationClub">Khusus klub saja</Label>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="verifyDelegation"
                      checked={verifyDelegation}
                      onChange={handleVerifyDelegationChange}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="verifyDelegation">Verifikasi data delegasi dengan database</Label>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 pl-6">
                    Sistem akan memverifikasi bahwa peserta benar-benar terdaftar dalam klub/wilayah yang dipilih.
                  </p>
                </div>

                {/* Country delegation type - Multi-country selection */}
                {delegationType === "country" && (
                  <div className="mt-4 border-t pt-4">
                    <Label className="text-sm font-medium">Pilih Negara yang Diizinkan (Bisa Pilih Lebih dari Satu)</Label>
                    <p className="text-xs text-slate-500 mb-2">Peserta hanya dapat mendaftar dari negara-negara berikut:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {countries.map(country => (
                        <div key={country.id} className="flex items-center space-x-2">
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
                            className="w-4 h-4"
                          />
                          <Label htmlFor={`country-${country.id}`}>{country.name}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Province delegation type - Country first, then provinces */}
                {delegationType === "province" && (
                  <div className="mt-4 border-t pt-4 space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Pilih Negara</Label>
                      <p className="text-xs text-slate-500 mb-2">Pilih negara terlebih dahulu:</p>
                      <Select
                        value={selectedCountryForProvince}
                        onValueChange={(value) => {
                          setSelectedCountryForProvince(value);
                          setSelectedProvinces([]);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih negara" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map(country => (
                            <SelectItem key={country.id} value={country.id}>{country.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedCountryForProvince && (
                      <div>
                        <Label className="text-sm font-medium">Pilih Provinsi yang Diizinkan (Bisa Pilih Lebih dari Satu)</Label>
                        <p className="text-xs text-slate-500 mb-2">Peserta hanya dapat mendaftar dari provinsi-provinsi berikut:</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                          {provinces
                            .filter(province => province.countryId === selectedCountryForProvince)
                            .map(province => (
                              <div key={province.id} className="flex items-center space-x-2">
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
                                  className="w-4 h-4"
                                />
                                <Label htmlFor={`province-${province.id}`}>{province.name}</Label>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* City delegation type - Country, province, then cities */}
                {delegationType === "city" && (
                  <div className="mt-4 border-t pt-4 space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Pilih Negara</Label>
                      <Select
                        value={selectedCountryForCity}
                        onValueChange={(value) => {
                          setSelectedCountryForCity(value);
                          setSelectedProvinceForCity("");
                          setSelectedCities([]);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih negara" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map(country => (
                            <SelectItem key={country.id} value={country.id}>{country.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedCountryForCity && (
                      <div>
                        <Label className="text-sm font-medium">Pilih Provinsi</Label>
                        <Select
                          value={selectedProvinceForCity}
                          onValueChange={(value) => {
                            setSelectedProvinceForCity(value);
                            setSelectedCities([]);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih provinsi" />
                          </SelectTrigger>
                          <SelectContent>
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
                      <div>
                        <Label className="text-sm font-medium">Pilih Kota/Kabupaten yang Diizinkan (Bisa Pilih Lebih dari Satu)</Label>
                        <p className="text-xs text-slate-500 mb-2">Peserta hanya dapat mendaftar dari kota/kabupaten berikut:</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                          {cities
                            .filter(city => city.provinceId === selectedProvinceForCity)
                            .map(city => (
                              <div key={city.id} className="flex items-center space-x-2">
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
                                  className="w-4 h-4"
                                />
                                <Label htmlFor={`city-${city.id}`}>{city.name}</Label>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Club delegation type - Any club or specific clubs */}
                {delegationType === "club" && (
                  <div className="mt-4 border-t pt-4 space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Batasan Klub</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <input
                          type="radio"
                          id="clubAny"
                          name="clubRestrictionType"
                          value="any"
                          checked={clubRestrictionType === "any"}
                          onChange={() => setClubRestrictionType("any")}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="clubAny">Klub bebas (peserta dapat memilih atau membuat klub sendiri)</Label>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <input
                          type="radio"
                          id="clubSpecific"
                          name="clubRestrictionType"
                          value="specific"
                          checked={clubRestrictionType === "specific"}
                          onChange={() => setClubRestrictionType("specific")}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="clubSpecific">Batasi hanya pada klub tertentu (bisa pilih lebih dari satu)</Label>
                      </div>
                    </div>
                    
                    {clubRestrictionType === "specific" && (
                      <div>
                        <Label className="text-sm font-medium">Pilih Klub yang Diizinkan</Label>
                        <p className="text-xs text-slate-500 mb-2">Peserta hanya dapat mendaftar dari klub-klub berikut:</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                          {clubs.map(club => (
                            <div key={club.id} className="flex items-center space-x-2">
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
                                className="w-4 h-4"
                              />
                              <Label htmlFor={`club-${club.id}`}>{club.name}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sponsor & Partner Event</CardTitle>
                <CardDescription>Kelola daftar sponsor dan partner untuk event ini.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sponsors.map((sponsor, idx) => (
                  <div key={`sponsor-${sponsor.name.replace(/\s+/g, '-')}-${sponsor.level}-${idx}`} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <strong>{sponsor.name}</strong>
                      <div className="text-sm text-slate-500">Level: {sponsor.level}</div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-red-500"
                      onClick={() => handleRemoveSponsor(idx)}
                    >
                      Hapus
                    </Button>
                  </div>
                ))}
                
                <div className="border-t pt-4 mt-4">
                  <div className="text-sm font-medium mb-2">Tambah Sponsor Baru</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="sponsorName">Nama Sponsor</Label>
                      <Input
                        id="sponsorName"
                        name="name"
                        value={newSponsor.name}
                        onChange={handleNewSponsorChange}
                        placeholder="Nama perusahaan/organisasi"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sponsorLevel">Level</Label>
                      <Select
                        value={newSponsor.level}
                        onValueChange={(value) => setNewSponsor({...newSponsor, level: value})}
                      >
                        <SelectTrigger id="sponsorLevel">
                          <SelectValue placeholder="Pilih level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="platinum">Platinum</SelectItem>
                          <SelectItem value="gold">Gold</SelectItem>
                          <SelectItem value="silver">Silver</SelectItem>
                          <SelectItem value="bronze">Bronze</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="sponsorLogo">Logo</Label>
                      <Input id="sponsorLogo" type="file" />
                    </div>
                  </div>
                  <Button type="button" className="mt-2" onClick={handleAddSponsor}>Tambah Sponsor</Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={goToPrevTab}>Kembali</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Memproses..." : "Buat Tournament"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </MainLayout>
  );
}