import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant =
  | "neutral"
  | "ghost"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

type ButtonSize = "xs" | "sm" | "md" | "lg";

type ButtonType = "solid" | "outline" | "ghost" | "link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  buttonType?: ButtonType;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const Button = ({
  children,
  variant = "neutral",
  size = "md",
  buttonType = "solid",
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) => {
  const baseClasses = "btn";

  const variantClasses = {
    neutral: "btn-neutral",
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    info: "btn-info",
    success: "btn-success",
    warning: "btn-warning",
    error: "btn-error",
  };

  const sizeClasses = {
    xs: "btn-xs",
    sm: "btn-sm",
    md: "",
    lg: "btn-lg",
  };

  const typeClasses = {
    solid: "",
    outline: "btn-outline",
    ghost: "btn-ghost",
    link: "btn-link",
  };

  const classes = [
    baseClasses,
    buttonType !== "solid" ? typeClasses[buttonType] : variantClasses[variant],
    buttonType === "outline" ? variantClasses[variant] : "",
    sizeClasses[size],
    fullWidth ? "btn-block" : "",
    loading ? "btn-disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && <span className="loading loading-spinner"></span>}
      {icon && !loading && icon}
      {children}
    </button>
  );
};

export default Button;

