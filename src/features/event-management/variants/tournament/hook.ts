"use client";

import { useState } from "react";
import { TournamentFormData, initialTournamentFormState } from "./model";
import { TournamentService } from "./service";

export function useTournamentForm() {
  const [form, setForm] = useState<TournamentFormData>({...initialTournamentFormState});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  
  const tournamentService = new TournamentService();
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
    
    // Clear error for this field when user changes it
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(null);
    
    try {
      // Validate form
      const validation = tournamentService.validateTournamentData(form);
      
      if (!validation.isValid && validation.errors) {
        setErrors(validation.errors);
        setIsSubmitting(false);
        return;
      }
      
      // Submit form
      const result = await tournamentService.createTournament(form);
      
      if (result.success) {
        setSuccess(true);
        setForm({...initialTournamentFormState});
        setErrors({});
      } else {
        setSuccess(false);
        setErrors({ form: result.error ?? "Failed to create tournament" });
      }
    } catch (error) {
      setSuccess(false);
      setErrors({ form: error instanceof Error ? error.message : "An unexpected error occurred" });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setForm({...initialTournamentFormState});
    setErrors({});
    setSuccess(null);
  };
  
  return {
    form,
    errors,
    isSubmitting,
    success,
    handleChange,
    handleSubmit,
    resetForm
  };
}
