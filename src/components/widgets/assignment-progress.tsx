import { ChevronRight } from "lucide-react";
import { WidgetCard } from "./widget-card";
import { RadialProgress } from "./radial-progress";

const ITEMS = [
  { name: "User Experience Design", tasks: 120, progress: 72, color: "stroke-emerald-500" },
  { name: "Basic fundamentals", tasks: 32, progress: 48, color: "stroke-amber-500" },
  { name: "React Native components", tasks: 182, progress: 15, color: "stroke-rose-500" },
  { name: "Basic of music theory", tasks: 56, progress: 24, color: "stroke-sky-500" },
];

export function AssignmentProgressWidget() {
  return (
    <WidgetCard title="Assignment progress">
      <ul className="flex flex-col gap-4">
        {ITEMS.map((it, i) => (
          <li key={i} className="flex items-center gap-3">
            <RadialProgress value={it.progress} size={44} indicatorClassName={it.color}>
              <span className="text-[10px]">{it.progress}%</span>
            </RadialProgress>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{it.name}</p>
              <p className="text-xs text-muted-foreground">{it.tasks} Tasks</p>
            </div>
            <button className="rounded-md border p-1 text-muted-foreground hover:text-foreground">
              <ChevronRight className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
