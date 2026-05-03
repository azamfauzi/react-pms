import { ArrowDown, ArrowUp } from "lucide-react";
import { WidgetCard } from "./widget-card";

const ROWS = [
  { flag: "🇺🇸", country: "United states of america", amount: "$8,656k", pct: 25.8, up: true, sales: "894k" },
  { flag: "🇬🇧", country: "United kingdom", amount: "$2,415k", pct: 6.2, up: false, sales: "645k" },
  { flag: "🇮🇳", country: "India", amount: "$865k", pct: 12.4, up: true, sales: "148k" },
  { flag: "🇯🇵", country: "Japan", amount: "$745k", pct: 11.9, up: false, sales: "86k" },
  { flag: "🇰🇷", country: "Korea", amount: "$45k", pct: 16.2, up: true, sales: "42k" },
  { flag: "🇨🇳", country: "China", amount: "$12k", pct: 14.8, up: false, sales: "8k" },
];

export function SalesByCountriesWidget() {
  return (
    <WidgetCard title="Sales by Countries">
      <ul className="flex flex-col gap-4">
        {ROWS.map((r, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className="text-xl">{r.flag}</span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 text-sm font-medium">
                {r.amount}
                <span className={`flex items-center text-xs ${r.up ? "text-emerald-600" : "text-rose-600"}`}>
                  {r.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {r.pct}%
                </span>
              </p>
              <p className="truncate text-xs text-muted-foreground">{r.country}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{r.sales}</p>
              <p className="text-xs text-muted-foreground">Sales</p>
            </div>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
