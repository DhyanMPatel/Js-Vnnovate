import React, { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { X, Upload, FileText } from "lucide-react";

interface DocumentUploadProps {
  value?: { name: string; url: string; uploadedAt: string }[];
  onChange: (
    documents: { name: string; url: string; uploadedAt: string }[]
  ) => void;
  label?: string;
  placeholder?: string;
  accept?: string;
  maxFiles?: number;
  disabled?: boolean;
}

export function DocumentUpload({
  value = [],
  onChange,
  label = "Upload Documents",
  placeholder = "Click to upload or drag and drop",
  accept = ".pdf,.doc,.docx,.txt",
  maxFiles = 5,
  disabled = false,
}: DocumentUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Check if we've reached max files
    if (value.length >= maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Validate file type
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    const acceptedTypes = accept.split(",").map((type) => type.trim());
    if (
      !acceptedTypes.includes(fileExtension) &&
      !acceptedTypes.includes("*")
    ) {
      alert(`Invalid file type. Accepted types: ${accept}`);
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Create a mock URL (in real app, this would be an actual upload)
      const mockUrl = URL.createObjectURL(file);

      // Simulate upload completion
      setTimeout(() => {
        clearInterval(progressInterval);
        setUploadProgress(100);

        const newDocument = {
          name: file.name,
          url: mockUrl,
          uploadedAt: new Date().toISOString(),
        };

        onChange([...value, newDocument]);
        setUploading(false);
        setUploadProgress(0);

        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 1500);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const removeDocument = (index: number) => {
    const newDocuments = value.filter((_, i) => i !== index);
    onChange(newDocuments);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      // Create a synthetic event to reuse the file select logic
      const syntheticEvent = {
        target: { files },
      } as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(syntheticEvent);
    }
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          disabled
            ? "border-gray-200 bg-gray-50 cursor-not-allowed"
            : "border-gray-300 hover:border-gray-400 cursor-pointer"
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          disabled={disabled}
          className="hidden"
        />

        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <p className="text-sm text-gray-600 mb-2">{placeholder}</p>
        <p className="text-xs text-gray-500">
          Accepted formats: {accept} (Max {maxFiles} files, 10MB each)
        </p>

        {uploading && (
          <div className="mt-4">
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-xs text-gray-500 mt-2">
              Uploading... {uploadProgress}%
            </p>
          </div>
        )}
      </div>

      {/* Uploaded Files List */}
      {value.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Uploaded Documents</Label>
          {value.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
            >
              <div className="flex items-center space-x-3">
                <FileText className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {doc.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {!disabled && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDocument(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
