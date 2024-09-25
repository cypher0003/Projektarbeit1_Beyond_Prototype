// ILicenseClient.mjs

export class ILicenseClient {
  async rehost(rehostRequest, overridePolicy = false) {
    throw new Error("Method not implemented.");
  }

  async add(activation) {
    throw new Error("Method not implemented.");
  }

  async activate(activationRequest) {
    throw new Error("Method not implemented.");
  }

  async getActivatableItems(
    itemIds,
    deviceName,
    includeFnpTrustedStorage = false
  ) {
    throw new Error("Method not implemented.");
  }

  async bulkMarkRevoke(activations, comments = "") {
    throw new Error("Method not implemented.");
  }

  async reject(activations, comments = "") {
    throw new Error("Method not implemented.");
  }

  async getLicenses(searchObjectLicense) {
    throw new Error("Method not implemented.");
  }

  async getLicense(activationId) {
    throw new Error("Method not implemented.");
  }

  async updateLicense(activation) {
    throw new Error("Method not implemented.");
  }

  async getLicenseForDevice(deviceId) {
    throw new Error("Method not implemented.");
  }

  async regenerateLicenseForDevice(deviceId) {
    throw new Error("Method not implemented.");
  }

  async sendMail(activationId, sendMailRequest) {
    throw new Error("Method not implemented.");
  }

  async getDeassignReservations(productKey) {
    throw new Error("Method not implemented.");
  }

  async updateDeassignReservations(updateAssignRequests) {
    throw new Error("Method not implemented.");
  }

  async getFingerprints(productKey) {
    throw new Error("Method not implemented.");
  }

  async deassign(deassignFingerprintRequestItem) {
    throw new Error("Method not implemented.");
  }

  async deletedDevice(deviceId, revokeLicenses) {
    throw new Error("Method not implemented.");
  }

  async createReportDatabaseEntry(activationId) {
    throw new Error("Method not implemented.");
  }
}
