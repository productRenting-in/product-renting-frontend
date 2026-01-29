import { type ReactNode } from "react";

interface TableColumn<T> {
  key: keyof T & string;
  header: ReactNode;
  render?: (row: T, index: number) => ReactNode;
  className?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  striped?: boolean;
  hover?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  emptyMessage?: string;
}

export const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  striped,
  hover = true,
  size = "md",
  className = "",
  emptyMessage = "No data"
}: TableProps<T>) => {
  const sizeClass = size === "md" ? "" : size === "lg" ? "table-lg" : `table-${size}`;

  const classes = [
    "table",
    sizeClass,
    striped && "table-zebra",
    !hover && "table-pin-rows", // simple toggle; adjust if needed
    className
  ]
    .filter(Boolean)
    .join(" ");

  if (!data.length) {
    return <div className="py-6 text-center text-base-content/60">{emptyMessage}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className={classes}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} className={col.className}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map(col => (
                <td key={col.key} className={col.className}>
                  {col.render ? col.render(row, rowIndex) : (row[col.key] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
