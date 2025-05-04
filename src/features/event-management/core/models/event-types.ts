import { ReactNode } from "react";

export interface EventType {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
  popular?: boolean;
  coming?: boolean;
}
