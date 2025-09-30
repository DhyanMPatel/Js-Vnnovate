import { Box, Button, MenuItem } from "@mui/material";
import { ModalContainer, TextInputContainer } from "../../../common";
import "./addPublisherMasterStyle.scss";
import FileUploadFieldContainer from "../../../common/fileUpload/fileUploadFieldContainer";

const AddPublisherMasterView = ({
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
      title="Add New Publisher"
      initialValues={initialValues}
      validationSchema={validationSchema}
      formikHandleFormSubmit={handleSubmit}
      mainSize="sm"
    >
      {(formikProps) => (
        <div className="publisher-form">
          <Box className="form-field">
            <TextInputContainer
              name="name"
              label="Publisher Name"
              placeholder="Enter publisher name"
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
              required
              multiline
              rows={4}
              inputProps={{ maxLength: 250 }}
              formikProps={formikProps}
              className="full-width"
            />
            <span className="char-count">
              {formikProps.values.description.length}/250 characters
            </span>
          </Box>

          <Box className="form-field">
            <TextInputContainer
              name="mediaType"
              label="Media Type"
              placeholder="Select media type"
              select
              required
              formikProps={formikProps}
              className="full-width"
            >
              <MenuItem value="Media A">Media A</MenuItem>
              <MenuItem value="Media B">Media B</MenuItem>
              <MenuItem value="Media C">Media C</MenuItem>
            </TextInputContainer>
          </Box>

          <Box className="form-field">
            <TextInputContainer
              name="status"
              label="Status"
              placeholder="Select status"
              select
              required
              formikProps={formikProps}
              className="full-width"
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextInputContainer>
          </Box>

          <Box className="form-field">
            <FileUploadFieldContainer
              name="logo"
              label="Publisher Logo (PNG, JPG, JPEG)"
              value={formikProps.values.logo}
              accept="image/png,image/jpeg,image/jpg"
              onChange={(name, file) => formikProps.setFieldValue(name, file)}
              error={
                formikProps.touched.logo && Boolean(formikProps.errors.logo)
              }
              helperText={formikProps.touched.logo && formikProps.errors.logo}
            />

            {formikProps.values.logo &&
              typeof formikProps.values.logo !== "string" && (
                <img
                  src={URL.createObjectURL(formikProps.values.logo)}
                  alt="Logo Preview"
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "contain",
                    marginTop: 8,
                  }}
                />
              )}

            {typeof formikProps.values.logo === "string" && (
              <img
                src={formikProps.values.logo}
                alt="Existing Logo"
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "contain",
                  marginTop: 8,
                }}
              />
            )}
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

export default AddPublisherMasterView;
