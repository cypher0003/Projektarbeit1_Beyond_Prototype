export class UpgradeResponseBase {
  constructor() {
    this.activationIdsToRevoke = [];

    this.fulfillmentIdsToRevoke = [];

    this.licenseStringsToRevoke = [];
  }
}
