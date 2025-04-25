import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

// Dummy event data
const dummyEvent = {
  id: "123",
  name: "Kejuaraan Panahan Nasional 2025",
  description: "Kompetisi panahan nasional terbesar di Indonesia untuk tahun 2025.",
  location: "Lapangan Panahan Senayan, Jakarta",
  startDate: "2025-06-15",
  endDate: "2025-06-17",
  visibility: "public",
  quota: {
    total: 200,
    perCategory: [
      { category: "Recurve Men", quota: 50 },
      { category: "Recurve Women", quota: 50 },
      { category: "Compound Men", quota: 50 },
      { category: "Compound Women", quota: 50 }
    ]
  },
  pricing: {
    type: "multi",
    options: [
      { category: "Recurve Men", price: 250000, currency: "IDR" },
      { category: "Recurve Women", price: 250000, currency: "IDR" },
      { category: "Compound Men", price: 300000, currency: "IDR" },
      { category: "Compound Women", price: 300000, currency: "IDR" }
    ],
    earlyBird: {
      enabled: true,
      endDate: "2025-05-15",
      discount: 15 // 15% discount
    },
    lateRegistration: {
      enabled: true,
      startDate: "2025-06-01",
      fee: 10 // 10% extra
    }
  },
  ageCategories: [
    { name: "U-15", minAge: 10, maxAge: 15 },
    { name: "U-18", minAge: 16, maxAge: 18 },
    { name: "Senior", minAge: 19, maxAge: 45 },
    { name: "Master", minAge: 46, maxAge: 99 }
  ],
  delegationType: "all",
  countdown: {
    eventStart: true,
    registrationEnd: true,
    registrationEndDate: "2025-06-01"
  },
  sponsors: [
    { name: "Archery Supplies Co", logo: "sponsor1.png", level: "Platinum" },
    { name: "Sports Equipment Ltd", logo: "sponsor2.png", level: "Gold" }
  ]
};

// Currency options
const currencies = [
  { value: "IDR", label: "IDR - Indonesian Rupiah" },
  { value: "USD", label: "USD - US Dollar" },
  { value: "SGD", label: "SGD - Singapore Dollar" },
  { value: "MYR", label: "MYR - Malaysian Ringgit" }
];

export default function ConfigureEventPage() {
  // Use useParams() directly with type assertion instead of props and use()
  
  // In a real app, you would fetch event data based on eventId
  const [event, setEvent] = useState(dummyEvent);
  
  // Basic info
  const [basicInfo, setBasicInfo] = useState({
    name: event.name,
    description: event.description
  });

  // Location and date
  const [locationDate, setLocationDate] = useState({
    location: event.location,
    startDate: event.startDate,
    endDate: event.endDate || ""
  });

  // Visibility
  const [visibility, setVisibility] = useState(event.visibility);

  // Countdown settings
  const [countdown, setCountdown] = useState(event.countdown);

  // Quota settings
  const [quotaType, setQuotaType] = useState("total"); // 'total' or 'category'

  // Pricing settings
  const [pricingType, setPricingType] = useState(event.pricing.type); // 'single' or 'multi'
  const [pricingOptions, setPricingOptions] = useState(event.pricing.options);
  const [earlyBird, setEarlyBird] = useState(event.pricing.earlyBird);
  const [lateRegistration, setLateRegistration] = useState(event.pricing.lateRegistration);

  // Age categories
  const [ageCategories, setAgeCategories] = useState(event.ageCategories);
  const [newCategory, setNewCategory] = useState({ name: "", minAge: 0, maxAge: 0 });

  // Delegation type
  const [delegationType, setDelegationType] = useState(event.delegationType);

  // Form handlers
  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBasicInfo({
      ...basicInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleLocationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationDate({
      ...locationDate,
      [e.target.name]: e.target.value
    });
  };

  const handleVisibilityChange = (value: string) => {
    setVisibility(value);
  };

  const handleCountdownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;
    if (name === "eventStart" || name === "registrationEnd") {
      // Handle checkboxes
      setCountdown({
        ...countdown,
        [name]: checked
      });
    } else {
      // Handle date input
      setCountdown({
        ...countdown,
        [name]: value
      });
    }
  };

  const handlePricingTypeChange = (value: string) => {
    setPricingType(value);
  };

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.minAge >= 0 && newCategory.maxAge > newCategory.minAge) {
      setAgeCategories([...ageCategories, { ...newCategory }]);
      setNewCategory({ name: "", minAge: 0, maxAge: 0 });
    }
  };

  const handleSaveConfiguration = () => {
    const updatedEvent = {
      ...event,
      name: basicInfo.name,
      description: basicInfo.description,
      location: locationDate.location,
      startDate: locationDate.startDate,
      endDate: locationDate.endDate,
      visibility,
      countdown,
      pricing: {
        ...event.pricing,
        type: pricingType,
        options: pricingOptions,
        earlyBird,
        lateRegistration
      },
      ageCategories,
      delegationType
    };
    
    // In a real app, you would save this to your backend
    setEvent(updatedEvent);
    alert("Konfigurasi event berhasil disimpan!");
  };

  return (
    <MainLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Konfigurasi Event</h1>
          <p className="text-slate-600">Atur dan kelola detail event &quot;{event.name}&quot;</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">Batal</Button>
          <Button onClick={handleSaveConfiguration}>Simpan Konfigurasi</Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="mb-8">
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
              <CardDescription>Nama, deskripsi, dan branding visual event Anda.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Nama Event</Label>
                <Input 
                  id="name" 
                  name="name"
                  value={basicInfo.name}
                  onChange={handleBasicInfoChange}
                  placeholder="Contoh: Kejuaraan Nasional Panahan 2025" 
                />
              </div>
              <div>
                <Label htmlFor="description">Deskripsi Event</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  value={basicInfo.description}
                  onChange={handleBasicInfoChange}
                  placeholder="Jelaskan tentang event Anda..." 
                  rows={5}
                />
              </div>
              <div>
                <Label htmlFor="eventBranding">Branding (Logo/Banner)</Label>
                <Input id="eventBranding" type="file" />
                <p className="text-xs text-slate-500 mt-1">Upload logo atau banner event.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visibilitas Event</CardTitle>
              <CardDescription>Atur siapa saja yang dapat melihat dan mendaftar event Anda.</CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="eventVisibility">Visibilitas</Label>
              <Select value={visibility} onValueChange={handleVisibilityChange}>
                <SelectTrigger id="eventVisibility">
                  <SelectValue placeholder="Pilih visibilitas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public (Terlihat oleh semua)</SelectItem>
                  <SelectItem value="private">Private (Hanya via undangan/kode)</SelectItem>
                  <SelectItem value="unlisted">Unlisted (Hanya via link)</SelectItem>
                </SelectContent>
              </Select>
              
              {visibility === "private" && (
                <div className="mt-4">
                  <Label htmlFor="inviteCode">Kode Undangan</Label>
                  <div className="flex">
                    <Input id="inviteCode" defaultValue="PAN2025" className="w-1/2" />
                    <Button variant="outline" className="ml-2">Generate Kode</Button>
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
        </TabsContent>

        {/* Tab 2: Location & Date */}
        <TabsContent value="datetime" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lokasi & Tanggal</CardTitle>
              <CardDescription>Tentukan tempat dan waktu pelaksanaan event.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location">Lokasi</Label>
                <Input 
                  id="location" 
                  name="location"
                  value={locationDate.location}
                  onChange={handleLocationDateChange}
                  placeholder="Contoh: Lapangan Panahan Senayan" 
                />
                {/* TODO: Integrate Mapbox for venue selection */}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Tanggal Mulai</Label>
                  <Input 
                    id="startDate" 
                    name="startDate"
                    type="date" 
                    value={locationDate.startDate}
                    onChange={handleLocationDateChange}
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
                  />
                  <p className="text-xs text-slate-500 mt-1">Kosongkan jika event hanya satu hari.</p>
                </div>
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
              
              {countdown.registrationEnd && (
                <div>
                  <Label htmlFor="registrationEndDate">Deadline Pendaftaran</Label>
                  <Input 
                    id="registrationEndDate" 
                    name="registrationEndDate"
                    type="date" 
                    value={countdown.registrationEndDate}
                    onChange={handleCountdownChange}
                  />
                </div>
              )}
              
              <div className="text-xs text-slate-500 mt-1">
                Countdown timer akan ditampilkan di halaman event dan dashboard peserta.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Pricing & Quota */}
        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mekanisme Harga</CardTitle>
              <CardDescription>Atur harga pendaftaran untuk peserta event.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="pricingType">Jenis Harga</Label>
                <Select value={pricingType} onValueChange={handlePricingTypeChange}>
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
                    <Label htmlFor="basePrice">Harga Dasar</Label>
                    <Input id="basePrice" type="number" defaultValue="250000" />
                  </div>
                  <div>
                    <Label htmlFor="currency">Mata Uang</Label>
                    <Select defaultValue="IDR">
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
                  {pricingOptions.map((option, idx) => (
                    <div key={`${option.category}-${idx}`} className="grid grid-cols-3 gap-2 items-center border-b pb-2">
                      <div className="text-sm">{option.category}</div>
                      <Input 
                        type="number" 
                        value={option.price} 
                        onChange={e => {
                          const newOptions = [...pricingOptions];
                          newOptions[idx].price = Number(e.target.value);
                          setPricingOptions(newOptions);
                        }}
                      />
                      <Select 
                        value={option.currency}
                        onValueChange={value => {
                          const newOptions = [...pricingOptions];
                          newOptions[idx].currency = value;
                          setPricingOptions(newOptions);
                        }}
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
                  ))}
                  <Button variant="outline">+ Tambah Kategori</Button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <input 
                      type="checkbox" 
                      id="enableEarlyBird" 
                      checked={earlyBird.enabled}
                      onChange={e => setEarlyBird({...earlyBird, enabled: e.target.checked})}
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
                          type="date" 
                          value={earlyBird.endDate}
                          onChange={e => setEarlyBird({...earlyBird, endDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="earlyBirdDiscount">Diskon (%)</Label>
                        <Input 
                          id="earlyBirdDiscount" 
                          type="number" 
                          value={earlyBird.discount}
                          onChange={e => setEarlyBird({...earlyBird, discount: Number(e.target.value)})}
                          min="1" 
                          max="100" 
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
                      checked={lateRegistration.enabled}
                      onChange={e => setLateRegistration({...lateRegistration, enabled: e.target.checked})}
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
                          type="date" 
                          value={lateRegistration.startDate}
                          onChange={e => setLateRegistration({...lateRegistration, startDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lateFeeAmount">Biaya Tambahan (%)</Label>
                        <Input 
                          id="lateFeeAmount" 
                          type="number"
                          value={lateRegistration.fee}
                          onChange={e => setLateRegistration({...lateRegistration, fee: Number(e.target.value)})}
                          min="1" 
                          max="100" 
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
                <Select value={quotaType} onValueChange={setQuotaType}>
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
                  <Label htmlFor="totalQuota">Total Kuota Peserta</Label>
                  <Input id="totalQuota" type="number" defaultValue={event.quota.total.toString()} min="1" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-sm font-medium">Kuota Per Kategori</div>
                  {event.quota.perCategory.map((cat, idx) => (
                    <div key={`${cat.category}-${idx}`} className="grid grid-cols-2 gap-2 items-center border-b pb-2">
                      <div className="text-sm">{cat.category}</div>
                      <Input 
                        type="number" 
                        defaultValue={cat.quota} 
                        min="1"
                      />
                    </div>
                  ))}
                  <Button variant="outline">+ Tambah Kategori</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: Categories */}
        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kategori Berbasis Umur</CardTitle>
              <CardDescription>Konfigurasi kategori umur untuk peserta event.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-12 gap-2 font-medium">
                <div className="col-span-4">Nama Kategori</div>
                <div className="col-span-3">Umur Minimal</div>
                <div className="col-span-3">Umur Maksimal</div>
                <div className="col-span-2">Aksi</div>
              </div>
              
              {ageCategories.map((cat, idx) => (
                <div key={`${cat.name}-${idx}`} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-4">{cat.name}</div>
                  <div className="col-span-3">{cat.minAge} tahun</div>
                  <div className="col-span-3">{cat.maxAge} tahun</div>
                  <div className="col-span-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500"
                      onClick={() => setAgeCategories(ageCategories.filter((_, i) => i !== idx))}
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
                      value={newCategory.name}
                      onChange={e => setNewCategory({...newCategory, name: e.target.value})}
                      placeholder="U-15, Senior, Master, dll" 
                    />
                  </div>
                  <div className="col-span-3">
                    <Label htmlFor="minAge">Umur Minimal</Label>
                    <Input 
                      id="minAge" 
                      type="number" 
                      value={newCategory.minAge || ""}
                      onChange={e => setNewCategory({...newCategory, minAge: Number(e.target.value)})}
                      min="0" 
                    />
                  </div>
                  <div className="col-span-3">
                    <Label htmlFor="maxAge">Umur Maksimal</Label>
                    <Input 
                      id="maxAge" 
                      type="number" 
                      value={newCategory.maxAge || ""}
                      onChange={e => setNewCategory({...newCategory, maxAge: Number(e.target.value)})}
                      min="0" 
                    />
                  </div>
                  <div className="col-span-2">
                    <Button onClick={handleAddCategory}>Tambah</Button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Sistem akan menempatkan peserta ke kategori yang sesuai berdasarkan data tanggal lahir mereka.
                </p>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="autoPlace" className="w-4 h-4" defaultChecked />
                  <Label htmlFor="autoPlace">Auto-penempatan peserta ke kategori berdasarkan tanggal lahir</Label>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <input type="radio" id="ageAtEvent" name="ageCalculation" className="w-4 h-4" defaultChecked />
                  <Label htmlFor="ageAtEvent">Hitung umur saat pertandingan berlangsung</Label>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <input type="radio" id="specificRange" name="ageCalculation" className="w-4 h-4" />
                  <Label htmlFor="specificRange">Berdasarkan range tanggal lahir spesifik</Label>
                </div>
              </div>
            </CardContent>
          </Card>
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
                    onChange={() => setDelegationType("all")}
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
                    onChange={() => setDelegationType("country")}
                    className="w-4 h-4" 
                  />
                  <Label htmlFor="delegationCountry">Khusus negara saja</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="delegationClub" 
                    name="delegationType" 
                    value="club"
                    checked={delegationType === "club"}
                    onChange={() => setDelegationType("club")}
                    className="w-4 h-4" 
                  />
                  <Label htmlFor="delegationClub">Khusus klub saja</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="delegationProvince" 
                    name="delegationType" 
                    value="province"
                    checked={delegationType === "province"}
                    onChange={() => setDelegationType("province")}
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
                    onChange={() => setDelegationType("city")}
                    className="w-4 h-4" 
                  />
                  <Label htmlFor="delegationCity">Khusus kota/kabupaten saja</Label>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="verifyDelegation" className="w-4 h-4" />
                  <Label htmlFor="verifyDelegation">Verifikasi data delegasi dengan database</Label>
                </div>
                <p className="text-xs text-slate-500 mt-1 pl-6">
                  Sistem akan memverifikasi bahwa peserta benar-benar terdaftar dalam klub/wilayah yang dipilih.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sponsor & Partner Event</CardTitle>
              <CardDescription>Kelola daftar sponsor dan partner untuk event ini.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {event.sponsors.map((sponsor, idx) => (
                <div key={`${sponsor.name}-${idx}`} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <strong>{sponsor.name}</strong>
                    <div className="text-sm text-slate-500">Level: {sponsor.level}</div>
                  </div>
                  <Button variant="outline" size="sm" className="text-red-500">Hapus</Button>
                </div>
              ))}
              
              <div className="border-t pt-4 mt-4">
                <div className="text-sm font-medium mb-2">Tambah Sponsor Baru</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="sponsorName">Nama Sponsor</Label>
                    <Input id="sponsorName" placeholder="Nama perusahaan/organisasi" />
                  </div>
                  <div>
                    <Label htmlFor="sponsorLevel">Level</Label>
                    <Select defaultValue="gold">
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
                <Button className="mt-2">Tambah Sponsor</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}