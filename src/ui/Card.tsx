import { type ReactNode, type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  title?: string;
  image?: string;
  imageAlt?: string;
  imageBgColor?: string;
  actions?: ReactNode;
  badge?: ReactNode;
  rating?: number;
  reviews?: number;
  price?: string | number;
  originalPrice?: string | number;
  bordered?: boolean;
  shadow?: boolean | "sm" | "md" | "lg" | "xl";
  compact?: boolean;
  side?: boolean;
  className?: string;
}

const Card = ({
  children,
  title,
  image,
  imageAlt = "",
  imageBgColor,
  actions,
  badge,
  rating,
  reviews,
  price,
  originalPrice,
  bordered = false,
  shadow = true,
  compact = false,
  side = false,
  className = "",
  ...props
}: CardProps) => {
  const baseClasses = "card bg-base-100";

  const shadowClasses = {
    true: "shadow-xl",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    false: "",
  };

  const classes = [
    baseClasses,
    bordered ? "card-bordered" : "",
    shadow ? shadowClasses[shadow === true ? "true" : shadow] : "",
    compact ? "card-compact" : "",
    side ? "card-side" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <span key={index} className="text-warning text-lg">
            {index < rating ? "★" : "☆"}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={classes} {...props}>
      {image && (
        <figure
          className="relative"
          style={imageBgColor ? { backgroundColor: imageBgColor } : undefined}
        >
          <img src={image} alt={imageAlt} className="w-full object-cover" />
          {badge && (
            <div className="absolute top-4 right-4">
              {badge}
            </div>
          )}
        </figure>
      )}
      <div className="card-body">
        {title && (
          <div className="flex justify-between items-start">
            <h2 className="card-title text-[#6B4423]">{title}</h2>
            {badge && !image && badge}
          </div>
        )}

        {rating !== undefined && (
          <div className="flex items-center gap-2">
            {renderStars(rating)}
            {reviews !== undefined && (
              <span className="text-base-content/60 text-sm">
                {reviews} reviews
              </span>
            )}
          </div>
        )}

        {children}

        {(price || originalPrice) && (
          <div className="flex items-center gap-2 mt-2">
            {price && (
              <span className="text-3xl font-bold text-[#6B4423]">
                ${price}
              </span>
            )}
            {originalPrice && (
              <span className="text-lg text-base-content/40 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
        )}

        {actions && <div className="card-actions justify-end">{actions}</div>}
      </div>
    </div>
  );
};

export default Card;
