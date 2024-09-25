import { ActivationPropertiesDublinLegacy } from "./ActivationPropertiesDublinLegacy.mjs";

import { ActivationPropertiesFNPCertificate } from "./ActivationPropertiesFNPCertificate.mjs";

import { ActivationPropertiesFX } from "./ActivationPropertiesFX.mjs";

import { ActivationPropertiesVisumax } from "./ActivationPropertiesVisumax.mjs";

import { FormatHelper } from "../Helper/FormatHelper.mjs";

import { ActivationState } from "../Enums/ActivationState.mjs";

import { UpgradeStatus } from "../Enums/UpgradeStatus.mjs";
import { BaseModel } from "./BaseModel.mjs";

export class Activation extends BaseModel {
  constructor() {
    super();
    this.activationId = null;

    this.groupActivationId = null;

    this.activationQuantity = null;

    this.timeZoneId = null;

    this.activationDate = new Date(); // Use Date type in JavaScript

    this.sendNotification = false;

    this.soldToEmail = null;

    this.state = ActivationState.ACTIVATED; // Default state, update as necessary

    this.creationDate = new Date(); // Use Date type in JavaScript

    this.lastModifiedDate = new Date(); // Use Date type in JavaScript

    this.licenseKey = null;

    this.productName = null;

    this.productVersion = null;

    this.activationProductKey = null;

    this.customer = null;

    this.deviceFriendlyName = null;

    this.fingerprintFriendlyName = null;

    this.deviceId = null;

    this.entitlementId = null;

    this.dublinLegacyProperties = new ActivationPropertiesDublinLegacy();

    this.fnpCertificateProperties = new ActivationPropertiesFNPCertificate();

    this.visumaxProperties = new ActivationPropertiesVisumax();

    this.fxProperties = new ActivationPropertiesFX();

    this.expirationDate = new Date(); // Use Date type in JavaScript

    this.licenseFileExtension = null;

    this.isShadow = false;

    this.ssc1Number = null;

    this.ssc2Number = null;

    this.factoryNumber = null;

    this.distributorNumber = null;

    this.ssc1Name = null;

    this.ssc2Name = null;

    this.factoryName = null;

    this.distributorName = null;

    this.businessgroup = null;

    this.productFamily = null;

    this.customerNumber = null;

    this.customerName = null;

    this.serialNumber = null;

    this.materialNumber = null;

    this.upgradeStatus = UpgradeStatus.EMPTY;
  }

  get formattedMaterialNumber() {
    return FormatHelper.getFormattedMaterialnumber(this.materialNumber);
  }

  set formattedMaterialNumber(value) {
    if (value !== this.materialNumber) {
      this.materialNumber = FormatHelper.getUnFormattedMaterialnumber(value);
    }
  }
}
