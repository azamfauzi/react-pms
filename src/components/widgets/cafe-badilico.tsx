import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TIMES = ["5:30PM", "7:00PM", "7:15PM"];

export function CafeBadilicoWidget() {
  return (
    <Card className="h-full">
      <div className="-mt-4 h-44 bg-gradient-to-br from-emerald-200 via-teal-300 to-cyan-400" />
      <CardHeader>
        <CardTitle>Cafe Badilico</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm">
          {Array.from({ length: 4 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
          <Star className="h-4 w-4 text-amber-400" />
          <span className="ml-1 text-xs text-muted-foreground">4 Star (12.4k)</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Italian</p>
        <p className="mt-3 text-xs text-muted-foreground">
          The refrigerated dairy aisle of your local grocery store can be a great source tasty,
          convenient selections for your.
        </p>
        <p className="mt-4 text-sm font-medium">Tonight&apos;s availability</p>
        <div className="mt-2 flex gap-2">
          {TIMES.map((t) => (
            <button
              key={t}
              className="rounded-md border bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700 hover:bg-violet-100"
            >
              {t}
            </button>
          ))}
        </div>
        <Button className="mt-5 w-full bg-violet-600 hover:bg-violet-700">Book Now</Button>
      </CardContent>
    </Card>
  );
}
