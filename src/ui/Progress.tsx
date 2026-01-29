import type { HTMLAttributes } from "react";
import type { Variant } from "./Button";

export interface ProgressProps extends HTMLAttributes<HTMLProgressElement> {
  value: number;
  max?: number;
  variant?: Variant;
  showValue?: boolean;
  label?: string;
}

export const Progress = ({
  value,
  max = 100,
  variant = "primary",
  showValue,
  label,
  className = "",
  ...rest
}: ProgressProps) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const colorClass = `progress-${variant}`;

  return (
    <div className={className}>
      {label && (
        <div className="mb-1 flex items-center justify-between text-sm">
          <span>{label}</span>
          {showValue && <span className="text-base-content/70">{Math.round(pct)}%</span>}
        </div>
      )}
      <progress className={["progress", colorClass, "w-full"].join(" ")} value={value} max={max} {...rest} />
    </div>
  );
};
