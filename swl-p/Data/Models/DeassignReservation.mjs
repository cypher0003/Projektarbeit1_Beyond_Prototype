import { BaseModel } from "./BaseModel.mjs";

export class DeassignReservation extends BaseModel {
  constructor() {
    super();

    /** 

         * The product key 

         * @type {string} 

         */

    this.productKey = "";

    /** 

         * The friendly name 

         * @type {string} 

         */

    this.friendlyName = "";
  }
}
