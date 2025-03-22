"use client"

import type React from "react"
import type { SearchInputProps } from "../../../types/tail-grid-types"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, onSearchChange }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value)
  }

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={cn("pl-8 pr-4 transition-all", "focus-visible:ring-1 focus-visible:ring-ring")}
      />
    </div>
  )
}

export default SearchInput

