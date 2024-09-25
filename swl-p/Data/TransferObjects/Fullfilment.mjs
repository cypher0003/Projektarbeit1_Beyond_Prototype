export class Fulfillment {
  constructor(fulfillmentId = "", type = "", host = "", count = 0) {
    this.fulfillmentId = fulfillmentId;

    this.type = type;

    this.host = host;

    this.count = count;
  }
}
