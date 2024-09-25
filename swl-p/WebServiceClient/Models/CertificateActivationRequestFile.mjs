import { DownloadFile } from "./DownloadFile.mjs";
import { RequestFile } from "./RequestFile.mjs";
import { ActivationValidationResponse } from "./ActivationValidationResponse.mjs";
import { ValidationResponse } from "./ValidationResponse.mjs";
import { RequestFileType } from "../Enums/RequestFileType.mjs";

export class CertificateActivationRequestFile extends RequestFile {
  static _XML_ID = "id";

  static _XML_ENTITLEMENT_ID = "entitlement_id";

  static _XML_ACTIVATION_ID = "activation_id";

  static _LOCK_CRITERION = "CUSTOM";

  constructor(fileContent, activationClient, locationPrefixValidator) {
    super(
      fileContent,
      RequestFileType.CertificateActivation,
      activationClient,
      locationPrefixValidator
    );

    this._ActivationRequest = this._createActivationRequestFromXml();
  }

  async validate() {
    const activateItems = Object.keys(
      this._ActivationRequest.itemIdsWithQuantity
    );

    this._validateLocalizationPrefix(activateItems);

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

  _createActivationRequestFromXml() {
    const parser = new DOMParser();

    const document = parser.parseFromString(
      this.fileContent,
      "application/xml"
    );

    const rootElement = document.documentElement;

    if (!rootElement) {
      throw new Error("Xml structure is invalid (no root element).");
    }

    const activationRequest = {
      lockCriterion: CertificateActivationRequestFile._LOCK_CRITERION,

      itemIdsWithQuantity: {},

      serialNumber: "",

      fnpTrustedStorageRequest: "",

      deviceName: this._getDeviceName(rootElement),
    };

    for (const id of this._getEntitlementIds(rootElement)) {
      activationRequest.itemIdsWithQuantity[id] = 1;
    }

    for (const id of this._getProductKeyIds(rootElement)) {
      activationRequest.itemIdsWithQuantity[id] = 1;
    }

    if (Object.keys(activationRequest.itemIdsWithQuantity).length === 0) {
      throw new Error(
        "Xml structure is invalid (no entitlement or product key id)."
      );
    }

    return activationRequest;
  }

  _getDeviceName(xElement) {
    const deviceNameElement = xElement.querySelector(
      CertificateActivationRequestFile._XML_ID
    );

    if (!deviceNameElement) {
      throw new Error("Xml structure is invalid (no device name).");
    }

    return deviceNameElement.textContent;
  }

  _getEntitlementIds(xElement) {
    const entitlementIds = [];

    const entitlementIdElement = xElement.querySelector(
      CertificateActivationRequestFile._XML_ENTITLEMENT_ID
    );

    if (!entitlementIdElement) {
      return entitlementIds;
    }

    const idElements = entitlementIdElement.querySelectorAll(
      CertificateActivationRequestFile._XML_ID
    );

    idElements.forEach((idElement) => {
      entitlementIds.push(idElement.textContent);
    });

    return entitlementIds;
  }

  _getProductKeyIds(xElement) {
    const activationIds = [];

    const activationIdElement = xElement.querySelector(
      CertificateActivationRequestFile._XML_ACTIVATION_ID
    );

    if (!activationIdElement) {
      return activationIds;
    }

    const idElements = activationIdElement.querySelectorAll(
      CertificateActivationRequestFile._XML_ID
    );

    idElements.forEach((idElement) => {
      activationIds.push(idElement.textContent);
    });

    return activationIds;
  }
}
