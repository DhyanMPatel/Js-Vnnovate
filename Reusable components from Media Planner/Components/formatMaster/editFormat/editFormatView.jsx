import React from "react";
import { ModalContainer, TextInputContainer } from "../../../common";
import { Box, Button, MenuItem } from "@mui/material";

const EditFormatView = ({
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
      title="Add New Format"
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
              placeholder="Enter name"
              required
              formikProps={formikProps}
              className="full-width"
            />
          </Box>
          <Box className="form-field">
            <TextInputContainer
              name="description"
              label="Description"
              placeholder="Enter description"
              formikProps={formikProps}
              required
              multiline
              rows={4}
              inputProps={{ maxLength: 250 }}
              className="full-width"
            />
            <span className="char-count">
              {formikProps.values.description.length}/250 characters
            </span>
          </Box>
          <Box className="form-field">
            <TextInputContainer
              name="allowed_sizes"
              label="Allowed Sizes"
              placeholder="Select allowed sizes"
              formikProps={formikProps}
              select
              className="full-width"
            >
              <MenuItem
                value="Leaderboard (728x90)"
                label="Leaderboard (728x90)"
              >
                Leaderboard (728x90)
              </MenuItem>
              <MenuItem value="Square (1:1)" label="Square (1:1)">
                Square (1:1)
              </MenuItem>
            </TextInputContainer>
          </Box>
          <Box className="form-field">
            <TextInputContainer
              name="allowed_durations"
              label="Allowed Durations"
              placeholder="Select allowed durations"
              formikProps={formikProps}
              select
              className="full-width"
            >
              <MenuItem value="15 seconds" label="15 seconds">
                15 seconds
              </MenuItem>
              <MenuItem value="30 seconds" label="30 seconds">
                30 seconds
              </MenuItem>
            </TextInputContainer>
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
              Save
            </Button>
          </Box>
        </div>
      )}
    </ModalContainer>
  );
};

export default EditFormatView;
