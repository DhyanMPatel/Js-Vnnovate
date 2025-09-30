import { Box, Button, MenuItem } from "@mui/material";
import React from "react";
import { ModalContainer, TextInputContainer } from "../../../common";
import "./editTimeSlotStyle.scss";

const EditTimeSlotView = ({
  isModalOpen,
  toggleModal,
  handleSubmit,
  validationSchema,
  initialValues,
  loading,
}) => {
  return (
    <ModalContainer
      isOpen={isModalOpen}
      onClose={toggleModal}
      title="Update Time Slot"
      initialValues={initialValues}
      validationSchema={validationSchema}
      formikHandleFormSubmit={handleSubmit}
      mainSize="xs"
    >
      {(formikProps) => (
        <div className="media-type-form">
          <Box className="form-field">
            <TextInputContainer
              name="media_type_id"
              label="Media Type Id"
              placeholder="Enter media type id"
              required
              select
              formikProps={formikProps}
              className="full-width"
            >
              <MenuItem value="Digital Display" label="Digital Display">
                Digital Display
              </MenuItem>
              <MenuItem value="Social Media" label="Social Media">
                Social Media
              </MenuItem>
              <MenuItem value="Television" label="Television">
                Television
              </MenuItem>
            </TextInputContainer>
          </Box>
          <Box className="form-field">
            <TextInputContainer
              name="name"
              label="Name"
              required
              formikProps={formikProps}
              select
              className="full-width"
            >
              <MenuItem value="Morning" label="Morning">
                Morning
              </MenuItem>
              <MenuItem value="Afternoon" label="Afternoon">
                Afternoon
              </MenuItem>
              <MenuItem value="Evening" label="Evening">
                Evening
              </MenuItem>
              <MenuItem value="Prime Time" label="Prime Time">
                Prime Time
              </MenuItem>
            </TextInputContainer>
          </Box>
          <Box className="form-field">
            <TextInputContainer
              name="start_time"
              label="Start Time"
              required
              formikProps={formikProps}
              className="full-width"
              isTime={true}
            />
          </Box>
          <Box className="form-field">
            <TextInputContainer
              name="end_time"
              label="End Time"
              required
              formikProps={formikProps}
              className="full-width"
              isTime={true}
            />
          </Box>

          <Box className="modal-actions" sx={{ display: "flex", gap: 1 }}>
            <Button
              type="button"
              variant="outlined"
              className="cancel-btn"
              onClick={toggleModal}
              sx={{ flex: 1, color: "#666", borderColor: "#ccc" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="submit-btn"
              onClick={() => formikProps.submitForm()}
              disabled={
                formikProps.isSubmitting || !formikProps.isValid || loading
              }
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              Update
            </Button>
          </Box>
        </div>
      )}
    </ModalContainer>
  );
};

export default EditTimeSlotView;
