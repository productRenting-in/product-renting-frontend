type LoadingSize = "xs" | "sm" | "md" | "lg";

type LoadingType = "spinner" | "dots" | "ring" | "ball" | "bars" | "infinity";

interface LoadingProps {
  size?: LoadingSize;
  type?: LoadingType;
  text?: string;
  className?: string;
}

const Loading = ({
  size = "md",
  type = "spinner",
  text,
  className = "",
}: LoadingProps) => {
  const sizeClasses = {
    xs: "loading-xs",
    sm: "loading-sm",
    md: "",
    lg: "loading-lg",
  };

  const classes = [
    "loading",
    `loading-${type}`,
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col items-center gap-2">
      <span className={classes}></span>
      {text && <span className="text-sm text-base-content/70">{text}</span>}
    </div>
  );
};

export default Loading;

