import React from "react";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { TournamentFormData } from "../../core/models/tournament";

interface TournamentDateFieldProps {
  readonly field: keyof TournamentFormData;
  readonly label: string;
  readonly dateValue: string | undefined;
  readonly error: string | undefined;
  readonly onFieldChange: (field: keyof TournamentFormData, value: string) => void;
}

// Function to format date for display (can be moved to a utils file if used elsewhere)
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "";
  try {
    return format(new Date(dateString), "PPP", { locale: id });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

export function TournamentDateField({
  field,
  label,
  dateValue,
  error,
  onFieldChange,
}: TournamentDateFieldProps) {
  const selectedDate = dateValue ? new Date(dateValue) : undefined;

  return (
    <div className="space-y-2">
      <Label>{label} <span className="text-red-500">*</span></Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-full justify-start text-left font-normal ${
              error ? "border-red-500" : ""
            }`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateValue ? (
              formatDate(dateValue)
            ) : (
              <span className="text-muted-foreground">Pilih tanggal</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => onFieldChange(field, date?.toISOString() ?? "")}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
