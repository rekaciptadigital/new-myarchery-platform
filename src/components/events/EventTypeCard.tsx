import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EventTypeOption } from "@/types/events";

interface EventTypeCardProps {
  readonly eventType: EventTypeOption;
}

export function EventTypeCard({ eventType }: EventTypeCardProps) {
  const cardClass = eventType.popular 
    ? "border-blue-200 bg-blue-50 hover:border-blue-300" 
    : "hover:border-slate-300";

  return (
    <Card className={`overflow-hidden transition-all ${cardClass}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-shrink-0">
            {eventType.icon}
          </div>
          <div className="flex gap-1">
            {eventType.popular && (
              <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
                Popular
              </span>
            )}
            {eventType.coming && (
              <span className="bg-slate-600 text-white text-xs font-medium px-2 py-1 rounded">
                Coming Soon
              </span>
            )}
          </div>
        </div>
        <CardTitle className="text-lg">{eventType.title}</CardTitle>
        <CardDescription className="text-sm text-slate-600">
          {eventType.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pb-4 pt-2">
        {eventType.coming ? (
          <button 
            disabled 
            className="text-slate-500 flex items-center text-sm cursor-not-allowed"
          >
            Akan Datang 
            <ArrowRight size={14} className="ml-2" />
          </button>
        ) : (
          <Link 
            href={eventType.link} 
            className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium transition-colors"
          >
            Buat Event 
            <ArrowRight size={14} className="ml-2" />
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
