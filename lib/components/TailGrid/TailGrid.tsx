import React from 'react';
import { useTailGrid } from '../../hooks/useTailGrid';
import PaginationControls from './Pagination/PaginationControls';
import TableBody from './Table/TableBody';
import { TailGridProps } from '../../types/tail-grid-types';
import FiltersPanel from './Filters/FiltersPanel';
import TableHeader from './Table/TableHeader';
import '@/styles/globals.css';


const TailGrid: React.FC<TailGridProps> = ({
    initialData = [],
    columns,
    title,
    subtitle,
    filterFields = [],
    actions = [],
    sortable = false,
    pagination = true,
    pageSizeOptions = [10, 25, 50],
    defaultPageSize = 25,
    onDataFetch,
    onServerFilter,
    onServerSort,
    className,
    expandableConfig,
    hasFilterCapability = true,
    customFilterComponent,
    isServerSide = false,
    onServerSearch,
    rowKey = 'id',
    showHeader = true,
    customLoadingComponent,
    customNoDataComponent,
}) => {
    const {
        data: tableData,
        isLoading,
        currentPage,
        pageSize,
        totalCount,
        totalPages,
        handleFilterChange,
        handleSortChange,
        handleSearchChange,
        setCurrentPage,
        setPageSize,
        expandedRows,
        toggleExpand,
        filters,
        searchTerm,
        sortConfig,


    } = useTailGrid({
        initialData,
        filterFields,
        onDataFetch,
        onServerFilter,
        columns,
        sortable,
        actions,
        className,
        customLoadingComponent,
        customNoDataComponent,
        isServerSide,
        pageSizeOptions,
        pagination,
        rowKey,
        showHeader,
        subtitle,
        title,
        customFilterComponent,
        expandableConfig,
        hasFilterCapability,
        onServerSort,
        onServerSearch,
        defaultPageSize,
    });

    return (
        <div className="container-fluid px-4 py-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
                <p className="text-gray-600">{subtitle}</p>
            </div>

            {/* Filters Card */}
            {hasFilterCapability && (
                <FiltersPanel
                    filters={filters}
                    filterFields={filterFields}
                    onFilterChange={handleFilterChange}
                    onSearchChange={handleSearchChange}
                    searchTerm={searchTerm}
                    customFilterComponent={customFilterComponent}
                    data={tableData}
                />
            )}

            {/* Data Table */}
            <div className="card">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table align-middle table-row-dashed fs-6 gy-5">
                            {/* Table Header */}
                            {showHeader && (<TableHeader sortable={sortable} hasExpandableRows={expandableConfig?.enabled || false} columns={columns} sortConfig={sortConfig} hasActions={actions?.length > 0 ? true : false} onSort={handleSortChange} />)}
                            <TableBody
                                data={tableData}
                                columns={columns}
                                expandableConfig={expandableConfig}
                                actions={actions}
                                rowKey={rowKey}
                                expandedRows={expandedRows}
                                onToggleExpand={toggleExpand}
                                onReload={async () => { if (onDataFetch) await onDataFetch(currentPage, pageSize); }}
                                isLoading={isLoading}
                                colSpan={columns.length + (expandableConfig?.enabled ? 1 : 0) + (actions.length > 0 ? 1 : 0)}
                                customLoadingComponent={customLoadingComponent}
                                customNoDataComponent={customNoDataComponent}
                            />
                        </table>
                    </div>
                </div>

                {/* Pagination Footer */}
                {pagination && (
                    <PaginationControls currentPage={currentPage} totalCount={totalCount}
                        pageSize={pageSize} totalPages={totalPages} onPageSizeChange={setPageSize}
                        onPageChange={setCurrentPage} pageSizeOptions={pageSizeOptions} />)}
            </div>

        </div>
    );
};

export default TailGrid;
