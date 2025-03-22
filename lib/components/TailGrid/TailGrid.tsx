"use client"

import React, { useCallback, useMemo } from "react"
import { useTailGrid } from "../../hooks/useTailGrid"
import PaginationControls from "./Pagination/PaginationControls"
import TableBody from "./Table/TableBody"
import type { TailGridProps } from "../../types/tail-grid-types"
import FiltersPanel from "./Filters/FiltersPanel"
import TableHeader from "./Table/TableHeader"
import { ErrorBoundary } from "./ErrorBoundary"
import { TailGridProvider } from "../../context/TailGridContext"
import { AnimatePresence, motion } from "motion/react"
import "@/styles/globals.css"

const TailGrid = <T extends Record<string, unknown>>({
  initialData = [],
  columns,
  title,
  subtitle,
  filterFields = [],
  actions = [],
  sortable = true,
  pagination = true,
  pageSizeOptions = [5, 10, 25, 50, 100],
  defaultPageSize = 10,
  onDataFetch,
  onServerFilter,
  onServerSort,
  className,
  expandableConfig,
  hasFilterCapability = true,
  customFilterComponent,
  isServerSide = false,
  onServerSearch,
  rowKey = "id" as keyof T & string,
  showHeader = true,
  customLoadingComponent,
  customNoDataComponent,
  virtualized = false,
  rowHeight = 56,
  emptyStateMessage = "No data available",
  loadingMessage = "Loading data...",
  keyboardNavigation = true,
  onRowClick,
  highlightOnHover = true,
  stickyHeader = true,
  maxHeight,
  containerClassName = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
  rowClassName = "",
  cellClassName = "",
  headerCellClassName = "",
}: TailGridProps<T>) => {
  const {
    data: tableData,
    isLoading,
    currentPage,
    pageSize,
    totalCount,
    totalPages,
    handleFilterChange,
    handleSortChange,
    handleSearchChange,
    setCurrentPage,
    setPageSize,
    expandedRows,
    toggleExpand,
    filters,
    searchTerm,
    sortConfig,
  
    resetFilters,
    activeRowIndex,
    setActiveRowIndex,
    handleKeyDown,
  } = useTailGrid<T>({
    initialData,
    filterFields,
    onDataFetch,
    onServerFilter,
    columns,
    sortable,
    actions,
    className,
    customLoadingComponent,
    customNoDataComponent,
    isServerSide,
    pageSizeOptions,
    pagination,
    rowKey,
    showHeader,
    subtitle,
    title,
    customFilterComponent,
    expandableConfig,
    hasFilterCapability,
    onServerSort,
    onServerSearch,
    defaultPageSize,
    keyboardNavigation,
  })

  const contextValue = useMemo(
    () => ({
      data: tableData,
      isLoading,
      currentPage,
      pageSize,
      totalCount,
      totalPages,
      filters,
      searchTerm,
      sortConfig,
      expandedRows,
      activeRowIndex,
      rowKey: rowKey as string,
      handleFilterChange,
      handleSortChange,
      handleSearchChange,
      setCurrentPage,
      setPageSize,
      toggleExpand,
      resetFilters,
      setActiveRowIndex,
    }),
    [
      tableData,
      isLoading,
      currentPage,
      pageSize,
      totalCount,
      totalPages,
      filters,
      searchTerm,
      sortConfig,
      expandedRows,
      activeRowIndex,
      rowKey,
      handleFilterChange,
      handleSortChange,
      handleSearchChange,
      setCurrentPage,
      setPageSize,
      toggleExpand,
      resetFilters,
      setActiveRowIndex,
    ],
  )

  const handleReload = useCallback(async () => {
    if (onDataFetch) await onDataFetch(currentPage, pageSize)
  }, [currentPage, pageSize, onDataFetch])

  const colSpan = useMemo(
    () => columns.length + (expandableConfig?.enabled ? 1 : 0) + (actions.length > 0 ? 1 : 0),
    [columns.length, expandableConfig?.enabled, actions.length],
  )

  return (
    <ErrorBoundary>
      <TailGridProvider value={contextValue}>
        <div
          className={`w-full space-y-6 ${containerClassName}`}
          onKeyDown={keyboardNavigation ? handleKeyDown : undefined}
          tabIndex={keyboardNavigation ? 0 : undefined}
          role="grid"
          aria-rowcount={tableData.length}
          aria-colcount={columns.length}
          aria-busy={isLoading}
          aria-label={title || "Data table"}
        >
          {/* Header */}
          {(title || subtitle) && (
            <div className="space-y-1">
              {title && <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>}
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          )}

          {/* Filters Card */}
          {hasFilterCapability && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiltersPanel
                  filters={filters}
                  filterFields={filterFields}
                  onFilterChange={handleFilterChange}
                  onSearchChange={handleSearchChange}
                  searchTerm={searchTerm}
                  customFilterComponent={customFilterComponent}
                  data={tableData}
                  onResetFilters={resetFilters}
                />
              </motion.div>
            </AnimatePresence>
          )}

          {/* Data Table */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="overflow-hidden">
              <div
                className="relative w-full overflow-auto"
                style={{ maxHeight: maxHeight ? `${maxHeight}px` : undefined }}
              >
                <table className="w-full caption-bottom text-sm">
                  {/* Table Header */}
                  {showHeader && (
                    <TableHeader
                      sortable={sortable}
                      hasExpandableRows={expandableConfig?.enabled || false}
                      columns={columns}
                      sortConfig={sortConfig}
                      hasActions={actions?.length > 0 ? true : false}
                      onSort={handleSortChange}
                      stickyHeader={stickyHeader}
                      headerCellClassName={headerCellClassName}
                      headerClassName={headerClassName}
                    />
                  )}
                  <TableBody
                    data={tableData}
                    columns={columns}
                    expandableConfig={expandableConfig}
                    actions={actions}
                    rowKey={rowKey as string}
                    expandedRows={expandedRows}
                    onToggleExpand={toggleExpand}
                    onReload={handleReload}
                    isLoading={isLoading}
                    colSpan={colSpan}
                    customLoadingComponent={customLoadingComponent}
                    customNoDataComponent={customNoDataComponent}
                    emptyStateMessage={emptyStateMessage}
                    loadingMessage={loadingMessage}
                    virtualized={virtualized}
                    rowHeight={rowHeight}
                    activeRowIndex={activeRowIndex}
                    onRowClick={onRowClick}
                    highlightOnHover={highlightOnHover}
                    bodyClassName={bodyClassName}
                    rowClassName={rowClassName}
                    cellClassName={cellClassName}
                  />
                </table>
              </div>
            </div>

            {/* Pagination Footer */}
            {pagination && tableData.length > 0 && (
              <div className={`border-t px-4 py-4 ${footerClassName}`}>
                <PaginationControls
                  currentPage={currentPage}
                  totalCount={totalCount}
                  pageSize={pageSize}
                  totalPages={totalPages}
                  onPageSizeChange={setPageSize}
                  onPageChange={setCurrentPage}
                  pageSizeOptions={pageSizeOptions}
                />
              </div>
            )}
          </motion.div>
        </div>
      </TailGridProvider>
    </ErrorBoundary>
  )
}

export default React.memo(TailGrid) as typeof TailGrid

