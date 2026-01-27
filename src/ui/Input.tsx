import { type InputHTMLAttributes, type ReactNode, forwardRef } from "react";

type InputVariant =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

type InputSize = "xs" | "sm" | "md" | "lg";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant;
  size?: InputSize;
  /** Adds a border around the input */
  bordered?: boolean;
  /** Uses the `input-ghost` style from DaisyUI */
  ghost?: boolean;
  label?: string;
  helperText?: string;
  error?: string;
  /** Icon rendered inside the input on the left */
  leftIcon?: ReactNode;
  /** Icon rendered inside the input on the right */
  rightIcon?: ReactNode;
  /** Make the input take full width of its container */
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      size = "md",
      bordered = true,
      ghost = false,
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = "input";

    const variantClasses: Record<InputVariant, string> = {
      neutral: "",
      primary: "input-primary",
      secondary: "input-secondary",
      accent: "input-accent",
      info: "input-info",
      success: "input-success",
      warning: "input-warning",
      error: "input-error",
    };

    const sizeClasses: Record<InputSize, string> = {
      xs: "input-xs",
      sm: "input-sm",
      md: "",
      lg: "input-lg",
    };

    const hasLeftIcon = Boolean(leftIcon);
    const hasRightIcon = Boolean(rightIcon);

    const paddingClasses = [
      hasLeftIcon ? "pl-9" : "",
      hasRightIcon ? "pr-9" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const classes = [
      baseClasses,
      bordered ? "input-bordered" : "",
      ghost ? "input-ghost" : "",
      variant && !error ? variantClasses[variant] : "",
      error ? "input-error" : "",
      sizeClasses[size],
      fullWidth ? "w-full" : "",
      paddingClasses,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const inputElement = (
      <input ref={ref} className={classes} {...props} />
    );

    const showWrapper = Boolean(label || helperText || error || hasLeftIcon || hasRightIcon);

    if (!showWrapper) {
      return inputElement;
    }

    return (
      <div className={`form-control ${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        <div className="relative">
          {hasLeftIcon && (
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              {leftIcon}
            </span>
          )}
          {hasRightIcon && (
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              {rightIcon}
            </span>
          )}
          {inputElement}
        </div>
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

Input.displayName = "Input";

export default Input;

