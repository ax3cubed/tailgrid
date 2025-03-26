"use client"

import React from "react"
import type { ActionButtonProps, ActionConfig } from "../../../types/tail-grid-types"

import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const TableActions = <T extends Record<string, unknown>>({
  actions,
  row,
  onReload,
}: ActionButtonProps<T>) => {
  // Show first 2 actions as buttons, rest in dropdown
  const visibleActions = actions.slice(0, 2)
  const dropdownActions = actions.length > 2 ? actions.slice(2) : []

  const handleActionClick = (e: React.MouseEvent, action: ActionConfig<T>) => {
    e.stopPropagation()
    action.onClick(row)
  }

  return (
    <div className="flex justify-end items-center gap-1">
      {visibleActions.map((action, index) => (
        <React.Fragment key={index}>
          {action.component ? (
            action.component(row, onReload)
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleActionClick(e, action)}
                    className="h-8 w-8 rounded-md transition-colors hover:bg-muted"
                    aria-label={action.label || "Action"}
                  >
                    {action.icon && <span className={action.icon}></span>}
                    {!action.icon && action.label && <span className="sr-only">{action.label}</span>}
                  </Button>
                </TooltipTrigger>
                {action.label && <TooltipContent>{action.label}</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          )}
        </React.Fragment>
      ))}

      {dropdownActions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-md transition-colors hover:bg-muted"
              aria-label="More actions"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {dropdownActions.map((action, index) => (
              <DropdownMenuItem key={index} onClick={(e) => handleActionClick(e, action)} className="cursor-pointer">
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

export default React.memo(TableActions) as typeof TableActions

