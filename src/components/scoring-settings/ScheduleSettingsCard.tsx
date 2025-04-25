import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Plus, X } from "lucide-react";
import { useState } from "react";
import Select, { MultiValue, SingleValue, StylesConfig, CSSObjectWithLabel } from "react-select";

// Define activity type options for schedule
const activityTypes = [
  { value: "equipment", label: "Equipment Inspection" },
  { value: "practice", label: "Official Practice" },
  { value: "break", label: "Break/Istirahat" }, // Added break/rest period option
  { value: "qualification", label: "Qualification Round" },
  { value: "qualification1", label: "Qualification Round Session 1" },
  { value: "qualification2", label: "Qualification Round Session 2" },
  { value: "elimination8", label: "1/8 Elimination Round" },
  { value: "elimination4", label: "1/4 Elimination Round" },
  { value: "semifinal", label: "Semi Final" },
  { value: "bronze", label: "Final Bronze Medal" },
  { value: "gold", label: "Final Gold Medal" },
  { value: "awarding", label: "Awarding Ceremony" },
  { value: "other", label: "Other Activity" }
];

// Mock categories for selection - Now including distance in the name
const categories = [
  { id: 1, name: "Recurve Men 70m", gender: "Men", distance: "70m" },
  { id: 2, name: "Recurve Women 70m", gender: "Women", distance: "70m" },
  { id: 3, name: "Compound Men 50m", gender: "Men", distance: "50m" },
  { id: 4, name: "Compound Women 50m", gender: "Women", distance: "50m" },
  { id: 5, name: "Barebow Men 50m", gender: "Men", distance: "50m" },
  { id: 6, name: "Barebow Women 50m", gender: "Women", distance: "50m" }
];

// Format categories for react-select
const categoryOptions = categories.map(cat => ({
  value: cat.id,
  label: cat.name,
  distance: cat.distance
}));

// Define types for react-select options
type CategoryOption = { value: number; label: string; distance: string };
type ActivityOption = { value: string; label: string };
type DurationOption = { value: number; label: string };

// Define duration options (in minutes)
const durationOptions = [
  { value: 30, label: "30 menit" },
  { value: 60, label: "1 jam" },
  { value: 90, label: "1 jam 30 menit" },
  { value: 120, label: "2 jam" },
  { value: 150, label: "2 jam 30 menit" },
  { value: 180, label: "3 jam" },
  { value: 240, label: "4 jam" },
  { value: 300, label: "5 jam" },
  { value: 360, label: "6 jam" },
  { value: 480, label: "8 jam" }
];

// Custom styles for category select (multi)
const categorySelectStyles: StylesConfig<CategoryOption, true> = {
  control: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    minHeight: '32px',
    height: '32px',
    fontSize: '0.875rem',
    borderRadius: '0.375rem',
    borderColor: '#d1d5db',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#9ca3af'
    }
  }),
  valueContainer: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    padding: '0 8px',
    height: '32px'
  }),
  input: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    margin: '0',
    padding: '0'
  }),
  indicatorsContainer: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    height: '32px'
  }),
  dropdownIndicator: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    padding: '4px'
  }),
  clearIndicator: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    padding: '4px'
  }),
  multiValue: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    backgroundColor: '#e5e7eb'
  }),
  option: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    fontSize: '0.875rem',
    padding: '8px 12px'
  })
};

// Custom styles for activity select (single)
const activitySelectStyles: StylesConfig<ActivityOption, false> = {
  control: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    minHeight: '32px',
    height: '32px',
    fontSize: '0.875rem',
    borderRadius: '0.375rem',
    borderColor: '#d1d5db',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#9ca3af'
    }
  }),
  valueContainer: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    padding: '0 8px',
    height: '32px'
  }),
  input: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    margin: '0',
    padding: '0'
  }),
  indicatorsContainer: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    height: '32px'
  }),
  dropdownIndicator: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    padding: '4px'
  }),
  clearIndicator: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    padding: '4px'
  }),
  option: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    fontSize: '0.875rem',
    padding: '8px 12px'
  })
};

// Custom styles for duration select (single)
const durationSelectStyles: StylesConfig<DurationOption, false> = {
  control: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    minHeight: '32px',
    height: '32px',
    fontSize: '0.875rem',
    borderRadius: '0.375rem',
    borderColor: '#d1d5db',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#9ca3af'
    }
  }),
  valueContainer: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    padding: '0 8px',
    height: '32px'
  }),
  input: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    margin: '0',
    padding: '0'
  }),
  indicatorsContainer: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    height: '32px'
  }),
  dropdownIndicator: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    padding: '4px'
  }),
  clearIndicator: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    padding: '4px'
  }),
  option: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    fontSize: '0.875rem',
    padding: '8px 12px'
  })
};

interface ScheduleSettingsCardProps {
  eventId: string;
  availableDates: Array<{
    date: string; 
    label: string;
  }>;
}

export default function ScheduleSettingsCard({ availableDates }: Readonly<ScheduleSettingsCardProps>) {
  // --------- Schedule Settings State ---------
  const [schedules, setSchedules] = useState<Array<{
    id: string;
    date: string;
    time: string;
    duration: number;
    endTime: string;
    categories: number[];
    activityType: string;
  }>>([
    {
      id: "schedule-1",
      date: "2025-06-15",
      time: "08:00",
      duration: 60,
      endTime: "09:00",
      categories: [1, 2],
      activityType: "equipment"
    },
    {
      id: "schedule-2",
      date: "2025-06-15",
      time: "13:00",
      duration: 120,
      endTime: "15:00",
      categories: [1, 2],
      activityType: "practice"
    },
    {
      id: "schedule-3",
      date: "2025-06-16",
      time: "08:00",
      duration: 240,
      endTime: "12:00",
      categories: [1, 2],
      activityType: "qualification"
    }
  ]);

  // Function to calculate end time based on start time and duration
  const calculateEndTime = (startTime: string, durationMinutes: number): string => {
    if (!startTime || !durationMinutes) return "";
    
    const [hours, minutes] = startTime.split(':').map(Number);
    
    // Create a date object with the start time
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    
    // Add the duration in minutes
    date.setMinutes(date.getMinutes() + durationMinutes);
    
    // Format the end time as HH:MM
    const endHours = date.getHours().toString().padStart(2, '0');
    const endMinutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${endHours}:${endMinutes}`;
  };

  // Function to find the suggested start time for a new schedule
  const getSuggestedStartTime = (date: string): string => {
    const dateSchedules = schedules.filter(s => s.date === date);
    
    if (dateSchedules.length === 0) return "08:00"; // Default start time if no schedules exist
    
    // Find the latest end time among all schedules for this date
    let latestEndTime = "";
    
    dateSchedules.forEach(schedule => {
      if (schedule.endTime > latestEndTime) {
        latestEndTime = schedule.endTime;
      }
    });
    
    return latestEndTime;
  };

  // Function to add a new empty schedule for a specific date and stage
  const handleAddEmptySchedule = (date: string, isElimination: boolean) => {
    const id = `schedule-${Date.now()}`;
    const suggestedStartTime = getSuggestedStartTime(date);
    const initialDuration = 60; // Default 1 hour
    const calculatedEndTime = calculateEndTime(suggestedStartTime, initialDuration);
    
    // Default activity type based on stage
    const defaultActivityType = isElimination ? "elimination8" : "qualification";
    
    setSchedules([
      ...schedules,
      {
        id,
        date,
        time: suggestedStartTime,
        duration: initialDuration,
        endTime: calculatedEndTime,
        categories: [],
        activityType: defaultActivityType
      }
    ]);
  };

  // Function to remove a schedule
  const handleRemoveSchedule = (id: string) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  // Function to update a schedule field with automatic cascade adjustment
  const updateScheduleField = (id: string, field: string, value: unknown) => {
    setSchedules(prevSchedules => {
      // Step 1: Create a copy of schedules and update the target schedule
      const updatedSchedules = [...prevSchedules];
      const scheduleIndex = updatedSchedules.findIndex(s => s.id === id);
      
      if (scheduleIndex === -1) return prevSchedules;
      
      // Update the field in the target schedule
      updatedSchedules[scheduleIndex] = {
        ...updatedSchedules[scheduleIndex],
        [field]: value
      };
      
      // Step 2: Update the end time if time or duration changed
      if (field === 'time' || field === 'duration') {
        updatedSchedules[scheduleIndex].endTime = calculateEndTime(
          updatedSchedules[scheduleIndex].time,
          updatedSchedules[scheduleIndex].duration
        );
        
        // Get the date of the schedule
        const scheduleDate = updatedSchedules[scheduleIndex].date;
        
        // Repeatedly adjust schedules until no more overlaps exist
        let madeAdjustment;
        do {
          madeAdjustment = false;
          
          // Sort schedules by start time for this date
          const sortedIndices = updatedSchedules
            .map((s, i) => ({ schedule: s, index: i }))
            .filter(item => item.schedule.date === scheduleDate)
            .sort((a, b) => a.schedule.time.localeCompare(b.schedule.time))
            .map(item => item.index);
          
          // Check each adjacent pair of schedules and adjust if needed
          for (let i = 0; i < sortedIndices.length - 1; i++) {
            const currentIndex = sortedIndices[i];
            const nextIndex = sortedIndices[i + 1];
            
            const current = updatedSchedules[currentIndex];
            const next = updatedSchedules[nextIndex];
            
            // If the next schedule starts before the current one ends, adjust it
            if (next.time < current.endTime) {
              updatedSchedules[nextIndex] = {
                ...next,
                time: current.endTime,
                endTime: calculateEndTime(current.endTime, next.duration)
              };
              madeAdjustment = true;
            }
          }
        } while (madeAdjustment); // Repeat until no more adjustments are needed
      }
      
      return updatedSchedules;
    });
  };

  // Function to handle category selection change with react-select
  const handleCategoryChange = (
    selectedOptions: MultiValue<CategoryOption>,
    scheduleId: string
  ) => {
    const categoryIds = selectedOptions.map(option => option.value);
    updateScheduleField(scheduleId, 'categories', categoryIds);
    // Note: Removed the auto-update distance functionality since distance is now in category names
  };

  // Function to get categories that are already selected for a specific date (excluding the current schedule)
  const getAlreadySelectedCategories = (date: string, currentScheduleId: string): number[] => {
    return schedules
      .filter(schedule => schedule.date === date && schedule.id !== currentScheduleId)
      .flatMap(schedule => schedule.categories);
  };

  // Function to get available categories for a specific schedule
  const getAvailableCategoriesForSchedule = (date: string, scheduleId: string): typeof categoryOptions => {
    // For break/rest periods, don't filter categories
    const schedule = schedules.find(s => s.id === scheduleId);
    if (schedule?.activityType === "break") {
      return categoryOptions;
    }
    
    // Get already selected categories for this date (excluding current schedule)
    const alreadySelectedCategories = getAlreadySelectedCategories(date, scheduleId);
    
    // Filter out categories that are already selected in other schedules
    return categoryOptions.filter(
      option => !alreadySelectedCategories.includes(option.value)
    );
  };

  // Function to handle activity type change with react-select
  const handleActivityTypeChange = (
    selectedOption: SingleValue<ActivityOption>,
    scheduleId: string
  ) => {
    if (selectedOption) {
      // Clear categories if changing to break/rest activity type
      if (selectedOption.value === "break") {
        updateScheduleField(scheduleId, 'categories', []);
      }
      updateScheduleField(scheduleId, 'activityType', selectedOption.value);
    }
  };

  // Function to handle duration change with react-select
  const handleDurationChange = (
    selectedOption: SingleValue<DurationOption>,
    scheduleId: string
  ) => {
    if (selectedOption) {
      updateScheduleField(scheduleId, 'duration', selectedOption.value);
    }
  };

  // Function to categorize activities as qualification or elimination
  const isEliminationActivity = (activityType: string): boolean => {
    return ["elimination8", "elimination4", "semifinal", "bronze", "gold"].includes(activityType);
  };

  // Function to filter schedules by date and stage
  const getSchedulesByDateAndStage = (date: string, isElimination: boolean): typeof schedules => {
    return schedules.filter(schedule => 
      schedule.date === date && 
      isEliminationActivity(schedule.activityType) === isElimination
    );
  };

  // Function to render schedule table for a specific stage
  const renderScheduleTable = (dateInfo: { date: string; label: string }, isElimination: boolean) => {
    const stageSchedules = getSchedulesByDateAndStage(dateInfo.date, isElimination);
    const stageTitle = isElimination ? "Eliminasi" : "Kualifikasi";
    const stageTitleIcon = isElimination ? "🏆" : "🎯";
    
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-md font-medium flex items-center gap-2">
            <span>{stageTitleIcon}</span>
            {stageTitle}
          </h4>
          <Button 
            variant="outline" 
            size="xs" 
            onClick={() => handleAddEmptySchedule(dateInfo.date, isElimination)}
            className="text-green-600 border-green-600 hover:bg-green-50 text-xs py-1 h-7"
          >
            <Plus size={14} className="mr-1" /> Tambah Jadwal {stageTitle}
          </Button>
        </div>
        
        {stageSchedules.length > 0 ? (
          <div className="border rounded-md bg-gray-50">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu Mulai</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durasi</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu Selesai</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktivitas</th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 divide-y divide-gray-200">
                {stageSchedules.map((schedule) => (
                  <tr key={schedule.id}>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">
                      <Input
                        type="time"
                        className="h-8 text-sm border-gray-300"
                        value={schedule.time}
                        onChange={(e) => updateScheduleField(schedule.id, 'time', e.target.value)}
                      />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">
                      <Select<DurationOption, false>
                        name={`duration-${schedule.id}`}
                        options={durationOptions}
                        className="basic-select"
                        classNamePrefix="select"
                        value={durationOptions.find(option => 
                          option.value === schedule.duration
                        )}
                        onChange={(selected) => 
                          handleDurationChange(selected, schedule.id)
                        }
                        placeholder="Pilih durasi..."
                        styles={durationSelectStyles}
                        menuPortalTarget={document.body}
                      />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">
                      <div className="h-8 text-sm flex items-center bg-gray-100 rounded px-3">
                        {schedule.endTime}
                      </div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">
                      <Select<CategoryOption, true>
                        isMulti
                        name={`categories-${schedule.id}`}
                        options={getAvailableCategoriesForSchedule(dateInfo.date, schedule.id)}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={categoryOptions.filter(option => 
                          schedule.categories.includes(option.value)
                        )}
                        onChange={(selected) => 
                          handleCategoryChange(selected, schedule.id)
                        }
                        placeholder={schedule.activityType === "break" ? "Tidak perlu pilih kategori" : "Pilih kategori..."}
                        styles={categorySelectStyles}
                        menuPortalTarget={document.body}
                        isDisabled={schedule.activityType === "break"}
                      />
                      {schedule.activityType === "break" && (
                        <p className="text-xs text-gray-500 mt-1">Kategori tidak diperlukan untuk istirahat</p>
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">
                      <Select<ActivityOption, false>
                        name={`activity-${schedule.id}`}
                        options={
                          isElimination 
                            ? activityTypes.filter(a => isEliminationActivity(a.value) || a.value === "break")
                            : activityTypes.filter(a => !isEliminationActivity(a.value))
                        }
                        className="basic-select"
                        classNamePrefix="select"
                        value={activityTypes.find(option => 
                          option.value === schedule.activityType
                        )}
                        onChange={(selected) => 
                          handleActivityTypeChange(selected, schedule.id)
                        }
                        placeholder="Pilih aktivitas..."
                        styles={activitySelectStyles}
                        menuPortalTarget={document.body}
                      />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleRemoveSchedule(schedule.id)}
                      >
                        <X size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mb-4 bg-gray-50 p-3 rounded-md">Belum ada jadwal {stageTitle.toLowerCase()} untuk tanggal ini.</p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">

      {/* Date cards - each date is now its own card */}
      {availableDates.map((dateInfo) => (
        <Card key={dateInfo.date} className="bg-white border-gray-200">
          <CardHeader className="bg-white">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {dateInfo.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Qualification section */}
            {renderScheduleTable(dateInfo, false)}
            
            {/* Divider between qualification and elimination */}
            <div className="border-t my-4"></div>
            
            {/* Elimination section */}
            {renderScheduleTable(dateInfo, true)}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}