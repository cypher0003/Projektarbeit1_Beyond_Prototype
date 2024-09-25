import { Fulfillment } from "./Fullfilment.mjs";

export class EntitlementItem {
  constructor() {
    this.activationId = "";

    this.state = null;

    this.materialNumber = "";

    this.materialName = "";

    this.materialVersion = "";

    this.quantity = 0;

    this.orderType = null;

    this.duration = null;

    this.sapOrderId = "";

    this.sapOrderItemId = "";

    this.businessUnit = null;

    this.ibaseMaterialNumber = "";

    this.ibaseSerialNumber = "";

    this.fulfillments = [];

    this.lastModificationDate = null;
  }

  addFulfillment(fulfillment) {
    this.fulfillments.push(fulfillment);
  }
}
