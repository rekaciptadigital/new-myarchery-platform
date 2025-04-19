"use client";

import MainLayout from "@/components/layouts/MainLayout";
import { useState } from "react";

// Dummy data event
const initialEvents = [
  {
    id: 1,
    name: "Kejuaraan Nasional Panahan 2025",
    status: "Publikasi",
    participants: 80,
    income: 8000000,
    date: "2025-05-10",
  },
  {
    id: 2,
    name: "Archery Open Junior 2025",
    status: "Draft",
    participants: 20,
    income: 2000000,
    date: "2025-06-01",
  },
  {
    id: 3,
    name: "Liga Panahan Kota 2025",
    status: "Berlangsung",
    participants: 28,
    income: 2500000,
    date: "2025-04-25",
  },
];

const statusList = ["Draft", "Publikasi", "Berlangsung", "Selesai", "Dibatalkan"];

export default function DashboardPage() {
  const [events, setEvents] = useState(initialEvents);
  const [form, setForm] = useState({ name: "", date: "", status: "Draft" });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Statistik
  const stats = statusList.map((status) => ({
    status,
    count: events.filter((e) => e.status === status).length,
  }));
  const totalParticipants = events.reduce((sum, e) => sum + e.participants, 0);
  const totalIncome = events.reduce((sum, e) => sum + e.income, 0);

  // Form handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setEvents(events.map(ev => ev.id === editingId ? { ...ev, ...form } : ev));
      setEditingId(null);
    } else {
      setEvents([
        ...events,
        { ...form, id: Date.now(), participants: 0, income: 0 },
      ]);
    }
    setForm({ name: "", date: "", status: "Draft" });
  };
  const handleEdit = (id: number) => {
    const ev = events.find(e => e.id === id);
    if (ev) {
      setForm({ name: ev.name, date: ev.date, status: ev.status });
      setEditingId(id);
    }
  };
  const handleDelete = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
    if (editingId === id) setEditingId(null);
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Dashboard Pengelolaan Event</h1>
        <p className="text-slate-600">Kelola event, pantau status, statistik, dan persiapan event panahan Anda.</p>
      </div>
      {/* Statistik */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.status} className="bg-white rounded shadow p-4 text-center">
            <div className="font-semibold text-slate-700">{s.status}</div>
            <div className="text-2xl font-bold text-blue-600">{s.count}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded shadow p-6">
          <h2 className="font-semibold text-lg mb-2">Statistik Pendaftaran</h2>
          <p className="text-3xl font-bold text-green-600">{totalParticipants}</p>
          <p className="text-slate-500 text-xs">Total peserta terdaftar</p>
        </div>
        <div className="bg-white rounded shadow p-6">
          <h2 className="font-semibold text-lg mb-2">Keuangan Event</h2>
          <p className="text-3xl font-bold text-blue-600">Rp {totalIncome.toLocaleString()}</p>
          <p className="text-slate-500 text-xs">Total pemasukan</p>
        </div>
      </div>
      {/* Form event */}
      <div className="bg-white rounded shadow p-6 mb-8">
        <h2 className="font-semibold text-lg mb-4">{editingId ? "Edit Event" : "Buat Event Baru"}</h2>
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="event-name" className="block text-sm font-medium mb-1">Nama Event</label>
            <input id="event-name" name="name" value={form.name} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label htmlFor="event-date" className="block text-sm font-medium mb-1">Tanggal</label>
            <input id="event-date" name="date" type="date" value={form.date} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label htmlFor="event-status" className="block text-sm font-medium mb-1">Status</label>
            <select id="event-status" name="status" value={form.status} onChange={handleChange} className="w-full border rounded px-3 py-2">
              {statusList.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition">
            {editingId ? "Simpan Perubahan" : "Tambah Event"}
          </button>
        </form>
      </div>
      {/* Tabel event */}
      <div className="bg-white rounded shadow p-6 mb-8 overflow-x-auto">
        <h2 className="font-semibold text-lg mb-4">Daftar Event</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-2 text-left">Nama Event</th>
              <th className="p-2 text-left">Tanggal</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Peserta</th>
              <th className="p-2 text-left">Pemasukan</th>
              <th className="p-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr key={ev.id} className="border-b">
                <td className="p-2">{ev.name}</td>
                <td className="p-2">{ev.date}</td>
                <td className="p-2">{ev.status}</td>
                <td className="p-2">{ev.participants}</td>
                <td className="p-2">Rp {ev.income.toLocaleString()}</td>
                <td className="p-2 space-x-2">
                  <button onClick={() => handleEdit(ev.id)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(ev.id)} className="text-red-600 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Timeline & Checklist */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="font-semibold text-lg mb-4">Timeline & Checklist Persiapan</h2>
        <ul className="list-disc pl-5 text-slate-700 space-y-1">
          <li>Pembuatan event</li>
          <li>Pengaturan kategori & harga</li>
          <li>Publikasi event</li>
          <li>Pendaftaran peserta</li>
          <li>Technical meeting</li>
          <li>Pelaksanaan lomba</li>
        </ul>
      </div>
    </MainLayout>
  );
}