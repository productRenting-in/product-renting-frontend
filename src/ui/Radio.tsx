import { type InputHTMLAttributes, forwardRef } from "react";

type RadioVariant =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

type RadioSize = "xs" | "sm" | "md" | "lg";

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: RadioVariant;
  size?: RadioSize;
  label?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      variant = "primary",
      size = "md",
      label,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = "radio";

    const variantClasses = {
      neutral: "",
      primary: "radio-primary",
      secondary: "radio-secondary",
      accent: "radio-accent",
      info: "radio-info",
      success: "radio-success",
      warning: "radio-warning",
      error: "radio-error",
    };

    const sizeClasses = {
      xs: "radio-xs",
      sm: "radio-sm",
      md: "",
      lg: "radio-lg",
    };

    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const radioElement = (
      <input ref={ref} type="radio" className={classes} {...props} />
    );

    if (!label) {
      return radioElement;
    }

    return (
      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-4">
          {radioElement}
          <span className="label-text">{label}</span>
        </label>
      </div>
    );
  }
);

Radio.displayName = "Radio";

export default Radio;

