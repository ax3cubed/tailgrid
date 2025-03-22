import { useState, useEffect, useCallback } from 'react';
import { SortState, TailGridProps } from '../types/tail-grid-types';


export function useTailGrid({
    initialData = [],
    filterFields = [],
    onDataFetch,
    onServerFilter,
    onServerSort,
    onServerSearch,
    defaultPageSize = 25,
    isServerSide = false,
    sortable = false,
    rowKey = 'id',
}: TailGridProps) {
    const [data, setData] = useState<any[]>(initialData);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<SortState | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedRows, setExpandedRows] = useState<string[]>([]);

    // Fetch data (either client-side or server-side)
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            if (onDataFetch) {
                const { items, totalCount, totalPages } = await onDataFetch(currentPage, pageSize);
                setData(items);
                setTotalCount(totalCount);
                setTotalPages(totalPages);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, pageSize, onDataFetch]);

    useEffect(() => {
        if (isServerSide) {
            fetchData();
        } else {
            setData(initialData);
        }
    }, [currentPage, pageSize, isServerSide, initialData, fetchData]);

    // Handle filter changes (for server-side filtering)
    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        if (onServerFilter) {
            onServerFilter(Object.entries(filters).map(([field, value]) => ({ field, value })));
        }
    };

    // Handle sorting (for server-side sorting)
    const handleSortChange = (field: string) => {
        const direction = sortConfig?.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ field, direction });
        if (onServerSort) {
            onServerSort({ field, direction });
        }
    };

    // Handle search term (for server-side search)
    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
        if (onServerSearch) {
            onServerSearch(term);
        }
    };
    const toggleExpand = (id: string) => {
        setExpandedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };
    const filteredData = !isServerSide ? data.filter((row) => {
        // Apply filters
        for (const key in filters) {
            if (filters[key] !== "all" && row[key] !== filters[key]) {
                return false;
            }
        }

        // Apply search
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            return Object.keys(row).some((key) => {
                const value = row[key];
                if (typeof value === "string") {
                    return value.toLowerCase().includes(searchLower);
                }
                if (typeof value === "number") {
                    return value.toString().includes(searchLower);
                }
                return false;
            });
        }
        return true;
    }): data;

 
	const sortedData =
		sortConfig && !isServerSide ? 
			[...filteredData].sort((a, b) => {
					const valueA = a[sortConfig.field];
					const valueB = b[sortConfig.field];

					if (valueA < valueB) {
						return sortConfig.direction === "asc" ? -1 : 1;
					}
					if (valueA > valueB) {
						return sortConfig.direction === "asc" ? 1 : -1;
					}
					return 0;
			  })
			: filteredData;

    // Pagination (client-side)
    const paginatedData = !isServerSide
        ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        : sortedData;

    return {
        data:paginatedData,
        filters,
        filterFields,
        searchTerm,
        sortConfig,
        sortable,
        rowKey,
        currentPage,
        pageSize,
        totalCount,
        totalPages,
        isLoading,
        setIsLoading,
        handleFilterChange,
        handleSortChange,
        handleSearchChange,
        setCurrentPage,
        setPageSize,
        toggleExpand,
        expandedRows,
    };
}
