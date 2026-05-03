import { WidgetCard } from "./widget-card";

const WITHDRAWS = [
  { name: "Google Adsense", subtitle: "Paypal deposit", amount: 145, badge: "G", bg: "bg-rose-100 text-rose-700" },
  { name: "Github Enterprise", subtitle: "Security & compliance", amount: 1870, badge: "GH", bg: "bg-neutral-200 text-neutral-700" },
  { name: "Upgrade Slack Plan", subtitle: "Debit card deposit", amount: 450, badge: "Sl", bg: "bg-violet-100 text-violet-700" },
  { name: "Digital Ocean", subtitle: "Cloud Hosting", amount: 540, badge: "DO", bg: "bg-sky-100 text-sky-700" },
  { name: "AWS Account", subtitle: "Choosing a Cloud Platform", amount: 21, badge: "AW", bg: "bg-amber-100 text-amber-700" },
];

export function WithdrawWidget() {
  return (
    <WidgetCard
      title="Withdraw"
      action={<button className="text-xs text-violet-600 hover:underline">View All</button>}
    >
      <ul className="flex flex-col gap-4">
        {WITHDRAWS.map((w, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className={`flex h-9 w-9 items-center justify-center rounded-md text-xs font-semibold ${w.bg}`}>
              {w.badge}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{w.name}</p>
              <p className="truncate text-xs text-muted-foreground">{w.subtitle}</p>
            </div>
            <span className="text-sm font-medium text-rose-600">-${w.amount.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
