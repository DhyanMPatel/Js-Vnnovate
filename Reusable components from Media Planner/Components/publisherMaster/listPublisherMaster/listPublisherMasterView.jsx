import React, { useMemo } from "react";
import { Box, Button, Typography, IconButton, Chip } from "@mui/material";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import "./listPublisherMasterStyle.scss";
import DataTableContainer from "../../../common/dataTable/dataTableContainer";

const ListPublisherMasterView = ({
  publishers,
  loading,
  totalItems,
  currentPage,
  pageSize,
  totalPages,
  onAddPublisher,
  onEditPublisher,
  onDeletePublisher,
  onPageChange,
  onPerPageChange,
  onSearch,
  onSort,
}) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Publisher Name",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "mediaType",
        header: "Media Type",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          const isActive = status === "active";
          return (
            <Chip
              label={status.charAt(0).toUpperCase() + status.slice(1)}
              size="small"
              sx={{
                backgroundColor: isActive ? "#00B69B" : "#FF0000",
                color: "#FFFFFF",
                textTransform: "capitalize",
              }}
            />
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created Date",
        cell: ({ row }) => {
          const date = new Date(row.original.createdAt);
          return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const publisher = row.original;
          return (
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                size="small"
                color="primary"
                onClick={() => onEditPublisher(publisher)}
              >
                <FiEdit2 size={16} />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={() => onDeletePublisher(publisher._id)}
              >
                <FiTrash2 size={16} />
              </IconButton>
            </Box>
          );
        },
      },
    ],
    [onEditPublisher, onDeletePublisher]
  );

  return (
    <Box className="publisher-list">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "center", sm: "center" },
          mb: 4,
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontSize: { xs: "1.5rem", sm: "1.50rem" } }}
        >
          Publisher Master
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={onAddPublisher}
          startIcon={<FiPlus />}
          sx={{
            width: { xs: "100%", sm: "auto" },
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          Add Publisher
        </Button>
      </Box>

      <DataTableContainer
        title="Publisher Master List"
        data={publishers || []}
        columns={columns}
        loading={loading}
        pageIndex={currentPage - 1}
        pageSize={pageSize}
        totalItems={totalItems}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onPerPageChange={onPerPageChange}
        onSearch={onSearch}
        handleSortChange={onSort}
        onSort={(column, direction) => onSort(column.accessorKey, direction)}
      />
    </Box>
  );
};

export default ListPublisherMasterView;
