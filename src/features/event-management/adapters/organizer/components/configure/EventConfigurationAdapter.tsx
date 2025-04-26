"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useParams } from "next/navigation";

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

export function EventConfigurationAdapter() {
  const params = useParams<{ eventId: string }>();
  const eventId = params.eventId;
  
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
    <div>
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

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="bg-slate-100 p-1">
          <TabsTrigger value="basic">Informasi Dasar</TabsTrigger>
          <TabsTrigger value="location">Lokasi & Tanggal</TabsTrigger>
          <TabsTrigger value="registration">Pendaftaran</TabsTrigger>
          <TabsTrigger value="pricing">Harga</TabsTrigger>
          <TabsTrigger value="categories">Kategori</TabsTrigger>
          <TabsTrigger value="advanced">Pengaturan Lanjutan</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dasar Event</CardTitle>
              <CardDescription>Berikan informasi dasar tentang event Anda.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Event</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={basicInfo.name} 
                  onChange={handleBasicInfoChange} 
                  placeholder="Nama event Anda"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi Event</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={basicInfo.description} 
                  onChange={handleBasicInfoChange}
                  placeholder="Jelaskan tentang event Anda" 
                  className="min-h-32"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="visibility">Visibilitas Event</Label>
                <Select 
                  value={visibility} 
                  onValueChange={handleVisibilityChange}
                >
                  <SelectTrigger id="visibility" className="w-full">
                    <SelectValue placeholder="Pilih visibilitas event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Publik - Dapat dilihat dan diakses oleh semua orang</SelectItem>
                    <SelectItem value="private">Private - Hanya dapat diakses dengan link khusus</SelectItem>
                    <SelectItem value="draft">Draft - Belum dipublikasikan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lokasi & Tanggal</CardTitle>
              <CardDescription>Atur lokasi dan waktu pelaksanaan event.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Lokasi Event</Label>
                <Input 
                  id="location" 
                  name="location" 
                  value={locationDate.location} 
                  onChange={handleLocationDateChange} 
                  placeholder="Lokasi penyelenggaraan event"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Tanggal Mulai</Label>
                  <Input 
                    id="startDate" 
                    name="startDate" 
                    type="date" 
                    value={locationDate.startDate} 
                    onChange={handleLocationDateChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">Tanggal Selesai</Label>
                  <Input 
                    id="endDate" 
                    name="endDate" 
                    type="date" 
                    value={locationDate.endDate} 
                    onChange={handleLocationDateChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add more TabsContent for other tabs */}
      </Tabs>
    </div>
  );
}