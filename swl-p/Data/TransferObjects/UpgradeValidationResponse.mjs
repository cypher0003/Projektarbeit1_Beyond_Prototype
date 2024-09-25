import { UpgradeResponseBase } from "./UpgradeResponseBase.js";

import { ProductVariant } from "../Models/ProductVariants.mjs";

export class UpgradeValidationResponse extends UpgradeResponseBase {
  constructor() {
    super();

    this.productVariants = [];
  }
}
