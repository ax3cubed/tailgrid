import type React from "react"
import { useTailGrid } from "../../hooks/useTailGrid"
import PaginationControls from "./Pagination/PaginationControls"
import TableBody from "./Table/TableBody"
import type { TailGridProps } from "../../types/tail-grid-types"
import FiltersPanel from "./Filters/FiltersPanel"
import TableHeader from "./Table/TableHeader"
import "@/styles/globals.css"

const TailGrid: React.FC<TailGridProps> = ({
  initialData = [],
  columns,
  title,
  subtitle,
  filterFields = [],
  actions = [],
  sortable = false,
  pagination = true,
  pageSizeOptions = [5, 10, 25, 50],
  defaultPageSize = 5,
  onDataFetch,
  onServerFilter,
  onServerSort,
  className,
  expandableConfig,
  hasFilterCapability = true,
  customFilterComponent,
  isServerSide = false,
  onServerSearch,
  rowKey = "id",
  showHeader = true,
  customLoadingComponent,
  customNoDataComponent,
}) => {
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
  } = useTailGrid({
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
  })

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      {(title || subtitle) && (
        <div className="space-y-1">
          {title && <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>}
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}

      {/* Filters Card */}
      {hasFilterCapability && (
        <FiltersPanel
          filters={filters}
          filterFields={filterFields}
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
          searchTerm={searchTerm}
          customFilterComponent={customFilterComponent}
          data={tableData}
        />
      )}

      {/* Data Table */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="overflow-hidden">
          <div className="relative w-full overflow-auto">
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
                />
              )}
              <TableBody
                data={tableData}
                columns={columns}
                expandableConfig={expandableConfig}
                actions={actions}
                rowKey={rowKey}
                expandedRows={expandedRows}
                onToggleExpand={toggleExpand}
                onReload={async () => {
                  if (onDataFetch) await onDataFetch(currentPage, pageSize)
                }}
                isLoading={isLoading}
                colSpan={columns.length + (expandableConfig?.enabled ? 1 : 0) + (actions.length > 0 ? 1 : 0)}
                customLoadingComponent={customLoadingComponent}
                customNoDataComponent={customNoDataComponent}
              />
            </table>
          </div>
        </div>

        {/* Pagination Footer */}
        {pagination && (
          <div className="border-t px-2 py-2">
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
      </div>
    </div>
  )
}

export default TailGrid

