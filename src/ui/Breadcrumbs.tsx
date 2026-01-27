import { type ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
}

const Breadcrumbs = ({
  items,
  separator,
  className = "",
}: BreadcrumbsProps) => {
  const defaultSeparator = <ChevronRight className="h-4 w-4" />;

  return (
    <div className={`breadcrumbs text-sm ${className}`}>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {index < items.length - 1 ? (
              item.href ? (
                <a href={item.href} className="flex items-center gap-1">
                  {item.icon && item.icon}
                  {item.label}
                </a>
              ) : (
                <span className="flex items-center gap-1">
                  {item.icon && item.icon}
                  {item.label}
                </span>
              )
            ) : (
              <span className="flex items-center gap-1">
                {item.icon && item.icon}
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="mx-2">
                {separator || defaultSeparator}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;

