import { GetActivatableItemsResponse } from "../../../../Data/TransferObjects/V1/GetActivatableItem.mjs";

export class ManualActivationComponentViewModel {
  constructor(activationClient, locationPrefixValidator, configuration) {
    this._activationClient = activationClient;

    this._locationPrefixValidator = locationPrefixValidator;

    this._configuration = configuration;

    this._alertText = "";

    this.itemId = "";

    this.deviceName = "";
  }

  get alertText() {
    return this._alertText;
  }

  set alertText(value) {
    this._alertText = `[${new Date().toLocaleString()}] ${value}`;
  }

  get itemIds() {
    return this.itemId.split(",").filter((id) => id.trim() !== "");
  }

  validate() {
    try {
      this._locationPrefixValidator.validate(this.itemIds);
    } catch (ex) {
      if (ex instanceof Error) {
        this.alertText = ex.getErrorMessage(this._configuration);
      } else {
        this.alertText = ex.message;
      }

      throw ex;
    }
  }

  async getActivatableItemsResponse() {
    try {
      const activatableItems = await this._activationClient.getActivatableItems(
        this.itemIds
      );

      if (
        !activatableItems ||
        !activatableItems.activatableItems ||
        activatableItems.activatableItems.length === 0
      ) {
        throw new Error("No activatable items found");
      }

      return new GetActivatableItemsResponse(activatableItems);
    } catch (ex) {
      this.alertText = ex.message;

      throw ex;
    }
  }
}
