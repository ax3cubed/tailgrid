import React from 'react';
import { ActionConfig } from '../../../types/tail-grid-types';
import { Button } from '../../ui/button';
import { TableCell } from '@/components/ui/table';

const TableActions: React.FC<{ actions: ActionConfig[]; row: any; onReload: () => void }> = ({
    actions,
    row,
    onReload,
}) => {
    return (
        <TableCell className='text-end'>
        <div className="flex justify-end items-center gap-2">
            {actions.map((action, index) => (
                <React.Fragment key={index}>
                    {action.component ? (
                        action.component(row, onReload)
                    ) : (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                action.onClick(row);
                            }}
                        >
                            {action.icon && (
                                <span className={action.icon}></span>
                            )}
                            {!action.icon && action.label}
                        </Button>
                    )}
                </React.Fragment>
            ))}
        </div>
        </TableCell>
    );
};

export default TableActions;
