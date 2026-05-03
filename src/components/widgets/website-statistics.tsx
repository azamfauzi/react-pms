"use client";

import { Bar, BarChart, Cell } from "recharts";
import { ArrowDown, ArrowUp } from "lucide-react";
import { WidgetCard } from "./widget-card";

const SOURCES = [
  { name: "Direct", value: 86471, pct: 15, color: "bg-violet-500", up: false },
  { name: "Organic", value: 57484, pct: 85, color: "bg-emerald-500", up: true },
  { name: "Referral", value: 2534, pct: 48, color: "bg-rose-500", up: true },
  { name: "Mail", value: 977, pct: 36, color: "bg-amber-500", up: false },
  { name: "Social", value: 92, pct: 55, color: "bg-sky-500", up: true },
  { name: "Other", value: 28, pct: 12, color: "bg-emerald-500", up: false },
];

const BARS = [40, 30, 50, 35, 80, 65, 45, 30, 55, 40].map((v, i) => ({ i, v }));

export function WebsiteStatisticsWidget() {
  return (
    <WidgetCard title="Website Statistics">
      <div className="mb-2 flex items-end justify-between">
        <div>
          <p className="text-3xl font-semibold">4,590</p>
          <p className="text-xs text-muted-foreground">Total Traffic</p>
        </div>
        <BarChart width={128} height={64} data={BARS} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Bar dataKey="v" radius={[3, 3, 0, 0]}>
            {BARS.map((_, i) => (
              <Cell key={i} fill={i === 4 ? "#8c57ff" : "#d8c5ff"} />
            ))}
          </Bar>
        </BarChart>
      </div>
      <ul className="mt-4 flex flex-col gap-3">
        {SOURCES.map((s, i) => (
          <li key={i} className="flex items-center gap-3 text-sm">
            <span className={`h-2 w-2 rounded-full ${s.color}`} />
            <span className="flex-1">{s.name}</span>
            <span className="w-16 text-right text-muted-foreground">{s.value.toLocaleString()}</span>
            <span className={`flex w-12 items-center justify-end gap-1 text-xs ${s.up ? "text-emerald-600" : "text-rose-600"}`}>
              {s.pct}%
              {s.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            </span>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
