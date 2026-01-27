import { type ReactNode } from "react";

type DividerVariant = "neutral" | "primary" | "secondary" | "accent";

interface DividerProps {
  text?: string | ReactNode;
  position?: "start" | "center" | "end";
  variant?: DividerVariant;
  vertical?: boolean;
  className?: string;
}

const Divider = ({
  text,
  position = "center",
  variant,
  vertical = false,
  className = "",
}: DividerProps) => {
  const variantClasses = {
    neutral: "",
    primary: "divider-primary",
    secondary: "divider-secondary",
    accent: "divider-accent",
  };

  const positionClasses = {
    start: "divider-start",
    center: "",
    end: "divider-end",
  };

  if (vertical) {
    return (
      <div
        className={`divider divider-vertical ${variant ? variantClasses[variant] : ""} ${className}`}
      >
        {text}
      </div>
    );
  }

  const classes = [
    "divider",
    text ? positionClasses[position] : "",
    variant ? variantClasses[variant] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{text}</div>;
};

export default Divider;

