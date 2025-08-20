import React, { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import FileUploadFieldView from "./fileUploadFieldView"

const FileUploadFieldContainer = ({
  label,
  name,
  value,
  onChange,
  error,
  helperText,
}) => {
  const [preview, setPreview] = useState(null)
  const [isFileObject, setIsFileObject] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        setIsFileObject(true)
        onChange(name, file) // send file to Formik
      }
    },
    [name, onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxSize: 10 * 1024 * 1024,
  })

  // Handle preview
  useEffect(() => {
    if (!value) {
      setPreview(null)
      return
    }

    if (value instanceof File) {
      setIsFileObject(true)
      if (value.type?.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(value)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
      } else {
        setPreview(null)
      }
    } else if (typeof value === "string") {
      setIsFileObject(false)
      if (value.match(/\.(jpeg|jpg|png|gif)$/i)) {
        setPreview(value)
      } else {
        setPreview(null)
      }
    }
  }, [value])

  return (
    <FileUploadFieldView
      label={label}
      getRootProps={getRootProps}
      getInputProps={getInputProps}
      isDragActive={isDragActive}
      preview={preview}
      value={value}
      isFileObject={isFileObject}
      error={error}
      helperText={helperText}
    />
  )
}

export default FileUploadFieldContainer
