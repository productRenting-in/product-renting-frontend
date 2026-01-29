import { type ReactNode } from "react";

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg";
  status?: "online" | "offline" | "away";
  fallback?: ReactNode;
}

export const Avatar = ({ src, alt = "", size = "md", status, fallback }: AvatarProps) => {
  const sizeClass = size === "xs" ? "w-6 h-6" : size === "sm" ? "w-8 h-8" : size === "lg" ? "w-14 h-14" : "w-10 h-10";

  const statusClass =
    status === "online"
      ? "avatar-online"
      : status === "offline"
        ? "avatar-offline"
        : status === "away"
          ? "avatar-offline"
          : "";

  return (
    <div className={`avatar ${statusClass}`}>
      <div className={`${sizeClass} rounded-full`}>
        {src ? (
          <img src={src} alt={alt} />
        ) : (
          <div className="bg-neutral text-neutral-content flex h-full w-full items-center justify-center">
            {fallback}
          </div>
        )}
      </div>
    </div>
  );
};

export interface AvatarGroupProps {
  children: ReactNode;
  className?: string;
}

export const AvatarGroup = ({ children, className = "" }: AvatarGroupProps) => (
  <div className={`avatar-group -space-x-3 ${className}`}>{children}</div>
);
