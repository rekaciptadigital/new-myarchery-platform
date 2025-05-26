import { Event } from "@/types/event";

interface EventTableProps {
  readonly events: Event[];
  readonly onEdit: (id: number) => void;
  readonly onDelete: (id: number) => void;
}

// Utility function to get status badge styling
const getStatusBadgeStyle = (status: string): string => {
  switch (status) {
    case "Publikasi":
      return "bg-green-100 text-green-800";
    case "Draft":
      return "bg-yellow-100 text-yellow-800";
    case "Berlangsung":
      return "bg-blue-100 text-blue-800";
    case "Selesai":
      return "bg-gray-100 text-gray-800";
    case "Dibatalkan":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function EventTable({ events, onEdit, onDelete }: EventTableProps) {
  if (events.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="font-semibold text-lg mb-4">Daftar Event</h2>
        <div className="text-center py-8 text-slate-500">
          Belum ada event yang dibuat
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 overflow-x-auto">
      <h2 className="font-semibold text-lg mb-4">Daftar Event</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-slate-100">
            <th className="p-3 text-left font-medium text-slate-700">Nama Event</th>
            <th className="p-3 text-left font-medium text-slate-700">Tanggal</th>
            <th className="p-3 text-left font-medium text-slate-700">Status</th>
            <th className="p-3 text-left font-medium text-slate-700">Peserta</th>
            <th className="p-3 text-left font-medium text-slate-700">Pemasukan</th>
            <th className="p-3 text-left font-medium text-slate-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-b border-slate-200 hover:bg-slate-50">
              <td className="p-3 font-medium">{event.name}</td>
              <td className="p-3 text-slate-600">{event.date}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle(event.status)}`}>
                  {event.status}
                </span>
              </td>
              <td className="p-3 text-slate-600">{event.participants}</td>
              <td className="p-3 text-slate-600">Rp {event.income.toLocaleString()}</td>
              <td className="p-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(event.id)}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                    type="button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(event.id)}
                    className="text-red-600 hover:text-red-800 hover:underline"
                    type="button"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
