import { type ReactNode } from "react";

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  icon?: ReactNode;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs = ({ items, className = "" }: BreadcrumbsProps) => {
  return (
    <nav className={`breadcrumbs text-sm ${className}`} aria-label="Breadcrumb">
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            {item.href ? (
              <a href={item.href} className="flex items-center gap-1">
                {item.icon}
                {item.label}
              </a>
            ) : (
              <span className="flex items-center gap-1">
                {item.icon}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
