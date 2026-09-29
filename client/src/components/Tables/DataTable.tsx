import type { ReactNode } from 'react';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string;
  className?: string;
}

const DataTable = <T,>({ data, columns, rowKey, className = '' }: DataTableProps<T>) => {
  return (
    <table className={`w-full text-left text-xs divide-y divide-slate-200 ${className}`}>
      <thead className="bg-slate-50 text-slate-600 font-semibold text-[11px]">
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)} className={`py-2.5 px-3 ${col.className ?? ''}`}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {data.map((row) => (
          <tr key={rowKey(row)} className="hover:bg-slate-50/70">
            {columns.map((col) => (
              <td key={String(col.key)} className={`py-2.5 px-3 ${col.className ?? ''}`}>
                {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key as string] ?? '')}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
