import { Edit, Eye, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TargetAssignment } from "@/types/scoring";

interface TargetTableProps {
  readonly targets: TargetAssignment[];
  readonly onEdit?: (targetId: string) => void;
  readonly onView?: (targetId: string) => void;
  readonly onHistory?: (targetId: string) => void;
}

const getStatusBadgeStyle = (status: TargetAssignment["status"]): string => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "InProgress":
      return "bg-blue-100 text-blue-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
};

export function TargetTable({ targets, onEdit, onView, onHistory }: TargetTableProps) {
  if (targets.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-8 text-center">
        <p className="text-slate-500">Tidak ada data target yang ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Target
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Pemanah
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Klub
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Total Skor
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              End
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Juri
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {targets.map((target, idx) => (
            <tr key={target.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                {target.targetNo}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                {target.archerName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                {target.clubName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {target.totalScore}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                {target.currentEnd}/{target.totalEnds}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle(target.status)}`}>
                  {target.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                {target.judge}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  {onView && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2 py-1"
                      onClick={() => onView(target.id)}
                    >
                      <Eye size={14} />
                    </Button>
                  )}
                  {onEdit && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2 py-1"
                      onClick={() => onEdit(target.id)}
                    >
                      <Edit size={14} />
                    </Button>
                  )}
                  {onHistory && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2 py-1"
                      onClick={() => onHistory(target.id)}
                    >
                      <History size={14} />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
