"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, ChevronLeft, Plus, Save, X } from "lucide-react";
import Link from "next/link";
import { useParams } from 'next/navigation';
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";

// Define bracket size options
const bracketSizes = [
  { value: "64", label: "64 Peserta" },
  { value: "32", label: "32 Peserta" },
  { value: "16", label: "16 Peserta" },
  { value: "8", label: "8 Peserta" },
  { value: "4", label: "4 Peserta" }
];

// Mock categories for selection
const categories = [
  { id: 1, name: "Recurve Men", gender: "Men", distance: "70m" },
  { id: 2, name: "Recurve Women", gender: "Women", distance: "70m" },
  { id: 3, name: "Compound Men", gender: "Men", distance: "50m" },
  { id: 4, name: "Compound Women", gender: "Women", distance: "50m" },
  { id: 5, name: "Barebow Men", gender: "Men", distance: "50m" },
  { id: 6, name: "Barebow Women", gender: "Women", distance: "50m" }
];

export default function BracketSettingsPage() {
  // Use the useParams hook instead of receiving params directly
  const routeParams = useParams();
  const eventId = routeParams.eventId as string;

  // --------- Bracket Settings State ---------
  const [bracketSettings, setBracketSettings] = useState<Array<{
    id: string; // Add unique ID field
    categoryId: number;
    bracketSize: string;
    targetNumbers: string;
    isAutoAssign: boolean;
  }>>([
    {
      id: "bracket-1", // Add unique ID
      categoryId: 1,
      bracketSize: "32",
      targetNumbers: "1-8",
      isAutoAssign: true
    },
    {
      id: "bracket-2", // Add unique ID
      categoryId: 2,
      bracketSize: "32",
      targetNumbers: "9-16",
      isAutoAssign: true
    }
  ]);

  const [newBracket, setNewBracket] = useState({
    categoryId: 0,
    bracketSize: "16",
    targetNumbers: "",
    isAutoAssign: true
  });

  const handleAddBracket = () => {
    if (newBracket.categoryId && newBracket.bracketSize) {
      // Create a unique ID for the new bracket
      const id = `bracket-${Date.now()}`;
      setBracketSettings([...bracketSettings, { id, ...newBracket }]);
      setNewBracket({
        categoryId: 0,
        bracketSize: "16",
        targetNumbers: "",
        isAutoAssign: true
      });
    } else {
      alert("Mohon pilih kategori dan ukuran bracket");
    }
  };

  const handleRemoveBracket = (id: string) => {
    setBracketSettings(bracketSettings.filter(bracket => bracket.id !== id));
  };

  const handleSaveSettings = () => {
    // Here you would typically send the data to your API
    alert("Pengaturan bracket berhasil disimpan!");
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Link href={`/scoring/${eventId}/settings`} className="text-slate-600 hover:text-slate-900">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Pengaturan Bracket</h1>
        </div>
        <p className="text-slate-600">Atur ukuran bracket dan penomoran bantalan untuk setiap kategori pertandingan</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Pengaturan Bracket
          </CardTitle>
          <CardDescription>
            Konfigurasi ukuran bracket dan penomoran bantalan untuk setiap kategori pertandingan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Bracket Settings */}
          <div>
            <h3 className="text-sm font-medium mb-3">Pengaturan Bracket saat ini</h3>
            <div className="border rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ukuran Bracket</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nomor Bantalan</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe Assignment</th>
                    <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bracketSettings.map((bracket) => (
                    <tr key={bracket.id}>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                        {categories.find(c => c.id === bracket.categoryId)?.name || "N/A"}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                        {bracket.bracketSize} Peserta
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                        {bracket.targetNumbers || "Auto"}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                        {bracket.isAutoAssign ? "Otomatis" : "Manual"}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleRemoveBracket(bracket.id)}
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

          {/* Add New Bracket Setting */}
          <div className="border-t pt-6">
            <h3 className="text-sm font-medium mb-3">Tambah Konfigurasi Bracket Baru</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="bracketCategory">Kategori</Label>
                <Select
                  value={newBracket.categoryId.toString()}
                  onValueChange={(value) => setNewBracket({ ...newBracket, categoryId: Number(value) })}
                >
                  <SelectTrigger id="bracketCategory">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bracketSize">Ukuran Bracket</Label>
                <Select
                  value={newBracket.bracketSize}
                  onValueChange={(value) => setNewBracket({ ...newBracket, bracketSize: value })}
                >
                  <SelectTrigger id="bracketSize">
                    <SelectValue placeholder="Pilih ukuran bracket" />
                  </SelectTrigger>
                  <SelectContent>
                    {bracketSizes.map(size => (
                      <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="autoAssign"
                    checked={newBracket.isAutoAssign}
                    onChange={(e) => setNewBracket({ ...newBracket, isAutoAssign: e.target.checked })}
                    className="w-4 h-4 mr-2"
                  />
                  <Label htmlFor="autoAssign">Otomatis Assign Nomor Bantalan</Label>
                </div>
                {!newBracket.isAutoAssign && (
                  <div>
                    <Label htmlFor="targetNumbers">Nomor Bantalan (Manual)</Label>
                    <Input
                      id="targetNumbers"
                      placeholder="Contoh: 1-8, 9-16"
                      value={newBracket.targetNumbers}
                      onChange={(e) => setNewBracket({ ...newBracket, targetNumbers: e.target.value })}
                    />
                  </div>
                )}
              </div>
            </div>
            <Button className="mt-4" onClick={handleAddBracket}>
              <Plus size={16} className="mr-1" /> Tambah Konfigurasi Bracket
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-4">
          <div className="flex gap-4">
            <Link href={`/scoring/${eventId}/settings`}>
              <Button variant="outline">Kembali</Button>
            </Link>
            <Button onClick={handleSaveSettings} className="bg-green-600 hover:bg-green-700">
              <Save size={16} className="mr-2" /> Simpan Pengaturan Bracket
            </Button>
          </div>
        </CardFooter>
      </Card>
    </MainLayout>
  );
}