import { Event } from "../../../core/models/dashboard";

type EventListProps = {
  events: Event[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export function EventList({ events, onEdit, onDelete }: EventListProps) {
  return (
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
                <button onClick={() => onEdit(ev.id)} className="text-blue-600 hover:underline">Edit</button>
                <button onClick={() => onDelete(ev.id)} className="text-red-600 hover:underline">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
