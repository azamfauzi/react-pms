import { Calendar, MapPin, Star, UserPlus, Users, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function DeveloperMeetupWidget() {
  return (
    <Card className="h-full">
      <div className="-mt-4 h-32 bg-gradient-to-br from-sky-200 via-blue-300 to-sky-500" />
      <CardContent>
        <div className="flex gap-4">
          <div className="rounded-md border bg-background px-3 py-2 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Jan</p>
            <p className="text-lg font-semibold">24</p>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium">Developer Meetup</p>
            <p className="mt-1 text-xs text-muted-foreground">
              The WordPress open source, free software project is the community behind the…
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2 border-y py-3 text-center text-xs">
          <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
            <Star className="h-4 w-4" /> Interested
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
            <Users className="h-4 w-4" /> Joined
          </button>
          <button className="flex flex-col items-center gap-1 text-violet-600">
            <UserPlus className="h-4 w-4" /> Invited
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
            <MoreHorizontal className="h-4 w-4" /> More
          </button>
        </div>

        <div className="mt-3 space-y-2 text-xs text-muted-foreground">
          <p className="flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            Tuesday, 24 January, 10:20 - 12:30
            <span className="ml-auto text-[10px]">After 1 week</span>
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            The Rochard NYC
            <span className="ml-auto text-[10px]">1305 Lexington Ave, New York</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
