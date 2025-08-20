// src/components/DataTable/DataTableView.jsx
import React, { useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table"
import "./dataTablestyles.scss"

const DataTableView = ({
  columns,
  data,
  loading = false,
  onPageChange,
  onPerPageChange,
  onSearch,
  onSort,
  pageIndex = 0,
  pageSize = 10,
  totalItems = 0,
  searchPlaceholder = "Search...",
  noDataText = "No data found",
  title = "",
}) => {
  const [sorting, setSorting] = useState([])

  const table = useReactTable({
    data: data || [],
    columns,
    pageCount: Math.ceil(totalItems / pageSize),
    state: { pagination: { pageIndex, pageSize }, sorting },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater

      if (newPagination.pageSize !== pageSize) {
        onPerPageChange(newPagination.pageSize)
      } else {
        onPageChange(newPagination.pageIndex)
      }
    },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater
      setSorting(newSorting)

      if (newSorting.length > 0) {
        const { id, desc } = newSorting[0]
        onSort(id, desc ? "desc" : "asc")
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    manualSorting: true,
  })

  const handleSearch = (e) => onSearch(e.target.value)

  return (
    <div className="data-table-container">
      <div className="data-table-header">
        {title && <h3>{title}</h3>}
        <div className="data-table-controls">
          <div className="search-container">
            <input
              type="text"
              className="form-control"
              placeholder={searchPlaceholder}
              onChange={handleSearch}
            />
          </div>
          <div className="page-size-selector">
            <span>Show: </span>
            <select
              value={pageSize}
              onChange={(e) => onPerPageChange(Number(e.target.value))}
            >
              {[10, 25, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={() =>
                      header.column.getCanSort() &&
                      header.column.toggleSorting()
                    }
                    style={{
                      cursor: header.column.getCanSort()
                        ? "pointer"
                        : "default",
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc" && " 🔼"}
                    {header.column.getIsSorted() === "desc" && " 🔽"}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  {noDataText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-controls">
        <div className="pagination-info">
          Showing {pageIndex * pageSize + 1} to{" "}
          {Math.min((pageIndex + 1) * pageSize, totalItems)} of {totalItems}{" "}
          entries
        </div>
        <div className="pagination-buttons">
          <button
            className="pagination-button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <span className="pagination-page-info">
            Page {pageIndex + 1} of {Math.ceil(totalItems / pageSize)}
          </span>
          <button
            className="pagination-button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  )
}

export default DataTableView
