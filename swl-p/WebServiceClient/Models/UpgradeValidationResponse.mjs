export class UpgradeValidationResponse {
  constructor(upgradeValidationRequest, upgradeValidationResponse) {
    this._upgradeValidationRequest = upgradeValidationRequest;

    this._upgradeValidationResponse = upgradeValidationResponse;
  }

  get upgradeItemId() {
    return this._upgradeValidationRequest.itemIds.length > 0
      ? this._upgradeValidationRequest.itemIds[0]
      : "";
  }

  get activationIdsToRevoke() {
    return this._upgradeValidationResponse.activationIdsToRevoke;
  }

  get fulfillmentIdsToRevoke() {
    return this._upgradeValidationResponse.fulfillmentIdsToRevoke;
  }

  get productVariants() {
    return this._upgradeValidationResponse.productVariants;
  }

  async getActivations(activationClient) {
    const activationIds = [
      ...this.activationIdsToRevoke,
      ...this.fulfillmentIdsToRevoke,
    ];

    const activations = [];

    for (const activationId of activationIds) {
      const activation = await activationClient.getActivation(activationId);

      activations.push(activation);
    }

    return activations;
  }
}
