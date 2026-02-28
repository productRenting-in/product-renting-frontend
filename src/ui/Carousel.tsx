import {
  type HTMLAttributes,
  type ReactNode,
  useId,
  Children,
  isValidElement,
  cloneElement,
  useState,
  useEffect,
  useCallback
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselSnap = "start" | "center" | "end";
type CarouselDirection = "horizontal" | "vertical";

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  snap?: CarouselSnap;
  direction?: CarouselDirection;
  showIndicators?: boolean;
  showArrows?: boolean;
  autoPlay?: boolean;
  interval?: number;
  pauseOnHover?: boolean;
  dotIndicators?: boolean;
  children: ReactNode;
}

const snapClass: Record<CarouselSnap, string> = {
  start: "",
  center: "carousel-center",
  end: "carousel-end"
};

export const Carousel = ({
  snap = "start",
  direction = "horizontal",
  showIndicators = false,
  showArrows = false,
  autoPlay = false,
  interval = 5000,
  pauseOnHover = true,
  dotIndicators = false,
  className = "",
  children,
  id: propId,
  ...rest
}: CarouselProps) => {
  const generatedId = useId();
  const baseId = (propId ?? generatedId).replace(/:/g, "");
  const isVertical = direction === "vertical";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const childArray = Children.toArray(children).filter(
    (child): child is React.ReactElement =>
      isValidElement(child) && (child.type as { displayName?: string })?.displayName === "CarouselItem"
  );
  const hasItems = childArray.length > 0;
  const count = childArray.length;

  const goTo = useCallback((index: number) => setCurrentIndex(index), []);
  const next = useCallback(() => setCurrentIndex(i => (i + 1) % count), [count]);
  const prev = useCallback(() => setCurrentIndex(i => (i - 1 + count) % count), [count]);

  useEffect(() => {
    if (!autoPlay || paused || !hasItems) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [autoPlay, paused, hasItems, next, interval]);

  // ── autoPlay mode: fade-transition, JS-controlled ──────────────────────────
  if (autoPlay) {
    return (
      <div
        className={["relative overflow-hidden", className].filter(Boolean).join(" ")}
        onMouseEnter={() => pauseOnHover && setPaused(true)}
        onMouseLeave={() => pauseOnHover && setPaused(false)}
        {...rest}
      >
        {childArray.map((child, index) => {
          const el = child as React.ReactElement<{ children?: ReactNode }>;
          return (
            <div
              key={index}
              className={[
                "absolute inset-0 transition-opacity duration-700",
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              ].join(" ")}
            >
              {el.props?.children}
            </div>
          );
        })}

        {showArrows && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white backdrop-blur-sm transition hover:bg-black/50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white backdrop-blur-sm transition hover:bg-black/50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {showIndicators && (
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {childArray.map((_, index) =>
              dotIndicators ? (
                <button
                  key={index}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={[
                    "h-2 rounded-full transition-all duration-300",
                    index === currentIndex ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
                  ].join(" ")}
                />
              ) : (
                <button
                  key={index}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={["btn btn-xs", index === currentIndex ? "btn-active" : ""].join(" ")}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        )}
      </div>
    );
  }

  // ── default mode: CSS scroll-snap, anchor-link navigation ──────────────────
  const itemsWithIds = hasItems
    ? childArray.map((child, index) =>
        cloneElement(child as React.ReactElement<{ id?: string }>, {
          id: `${baseId}-item-${index}`
        })
      )
    : children;

  const containerClass = [
    "carousel",
    "rounded-box",
    snapClass[snap],
    isVertical && "carousel-vertical",
    isVertical && "h-96",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="w-full">
      <div id={baseId} className={containerClass} data-snap={snap} data-direction={direction} {...rest}>
        {showArrows && hasItems
          ? childArray.map((child, index) => {
              const prevIndex = index === 0 ? childArray.length - 1 : index - 1;
              const nextIndex = index === childArray.length - 1 ? 0 : index + 1;
              const itemId = `${baseId}-item-${index}`;
              const prevId = `${baseId}-item-${prevIndex}`;
              const nextId = `${baseId}-item-${nextIndex}`;
              const el = child as React.ReactElement<{ className?: string; children?: ReactNode }>;
              const itemClass = ["carousel-item relative w-full", el.props?.className].filter(Boolean).join(" ");
              return (
                <div key={itemId} id={itemId} className={itemClass}>
                  {el.props?.children}
                  <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
                    <a href={`#${prevId}`} className="btn btn-circle" aria-label="Previous slide">
                      ‹
                    </a>
                    <a href={`#${nextId}`} className="btn btn-circle" aria-label="Next slide">
                      ›
                    </a>
                  </div>
                </div>
              );
            })
          : itemsWithIds}
      </div>

      {showIndicators && hasItems && (
        <div className="flex w-full justify-center gap-2 py-2">
          {childArray.map((_, index) => (
            <a
              key={index}
              href={`#${baseId}-item-${index}`}
              className="btn btn-xs"
              aria-label={`Go to slide ${index + 1}`}
            >
              {index + 1}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CarouselItemComponent = ({ children, className = "", ...rest }: CarouselItemProps) => {
  const classes = ["carousel-item", className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

CarouselItemComponent.displayName = "CarouselItem";

export const CarouselItem = CarouselItemComponent;

Carousel.Item = CarouselItem;
