import React from 'react';
import { FilterFieldProps } from '../../../types/tail-grid-types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';





const FilterField: React.FC<FilterFieldProps> = ({ field, onChange, value, options }) => {
    const handleFilterChange = (key: string, value: string) => {
        onChange(key, value);
    };

    
    return (
        <Select
            key={field.key}
            value={value || "all"}
            onValueChange={(value) =>
                handleFilterChange(field.key, value)
            }
        >
            <SelectTrigger>
                <SelectValue placeholder="Select a field to filter" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">{`All ${field.label}`}</SelectItem>
                {options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>

        </Select>
    );
};

export default FilterField;
