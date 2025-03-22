"use client"

import React from "react"
import type { PaginationControlsProps } from "../../../types/tail-grid-types"
import PageSizeSelector from "./PageSizeSelector"
import PaginationSummary from "./PaginationSummary"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { motion, AnimatePresence } from "motion/react"

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  totalPages,
  pageSizeOptions,
  totalCount,
}) => {
  const handlePageSizeChange = (size: number) => {
    onPageSizeChange(size)
    onPageChange(1)
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  const renderPagination = () => {
    const pages = []
    const showEllipsis = totalPages > 5

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              aria-label={`Page ${i}`}
              aria-current={currentPage === i ? "page" : undefined}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        )
      }
    } else {
      // First page
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
            aria-label="Page 1"
            aria-current={currentPage === 1 ? "page" : undefined}
          >
            1
          </PaginationLink>
        </PaginationItem>,
      )

      // Start ellipsis
      if (currentPage > 3 && showEllipsis) {
        pages.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>,
        )
      }

      // Middle pages
      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              aria-label={`Page ${i}`}
              aria-current={currentPage === i ? "page" : undefined}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        )
      }

      // End ellipsis
      if (currentPage < totalPages - 2 && showEllipsis) {
        pages.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>,
        )
      }

      // Last page
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
            aria-label={`Page ${totalPages}`}
            aria-current={currentPage === totalPages ? "page" : undefined}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    return pages
  }

  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4 text-sm">
        <PageSizeSelector
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={pageSizeOptions}
        />
        <PaginationSummary currentPage={currentPage} pageSize={pageSize} totalCount={totalCount} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0.8, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Pagination className="mx-auto sm:mx-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  aria-disabled={currentPage === 1}
                  tabIndex={currentPage === 1 ? -1 : 0}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  aria-label="Go to previous page"
                />
              </PaginationItem>
              {renderPagination()}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  aria-disabled={currentPage === totalPages}
                  tabIndex={currentPage === totalPages ? -1 : 0}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  aria-label="Go to next page"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default React.memo(PaginationControls)

