"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// Use consistent icon import style
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
  // Access params directly without using React.use()
  const params = useParams();
  const eventId = params.eventId as string;

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
      {/* Struktur header dengan tombol di kanan atas */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {/* Adjusted Back Link Style */}
            <Link href={`/scoring/${eventId}/settings`} className="text-slate-600 hover:text-slate-900 hover:bg-gray-100 p-1 rounded">
              <ChevronLeft size={20} />
            </Link>
            {/* Added Icon to Title */}
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Target className="h-6 w-6 text-blue-600" /> {/* Use primary blue */}
              Pengaturan Bracket
            </h1>
          </div>
          <p className="text-slate-600">Atur ukuran bracket dan penomoran bantalan untuk setiap kategori</p>
        </div>
        <div className="flex gap-4">
          <Link href={`/scoring/${eventId}/settings`}>
            {/* Outline button style aligns with guide */}
            <Button variant="outline">Kembali</Button>
          </Link>
          {/* Success/Action button style aligns with guide */}
          <Button onClick={handleSaveSettings} className="bg-green-600 hover:bg-green-700">
            <Save size={16} className="mr-2" /> Simpan
          </Button>
        </div>
      </div>

      {/* Card styling aligns with guide (bg-white, border, radius) */}
      <Card>
        <CardHeader>
          {/* CardTitle styling (default likely aligns with text-lg font-semibold) */}
          <CardTitle className="flex items-center gap-2 text-lg font-semibold"> {/* Explicitly set style if needed */}
            <Target className="h-5 w-5 text-blue-600" /> {/* Use primary blue */}
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
            {/* Table container styling aligns with guide */}
            <div className="border rounded-md overflow-hidden"> {/* Added overflow-hidden for better border radius */}
              <table className="min-w-full divide-y divide-gray-200">
                {/* Updated thead background */}
                <thead className="bg-gray-100">
                  <tr>
                    {/* Adjusted th padding */}
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ukuran Bracket</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nomor Bantalan</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe Assignment</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                {/* Updated tbody background and divider */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {bracketSettings.map((bracket) => (
                    <tr key={bracket.id}>
                      {/* Adjusted td padding */}
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
                        {/* Ghost button style aligns with guide */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-800" // Red for delete action
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
            {/* Grid layout aligns with guide */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                {/* Label styling (default Shadcn) */}
                <Label htmlFor="bracketCategory">Kategori</Label>
                {/* Select styling (default Shadcn aligns with guide: height, border, radius) */}
                <Select
                  value={newBracket.categoryId.toString()}
                  onValueChange={(value) => setNewBracket({ ...newBracket, categoryId: Number(value) })}
                >
                  <SelectTrigger id="bracketCategory" className="h-10 text-sm"> {/* Ensure height/text size if needed */}
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
                  <SelectTrigger id="bracketSize" className="h-10 text-sm"> {/* Ensure height/text size if needed */}
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
                <div className="flex items-center mb-2 pt-2"> {/* Added pt-2 for alignment with label */}
                  {/* Checkbox styling (default) */}
                  <input
                    type="checkbox"
                    id="autoAssign"
                    checked={newBracket.isAutoAssign}
                    onChange={(e) => setNewBracket({ ...newBracket, isAutoAssign: e.target.checked, targetNumbers: e.target.checked ? "" : newBracket.targetNumbers })} // Clear manual input if auto is checked
                    className="w-4 h-4 mr-2 accent-blue-600" // Added accent color
                  />
                  <Label htmlFor="autoAssign" className="cursor-pointer">Otomatis Assign Nomor Bantalan</Label> {/* Added cursor-pointer */}
                </div>
                {!newBracket.isAutoAssign && (
                  <div className="mt-2"> {/* Added margin-top for spacing */}
                    <Label htmlFor="targetNumbers">Nomor Bantalan (Manual)</Label>
                    {/* Input styling (default Shadcn aligns with guide: height, border, radius) */}
                    <Input
                      id="targetNumbers"
                      placeholder="Contoh: 1-8, 9-16"
                      value={newBracket.targetNumbers}
                      onChange={(e) => setNewBracket({ ...newBracket, targetNumbers: e.target.value })}
                      className="h-10 text-sm" // Ensure height/text size if needed
                    />
                  </div>
                )}
              </div>
            </div>
            {/* Updated Add button style to green */}
            <Button className="mt-4 bg-green-600 hover:bg-green-700" onClick={handleAddBracket}>
              <Plus size={16} className="mr-1" /> Tambah Konfigurasi Bracket
            </Button>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}