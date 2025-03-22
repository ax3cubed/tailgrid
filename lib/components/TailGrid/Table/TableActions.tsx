"use client"

import React from "react"
import type { ActionConfig, TableRowProps } from "../../../types/tail-grid-types"

import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const TableActions: React.FC<{ actions: ActionConfig[]; row: TableRowProps; onReload: () => void }> = ({
  actions,
  row,
  onReload,
}) => {
  // Show first 2 actions as buttons, rest in dropdown
  const visibleActions = actions.slice(0, 2)
  const dropdownActions = actions.length > 2 ? actions.slice(2) : []

  return (
    <div className="flex justify-end items-center gap-1">
      {visibleActions.map((action, index) => (
        <React.Fragment key={index}>
          {action.component ? (
            action.component(row, onReload)
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                action.onClick(row)
              }}
              className="h-8 w-8 rounded-md"
            >
              {action.icon && <span className={action.icon}></span>}
              {!action.icon && action.label && <span className="sr-only">{action.label}</span>}
            </Button>
          )}
        </React.Fragment>
      ))}

      {dropdownActions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {dropdownActions.map((action, index) => (
              <DropdownMenuItem
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  action.onClick(row)
                }}
              >
                {action.icon && <span className={`${action.icon} mr-2 h-4 w-4`}></span>}
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

export default TableActions

