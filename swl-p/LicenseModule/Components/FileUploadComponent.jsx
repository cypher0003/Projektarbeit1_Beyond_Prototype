import React, { useState, useRef, useEffect } from "react";

import {
  Button,
  GeneralModal,
  Grid,
  Container,
  Cell,
  FileUpload,
} from "@zeiss/beyond-online-react";
import { DialogOkDiscardComponent } from "./DialogOkDiscard";

import { FileUploadDropdown } from "../../src/Components/MainMenu_Components/DropDownBox_Component.jsx";

import { FileUploadComponentViewModel } from "../../src/Moduls/LicenseModul/Model/FileUploadComponentModel.mjs";

import PropTypes from "prop-types";

export const FileUploadComponent = ({
  onClear,
  activationClient,
  jsRuntime,
  configuration,
  locationPrefixValidator,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [
    activationPreviewDialogIsLoading,
    setActivationPreviewDialogIsLoading,
  ] = useState(false);

  const [upgradePreviewDialogIsLoading, setUpgradePreviewDialogIsLoading] =
    useState(false);

  const [showActivationPreviewDialog, setShowActivationPreviewDialog] =
    useState(false);

  const [showUpgradePreviewDialog, setShowUpgradePreviewDialog] =
    useState(false);

  const [showDialog, setShowDialog] = useState(false);

  const [alertText, setAlertText] = useState("");

  const [dialogCaption, setDialogCaption] = useState("");

  const [dialogText, setDialogText] = useState("");

  const [fileUploaded, setFileUploaded] = useState(false);

  const fileRef = useRef(null);
  const [RefFileContent, setRefFileContent] = useState(null);

  const viewModel = useRef(
    new FileUploadComponentViewModel(
      activationClient,
      jsRuntime,
      configuration,
      locationPrefixValidator
    )
  ).current;

  const clearComponent = async () => {
    setAlertText("");

    fileRef.current = null;

    setShowDialog(false);

    setShowActivationPreviewDialog(false);

    setShowUpgradePreviewDialog(false);

    setFileUploaded(false);
  };

  const handleFileUpload = (file) => {
    if (!file) {
      console.error("No file selected.");

      setAlertText("Bitte wählen Sie eine Datei aus.");

      return;
    }

    if (file instanceof File) {
      console.log(`File selected: ${file.name}`);

      const reader = new FileReader();

      reader.onload = (event) => {
        const fileContent = event.target.result;

        console.log(`File content: ${fileContent}`);
        setRefFileContent(fileContent);

        setAlertText("");

        setFileUploaded(true);
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);

        setAlertText("Fehler beim Lesen der Datei.");
      };

      reader.readAsText(file);
    } else {
      console.error("The selected input is not a file.");

      setAlertText("Das ausgewählte Element ist keine Datei.");
    }
  };

  const onNextButtonClicked = async () => {
    console.log(`button clicked with content ${RefFileContent}`);

    if (!RefFileContent) {
      setAlertText("Bitte wählen Sie eine gültige Datei aus.");

      console.error("no file ref");

      return;
    }

    setIsLoading(true);

    console.log("loading=true");

    await onClear();

    console.log("cleared");

    console.log("prep to analyze content");

    try {
      await viewModel.analyzeUploadedFile(RefFileContent, activationClient);

      console.log("content analyzed");

      switch (viewModel.uploadFileType) {
        case "Activation":

        case "CertificateActivation":

        case "TrustedStorageActivation":

        case "SignedActivation":

        case "SignedBindingActivation":
          setShowActivationPreviewDialog(
            viewModel.activationPreviewItems.length > 0
          );

          setShowDialog(viewModel.activationPreviewInvalidItems.length > 0);

          break;

        case "SignedUpgrade":
          setShowUpgradePreviewDialog(true);

          break;

        default:
          clearComponent();

          setShowDialog(true);

          break;
      }
    } catch (error) {
      setAlertText("Es ist ein Fehler beim Hochladen der Datei aufgetreten.");
    } finally {
      setIsLoading(false);
    }
  };

  const onActivationPreviewNextButtonClicked = async () => {
    setAlertText("");

    setActivationPreviewDialogIsLoading(true);

    try {
      await viewModel.activate();

      setShowActivationPreviewDialog(false);

      clearComponent();

      setShowDialog(true);
    } catch (error) {
      setAlertText("Es ist ein Fehler beim Aktivieren aufgetreten.");
    } finally {
      setActivationPreviewDialogIsLoading(false);
    }
  };

  const onUpgradePreviewNextButtonClicked = async () => {
    setAlertText("");

    setUpgradePreviewDialogIsLoading(true);

    try {
      await viewModel.upgrade();

      setShowUpgradePreviewDialog(false);

      setShowDialog(true);
    } catch (error) {
      setAlertText("Es ist ein Fehler beim Upgrade aufgetreten.");
    } finally {
      setUpgradePreviewDialogIsLoading(false);
    }
  };

  const onCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <>
      <Grid>
        <Cell.Basic colSpan={[3, 4, 5]}>{}</Cell.Basic>

        <Container.InnerGrid className="Upload-Container">
          <Cell.MaxWidth></Cell.MaxWidth>

          <Cell.MaxWidth>
            <h1>File upload</h1>
          </Cell.MaxWidth>

          <Cell.Basic colSpan={[2, 3, 4]}>
            <div className="Restrictions-Container">
              Allowed filetypes:
              <ul>
                <li>XML, JSON</li>
              </ul>
            </div>
          </Cell.Basic>

          <Cell.Basic colSpan={[5, 6, 7, 8]}>
            <FileUploadDropdown onFileChange={handleFileUpload} />
          </Cell.Basic>

          <Cell.MaxWidth>
            <Button onClick={onNextButtonClicked} disabled={!fileUploaded}>
              {isLoading ? "Loading..." : "Next"}
            </Button>
          </Cell.MaxWidth>
        </Container.InnerGrid>
      </Grid>

      <GeneralModal
        isOpen={showActivationPreviewDialog}
        headline="Activation Preview"
        acceptButtonText="Next"
        declineButtonText="Cancel"
        onClose={() => setShowActivationPreviewDialog(false)}
        onAccept={onActivationPreviewNextButtonClicked}
      >
        {viewModel.activationPreviewItemIds.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </GeneralModal>

      <GeneralModal
        isOpen={showUpgradePreviewDialog}
        headline="Upgrade Preview"
        acceptButtonText="Next"
        declineButtonText="Cancel"
        onClose={() => setShowUpgradePreviewDialog(false)}
        onAccept={onUpgradePreviewNextButtonClicked}
      >
        <p>Upgrade preview content</p>
      </GeneralModal>

      <DialogOkDiscardComponent
        showDialog={showDialog}
        caption={dialogCaption}
        text={dialogText}
        onOkClick={onCloseDialog}
        onCloseClick={onCloseDialog}
        onDiscardClick={() => console.log("Discard clicked")}
      />
    </>
  );
};

FileUploadComponent.propTypes = {
  onClear: PropTypes.func.isRequired,

  activationClient: PropTypes.object.isRequired,

  configuration: PropTypes.object.isRequired,

  locationPrefixValidator: PropTypes.object.isRequired,
};
