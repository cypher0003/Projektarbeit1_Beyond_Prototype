import { DownloadFile } from "./DownloadFile.mjs";
import { RequestFile } from "./RequestFile.mjs";
import { UpgradeValidationResponse } from "./UpgradeValidationResponse.mjs";
import { ValidationResponse } from "./ValidationResponse.mjs";
import { RequestFileType } from "../Enums/RequestFileType.mjs";
import { ActivationValidationResponse } from "./ActivationValidationResponse.mjs";

export class SignedMessageFile extends RequestFile {
  constructor(fileContent, type, activationClient, locationPrefixValidator) {
    super(fileContent, type, activationClient, locationPrefixValidator);

    this._signedMessageRequest = JSON.parse(fileContent);

    if (!this._signedMessageRequest) {
      throw new Error(
        "File content cannot be deserialized to a signed message."
      );
    }
  }

  async validate() {
    switch (this.type) {
      case RequestFileType.SignedUpgrade: {
        this._signedMessageRequest.dataType = "UpgradeValidationRequest";

        const upgradeValidationRequest = JSON.parse(
          this._signedMessageRequest.data
        );

        if (!upgradeValidationRequest) {
          throw new Error(
            "Signed message data cannot be deserialized to an upgrade validation request."
          );
        }

        this.validateLocalizationPrefix(upgradeValidationRequest.itemIds);

        const signedMessageResponse = await this.activationClient.processSigned(
          this._signedMessageRequest
        );

        const upgradeValidationResponse = JSON.parse(
          signedMessageResponse.data
        );

        if (!upgradeValidationResponse) {
          throw new Error(
            "Signed message data cannot be deserialized to an upgrade validation response."
          );
        }

        return new ValidationResponse(
          new UpgradeValidationResponse(
            upgradeValidationRequest,
            upgradeValidationResponse
          )
        );
      }

      case RequestFileType.SignedActivation: {
        const activationRequest = JSON.parse(this._signedMessageRequest.data);

        if (!activationRequest) {
          throw new Error(
            "Signed message data cannot be deserialized to an activation request."
          );
        }

        const activateItems = activationRequest.itemIdsWithQuantity.map(
          (c) => c.key
        );

        this.validateLocalizationPrefix(activateItems);

        const getActivatableItemsResponse =
          await this.activationClient.getActivatableItems(activateItems, true);

        return new ValidationResponse(
          new ActivationValidationResponse(
            activateItems,
            getActivatableItemsResponse
          )
        );
      }

      case RequestFileType.SignedBindingActivation: {
        const bindingActivationRequest = JSON.parse(
          this._signedMessageRequest.data
        );

        if (!bindingActivationRequest) {
          throw new Error(
            "Signed message data cannot be deserialized to an activation request."
          );
        }

        const activateItems = bindingActivationRequest.itemIds.map(
          (c) => c.key
        );

        this.validateLocalizationPrefix(activateItems);

        const getActivatableItemsResponse =
          await this.activationClient.getActivatableItems(activateItems, true);

        return new ValidationResponse(
          new ActivationValidationResponse(
            activateItems,
            getActivatableItemsResponse
          )
        );
      }

      default:
        return new ValidationResponse();
    }
  }

  async process() {
    if (this.type === RequestFileType.SignedUpgrade) {
      this._signedMessageRequest.dataType = "UpgradeRequest";
    }

    const signedMessageResponse = await this.activationClient.processSigned(
      this._signedMessageRequest
    );

    return [new DownloadFile(signedMessageResponse)];
  }
}
