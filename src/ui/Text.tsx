import { type ReactNode, type HTMLAttributes } from "react";

type TextVariant =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

type TextSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";

type TextWeight = "light" | "normal" | "medium" | "semibold" | "bold";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  italic?: boolean;
  underline?: boolean;
  className?: string;
  as?: "p" | "span" | "div" | "label";
}

const Text = ({
  children,
  variant,
  size = "base",
  weight = "normal",
  italic = false,
  underline = false,
  className = "",
  as: Component = "p",
  ...props
}: TextProps) => {
  const variantClasses = {
    neutral: "text-neutral",
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    error: "text-error",
  };

  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
  };

  const weightClasses = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const classes = [
    variant ? variantClasses[variant] : "",
    sizeClasses[size],
    weightClasses[weight],
    italic ? "italic" : "",
    underline ? "underline" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Text;

