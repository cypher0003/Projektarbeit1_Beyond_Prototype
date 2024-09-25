import { expect } from "chai";

import { Activation } from "../Data/Models/Activation.mjs";

import { ActivationPropertiesDublinLegacy } from "../Data/Models/ActivationPropertiesDublinLegacy.mjs";

import { ActivationPropertiesFNPCertificate } from "../Data/Models/ActivationPropertiesFNPCertificate.mjs";

import { ActivationPropertiesFX } from "../Data/Models/ActivationPropertiesFX.mjs";

import { ActivationPropertiesVisumax } from "../Data/Models/ActivationPropertiesVisumax.mjs";

import { ActivationState } from "../Data/Enums/ActivationState.mjs";

import { UpgradeStatus } from "../Data/Enums/UpgradeStatus.mjs";
/*eslint-env mocha*/
describe("Activation", () => {
  let activation;

  beforeEach(() => {
    activation = new Activation();
  });

  it("should initialize with default values", () => {
    expect(activation.activationId).to.be.null;

    expect(activation.groupActivationId).to.be.null;

    expect(activation.activationQuantity).to.be.null;

    expect(activation.timeZoneId).to.be.null;

    expect(activation.activationDate).to.be.an.instanceof(Date);

    expect(activation.sendNotification).to.equal(false);

    expect(activation.soldToEmail).to.be.null;

    expect(activation.state).to.equal(ActivationState.ACTIVATED);

    expect(activation.creationDate).to.be.an.instanceof(Date);

    expect(activation.lastModifiedDate).to.be.an.instanceof(Date);

    expect(activation.licenseKey).to.be.null;

    expect(activation.productName).to.be.null;

    expect(activation.productVersion).to.be.null;

    expect(activation.activationProductKey).to.be.null;

    expect(activation.customer).to.be.null;

    expect(activation.deviceFriendlyName).to.be.null;

    expect(activation.fingerprintFriendlyName).to.be.null;

    expect(activation.deviceId).to.be.null;

    expect(activation.entitlementId).to.be.null;

    expect(activation.dublinLegacyProperties).to.be.an.instanceof(
      ActivationPropertiesDublinLegacy
    );

    expect(activation.fnpCertificateProperties).to.be.an.instanceof(
      ActivationPropertiesFNPCertificate
    );

    expect(activation.visumaxProperties).to.be.an.instanceof(
      ActivationPropertiesVisumax
    );

    expect(activation.fxProperties).to.be.an.instanceof(ActivationPropertiesFX);

    expect(activation.expirationDate).to.be.an.instanceof(Date);

    expect(activation.licenseFileExtension).to.be.null;

    expect(activation.isShadow).to.be.false;

    expect(activation.ssc1Number).to.be.null;

    expect(activation.ssc2Number).to.be.null;

    expect(activation.factoryNumber).to.be.null;

    expect(activation.distributorNumber).to.be.null;

    expect(activation.ssc1Name).to.be.null;

    expect(activation.ssc2Name).to.be.null;

    expect(activation.factoryName).to.be.null;

    expect(activation.distributorName).to.be.null;

    expect(activation.businessgroup).to.be.null;

    expect(activation.productFamily).to.be.null;

    expect(activation.customerNumber).to.be.null;

    expect(activation.customerName).to.be.null;

    expect(activation.serialNumber).to.be.null;

    expect(activation.materialNumber).to.be.null;

    expect(activation.upgradeStatus).to.equal(UpgradeStatus.EMPTY);
  });

  it("should correctly set and get formattedMaterialNumber", () => {
    activation.materialNumber = "12345";

    expect(activation.formattedMaterialNumber).to.equal("000000-0012-345");

    activation.formattedMaterialNumber = "000001-1234-567";

    expect(activation.materialNumber).to.equal("000000000011234567");
  });
});
