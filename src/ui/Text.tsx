import { type ReactNode, type HTMLAttributes } from "react";
import type { Variant } from "./Button";

type TextSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";

type TextWeight = "light" | "normal" | "medium" | "semibold" | "bold";

// Use HTMLElement so `as="label"` etc. are type-safe.
export interface TextProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: Variant;
  size?: TextSize;
  weight?: TextWeight;
  italic?: boolean;
  underline?: boolean;
  as?: "p" | "span" | "div" | "label";
}

export const Text = ({
  children,
  variant,
  size = "base",
  weight = "normal",
  italic,
  underline,
  className = "",
  as: Component = "p",
  ...rest
}: TextProps) => {
  const variantClasses: Record<Variant, string> = {
    neutral: "text-neutral",
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    error: "text-error"
  };

  const sizeClasses: Record<TextSize, string> = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl"
  };

  const weightClasses: Record<TextWeight, string> = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold"
  };

  const classes = [
    sizeClasses[size],
    weightClasses[weight],
    variant && variantClasses[variant],
    italic && "italic",
    underline && "underline",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
};
