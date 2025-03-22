import React from 'react';
import { TableHeaderProps } from '../../../types/tail-grid-types';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { TableHead, TableHeader as ShadTableHeader, TableRow } from '../../ui/table';

const TableHeader: React.FC<TableHeaderProps> = ({
    columns,
    sortConfig,
    hasExpandableRows,
    hasActions,
    onSort,
    sortable,
}) => {
    const handleSort = (key: string) => {
        if (sortable) {
            const direction = sortConfig?.direction === 'asc' ? 'desc' : 'asc';
            onSort(key, direction);
        }
    };

    return (
        <ShadTableHeader>
            <TableRow>
                {hasExpandableRows && <TableHead className="w-12"></TableHead>}
                {columns.map((column) => (
                    <TableHead
                        key={column.key}
                        className={`${column.align === "end"
                            ? "text-end"
                            : column.align === "center"
                                ? "text-center"
                                : "text-start"
                            } ${sortable && column.sortable ? "cursor-pointer hover:underline" : ""}`}
                        onClick={() =>
                            sortable && column.sortable && handleSort(column.key)
                        }
                    >
                        <div className="flex items-center gap-2">
                            {column.header}
                            {sortable &&
                                column.sortable &&
                                sortConfig?.field === column.key && (
                                    sortConfig.direction === "asc" ? (
                                        <ArrowUp className="h-4 w-4" />
                                    ) : (
                                        <ArrowDown className="h-4 w-4" />
                                    )
                                )}
                        </div>
                    </TableHead>
                ))}
                {hasActions && <TableHead className="text-end">Actions</TableHead>}
            </TableRow>
        </ShadTableHeader>
    );
};

export default TableHeader;
