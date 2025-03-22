"use client"

import type React from "react"
import type { TableHeaderProps } from "../../../types/tail-grid-types"
import { ArrowDown, ArrowUp } from "lucide-react"
import { TableHead, TableHeader as ShadTableHeader, TableRow } from "../../ui/table"

const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  sortConfig,
  hasExpandableRows,
  hasActions,
  onSort,
  sortable,
}) => {
  const handleSort = (key: string) => {
    if (sortable) {
      const direction = sortConfig?.direction === "asc" ? "desc" : "asc"
      onSort(key, direction)
    }
  }

  return (
    <ShadTableHeader>
      <TableRow>
        {hasExpandableRows && <TableHead className="w-10"></TableHead>}
        {columns.map((column) => (
          <TableHead
            key={column.key}
            className={`${
              column.align === "end" ? "text-end" : column.align === "center" ? "text-center" : "text-start"
            } ${sortable && column.sortable ? "cursor-pointer select-none" : ""}`}
            onClick={() => sortable && column.sortable && handleSort(column.key)}
          >
            <div className="flex items-center gap-2">
              {column.header}
              {sortable && column.sortable && (
                <div className="ml-1 flex h-4 w-4 items-center justify-center">
                  {sortConfig?.field === column.key ? (
                    sortConfig.direction === "asc" ? (
                      <ArrowUp className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <ArrowDown className="h-3.5 w-3.5 text-primary" />
                    )
                  ) : (
                    <div className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50">
                      <ArrowUp className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </TableHead>
        ))}
        {hasActions && <TableHead className="text-end w-[100px]">Actions</TableHead>}
      </TableRow>
    </ShadTableHeader>
  )
}

export default TableHeader

