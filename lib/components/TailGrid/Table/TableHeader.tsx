"use client"

import type { TableHeaderProps } from "../../../types/tail-grid-types"
import { ArrowDown, ArrowUp } from "lucide-react"
import { TableHead, TableHeader as ShadTableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { memo } from "react"

const TableHeader = <T extends Record<string, unknown>>({
  columns,
  sortConfig,
  hasExpandableRows,
  hasActions,
  onSort,
  sortable,
  stickyHeader = true,
  headerCellClassName = "",
  headerClassName = "",
}: TableHeaderProps<T>) => {
  const handleSort = (key: string) => {
    if (sortable) {
      onSort(key)
    }
  }

  return (
    <ShadTableHeader className={cn(stickyHeader && "sticky top-0 z-10 bg-card", headerClassName)}>
      <TableRow>
        {hasExpandableRows && <TableHead className="w-10"></TableHead>}
        {columns.map((column) => (
          <TableHead
            key={column.key}
            className={cn(
              column.align === "end" ? "text-end" : column.align === "center" ? "text-center" : "text-start",
              sortable && column.sortable ? "cursor-pointer select-none" : "",
              headerCellClassName,
            )}
            onClick={() => sortable && column.sortable && handleSort(column.key)}
            aria-sort={
              sortConfig?.field === column.key
                ? sortConfig.direction === "asc"
                  ? "ascending"
                  : "descending"
                : undefined
            }
          >
            <div className="flex items-center gap-2 group">
              {column.header}
              {sortable && column.sortable && (
                <div className="ml-1 flex h-4 w-4 items-center justify-center">
                  {sortConfig?.field === column.key ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {sortConfig.direction === "asc" ? (
                        <ArrowUp className="h-3.5 w-3.5 text-primary" />
                      ) : (
                        <ArrowDown className="h-3.5 w-3.5 text-primary" />
                      )}
                    </motion.div>
                  ) : (
                    <div className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity">
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

export default memo(TableHeader) as typeof TableHeader

