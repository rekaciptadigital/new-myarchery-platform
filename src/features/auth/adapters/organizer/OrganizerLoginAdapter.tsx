"use client";

import { LoginForm } from "@/components/auth/LoginForm";

export function OrganizerLoginAdapter() {
  // Use the shared LoginForm component for consistent layout
  // No need to pass isOrganizerLogin prop since it's the default behavior
  return <LoginForm />;
}
