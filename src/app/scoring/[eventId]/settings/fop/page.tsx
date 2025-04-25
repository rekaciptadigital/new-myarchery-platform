"use client";

import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Info, Save } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react"; // Remove use import

// Data dummy untuk layout options
const fopLayouts = [
  { value: "standard", label: "Standard (1 baris)" },
  { value: "double", label: "Double Row (2 baris)" },
  { value: "triple", label: "Triple Row (3 baris)" },
  { value: "quad", label: "Quad Row (4 baris)" },
  { value: "custom", label: "Custom" },
];

export default function FOPSettingsPage() {
  // Access params directly without using React.use()
  const params = useParams();
  const eventId = params.eventId as string;

  // --------- FOP Settings State ---------
  const [fopSettings, setFopSettings] = useState({
    layout: "standard",
    distanceBetweenTargets: 2,
    distanceBetweenRows: 5,
    customLayout: ""
  });

  const handleSaveSettings = () => {
    // Here you would typically send the data to your API
    alert("Pengaturan FOP berhasil disimpan!");
  };

  // Helper function to generate stable keys for target circles
  const getTargetKey = (layout: string, row: number, position: number) => {
    return `${layout}-row${row}-pos${position}`;
  };

  return (
    <MainLayout>
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-2 mb-1">
          <Link href={`/scoring/${eventId}/settings`} className="text-slate-600 hover:text-slate-900">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Pengaturan Field of Play</h1>
        </div>
        <div className="flex gap-4">
          <Link href={`/scoring/${eventId}/settings`}>
            <Button variant="outline">Kembali</Button>
          </Link>
          <Button onClick={handleSaveSettings} className="bg-green-600 hover:bg-green-700">
            <Save size={16} className="mr-2" /> Simpan
          </Button>
        </div>
      </div>
      <p className="text-slate-600 mb-6">Konfigurasi layout lapangan untuk pertandingan</p>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-amber-600" />
            Pengaturan Field of Play (FOP)
          </CardTitle>
          <CardDescription>
            Konfigurasi layout lapangan untuk pertandingan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fopLayout">Layout FOP</Label>
                <Select
                  value={fopSettings.layout}
                  onValueChange={(value) => setFopSettings({ ...fopSettings, layout: value })}
                >
                  <SelectTrigger id="fopLayout">
                    <SelectValue placeholder="Pilih layout FOP" />
                  </SelectTrigger>
                  <SelectContent>
                    {fopLayouts.map(layout => (
                      <SelectItem key={layout.value} value={layout.value}>{layout.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="distanceBetweenTargets">Jarak Antar Bantalan (meter)</Label>
                <Input
                  id="distanceBetweenTargets"
                  type="number"
                  min="1"
                  step="0.5"
                  value={fopSettings.distanceBetweenTargets}
                  onChange={(e) => setFopSettings({ ...fopSettings, distanceBetweenTargets: Number(e.target.value) })}
                />
              </div>
              
              <div>
                <Label htmlFor="distanceBetweenRows">Jarak Antar Baris (meter)</Label>
                <Input
                  id="distanceBetweenRows"
                  type="number"
                  min="1"
                  step="0.5"
                  value={fopSettings.distanceBetweenRows}
                  onChange={(e) => setFopSettings({ ...fopSettings, distanceBetweenRows: Number(e.target.value) })}
                />
              </div>
              
              {fopSettings.layout === "custom" && (
                <div>
                  <Label htmlFor="customLayout">Deskripsi Layout Custom</Label>
                  <Textarea
                    id="customLayout"
                    placeholder="Jelaskan secara detail layout custom yang akan digunakan..."
                    value={fopSettings.customLayout}
                    onChange={(e) => setFopSettings({ ...fopSettings, customLayout: e.target.value })}
                    rows={4}
                  />
                </div>
              )}
            </div>
            
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="text-sm font-medium mb-3">Preview FOP Layout</h3>
              <div className="aspect-[4/3] bg-white border rounded-md flex items-center justify-center">
                {fopSettings.layout === "standard" && (
                  <div className="text-center">
                    <div className="mb-10 grid grid-cols-12 gap-2">
                      {Array.from({ length: 12 }).map((_, idx) => (
                        <div
                          key={getTargetKey("standard", 1, idx + 1)}
                          className="h-10 w-10 rounded-full bg-yellow-100 border-2 border-yellow-400 flex items-center justify-center text-xs font-medium"
                        >
                          {idx + 1}
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 border-t border-dashed border-gray-400 pt-2 text-xs text-gray-500">
                      Shooting line
                    </div>
                  </div>
                )}
                
                {fopSettings.layout === "double" && (
                  <div className="text-center">
                    <div className="mb-6 grid grid-cols-8 gap-2">
                      {Array.from({ length: 8 }).map((_, idx) => (
                        <div
                          key={getTargetKey("double", 1, idx + 1)}
                          className="h-10 w-10 rounded-full bg-yellow-100 border-2 border-yellow-400 flex items-center justify-center text-xs font-medium"
                        >
                          {idx + 1}
                        </div>
                      ))}
                    </div>
                    <div className="mb-10 grid grid-cols-8 gap-2">
                      {Array.from({ length: 8 }).map((_, idx) => (
                        <div
                          key={getTargetKey("double", 2, idx + 9)}
                          className="h-10 w-10 rounded-full bg-yellow-100 border-2 border-yellow-400 flex items-center justify-center text-xs font-medium"
                        >
                          {idx + 9}
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 border-t border-dashed border-gray-400 pt-2 text-xs text-gray-500">
                      Shooting line
                    </div>
                  </div>
                )}
                
                {fopSettings.layout === "custom" && (
                  <div className="text-center p-4 text-gray-500">
                    <p>Custom layout preview tidak tersedia</p>
                    <p className="text-xs mt-2">Lihat deskripsi custom layout untuk detail</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}