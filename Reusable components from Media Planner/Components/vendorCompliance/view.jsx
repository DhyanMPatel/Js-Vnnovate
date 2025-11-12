import {
  Box,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  FormBtnsContainer,
  ModalContainer,
  TextInputContainer,
} from "../../../common";
import DropdownContainer from "../../../common/dropdown/dropdownContainer";
import { Delete } from "@mui/icons-material";
import "./addUploadComplianceStyle.scss";

const AddUploadComplianceView = ({
  isOpen,
  handleCloseModal,
  handleSubmit,
  validationSchema,
  initialValues,
  loading,
  clientList,
  campaignList,
}) => {
  const { purchaseOrderDropdownList } = useSelector(
    (state) => state.purchaseOrder
  );
  const MAX_FILES = 5;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleFileDrop = (formikProps) => (acceptedFiles, fileRejections) => {
    // Handle file rejections
    fileRejections.forEach(({ file, errors }) => {
      errors.forEach((err) => {
        if (err.code === "file-too-large") {
          formikProps.setFieldError(
            "complianceImages",
            "File is too large (max 5MB)"
          );
        } else if (err.code === "too-many-files") {
          formikProps.setFieldError(
            "complianceImages",
            `Maximum ${MAX_FILES} files allowed`
          );
        } else {
          formikProps.setFieldError("complianceImages", err.message);
        }
      });
    });

    // Add new files to formik
    const currentFiles = formikProps.values.complianceImages || [];
    const newFiles = [
      ...currentFiles,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ];

    if (newFiles.length > MAX_FILES) {
      formikProps.setFieldError(
        "complianceImages",
        `Maximum ${MAX_FILES} files allowed`
      );
      return;
    }

    formikProps.setFieldValue("complianceImages", newFiles);
  };

  const removeFile = (formikProps) => (fileIndex) => {
    const files = formikProps?.values?.complianceImages || [];
    const newFiles = [...files];
    URL.revokeObjectURL(newFiles[fileIndex]?.preview);
    newFiles.splice(fileIndex, 1);
    formikProps.setFieldValue("complianceImages", newFiles);
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={handleCloseModal}
      title="Add Compliance"
      initialValues={initialValues}
      validationSchema={validationSchema}
      formikHandleFormSubmit={handleSubmit}
      size="md"
    >
      {(formikProps) => {
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
          accept: {
            "image/*": [".jpeg", ".jpg", ".png"],
          },
          maxFiles: MAX_FILES,
          maxSize: MAX_FILE_SIZE,
          onDrop: handleFileDrop(formikProps),
        });

        const files = formikProps?.values?.complianceImages || [];

        return (
          <Box className="add-upload-compliance-container">
            <Grid container spacing={3}>
              <Grid item size={{ xs: 6 }}>
                <DropdownContainer
                  name="purchaseOrder"
                  label="Purchase Order"
                  formikProps={formikProps}
                  options={purchaseOrderDropdownList?.map((po) => ({
                    value: po._id,
                    label: `${po.poNumber}`,
                  }))}
                  fullWidth
                  placeholder="Search PO"
                  required
                />
              </Grid>

              <Grid item size={{ xs: 12 }}>
                <Box className="form-section">
                  <Typography
                    variant="subtitle1"
                    className="section-title"
                    gutterBottom
                  >
                    Upload Compliance Images
                  </Typography>
                  <Divider />
                  <Box mt={2}>
                    <Typography variant="subtitle2" gutterBottom>
                      Max {MAX_FILES} files, {MAX_FILE_SIZE / (1024 * 1024)}MB
                      each
                    </Typography>
                    <div
                      {...getRootProps()}
                      className={`dropzone ${isDragActive ? "active" : ""} ${
                        formikProps.errors.complianceImages ? "error" : ""
                      }`}
                    >
                      <input {...getInputProps()} />
                      <Typography variant="body2">
                        {isDragActive
                          ? "Drop the files here..."
                          : "Drag & drop some files here, or click to select files"}
                      </Typography>
                    </div>
                    {formikProps.touched.complianceImages &&
                      formikProps.errors.complianceImages && (
                        <Typography variant="caption" color="error">
                          {formikProps.errors.complianceImages}
                        </Typography>
                      )}

                    {/* Preview uploaded files */}
                    {files.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                          {files.map((file, index) => (
                            <Grid item key={file.name} xs={6} sm={4} md={3}>
                              <Box className="file-preview">
                                <img
                                  src={
                                    file.preview || URL.createObjectURL(file)
                                  }
                                  alt={file.name}
                                  className="preview-image"
                                />
                                <div className="file-info">
                                  <Typography variant="caption" noWrap>
                                    {file.name}
                                  </Typography>
                                  <Typography variant="caption">
                                    {(file.size / 1024).toFixed(1)} KB
                                  </Typography>
                                </div>
                                <IconButton
                                  size="small"
                                  className="remove-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(formikProps)(index);
                                  }}
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <FormBtnsContainer
              onCancel={handleCloseModal}
              loading={loading}
              submitButtonText="Submit Compliance"
              isSubmitting={formikProps?.isSubmitting}
              cancelBtn="Cancel"
              submitBtn="Create"
              submittingBtn="Loading..."
            />
          </Box>
        );
      }}
    </ModalContainer>
  );
};

export default AddUploadComplianceView;
