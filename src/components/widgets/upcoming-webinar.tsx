import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "./widget-card";

export function UpcomingWebinarWidget() {
  return (
    <WidgetCard title="">
      <div className="-mx-4 -mt-4 flex h-40 items-center justify-center bg-gradient-to-br from-violet-100 via-rose-100 to-amber-100">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/60 text-4xl">
          🧑‍💻
        </div>
      </div>
      <p className="mt-4 text-base font-medium">Upcoming Webinar</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Next Generation Frontend Architecture Using Layout Engine And React Native Web.
      </p>
      <div className="mt-4 flex gap-3">
        <div className="flex-1 rounded-md bg-muted/50 p-3">
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            17 Nov 23
          </p>
          <p className="mt-1 text-xs font-medium">Date</p>
        </div>
        <div className="flex-1 rounded-md bg-muted/50 p-3">
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            32 Minutes
          </p>
          <p className="mt-1 text-xs font-medium">Duration</p>
        </div>
      </div>
      <Button className="mt-4 w-full bg-violet-600 hover:bg-violet-700">Join the event</Button>
    </WidgetCard>
  );
}
