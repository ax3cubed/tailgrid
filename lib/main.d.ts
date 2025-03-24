// src/types/tailgrid.d.ts

import type {
	TailGridProps,
	ColumnConfigProps,
	FilterField,
	ExpandableConfigProps,
	ActionConfigProps,
	DataFetchResponseProps,
	SortStateProps,
	FilterStateProps,
	TailGridContextTypeProps,
	ActionButtonProps,
	FilterBarProps,
	PaginationControlsProps,
	FilterFieldProps,
	SearchInputProps,
	TableBodyProps,
	TableHeaderProps,
	TableRowProps,
} from "./types/tail-grid-types";

// Declare a module if it's needed for third-party usage
declare module "tailgrid" {
    
    // Export the types for use in other modules
	export type {
		TailGridProps,
		ColumnConfigProps,
		FilterField,
		ExpandableConfigProps,
		ActionConfigProps,
		DataFetchResponseProps,
		SortStateProps,
		FilterStateProps,
		TailGridContextTypeProps,
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
