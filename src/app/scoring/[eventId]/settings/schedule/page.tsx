"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, ChevronLeft, Plus, Save, X } from "lucide-react";
import Link from "next/link";
import { useParams } from 'next/navigation';
import { useState } from "react"; // Remove use import
import MainLayout from "@/components/layouts/MainLayout";

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
  { value: "gold", label: "Final Gold Medal" },
  { value: "awarding", label: "Awarding Ceremony" },
  { value: "other", label: "Other Activity" }
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

export default function ScheduleSettingsPage() {
  // Access params directly without using React.use()
  const params = useParams();
  const eventId = params.eventId as string;

  // --------- Schedule Settings State ---------
  const [schedules, setSchedules] = useState<Array<{
    id: string; // Add unique ID for each schedule
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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedValues: number[] = [];
    
    // Replace for loop with for-of loop
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

  const handleSaveSettings = () => {
    // Here you would typically send the data to your API
    alert("Pengaturan jadwal berhasil disimpan!");
  };

  return (
    <MainLayout>
      {/* Struktur header dengan tombol di kanan atas */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href={`/scoring/${eventId}/settings`} className="text-slate-600 hover:text-slate-900">
              <ChevronLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold">Pengaturan Jadwal</h1>
          </div>
          <p className="text-slate-600">Atur jadwal pertandingan untuk setiap kategori</p>
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
    </MainLayout>
  );
}