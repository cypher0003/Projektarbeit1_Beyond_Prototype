import { LicenseMode } from "../../Enums/LicenseMode.mjs";

export class ActivatableItem {
  productKey = "";
  productName = "";
  productVersion = "";
  availableQuantity = 0;
  lockingMode = "";
  allowMultipleActivation = false;
  isFloating = false;
  licenseMode = LicenseMode.Undefined;
  deviceTypeName = "";
  isUpgrade = false;
  constructor() {}
}
