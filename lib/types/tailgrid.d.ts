// src/types/tailgrid.d.ts

import type {
	TailGridProps,
	ColumnConfig,
	FilterField,
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
} from "./tail-grid-types";

// Declare a module if it's needed for third-party usage
declare module "tailgrid" {
	export type {
		TailGridProps,
		ColumnConfig,
		FilterField,
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
