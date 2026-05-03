import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WidgetCard } from "./widget-card";

export function UpgradePlanWidget() {
  return (
    <WidgetCard title="Upgrade Plan">
      <p className="mb-4 text-sm text-muted-foreground">
        Please make the payment to start enjoying all the features of our premium plan as soon as possible.
      </p>

      <div className="mb-4 flex items-center justify-between rounded-lg bg-muted/50 px-3 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-violet-100 text-xs font-semibold text-violet-600">
            Pt
          </span>
          <div>
            <p className="text-sm font-medium">Platinum</p>
            <p className="text-xs text-muted-foreground">Upgrade Plan</p>
          </div>
        </div>
        <p className="text-sm">
          <span className="text-base font-semibold">$5,250</span>
          <span className="text-muted-foreground">/year</span>
        </p>
      </div>

      <p className="mb-2 text-sm font-medium">Payment details</p>

      <div className="mb-3 flex items-center gap-3 rounded-md border px-3 py-2">
        <div className="h-6 w-9 rounded bg-gradient-to-r from-rose-500 to-amber-400" />
        <div className="flex-1 text-sm">
          <p>Credit Card</p>
          <p className="text-xs text-muted-foreground">2566 xxxx xxxx 8908</p>
        </div>
        <Input className="h-8 w-16 text-center" placeholder="CVV" />
      </div>

      <div className="mb-3 flex items-center gap-3 rounded-md border px-3 py-2">
        <div className="h-6 w-9 rounded bg-gradient-to-r from-yellow-500 to-orange-500" />
        <div className="flex-1 text-sm">
          <p>Credit Card</p>
          <p className="text-xs text-muted-foreground">8990 xxxx xxxx 6852</p>
        </div>
        <Input className="h-8 w-16 text-center" placeholder="CVV" />
      </div>

      <button className="mb-3 text-xs text-violet-600 hover:underline">+ Add Payment Method</button>

      <Input className="mb-3" placeholder="john.doe@gmail.com" />
      <Button className="w-full bg-violet-600 hover:bg-violet-700">Contact Now</Button>
    </WidgetCard>
  );
}
