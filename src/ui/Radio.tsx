import { forwardRef, type InputHTMLAttributes } from "react";
import type { Variant, Size } from "./Button";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: Variant;
  size?: Size;
  label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ variant = "primary", size = "md", label, className = "", ...rest }, ref) => {
    const colorClass = variant ? `radio-${variant}` : "";
    const sizeClass = size === "md" ? "" : `radio-${size}`;

    const classes = ["radio", colorClass, sizeClass, className].filter(Boolean).join(" ");

    const control = <input ref={ref} type="radio" className={classes} {...rest} />;

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

Radio.displayName = "Radio";
