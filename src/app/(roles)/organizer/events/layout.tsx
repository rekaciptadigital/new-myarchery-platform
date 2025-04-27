import { ReactNode } from "react";

export default function OrganizerEventsLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  // We should not wrap with OrganizerEventsLayout here because that duplicates the sidebar
  // The parent OrganizerLayout in /app/(roles)/organizer/layout.tsx already provides the sidebar
  return <>{children}</>;
}