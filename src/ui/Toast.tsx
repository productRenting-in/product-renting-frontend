import { type ReactNode, useEffect } from "react";
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";

type ToastVariant = "info" | "success" | "warning" | "error";

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onClose?: () => void;
  action?: ReactNode;
  className?: string;
}

const Toast = ({
  message,
  variant = "info",
  duration = 3000,
  onClose,
  action,
  className = "",
}: ToastProps) => {
  useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const variantIcons = {
    info: <Info className="h-5 w-5" />,
    success: <CheckCircle2 className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
  };

  const variantClasses = {
    info: "alert-info",
    success: "alert-success",
    warning: "alert-warning",
    error: "alert-error",
  };

  return (
    <div
      className={`alert ${variantClasses[variant]} shadow-lg ${className}`}
      role="alert"
    >
      {variantIcons[variant]}
      <span>{message}</span>
      {action && <div>{action}</div>}
      {onClose && (
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

interface ToastContainerProps {
  children: ReactNode;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  className?: string;
}

const ToastContainer = ({
  children,
  position = "top-right",
  className = "",
}: ToastContainerProps) => {
  const positionClasses = {
    "top-left": "toast-start",
    "top-center": "toast-center toast-top",
    "top-right": "toast-end toast-top",
    "bottom-left": "toast-start toast-bottom",
    "bottom-center": "toast-center toast-bottom",
    "bottom-right": "toast-end toast-bottom",
  };

  return (
    <div className={`toast ${positionClasses[position]} ${className}`}>
      {children}
    </div>
  );
};

export { Toast, ToastContainer };

