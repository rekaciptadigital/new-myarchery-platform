"use client";

import { EventFormData } from "../../../core/models/dashboard";

interface EventFormProps {
  form: EventFormData;
  statusList: string[];
  editingId: number | null;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function EventForm({
  form,
  statusList,
  editingId,
  onSubmit,
  onChange,
}: Readonly<EventFormProps>) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-slate-200">
      <h2 className="text-lg font-medium mb-4">
        {editingId ? "Edit Event" : "Tambah Event Baru"}
      </h2>
      
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
              Nama Event
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan nama event"
              required
            />
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">
              Tanggal Event
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={onChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={onChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusList.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            {editingId ? "Update Event" : "Tambah Event"}
          </button>
        </div>
      </form>
    </div>
  );
}
