import { StatusStat } from "../../../core/models/dashboard";

type EventStatsProps = {
  stats: StatusStat[];
  totalParticipants: number;
  totalIncome: number;
};

export function EventStats({ stats, totalParticipants, totalIncome }: EventStatsProps) {
  return (
    <>
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
    </>
  );
}
