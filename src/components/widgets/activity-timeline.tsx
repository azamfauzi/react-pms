import { FileText, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ActivityTimelineWidget() {
  return (
    <Card className="h-full">
      <div className="-mt-4 h-44 bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500" />
      <CardHeader>
        <CardTitle>Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative space-y-5 border-l border-dashed pl-5">
          <li className="relative">
            <span className="absolute -left-[25px] top-1 h-2.5 w-2.5 rounded-full bg-violet-500 ring-4 ring-violet-100" />
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-medium">12 Invoices have been paid</p>
              <span className="text-xs text-muted-foreground">12 min ago</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Invoices have been paid to the company.</p>
            <div className="mt-2 inline-flex items-center gap-2 rounded-md border bg-muted/50 px-2 py-1 text-xs">
              <FileText className="h-3 w-3" />
              invoice.pdf
            </div>
          </li>
          <li className="relative">
            <span className="absolute -left-[25px] top-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-medium">Client Meeting</p>
              <span className="text-xs text-muted-foreground">45 min ago</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Project meeting with john @10:15am</p>
            <div className="mt-2 flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-amber-100 text-amber-700 text-[10px]">LM</AvatarFallback>
              </Avatar>
              <div className="text-xs">
                <p className="font-medium">Lester McCarthy (Client)</p>
                <p className="text-muted-foreground">CEO of ThemeSelection</p>
              </div>
            </div>
          </li>
          <li className="relative">
            <span className="absolute -left-[25px] top-1 h-2.5 w-2.5 rounded-full bg-amber-500 ring-4 ring-amber-100" />
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-medium">Create a new project for client</p>
              <span className="text-xs text-muted-foreground">2 Day Ago</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">6 team members in a project</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex -space-x-2">
                {["bg-violet-200", "bg-emerald-200", "bg-amber-200"].map((bg, i) => (
                  <Avatar key={i} className="h-6 w-6 border-2 border-background">
                    <AvatarFallback className={`${bg} text-[10px]`}>
                      <Users className="h-3 w-3" />
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">+3</span>
            </div>
          </li>
        </ol>
      </CardContent>
    </Card>
  );
}
