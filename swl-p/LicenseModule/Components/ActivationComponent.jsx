import React, { useState, useEffect, useRef } from "react";

import PropTypes from "prop-types";

import {
  Alert,
  Card,
  CardBody,
  CardFooter,
  TextArea,
  Accordion,
} from "@zeiss/beyond-online-react";

import { ActivationViewModel } from "../../Data/Models/ActivationViewModel.mjs";

import { CollapseLockmodeViewModel } from "../../Data/Models/CollapseLockModeViewModel.mjs";

import CollapseLockmode from "./CollapseLockMode";

const ActivationComponent = ({
  discardClicked,

  manualActivationSuccessful,

  activationClient,

  entitlementClient,

  jsRuntime,

  logger,
}) => {
  const [entitlement, setEntitlement] = useState({});

  const [activationVM, setActivationVM] = useState(new ActivationViewModel());

  const [errorZeissLicensingManualText, setErrorZeissLicensingManualText] =
    useState("");

  const [downloadManualText, setDownloadManualText] = useState("");

  const [downloadStatusColor, setDownloadStatusColor] = useState("");

  const errorZeissLicensingManualAlertRef = useRef(null);

  const downloadManualAlertRef = useRef(null);

  useEffect(() => {}, []);

  const loadDeviceTypes = async () => {
    try {
      console.log("Loading device types...");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Device types loaded.");
    } catch (error) {
      console.error("Error loading device types:", error.message);

      setErrorZeissLicensingManualText(error.message);

      if (errorZeissLicensingManualAlertRef.current) {
        errorZeissLicensingManualAlertRef.current.show();
      }
    }
  };

  const showActivation = async (entitlement, deviceTypeId) => {
    setEntitlement(entitlement);

    setActivationVM({
      ...activationVM,

      IsEntitlementActivation: true,

      ProductKey: entitlement.EntitlementId,

      ShowManualAlert: false,

      IsManualLoading: true,

      IsActivationMode: true,
    });

    await loadDeviceTypes();

    setActivationVM((prevVM) => ({
      ...prevVM,

      ValidationErrorText: "Sample Validation Error Text",
    }));

    await showActivatableItems([entitlement.EntitlementId]);

    setActivationVM((prevVM) => ({ ...prevVM, IsManualLoading: false }));
  };

  const showActivatableItems = async (
    itemIds,
    deviceName,
    getActivatableItemsResponse = null
  ) => {
    setErrorZeissLicensingManualText("");

    setActivationVM((prevVM) => ({
      ...prevVM,

      ListOfCollapseVMs: [],
    }));

    const response =
      getActivatableItemsResponse ||
      (await activationClient.getActivatableItemsResponse(itemIds));

    if (response?.activatableItems?.length) {
      const groupedLockingModeList = response.activatableItems.reduce(
        (acc, item) => {
          (acc[item.LockingMode] = acc[item.LockingMode] || []).push(item);

          return acc;
        },
        {}
      );

      const collapseVMs = Object.entries(groupedLockingModeList).map(
        ([key, group]) => {
          const collapseLockModeVM = new CollapseLockmodeViewModel();

          collapseLockModeVM.ActivationRequest = activationVM.ActivationRequest;

          collapseLockModeVM.LockCriterion = key;

          collapseLockModeVM.IsEntitlementActivation =
            activationVM.IsEntitlementActivation;

          collapseLockModeVM.FillProductKeys(group);

          return collapseLockModeVM;
        }
      );

      collapseVMs[collapseVMs.length - 1].Visible = true;

      setActivationVM((prevVM) => ({
        ...prevVM,

        IsActivationMode: true,

        ListOfCollapseVMs: collapseVMs,
      }));
    } else {
      throw new Error("No activatable items found");
    }
  };

  const onDiscardClicked = async () => {
    try {
      setErrorZeissLicensingManualText("");

      setActivationVM(new ActivationViewModel());

      await discardClicked();
    } catch (ex) {
      console.error("Error during discard:", ex.message);
    }
  };

  const onActivateClicked = async () => {
    try {
      if (activationVM.IsEntitlementActivation) {
        const list = await entitlementClient.getEntitlements({
          EntitlementId: entitlement.EntitlementId.trim(),

          SearchPattern: "Exact",
        });

        if (list.List.length > 0) {
          setEntitlement(list.List[0]);
        }
      }
    } catch (ex) {
      setErrorZeissLicensingManualText(ex.message);

      if (errorZeissLicensingManualAlertRef.current) {
        errorZeissLicensingManualAlertRef.current.show();
      }
    }
  };

  const onManualActivationSuccessful = async (text) => {
    try {
      setActivationVM((prevVM) => ({
        ...prevVM,

        IsActivationMode: false,

        DownloadManualText: text,

        ShowManualAlert: true,
      }));

      setDownloadStatusColor("success");

      if (downloadManualAlertRef.current) {
        downloadManualAlertRef.current.show();
      }

      await manualActivationSuccessful();
    } catch (ex) {
      setErrorZeissLicensingManualText(ex.message);

      if (errorZeissLicensingManualAlertRef.current) {
        errorZeissLicensingManualAlertRef.current.show();
      }
    }
  };

  return (
    <Card margin="Margin.Is2" columnSize="ColumnSize.Is12">
      <CardBody>
        {activationVM.IsEntitlementActivation &&
        activationVM.IsManualLoading ? (
          <h3>Loading...</h3>
        ) : (
          <>
            <div>
              <label>Product key / Entitlement Id:</label>

              <TextArea
                readOnly={activationVM.IsEntitlementActivation}
                value={activationVM.ProductKey}
                onChange={(e) =>
                  setActivationVM({
                    ...activationVM,
                    ProductKey: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label>Device / HostId:</label>

              <TextArea
                value={activationVM.ActivationRequest.DeviceName}
                onChange={(e) =>
                  setActivationVM({
                    ...activationVM,

                    ActivationRequest: {
                      ...activationVM.ActivationRequest,
                      DeviceName: e.target.value,
                    },
                  })
                }
              />
            </div>

            {activationVM.IsActivationMode && (
              <Accordion>
                {activationVM.ListOfCollapseVMs.map((vm, index) => (
                  <CollapseLockmode
                    key={index}
                    collapseLockmodeVM={vm}
                    onCollapseClicked={() => {
                      const updatedVMs = activationVM.ListOfCollapseVMs.map(
                        (collapseVM, idx) => ({
                          ...collapseVM,

                          Visible: idx === index ? !collapseVM.Visible : false,
                        })
                      );

                      setActivationVM({
                        ...activationVM,
                        ListOfCollapseVMs: updatedVMs,
                      });
                    }}
                    onActivateClicked={onActivateClicked}
                    onDiscardClicked={onDiscardClicked}
                    onManualActivationExceptionThrown={
                      setErrorZeissLicensingManualText
                    }
                    onManualActivationSuccessful={onManualActivationSuccessful}
                    activationClient={activationClient}
                    jsRuntime={jsRuntime}
                    logger={logger}
                  />
                ))}
              </Accordion>
            )}
          </>
        )}
      </CardBody>

      <CardFooter>
        <Alert ref={errorZeissLicensingManualAlertRef} color="danger">
          {errorZeissLicensingManualText}
        </Alert>

        <Alert
          ref={downloadManualAlertRef}
          color={downloadStatusColor}
          dismissible
        >
          {downloadManualText}
        </Alert>
      </CardFooter>
    </Card>
  );
};

ActivationComponent.propTypes = {
  discardClicked: PropTypes.func.isRequired,

  manualActivationSuccessful: PropTypes.func.isRequired,

  activationClient: PropTypes.object.isRequired,

  entitlementClient: PropTypes.object.isRequired,

  jsRuntime: PropTypes.object.isRequired,

  logger: PropTypes.object.isRequired,
};

export default ActivationComponent;
