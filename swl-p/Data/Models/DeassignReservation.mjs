import { BaseModel } from "./BaseModel.mjs";

export class DeassignReservation extends BaseModel {
  constructor() {
    super();

    this.productKey = "";

    this.friendlyName = "";
  }
}
