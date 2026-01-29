import { type ButtonHTMLAttributes, type ReactNode } from "react";

export type Variant = "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";

export type Size = "xs" | "sm" | "md" | "lg";

type ButtonStyle = "solid" | "outline" | "ghost" | "link";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  styleType?: ButtonStyle;
  fullWidth?: boolean;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  styleType = "solid",
  fullWidth,
  loading,
  iconLeft,
  iconRight,
  className = "",
  disabled,
  ...rest
}: ButtonProps) => {
  const colorClass = `btn-${variant}`;
  const sizeClass = size === "md" ? "" : `btn-${size}`;

  const styleClass =
    styleType === "outline"
      ? `btn-outline ${colorClass}`
      : styleType === "ghost"
        ? "btn-ghost"
        : styleType === "link"
          ? "btn-link"
          : colorClass;

  const classes = [
    "btn",
    styleClass,
    sizeClass,
    fullWidth && "btn-block",
    (disabled || loading) && "btn-disabled",
    loading && "loading",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={disabled || loading} {...rest}>
      {iconLeft && !loading && <span className="mr-1">{iconLeft}</span>}
      {children}
      {iconRight && !loading && <span className="ml-1">{iconRight}</span>}
    </button>
  );
};
