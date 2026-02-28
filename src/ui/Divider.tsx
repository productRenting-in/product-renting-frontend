import { type ReactNode } from "react";

type DividerColor = "neutral" | "primary" | "secondary" | "accent" | "success" | "warning" | "info" | "error";

export interface DividerProps {
  children?: ReactNode;
  color?: DividerColor;
  vertical?: boolean;
  align?: "start" | "center" | "end";
  className?: string;
}

export const Divider = ({ children, color, vertical, align = "center", className = "" }: DividerProps) => {
  const colorClass = color ? `divider-${color}` : "";
  const alignClass = align === "start" ? "divider-start" : align === "end" ? "divider-end" : "";

  if (vertical) {
    return <div className={`divider divider-vertical ${colorClass} ${className}`}>{children}</div>;
  }

  return <div className={`divider ${colorClass} ${alignClass} ${className}`}>{children}</div>;
};
