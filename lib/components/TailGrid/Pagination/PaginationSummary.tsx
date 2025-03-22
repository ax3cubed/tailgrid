import React from 'react';

interface PaginationSummaryProps {
    currentPage: number;
    totalCount: number;
    pageSize: number;
}


const PaginationSummary: React.FC<PaginationSummaryProps> = ({
    currentPage,
    totalCount,
    pageSize,
}) => {
    const startItem = Math.min((currentPage - 1) * pageSize + 1);
    const endItem = Math.min(currentPage * pageSize, totalCount);

    return (
        <span>
            Showing {startItem}{" "}
            to {endItem} of{" "}
            {totalCount} entries
        </span>
    );
};

export default PaginationSummary;
