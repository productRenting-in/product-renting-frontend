import { type ReactNode } from "react";

interface TableColumn<T = Record<string, unknown>> {
  key: string;
  header: string | ReactNode;
  render?: (row: T, index: number) => ReactNode;
  className?: string;
}

interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  striped?: boolean;
  hover?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  emptyMessage?: string;
}

const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  striped = false,
  hover = true,
  size = "md",
  className = "",
  emptyMessage = "No data available",
}: TableProps<T>) => {
  const sizeClasses = {
    xs: "table-xs",
    sm: "table-sm",
    md: "",
    lg: "table-lg",
  };

  const classes = [
    "table",
    sizeClasses[size],
    striped ? "table-zebra" : "",
    hover ? "" : "table-no-hover",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-base-content/70">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className={classes}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={column.className}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column.key} className={column.className}>
                  {column.render
                    ? column.render(row, rowIndex)
                    : (row[column.key] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

