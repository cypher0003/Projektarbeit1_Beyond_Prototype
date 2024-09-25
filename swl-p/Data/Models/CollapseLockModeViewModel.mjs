import { ActivationRequest } from "../TransferObjects/ActivationRequest.mjs";
import { SplitProductKeyViewModel } from "./SplitProductKeyViewModel.mjs";

export class CollapseLockmodeViewModel {
  constructor() {
    this.splitProductKeyVMs = [];

    this.activationRequest = new ActivationRequest();

    this.isBackDisabled = false;

    this.visible = false;

    this.isEntitlementActivation = false;

    this.serialNumber = "";

    this.caption = "";

    this.lockCriterion = "";

    this.deviceNameInvalid = false;
  }

  get isActivateDisabled() {
    return (
      this.deviceNameInvalid ||
      !this.splitProductKeyVMs.some(
        (c) => c.entitlementSplitInfoItem.quantity > 0
      ) ||
      !this.activationRequest.deviceName
    );
  }

  getString(key) {
    const strings = {
      LOCKCRITERIONA: "Lock Criterion A",

      LOCKCRITERIONB: "Lock Criterion B",

      LOCKCRITERIONC: "Lock Criterion C",
    };

    return strings[key] || key;
  }

  fillProductKeys(group) {
    group.forEach((activatableItem) => {
      const spvm = new SplitProductKeyViewModel(activatableItem);

      spvm.entitlementSplitInfoItem.quantity = 1;

      this.splitProductKeyVMs.push(spvm);
    });

    this.caption = this.getString(`LOCKCRITERION${group.key.toUpperCase()}`);

    this.visible = false;
  }
}
