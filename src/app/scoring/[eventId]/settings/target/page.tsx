"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, ChevronLeft, Save, Calendar, Maximize2, Minimize2, Share2, GripVertical, Columns } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import MainLayout from "@/components/layouts/MainLayout";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";

// Mock categories for selection
const categories = [
  { id: 1, name: "Recurve Men", gender: "Men", distance: "70m" },
  { id: 2, name: "Recurve Women", gender: "Women", distance: "70m" },
  { id: 3, name: "Compound Men", gender: "Men", distance: "50m" },
  { id: 4, name: "Compound Women", gender: "Women", distance: "50m" },
  { id: 5, name: "Barebow Men", gender: "Men", distance: "50m" },
  { id: 6, name: "Barebow Women", gender: "Women", distance: "50m" }
];

// Extended type definitions to support shared targets
type SharedTarget = {
  targetNumber: number;
  categories: number[]; // Array of categoryIds sharing this target
  participantCounts: Record<number, number>; // categoryId -> participant count
};

// Add these type definitions before they're used
type DaySettingField = 'totalTargets' | 'date' | 'startTargetNumber' | 'startTime' | 'endTime' | 'sessionName';
type DaySettingValue = number | string;

export default function TargetSettingsPage() {
  const params = useParams();
  const eventId = params.eventId as string;
  
  // Change default sort direction to 'asc' instead of null
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>('asc');
  
  // Add state to track expanded cards
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    "day-1-morning": true,
    "day-1-afternoon": true,
    "day-2": true,
    "day-3": true,
  });
  
  // Add state for shared targets
  const [sharedTargets, setSharedTargets] = useState<Record<string, SharedTarget[]>>({
    "day-1-morning": [],
    "day-1-afternoon": [],
    "day-2": [],
    "day-3": [],
  });
  
  // Fix: Add the missing setter function for enableSharedTargets
  const [enableSharedTargets, setEnableSharedTargets] = useState<Record<string, boolean>>({
    "day-1-morning": true,
    "day-1-afternoon": true,
    "day-2": true,
    "day-3": true,
  });
  
  // Add state for controlling empty targets between categories
  const [enableEmptyTargets, setEnableEmptyTargets] = useState<Record<string, boolean>>({
    "day-1-morning": true,
    "day-1-afternoon": true,
    "day-2": true,
    "day-3": true,
  });
  
  // Updated state model with startTime and endTime fields for each day
  const [daySettings, setDaySettings] = useState([
    { 
      id: "day-1-morning", 
      date: "2025-06-15",
      startTime: "08:00",
      endTime: "09:00",
      sessionName: "Kloter Pagi",
      totalTargets: 15,
      startTargetNumber: 1,
      categoryTargets: [
        { categoryId: 1, startTarget: 1, endTarget: 5, totalParticipants: 15, targetFace: 3 },
        { categoryId: 2, startTarget: 6, endTarget: 10, totalParticipants: 12, targetFace: 3 },
        { categoryId: 3, startTarget: 0, endTarget: 0, totalParticipants: 8, targetFace: 3 },
        { categoryId: 4, startTarget: 0, endTarget: 0, totalParticipants: 9, targetFace: 3 },
        { categoryId: 5, startTarget: 0, endTarget: 0, totalParticipants: 6, targetFace: 3 },
        { categoryId: 6, startTarget: 0, endTarget: 0, totalParticipants: 5, targetFace: 3 },
      ]
    },
    { 
      id: "day-1-afternoon", 
      date: "2025-06-15",
      startTime: "13:30", 
      endTime: "14:30",
      sessionName: "Kloter Siang",
      totalTargets: 15,
      startTargetNumber: 1,
      categoryTargets: [
        { categoryId: 1, startTarget: 0, endTarget: 0, totalParticipants: 0, targetFace: 3 },
        { categoryId: 2, startTarget: 0, endTarget: 0, totalParticipants: 0, targetFace: 3 },
        { categoryId: 3, startTarget: 1, endTarget: 5, totalParticipants: 12, targetFace: 3 },
        { categoryId: 4, startTarget: 6, endTarget: 10, totalParticipants: 10, targetFace: 3 },
        { categoryId: 5, startTarget: 0, endTarget: 0, totalParticipants: 6, targetFace: 3 },
        { categoryId: 6, startTarget: 0, endTarget: 0, totalParticipants: 5, targetFace: 3 },
      ]
    },
    { 
      id: "day-2", 
      date: "2025-06-16",
      startTime: "09:00",
      endTime: "10:30",
      sessionName: "Kualifikasi",
      totalTargets: 15,
      startTargetNumber: 1,
      categoryTargets: [
        { categoryId: 1, startTarget: 0, endTarget: 0, totalParticipants: 15, targetFace: 3 },
        { categoryId: 2, startTarget: 0, endTarget: 0, totalParticipants: 12, targetFace: 3 },
        { categoryId: 3, startTarget: 1, endTarget: 7, totalParticipants: 21, targetFace: 3 },
        { categoryId: 4, startTarget: 8, endTarget: 15, totalParticipants: 18, targetFace: 3 },
        { categoryId: 5, startTarget: 0, endTarget: 0, totalParticipants: 7, targetFace: 3 },
        { categoryId: 6, startTarget: 0, endTarget: 0, totalParticipants: 5, targetFace: 3 },
      ]
    },
    // Add new day specifically for shared target demonstration
    { 
      id: "day-3", 
      date: "2025-06-17",
      startTime: "08:30",
      endTime: "10:00",
      sessionName: "Kualifikasi",
      totalTargets: 10,
      startTargetNumber: 1,
      categoryTargets: [
        // Only two categories with uneven distribution for clear demonstration
        { categoryId: 1, startTarget: 0, endTarget: 0, totalParticipants: 18, targetFace: 4 },
        { categoryId: 2, startTarget: 0, endTarget: 0, totalParticipants: 22, targetFace: 4 },
        { categoryId: 3, startTarget: 0, endTarget: 0, totalParticipants: 0, targetFace: 4 },
        { categoryId: 4, startTarget: 0, endTarget: 0, totalParticipants: 0, targetFace: 4 },
        { categoryId: 5, startTarget: 0, endTarget: 0, totalParticipants: 0, targetFace: 4 },
        { categoryId: 6, startTarget: 0, endTarget: 0, totalParticipants: 0, targetFace: 4 },
      ]
    },
  ]);
  
  const [isLoading, setIsLoading] = useState(true);

  // Add state to track validation errors
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: { [field: string]: string }
  }>({});
  
  // Helper functions for validation errors
  const setValidationError = (dayId: string, field: string, message: string) => {
    setValidationErrors(prev => ({
      ...prev,
      [dayId]: {
        ...(prev[dayId] || {}),
        [field]: message
      }
    }));
  };
  
  const clearValidationError = (dayId: string, field: string) => {
    setValidationErrors(prev => {
      if (!prev[dayId]) return prev;
      
      const newDayErrors = { ...prev[dayId] };
      delete newDayErrors[field];
      
      return {
        ...prev,
        [dayId]: Object.keys(newDayErrors).length > 0 ? newDayErrors : {}
      };
    });
  };
  
  // Fetch event dates and categories (simulated)
  useEffect(() => {
    // In a real application, this would be an API call to get event schedule data
    const fetchEventData = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data - would come from your API based on event schedule
        // Data already initialized in state, so we don't need to set it here
        
      } catch (error) {
        console.error("Failed to fetch event data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  // Function to calculate minimum number of targets needed for a day - updated to account for shared targets
  const calculateMinimumTargetsNeeded = (dayId: string) => {
    const day = daySettings.find(d => d.id === dayId);
    if (!day) return { basic: 0, withSharing: 0 };
    
    let totalTargetsNeeded = 0;
    
    // For each category with participants, calculate minimum targets needed
    day.categoryTargets.forEach(cat => {
      if (cat.totalParticipants > 0) {
        const categoryTargetsNeeded = Math.ceil(cat.totalParticipants / cat.targetFace);
        totalTargetsNeeded += categoryTargetsNeeded;
      }
    });
    
    // If shared targets are enabled, calculate potential savings
    if (enableSharedTargets[dayId]) {
      const potentialPairs = findPotentialSharedTargets(dayId);
      
      // Calculate realistic maximum savings (some pairs might not be compatible with each other)
      // For simplicity, use a greedy approach based on potential pairs
      let possibleSavings = 0;
      const usedCategories = new Set<number>();
      
      for (const pair of potentialPairs) {
        // Skip if we've already used either category in another pairing
        if (usedCategories.has(pair.categoryA.categoryId) || usedCategories.has(pair.categoryB.categoryId)) {
          continue;
        }
        
        // Add this saving and mark categories as used
        possibleSavings += pair.potentialSavings;
        usedCategories.add(pair.categoryA.categoryId);
        usedCategories.add(pair.categoryB.categoryId);
      }
      
      // Calculate minimum with shared targets
      const minWithSharing = Math.max(totalTargetsNeeded - possibleSavings, 1);
      return { basic: totalTargetsNeeded, withSharing: minWithSharing };
    }
    
    return { basic: totalTargetsNeeded, withSharing: totalTargetsNeeded };
  };
  
  // Validate total targets - updated to use sharing-aware minimum
  const validateTotalTargets = (dayId: string, value: number) => {
    // Enforce maximum of 64
    const capped = Math.min(value, 64);
    
    // Check minimum targets needed
    const { basic, withSharing } = calculateMinimumTargetsNeeded(dayId);
    const minimumTargetsNeeded = enableSharedTargets[dayId] ? withSharing : basic;
    
    if (capped < minimumTargetsNeeded) {
      const sharingMessage = enableSharedTargets[dayId] && basic > withSharing ? 
        ` (dengan optimasi bantalan gabungan, tanpa optimasi: ${basic})` : '';
      
      setValidationError(
        dayId, 
        'totalTargets', 
        `Minimum jumlah bantalan yang dibutuhkan adalah ${minimumTargetsNeeded}${sharingMessage}`
      );
    } else {
      clearValidationError(dayId, 'totalTargets');
    }
    
    return capped;
  };
  
  // Validate start target number
  const validateStartTargetNumber = (dayId: string, value: number) => {
    const day = daySettings.find(d => d.id === dayId);
    if (!day) return value;
    
    const { basic, withSharing } = calculateMinimumTargetsNeeded(dayId);
    // Use the appropriate minimum based on whether shared targets are enabled
    const minimumTargetsNeeded = enableSharedTargets[dayId] ? withSharing : basic;
    const availableSpace = day.totalTargets - (value - 1);
    
    if (availableSpace < minimumTargetsNeeded) {
      const sharingMessage = enableSharedTargets[dayId] && basic > withSharing ? 
        ` (dengan optimasi: ${withSharing}, tanpa optimasi: ${basic})` : '';
      
      setValidationError(
        dayId,
        'startTargetNumber',
        `Posisi awal terlalu tinggi. Dengan jumlah ${minimumTargetsNeeded}${sharingMessage} bantalan minimum, mulai dari ${value} tidak cukup ruang.`
      );
    } else {
      clearValidationError(dayId, 'startTargetNumber');
    }
    
    return value;
  };
  
  // Main update function - now with lower complexity
  const handleUpdateDay = (id: string, field: DaySettingField, value: DaySettingValue) => {
    let processedValue = value;
    
    // Apply appropriate validation based on field
    if (field === 'totalTargets' && typeof value === 'number') {
      processedValue = validateTotalTargets(id, value);
    } else if (field === 'startTargetNumber' && typeof value === 'number') {
      processedValue = validateStartTargetNumber(id, value);
    }
    
    // Update the state with validated value
    setDaySettings(daySettings.map(day => 
      day.id === id ? { ...day, [field]: processedValue } : day
    ));
  };

  const handleUpdateCategoryTarget = (dayId: string, categoryId: number, field: string, value: number) => {
    setDaySettings(daySettings.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          categoryTargets: day.categoryTargets.map(cat => {
            if (cat.categoryId === categoryId) {
              return { ...cat, [field]: value };
            }
            return cat;
          })
        };
      }
      return day;
    }));
  };

  const isCategoryActive = (dayId: string, categoryId: number) => {
    const day = daySettings.find(d => d.id === dayId);
    if (!day) return false;
    
    const categoryTarget = day.categoryTargets.find(ct => ct.categoryId === categoryId);
    return categoryTarget && (categoryTarget.startTarget > 0 || categoryTarget.endTarget > 0);
  };

  // Function to get color for category (for visual representation)
  const getCategoryColor = (categoryId: number) => {
    const colorMap: Record<number, string> = {
      1: "bg-blue-500",    // Recurve Men
      2: "bg-pink-500",    // Recurve Women
      3: "bg-green-500",   // Compound Men
      4: "bg-purple-500",  // Compound Women
      5: "bg-amber-500",   // Barebow Men
      6: "bg-cyan-500",    // Barebow Women
    };
    
    return colorMap[categoryId] || "bg-gray-300";
  };

  const handleSaveSettings = () => {
    alert("Pengaturan bantalan berhasil disimpan!");
  };

  // Update formatDateTime to display "Kualifikasi" instead of session name
  const formatDateTime = (dateString: string, startTime: string, endTime: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    const dateFormatted = new Date(dateString).toLocaleDateString('id-ID', options);
    
    return `${dateFormatted} - ${startTime} - ${endTime} (Kualifikasi)`;
  };

  // Updated function to find potential shared targets with more flexible combinations
  // and ensuring they are adjacent categories in the sort order with same distance
  const findPotentialSharedTargets = (dayId: string) => {
    const day = daySettings.find(d => d.id === dayId);
    if (!day) return [];
    
    // Get the categories with participants in the current sort order
    // This will be used to check if categories are adjacent
    const categoriesWithParticipants = day.categoryTargets
      .filter(cat => cat.totalParticipants > 0)
      .sort((a, b) => {
        // Use same sorting logic as in handleAutoGenerateTargets
        if (sortMode === 'manual') {
          const indexA = manualSortOrder.indexOf(a.categoryId);
          const indexB = manualSortOrder.indexOf(b.categoryId);
          
          if (indexA >= 0 && indexB >= 0) {
            return indexA - indexB;
          }
          
          if (indexA >= 0) return -1;
          if (indexB >= 0) return 1;
          
          return a.categoryId - b.categoryId;
        }
        
        const catA = categories.find(c => c.id === a.categoryId);
        const catB = categories.find(c => c.id === b.categoryId);
        
        if (!catA || !catB) return 0;
        
        if (sortDirection === 'asc' || sortDirection === 'desc') {
          const distanceA = parseInt(catA.distance.replace(/[^\d]/g, ''));
          const distanceB = parseInt(catB.distance.replace(/[^\d]/g, ''));
          
          if (sortDirection === 'asc') {
            return distanceA - distanceB;
          } else {
            return distanceB - distanceA;
          }
        }
        
        if (catA.gender !== catB.gender) {
          return catA.gender === "Men" ? -1 : 1;
        }
        return a.categoryId - b.categoryId;
      });
    
    // Build an index map for the sorted categories to check for adjacency
    const categoryPositionMap = new Map<number, number>();
    categoriesWithParticipants.forEach((cat, index) => {
      categoryPositionMap.set(cat.categoryId, index);
    });
    
    // Group categories by distance and category type
    const byCategoryAndDistance: Record<string, typeof day.categoryTargets> = {};
    day.categoryTargets.forEach(cat => {
      if (cat.totalParticipants <= 0) return;
      
      const category = categories.find(c => c.id === cat.categoryId);
      if (category) {
        // Group by both distance and category type (e.g., "Recurve-70m", "Compound-50m")
        // Extract category type from name (e.g., "Recurve" from "Recurve Men")
        const categoryType = category.name.split(' ')[0]; // Get first word of category name
        const key = `${categoryType}-${category.distance}`;
        
        if (!byCategoryAndDistance[key]) byCategoryAndDistance[key] = [];
        byCategoryAndDistance[key].push(cat);
      }
    });
    
    const potentialPairs: Array<{
      categoryA: typeof day.categoryTargets[0];
      categoryB: typeof day.categoryTargets[0];
      participantsA: number;
      participantsB: number;
      potentialSavings: number;
    }> = [];
    
    // For each group of same category type and distance, find categories that could share targets
    Object.values(byCategoryAndDistance).forEach(group => {
      if (group.length < 2) return;
      
      // Check all possible combinations between categories within the same group
      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
          const catA = group[i];
          const catB = group[j];
          
          // Check if both categories have participants
          if (catA.totalParticipants === 0 || catB.totalParticipants === 0) continue;
          
          // Check if categories are adjacent in the sorted list
          const posA = categoryPositionMap.get(catA.categoryId);
          const posB = categoryPositionMap.get(catB.categoryId);
          
          if (posA === undefined || posB === undefined) continue;
          
          // Only allow sharing between adjacent categories
          // Adjacent means they follow each other directly in the sort order (abs diff is 1)
          if (Math.abs(posA - posB) !== 1) continue;
          
          // Get the maximum target face (number of participants per target)
          const maxTargetFace = Math.max(catA.targetFace, catB.targetFace);
                    
          // Calculate remaining participants that don't fill a target
          const catARemainder = catA.totalParticipants % catA.targetFace;
          const catBRemainder = catB.totalParticipants % catB.targetFace;
          
          // If either category has no remainder, we can't optimize with shared targets
          if (catARemainder === 0 && catBRemainder === 0) continue;
          
          // Check all possible combinations of remaining participants
          // For example, with target face 4, we could have 1+3, 2+2, or 3+1
          for (let sharedA = 1; sharedA < maxTargetFace; sharedA++) {
            // Only consider valid combinations based on actual remainders
            if (sharedA > catARemainder) continue;
            
            for (let sharedB = 1; sharedB < maxTargetFace; sharedB++) {
              // Only consider valid combinations based on actual remainders
              if (sharedB > catBRemainder) continue;
              
              // Check if this combination fits on a single target
              if (sharedA + sharedB <= maxTargetFace) {
                // Calculate how many targets we're saving
                // Without sharing, these participants would require 2 separate targets
                // With sharing, they fit on 1 target, saving 1 target
                const savedTarget = 1;
                
                potentialPairs.push({
                  categoryA: catA,
                  categoryB: catB,
                  participantsA: sharedA,
                  participantsB: sharedB,
                  potentialSavings: savedTarget
                });
              }
            }
          }
        }
      }
    });
    
    // Sort by most efficient combinations (this could be more sophisticated)
    return potentialPairs.sort((a, b) => {
      // First prioritize by total participants utilized
      const aTotal = a.participantsA + a.participantsB;
      const bTotal = b.participantsA + b.participantsB;
      
      if (aTotal !== bTotal) {
        return bTotal - aTotal; // More participants is better
      }
      
      // Then by potential savings
      return b.potentialSavings - a.potentialSavings;
    });
  };
  
  // Update the Insight text to explain the adjacent category requirement
  const updateInsightText = (dayId: string) => {
    const potentialPairs = findPotentialSharedTargets(dayId);
    if (potentialPairs.length === 0) return "";
    
    const example = potentialPairs[0];
    const catA = categories.find(c => c.id === example.categoryA.categoryId);
    const catB = categories.find(c => c.id === example.categoryB.categoryId);
    
    return `Hari ini memiliki potensi untuk menghemat hingga ${example.potentialSavings} bantalan dengan menggabungkan ${catA?.name} dan ${catB?.name} pada bantalan yang sama.`;
  };

  // Update auto-generate function to respect the empty targets setting
  const handleAutoGenerateTargets = (dayId: string) => {
    const day = daySettings.find(d => d.id === dayId);
    if (!day) return;
    
    // Filter categories with participants only 
    const categoriesWithParticipants = day.categoryTargets
      .filter(cat => cat.totalParticipants > 0)
      .sort((a, b) => {
        // If manual sort is active, respect the manual sort order
        if (sortMode === 'manual') {
          // Get the positions of the categories in the manual sort order
          const indexA = manualSortOrder.indexOf(a.categoryId);
          const indexB = manualSortOrder.indexOf(b.categoryId);
          
          // If both categories are in the manual sort order, sort by their positions
          if (indexA >= 0 && indexB >= 0) {
            return indexA - indexB;
          }
          
          // If only one category is in the manual sort order, prioritize it
          if (indexA >= 0) return -1;
          if (indexB >= 0) return 1;
          
          // If neither is in the manual sort order, use default sorting
          return a.categoryId - b.categoryId;
        }
        
        // Otherwise, use automatic sorting as before (distance-based + gender)
        const catA = categories.find(c => c.id === a.categoryId);
        const catB = categories.find(c => c.id === b.categoryId);
        
        if (!catA || !catB) return 0;
        
        // Apply sort direction if set
        if (sortDirection === 'asc' || sortDirection === 'desc') {
          const distanceA = parseInt(catA.distance.replace(/[^\d]/g, ''));
          const distanceB = parseInt(catB.distance.replace(/[^\d]/g, ''));
          
          if (sortDirection === 'asc') {
            return distanceA - distanceB;
          } else {
            return distanceB - distanceA;
          }
        }
        
        // Default sorting by gender then category ID
        if (catA.gender !== catB.gender) {
          return catA.gender === "Men" ? -1 : 1;
        }
        return a.categoryId - b.categoryId;
      });
    
    // Respect user-specified target count and start number
    const startNumber = day.startTargetNumber || 1;
    const totalAvailableTargets = day.totalTargets + startNumber - 1;
    
    // Check if shared targets should be implemented - use day-specific setting
    const potentialSharedTargets = enableSharedTargets[dayId] ? findPotentialSharedTargets(dayId) : [];
    
    // Create a working copy of the category targets for initial non-shared allocation
    const workingTargets = categoriesWithParticipants.map(cat => ({
      ...cat,
      pendingParticipants: cat.totalParticipants,
      assignedTargets: [] as number[],
      // Track targets that can potentially be shared
      fullTargetsNeeded: Math.floor(cat.totalParticipants / cat.targetFace),
      partialTargetNeeded: cat.totalParticipants % cat.targetFace > 0 ? 1 : 0,
      partialTargetCount: cat.totalParticipants % cat.targetFace
    }));
    
    // First pass: Allocate full targets (without fractional parts) to establish category positions
    let currentTarget = startNumber;
    const categoryPositions: Record<number, {start: number, end: number}> = {};
    
    // Count gender transitions for spacing
    let genderTransitions = 0;
    let prevGender: string | null | undefined = null;
    
    workingTargets.forEach((cat, index) => {
      if (index > 0) {
        const category = categories.find(c => c.id === cat.categoryId);
        const currentGender = category?.gender;
        if (currentGender !== prevGender) {
          genderTransitions++;
        }
        prevGender = currentGender;
      } else if (index === 0) {
        const category = categories.find(c => c.id === cat.categoryId);
        prevGender = category?.gender;
      }
    });
    
    // Calculate extra space for spacing
    const extraSpace = totalAvailableTargets - (startNumber - 1) - 
                      workingTargets.reduce((sum, cat) => 
                        sum + cat.fullTargetsNeeded + cat.partialTargetNeeded, 0);
    
    // Determine spacing strategy
    const spaceForAllCategories = extraSpace >= (workingTargets.length - 1);
    const spaceForGenderTransitions = extraSpace >= genderTransitions;
    
    // First allocation pass: Only allocate the full targets to establish category positions
    prevGender = null;
    let prevAssignedGender: string | null | undefined = null;
    
    workingTargets.forEach((cat, index) => {
      const category = categories.find(c => c.id === cat.categoryId);
      const currentGender = category?.gender;
      
      // Add spacing between categories if we have room AND empty targets are enabled
      if (index > 0) {
        const shouldAddSpace = 
          (enableEmptyTargets[dayId] && spaceForAllCategories) || 
          (enableEmptyTargets[dayId] && spaceForGenderTransitions && currentGender !== prevAssignedGender);
        
        if (shouldAddSpace && currentTarget <= totalAvailableTargets) {
          currentTarget += 1; // Add one empty target
        }
      }
      
      // Allocate full targets only at this stage
      const fullTargetsStart = currentTarget;
      const fullTargetsEnd = fullTargetsStart + cat.fullTargetsNeeded - 1;
      
      // Store positions for later shared target allocation
      categoryPositions[cat.categoryId] = {
        start: fullTargetsStart,
        end: cat.partialTargetNeeded > 0 ? fullTargetsEnd + 1 : fullTargetsEnd // Reserve space for partial
      };
      
      // Move target pointer
      currentTarget = fullTargetsEnd + 1;
      if (cat.partialTargetNeeded > 0) {
        currentTarget += 1; // Reserve space for potential shared target
      }
      
      prevAssignedGender = currentGender;
    });
    
    // Second pass: Try to place shared targets between categories
    const newSharedTargets: SharedTarget[] = [];
    
    // Process potential shared targets
    if (potentialSharedTargets.length > 0) {
      // Sort potential pairs by most efficient combinations first
      // This is already done by findPotentialSharedTargets
      
      // Loop through potential pairs and try to create shared targets
      for (const pair of potentialSharedTargets) {
        const catA = pair.categoryA;
        const catB = pair.categoryB;
        
        const catAPos = categoryPositions[catA.categoryId];
        const catBPos = categoryPositions[catB.categoryId];
        
        if (!catAPos || !catBPos) continue;
        
        // Find the end of the first category and the start of the second
        const firstCat = catAPos.start < catBPos.start ? catA : catB;
        const secondCat = firstCat.categoryId === catA.categoryId ? catB : catA;
        const firstPos = firstCat.categoryId === catA.categoryId ? catAPos : catBPos;
        const secondPos = firstCat.categoryId === catA.categoryId ? catBPos : catAPos;
        
        // Calculate a position for the shared target that's between the two categories
        // We want it at the end of the first category
        const sharedTargetPosition = firstPos.end;
        
        // Get the number of participants to include from each category
        // Maintain the correct order based on which category is first
        const firstCatParticipants = firstCat.categoryId === catA.categoryId ? pair.participantsA : pair.participantsB;
        const secondCatParticipants = secondCat.categoryId === catA.categoryId ? pair.participantsA : pair.participantsB;
        
        // Only create a shared target if we have enough remaining participants in both categories
        // We need to keep track of how many participants are already assigned to shared targets
        // For simplicity, let's assume we haven't assigned any yet
        
        // Create a shared target at the calculated position
        newSharedTargets.push({
          targetNumber: sharedTargetPosition,
          categories: [firstCat.categoryId, secondCat.categoryId],
          participantCounts: {
            [firstCat.categoryId]: firstCatParticipants,
            [secondCat.categoryId]: secondCatParticipants
          }
        });
        
        // Update positions to account for the shared target
        // The logic remains similar, but we might need to adjust based on the dynamic participant counts
        if (secondPos.start === secondPos.end && secondPos.start > sharedTargetPosition) {
          // If the second category originally had only a partial target, we can remove it
          secondPos.start += 1;
          secondPos.end += 1;
        }
      }
    }
    
    // Final allocation based on the established positions and shared targets
    const updatedCategoryTargets = [...day.categoryTargets];
    
    // Update all categories with their final positions
    categoriesWithParticipants.forEach(cat => {
      const position = categoryPositions[cat.categoryId];
      
      if (position) {
        // Find if this category participates in any shared targets
        const sharedTarget = newSharedTargets.find(st => 
          st.categories.includes(cat.categoryId)
        );
        
        // Find the category in the updatedCategoryTargets
        const catIndex = updatedCategoryTargets.findIndex(c => c.categoryId === cat.categoryId);
        
        if (catIndex >= 0) {
          // If the category has a shared target, adjust its range
          if (sharedTarget) {
            const isFirstCategory = sharedTarget.categories[0] === cat.categoryId;
            
            updatedCategoryTargets[catIndex] = {
              ...updatedCategoryTargets[catIndex],
              startTarget: position.start,
              endTarget: isFirstCategory ? position.end : position.end - 1
            };
          } else {
            // Standard update for categories without shared targets
            updatedCategoryTargets[catIndex] = {
              ...updatedCategoryTargets[catIndex],
              startTarget: position.start,
              endTarget: position.end
            };
          }
        }
      }
    });
    
    // Reset targets for categories without participants
    updatedCategoryTargets.forEach((cat, index) => {
      if (cat.totalParticipants === 0) {
        updatedCategoryTargets[index] = {
          ...cat,
          startTarget: 0,
          endTarget: 0
        };
      }
    });
    
    // Update the shared targets state
    setSharedTargets(prev => ({
      ...prev,
      [dayId]: newSharedTargets
    }));
    
    // Update the day settings with new target assignments WITHOUT changing totalTargets
    setDaySettings(daySettings.map(d => {
      if (d.id === dayId) {
        return {
          ...d,
          // Don't change the user's specified target count or start number
          categoryTargets: updatedCategoryTargets
        };
      }
      return d;
    }));
  };

  // Update function to check if target is shared
  
  // Get shared target info
  const getSharedTargetInfo = (dayId: string, targetNumber: number) => {
    return sharedTargets[dayId]?.find(st => st.targetNumber === targetNumber);
  };
  
  // Update function to get category for target (modified to handle shared targets)
  const getCategoryForTarget = (dayId: string, targetNumber: number) => {
    // First check if it's a shared target
    const sharedTarget = getSharedTargetInfo(dayId, targetNumber);
    if (sharedTarget) {
      // Return the first category (main display)
      return {
        categoryId: sharedTarget.categories[0],
        isShared: true,
        sharedWith: sharedTarget.categories.slice(1)
      };
    }
    
    // Otherwise check regular targets
    const day = daySettings.find(d => d.id === dayId);
    if (!day) return null;
    
    const category = day.categoryTargets.find(cat => 
      targetNumber >= cat.startTarget && 
      targetNumber <= cat.endTarget
    );
    
    return category ? { categoryId: category.categoryId, isShared: false, sharedWith: [] } : null;
  };
  
  // Fixed visual representation function to properly separate CSS properties
  const getTargetStyleClasses = (dayId: string, targetNumber: number) => {
    const result = getCategoryForTarget(dayId, targetNumber);
    
    if (!result) {
      // Empty target is white with gray border
      return {
        bgColor: "bg-white",
        textColor: "text-gray-700",
        border: "border border-gray-300",
        isShared: false,
        sharedCategories: [],
        customStyle: {}
      };
    }
    
    if (result.isShared) {
      const mainCategoryId = result.categoryId;
      const secondaryCategoryId = result.sharedWith[0];
      
      // Get the actual color values, not the Tailwind classes
      const mainColorMap: Record<number, string> = {
        1: "#3B82F6", // blue-500
        2: "#EC4899", // pink-500
        3: "#10B981", // green-500
        4: "#8B5CF6", // purple-500
        5: "#F59E0B", // amber-500
        6: "#06B6D4"  // cyan-500
      };
      
      const mainColor = mainColorMap[mainCategoryId] || "#D1D5DB";
      const secondaryColor = secondaryCategoryId ? (mainColorMap[secondaryCategoryId] || "#D1D5DB") : "#D1D5DB";
      
      // Fix: Use separate properties instead of shorthand 'background'
      return {
        bgColor: "",
        textColor: "text-white",
        border: "border border-purple-500",
        isShared: true,
        sharedCategories: [result.categoryId, ...result.sharedWith],
        customStyle: {
          backgroundImage: `linear-gradient(135deg, ${mainColor} 0%, ${mainColor} 50%, ${secondaryColor} 50%, ${secondaryColor} 100%)`,
          backgroundClip: "padding-box"
        }
      };
    }
    
    // Regular assigned target
    return {
      bgColor: getCategoryColor(result.categoryId),
      textColor: "text-white",
      border: "border border-transparent",
      isShared: false,
      sharedCategories: [],
      customStyle: {}
    };
  };
  
  // Add state for box size toggle
  const [useCompactView, setUseCompactView] = useState(true);

  // Function to toggle shared targets for a specific day
  function toggleSharedTargetsForDay(id: string, enabled: boolean): void {
    // Update the enableSharedTargets state
    setEnableSharedTargets(prev => ({
      ...prev,
      [id]: enabled
    }));
    
    // If disabling shared targets, clear any existing shared targets for this day
    if (!enabled) {
      setSharedTargets(prev => ({
        ...prev,
        [id]: []
      }));
      
      // Optionally regenerate targets without sharing if they were previously shared
      if (sharedTargets[id]?.length > 0) {
        handleAutoGenerateTargets(id);
      }
    }
  }

  // Function to toggle empty targets for a specific day
  function toggleEmptyTargetsForDay(id: string, enabled: boolean): void {
    setEnableEmptyTargets(prev => ({
      ...prev,
      [id]: enabled
    }));
  }
  
  // New function to check if a day has potential for shared targets
  const hasPotentialForSharing = (dayId: string) => {
    const potentialPairs = findPotentialSharedTargets(dayId);
    return potentialPairs.length > 0;
  };

  // Function to toggle card expanded state
  const toggleCardExpanded = (dayId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [dayId]: !prev[dayId]
    }));
  };

  // Add state for sort mode and manual sort order
  const [sortMode, setSortMode] = useState<'auto' | 'manual'>('auto');
  const [manualSortOrder, setManualSortOrder] = useState<number[]>(
    categories.map(cat => cat.id)
  );

  // Add state for drag operation
  const [isDragging, setIsDragging] = useState(false);

  // New function to move a category up or down in the manual sort order
  const moveCategory = (categoryId: number, direction: 'up' | 'down') => {
    const currentIndex = manualSortOrder.indexOf(categoryId);
    if (currentIndex === -1) return;
    
    // Can't move first item up or last item down
    if (direction === 'up' && currentIndex === 0) return;
    if (direction === 'down' && currentIndex === manualSortOrder.length - 1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newOrder = [...manualSortOrder];
    
    // Swap positions
    [newOrder[currentIndex], newOrder[newIndex]] = [newOrder[newIndex], newOrder[currentIndex]];
    
    setManualSortOrder(newOrder);
  };

  // Function to handle drag start
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setIsDragging(true);
    
    // Store the index as data
    e.dataTransfer.setData('text/plain', index.toString());
    
    // Set effectAllowed to move to show the move cursor
    e.dataTransfer.effectAllowed = 'move';
    
    // Capture currentTarget outside the timeout
    const targetElement = e.currentTarget;
    
    // Add a dragging class to the element for styling
    if (targetElement instanceof HTMLElement) {
      // Add a slight delay to allow the browser to capture the drag image correctly
      setTimeout(() => {
        // Check if the element still exists before modifying classList
        if (targetElement) {
          targetElement.classList.add('opacity-50'); // Example styling for the original item
        }
      }, 0);
    }
  };

  // Function to handle drag end
  const handleDragEnd = (e: React.DragEvent) => {
    setIsDragging(false);
    
    // Capture currentTarget outside the timeout
    const targetElement = e.currentTarget;
    
    // Remove the dragging class/style
    if (targetElement instanceof HTMLElement) {
      targetElement.classList.remove('opacity-50');
    }
    // Clean up any lingering drop target highlights
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over', 'bg-blue-50'));
  };

  // Function to handle reordering via drag and drop
  const handleDragReorder = (result: { source: { index: number }; destination?: { index: number } }) => {
    // If dropped outside the list or no movement, do nothing
    if (!result.destination || result.source.index === result.destination.index) {
      return;
    }

    const newOrder = [...manualSortOrder];
    const [movedItem] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, movedItem);
    
    setManualSortOrder(newOrder);
  };

  // Simplified sort direction toggle - only toggle between asc and desc
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };
  
  // Function to toggle sort mode between auto and manual
  const toggleSortMode = () => {
    if (sortMode === 'auto') {
      // When switching to manual, initialize with the current auto-sorted order
      const sortedIds = getSortedCategories().map(cat => cat.id);
      setManualSortOrder(sortedIds);
      setSortMode('manual');
    } else {
      setSortMode('auto');
    }
  };

  // Updated function to get sorted categories - respects manual sorting when active
  const getSortedCategories = () => {
    // If using manual sort, return categories in the manual sort order
    if (sortMode === 'manual') {
      return manualSortOrder
        .map(id => categories.find(cat => cat.id === id))
        .filter((cat): cat is typeof categories[0] => !!cat); // Type guard to remove undefined
    }
    
    // Otherwise, use automatic sorting based on distance
    return [...categories].sort((a, b) => {
      // Extract numeric part from the distance (e.g., "70m" -> 70)
      const distanceA = parseInt(a.distance.replace(/[^\d]/g, ''));
      const distanceB = parseInt(b.distance.replace(/[^\d]/g, ''));
      
      return sortDirection === 'asc' 
        ? distanceA - distanceB  // Ascending: small to large
        : distanceB - distanceA; // Descending: large to small
    });
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href={`/scoring/${eventId}/settings`} className="hover:bg-gray-100 p-1 rounded">
                <ChevronLeft size={20} />
              </Link>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Target className="h-6 w-6 text-purple-600" />
                Pengaturan Bantalan
              </h1>
            </div>
            <p className="text-slate-600">Atur jumlah dan distribusi bantalan untuk setiap hari pertandingan</p>
          </div>
          <div className="flex gap-4">
            <Link href={`/scoring/${eventId}/settings`}>
              <Button variant="outline">Kembali</Button>
            </Link>
            <Button onClick={handleSaveSettings} className="bg-green-600 hover:bg-green-700">
              <Save size={16} className="mr-2" /> Simpan
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-t-purple-600 border-r-purple-600 border-b-purple-200 border-l-purple-200 rounded-full animate-spin mb-4 mx-auto"></div>
              <p className="text-gray-600">Memuat data jadwal pertandingan...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {daySettings.map(day => (
              <div key={day.id} className="border rounded-lg bg-white overflow-hidden">
                {/* Card header with toggle */}
                <div 
                  className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleCardExpanded(day.id)}
                >
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    {formatDateTime(day.date, day.startTime, day.endTime)}
                  </h2>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCardExpanded(day.id);
                      }}
                    >
                      {expandedCards[day.id] ? (
                        <ChevronLeft className="h-5 w-5 rotate-90" />
                      ) : (
                        <ChevronLeft className="h-5 w-5 -rotate-90" />
                      )}
                    </Button>
                  </div>
                </div>
                
                {/* Collapsible card content */}
                {expandedCards[day.id] && (
                  <div className="p-6 pt-0">
                    {/* Day-level target settings */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor={`totalTargets-${day.id}`}>Jumlah Bantalan Tersedia</Label>
                        <div className="flex gap-2">
                          <Input
                            id={`totalTargets-${day.id}`}
                            type="number"
                            className={`h-10 text-sm ${validationErrors[day.id]?.totalTargets 
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                              : "border-gray-300"}`}
                            value={day.totalTargets}
                            onChange={(e) => handleUpdateDay(day.id, 'totalTargets', Number(e.target.value))}
                          />
                        </div>
                        {validationErrors[day.id]?.totalTargets ? (
                          <p className="text-xs text-red-500">{validationErrors[day.id]?.totalTargets}</p>
                        ) : (
                          <p className="text-xs text-gray-500">Jumlah total bantalan yang tersedia</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`startTargetNumber-${day.id}`}>Mulai dari Nomor</Label>
                        <div className="flex gap-2">
                          <Input
                            id={`startTargetNumber-${day.id}`}
                            type="number"
                            className={`h-10 text-sm ${validationErrors[day.id]?.startTargetNumber 
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                              : "border-gray-300"}`}
                            value={day.startTargetNumber}
                            onChange={(e) => handleUpdateDay(day.id, 'startTargetNumber', Number(e.target.value))}
                            min={1}
                          />
                        </div>
                        {validationErrors[day.id]?.startTargetNumber ? (
                          <p className="text-xs text-red-500">{validationErrors[day.id]?.startTargetNumber}</p>
                        ) : (
                          <p className="text-xs text-gray-500">Nomor awal bantalan</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`generate-${day.id}`}>Auto Generate</Label>
                        <div className="flex gap-2 items-center">
                          <Button 
                            id={`generate-${day.id}`}
                            type="button"
                            className="bg-blue-600 hover:bg-blue-700 h-10 flex-grow"
                            onClick={() => handleAutoGenerateTargets(day.id)}
                            disabled={!!validationErrors[day.id]?.totalTargets || !!validationErrors[day.id]?.startTargetNumber}
                          >
                            Auto Generate
                          </Button>
                          
                          {/* Toggle switches container */}
                          <div className="flex items-center gap-3">
                            {/* Shared targets toggle */}
                            <div className="flex items-center gap-1">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="cursor-help text-gray-500">
                                      <Share2 size={14} />
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-64 text-xs">
                                      Mengizinkan beberapa kategori berbagi bantalan yang sama 
                                      untuk mengoptimalkan penggunaan bantalan saat distribusi 
                                      peserta tidak merata
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <Switch
                                id={`enable-shared-${day.id}`}
                                checked={enableSharedTargets[day.id]}
                                onCheckedChange={(enabled) => toggleSharedTargetsForDay(day.id, enabled)}
                              />
                            </div>
                            
                            {/* New empty targets toggle */}
                            <div className="flex items-center gap-1">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="cursor-help text-gray-500">
                                      <Columns size={14} />
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-64 text-xs">
                                      Mengizinkan adanya bantalan kosong di antara kategori
                                      untuk memperjelas pengelompokan
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <Switch
                                id={`enable-empty-${day.id}`}
                                checked={enableEmptyTargets[day.id]}
                                onCheckedChange={(enabled) => toggleEmptyTargetsForDay(day.id, enabled)}
                              />
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">Mengenerate pembagian bantalan secara otomatis</p>
                      </div>
                    </div>
                    
                    {/* Dynamic Insight box */}
                    {hasPotentialForSharing(day.id) && (
                      <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <h3 className="text-sm font-semibold text-blue-800 mb-1 flex items-center gap-2">
                          <Share2 size={14} className="text-blue-700" />
                          Insight
                        </h3>
                        <p className="text-xs text-blue-700">
                          {updateInsightText(day.id)}
                        </p>
                      </div>
                    )}
                    
                    {/* Categories with target assignments - with sorting feature */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-semibold">Distribusi Bantalan per Kategori</h3>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleSortMode}
                            className={`text-xs h-8 flex items-center gap-1 ${sortMode === 'manual' ? 'bg-blue-50 border-blue-200' : ''}`}
                          >
                            <span>{sortMode === 'auto' ? 'Auto Sort' : 'Manual Sort'}</span>
                          </Button>
                          
                          {sortMode === 'auto' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={toggleSortDirection}
                              className="text-xs h-8 flex items-center gap-1"
                            >
                              <span>Jarak</span>
                              {sortDirection === 'asc' && <ChevronLeft className="h-4 w-4 rotate-90" />}
                              {sortDirection === 'desc' && <ChevronLeft className="h-4 w-4 -rotate-90" />}
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="border rounded-md bg-white overflow-hidden">
                        {sortMode === 'manual' ? (
                          // Render draggable table when in manual mode
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-14">
                                  Order
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Kategori
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Target Face
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Bantalan Awal
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Bantalan Akhir
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Total Peserta
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Bantalan Digunakan
                                </th>
                              </tr>
                            </thead>
                            <tbody 
                              className="bg-white divide-y divide-gray-200"
                            >
                              {getSortedCategories().map((category, index) => {
                                const categoryTarget = day.categoryTargets.find(ct => ct.categoryId === category.id);
                                const isActive = isCategoryActive(day.id, category.id);
                                
                                // Calculate total targets used
                                const targetsUsed = isActive && categoryTarget 
                                  ? (categoryTarget.endTarget - categoryTarget.startTarget + 1) 
                                  : 0;
                                
                                return (
                                  <tr 
                                    key={category.id} 
                                    // Add transition for smoother visual feedback
                                    className={`${isActive ? "" : "opacity-60"} ${isDragging ? "cursor-grabbing" : "cursor-grab"} transition-colors duration-150`}
                                    draggable={sortMode === 'manual'}
                                    onDragStart={(e) => handleDragStart(e, index)}
                                    onDragEnd={handleDragEnd}
                                    onDragOver={(e) => {
                                      e.preventDefault(); // Necessary to allow dropping
                                      e.dataTransfer.dropEffect = 'move';
                                      // Add class to highlight potential drop target
                                      if (e.currentTarget instanceof HTMLElement) {
                                        e.currentTarget.classList.add('drag-over', 'bg-blue-50'); 
                                      }
                                    }}
                                    onDragLeave={(e) => {
                                      // Remove highlight when not hovering over anymore
                                      if (e.currentTarget instanceof HTMLElement) {
                                        e.currentTarget.classList.remove('drag-over', 'bg-blue-50');
                                      }
                                    }}
                                    onDrop={(e) => {
                                      e.preventDefault();
                                      // Remove highlight on drop
                                      if (e.currentTarget instanceof HTMLElement) {
                                        e.currentTarget.classList.remove('drag-over', 'bg-blue-50');
                                      }
                                      const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
                                      handleDragReorder({
                                        source: { index: sourceIndex },
                                        destination: { index }
                                      });
                                    }}
                                  >
                                    <td className="px-3 py-2 whitespace-nowrap text-center">
                                      <div className="flex items-center justify-center">
                                        <div className="flex flex-col mr-2">
                                          <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-5 w-5 p-0"
                                            onClick={() => moveCategory(category.id, 'up')}
                                            disabled={index === 0}
                                          >
                                            <ChevronLeft className="h-3 w-3 rotate-90" />
                                          </Button>
                                          <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-5 w-5 p-0"
                                            onClick={() => moveCategory(category.id, 'down')}
                                            disabled={index === getSortedCategories().length - 1}
                                          >
                                            <ChevronLeft className="h-3 w-3 -rotate-90" />
                                          </Button>
                                        </div>
                                        <div className="text-gray-400">
                                          <GripVertical className="h-5 w-5" />
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium">
                                      <div className="flex items-center">
                                        <div className={`w-2 h-2 rounded-full mr-2 ${isActive ? "bg-green-500" : "bg-gray-300"}`}></div>
                                        <div>
                                          <div>{category.name}</div>
                                          <div className="text-xs text-gray-500">{category.distance} - {category.gender}</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                      <Input
                                        type="number"
                                        className="w-24 h-8 text-sm border-gray-300"
                                        value={categoryTarget?.targetFace || 3}
                                        onChange={(e) => handleUpdateCategoryTarget(
                                          day.id, 
                                          category.id, 
                                          'targetFace', 
                                          Number(e.target.value)
                                        )}
                                        min={1}
                                      />
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                      <Input
                                        type="number"
                                        className="w-24 h-8 text-sm border-gray-300"
                                        value={categoryTarget?.startTarget || 0}
                                        onChange={(e) => handleUpdateCategoryTarget(
                                          day.id, 
                                          category.id, 
                                          'startTarget', 
                                          Number(e.target.value)
                                        )}
                                        min={0}
                                        max={day.totalTargets}
                                      />
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                      <Input
                                        type="number"
                                        className="w-24 h-8 text-sm border-gray-300"
                                        value={categoryTarget?.endTarget || 0}
                                        onChange={(e) => handleUpdateCategoryTarget(
                                          day.id, 
                                          category.id, 
                                          'endTarget', 
                                          Number(e.target.value)
                                        )}
                                        min={categoryTarget?.startTarget || 0}
                                        max={day.totalTargets}
                                      />
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                      <Input
                                        type="number"
                                        className="w-24 h-8 text-sm border-gray-300 bg-gray-50"
                                        value={categoryTarget?.totalParticipants || 0}
                                        disabled
                                        readOnly
                                      />
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                      <Input
                                        type="number"
                                        className="w-24 h-8 text-sm border-gray-300 bg-gray-50"
                                        value={targetsUsed}
                                        disabled
                                        readOnly
                                      />
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        ) : (
                          // Regular table for auto mode
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Face</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bantalan Awal</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bantalan Akhir</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Peserta</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bantalan Digunakan</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {getSortedCategories().map(category => {
                                const categoryTarget = day.categoryTargets.find(ct => ct.categoryId === category.id);
                                const isActive = isCategoryActive(day.id, category.id);
                                
                                // Calculate total targets used
                                const targetsUsed = isActive && categoryTarget 
                                  ? (categoryTarget.endTarget - categoryTarget.startTarget + 1) 
                                  : 0;
                                
                                return (
                                  <tr key={category.id} className={isActive ? "" : "opacity-60"}>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium">
                                      <div className="flex items-center">
                                        <div className={`w-2 h-2 rounded-full mr-2 ${isActive ? "bg-green-500" : "bg-gray-300"}`}></div>
                                        <div>
                                          <div>{category.name}</div>
                                          <div className="text-xs text-gray-500">{category.distance} - {category.gender}</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                      <Input
                                        type="number"
                                        className="w-24 h-8 text-sm border-gray-300"
                                        value={categoryTarget?.targetFace || 3}
                                        onChange={(e) => handleUpdateCategoryTarget(
                                          day.id, 
                                          category.id, 
                                          'targetFace', 
                                          Number(e.target.value)
                                        )}
                                        min={1}
                                      />
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                      <Input
                                        type="number"
                                        className="w-24 h-8 text-sm border-gray-300"
                                        value={categoryTarget?.startTarget || 0}
                                        onChange={(e) => handleUpdateCategoryTarget(
                                          day.id, 
                                          category.id, 
                                          'startTarget', 
                                          Number(e.target.value)
                                        )}
                                        min={0}
                                        max={day.totalTargets}
                                      />
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                      <Input
                                        type="number"
                                        className="w-24 h-8 text-sm border-gray-300"
                                        value={categoryTarget?.endTarget || 0}
                                        onChange={(e) => handleUpdateCategoryTarget(
                                          day.id, 
                                          category.id, 
                                          'endTarget', 
                                          Number(e.target.value)
                                        )}
                                        min={categoryTarget?.startTarget || 0}
                                        max={day.totalTargets}
                                      />
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                      <Input
                                        type="number"
                                        className="w-24 h-8 text-sm border-gray-300 bg-gray-50"
                                        value={categoryTarget?.totalParticipants || 0}
                                        disabled
                                        readOnly
                                      />
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                      <Input
                                        type="number"
                                        className="w-24 h-8 text-sm border-gray-300 bg-gray-50"
                                        value={targetsUsed}
                                        disabled
                                        readOnly
                                      />
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>

                    {/* Visual Target Layout */}
                    <div className="mt-8">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-semibold">Visual Layout Bantalan</h3>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => setUseCompactView(!useCompactView)}
                        >
                          {useCompactView ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                          <span className="ml-1 text-xs">{useCompactView ? "Perbesar" : "Perkecil"}</span>
                        </Button>
                      </div>
                      
                      {/* Legend */}
                      <div className="flex flex-wrap gap-3 mb-4">
                        {getSortedCategories()
                          .filter(category => isCategoryActive(day.id, category.id))
                          .map(category => (
                          <div key={category.id} className="flex items-center gap-1">
                            <div className={`w-3 h-3 rounded ${getCategoryColor(category.id)}`}></div>
                            <span className="text-xs">{category.name}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Target Grid - updated to handle shared targets */}
                      <div className="border rounded-lg p-3 bg-gray-50 overflow-x-auto">
                        <div className="flex flex-nowrap gap-1 min-w-max">
                          {Array.from({ length: day.totalTargets }, (_, i) => i + day.startTargetNumber).map(targetNumber => {
                            const { bgColor, textColor, border, isShared, sharedCategories, customStyle } = 
                              getTargetStyleClasses(day.id, targetNumber);
                            
                            return (
                              <TooltipProvider key={targetNumber}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div 
                                      className={`${useCompactView ? 'w-7 h-7' : 'w-10 h-10'} 
                                        flex-shrink-0 flex items-center justify-center 
                                        rounded-md ${bgColor} ${textColor} ${border} 
                                        ${isShared ? 'ring-2 ring-purple-400' : ''} 
                                        font-medium text-xs relative`}
                                      style={customStyle}
                                    >
                                      {targetNumber}
                                      {isShared && (
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full flex items-center justify-center">
                                          <Share2 size={8} className="text-white" />
                                        </div>
                                      )}
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {isShared ? (
                                      <div>
                                        <p className="font-semibold">Bantalan Gabungan #{targetNumber}</p>
                                        <div className="text-xs mt-1">
                                          {sharedCategories.map(categoryId => {
                                            const category = categories.find(c => c.id === categoryId);
                                            const sharedInfo = getSharedTargetInfo(day.id, targetNumber);
                                            return (
                                              <div key={categoryId} className="flex justify-between items-center">
                                                <span>{category?.name}</span>
                                                <span>{sharedInfo?.participantCounts[categoryId] || 0} peserta</span>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    ) : getCategoryForTarget(day.id, targetNumber) ? (
                                      <p>{categories.find(c => c.id === getCategoryForTarget(day.id, targetNumber)?.categoryId)?.name}</p>
                                    ) : (
                                      <p>Bantalan Kosong</p>
                                    )}
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            );
                          })}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Scroll ke kanan untuk melihat semua bantalan • Bantalan kosong ditandai dengan kotak putih • Bantalan gabungan ditandai dengan ikon gabung</p>
                      </div>
                      
                      {/* Target Occupancy summary - also show shared targets information */}
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="border rounded-lg p-3 bg-white">
                          <h4 className="text-sm font-medium mb-2">Distribusi Peserta per Bantalan</h4>
                          <div className="text-sm text-gray-600">
                            {day.categoryTargets
                              .filter(cat => cat.startTarget > 0 && cat.endTarget > 0)
                              .map(cat => {
                                const category = categories.find(c => c.id === cat.categoryId);
                                const targetCount = cat.endTarget - cat.startTarget + 1;
                                const participantsPerTarget = (cat.totalParticipants / targetCount).toFixed(1);
                                
                                return (
                                  <div key={cat.categoryId} className="flex justify-between items-center py-1 border-b border-gray-100">
                                    <span>{category?.name}</span>
                                    <span className="font-medium">{participantsPerTarget} peserta/bantalan</span>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-3 bg-white">
                          <h4 className="text-sm font-medium mb-2">Ringkasan Bantalan</h4>
                          <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <div>Total Bantalan Tersedia:</div>
                            <div className="font-medium">{day.totalTargets}</div>
                            
                            <div>Total Bantalan Terpakai:</div>
                            <div className="font-medium">
                              {day.categoryTargets
                                .filter(cat => cat.startTarget > 0 && cat.endTarget > 0)
                                .reduce((sum, cat) => sum + (cat.endTarget - cat.startTarget + 1), 0)}
                            </div>
                            
                            <div>Total Peserta:</div>
                            <div className="font-medium">
                              {day.categoryTargets.reduce((sum, cat) => sum + cat.totalParticipants, 0)}
                            </div>

                            <div>Bantalan Gabungan:</div>
                            <div className="font-medium">
                              {sharedTargets[day.id]?.length || 0}
                            </div>
                            
                            <div>Bantalan Tersisa:</div>
                            <div className="font-medium">
                              {day.totalTargets - day.categoryTargets
                                .filter(cat => cat.startTarget > 0 && cat.endTarget > 0)
                                .reduce((sum, cat) => sum + (cat.endTarget - cat.startTarget + 1), 0)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Shared Targets section - only show if there are shared targets */}
                    {sharedTargets[day.id]?.length > 0 && (
                      <div className="mt-3 border rounded-lg p-3 bg-white">
                        <h4 className="text-sm font-medium mb-2 flex items-center">
                          <Share2 size={16} className="text-purple-500 mr-2" />
                          Detail Bantalan Gabungan
                        </h4>
                        <div className="text-sm">
                          <div className="border rounded overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bantalan</th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peserta</th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Persentase</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {sharedTargets[day.id].flatMap((sharedTarget, targetIndex) => 
                                  sharedTarget.categories.map((categoryId, categoryIndex) => {
                                    const category = categories.find(c => c.id === categoryId);
                                    const participants = sharedTarget.participantCounts[categoryId] || 0;
                                    const targetFace = day.categoryTargets.find(ct => ct.categoryId === categoryId)?.targetFace || 1;
                                    const percentage = Math.round((participants / targetFace) * 100);
                                    
                                    return (
                                      <tr key={`${sharedTarget.targetNumber}-${categoryId}-${targetIndex}-${categoryIndex}`}>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                                          {sharedTarget.targetNumber}
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                                          <div className="flex items-center">
                                            <div className={`w-2 h-2 rounded-full mr-2 ${getCategoryColor(categoryId).replace('bg-', 'bg-')}`}></div>
                                            {category?.name}
                                          </div>
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                                          {participants}
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div 
                                              className={`h-2.5 rounded-full ${getCategoryColor(categoryId).replace('bg-', 'bg-')}`} 
                                              style={{ width: `${percentage}%` }}
                                            ></div>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Additional explanation for shared targets - update title here too */}
                    {day.id === 'day-3' && sharedTargets[day.id]?.length > 0 && (
                      <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-md">
                        <div className="flex items-start gap-2">
                          <div className="text-purple-500 mt-0.5">
                            <Share2 size={16} />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-purple-800">Insight</h3>
                            <p className="text-xs text-purple-700 mt-1">
                              Bantalan {sharedTargets[day.id][0]?.targetNumber} adalah bantalan gabungan yang digunakan oleh dua kategori berbeda.
                              Kategori pertama memiliki {sharedTargets[day.id][0]?.participantCounts[1] || 0} peserta dari sisa pembagian, 
                              dan kategori kedua memiliki {sharedTargets[day.id][0]?.participantCounts[2] || 0} peserta dari sisa pembagian.
                              Penggabungan ini menghemat 1 bantalan dan mengoptimalkan penggunaan sumber daya.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}