import { type ReactNode, useEffect, useRef } from "react";
import { X } from "lucide-react";

type DrawerSide = "left" | "right" | "top" | "bottom";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  side?: DrawerSide;
  className?: string;
  closeOnBackdrop?: boolean;
}

const Drawer = ({
  isOpen,
  onClose,
  children,
  title,
  side = "right",
  className = "",
  closeOnBackdrop = true,
}: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const sideClasses = {
    left: "drawer-open",
    right: "drawer-end drawer-open",
    top: "drawer-open",
    bottom: "drawer-open",
  };

  if (!isOpen) return null;

  return (
    <div className={`drawer ${sideClasses[side]} ${className}`}>
      <input
        id="drawer-toggle"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={() => {}}
      />
      <div className="drawer-content">
        <div
          className="drawer-side"
          onClick={closeOnBackdrop ? onClose : undefined}
        >
          <label
            htmlFor="drawer-toggle"
            className="drawer-overlay"
            onClick={closeOnBackdrop ? onClose : undefined}
          ></label>
          <div
            ref={drawerRef}
            className={`menu p-4 w-80 min-h-full bg-base-200 text-base-content ${
              side === "left" ? "" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <button
                  onClick={onClose}
                  className="btn btn-sm btn-circle btn-ghost"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;

