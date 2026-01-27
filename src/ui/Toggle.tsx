import { type InputHTMLAttributes, forwardRef } from "react";

type ToggleVariant =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

type ToggleSize = "xs" | "sm" | "md" | "lg";

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: ToggleVariant;
  size?: ToggleSize;
  label?: string;
  labelPosition?: "left" | "right";
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      variant = "primary",
      size = "md",
      label,
      labelPosition = "right",
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = "toggle";

    const variantClasses = {
      neutral: "",
      primary: "toggle-primary",
      secondary: "toggle-secondary",
      accent: "toggle-accent",
      info: "toggle-info",
      success: "toggle-success",
      warning: "toggle-warning",
      error: "toggle-error",
    };

    const sizeClasses = {
      xs: "toggle-xs",
      sm: "toggle-sm",
      md: "",
      lg: "toggle-lg",
    };

    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const toggleElement = (
      <input ref={ref} type="checkbox" className={classes} {...props} />
    );

    if (!label) {
      return toggleElement;
    }

    return (
      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-4">
          {labelPosition === "left" && (
            <span className="label-text">{label}</span>
          )}
          {toggleElement}
          {labelPosition === "right" && (
            <span className="label-text">{label}</span>
          )}
        </label>
      </div>
    );
  }
);

Toggle.displayName = "Toggle";

export default Toggle;

