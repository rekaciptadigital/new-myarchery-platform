import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventStatistics as EventStats } from "../../../core/models/event";

type EventStatisticsProps = {
  statistics: EventStats;
};

export function EventStatistics({ statistics }: Readonly<EventStatisticsProps>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 mb-8">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Total Event</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{statistics.totalEvents}</p>
          <div className="text-sm text-blue-700 mt-1">Event yang Anda kelola</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Event Aktif</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-green-600">{statistics.activeEvents}</p>
          <div className="text-sm text-green-700 mt-1">Status Publikasi & Berlangsung</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Total Peserta</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-purple-600">{statistics.totalParticipants}</p>
          <div className="text-sm text-purple-700 mt-1">Dari semua event Anda</div>
        </CardContent>
      </Card>
    </div>
  );
}
