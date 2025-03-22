import React from 'react';
import { TableRowProps } from '../../../types/tail-grid-types';
import TableActions from './TableActions';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { TableCell, TableRow as ShadTableRow } from '../../ui/table';

const TableRow: React.FC<TableRowProps> = ({
    row,
    columns,
    expandableConfig,
    expanded,
    onToggleExpand,
    actions,
    rowKey,
    onReload,
}) => {
    const renderExpandedContent = expandableConfig?.enabled && expanded && expandableConfig.renderExpandedContent(row);
 
    return (
        <>
            <ShadTableRow
                className={expandableConfig?.enabled ? "cursor-pointer" : ""}
                onClick={() =>
                    expandableConfig?.enabled && onToggleExpand(row[rowKey])
                }
            >
                {expandableConfig?.enabled && (
                    <TableCell>
                        {expanded ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                    </TableCell>
                )}
                {columns.map((column) => (
                    <TableCell
                        key={`${rowKey}-${column.key}`}
                        className={`${column.align === "end"
                            ? "text-end"
                            : column.align === "center"
                                ? "text-center"
                                : "text-start"
                            }`}
                    >
                        {column.render
                            ? column.render(row[column.key], row)
                            : row[column.key]}
                    </TableCell>
                ))}
                {actions.length > 0 && (
                   <TableCell>
                     <TableActions actions={actions} onReload={onReload} row={row} />
                   </TableCell>
                )}
            </ShadTableRow>
            {expandableConfig?.enabled && expanded && (
                <ShadTableRow>
                    <TableCell
                        colSpan={
                            columns.length +
                            1 +
                            (actions.length > 0 ? 1 : 0)
                        }
                        className="bg-muted/50"
                    >
                        {renderExpandedContent}
                    </TableCell>
                </ShadTableRow>
            )}
        </>
    );
};

export default TableRow;
