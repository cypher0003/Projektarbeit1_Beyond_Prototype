export class RehostRequest {
  constructor() {
    /** 

         * The actual device id 

         * @type {string} 

         */

    this.actualDeviceId = "";

    /** 

         * The new device id 

         * @type {string} 

         */

    this.newDeviceId = "";

    /** 

         * List of product key ids to be rehosted 

         * @type {string[]} 

         */

    this.productKeyIds = []; // Initialisiert als leeres Array
  }
}
