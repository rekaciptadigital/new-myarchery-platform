import { EventFormData } from "../../../core/models/dashboard";

type EventFormProps = {
  form: EventFormData;
  statusList: string[];
  editingId: number | null;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export function EventForm({ form, statusList, editingId, onSubmit, onChange }: EventFormProps) {
  return (
    <div className="bg-white rounded shadow p-6 mb-8">
      <h2 className="font-semibold text-lg mb-4">{editingId ? "Edit Event" : "Buat Event Baru"}</h2>
      <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end" onSubmit={onSubmit}>
        <div>
          <label htmlFor="event-name" className="block text-sm font-medium mb-1">Nama Event</label>
          <input id="event-name" name="name" value={form.name} onChange={onChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label htmlFor="event-date" className="block text-sm font-medium mb-1">Tanggal</label>
          <input id="event-date" name="date" type="date" value={form.date} onChange={onChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label htmlFor="event-status" className="block text-sm font-medium mb-1">Status</label>
          <select id="event-status" name="status" value={form.status} onChange={onChange} className="w-full border rounded px-3 py-2">
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
  );
}
