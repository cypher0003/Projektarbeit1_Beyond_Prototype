import { IBaseEntitlementItem } from "./IBaseEntitlementItem.mjs";

export class SOAPEntitlement {
  constructor() {
    this.entitlementID = "";

    this.soldToId = "";

    this.soldToName = "";

    this.entitlementItems = [];
  }

  addEntitlementItem(entitlementItem) {
    this.entitlementItems.push(entitlementItem);
  }
}
