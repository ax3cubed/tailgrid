"use client"

import React from "react"
import type { FilterFieldProps } from "../../../types/tail-grid-types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check } from "lucide-react"
import { motion } from "motion/react"

const FilterField: React.FC<FilterFieldProps> = ({ field, onChange, value, options }) => {
  const handleFilterChange = (value: string) => {
    onChange(field.key, value)
  }

  return (
    <div className="relative">
      <Select key={field.key} value={value || "all"} onValueChange={handleFilterChange}>
        <SelectTrigger className="w-full transition-all focus:ring-2">
          <SelectValue placeholder={`Filter by ${field.label}`} />
        </SelectTrigger>
        <SelectContent position="popper" className="max-h-[300px]">
          <SelectItem value="all" className="flex items-center justify-between">
            <span>{`All ${field.label}`}</span>
            {value === "all" && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-2">
                <Check className="h-4 w-4" />
              </motion.div>
            )}
          </SelectItem>
          {options?.map((option) => (
            <SelectItem key={option.value} value={option.value} className="flex items-center justify-between">
              <span>{option.label}</span>
              {value === option.value && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-2">
                  <Check className="h-4 w-4" />
                </motion.div>
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default React.memo(FilterField)

