// src/components/DataTable/DataTableContainer.jsx
import React, { useState, useCallback } from "react"
import DataTableView from "./DataTableView"
import { debounce } from "lodash"

const DataTableContainer = ({
  columns,
  data,
  loading,
  totalItems,
  fetchData,
  title = "",
  searchPlaceholder = "Search...",
  noDataText = "No data found",
}) => {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState("")
  const [sortField, setSortField] = useState("")
  const [sortDirection, setSortDirection] = useState("asc")

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearch(value)
      fetchData({
        pageIndex,
        pageSize,
        search: value,
        sortField,
        sortDirection,
      })
    }, 500),
    [pageIndex, pageSize, sortField, sortDirection]
  )

  const handlePageChange = (newPage) => {
    setPageIndex(newPage)
    fetchData({
      pageIndex: newPage,
      pageSize,
      search,
      sortField,
      sortDirection,
    })
  }

  const handlePerPageChange = (newSize) => {
    setPageSize(newSize)
    setPageIndex(0)
    fetchData({
      pageIndex: 0,
      pageSize: newSize,
      search,
      sortField,
      sortDirection,
    })
  }

  const handleSearch = (value) => {
    debouncedSearch(value)
  }

  const handleSort = (field, direction) => {
    setSortField(field)
    setSortDirection(direction)
    fetchData({
      pageIndex,
      pageSize,
      search,
      sortField: field,
      sortDirection: direction,
    })
  }

  return (
    <DataTableView
      columns={columns}
      data={data}
      loading={loading}
      onPageChange={handlePageChange}
      onPerPageChange={handlePerPageChange}
      onSearch={handleSearch}
      onSort={handleSort}
      pageIndex={pageIndex}
      pageSize={pageSize}
      totalItems={totalItems}
      searchPlaceholder={searchPlaceholder}
      noDataText={noDataText}
      title={title}
    />
  )
}

export default DataTableContainer
