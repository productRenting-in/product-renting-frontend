import { type HTMLAttributes, type ReactNode, useId, Children, isValidElement, cloneElement } from "react";

type CarouselSnap = "start" | "center" | "end";
type CarouselDirection = "horizontal" | "vertical";

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  /** Snap alignment of items. Default: start */
  snap?: CarouselSnap;
  /** Horizontal or vertical scroll. Default: horizontal */
  direction?: CarouselDirection;
  /** Render indicator buttons (1, 2, 3...) that scroll to each slide. Uses anchor links. */
  showIndicators?: boolean;
  /** Render prev/next arrow buttons overlay. Uses anchor links. */
  showArrows?: boolean;
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
  className = "",
  children,
  id: propId,
  ...rest
}: CarouselProps) => {
  const generatedId = useId();
  const baseId = (propId ?? generatedId).replace(/:/g, "");
  const isVertical = direction === "vertical";

  const childArray = Children.toArray(children).filter(
    (child): child is React.ReactElement =>
      isValidElement(child) && (child.type as { displayName?: string })?.displayName === "CarouselItem"
  );

  const hasItems = childArray.length > 0;
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
