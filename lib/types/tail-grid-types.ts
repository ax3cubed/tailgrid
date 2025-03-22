// src/types/tail-grid-types.ts

import { ReactNode } from "react";

/**
 * Filter configuration
 */
export interface FilterField {
	/** Unique key for the filter, should match a property in your data objects */
	key: string;
	/** Display label for the filter */
	label: string;
	/** Type of filter UI component to render */
	type: "text" | "select";
 
	icon?: string;
	/** Placeholder text for filter input */
	placeholder?: string;
	/** Option list for select type filters */
	options?: Array<{ value: string; label: string }>;
}

/**
 * Filter state for server-side filtering
 */
export interface FilterState {
	/** The field to filter by */
	field: string;
	/** The value to filter with */
	value: string;
}

/**
 * Sort configuration for server-side sorting
 */
export interface SortState {
	/** The field to sort by */
	field: string;
	/** The direction to sort */
	direction: "asc" | "desc";
}

/**
 * Configuration for table columns
 */
export interface ColumnConfig {
	/** Unique key for the column, should match a property in your data objects */
	key: string;
	/** Display header text for the column */
	header: string;
	/** Text alignment for column */
	align?: "start" | "center" | "end";
	/** Whether this column can be sorted */
	sortable?: boolean;
	/** Optional render function to customize cell rendering */
	render?: (value: any, row: any) => ReactNode;
}

/**
 * Configuration for expandable rows
 */
export interface ExpandableConfig {
	/** Whether rows can be expanded */
	enabled: boolean;
	/** Function to render expanded content */
	renderExpandedContent: (row: any) => ReactNode;
}

/**
 * Action button configuration
 */
export interface ActionConfig {
	/** Display label for the action button */
	label?: string;
 
	icon?: string;
	/** Function called when action button is clicked */
	onClick: (row: any) => void;
	/** Optional custom component to render instead of default button */
	component?: (row: any, reload: () => void) => ReactNode;
}

/**
 * Response format for server-side data fetching
 */
export interface DataFetchResponse {
	/** Array of items to display */
	items: any[];
	/** Total count of items (for pagination) */
	totalCount: number;
	/** Total number of pages */
	totalPages: number;
}

/**
 * Props for the ReusableList component
 */
export interface TailGridProps {
	/** Array of data objects to display */
	initialData?: any[];
	/** Column configuration */
	columns: ColumnConfig[];
	/** Title displayed at the top of the component */
	title?: string;
	/** Subtitle displayed below the title */
	subtitle?: string;
	/** Configuration for filter fields */
	filterFields?: FilterField[];
	/** Configuration for expandable rows */
	expandableConfig?: ExpandableConfig;
	/** Whether filtering is enabled */
	hasFilterCapability?: boolean;
	/** Array of action buttons to display */
	actions?: ActionConfig[];
	/** Whether sorting is enabled */
	sortable?: boolean;
	/** Optional custom filter component */
	customFilterComponent?: ReactNode;
	/** Whether pagination is enabled */
	pagination?: boolean;
	/** Available page size options */
	pageSizeOptions?: number[];
	/** Default page size */
	defaultPageSize?: number;
	/** Key to use as row identifier */
	rowKey?: string;
	/** Function for server-side data fetching */
	onDataFetch?: (page: number, pageSize: number) => Promise<DataFetchResponse>;
	/** Whether to use server-side data fetching */
	isServerSide?: boolean;
	/** Optional custom CSS class names */
	className?: string;
	/** Function for server-side filtering */
	onServerFilter?: (filters: FilterState[]) => Promise<void>;
	/** Function for server-side sorting */
	onServerSort?: (sort: SortState) => Promise<void>;
	/** Function for server-side search */
	onServerSearch?: (searchTerm: string) => Promise<void>;
	/** Option to show/hide the header */
	showHeader?: boolean;
	/** Option to customize the loading state */
	customLoadingComponent?: ReactNode;
	/** Option to customize the no data state */
	customNoDataComponent?: ReactNode;
}

/**
 * Props for the FilterBar component
 */
export interface FilterBarProps {
	filterFields: FilterField[];
	filters: Record<string, string>;
	onFilterChange: (key: string, value: string) => void;
	searchTerm: string;
	onSearchChange: (value: string) => void;
	customFilterComponent?: ReactNode;
	data: any[];
}

/**
 * Props for the TableHeader component
 */
export interface TableHeaderProps {
	columns: ColumnConfig[];
	sortConfig: SortState | null;
	hasExpandableRows: boolean;
	hasActions: boolean;
	onSort: (key: string, direction: string) => void;
	sortable: boolean;
}

/**
 * Props for the TableBody component
 */
export interface TableBodyProps {
	data: any[];
	columns: ColumnConfig[];
	rowKey: string;
	expandableConfig?: ExpandableConfig;
	expandedRows: string[];
	onToggleExpand: (id: string) => void;
	actions: ActionConfig[];
	isLoading: boolean;
	colSpan: number;
	customLoadingComponent?: ReactNode;
	customNoDataComponent?: ReactNode;
	onReload: () => void;
}

export interface TableRowProps {
	row: any;
	columns: ColumnConfig[];
	expandableConfig?: ExpandableConfig;
	expanded: boolean;
	onToggleExpand: (key: any) => void;
	actions: Array<any>;
	rowKey: string;
	onReload: () => void;
}

/**
 * Props for the Pagination component
 */
export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	pageSize: number;
	pageSizeOptions: number[];
	onPageSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	totalCount: number;
}

/**
 * Props for the ActionButton component
 */
export interface ActionButtonProps {
	action: ActionConfig;
	row: any;
	onReload: () => void;
}

export interface FilterFieldProps {
	field: FilterField;
	onChange: (key: string, value: string) => void;
	value: string;
	options?: Array<{ value: string; label: string }>;
}

export interface SearchInputProps {
	searchTerm: string;
	onSearchChange: (query: string) => void;
} 
export interface PaginationControlsProps {
	currentPage: number;
	pageSize: number;
	onPageChange: (page: number) => void;
	onPageSizeChange: (size: number) => void;
	totalPages: number;
	pageSizeOptions: number[];
	totalCount: number;
}
