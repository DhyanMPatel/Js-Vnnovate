import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { MdOutlineGroupAdd } from "react-icons/md";
import { StatusChipContainer } from "../../../common";
import DataTableContainer from "../../../common/dataTable/dataTableContainer";
import "./formatStyle.scss";

const FormatView = (props) => {
  const { t } = useTranslation();
  const {
    formats,
    loading,
    totalItems,
    currentPage,
    pageSize,
    totalPages,
    fetchFormats,
    onAddFormat,
    onEditFormat,
    onDeleteFormat,
  } = props;

  const columns = useMemo(
    () => [
      {
        accessorKey: "media_type_id",
        header: "Media Type Id",
      },
      {
        accessorKey: "name",
        header: "name",
      },
      {
        accessorKey: "description",
        header: "description",
      },
      {
        accessorKey: "allowed_sizes",
        header: "Allowed Sizes",
      },
      {
        accessorKey: "allowed_durations",
        header: "Allowed Durations",
      },
      {
        accessorKey: "cost_parameters",
        header: "Cost Parameters",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const format = row.original;
          return (
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                size="small"
                color="primary"
                onClick={() => onEditFormat(format)}
              >
                <FiEdit2 size={16} />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={() => onDeleteFormat(format.id)}
              >
                <FiTrash2 size={16} />
              </IconButton>
            </Box>
          );
        },
      },
    ],
    []
  );

  return (
    <Box className="client-management">
      <Box className="client-management__header">
        <Typography component="h1" className="client-management__title">
          {/* {t("clientManagement.title")} */}
          fomat Master
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onAddFormat}
          startIcon={<MdOutlineGroupAdd />}
          className="create-client-btn"
        >
          {/* {t("clientManagement.addClient")} */}
          add Format
        </Button>
      </Box>

      {/* Table */}
      <DataTableContainer
        title={"Format Master List"}
        data={formats || []}
        columns={columns}
        loading={loading}
        totalItems={totalItems}
        fetchData={fetchFormats}
      />
    </Box>
  );
};

export default FormatView;
