"use client"

import React from "react"
import type { TableBodyProps } from "../../../types/tail-grid-types"
import TableRow from "./TableRow"
import { TableBody as ShadTableBody, TableCell, TableRow as ShadTableRow } from "@/components/ui/table"
import { Loader2 } from "lucide-react"
import { useVirtualization } from "../../../hooks/useVirtualization"
import { motion } from "motion/react"

const TableBody = <T extends Record<string, unknown>>({
  data,
  columns,
  rowKey,
  expandableConfig,
  expandedRows,
  onToggleExpand,
  actions,
  isLoading,
  colSpan,
  customLoadingComponent,
  customNoDataComponent,
  emptyStateMessage = "No data available",
  loadingMessage = "Loading data...",
  virtualized = false,
  rowHeight = 56,
  activeRowIndex,
  onRowClick,
  highlightOnHover = true,
  bodyClassName = "",
  rowClassName = "",
  cellClassName = "",
  onReload,
}: TableBodyProps<T>) => {
  // Virtualization setup
  const virtualization = useVirtualization({
    itemCount: virtualized ? data.length : 0,
    itemHeight: rowHeight,
    overscan: 5,
  })

  const { virtualItems, totalHeight, containerRef } = virtualized
    ? virtualization
    : { virtualItems: [], totalHeight: 0, containerRef: { current: null } }

  if (isLoading && customLoadingComponent) {
    return <ShadTableBody>{customLoadingComponent}</ShadTableBody>
  }

  if (data.length === 0 && customNoDataComponent) {
    return <ShadTableBody>{customNoDataComponent}</ShadTableBody>
  }

  return (
    <ShadTableBody className={bodyClassName}>
      {isLoading ? (
        <ShadTableRow>
          <TableCell colSpan={colSpan} className="h-24 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center gap-2"
            >
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">{loadingMessage}</p>
            </motion.div>
          </TableCell>
        </ShadTableRow>
      ) : data?.length === 0 ? (
        <ShadTableRow>
          <TableCell colSpan={colSpan} className="h-24 text-center">
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-sm font-medium">{emptyStateMessage}</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
            </div>
          </TableCell>
        </ShadTableRow>
      ) : virtualized ? (
        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          style={{ height: "100%", overflow: "auto" }}
          className="relative"
        >
          <div style={{ height: `${totalHeight}px`, position: "relative" }}>
            {virtualItems.map(({ index, start }) => {
              const row = data[index]
              return (
                <div
                  key={row[rowKey] as string}
                  style={{
                    position: "absolute",
                    top: 0,
                    transform: `translateY(${start}px)`,
                    width: "100%",
                  }}
                >
                  <TableRow
                    row={row}
                    columns={columns}
                    expandableConfig={expandableConfig}
                    expanded={expandedRows.includes(row[rowKey] as string)}
                    onToggleExpand={onToggleExpand}
                    actions={actions}
                    rowKey={rowKey}
                    onReload={onReload}
                    isActive={activeRowIndex === index}
                    onClick={onRowClick}
                    highlightOnHover={highlightOnHover}
                    rowClassName={rowClassName}
                    cellClassName={cellClassName}
                  />
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        data.map((row, index) => (
          <TableRow
            key={row[rowKey] as string}
            row={row}
            columns={columns}
            expandableConfig={expandableConfig}
            expanded={expandedRows.includes(row[rowKey] as string)}
            onToggleExpand={onToggleExpand}
            actions={actions}
            rowKey={rowKey}
            onReload={onReload}
            isActive={activeRowIndex === index}
            onClick={onRowClick}
            highlightOnHover={highlightOnHover}
            rowClassName={rowClassName}
            cellClassName={cellClassName}
          />
        ))
      )}
    </ShadTableBody>
  )
}

export default React.memo(TableBody) as typeof TableBody

