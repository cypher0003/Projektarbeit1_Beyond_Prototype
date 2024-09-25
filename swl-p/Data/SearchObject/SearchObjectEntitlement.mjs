import { SearchObjectBase } from "./SearchObjectBase.mjs";

export class SearchObjectEntitlement extends SearchObjectBase {
  constructor() {
    super();

    this.entitlementId = "";

    this.salesOrder = "";

    this.productKey = "";

    this.productMaterialNumber = "";

    this.productname = "";

    this.productversion = "";

    this.productVariantId = "";

    this.state = null;

    this.factoryNumber = "";

    this.distributorNumber = "";

    this.ssc1Number = "";

    this.ssc2Number = "";

    this.endcustomerNumber = "";

    this.creationDateFrom = null;

    this.creationDateTo = null;

    this.subscriptionEndDate = null;

    this.subscriptionNumber = "";

    this.ratePlanName = "";

    this.ratePlanId = ""; // Deprecated, but still included for compatibility

    this.licenseRecipientFirstName = "";

    this.licenseRecipientLastName = "";

    this.licenseRecipientEmail = "";

    this.language = "";

    this.entitlementType = null;

    this.serialNumber = "";

    this.entitlementsWithAvailableQuantity = null;

    this.productFamily = "";
  }
}
