"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Target, Info, Settings } from "lucide-react";
import Link from "next/link";
import { useScoringSettings } from "../../hook";

const iconMap: Record<string, React.ReactElement> = {
  Calendar: <Calendar className="h-5 w-5 text-green-600" />,
  Target: <Target className="h-5 w-5 text-purple-600" />,
  Info: <Info className="h-5 w-5 text-amber-600" />
};

export interface OrganizerScoringSettingsAdapterProps {
  eventId: string;
}

export function OrganizerScoringSettingsAdapter({ eventId }: Readonly<OrganizerScoringSettingsAdapterProps>) {
  const { settingsConfig } = useScoringSettings(eventId);
  
  return (
    <>
      {/* Struktur header dengan tombol kembali di kanan atas */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">{settingsConfig.title}</h1>
          <p className="text-slate-600">{settingsConfig.description}</p>
        </div>
        <div className="flex gap-4">
          <Link href={settingsConfig.backLink}>
            <Button variant="outline">Kembali</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsConfig.options.map((option) => (
          <Card key={option.id} className={`h-full flex flex-col bg-white shadow-sm border border-slate-200 ${option.color}`}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                {iconMap[option.icon] || <Settings className="h-5 w-5" />}
                {option.title}
              </CardTitle>
              <CardDescription>
                {option.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-slate-600">
                {option.description}
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Link 
                href={`/organizer/scoring/${eventId}/settings/${option.path}${settingsConfig.backLink.includes('setup') ? '?source=setup' : ''}`} 
                className="w-full"
              >
                <Button variant="outline" className="w-full" size="sm">
                  <Settings size={14} className="mr-2" />
                  Pengaturan
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
