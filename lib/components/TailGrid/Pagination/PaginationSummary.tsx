import React from "react"

interface PaginationSummaryProps {
  currentPage: number
  totalCount: number
  pageSize: number
}

const PaginationSummary: React.FC<PaginationSummaryProps> = ({ currentPage, totalCount, pageSize }) => {
  const startItem = totalCount === 0 ? 0 : Math.min((currentPage - 1) * pageSize + 1, totalCount)
  const endItem = Math.min(currentPage * pageSize, totalCount)

  return (
    <span className="text-muted-foreground">
      Showing <span className="font-medium text-foreground">{startItem}</span> to{" "}
      <span className="font-medium text-foreground">{endItem}</span> of{" "}
      <span className="font-medium text-foreground">{totalCount}</span> entries
    </span>
  )
}

export default React.memo(PaginationSummary)

