"use client";

import { Check, MapPin } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { WidgetCard } from "./widget-card";

type Order = {
  senderName: string;
  senderAddress: string;
  receiverName: string;
  receiverAddress: string;
};

const NEW: Order[] = [
  {
    senderName: "Micheal Hughes",
    senderAddress: "101 Boulder, California (CA), 933110",
    receiverName: "Daisy Coleman",
    receiverAddress: "939 Orange, California (CA), 910614",
  },
  {
    senderName: "Glenn Todd",
    senderAddress: "1713 Garnet, California (CA), 939573",
    receiverName: "Arthur West",
    receiverAddress: "156 Blaze, California (CA), 925878",
  },
];

function OrderList({ orders }: { orders: Order[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {orders.map((o, i) => (
        <li key={i} className="space-y-2">
          <div className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check className="h-3 w-3" />
            </span>
            <div>
              <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">Sender</p>
              <p className="text-sm font-medium">{o.senderName}</p>
              <p className="text-xs text-muted-foreground">{o.senderAddress}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-violet-600">
              <MapPin className="h-3 w-3" />
            </span>
            <div>
              <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">Receiver</p>
              <p className="text-sm font-medium">{o.receiverName}</p>
              <p className="text-xs text-muted-foreground">{o.receiverAddress}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function OrdersByCountriesWidget() {
  return (
    <WidgetCard
      title="Orders by Countries"
      description="62 deliveries in progress"
    >
      <Tabs defaultValue="new" className="mt-2">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="preparing">Preparing</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>
        <TabsContent value="new" className="mt-4">
          <OrderList orders={NEW} />
        </TabsContent>
        <TabsContent value="preparing" className="mt-4">
          <OrderList orders={NEW.slice(0, 1)} />
        </TabsContent>
        <TabsContent value="shipping" className="mt-4">
          <OrderList orders={NEW.slice(1)} />
        </TabsContent>
      </Tabs>
    </WidgetCard>
  );
}
