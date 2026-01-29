import { type ReactNode } from "react";
import type { Variant, Size } from "./Button";

export interface BadgeProps {
  children: ReactNode;
  variant?: Variant | "ghost";
  size?: Size;
  outline?: boolean;
  iconLeft?: ReactNode;
  className?: string;
}

export const Badge = ({
  children,
  variant = "neutral",
  size = "md",
  outline,
  iconLeft,
  className = ""
}: BadgeProps) => {
  const variantClass = variant === "ghost" ? "badge-ghost" : `badge-${variant}`;
  const sizeClass = size === "md" ? "" : `badge-${size}`;

  const classes = ["badge", variantClass, sizeClass, outline && "badge-outline", className].filter(Boolean).join(" ");

  return (
    <span className={classes}>
      {iconLeft && <span className="mr-1">{iconLeft}</span>}
      {children}
    </span>
  );
};
