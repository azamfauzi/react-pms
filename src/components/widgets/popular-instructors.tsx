import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { WidgetCard } from "./widget-card";

const INSTRUCTORS = [
  { name: "Jordan Stevenson", topic: "Business Intelligence", courses: 33, bg: "bg-violet-100 text-violet-700", initials: "JS" },
  { name: "Bentlee Emblin", topic: "Digital Marketing", courses: 52, bg: "bg-amber-100 text-amber-700", initials: "BE" },
  { name: "Benedetto Rossiter", topic: "UI/UX Design", courses: 12, bg: "bg-emerald-100 text-emerald-700", initials: "BR" },
  { name: "Beverlie Krabbe", topic: "Vue", courses: 8, bg: "bg-sky-100 text-sky-700", initials: "BK" },
];

export function PopularInstructorsWidget() {
  return (
    <WidgetCard title="Popular Instructors">
      <div className="mb-3 flex items-center justify-between border-b pb-2 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
        <span>Instructors</span>
        <span>Courses</span>
      </div>
      <ul className="flex flex-col gap-4">
        {INSTRUCTORS.map((it, i) => (
          <li key={i} className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className={it.bg}>{it.initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{it.name}</p>
              <p className="truncate text-xs text-muted-foreground">{it.topic}</p>
            </div>
            <span className="text-sm font-medium">{it.courses}</span>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
