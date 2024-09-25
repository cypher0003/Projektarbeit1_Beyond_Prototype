import React, { useState } from "react";

import "./DropDownBox_Component.css";

export const FileUploadDropdown = ({ onFileChange }) => {
  const [selectedFileType, setSelectedFileType] = useState("");

  const [file, setFile] = useState(null);

  const [dragActive, setDragActive] = useState(false);

  const allowedFileTypes = [
    {
      label: "Activation request",
      value: ["application/xml", "application/json"],
    },

    { label: "Upgrade request", value: ["application/json"] },

    { label: "Revocation proof", value: ["application/json"] },

    { label: "Return request", value: ["application/xml", "application/json"] },

    { label: "Repair request", value: ["application/xml"] },
  ];

  const handleFileTypeChange = (e) => {
    setSelectedFileType(e.target.value);

    setFile(null);

    onFileChange(null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    validateFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();

    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();

    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setDragActive(false);

    const selectedFile = e.dataTransfer.files[0];

    validateFile(selectedFile);
  };

  const validateFile = (file) => {
    const allowedTypes =
      allowedFileTypes.find((type) => type.label === selectedFileType)?.value ||
      [];

    if (file && allowedTypes.includes(file.type)) {
      setFile(file);

      onFileChange(file);
    } else {
      alert("Invalid file type selected. Please choose a valid file.");

      setFile(null);

      onFileChange(null);
    }
  };

  return (
    <>
      <div className="file-upload-container">
        <label htmlFor="fileType">Select File Type:</label>

        <select
          id="fileType"
          value={selectedFileType}
          onChange={handleFileTypeChange}
        >
          <option value="" disabled>
            Select file type
          </option>

          {allowedFileTypes.map((type) => (
            <option key={type.label} value={type.label}>
              {type.label}
            </option>
          ))}
        </select>

        <input
          type="file"
          id="fileUpload"
          onChange={handleFileChange}
          disabled={!selectedFileType}
          accept={allowedFileTypes
            .find((type) => type.label === selectedFileType)
            ?.value.join(",")}
          className="file-input"
        />

        <div
          className={`dropzone ${dragActive ? "active" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <label htmlFor="fileUpload" className="file-label">
            {file ? file.name : "Drag & Drop your file here or click to upload"}
          </label>
        </div>

        {file && <p>Selected File: {file.name}</p>}
      </div>
    </>
  );
};
