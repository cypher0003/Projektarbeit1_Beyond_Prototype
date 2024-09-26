import {
  LicenseFileV1,
  LicenseFileV2,
} from "../TransferObjects/LicenseFile.mjs";

export class ActivationResponseV2 {
  Licenses = [];

  InvalidItems = [];
}

export class ActivationResponseV1 {
  Licenses = [];

  InvalidItemIds = [];
}
