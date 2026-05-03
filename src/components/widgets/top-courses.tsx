import { Video, Code2, Camera, Palette, Music } from "lucide-react";
import { WidgetCard } from "./widget-card";

const COURSES = [
  { name: "Videography Basic Design Course", views: "1.2k", icon: Video, bg: "bg-violet-100", color: "text-violet-600" },
  { name: "Basic Front-end Development Course", views: "834", icon: Code2, bg: "bg-emerald-100", color: "text-emerald-600" },
  { name: "Basic Fundamentals of Photography", views: "3.7k", icon: Camera, bg: "bg-rose-100", color: "text-rose-600" },
  { name: "Advance Dribble Base Visual Design", views: "2.5k", icon: Palette, bg: "bg-amber-100", color: "text-amber-600" },
  { name: "Your First Singing Lesson", views: "948", icon: Music, bg: "bg-sky-100", color: "text-sky-600" },
];

export function TopCoursesWidget() {
  return (
    <WidgetCard title="Top courses">
      <ul className="flex flex-col gap-4">
        {COURSES.map((c, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className={`flex h-9 w-9 items-center justify-center rounded-md ${c.bg}`}>
              <c.icon className={`h-4 w-4 ${c.color}`} />
            </span>
            <p className="flex-1 truncate text-sm">{c.name}</p>
            <span className="text-xs text-muted-foreground">{c.views} Views</span>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
