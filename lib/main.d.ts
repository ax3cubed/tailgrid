// src/types/tailgrid.d.ts
import type {
	TailGridProps,
	ColumnConfig,
	FilterField as FilterFieldConfig,
	ExpandableConfig,
	ActionConfig,
	DataFetchResponse,
	SortState,
	FilterState,
	TailGridContextType,
	ActionButtonProps,
	FilterBarProps,
	PaginationControlsProps,
	FilterFieldProps,
	SearchInputProps,
	TableBodyProps,
	TableHeaderProps,
	TableRowProps,
	PaginationSummaryProps,
	PageSizeSelectorProps,
} from "./types/tail-grid-types";

// Declare a module if it's needed for third-party usage
declare module "tailgrid" {
	export const TailGrid: React.FC<TailGridProps<Record<string, unknown>>>;
	export const FiltersPanel: React.FC<FilterBarProps<Record<string, unknown>>>;
	export const PaginationControls: React.FC<PaginationControlsProps>;
	export const FilterField: React.FC<FilterFieldProps>;
	export const SearchInput: React.FC<SearchInputProps>;
	export const TableBody: React.FC<TableBodyProps<Record<string, unknown>>>;
	export const PageSizeSelector: React.FC<PageSizeSelectorProps>;
	export const TableHeader: React.FC<TableHeaderProps<Record<string, unknown>>>;
	export const TableRow: React.FC<TableRowProps<Record<string, unknown>>>;
	export const TableActions: React.FC<ActionButtonProps<Record<string, unknown>>>;
	export const PaginationSummary: React.FC<PaginationSummaryProps>; 
	export type {
		TailGridProps,
		ColumnConfig,
		FilterFieldConfig,
		ExpandableConfig,
		ActionConfig,
		DataFetchResponse,
		SortState,
		FilterState,
		TailGridContextType,
		ActionButtonProps,
		FilterBarProps,
		PaginationControlsProps,
		FilterFieldProps,
		SearchInputProps,
		TableBodyProps,
		TableHeaderProps,
		TableRowProps,
	};
}
