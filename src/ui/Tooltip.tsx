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

interface TooltipProps {
  content: string | ReactNode;
  children: ReactNode;
  position?: TooltipPosition;
  className?: string;
  open?: boolean;
}

const Tooltip = ({
  content,
  children,
  position = "top",
  className = "",
  open,
}: TooltipProps) => {
  const positionClasses = {
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
    "right-end": "tooltip-right tooltip-end",
  };

  const classes = [
    "tooltip",
    positionClasses[position],
    open !== undefined ? (open ? "tooltip-open" : "") : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} data-tip={typeof content === "string" ? content : undefined}>
      {typeof content === "string" ? (
        children
      ) : (
        <>
          {children}
          <div className="tooltip-content">{content}</div>
        </>
      )}
    </div>
  );
};

export default Tooltip;

