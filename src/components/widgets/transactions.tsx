import { ChevronDown, CreditCard, Wallet, ArrowLeftRight } from "lucide-react";
import { WidgetCard } from "./widget-card";

type Tx = {
  name: string;
  subtitle: string;
  amount: number;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
};

const TXS: Tx[] = [
  { name: "Paypal", subtitle: "Received Money", amount: 24820, icon: Wallet, iconBg: "bg-sky-100", iconColor: "text-sky-600" },
  { name: "Credit Card", subtitle: "Digital Ocean", amount: -1250, icon: CreditCard, iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
  { name: "Mastercard", subtitle: "Netflix", amount: -99, icon: CreditCard, iconBg: "bg-amber-100", iconColor: "text-amber-600" },
  { name: "Wallet", subtitle: "Mac'D", amount: -82, icon: Wallet, iconBg: "bg-violet-100", iconColor: "text-violet-600" },
  { name: "Transfer", subtitle: "Refund", amount: 8934, icon: ArrowLeftRight, iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
  { name: "Wallet", subtitle: "Buy Apple Watch", amount: -399, icon: Wallet, iconBg: "bg-violet-100", iconColor: "text-violet-600" },
];

function fmt(n: number) {
  const sign = n >= 0 ? "+" : "-";
  return `${sign}$${Math.abs(n).toLocaleString()}`;
}

export function TransactionsWidget() {
  return (
    <WidgetCard title="Transactions">
      <ul className="flex flex-col gap-4">
        {TXS.map((tx, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className={`flex h-9 w-9 items-center justify-center rounded-md ${tx.iconBg}`}>
              <tx.icon className={`h-4 w-4 ${tx.iconColor}`} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{tx.name}</p>
              <p className="truncate text-xs text-muted-foreground">{tx.subtitle}</p>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium">
              <span className={tx.amount >= 0 ? "text-emerald-600" : "text-rose-600"}>
                {fmt(tx.amount)}
              </span>
              <ChevronDown className={`h-4 w-4 ${tx.amount >= 0 ? "rotate-180 text-emerald-600" : "text-rose-600"}`} />
            </div>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
