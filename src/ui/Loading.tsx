import type { HTMLAttributes } from "react";

type LoadingStyle = "spinner" | "dots" | "ring" | "ball" | "bars" | "infinity";

type LoadingSize = "xs" | "sm" | "md" | "lg";

export interface LoadingProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: LoadingStyle;
  size?: LoadingSize;
  text?: string;
}

export const Loading = ({ variant = "spinner", size = "md", text, className = "", ...rest }: LoadingProps) => {
  const styleClass = `loading-${variant}`;
  const sizeClass = size === "md" ? "" : `loading-${size}`;

  const spinner = (
    <span className={["loading", styleClass, sizeClass, className].filter(Boolean).join(" ")} {...rest} />
  );

  if (!text) return spinner;

  return (
    <div className="flex items-center gap-2">
      {spinner}
      <span className="text-sm text-base-content/70">{text}</span>
    </div>
  );
};
