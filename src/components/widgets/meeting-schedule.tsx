import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { WidgetCard } from "./widget-card";

type Meeting = {
  name: string;
  date: string;
  time: string;
  tag: string;
  tagColor: string;
  initials: string;
  avatarBg: string;
};

const MEETINGS: Meeting[] = [
  { name: "Call with Woods", date: "21 Jul", time: "08:20-10:30", tag: "Business", tagColor: "bg-violet-100 text-violet-700", initials: "CW", avatarBg: "bg-violet-100 text-violet-700" },
  { name: "Call with Hilda", date: "24 Jul", time: "11:30-12:00", tag: "Meditation", tagColor: "bg-emerald-100 text-emerald-700", initials: "CH", avatarBg: "bg-rose-100 text-rose-700" },
  { name: "Conference call", date: "28 Jul", time: "05:00-6:45", tag: "Dinner", tagColor: "bg-rose-100 text-rose-700", initials: "CC", avatarBg: "bg-amber-100 text-amber-700" },
  { name: "Meeting with Mark", date: "03 Aug", time: "07:00-8:30", tag: "Meetup", tagColor: "bg-amber-100 text-amber-700", initials: "MM", avatarBg: "bg-sky-100 text-sky-700" },
  { name: "Meeting in Oakland", date: "14 Aug", time: "04:15-05:30", tag: "Dinner", tagColor: "bg-rose-100 text-rose-700", initials: "MO", avatarBg: "bg-emerald-100 text-emerald-700" },
  { name: "Meeting with Carl", date: "05 Oct", time: "10:00-12:45", tag: "Business", tagColor: "bg-violet-100 text-violet-700", initials: "MC", avatarBg: "bg-violet-100 text-violet-700" },
];

export function MeetingScheduleWidget() {
  return (
    <WidgetCard title="Meeting Schedule">
      <ul className="flex flex-col gap-4">
        {MEETINGS.map((m, i) => (
          <li key={i} className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className={m.avatarBg}>{m.initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{m.name}</p>
              <p className="flex items-center gap-2 truncate text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {m.date}
                <Clock className="ml-1 h-3 w-3" />
                {m.time}
              </p>
            </div>
            <Badge className={`${m.tagColor} border-0`} variant="secondary">
              {m.tag}
            </Badge>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
