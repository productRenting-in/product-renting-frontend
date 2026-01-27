type ProgressVariant =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

type ProgressSize = "xs" | "sm" | "md" | "lg";

interface ProgressProps {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  showValue?: boolean;
  label?: string;
  className?: string;
}

const Progress = ({
  value,
  max = 100,
  variant = "primary",
  size = "md",
  showValue = false,
  label,
  className = "",
}: ProgressProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const variantClasses = {
    neutral: "",
    primary: "progress-primary",
    secondary: "progress-secondary",
    accent: "progress-accent",
    info: "progress-info",
    success: "progress-success",
    warning: "progress-warning",
    error: "progress-error",
  };

  const sizeClasses = {
    xs: "progress-xs",
    sm: "progress-sm",
    md: "",
    lg: "progress-lg",
  };

  const classes = [
    "progress",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">{label}</span>
          {showValue && (
            <span className="text-sm text-base-content/70">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <progress
        className={classes}
        value={value}
        max={max}
        aria-label={label || "Progress"}
      >
        {showValue && !label && `${Math.round(percentage)}%`}
      </progress>
    </div>
  );
};

export default Progress;

