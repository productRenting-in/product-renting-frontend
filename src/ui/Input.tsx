import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import type { Variant, Size } from "./Button";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: Variant;
  size?: Size;
  bordered?: boolean;
  ghost?: boolean;
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      size = "md",
      bordered = true,
      ghost,
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      fullWidth,
      className = "",
      ...rest
    },
    ref
  ) => {
    const variantClass = variant && !error ? `input-${variant}` : "";
    const sizeClass = size === "md" ? "" : `input-${size}`;
    const errorClass = error ? "input-error" : "";

    const hasLeft = !!leftIcon;
    const hasRight = !!rightIcon;
    const padding = [hasLeft && "pl-9", hasRight && "pr-9"].filter(Boolean).join(" ");

    const classes = [
      "input",
      bordered && "input-bordered",
      !bordered && "!border-0 focus:!border-0 focus:ring-0 focus:outline-none",
      ghost && "input-ghost",
      variantClass,
      errorClass,
      sizeClass,
      fullWidth && "w-full",
      "text-base-content",
      "placeholder:text-base-content/60",
      padding,
      className
    ]
      .filter(Boolean)
      .join(" ");

    const inputElement = <input ref={ref} className={classes} {...rest} />;

    const needsWrapper = label || helperText || error || hasLeft || hasRight;

    if (!needsWrapper) return inputElement;

    return (
      <div className={`form-control ${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        <div className="relative">
          {hasLeft && (
            <span className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">{leftIcon}</span>
          )}
          {hasRight && (
            <span className="pointer-events-none absolute inset-y-0 right-3 z-10 flex items-center">{rightIcon}</span>
          )}
          {inputElement}
        </div>
        {(helperText || error) && (
          <label className="label">
            <span className={`label-text-alt ${error ? "text-error" : ""}`}>{error || helperText}</span>
          </label>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
