"use client"

import type React from "react"
import type { TableRowProps } from "../../../types/tail-grid-types"
import TableActions from "./TableActions"
import { ChevronDown, ChevronRight } from "lucide-react"
import { TableCell, TableRow as ShadTableRow } from "../../ui/table"

const TableRow: React.FC<TableRowProps> = ({
  row,
  columns,
  expandableConfig,
  expanded,
  onToggleExpand,
  actions,
  rowKey,
  onReload,
}) => {
  const renderExpandedContent = expandableConfig?.enabled && expanded && expandableConfig.renderExpandedContent(row)

  return (
    <>
      <ShadTableRow
        className={`${expandableConfig?.enabled ? "cursor-pointer" : ""} group transition-colors hover:bg-muted/50`}
        onClick={() => expandableConfig?.enabled && onToggleExpand(row[rowKey])}
      >
        {expandableConfig?.enabled && (
          <TableCell className="w-10 p-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-transparent group-hover:border-border">
              {expanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform" />
              )}
            </div>
          </TableCell>
        )}
        {columns.map((column) => (
          <TableCell
            key={`${rowKey}-${column.key}`}
            className={`${
              column.align === "end" ? "text-end" : column.align === "center" ? "text-center" : "text-start"
            }`}
          >
            {column.render ? column.render(row[column.key], row) : row[column.key]}
          </TableCell>
        ))}
        {actions.length > 0 && (
          <TableCell className="p-2">
            <TableActions actions={actions} onReload={onReload} row={row} />
          </TableCell>
        )}
      </ShadTableRow>
      {expandableConfig?.enabled && expanded && (
        <ShadTableRow className="animate-in fade-in-5 zoom-in-95 duration-100">
          <TableCell colSpan={columns.length + 1 + (actions.length > 0 ? 1 : 0)} className="bg-muted/50 p-4">
            <div className="rounded-md border bg-card p-4">{renderExpandedContent}</div>
          </TableCell>
        </ShadTableRow>
      )}
    </>
  )
}

export default TableRow

