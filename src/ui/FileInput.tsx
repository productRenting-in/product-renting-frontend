import { type InputHTMLAttributes, forwardRef } from "react";

type FileInputVariant =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

type FileInputSize = "xs" | "sm" | "md" | "lg";

interface FileInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: FileInputVariant;
  size?: FileInputSize;
  bordered?: boolean;
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      variant,
      size = "md",
      bordered = true,
      label,
      helperText,
      error,
      fullWidth = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = "file-input";

    const variantClasses = {
      neutral: "",
      primary: "file-input-primary",
      secondary: "file-input-secondary",
      accent: "file-input-accent",
      info: "file-input-info",
      success: "file-input-success",
      warning: "file-input-warning",
      error: "file-input-error",
    };

    const sizeClasses = {
      xs: "file-input-xs",
      sm: "file-input-sm",
      md: "",
      lg: "file-input-lg",
    };

    const classes = [
      baseClasses,
      bordered ? "file-input-bordered" : "",
      variant && !error ? variantClasses[variant] : "",
      error ? "file-input-error" : "",
      sizeClasses[size],
      fullWidth ? "w-full" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const fileInputElement = (
      <input ref={ref} type="file" className={classes} {...props} />
    );

    if (!label && !helperText && !error) {
      return fileInputElement;
    }

    return (
      <div className={`form-control ${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        {fileInputElement}
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

FileInput.displayName = "FileInput";

export default FileInput;

