import { RequestFile } from "./RequestFile.mjs";
import { DownloadFile } from "./DownloadFile.mjs";
import { ValidationResponse } from "./ValidationResponse.mjs";
import { ActivationValidationResponse } from "./ActivationValidationResponse.mjs";
import { RequestFileType } from "../Enums/RequestFileType.mjs";

export class ActivationRequestFile extends RequestFile {
  constructor(fileContent, activationClient, locationPrefixValidator) {
    super(
      fileContent,
      RequestFileType.Activation,
      activationClient,
      locationPrefixValidator
    );

    this._ActivationRequest = fileContent.activationRequest;
    console.log(
      `ActivationRequest = ${JSON.stringify(this._ActivationRequest)}`
    );
    try {
      if (!this._ActivationRequest) {
        throw new Error(
          "File content cannot be deserialized to an activation request."
        );
      }
    } catch (error) {
      throw new Error(
        "File content cannot be deserialized to an activation request."
      );
    }
  }

  async validate() {
    const activateItems = [];

    if (this._ActivationRequest.ItemIdsWithQuantity) {
      activateItems.push(
        ...this._ActivationRequest.ItemIdsWithQuantity.map((c) => c.Key)
      );
    }

    if (this._ActivationRequest.ItemIds) {
      activateItems.push(...this._ActivationRequest.ItemIds);
    }

    this.validateLocalizationPrefix(activateItems);

    const getActivatableItemsResponse =
      await this._activationClient.getActivatableItems(activateItems, true);

    return new ValidationResponse(
      new ActivationValidationResponse(
        activateItems,
        getActivatableItemsResponse
      )
    );
  }

  async process() {
    const activationResponse = await this._activationClient.activate(
      this._ActivationRequest
    );

    return DownloadFile.createFromActivationResponse(activationResponse);
  }
}
