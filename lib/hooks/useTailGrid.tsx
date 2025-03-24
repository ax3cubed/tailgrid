"use client"

import { useState, useEffect, useCallback, useMemo, type KeyboardEvent } from "react"
import type { SortStateProps, TailGridProps } from "../types/tail-grid-types"
import { useDebounce } from "./useDebounce"

export function useTailGrid<T extends Record<string, unknown>>({
  initialData = [],
  filterFields = [],
  onDataFetch,
  onServerFilter,
  onServerSort,
  onServerSearch,
  defaultPageSize = 10,
  isServerSide = false,
  sortable = true,
  rowKey = "id" as keyof T & string,
  keyboardNavigation = true,
}: TailGridProps<T>) {
  const [data, setData] = useState<T[]>(initialData)
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortStateProps | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null)

  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const debouncedFilters = useDebounce(filters, 300)

  // Reset to first page when filters or search changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1)
    }
  }, [debouncedFilters, debouncedSearchTerm])

  // Fetch data (either client-side or server-side)
  const fetchData = useCallback(async () => {
    if (!isServerSide) return

    setIsLoading(true)
    setError(null)

    try {
      if (onDataFetch) {
        const { items, totalCount, totalPages } = await onDataFetch(currentPage, pageSize)
        setData(items)
        setTotalCount(totalCount)
        setTotalPages(totalPages)
      }
    } catch (err) {
      console.error("Error fetching data:", err)
      setError(err instanceof Error ? err : new Error("Failed to fetch data"))
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, pageSize, onDataFetch, isServerSide])

  useEffect(() => {
    if (isServerSide) {
      fetchData()
    } else {
      setData(initialData)
      setTotalCount(initialData.length)
      setTotalPages(Math.ceil(initialData.length / pageSize))
    }
  }, [isServerSide, initialData, fetchData, pageSize])

  // Handle filter changes
  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      setFilters((prev) => {
        const newFilters = { ...prev }
        if (value === "all" || value === "") {
          delete newFilters[key]
        } else {
          newFilters[key] = value
        }
        return newFilters
      })

      if (isServerSide && onServerFilter) {
        onServerFilter(
          Object.entries(filters).map(([field, value]) => ({
            field,
            value,
          })),
        )
      }
    },
    [filters, isServerSide, onServerFilter],
  )

  // Handle sorting
  const handleSortChange = useCallback(
    (field: string) => {
      if (!sortable) return

      setSortConfig((prev) => {
        const direction = prev?.field === field && prev.direction === "asc" ? "desc" : "asc"
        return { field, direction }
      })

      if (isServerSide && onServerSort) {
        onServerSort({
          field,
          direction: sortConfig?.field === field && sortConfig.direction === "asc" ? "desc" : "asc",
        })
      }
    },
    [sortConfig, sortable, isServerSide, onServerSort],
  )

  // Handle search term
  const handleSearchChange = useCallback(
    (term: string) => {
      setSearchTerm(term)
      if (isServerSide && onServerSearch) {
        onServerSearch(term)
      }
    },
    [isServerSide, onServerSearch],
  )

  // Toggle row expansion
  const toggleExpand = useCallback((id: string) => {
    setExpandedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
  }, [])

  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters({})
    setSearchTerm("")
    setSortConfig(null)
    setCurrentPage(1)
  }, [])

  // Client-side filtering
  const filteredData = useMemo(() => {
    if (isServerSide) return data

    return data.filter((row) => {
      // Apply filters
      for (const key in filters) {
      const rowValue = row[key]
      if (filters[key] !== "all" && !String(rowValue).includes(filters[key])) {
        return false
      }
      }

      // Apply search
      if (debouncedSearchTerm) {
        const searchLower = debouncedSearchTerm.toLowerCase()
        return Object.keys(row).some((key) => {
          const value = row[key]
          if (value === null || value === undefined) return false
          return String(value).toLowerCase().includes(searchLower)
        })
      }
      return true
    })
  }, [data, filters, debouncedSearchTerm, isServerSide])

  // Client-side sorting
  const sortedData = useMemo(() => {
    if (isServerSide || !sortConfig) return filteredData

    return [...filteredData].sort((a, b) => {
      const valueA = a[sortConfig.field as keyof T]
      const valueB = b[sortConfig.field as keyof T]

      // Handle null/undefined values
      if (valueA === null || valueA === undefined) return 1
      if (valueB === null || valueB === undefined) return -1

      // Compare based on type
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortConfig.direction === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      }

      // Compare numbers
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortConfig.direction === "asc" ? valueA - valueB : valueB - valueA
      }

      // Compare dates
      if (valueA instanceof Date && valueB instanceof Date) {
        return sortConfig.direction === "asc"
          ? valueA.getTime() - valueB.getTime()
          : valueB.getTime() - valueA.getTime()
      }

      // Convert to string for other types
      const strA = String(valueA)
      const strB = String(valueB)

      return sortConfig.direction === "asc" ? strA.localeCompare(strB) : strB.localeCompare(strA)
    })
  }, [filteredData, sortConfig, isServerSide])

  // Client-side pagination
  const paginatedData = useMemo(() => {
    if (isServerSide) return sortedData

    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    return sortedData.slice(start, end)
  }, [sortedData, currentPage, pageSize, isServerSide])

  // Calculate total pages for client-side pagination
  useEffect(() => {
    if (!isServerSide) {
      setTotalCount(sortedData.length)
      setTotalPages(Math.ceil(sortedData.length / pageSize) || 1)
    }
  }, [sortedData, pageSize, isServerSide])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!keyboardNavigation || paginatedData.length === 0) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setActiveRowIndex((prev) => {
            if (prev === null) return 0
            return Math.min(prev + 1, paginatedData.length - 1)
          })
          break
        case "ArrowUp":
          e.preventDefault()
          setActiveRowIndex((prev) => {
            if (prev === null) return 0
            return Math.max(prev - 1, 0)
          })
          break
        case "Home":
          e.preventDefault()
          setActiveRowIndex(0)
          break
        case "End":
          e.preventDefault()
          setActiveRowIndex(paginatedData.length - 1)
          break
        case "Enter":
          if (activeRowIndex !== null) {
            const activeRow = paginatedData[activeRowIndex]
            if (activeRow) {
              toggleExpand(String(activeRow[rowKey]))
            }
          }
          break
        default:
          break
      }
    },
    [keyboardNavigation, paginatedData, activeRowIndex, toggleExpand, rowKey],
  )

  return {
    data: paginatedData,
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
    error,
    expandedRows,
    activeRowIndex,
    setIsLoading,
    handleFilterChange,
    handleSortChange,
    handleSearchChange,
    setCurrentPage,
    setPageSize,
    toggleExpand,
    resetFilters,
    setActiveRowIndex,
    handleKeyDown,
  }
}

