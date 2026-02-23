import { type HTMLAttributes, type ReactNode } from "react";

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  actions?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imageTop?: boolean;
  compact?: boolean;
  bordered?: boolean;
  shadow?: string | boolean;
  bodyClassName?: string;
  imageClassName?: string;
}

export const Card = ({
  title,
  actions,
  imageSrc,
  imageAlt = "",
  imageTop = true,
  compact,
  bordered,
  shadow = true,
  bodyClassName,
  imageClassName,
  className = "",
  children,
  ...rest
}: CardProps) => {
  const classes = [
    "card",
    "bg-base-100",
    "rounded-[24px]",
    "overflow-hidden",
    bordered && "border border-base-300",
    shadow && "shadow-lg",
    compact && "card-compact",
    className
  ]
    .filter(Boolean)
    .join(" ");

  const imageElement = imageSrc && (
    <figure className={["overflow-hidden", imageClassName].filter(Boolean).join(" ")}>
      <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
    </figure>
  );

  return (
    <div className={classes} {...rest}>
      {imageTop && imageElement}
      <div className={["card-body", bodyClassName].filter(Boolean).join(" ")}>
        {title && <h2 className="card-title">{title}</h2>}
        {children}
        {actions && <div className="card-actions justify-end">{actions}</div>}
      </div>
      {!imageTop && imageElement}
    </div>
  );
};
