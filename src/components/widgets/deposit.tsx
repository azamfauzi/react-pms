import { WidgetCard } from "./widget-card";

const DEPOSITS = [
  { name: "Gumroad Account", subtitle: "Sell UI Kit", amount: 4650, badge: "Gu", bg: "bg-pink-100 text-pink-700" },
  { name: "Mastercard", subtitle: "Wallet deposit", amount: 92705, badge: "MC", bg: "bg-amber-100 text-amber-700" },
  { name: "Stripe Account", subtitle: "iOS Application", amount: 957, badge: "St", bg: "bg-violet-100 text-violet-700" },
  { name: "American Bank", subtitle: "Bank Transfer", amount: 6837, badge: "AB", bg: "bg-sky-100 text-sky-700" },
  { name: "Bank Account", subtitle: "Wallet deposit", amount: 446, badge: "BA", bg: "bg-emerald-100 text-emerald-700" },
];

export function DepositWidget() {
  return (
    <WidgetCard
      title="Deposit"
      action={<button className="text-xs text-violet-600 hover:underline">View All</button>}
    >
      <ul className="flex flex-col gap-4">
        {DEPOSITS.map((d, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className={`flex h-9 w-9 items-center justify-center rounded-md text-xs font-semibold ${d.bg}`}>
              {d.badge}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{d.name}</p>
              <p className="truncate text-xs text-muted-foreground">{d.subtitle}</p>
            </div>
            <span className="text-sm font-medium text-emerald-600">+${d.amount.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
