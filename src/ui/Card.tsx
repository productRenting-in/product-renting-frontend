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
    <figure className="overflow-hidden">
      <img src={imageSrc} alt={imageAlt} className="w-full object-cover" />
    </figure>
  );

  return (
    <div className={classes} {...rest}>
      {imageTop && imageElement}
      <div className="card-body">
        {title && <h2 className="card-title">{title}</h2>}
        {children}
        {actions && <div className="card-actions justify-end">{actions}</div>}
      </div>
      {!imageTop && imageElement}
    </div>
  );
};
