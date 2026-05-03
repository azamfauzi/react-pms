import { cn } from "@/lib/utils";

type RadialProgressProps = {
  value: number;
  size?: number;
  strokeWidth?: number;
  trackClassName?: string;
  indicatorClassName?: string;
  className?: string;
  children?: React.ReactNode;
};

export function RadialProgress({
  value,
  size = 56,
  strokeWidth = 5,
  trackClassName = "stroke-muted",
  indicatorClassName = "stroke-primary",
  className,
  children,
}: RadialProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={trackClassName}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn("transition-[stroke-dashoffset]", indicatorClassName)}
        />
      </svg>
      {children !== undefined && (
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
          {children}
        </div>
      )}
    </div>
  );
}
