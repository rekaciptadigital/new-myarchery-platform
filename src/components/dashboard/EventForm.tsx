"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventFormSchema, EventFormInput } from "@/lib/validations/event";
import { EventFormData, EventStatus } from "@/types/event";

interface EventFormProps {
  readonly onSubmit: (data: EventFormData) => void;
  readonly initialData?: EventFormData;
  readonly isEditing?: boolean;
  readonly statusOptions: EventStatus[];
}

export function EventForm({ onSubmit, initialData, isEditing = false, statusOptions }: EventFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EventFormInput>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialData || {
      name: "",
      date: "",
      status: "Draft",
    },
  });

  const onFormSubmit = (data: EventFormInput) => {
    onSubmit(data);
    if (!isEditing) {
      reset();
    }
  };

  // Extract nested ternary operation
  const getButtonText = () => {
    if (isSubmitting) return "Menyimpan...";
    if (isEditing) return "Simpan Perubahan";
    return "Tambah Event";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="font-semibold text-lg mb-4">
        {isEditing ? "Edit Event" : "Buat Event Baru"}
      </h2>
      
      <form 
        onSubmit={handleSubmit(onFormSubmit)}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nama Event
          </label>
          <input
            id="name"
            {...register("name")}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan nama event"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            Tanggal
          </label>
          <input
            id="date"
            type="date"
            {...register("date")}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            id="status"
            {...register("status")}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white rounded-md px-4 py-2 font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {getButtonText()}
        </button>
      </form>
    </div>
  );
}
