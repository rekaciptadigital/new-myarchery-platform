import React from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
// Import the type alias
import { TournamentFormData, ImageInput } from "../../core/models/tournament"; 

interface TournamentImageUploadProps {
  readonly field: keyof TournamentFormData;
  readonly label: string;
  // Use the type alias here
  readonly imageValue: ImageInput; 
  readonly onFieldChange: (field: keyof TournamentFormData, value: File | null) => void;
  readonly handleFileUpload: (field: keyof TournamentFormData, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TournamentImageUpload({
  field,
  label,
  imageValue,
  onFieldChange,
  handleFileUpload,
}: TournamentImageUploadProps) {
  const inputId = `image-upload-${field}`;
  
  // Determine imageUrl using if/else statements
  let imageUrl: string | null = null;
  if (typeof imageValue === 'string') {
    imageUrl = imageValue;
  } else if (imageValue instanceof File) {
    imageUrl = URL.createObjectURL(imageValue);
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId}>{label}</Label>
      <div className="border rounded-md p-4 text-center">
        {imageUrl ? (
          <div className="relative w-full h-32">
            <Image
              src={imageUrl}
              alt={label}
              fill
              style={{ objectFit: 'contain' }}
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-0 right-0 z-10"
              onClick={() => onFieldChange(field, null)}
            >
              &times;
            </Button>
          </div>
        ) : (
          <label htmlFor={inputId} className="flex flex-col items-center justify-center h-32 cursor-pointer">
            <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">Klik untuk upload {label.toLowerCase()}</span>
            <input
              type="file"
              id={inputId}
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(field, e)}
            />
          </label>
        )}
      </div>
    </div>
  );
}
