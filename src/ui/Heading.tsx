import { type ReactNode, type HTMLAttributes } from "react";
import type { Variant } from "./Button";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  level?: HeadingLevel;
  variant?: Variant;
}

export const Heading = ({ children, level = "h2", variant, className = "", ...rest }: HeadingProps) => {
  const Component = level;

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

  const levelClasses: Record<HeadingLevel, string> = {
    h1: "text-5xl font-bold",
    h2: "text-4xl font-bold",
    h3: "text-3xl font-bold",
    h4: "text-2xl font-bold",
    h5: "text-xl font-bold",
    h6: "text-lg font-bold"
  };

  const classes = [levelClasses[level], variant && variantClasses[variant], className].filter(Boolean).join(" ");

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
};
