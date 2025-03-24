"use client"

import React from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PageSizeSelectorProps {
  pageSize: number
  onPageSizeChange: (size: number) => void
  pageSizeOptions: number[]
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({ pageSize, onPageSizeChange, pageSizeOptions }) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">Show</span>
      <Select value={pageSize.toString()} onValueChange={(value) => onPageSizeChange(Number(value))}>
        <SelectTrigger className="w-[70px] h-8" aria-label="Select page size">
          <SelectValue placeholder={pageSize.toString() || ""} />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {pageSizeOptions.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <span className="text-muted-foreground">per page</span>
    </div>
  )
}

export default React.memo(PageSizeSelector)

