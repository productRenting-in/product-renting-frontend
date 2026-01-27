import { type ReactNode } from "react";

type SkeletonVariant = "default" | "circle" | "rect";

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
  children?: ReactNode;
}

const Skeleton = ({
  variant = "default",
  width,
  height,
  className = "",
  children,
}: SkeletonProps) => {
  const variantClasses = {
    default: "skeleton",
    circle: "skeleton-circle",
    rect: "skeleton-rect",
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height) style.height = typeof height === "number" ? `${height}px` : height;

  const classes = [variantClasses[variant], className]
    .filter(Boolean)
    .join(" ");

  if (children) {
    return (
      <div className={classes} style={style}>
        {children}
      </div>
    );
  }

  return <div className={classes} style={style}></div>;
};

export default Skeleton;

