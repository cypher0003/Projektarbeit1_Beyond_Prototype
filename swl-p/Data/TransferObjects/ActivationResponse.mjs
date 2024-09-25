import {
  LicenseFileV1,
  LicenseFileV2,
} from "../TransferObjects/LicenseFile.mjs";

export class ActivationResponseV2 {
  // @type {Array<LicenseFileV2>}

  Licenses = [];

  // @type {Array<InvalidItem>}

  InvalidItems = [];
}

export class ActivationResponseV1 {
  // @type {Array<LicenseFileV1>}

  Licenses = [];

  // @type {Array<string>}

  InvalidItemIds = [];
}
