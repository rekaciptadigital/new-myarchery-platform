import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoringStatistics } from "@/types/scoring";

interface ScoringStatsProps {
  readonly stats: ScoringStatistics;
}

export function ScoringStats({ stats }: ScoringStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Event Aktif</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{stats.activeEvents}</p>
          <div className="text-sm text-blue-700 mt-1">Dengan skor sedang diproses</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Archer Aktif</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-green-600">{stats.totalArchers}</p>
          <div className="text-sm text-green-700 mt-1">Sedang berpartisipasi hari ini</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Skor Selesai</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-purple-600">{stats.completedScores}</p>
          <div className="text-sm text-purple-700 mt-1">Total hari ini</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Juri Aktif</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-orange-600">{stats.activeJudges}</p>
          <div className="text-sm text-orange-700 mt-1">Memvalidasi scoring</div>
        </CardContent>
      </Card>
    </div>
  );
}
