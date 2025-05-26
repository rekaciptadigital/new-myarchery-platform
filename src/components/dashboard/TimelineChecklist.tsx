import { TimelineItem } from "@/types/timeline";

const checklistItems: TimelineItem[] = [
  { id: "event-creation", title: "Pembuatan event" },
  { id: "category-pricing", title: "Pengaturan kategori & harga" },
  { id: "event-publication", title: "Publikasi event" },
  { id: "participant-registration", title: "Pendaftaran peserta" },
  { id: "technical-meeting", title: "Technical meeting" },
  { id: "event-execution", title: "Pelaksanaan lomba" },
];

export function TimelineChecklist() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="font-semibold text-lg mb-4">Timeline & Checklist Persiapan</h2>
      <ul className="space-y-3">
        {checklistItems.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0" />
            <span className="text-slate-700">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
