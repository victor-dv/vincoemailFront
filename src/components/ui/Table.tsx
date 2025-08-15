"use client"

import type React from "react"
import { ChevronUp, ChevronDown, Loader2 } from "lucide-react"

interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  width?: string
}

interface TableProps {
  columns: TableColumn[]
  data: any[]
  onSort?: (key: string, direction: "asc" | "desc") => void
  sortKey?: string
  sortDirection?: "asc" | "desc"
  loading?: boolean
  emptyMessage?: string
  className?: string
}

export const AdvancedTable: React.FC<TableProps> = ({
  columns,
  data,
  onSort,
  sortKey,
  sortDirection,
  loading = false,
  emptyMessage = "Nenhum dado encontrado",
  className = "",
}) => {
  const handleSort = (column: TableColumn) => {
    if (!column.sortable || !onSort) return

    const newDirection = sortKey === column.key && sortDirection === "asc" ? "desc" : "asc"
    onSort(column.key, newDirection)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-600" />
        <span className="ml-2 text-gray-600">Carregando...</span>
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-auto">
      <table className={`w-full caption-bottom text-sm ${className}`}>
        <thead className="border-b bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`h-12 px-4 text-left align-middle font-medium text-gray-700 ${
                  column.sortable ? "cursor-pointer hover:bg-gray-100" : ""
                }`}
                style={{ width: column.width }}
                onClick={() => handleSort(column)}
              >
                <div className="flex items-center gap-2">
                  {column.label}
                  {column.sortable && (
                    <div className="flex flex-col">
                      <ChevronUp
                        className={`h-3 w-3 ${
                          sortKey === column.key && sortDirection === "asc" ? "text-yellow-600" : "text-gray-400"
                        }`}
                      />
                      <ChevronDown
                        className={`h-3 w-3 -mt-1 ${
                          sortKey === column.key && sortDirection === "desc" ? "text-yellow-600" : "text-gray-400"
                        }`}
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-8 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={row.id || index} className="border-b transition-colors hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="p-4 align-middle">
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

interface BasicTableProps {
  children: React.ReactNode
  className?: string
}

export const Table: React.FC<BasicTableProps> = ({ children, className = "" }) => {
  return (
    <div className="relative w-full overflow-auto">
      <table className={`w-full caption-bottom text-sm ${className}`}>{children}</table>
    </div>
  )
}

export const TableHeader: React.FC<BasicTableProps> = ({ children, className = "" }) => {
  return <thead className={`border-b ${className}`}>{children}</thead>
}

export const TableBody: React.FC<BasicTableProps> = ({ children, className = "" }) => {
  return <tbody className={`${className}`}>{children}</tbody>
}

export const TableRow: React.FC<BasicTableProps> = ({ children, className = "" }) => {
  return <tr className={`border-b transition-colors hover:bg-gray-50 ${className}`}>{children}</tr>
}

interface TableCellProps {
  children: React.ReactNode
  className?: string
}

export const TableHead: React.FC<TableCellProps> = ({ children, className = "" }) => {
  return <th className={`h-12 px-4 text-left align-middle font-medium text-gray-500 ${className}`}>{children}</th>
}

export const TableCell: React.FC<TableCellProps> = ({ children, className = "" }) => {
  return <td className={`p-4 align-middle ${className}`}>{children}</td>
}
