"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ScoringSettingsService } from "./service";

export function useScoringSettings(eventId: string) {
  const searchParams = useSearchParams();
  const sourceUrl = searchParams.get('source');
  const service = useMemo(() => new ScoringSettingsService(), []);
  
  const settingsConfig = useMemo(() => {
    return service.getSettingsConfig(eventId, sourceUrl ?? undefined);
  }, [service, eventId, sourceUrl]);
  
  return {
    settingsConfig
  };
}
