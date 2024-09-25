import { ActivationPropertiesDublinLegacy } from "../Models/ActivationPropertiesDublinLegacy.mjs";

export class ActivationRequest {
  constructor() {
    this.itemIdsWithQuantity = new Map();
    this.itemIds = [];
    this.lockCode = "";
    this.lockCriterion = "";
    this.fingerPrint = "";
    this.deviceName = "";
    this.deviceId = "";
    this.deviceTypeName = "";
    this.serialNumber = "";
    this.activationQuantity = 1;
    this.fnpTrustedStorageRequest = "";
    this.dublinLegacyActivation = new ActivationPropertiesDublinLegacy();
  }
}
