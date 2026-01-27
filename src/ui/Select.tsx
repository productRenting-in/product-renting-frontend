import { type SelectHTMLAttributes, forwardRef } from "react";

type SelectVariant =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

type SelectSize = "xs" | "sm" | "md" | "lg";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  variant?: SelectVariant;
  size?: SelectSize;
  bordered?: boolean;
  ghost?: boolean;
  label?: string;
  helperText?: string;
  error?: string;
  options: SelectOption[];
  fullWidth?: boolean;
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      variant,
      size = "md",
      bordered = true,
      ghost = false,
      label,
      helperText,
      error,
      options,
      fullWidth = false,
      placeholder,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = "select";

    const variantClasses = {
      neutral: "",
      primary: "select-primary",
      secondary: "select-secondary",
      accent: "select-accent",
      info: "select-info",
      success: "select-success",
      warning: "select-warning",
      error: "select-error",
    };

    const sizeClasses = {
      xs: "select-xs",
      sm: "select-sm",
      md: "",
      lg: "select-lg",
    };

    const classes = [
      baseClasses,
      bordered ? "select-bordered" : "",
      ghost ? "select-ghost" : "",
      variant && !error ? variantClasses[variant] : "",
      error ? "select-error" : "",
      sizeClasses[size],
      fullWidth ? "w-full" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const selectElement = (
      <select ref={ref} className={classes} {...props}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    );

    if (!label && !helperText && !error) {
      return selectElement;
    }

    return (
      <div className={`form-control ${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        {selectElement}
        {(helperText || error) && (
          <label className="label">
            <span className={`label-text-alt ${error ? "text-error" : ""}`}>
              {error || helperText}
            </span>
          </label>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;

