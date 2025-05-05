"use client";

import { useState, useEffect, useMemo } from "react";
import { ScoringSystemService } from "./service";
import { ScoringSystemEvent, ScoringSystemTarget, ScoringSystemCategory } from "./model";

export function useScoringSystem(eventId: string) {
  const service = useMemo(() => new ScoringSystemService(), []);
  const [eventDetails, setEventDetails] = useState<ScoringSystemEvent | null>(null);
  const [categories, setCategories] = useState<ScoringSystemCategory[]>([]);
  const [targetAssignments, setTargetAssignments] = useState<ScoringSystemTarget[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredTargets, setFilteredTargets] = useState<ScoringSystemTarget[]>([]);
  const [refreshTime, setRefreshTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  
  // Fetch event details
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const details = await service.getEventDetails(eventId);
        const cats = await service.getCategories();
        const targets = await service.getTargetAssignments();
        
        setEventDetails(details);
        setCategories(cats);
        setTargetAssignments(targets);
        setFilteredTargets(targets);
      } catch (error) {
        console.error("Error fetching scoring system data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [service, eventId]);
  
  // Filter targets based on selected category and search query
  useEffect(() => {
    if (targetAssignments.length === 0) return;
    
    let filtered = [...targetAssignments];
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(target => 
        target.category === categories.find(cat => cat.id === selectedCategory)?.name
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(target => 
        target.archerName.toLowerCase().includes(query) ||
        target.targetNo.toLowerCase().includes(query) ||
        target.clubName.toLowerCase().includes(query)
      );
    }
    
    setFilteredTargets(filtered);
  }, [selectedCategory, searchQuery, targetAssignments, categories]);

  // Simulasi refresh data
  const handleRefresh = () => {
    setRefreshTime(new Date());
  };

  return {
    eventDetails,
    categories,
    targetAssignments,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filteredTargets,
    refreshTime,
    loading,
    handleRefresh,
    calculateProgress: service.calculateProgress,
    getStatusBadgeClasses: service.getStatusBadgeClasses,
    getArcherStatusBadgeClasses: service.getArcherStatusBadgeClasses
  };
}
