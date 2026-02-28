import { forwardRef, type SelectHTMLAttributes } from "react";

type SelectVariant = "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";

type SelectSize = "xs" | "sm" | "md" | "lg";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
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

const SelectBase = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      variant,
      size = "md",
      bordered = true,
      ghost,
      label,
      helperText,
      error,
      options,
      fullWidth,
      placeholder,
      className = "",
      ...rest
    },
    ref
  ) => {
    const variantClass = variant && !error ? `select-${variant}` : "";
    const sizeClass = size === "md" ? "" : `select-${size}`;
    const errorClass = error ? "select-error" : "";

    const classes = [
      "select",
      bordered && "select-bordered",
      ghost && "select-ghost",
      variantClass,
      errorClass,
      sizeClass,
      fullWidth && "w-full",
      className
    ]
      .filter(Boolean)
      .join(" ");

    const selectElement = (
      <select ref={ref} className={classes} {...rest}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(opt => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
    );

    if (!label && !helperText && !error) return selectElement;

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
            <span className={`label-text-alt ${error ? "text-error" : ""}`}>{error || helperText}</span>
          </label>
        )}
      </div>
    );
  }
);

SelectBase.displayName = "Select";

export default SelectBase;
