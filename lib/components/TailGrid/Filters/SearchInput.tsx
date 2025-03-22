"use client"

import type { SearchInputProps } from "../../../types/tail-grid-types"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "motion/react"
import React from "react"

const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, onSearchChange }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value)
  }

  const handleClearSearch = () => {
    onSearchChange("")
  }

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={cn(
          "pl-8 pr-8 transition-all",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
        )}
        aria-label="Search table data"
      />
      <AnimatePresence>
        {searchTerm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-2 top-2"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              <X className="h-3 w-3" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default React.memo(SearchInput)

