import { type ReactNode } from "react";

type TooltipPosition =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end";

export interface TooltipProps {
  content: string | ReactNode;
  position?: TooltipPosition;
  className?: string;
  children: ReactNode;
}

export const Tooltip = ({ content, position = "top", className = "", children }: TooltipProps) => {
  const basePosition: Record<TooltipPosition, string> = {
    top: "tooltip-top",
    bottom: "tooltip-bottom",
    left: "tooltip-left",
    right: "tooltip-right",
    "top-start": "tooltip-top tooltip-start",
    "top-end": "tooltip-top tooltip-end",
    "bottom-start": "tooltip-bottom tooltip-start",
    "bottom-end": "tooltip-bottom tooltip-end",
    "left-start": "tooltip-left tooltip-start",
    "left-end": "tooltip-left tooltip-end",
    "right-start": "tooltip-right tooltip-start",
    "right-end": "tooltip-right tooltip-end"
  };

  const tooltipClasses = ["tooltip", basePosition[position], className].filter(Boolean).join(" ");

  return typeof content === "string" ? (
    <div className={tooltipClasses} data-tip={content}>
      {children}
    </div>
  ) : (
    <div className={tooltipClasses}>
      {children}
      <div className="tooltip-content">{content}</div>
    </div>
  );
};
