import React, { useState } from "react";

import PropTypes from "prop-types";

import { CollapseLockmodeViewModel } from "./CollapseLockmodeViewModel.mjs";

const CollapseLockmode = ({
  collapseLockmodeVM,

  onActivateClicked,

  onDiscardClicked,

  onCollapseClicked,

  onManualActivationExceptionThrown,

  onManualActivationSuccessful,

  activationClient,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [visible, setVisible] = useState(collapseLockmodeVM.Visible);

  const handleActivateButtonClick = async () => {
    let canActivate = true;

    try {
      if (
        !collapseLockmodeVM.SplitProductKeyVMs.some(
          (c) => c.EntitlementSplitInfoItem.Quantity > 0
        )
      ) {
        const text = "No product key with quantity";

        await onManualActivationExceptionThrown(text);

        canActivate = false;

        return;
      }

      setIsLoading(true);

      collapseLockmodeVM.ActivationRequest.ItemIdsWithQuantity = {};

      collapseLockmodeVM.SplitProductKeyVMs.filter(
        (c) => c.EntitlementSplitInfoItem.Quantity > 0
      ).forEach((pk) => {
        collapseLockmodeVM.ActivationRequest.ItemIdsWithQuantity[
          pk.ProductKeyId
        ] = pk.EntitlementSplitInfoItem.Quantity;
      });

      collapseLockmodeVM.ActivationRequest.SerialNumber =
        collapseLockmodeVM.SerialNumber;

      collapseLockmodeVM.ActivationRequest.LockCriterion =
        collapseLockmodeVM.LockCriterion;

      try {
        const result = await activationClient.activate(
          collapseLockmodeVM.ActivationRequest,
          jsRuntime
        );

        if (result) {
          await onManualActivationSuccessful("Activation download successful");
        }
      } catch (ex) {
        const errorText = `${new Date().toISOString()} - ${ex.message}`;

        await onManualActivationExceptionThrown(errorText);

        console.error(
          `${errorText}. ActivationRequest: ${JSON.stringify(
            collapseLockmodeVM.ActivationRequest
          )}`
        );
      }
    } catch (error) {
      const errorText = `${new Date().toISOString()} - ${error.message}`;

      await onManualActivationExceptionThrown(errorText);

      console.error(
        `${errorText}. ActivationRequest: ${JSON.stringify(
          collapseLockmodeVM.ActivationRequest
        )}`
      );
    } finally {
      if (canActivate) {
        setIsLoading(false);

        onActivateClicked("Activate");
      }
    }
  };

  const handleDiscardButtonClick = () => {
    collapseLockmodeVM.Visible = false;

    setVisible(false);

    onDiscardClicked("Discard");
  };

  const handleCollapseClick = () => {
    setVisible(!visible);

    onCollapseClicked(collapseLockmodeVM);
  };

  const handleSetAvailableQuantity = () => {
    collapseLockmodeVM.SplitProductKeyVMs.forEach((vm) => {
      const maxAvailableQuantity = vm.AllowMultipleActivation
        ? vm.AvailableQuantity
        : vm.AvailableQuantity > 0
        ? 1
        : 0;

      vm.EntitlementSplitInfoItem.Quantity = maxAvailableQuantity;
    });
  };

  return (
    <div className={`collapse-container ${visible ? "visible" : ""}`}>
      <div className="collapse-header" onClick={handleCollapseClick}>
        <h5 className="collapse-heading">
          {collapseLockmodeVM.Caption}

          <button className="toggle-button">{visible ? "-" : "+"}</button>
        </h5>
      </div>

      {visible && (
        <div className="collapse-body">
          <div className="row list-group-header">
            <div className="list-group-item">
              <div className="field-row">
                <span className="field-label">Product Key</span>

                <span className="field-label">Product</span>

                <span className="field-label">Version</span>

                <span className="field-label">Available Quantity</span>

                <span className="field-label">Activate Quantity</span>
              </div>
            </div>
          </div>

          {collapseLockmodeVM.SplitProductKeyVMs.map((item, index) => (
            <div className="list-group-item" key={index}>
              <span>{item.ProductKeyId}</span>

              <span>{item.ProductName}</span>

              <span>{item.ProductVersion}</span>

              <span>{item.AvailableQuantity}</span>

              <input
                type="number"
                className="input"
                value={item.EntitlementSplitInfoItem.Quantity}
                onChange={(e) => {
                  item.EntitlementSplitInfoItem.Quantity =
                    parseInt(e.target.value, 10) || 0;
                }}
              />
            </div>
          ))}

          <div className="row">
            <button
              className="btn-primary"
              onClick={handleSetAvailableQuantity}
            >
              Set Available Quantity
            </button>
          </div>

          <div className="row">
            <div className="column">
              <div className="field">
                <label className="field-label">Serial Number:</label>

                <input
                  type="text"
                  className="input"
                  value={collapseLockmodeVM.SerialNumber}
                  onChange={(e) =>
                    (collapseLockmodeVM.SerialNumber = e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="button-row">
            <button
              className={`btn-primary ${isLoading ? "btn-loading" : ""}`}
              disabled={collapseLockmodeVM.IsActivateDisabled}
              onClick={handleActivateButtonClick}
            >
              Activate
            </button>

            <button
              className="btn-secondary"
              onClick={handleDiscardButtonClick}
            >
              Discard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

CollapseLockmode.propTypes = {
  collapseLockmodeVM: PropTypes.instanceOf(CollapseLockmodeViewModel)
    .isRequired,

  onActivateClicked: PropTypes.func.isRequired,

  onDiscardClicked: PropTypes.func.isRequired,

  onCollapseClicked: PropTypes.func.isRequired,

  onManualActivationExceptionThrown: PropTypes.func.isRequired,

  onManualActivationSuccessful: PropTypes.func.isRequired,

  activationClient: PropTypes.object.isRequired,
};

export default CollapseLockmode;
