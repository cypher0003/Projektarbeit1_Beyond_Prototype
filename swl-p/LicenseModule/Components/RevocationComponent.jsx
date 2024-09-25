import React, { useState, useEffect, useRef } from "react";

import PropTypes from "prop-types";

import { DialogOkDiscardComponent } from "./DialogOkDiscard";

import { RevocationComponentViewModel } from "../../src/Moduls/LicenseModul/Model/RevocationComponentViewModel.mjs";
import {
  Headline,
  Grid,
  Container,
  Cell,
  Button,
  TextArea,
  Logo,
} from "@zeiss/beyond-online-react";

const RevocationComponent = ({ activationClient, userClient, onClear }) => {
  const handleDiscardClick = () => {
    console.log("Discard clicked");
  };

  const [isLoading, setIsLoading] = useState(false);

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const [activationId, setActivationId] = useState("");

  const [isUserOverridePolicyAvailable, setIsUserOverridePolicyAvailable] =
    useState(false);

  const [overridePolicy, setOverridePolicy] = useState(false);

  const [validationErrorText, setValidationErrorText] = useState("");

  const [alertText, setAlertText] = useState("");

  const alertRef = useRef(null);

  const [viewModel, setViewModel] = useState(null);

  useEffect(() => {
    const onInitialized = async () => {
      const viewModelInstance = new RevocationComponentViewModel(
        activationClient
      );
      viewModelInstance.activationId = activationId;
      console.log(viewModelInstance.activationId);

      setViewModel(viewModelInstance);
    };

    onInitialized();
  }, [activationClient]);

  const handleClear = () => {
    setActivationId("");

    setAlertText("");

    setIsUserOverridePolicyAvailable(false);

    setIsLoading(false);

    setShowSuccessDialog(false);
  };

  const onGetRevocationTicketButtonClicked = async () => {
    setIsLoading(true);

    handleClear();

    try {
      if (alertRef.current) {
        alertRef.current.style.display = "none";
      }
      if (activationId === "") {
        console.error("No activationId setted");
      }
      console.log(activationId);

      viewModel.activationId = activationId;
      await viewModel.createPermissionTicket(activationId);

      setShowSuccessDialog(true);
    } catch (error) {
      console.error(error.message);
      if (alertRef.current) {
        setAlertText(error.message);

        alertRef.current.style.display = "block";
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateActivationId = () => {
    const regex = /^[a-zA-Z0-9-_.]*$/;

    if (!regex.test(activationId)) {
      setValidationErrorText("Ungültige Zeichen in der Aktivierungs-ID.");
    } else {
      setValidationErrorText("");
    }
  };

  const onCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
  };

  return (
    <>
      <Grid>
        <Container.InnerGrid className="Request-Revocation-Container">
          <Container.InnerGrid className="Items-Container">
            <Cell.MaxWidth>
              <Headline
                className="Headline"
                subHeadline="Request revocation"
              ></Headline>
            </Cell.MaxWidth>
            <Cell.Basic></Cell.Basic>
            <Cell.MaxWidth>
              <TextArea
                size="m"
                label="Activation ID:"
                placeholder="Enter Activation ID here"
                helperText=""
                value={activationId}
                onChange={(e) => setActivationId(e.target.value)}
                onBlur={validateActivationId}
              ></TextArea>
              {validationErrorText && (
                <div className="validation-error">{validationErrorText}</div>
              )}
            </Cell.MaxWidth>
          </Container.InnerGrid>
          <Cell.Basic>
            <Button
              className="Upload-Button"
              disabled={!activationId || validationErrorText}
              onClick={onGetRevocationTicketButtonClicked}
            >
              Next
            </Button>
          </Cell.Basic>
        </Container.InnerGrid>
        <Cell.MaxWidth></Cell.MaxWidth>
      </Grid>
      <div className="column">
        {isUserOverridePolicyAvailable && (
          <label>
            <input
              type="checkbox"
              checked={overridePolicy}
              onChange={(e) => setOverridePolicy(e.target.checked)}
            />
            Ignore Policy
          </label>
        )}
      </div>

      <DialogOkDiscardComponent
        caption="Revocation Successful"
        text="The revocation was successful."
        showDialog={showSuccessDialog}
        onOkClick={onCloseSuccessDialog}
        onCloseClick={onCloseSuccessDialog}
        onClear={handleClear}
        showCheckBox={false}
        showDiscard={false}
        onDiscardClick={handleDiscardClick}
      />
    </>
  );
};

RevocationComponent.propTypes = {
  activationClient: PropTypes.object.isRequired,

  userClient: PropTypes.object.isRequired,

  onClear: PropTypes.func.isRequired,
};

export default RevocationComponent;
