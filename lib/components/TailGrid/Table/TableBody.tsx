import type React from "react"
import type { TableBodyProps } from "../../../types/tail-grid-types"
import TableRow from "./TableRow"
import { TableBody as ShadTableBody, TableCell, TableRow as ShadTableRow } from "../../ui/table"
import { Loader2 } from "lucide-react"

const TableBody: React.FC<TableBodyProps> = ({
  data,
  columns,
  rowKey,
  expandableConfig,
  expandedRows,
  onToggleExpand,
  actions,
  isLoading,
  colSpan,
  customLoadingComponent,
  customNoDataComponent,
  onReload,
}) => {
  if (isLoading && customLoadingComponent) {
    return <ShadTableBody>{customLoadingComponent}</ShadTableBody>
  }

  if (data.length === 0 && customNoDataComponent) {
    return <ShadTableBody>{customNoDataComponent}</ShadTableBody>
  }

  return (
    <ShadTableBody>
      {isLoading ? (
        <ShadTableRow>
          <TableCell colSpan={colSpan} className="h-24 text-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading data...</p>
            </div>
          </TableCell>
        </ShadTableRow>
      ) : data?.length === 0 ? (
        <ShadTableRow>
          <TableCell colSpan={colSpan} className="h-24 text-center">
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-sm font-medium">No results found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
            </div>
          </TableCell>
        </ShadTableRow>
      ) : (
        data.map((row) => (
          <TableRow
            key={row[rowKey]}
            row={row}
            columns={columns}
            expandableConfig={expandableConfig}
            expanded={expandedRows.includes(row[rowKey])}
            onToggleExpand={onToggleExpand}
            actions={actions}
            rowKey={rowKey}
            onReload={onReload}
          />
        ))
      )}
    </ShadTableBody>
  )
}

export default TableBody

