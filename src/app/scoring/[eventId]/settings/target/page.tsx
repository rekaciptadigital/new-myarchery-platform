"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, ChevronLeft, Plus, Save, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";

// Mock categories for selection
const categories = [
  { id: 1, name: "Recurve Men", gender: "Men", distance: "70m" },
  { id: 2, name: "Recurve Women", gender: "Women", distance: "70m" },
  { id: 3, name: "Compound Men", gender: "Men", distance: "50m" },
  { id: 4, name: "Compound Women", gender: "Women", distance: "50m" },
  { id: 5, name: "Barebow Men", gender: "Men", distance: "50m" },
  { id: 6, name: "Barebow Women", gender: "Women", distance: "50m" }
];

export default function TargetSettingsPage({ params }: { params: { eventId: string } }) {
  // --------- Target Settings State ---------
  const [targetSettings, setTargetSettings] = useState({
    totalTargets: 30,
    maxPerTarget: 3,
    distribution: [
      { id: "dist-1", day: "2025-06-15", categories: [1, 2], startTarget: 1, endTarget: 15 },
      { id: "dist-2", day: "2025-06-16", categories: [3, 4], startTarget: 16, endTarget: 30 }
    ]
  });

  const [newDistribution, setNewDistribution] = useState({
    day: "",
    categories: [] as number[],
    startTarget: 1,
    endTarget: 10
  });

  const handleAddDistribution = () => {
    if (newDistribution.day && newDistribution.categories.length > 0) {
      // Create a unique ID for the new distribution
      const id = `dist-${Date.now()}`;
      setTargetSettings({
        ...targetSettings,
        distribution: [...targetSettings.distribution, { id, ...newDistribution }]
      });
      setNewDistribution({
        day: "",
        categories: [],
        startTarget: 1,
        endTarget: 10
      });
    } else {
      alert("Mohon lengkapi semua data distribusi target");
    }
  };

  const handleRemoveDistribution = (id: string) => {
    setTargetSettings({
      ...targetSettings,
      distribution: targetSettings.distribution.filter(dist => dist.id !== id)
    });
  };

  const handleDistributionCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedValues: number[] = [];
    
    // Replace for loop with for-of loop
    for (const option of Array.from(options)) {
      if (option.selected) {
        selectedValues.push(Number(option.value));
      }
    }
    
    setNewDistribution({
      ...newDistribution,
      categories: selectedValues
    });
  };

  const handleSaveSettings = () => {
    // Here you would typically send the data to your API
    alert("Pengaturan bantalan berhasil disimpan!");
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Link href={`/scoring/${params.eventId}/settings`} className="text-slate-600 hover:text-slate-900">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Pengaturan Bantalan</h1>
        </div>
        <p className="text-slate-600">Atur jumlah dan distribusi bantalan untuk setiap kategori dan hari pertandingan</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            Pengaturan Bantalan
          </CardTitle>
          <CardDescription>
            Atur jumlah dan distribusi bantalan untuk setiap kategori dan hari pertandingan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Total Target Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="totalTargets">Jumlah Total Bantalan Tersedia</Label>
              <Input
                id="totalTargets"
                type="number"
                value={targetSettings.totalTargets}
                onChange={(e) => setTargetSettings({ ...targetSettings, totalTargets: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="maxPerTarget">Maksimal Peserta per Bantalan</Label>
              <Input
                id="maxPerTarget"
                type="number"
                value={targetSettings.maxPerTarget}
                onChange={(e) => setTargetSettings({ ...targetSettings, maxPerTarget: Number(e.target.value) })}
              />
            </div>
          </div>

          {/* Current Target Distributions */}
          <div>
            <h3 className="text-sm font-medium mb-3">Distribusi Bantalan saat ini</h3>
            <div className="border rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hari</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bantalan Awal</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bantalan Akhir</th>
                    <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {targetSettings.distribution.map((dist) => (
                    <tr key={dist.id}>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{dist.day}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                        {dist.categories.map(catId => 
                          categories.find(c => c.id === catId)?.name
                        ).join(", ")}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{dist.startTarget}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{dist.endTarget}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleRemoveDistribution(dist.id)}
                        >
                          <X size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add New Target Distribution */}
          <div className="border-t pt-6">
            <h3 className="text-sm font-medium mb-3">Tambah Distribusi Bantalan Baru</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="distributionDay">Hari/Tanggal</Label>
                <Input
                  id="distributionDay"
                  type="date"
                  value={newDistribution.day}
                  onChange={(e) => setNewDistribution({ ...newDistribution, day: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="distributionCategories">Kategori</Label>
                <select
                  id="distributionCategories"
                  multiple
                  className="w-full h-24 px-3 py-2 text-sm border rounded-md"
                  value={newDistribution.categories.map(String)}
                  onChange={handleDistributionCategoryChange}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Tahan CTRL untuk memilih beberapa kategori</p>
              </div>
              <div>
                <Label htmlFor="startTarget">Bantalan Awal</Label>
                <Input
                  id="startTarget"
                  type="number"
                  min="1"
                  max={targetSettings.totalTargets}
                  value={newDistribution.startTarget}
                  onChange={(e) => setNewDistribution({ ...newDistribution, startTarget: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="endTarget">Bantalan Akhir</Label>
                <Input
                  id="endTarget"
                  type="number"
                  min={newDistribution.startTarget}
                  max={targetSettings.totalTargets}
                  value={newDistribution.endTarget}
                  onChange={(e) => setNewDistribution({ ...newDistribution, endTarget: Number(e.target.value) })}
                />
              </div>
            </div>
            <Button className="mt-4" onClick={handleAddDistribution}>
              <Plus size={16} className="mr-1" /> Tambah Distribusi Bantalan
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-4">
          <div className="flex gap-4">
            <Link href={`/scoring/${params.eventId}/settings`}>
              <Button variant="outline">Kembali</Button>
            </Link>
            <Button onClick={handleSaveSettings} className="bg-green-600 hover:bg-green-700">
              <Save size={16} className="mr-2" /> Simpan Pengaturan Bantalan
            </Button>
          </div>
        </CardFooter>
      </Card>
    </MainLayout>
  );
}