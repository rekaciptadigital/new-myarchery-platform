"use client";

import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { ChevronLeft, Calendar, Target, Plus, X, Save } from "lucide-react";
import Link from "next/link";

// Define activity type options for schedule
const activityTypes = [
  { value: "equipment", label: "Equipment Inspection" },
  { value: "practice", label: "Official Practice" },
  { value: "qualification", label: "Qualification Round" },
  { value: "qualification1", label: "Qualification Round Session 1" },
  { value: "qualification2", label: "Qualification Round Session 2" },
  { value: "elimination8", label: "1/8 Elimination Round" },
  { value: "elimination4", label: "1/4 Elimination Round" },
  { value: "semifinal", label: "Semi Final" },
  { value: "bronze", label: "Final Bronze Medal" },
  { value: "final", label: "Final Gold Medal" },
  { value: "awarding", label: "Awarding Ceremony" },
  { value: "other", label: "Other Activity" }
];

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

// Mock Gender options
const genderOptions = [
  { value: "Men", label: "Men" },
  { value: "Women", label: "Women" },
  { value: "Mixed", label: "Mixed" }
];

export default function CompetitionSettingsPage({ params }: { params: { eventId: string } }) {
  // Schedule Settings State
  const [schedules, setSchedules] = useState<Array<{
    id: string; // Add unique ID
    date: string;
    time: string;
    categories: number[];
    gender: string;
    distance: string;
    activityType: string;
  }>>([
    {
      id: "schedule-1", // Add unique ID
      date: "2025-06-15",
      time: "08:00",
      categories: [1, 2],
      gender: "Mixed",
      distance: "70m",
      activityType: "equipment"
    },
    {
      id: "schedule-2", // Add unique ID
      date: "2025-06-15",
      time: "13:00",
      categories: [1, 2],
      gender: "Mixed",
      distance: "70m",
      activityType: "practice"
    },
    {
      id: "schedule-3", // Add unique ID
      date: "2025-06-16",
      time: "08:00",
      categories: [1, 2],
      gender: "Mixed",
      distance: "70m",
      activityType: "qualification"
    }
  ]);

  const [newSchedule, setNewSchedule] = useState({
    date: "",
    time: "",
    categories: [] as number[],
    gender: "Mixed",
    distance: "",
    activityType: ""
  });

  // Bracket Settings State
  const [bracketSettings, setBracketSettings] = useState<Array<{
    id: string; // Add unique ID
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

  // Target Settings State
  const [targetSettings, setTargetSettings] = useState({
    totalTargets: 30,
    maxPerTarget: 3,
    distribution: [
      { id: "dist-1", day: "2025-06-15", categories: [1, 2], startTarget: 1, endTarget: 15 }, // Add unique ID
      { id: "dist-2", day: "2025-06-16", categories: [3, 4], startTarget: 16, endTarget: 30 } // Add unique ID
    ]
  });

  const [newDistribution, setNewDistribution] = useState({
    day: "",
    categories: [] as number[],
    startTarget: 1,
    endTarget: 10
  });

  // Form handlers
  const handleAddSchedule = () => {
    if (newSchedule.date && newSchedule.time && newSchedule.categories.length > 0 && newSchedule.activityType) {
      // Create a unique ID for the new schedule
      const id = `schedule-${Date.now()}`;
      setSchedules([...schedules, { id, ...newSchedule }]);
      setNewSchedule({
        date: "",
        time: "",
        categories: [],
        gender: "Mixed",
        distance: "",
        activityType: ""
      });
    } else {
      alert("Mohon lengkapi semua data jadwal");
    }
  };

  const handleRemoveSchedule = (id: string) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedValues: number[] = [];
    
    for (const option of Array.from(options)) {
      if (option.selected) {
        selectedValues.push(Number(option.value));
      }
    }
    
    setNewSchedule({
      ...newSchedule,
      categories: selectedValues
    });
  };

  const handleDistributionCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedValues: number[] = [];
    
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

  // Save all settings
  const handleSaveSettings = () => {
    // Here you would typically send the data to your API
    alert("Pengaturan kompetisi berhasil disimpan!");
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Link href={`/events/${params.eventId}/configure`} className="text-slate-600 hover:text-slate-900">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Pengaturan Pertandingan</h1>
        </div>
        <p className="text-slate-600">Konfigurasi jadwal, bracket, dan bantalan untuk event dengan ID: {params.eventId}</p>
      </div>

      <div className="space-y-8 mb-10">
        {/* Schedule Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Pengaturan Jadwal
            </CardTitle>
            <CardDescription>
              Atur jadwal spesifik untuk berbagai aktivitas dalam pertandingan.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Schedules */}
            <div>
              <h3 className="text-sm font-medium mb-3">Jadwal yang Sudah Diatur</h3>
              <div className="border rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jarak</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktivitas</th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {schedules.map((schedule) => (
                      <tr key={schedule.id}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{schedule.date}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{schedule.time}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {schedule.categories.map(catId => 
                            categories.find(c => c.id === catId)?.name
                          ).join(", ")}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{schedule.gender}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{schedule.distance}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {activityTypes.find(a => a.value === schedule.activityType)?.label}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleRemoveSchedule(schedule.id)}
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

            {/* Add New Schedule */}
            <div className="border-t pt-6">
              <h3 className="text-sm font-medium mb-3">Tambah Jadwal Baru</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="scheduleDate">Tanggal</Label>
                  <Input
                    id="scheduleDate"
                    type="date"
                    value={newSchedule.date}
                    onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="scheduleTime">Waktu</Label>
                  <Input
                    id="scheduleTime"
                    type="time"
                    value={newSchedule.time}
                    onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="scheduleCategories">Kategori</Label>
                  <select
                    id="scheduleCategories"
                    multiple
                    className="w-full h-24 px-3 py-2 text-sm border rounded-md"
                    value={newSchedule.categories.map(String)}
                    onChange={handleCategoryChange}
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
                  <Label htmlFor="scheduleGender">Gender</Label>
                  <Select
                    value={newSchedule.gender}
                    onValueChange={(value) => setNewSchedule({ ...newSchedule, gender: value })}
                  >
                    <SelectTrigger id="scheduleGender">
                      <SelectValue placeholder="Pilih gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genderOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="scheduleDistance">Jarak Tembak</Label>
                  <Input
                    id="scheduleDistance"
                    placeholder="Contoh: 70m, 50m, 30m"
                    value={newSchedule.distance}
                    onChange={(e) => setNewSchedule({ ...newSchedule, distance: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="scheduleActivity">Jenis Aktivitas</Label>
                  <Select
                    value={newSchedule.activityType}
                    onValueChange={(value) => setNewSchedule({ ...newSchedule, activityType: value })}
                  >
                    <SelectTrigger id="scheduleActivity">
                      <SelectValue placeholder="Pilih aktivitas" />
                    </SelectTrigger>
                    <SelectContent>
                      {activityTypes.map(activity => (
                        <SelectItem key={activity.value} value={activity.value}>{activity.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="mt-4" onClick={handleAddSchedule}>
                <Plus size={16} className="mr-1" /> Tambah Jadwal
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bracket Settings Card */}
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
        </Card>

        {/* Target (Bantalan) Settings Card */}
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
        </Card>
      </div>

      <div className="flex justify-end gap-4 mb-10 sticky bottom-4 bg-white p-4 shadow rounded-md">
        <Button variant="outline">Batal</Button>
        <Button onClick={handleSaveSettings} className="bg-green-600 hover:bg-green-700">
          <Save size={16} className="mr-2" /> Simpan Pengaturan
        </Button>
      </div>
    </MainLayout>
  );
}