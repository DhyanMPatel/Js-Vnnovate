import React from "react"
import { Box, Typography } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

const FileUploadFieldView = ({
  label,
  getRootProps,
  getInputProps,
  isDragActive,
  preview,
  value,
  isFileObject,
  error,
  helperText,
}) => {
  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed",
        borderColor: isDragActive ? "primary.main" : "#ccc",
        borderRadius: "8px",
        p: 3,
        textAlign: "center",
        cursor: "pointer",
        mt: 2,
        "&:hover": { borderColor: "primary.main" },
      }}
    >
      <input {...getInputProps()} />
      <CloudUploadIcon sx={{ fontSize: 40, color: "gray" }} />
      <Typography variant="subtitle1" sx={{ mt: 1 }}>
        {label}
      </Typography>

      {preview ? (
        <Box sx={{ mt: 2 }}>
          <img
            src={preview}
            alt="preview"
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              borderRadius: "8px",
            }}
          />
        </Box>
      ) : value ? (
        <Typography variant="body2" sx={{ mt: 1, color: "green" }}>
          {isFileObject ? value.name : value.split("/").pop()}
        </Typography>
      ) : (
        <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
          Drag & drop or click to upload (Image/PDF/DOC, Max 10MB)
        </Typography>
      )}

      {error && (
        <Typography
          variant="caption"
          color="error"
          display="block"
          sx={{ mt: 1 }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  )
}

export default FileUploadFieldView
