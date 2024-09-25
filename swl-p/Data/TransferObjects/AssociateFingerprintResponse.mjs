import { InvalidItem } from "your-module-path";

import { FeatureNameVersion } from "./FeatureNameVersion.js";

class AssociateFingerprintResponse {
  constructor() {
    this.invalidItemIds = [];
  }
}

class AssociateFingerprintResponse_V2_0 {
  constructor() {
    this.invalidItemIds = [];

    this.customerId = "";
  }
}

class AssociateFingerprintResponse_V3_0 {
  constructor() {
    this.invalidItemIds = [];

    this.invalidItems = [];

    this.customerId = "";

    this.features = [];
  }
}

export {
  AssociateFingerprintResponse,
  AssociateFingerprintResponse_V2_0,
  AssociateFingerprintResponse_V3_0,
};
