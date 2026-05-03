import { Heart, Users, MessageCircle, Eye } from "lucide-react";
import { WidgetCard } from "./widget-card";

const ROWS = [
  { icon: Heart, bg: "bg-violet-100", color: "text-violet-600", value: "42.8k", label: "Number of like" },
  { icon: Users, bg: "bg-emerald-100", color: "text-emerald-600", value: "21.2k", label: "Number of Followers" },
  { icon: MessageCircle, bg: "bg-amber-100", color: "text-amber-600", value: "2.4k", label: "Number of Comments" },
  { icon: Eye, bg: "bg-sky-100", color: "text-sky-600", value: "389.50k", label: "Number of Visits" },
];

export function AnalyticsWidget() {
  return (
    <WidgetCard title="Analytics">
      <ul className="flex flex-col gap-5">
        {ROWS.map((r, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className={`flex h-9 w-9 items-center justify-center rounded-md ${r.bg}`}>
              <r.icon className={`h-4 w-4 ${r.color}`} />
            </span>
            <div>
              <p className="text-sm font-semibold">{r.value}</p>
              <p className="text-xs text-muted-foreground">{r.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
