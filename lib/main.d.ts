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
	// ✅ Adding generic support to all components that rely on a data structure
	export const TailGrid: <T extends Record<string, unknown>>(props: TailGridProps<T>) => React.ReactElement;
	export const FiltersPanel: <T extends Record<string, unknown>>(props: FilterBarProps<T>) => React.ReactElement;
	export const PaginationControls: React.FC<PaginationControlsProps>;
	export const FilterField: React.FC<FilterFieldProps>;
	export const SearchInput: React.FC<SearchInputProps>;
	export const TableBody: <T extends Record<string, unknown>>(props: TableBodyProps<T>) => React.ReactElement;
	export const PageSizeSelector: React.FC<PageSizeSelectorProps>;
	export const TableHeader: <T extends Record<string, unknown>>(props: TableHeaderProps<T>) => React.ReactElement;
	export const TableRow: <T extends Record<string, unknown>>(props: TableRowProps<T>) => React.ReactElement;
	export const TableActions: <T extends Record<string, unknown>>(props: ActionButtonProps<T>) => React.ReactElement;
	export const PaginationSummary: React.FC<PaginationSummaryProps>; 

	// ✅ Export types with generic support
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
