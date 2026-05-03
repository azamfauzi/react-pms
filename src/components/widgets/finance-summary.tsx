import { HelpCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { WidgetCard } from "./widget-card";

export function FinanceSummaryWidget() {
  return (
    <WidgetCard
      title="Finance Summary"
      description="Check out each Column for more details"
      action={
        <button className="text-muted-foreground hover:text-foreground" aria-label="Help">
          <HelpCircle className="h-4 w-4" />
        </button>
      }
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Annual Companies Taxes</p>
          <p className="mt-1 text-base font-semibold">$1450.35</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Next Tax Review Date</p>
          <p className="mt-1 text-base font-semibold">July 14, 2021</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Average Product Price</p>
          <p className="mt-1 text-base font-semibold">$85.50</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Satisfaction Rate</p>
          <Progress value={75} className="mt-2" />
          <p className="mt-1 text-xs font-medium">75%</p>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex -space-x-2">
          {["bg-violet-200", "bg-amber-200", "bg-sky-200"].map((bg, i) => (
            <Avatar key={i} className="h-7 w-7 border-2 border-background">
              <AvatarFallback className={`${bg} text-[10px]`}>U{i + 1}</AvatarFallback>
            </Avatar>
          ))}
          <span className="ml-3 self-center text-xs text-muted-foreground">+3</span>
        </div>
        <span className="text-xs text-muted-foreground">5 Days Ago</span>
      </div>
    </WidgetCard>
  );
}
