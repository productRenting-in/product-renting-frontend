import { forwardRef, type TextareaHTMLAttributes } from "react";
import type { Variant, Size } from "./Button";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: Variant;
  size?: Size;
  bordered?: boolean;
  ghost?: boolean;
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { variant, size = "md", bordered = true, ghost, label, helperText, error, fullWidth, className = "", ...rest },
    ref
  ) => {
    const variantClass = variant && !error ? `textarea-${variant}` : "";
    const sizeClass = size === "md" ? "" : `textarea-${size}`;
    const errorClass = error ? "textarea-error" : "";

    const classes = [
      "textarea",
      bordered && "textarea-bordered",
      ghost && "textarea-ghost",
      variantClass,
      errorClass,
      sizeClass,
      fullWidth && "w-full",
      className
    ]
      .filter(Boolean)
      .join(" ");

    const field = <textarea ref={ref} className={classes} {...rest} />;

    if (!label && !helperText && !error) return field;

    return (
      <div className={`form-control ${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        {field}
        {(helperText || error) && (
          <label className="label">
            <span className={`label-text-alt ${error ? "text-error" : ""}`}>{error || helperText}</span>
          </label>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
