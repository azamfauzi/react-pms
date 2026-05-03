import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { WidgetCard } from "./widget-card";
import { RadialProgress } from "./radial-progress";

const MEMBERS = [
  { name: "Dean Hogan", role: "iOS developer", project: "Zipcar", projectColor: "bg-violet-100 text-violet-700", tasks: "87/135", progress: 65, ring: "stroke-violet-500", initials: "DH", avatarBg: "bg-violet-100 text-violet-700" },
  { name: "Hilda Rice", role: "Laravel developer", project: "Brandi", projectColor: "bg-emerald-100 text-emerald-700", tasks: "340/420", progress: 81, ring: "stroke-emerald-500", initials: "HR", avatarBg: "bg-emerald-100 text-emerald-700" },
  { name: "Andrew O'Brian", role: "React developer", project: "Payers", projectColor: "bg-amber-100 text-amber-700", tasks: "50/82", progress: 61, ring: "stroke-amber-500", initials: "AO", avatarBg: "bg-amber-100 text-amber-700" },
  { name: "Elanor Price", role: "Angular developer", project: "Bitbank", projectColor: "bg-rose-100 text-rose-700", tasks: "98/260", progress: 38, ring: "stroke-rose-500", initials: "EP", avatarBg: "bg-rose-100 text-rose-700" },
  { name: "Carl Oliver", role: "VueJs developer", project: "Aviato", projectColor: "bg-sky-100 text-sky-700", tasks: "12/25", progress: 48, ring: "stroke-sky-500", initials: "CO", avatarBg: "bg-sky-100 text-sky-700" },
];

export function TeamMembersWidget() {
  return (
    <WidgetCard title="Team Members">
      <div className="mb-3 grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b pb-2 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
        <span>Name</span>
        <span>Project</span>
        <span>Tasks</span>
        <span>Progress</span>
      </div>
      <ul className="flex flex-col gap-4">
        {MEMBERS.map((m, i) => (
          <li key={i} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className={m.avatarBg}>{m.initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{m.name}</p>
                <p className="truncate text-xs text-muted-foreground">{m.role}</p>
              </div>
            </div>
            <Badge variant="secondary" className={`${m.projectColor} border-0`}>
              {m.project}
            </Badge>
            <span className="text-sm">{m.tasks}</span>
            <RadialProgress value={m.progress} size={36} strokeWidth={4} indicatorClassName={m.ring} />
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
