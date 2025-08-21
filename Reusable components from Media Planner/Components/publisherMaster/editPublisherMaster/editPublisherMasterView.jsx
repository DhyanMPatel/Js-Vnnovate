import { Box, Button, MenuItem } from "@mui/material";
import { ModalContainer, TextInputContainer } from "../../../common";
import "./editPublisherMasterStyle.scss";
import FileUploadFieldContainer from "../../../common/fileUpload/fileUploadFieldContainer";

const EditPublisherMasterView = ({
  isModalOpen,
  toggleModal,
  handleSubmit,
  initialValues,
  loading,
}) => {
  return (
    <ModalContainer
      isOpen={isModalOpen}
      onClose={toggleModal}
      title="Edit Publisher"
      initialValues={initialValues}
      formikHandleFormSubmit={handleSubmit}
      mainSize="sm"
    >
      {(formikProps) => (
        <div className="publisher-form">
          <Box className="publisher-form-name">
            <TextInputContainer
              name="name"
              label="Publisher Name"
              placeholder="Enter publisher name"
              required
              formikProps={formikProps}
              className="full-width"
            />
          </Box>

          <Box className="publisher-form-description">
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
            <span className="publisher-form-char-count">
              {formikProps.values.description.length}/250 characters
            </span>
          </Box>

          <Box className="publisher-form-mediaType">
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

          <Box className="publisher-form-status">
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

          <Box className="publisher-form-logo">
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

          <Box className="publisher-form-actions">
            <Button
              type="button"
              variant="outlined"
              className="publisher-form-cancel-btn"
              onClick={toggleModal}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="publisher-form-submit-btn"
              onClick={() => formikProps.submitForm()}
              disabled={
                formikProps.isSubmitting || !formikProps.isValid || loading
              }
            >
              Update
            </Button>
          </Box>
        </div>
      )}
    </ModalContainer>
  );
};

export default EditPublisherMasterView;
