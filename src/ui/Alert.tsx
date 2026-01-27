import { type ReactNode } from "react";
import {
  Info as InfoIcon,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  X as CloseIcon,
} from "lucide-react";

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps {
  children: ReactNode;
  variant?: AlertVariant;
  /**
   * Custom icon element. If provided, it overrides the default Lucide icon.
   *
   * Example:
   *   <Alert icon={<Smile className="w-5 h-5" />}>Hello</Alert>
   */
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
  onClose?: () => void;
}

const Alert = ({
  children,
  variant = "info",
  icon,
  action,
  className = "",
  onClose,
}: AlertProps) => {
  const baseClasses = "alert";

  const variantClasses = {
    info: "alert-info",
    success: "alert-success",
    warning: "alert-warning",
    error: "alert-error",
  } as const;

  const DefaultIcon = {
    info: InfoIcon,
    success: CheckCircle2,
    warning: AlertTriangle,
    error: AlertOctagon,
  }[variant];

  const classes = [baseClasses, variantClasses[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="alert">
      <span className="flex items-center gap-2">
        {icon ?? <DefaultIcon className="h-5 w-5" />}
        <span>{children}</span>
      </span>
      {action && <div>{action}</div>}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost"
          aria-label="Close alert"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;

