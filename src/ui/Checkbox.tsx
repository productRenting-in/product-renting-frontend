import { forwardRef, type InputHTMLAttributes } from "react";
import type { Variant, Size } from "./Button";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: Variant;
  size?: Size;
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ variant = "primary", size = "md", label, className = "", ...rest }, ref) => {
    const colorClass = variant ? `checkbox-${variant}` : "";
    const sizeClass = size === "md" ? "" : `checkbox-${size}`;

    const classes = ["checkbox", colorClass, sizeClass, className].filter(Boolean).join(" ");

    const control = <input ref={ref} type="checkbox" className={classes} {...rest} />;

    if (!label) return control;

    return (
      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-3">
          {control}
          <span className="label-text">{label}</span>
        </label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
