import { SearchObjectBase } from "./SearchObjectBase.mjs";
import { SortPropertyLicense } from "../Enums/SortPropertyLicense.mjs";

export class SearchObjectLicense extends SearchObjectBase {
  constructor() {
    super();

    this.productKey = "";

    this.activationId = "";

    this.entitlementId = "";

    this.fulfillmentId = "";

    this.productName = "";

    this.productVersion = "";

    this.productMaterialNumber = "";

    this.customerNumber = "";

    this.creationDateFrom = null;

    this.creationDateTo = null;

    this.deviceId = "";

    this.deviceName = "";

    this.serialNumber = "";

    this.factoryNumber = "";

    this.distributorNumber = "";

    this.ssc1Number = "";

    this.ssc2Number = "";

    this.endCustomerNumber = "";

    this.isTest = null;

    this.sortProperty = SortPropertyLicense.None;
  }
}
