import { ActivationRequest } from "../TransferObjects/ActivationRequest.mjs";

import { CollapseLockmodeViewModel } from "../Models/CollapseLockModeViewModel.mjs";

export class ActivationViewModel {
  constructor() {
    this.ActivationRequest = new ActivationRequest();

    this.ProductKey = "";

    this.DownloadManualText = "";

    this.IsActivationMode = false;

    this.IsNextDisabled = false;

    this.IsCancelDisabled = false;

    this.IsManualLoading = false;

    this.IsEntitlementActivation = false;

    this.ShowManualAlert = false;

    this.ListOfCollapseVMs = [];

    this.ErrorZeissLicensingManualText = "";

    this.ValidationErrorText = "";

    this.IsNameInvalid = false;
  }

  SetStateOfInvalidName(invalidName) {
    this.ListOfCollapseVMs.forEach((collapseLockmodeViewModel) => {
      collapseLockmodeViewModel.DeviceNameInvalid = invalidName;
    });
  }
}
