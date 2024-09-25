export class DeviceLicenseResponse {
  constructor() {
    /** 

         * License key 

         * @type {string} 

         */

    this.licenseKey = "";

    /** 

         * List of license files 

         * @type {LicenseFileV1[]} 

         */

    this.licenseFiles = []; // Initialisiert als leeres Array

    /** 

         * Device friendly name 

         * @type {string} 

         */

    this.deviceFriendlyName = "";

    /** 

         * License file extension 

         * @type {string} 

         */

    this.licenseFileExtension = "";
  }
}
