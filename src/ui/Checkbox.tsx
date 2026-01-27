import { type InputHTMLAttributes, forwardRef } from "react";

type CheckboxVariant =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

type CheckboxSize = "xs" | "sm" | "md" | "lg";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  label?: string;
  indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      variant = "primary",
      size = "md",
      label,
      indeterminate = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = "checkbox";

    const variantClasses = {
      neutral: "",
      primary: "checkbox-primary",
      secondary: "checkbox-secondary",
      accent: "checkbox-accent",
      info: "checkbox-info",
      success: "checkbox-success",
      warning: "checkbox-warning",
      error: "checkbox-error",
    };

    const sizeClasses = {
      xs: "checkbox-xs",
      sm: "checkbox-sm",
      md: "",
      lg: "checkbox-lg",
    };

    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const checkboxElement = (
      <input ref={ref} type="checkbox" className={classes} {...props} />
    );

    if (!label) {
      return checkboxElement;
    }

    return (
      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-4">
          {checkboxElement}
          <span className="label-text">{label}</span>
        </label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;

