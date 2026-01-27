import { type ReactNode } from "react";

interface StatProps {
  title: string;
  value: string | number | ReactNode;
  desc?: string | ReactNode;
  icon?: ReactNode;
  className?: string;
}

const Stat = ({ title, value, desc, icon, className = "" }: StatProps) => {
  return (
    <div className={`stat ${className}`}>
      {icon && <div className="stat-figure text-primary">{icon}</div>}
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      {desc && <div className="stat-desc">{desc}</div>}
    </div>
  );
};

interface StatsProps {
  children: ReactNode;
  horizontal?: boolean;
  className?: string;
}

const Stats = ({
  children,
  horizontal = false,
  className = "",
}: StatsProps) => {
  const classes = [
    "stats shadow",
    horizontal ? "stats-horizontal" : "stats-vertical",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
};

export { Stats, Stat };

