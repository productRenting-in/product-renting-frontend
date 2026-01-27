import { type InputHTMLAttributes, forwardRef } from "react";

type RangeVariant =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

type RangeSize = "xs" | "sm" | "md" | "lg";

interface RangeProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: RangeVariant;
  size?: RangeSize;
  label?: string;
  showValue?: boolean;
  fullWidth?: boolean;
}

const Range = forwardRef<HTMLInputElement, RangeProps>(
  (
    {
      variant = "primary",
      size = "md",
      label,
      showValue = false,
      fullWidth = false,
      className = "",
      value,
      ...props
    },
    ref
  ) => {
    const baseClasses = "range";

    const variantClasses = {
      neutral: "",
      primary: "range-primary",
      secondary: "range-secondary",
      accent: "range-accent",
      info: "range-info",
      success: "range-success",
      warning: "range-warning",
      error: "range-error",
    };

    const sizeClasses = {
      xs: "range-xs",
      sm: "range-sm",
      md: "",
      lg: "range-lg",
    };

    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      fullWidth ? "w-full" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const rangeElement = (
      <input ref={ref} type="range" className={classes} value={value} {...props} />
    );

    if (!label && !showValue) {
      return rangeElement;
    }

    return (
      <div className={`form-control ${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
            {showValue && (
              <span className="label-text-alt">{value || 0}</span>
            )}
          </label>
        )}
        {rangeElement}
        {showValue && !label && (
          <div className="flex justify-between text-xs px-2">
            <span>{props.min || 0}</span>
            <span>{value || 0}</span>
            <span>{props.max || 100}</span>
          </div>
        )}
      </div>
    );
  }
);

Range.displayName = "Range";

export default Range;

