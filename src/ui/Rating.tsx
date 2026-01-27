type RatingSize = "xs" | "sm" | "md" | "lg";

interface RatingProps {
  value: number;
  max?: number;
  size?: RatingSize;
  readonly?: boolean;
  showValue?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

const Rating = ({
  value,
  max = 5,
  size = "md",
  readonly = false,
  showValue = false,
  onChange,
  className = "",
}: RatingProps) => {
  const sizeClasses = {
    xs: "rating-xs",
    sm: "rating-sm",
    md: "",
    lg: "rating-lg",
  };

  const handleClick = (newValue: number) => {
    if (!readonly && onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={`rating ${sizeClasses[size]} ${className}`}>
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= Math.round(value);

        return (
          <input
            key={i}
            type="radio"
            name="rating"
            className={`mask mask-star-2 ${
              isFilled ? "bg-warning" : "bg-base-300"
            } ${readonly ? "pointer-events-none" : "cursor-pointer"}`}
            checked={starValue === Math.round(value)}
            onChange={() => handleClick(starValue)}
            readOnly={readonly}
          />
        );
      })}
      {showValue && (
        <span className="ml-2 text-sm text-base-content/70">
          {value.toFixed(1)} / {max}
        </span>
      )}
    </div>
  );
};

export default Rating;

