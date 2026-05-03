import {
  Package,
  Truck,
  PackageCheck,
  Activity,
  Timer,
  Smile,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { WidgetCard } from "./widget-card";

const ROWS = [
  { icon: Package, bg: "bg-violet-100", color: "text-violet-600", label: "Packages in transit", change: 25.8, dir: "up" as const, value: "10k" },
  { icon: Truck, bg: "bg-amber-100", color: "text-amber-600", label: "Packages out for delivery", change: 4.3, dir: "up" as const, value: "5k" },
  { icon: PackageCheck, bg: "bg-emerald-100", color: "text-emerald-600", label: "Packages delivered", change: -12.5, dir: "down" as const, value: "15k" },
  { icon: Activity, bg: "bg-sky-100", color: "text-sky-600", label: "Delivery success rate", change: 35.6, dir: "up" as const, value: "95%" },
  { icon: Timer, bg: "bg-rose-100", color: "text-rose-600", label: "Average delivery time", change: -2.15, dir: "down" as const, value: "2.5 Days" },
  { icon: Smile, bg: "bg-violet-100", color: "text-violet-600", label: "Customer satisfaction", change: 5.7, dir: "up" as const, value: "4.5/5" },
];

export function DeliveryPerformanceWidget() {
  return (
    <WidgetCard title="Delivery Performance" description="12% increase in this month">
      <ul className="flex flex-col gap-4">
        {ROWS.map((r, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className={`flex h-9 w-9 items-center justify-center rounded-md ${r.bg}`}>
              <r.icon className={`h-4 w-4 ${r.color}`} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{r.label}</p>
              <p className={`flex items-center gap-1 text-xs ${r.dir === "up" ? "text-emerald-600" : "text-rose-600"}`}>
                {r.dir === "up" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                {Math.abs(r.change)}%
              </p>
            </div>
            <span className="text-sm font-medium">{r.value}</span>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
