import { type ReactNode, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  className?: string;
}

const Carousel = ({
  children,
  autoPlay = false,
  interval = 3000,
  showIndicators = true,
  showArrows = true,
  className = "",
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? children.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === children.length - 1 ? 0 : prev + 1
    );
  };

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && children.length > 1) {
      const timer = setInterval(() => {
        goToNext();
      }, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, children.length]);

  return (
    <div className={`carousel w-full relative ${className}`}>
      <div className="carousel-item relative w-full">
        {children.map((child, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {child}
          </div>
        ))}
      </div>

      {showArrows && children.length > 1 && (
        <>
          <button
            className="btn btn-circle btn-sm absolute left-2 top-1/2 -translate-y-1/2"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            className="btn btn-circle btn-sm absolute right-2 top-1/2 -translate-y-1/2"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {showIndicators && children.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {children.map((_, index) => (
            <button
              key={index}
              className={`btn btn-xs btn-circle ${
                index === currentIndex ? "btn-primary" : "btn-ghost"
              }`}
              onClick={() => goToSlide(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;

