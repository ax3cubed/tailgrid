"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"

interface UseVirtualizationProps {
  itemCount: number
  itemHeight: number
  overscan?: number
  containerHeight?: number
}

interface UseVirtualizationReturn {
  virtualItems: { index: number; start: number }[]
  startIndex: number
  endIndex: number
  containerRef: React.RefObject<HTMLDivElement | null>
  totalHeight: number
  scrollTo: (index: number) => void
}

export function useVirtualization({
  itemCount,
  itemHeight,
  overscan = 3,
  containerHeight,
}: UseVirtualizationProps): UseVirtualizationReturn {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [height, setHeight] = useState(containerHeight || 0)

  useEffect(() => {
    if (containerHeight) {
      setHeight(containerHeight)
    } else if (containerRef.current) {
      setHeight(containerRef.current.clientHeight)
      const observer = new ResizeObserver((entries) => {
        setHeight(entries[0].contentRect.height)
      })
      const currentContainer = containerRef.current
      if (currentContainer) {
        observer.observe(currentContainer)
      }
      return () => {
        if (currentContainer) {
          observer.unobserve(currentContainer)
        }
      }
    }
  }, [containerHeight])

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => {
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [handleScroll])

  const scrollTo = useCallback(
    (index: number) => {
      if (containerRef.current) {
        containerRef.current.scrollTop = index * itemHeight
      }
    },
    [itemHeight],
  )

  const totalHeight = itemCount * itemHeight

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(itemCount - 1, Math.floor((scrollTop + height) / itemHeight) + overscan)

  const virtualItems = []
  for (let i = startIndex; i <= endIndex; i++) {
    virtualItems.push({
      index: i,
      start: i * itemHeight,
    })
  }

  return {
    virtualItems,
    startIndex,
    endIndex,
    containerRef,
    totalHeight,
    scrollTo,
  }
}

