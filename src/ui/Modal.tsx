import { type ReactNode, useEffect, useRef } from "react";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "full";
  closeOnBackdrop?: boolean;
  className?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnBackdrop = true,
  className = ""
}: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (isOpen && !dlg.open) dlg.showModal();
    if (!isOpen && dlg.open) dlg.close();
  }, [isOpen]);

  const sizeClass =
    size === "sm" ? "max-w-sm" : size === "lg" ? "max-w-5xl" : size === "full" ? "max-w-full w-full h-full" : "";

  const handleBackdrop = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (!closeOnBackdrop) return;
    if (e.target === dialogRef.current) onClose();
  };

  return (
    <dialog ref={dialogRef} className="modal" onClick={handleBackdrop} onClose={onClose}>
      <div className={`modal-box ${sizeClass} ${className}`}>
        {title && (
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold">{title}</h3>
            <button type="button" onClick={onClose} className="btn btn-sm btn-circle btn-ghost" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        {children}
        {footer && <div className="modal-action">{footer}</div>}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
