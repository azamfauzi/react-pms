"use client";

import { CalendarDays, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type EventType = "milestone" | "task" | "meeting";

type Event = {
  id: string;
  title: string;
  type: EventType;
  time?: string;
  project?: string;
};

type Day = {
  date: string;
  label: string;
  events: Event[];
};

const DAYS: Day[] = [
  {
    date: "2026-05-01",
    label: "Today · Friday, May 1",
    events: [
      { id: "e1", title: "Sprint planning", type: "meeting", time: "10:00 AM", project: "Mobile App v2" },
      { id: "e2", title: "Migrate users table to UUID", type: "task", project: "API Migration" },
    ],
  },
  {
    date: "2026-05-02",
    label: "Tomorrow · Saturday, May 2",
    events: [
      { id: "e3", title: "Design review", type: "meeting", time: "2:30 PM", project: "Website Revamp" },
    ],
  },
  {
    date: "2026-05-04",
    label: "Monday, May 4",
    events: [
      { id: "e4", title: "Add pagination to projects list", type: "task", project: "Website Revamp" },
      { id: "e5", title: "Q2 milestone: launch beta", type: "milestone", project: "Mobile App v2" },
    ],
  },
  {
    date: "2026-05-08",
    label: "Friday, May 8",
    events: [
      { id: "e6", title: "Set up Cypress for E2E", type: "task", project: "Website Revamp" },
      { id: "e7", title: "All-hands", type: "meeting", time: "4:00 PM" },
    ],
  },
];

const TYPE_LABEL: Record<EventType, string> = {
  milestone: "Milestone",
  task: "Task",
  meeting: "Meeting",
};

function TypeBadge({ type }: { type: EventType }) {
  const variant =
    type === "milestone"
      ? "destructive"
      : type === "meeting"
        ? "default"
        : "secondary";
  return <Badge variant={variant}>{TYPE_LABEL[type]}</Badge>;
}

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Calendar</h1>
        <p className="text-sm text-muted-foreground">
          Upcoming meetings, tasks, and milestones.
        </p>
      </div>

      <div className="space-y-4">
        {DAYS.map((day) => (
          <Card key={day.date}>
            <CardHeader className="flex-row items-center gap-2 pb-3">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">
                {day.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {day.events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between rounded-md border bg-card p-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <TypeBadge type={event.type} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {event.title}
                      </p>
                      {event.project && (
                        <p className="truncate text-xs text-muted-foreground">
                          {event.project}
                        </p>
                      )}
                    </div>
                  </div>
                  {event.time && (
                    <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
