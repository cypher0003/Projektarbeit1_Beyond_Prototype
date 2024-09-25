export class DeassignFingerprintRequestItem {
  constructor() {
    /// The items (ProductKeys) the Fingerprint should be removed from.

    this.itemIds = [];

    /// The fingerprint friendly name also used as deviceID

    this.friendlyName = "";
  }
}
