import { DownloadFile } from "./DownloadFile.mjs";
import { RequestFile } from "./RequestFile.mjs";
import { ActivationValidationResponse } from "./ActivationValidationResponse.mjs";
import { ValidationResponse } from "./ValidationResponse.mjs";
import { RequestFileType } from "../Enums/RequestFileType.mjs";

export class TrustedStorageActivationRequestFile extends RequestFile {
  static _XML_MACHINE_IDENTIFIER = "MachineIdentifier";

  static _XML_VM_ID = "Vmid";

  static _XML_UNIQUE_MACHINE_NUMBER = "UniqueMachineNumber";

  static _XML_RIGHTS_ID = "RightsId";

  static _XML_VALUE = "Value";

  static _XML_TYPE = "Type";

  static _LOCK_CODE = "XML";

  static _LOCK_CRITERION = "PC";

  constructor(fileContent, activationClient, locationPrefixValidator) {
    super(
      fileContent,
      RequestFileType.TrustedStorageActivation,
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

    const xNamespace = rootElement.namespaceURI;

    const activationRequest = {
      lockCode: TrustedStorageActivationRequestFile._LOCK_CODE,

      lockCriterion: TrustedStorageActivationRequestFile._LOCK_CRITERION,

      serialNumber: "",

      fnpTrustedStorageRequest: this.fileContent,

      itemIdsWithQuantity: {},

      deviceName: this._getDeviceName(rootElement, xNamespace),
    };

    const rightsIds = Array.from(
      rootElement.getElementsByTagNameNS(
        xNamespace,
        TrustedStorageActivationRequestFile._XML_RIGHTS_ID
      )
    );

    const rightIdValues = rightsIds.map(
      (rightsId) =>
        rightsId.getElementsByTagNameNS(
          xNamespace,
          TrustedStorageActivationRequestFile._XML_VALUE
        )[0]
    );

    rightIdValues.forEach((rightIdValue) => {
      if (rightIdValue && rightIdValue.textContent) {
        activationRequest.itemIdsWithQuantity[rightIdValue.textContent] = 1;
      }
    });

    return activationRequest;
  }

  _getDeviceName(element, xNamespace) {
    let machineIdentifiers = element.getElementsByTagNameNS(
      xNamespace,
      TrustedStorageActivationRequestFile._XML_MACHINE_IDENTIFIER
    );

    if (machineIdentifiers.length > 0) {
      return machineIdentifiers[0].textContent;
    }

    machineIdentifiers = element.getElementsByTagNameNS(
      xNamespace,
      TrustedStorageActivationRequestFile._XML_VM_ID
    );

    if (machineIdentifiers.length > 0) {
      return machineIdentifiers[0].textContent;
    }

    machineIdentifiers = element.getElementsByTagNameNS(
      xNamespace,
      TrustedStorageActivationRequestFile._XML_UNIQUE_MACHINE_NUMBER
    );

    if (machineIdentifiers.length === 0) {
      return "";
    }

    let type = Array.from(machineIdentifiers).find(
      (id) =>
        id.getElementsByTagNameNS(
          xNamespace,
          TrustedStorageActivationRequestFile._XML_TYPE
        )[0]?.textContent === "1"
    );

    let value = type
      ? type.getElementsByTagNameNS(
          xNamespace,
          TrustedStorageActivationRequestFile._XML_VALUE
        )[0]?.textContent
      : "";

    if (value) {
      return value;
    }

    type = Array.from(machineIdentifiers).find(
      (id) =>
        id.getElementsByTagNameNS(
          xNamespace,
          TrustedStorageActivationRequestFile._XML_TYPE
        )[0]?.textContent === "2"
    );

    value = type
      ? type.getElementsByTagNameNS(
          xNamespace,
          TrustedStorageActivationRequestFile._XML_VALUE
        )[0]?.textContent
      : "";

    if (value) {
      return value;
    }

    return TrustedStorageActivationRequestFile._createRandomDeviceName();
  }

  static _createRandomDeviceName() {
    const randomNumber = Math.floor(10000000 + Math.random() * 89999999);

    return `PC00${randomNumber}`;
  }
}
