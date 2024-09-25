export class ValidationResponse {
  constructor(
    activationValidationResponse = null,
    upgradeValidationResponse = null
  ) {
    this._activationValidationResponse = activationValidationResponse;

    this._upgradeValidationResponse = upgradeValidationResponse;
  }

  get upgradeValidationResponse() {
    if (!this._upgradeValidationResponse) {
      throw new Error("UpgradeValidationResponse is not set.");
    }

    return this._upgradeValidationResponse;
  }

  get activationValidationResponse() {
    if (!this._activationValidationResponse) {
      throw new Error("ActivationValidationResponse is not set.");
    }

    return this._activationValidationResponse;
  }
}
