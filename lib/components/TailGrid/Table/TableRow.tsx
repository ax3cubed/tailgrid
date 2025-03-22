"use client"

import type { TableRowProps } from "../../../types/tail-grid-types"
import TableActions from "./TableActions"
import { ChevronDown, ChevronRight } from "lucide-react"
import { TableCell, TableRow as ShadTableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "motion/react"
import { memo } from "react"

const TableRow = <T extends Record<string, unknown>>({
  row,
  columns,
  expandableConfig,
  expanded,
  onToggleExpand,
  actions,
  rowKey,
  onReload,
  isActive = false,
  onClick,
  highlightOnHover = true,
  rowClassName = "",
  cellClassName = "",
}: TableRowProps<T>) => {
  const renderExpandedContent = expandableConfig?.enabled && expanded && expandableConfig.renderExpandedContent(row)

  const handleRowClick = () => {
    if (expandableConfig?.enabled) {
      onToggleExpand(row[rowKey] as string)
    }
    if (onClick) {
      onClick(row)
    }
  }

  return (
    <>
      <ShadTableRow
        className={cn(
          expandableConfig?.enabled || onClick ? "cursor-pointer" : "",
          "group transition-colors",
          highlightOnHover && "hover:bg-muted/50",
          isActive && "bg-muted/70",
          rowClassName,
        )}
        onClick={handleRowClick}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleRowClick()
          }
        }}
        aria-expanded={expandableConfig?.enabled ? expanded : undefined}
        data-state={isActive ? "active" : undefined}
      >
        {expandableConfig?.enabled && (
          <TableCell className="w-10 p-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-transparent group-hover:border-border">
              <motion.div animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
                {expanded ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </motion.div>
            </div>
          </TableCell>
        )}
        {columns.map((column) => (
          <TableCell
            key={`${rowKey}-${column.key}`}
            className={cn(
              column.align === "end" ? "text-end" : column.align === "center" ? "text-center" : "text-start",
              cellClassName,
            )}
          >
            {column.render ? column.render(row[column.key], row) : (row[column.key] as React.ReactNode)}
          </TableCell>
        ))}
        {actions.length > 0 && (
          <TableCell className="p-2">
            <TableActions actions={actions} onReload={onReload} row={row} />
          </TableCell>
        )}
      </ShadTableRow>
      <AnimatePresence>
        {expandableConfig?.enabled && expanded && (
          <motion.tr
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <TableCell colSpan={columns.length + 1 + (actions.length > 0 ? 1 : 0)} className="bg-muted/50 p-0">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="p-4"
              >
                <div className="rounded-md border bg-card p-4">{renderExpandedContent}</div>
              </motion.div>
            </TableCell>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  )
}

export default memo(TableRow) as typeof TableRow

