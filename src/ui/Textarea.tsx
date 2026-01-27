import { type TextareaHTMLAttributes, forwardRef } from "react";

type TextareaVariant =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

type TextareaSize = "xs" | "sm" | "md" | "lg";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant;
  size?: TextareaSize;
  bordered?: boolean;
  ghost?: boolean;
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant,
      size = "md",
      bordered = true,
      ghost = false,
      label,
      helperText,
      error,
      fullWidth = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = "textarea";

    const variantClasses = {
      neutral: "",
      primary: "textarea-primary",
      secondary: "textarea-secondary",
      accent: "textarea-accent",
      info: "textarea-info",
      success: "textarea-success",
      warning: "textarea-warning",
      error: "textarea-error",
    };

    const sizeClasses = {
      xs: "textarea-xs",
      sm: "textarea-sm",
      md: "",
      lg: "textarea-lg",
    };

    const classes = [
      baseClasses,
      bordered ? "textarea-bordered" : "",
      ghost ? "textarea-ghost" : "",
      variant && !error ? variantClasses[variant] : "",
      error ? "textarea-error" : "",
      sizeClasses[size],
      fullWidth ? "w-full" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const textareaElement = (
      <textarea ref={ref} className={classes} {...props} />
    );

    if (!label && !helperText && !error) {
      return textareaElement;
    }

    return (
      <div className={`form-control ${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        {textareaElement}
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

Textarea.displayName = "Textarea";

export default Textarea;

