import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { MdOutlineGroupAdd } from "react-icons/md";
import DataTableContainer from "../../../common/dataTable/dataTableContainer";
import "./timeStyle.scss";

const TimeView = (props) => {
  const {
    timeSlots,
    loading,
    totalItems,
    currentPage,
    pageSize,
    totalPages,
    fetchTimeSlots,
    onAddTimeSlot,
    onEditTimeSlot,
    onDeleteTimeSlot,
  } = props;

  const columns = useMemo(
    () => [
      {
        accessorKey: "media_type_id",
        header: "Media Type Id",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "start_time",
        header: "Start Time",
      },
      {
        accessorKey: "end_time",
        header: "End Time",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const timeSlot = row.original;
          return (
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                size="small"
                color="primary"
                onClick={() => onEditTimeSlot(timeSlot)}
              >
                <FiEdit2 size={16} />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={() => onDeleteTimeSlot(timeSlot.id)}
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
          Time Slot Master
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onAddTimeSlot}
          startIcon={<MdOutlineGroupAdd />}
          className="create-client-btn"
        >
          add Time Slot
        </Button>
      </Box>

      {/* Table */}
      <DataTableContainer
        title={"Time Slot Master List"}
        data={timeSlots || []}
        columns={columns}
        loading={loading}
        totalItems={totalItems}
        fetchData={fetchTimeSlots}
      />
    </Box>
  );
};

export default TimeView;
