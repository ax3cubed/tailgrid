import React from 'react';
import SearchInput from './SearchInput';

import FilterField from './FilterField';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getUniqueOptions } from '@/utils/getUniqueOptions';
import { FilterBarProps } from '@/types/tail-grid-types';

const FiltersPanel: React.FC<FilterBarProps> = ({
    filters,
    filterFields,
    onFilterChange,
    onSearchChange,
    searchTerm,
    customFilterComponent,
    data
}) => {
    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm mb-6">
            <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-lg font-semibold leading-none tracking-tight">Filters</h3>
                {customFilterComponent && (
                    <div className="flex justify-end">{customFilterComponent}</div>
                )}
            </div>
            <div className="p-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Search input */}
                    <SearchInput onSearchChange={onSearchChange} searchTerm={searchTerm} />

                    {/* Filter fields */}
                    {filterFields.map((field) => {
                        if (field.type === "select") {
                            const options = field.options || getUniqueOptions(field.key, data);
                            return (
                                <FilterField
                                    options={options}
                                    field={field}
                                    onChange={onFilterChange}
                                    value={filters[field.key] || 'all'}
                                    key={field.key}
                                />
                            );
                        }
                        return (
                            <div key={field.key} className="relative">
                                {field.icon && (
                                    <i className={`absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground ${field.icon}`} />
                                )}
                                <Input
                                    type="text"
                                    placeholder={field.placeholder || `Filter by ${field.label}...`}
                                    value={filters[field.key] || ""}
                                    onChange={(e) => onFilterChange(field.key, e.target.value)}
                                    className={cn(
                                        field.icon && "pl-8"
                                    )}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FiltersPanel;
