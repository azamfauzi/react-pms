import { ArrowUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { WidgetCard } from "./widget-card";

const ROWS = [
  { name: "Zipcar", subtitle: "Vuejs, React & HTML", amount: "$24,895.65", color: "bg-violet-500", value: 75 },
  { name: "Bitbank", subtitle: "Sketch, Figma & XD", amount: "$8,650.20", color: "bg-amber-500", value: 50 },
  { name: "Aviato", subtitle: "HTML & Angular", amount: "$1,245.80", color: "bg-sky-500", value: 30 },
];

export function TotalEarningWidget() {
  return (
    <WidgetCard title="Total Earning">
      <div className="mb-2 flex items-baseline gap-2">
        <p className="text-3xl font-semibold">$24,895</p>
        <span className="flex items-center text-xs text-emerald-600">
          <ArrowUp className="h-3 w-3" />
          10%
        </span>
      </div>
      <p className="mb-5 text-xs text-muted-foreground">Compared to $84,325 last year</p>
      <ul className="flex flex-col gap-4">
        {ROWS.map((r, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className={`flex h-9 w-9 items-center justify-center rounded-md text-xs font-semibold text-white ${r.color}`}>
              {r.name[0]}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{r.name}</p>
              <p className="truncate text-xs text-muted-foreground">{r.subtitle}</p>
            </div>
            <span className="text-sm font-medium">{r.amount}</span>
          </li>
        ))}
      </ul>
      <Progress value={75} className="mt-5" />
    </WidgetCard>
  );
}
