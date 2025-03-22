// src/types/tail-grid-types.ts

import type { ReactNode } from "react"

/**
 * Filter configuration
 */
export interface FilterField {
  /** Unique key for the filter, should match a property in your data objects */
  key: string
  /** Display label for the filter */
  label: string
  /** Type of filter UI component to render */
  type: "text" | "select"
  /** Optional icon for the filter */
  icon?: string
  /** Placeholder text for filter input */
  placeholder?: string
  /** Option list for select type filters */
  options?: Array<{ value: string; label: string }>
}

/**
 * Filter state for server-side filtering
 */
export interface FilterState {
  /** The field to filter by */
  field: string
  /** The value to filter with */
  value: string
}

/**
 * Sort configuration for server-side sorting
 */
export interface SortState {
  /** The field to sort by */
  field: string
  /** The direction to sort */
  direction: "asc" | "desc"
}

/**
 * Configuration for table columns
 */
export interface ColumnConfig<T extends Record<string, unknown>> {
  /** Unique key for the column, should match a property in your data objects */
  key: string
  /** Display header text for the column */
  header: string | ReactNode
  /** Text alignment for column */
  align?: "start" | "center" | "end"
  /** Whether this column can be sorted */
  sortable?: boolean
  /** Optional render function to customize cell rendering */
  render?: (value: unknown, row: T) => ReactNode
}

/**
 * Configuration for expandable rows
 */
export interface ExpandableConfig<T extends Record<string, unknown>> {
  /** Whether rows can be expanded */
  enabled: boolean
  /** Function to render expanded content */
  renderExpandedContent: (row: T) => ReactNode
}

/**
 * Action button configuration
 */
export interface ActionConfig<T extends Record<string, unknown>> {
  /** Display label for the action button */
  label?: string
  /** Icon class for the action button */
  icon?: string
  /** Function called when action button is clicked */
  onClick: (row: T) => void
  /** Optional custom component to render instead of default button */
  component?: (row: T, reload: () => void) => ReactNode
}

/**
 * Response format for server-side data fetching
 */
export interface DataFetchResponse<T extends Record<string, unknown>> {
  /** Array of items to display */
  items: T[]
  /** Total count of items (for pagination) */
  totalCount: number
  /** Total number of pages */
  totalPages: number
}

/**
 * Props for the TailGrid component
 */
export interface TailGridProps<T extends Record<string, unknown>> {
  /** Array of data objects to display */
  initialData?: T[]
  /** Column configuration */
  columns: ColumnConfig<T>[]
  /** Title displayed at the top of the component */
  title?: string
  /** Subtitle displayed below the title */
  subtitle?: string
  /** Configuration for filter fields */
  filterFields?: FilterField[]
  /** Configuration for expandable rows */
  expandableConfig?: ExpandableConfig<T>
  /** Whether filtering is enabled */
  hasFilterCapability?: boolean
  /** Array of action buttons to display */
  actions?: ActionConfig<T>[]
  /** Whether sorting is enabled */
  sortable?: boolean
  /** Optional custom filter component */
  customFilterComponent?: ReactNode
  /** Whether pagination is enabled */
  pagination?: boolean
  /** Available page size options */
  pageSizeOptions?: number[]
  /** Default page size */
  defaultPageSize?: number
  /** Key to use as row identifier */
  rowKey?: keyof T & string
  /** Function for server-side data fetching */
  onDataFetch?: (page: number, pageSize: number) => Promise<DataFetchResponse<T>>
  /** Whether to use server-side data fetching */
  isServerSide?: boolean
  /** Optional custom CSS class names */
  className?: string
  /** Function for server-side filtering */
  onServerFilter?: (filters: FilterState[]) => Promise<void>
  /** Function for server-side sorting */
  onServerSort?: (sort: SortState) => Promise<void>
  /** Function for server-side search */
  onServerSearch?: (searchTerm: string) => Promise<void>
  /** Option to show/hide the header */
  showHeader?: boolean
  /** Option to customize the loading state */
  customLoadingComponent?: ReactNode
  /** Option to customize the no data state */
  customNoDataComponent?: ReactNode
  /** Whether to use virtualization for large datasets */
  virtualized?: boolean
  /** Row height for virtualization */
  rowHeight?: number
  /** Message to display when there is no data */
  emptyStateMessage?: string
  /** Message to display when loading data */
  loadingMessage?: string
  /** Whether to enable keyboard navigation */
  keyboardNavigation?: boolean
  /** Function called when a row is clicked */
  onRowClick?: (row: T) => void
  /** Whether to highlight rows on hover */
  highlightOnHover?: boolean
  /** Whether to make the header sticky */
  stickyHeader?: boolean
  /** Maximum height of the table */
  maxHeight?: number
  /** Custom class name for the container */
  containerClassName?: string
  /** Custom class name for the header */
  headerClassName?: string
  /** Custom class name for the body */
  bodyClassName?: string
  /** Custom class name for the footer */
  footerClassName?: string
  /** Custom class name for rows */
  rowClassName?: string
  /** Custom class name for cells */
  cellClassName?: string
  /** Custom class name for header cells */
  headerCellClassName?: string
}

/**
 * Props for the FilterBar component
 */
export interface FilterBarProps<T extends Record<string, unknown>> {
  filterFields: FilterField[]
  filters: Record<string, string>
  onFilterChange: (key: string, value: string) => void
  searchTerm: string
  onSearchChange: (value: string) => void
  customFilterComponent?: ReactNode
  data: T[]
  onResetFilters: () => void
}

/**
 * Props for the TableHeader component
 */
export interface TableHeaderProps<T extends Record<string, unknown>> {
  columns: ColumnConfig<T>[]
  sortConfig: SortState | null
  hasExpandableRows: boolean
  hasActions: boolean
  onSort: (key: string) => void
  sortable: boolean
  stickyHeader?: boolean
  headerCellClassName?: string
  headerClassName?: string
}

/**
 * Props for the TableBody component
 */
export interface TableBodyProps<T extends Record<string, unknown>> {
  data: T[]
  columns: ColumnConfig<T>[]
  rowKey: string
  expandableConfig?: ExpandableConfig<T>
  expandedRows: string[]
  onToggleExpand: (id: string) => void
  actions: ActionConfig<T>[]
  isLoading: boolean
  colSpan: number
  customLoadingComponent?: ReactNode
  customNoDataComponent?: ReactNode
  emptyStateMessage?: string
  loadingMessage?: string
  virtualized?: boolean
  rowHeight?: number
  activeRowIndex?: number | null
  onRowClick?: (row: T) => void
  highlightOnHover?: boolean
  bodyClassName?: string
  rowClassName?: string
  cellClassName?: string
  onReload: () => Promise<void>
}

export interface TableRowProps<T extends Record<string, unknown>> {
  row: T
  columns: ColumnConfig<T>[]
  expandableConfig?: ExpandableConfig<T>
  expanded: boolean
  onToggleExpand: (key: string) => void
  actions: ActionConfig<T>[]
  rowKey: string
  onReload: () => Promise<void>
  isActive?: boolean
  onClick?: (row: T) => void
  highlightOnHover?: boolean
  rowClassName?: string
  cellClassName?: string
}

/**
 * Props for the Pagination component
 */
export interface PaginationControlsProps {
  currentPage: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  totalPages: number
  pageSizeOptions: number[]
  totalCount: number
}

/**
 * Props for the ActionButton component
 */
export interface ActionButtonProps<T extends Record<string, unknown>> {
  action: ActionConfig<T>
  row: T
  onReload: () => Promise<void>
}

export interface FilterFieldProps {
  field: FilterField
  onChange: (key: string, value: string) => void
  value: string
  options?: Array<{ value: string; label: string }>
}

export interface SearchInputProps {
  searchTerm: string
  onSearchChange: (query: string) => void
}

/**
 * Context type for TailGrid
 */
export interface TailGridContextType<T extends Record<string, unknown>> {
  data: T[]
  isLoading: boolean
  currentPage: number
  pageSize: number
  totalCount: number
  totalPages: number
  filters: Record<string, string>
  searchTerm: string
  sortConfig: SortState | null
  expandedRows: string[]
  activeRowIndex: number | null
  rowKey: string
  handleFilterChange: (key: string, value: string) => void
  handleSortChange: (field: string) => void
  handleSearchChange: (term: string) => void
  setCurrentPage: (page: number) => void
  setPageSize: (size: number) => void
  toggleExpand: (id: string) => void
  resetFilters: () => void
  setActiveRowIndex: (index: number | null) => void
}

