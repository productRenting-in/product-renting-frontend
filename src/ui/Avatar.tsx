import { type ReactNode } from "react";

type AvatarSize = "xs" | "sm" | "md" | "lg";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  shape?: "circle" | "square";
  placeholder?: string | ReactNode;
  status?: "online" | "offline" | "away";
  className?: string;
}

const Avatar = ({
  src,
  alt = "",
  size = "md",
  shape = "circle",
  placeholder,
  status,
  className = "",
}: AvatarProps) => {
  const sizeClasses = {
    xs: "w-8 h-8",
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-lg",
  };

  const statusColors = {
    online: "bg-success",
    offline: "bg-base-300",
    away: "bg-warning",
  };

  const classes = [
    "avatar",
    sizeClasses[size],
    shapeClasses[shape],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="avatar relative">
      <div className={classes}>
        {src ? (
          <img src={src} alt={alt} />
        ) : (
          <div className="bg-neutral text-neutral-content flex items-center justify-center">
            {typeof placeholder === "string" ? (
              <span className="text-xs font-bold">
                {placeholder.slice(0, 2).toUpperCase()}
              </span>
            ) : (
              placeholder
            )}
          </div>
        )}
      </div>
      {status && (
        <div
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-base-100 ${statusColors[status]}`}
        />
      )}
    </div>
  );
};

interface AvatarGroupProps {
  children: ReactNode;
  className?: string;
}

const AvatarGroup = ({ children, className = "" }: AvatarGroupProps) => {
  return (
    <div className={`avatar-group -space-x-4 ${className}`}>{children}</div>
  );
};

export { Avatar, AvatarGroup };

