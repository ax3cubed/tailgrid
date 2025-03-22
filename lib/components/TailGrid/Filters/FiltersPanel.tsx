"use client"

import type { FilterBarProps } from "../../../types/tail-grid-types"
import SearchInput from "./SearchInput"
import FilterField from "./FilterField"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { getUniqueOptions } from "@/utils/getUniqueOptions"
import { Button } from "@/components/ui/button"
import { FilterX } from "lucide-react"
import { motion } from "motion/react"
import React from "react"

const FiltersPanel = <T extends Record<string, unknown>>({
  filters,
  filterFields,
  onFilterChange,
  onSearchChange,
  searchTerm,
  customFilterComponent,
  data,
  onResetFilters,
}: FilterBarProps<T>) => {
  const hasActiveFilters = Object.keys(filters).length > 0 || searchTerm.length > 0

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm mb-6 transition-all">
      <div className="flex flex-col space-y-1.5 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold leading-none tracking-tight">Filters</h3>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Button variant="outline" size="sm" onClick={onResetFilters} className="flex items-center gap-1">
                  <FilterX className="h-4 w-4" />
                  <span>Reset</span>
                </Button>
              </motion.div>
            )}
            {customFilterComponent && <div>{customFilterComponent}</div>}
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search input */}
          <SearchInput onSearchChange={onSearchChange} searchTerm={searchTerm} />

          {/* Filter fields */}
          {filterFields.map((field) => {
            if (field.type === "select") {
              const options = field.options || getUniqueOptions(field.key, data)
              return (
                <FilterField
                  options={options}
                  field={field}
                  onChange={onFilterChange}
                  value={filters[field.key] || "all"}
                  key={field.key}
                />
              )
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
                  className={cn(field.icon && "pl-8", "transition-all focus-visible:ring-2")}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default React.memo(FiltersPanel) as typeof FiltersPanel

