import { expect } from "chai";

import {
  ActivationResponseV2,
  ActivationResponseV1,
} from "../Data/TransferObjects/ActivationResponse.mjs";
import { InvalidItem } from "../Data/TransferObjects/InvalidItem.mjs";
import {
  LicenseFile,
  LicenseFileV2,
  LicenseFileV1,
} from "../Data/TransferObjects/LicenseFile.mjs";

import { LicenseFileDetails } from "../Data/TransferObjects/LicenseFileDetails.mjs";

/*eslint-env mocha*/

describe("LicenseFileV2", () => {
  it("should create a LicenseFileV2 instance with correct properties", () => {
    const licenseFileV2 = new LicenseFileV2();
    licenseFileV2.DeviceId = "device123";
    licenseFileV2.Extension = "zlic";
    licenseFileV2.LicenseString = "licenseString";
    licenseFileV2.FileName = "fileName";
    const licenseFileDetails = new LicenseFileDetails();
    licenseFileDetails.EntitlementId = "23";
    licenseFileDetails.ActivationId = "test";
    licenseFileDetails.ProductKey = "testk";
    licenseFileDetails.ProductName = "testn";
    licenseFileV2.Items = [];
    licenseFileV2.Items.push(licenseFileDetails);
    expect(licenseFileV2.DeviceId).to.equal("device123");
    expect(licenseFileV2.Extension).to.equal("zlic");
    expect(licenseFileV2.LicenseString).to.equal("licenseString");
    expect(licenseFileV2.FileName).to.equal("fileName");
    expect(licenseFileV2.Items).to.have.lengthOf(1);
  });
});

describe("LicenseFileV1", () => {
  it("should create a LicenseFileV1 instance with correct properties", () => {
    const licenseFileV1 = new LicenseFileV1();
    licenseFileV1.DeviceId = "device123";
    licenseFileV1.Extension = "zlic";
    licenseFileV1.LicenseString = "licenseString";
    licenseFileV1.FileName = "fileName";
    licenseFileV1.EntitlementId = "entitlement123";
    licenseFileV1.ProductKeyID = "productKey123";
    licenseFileV1.ActivationId = "activation123";
    expect(licenseFileV1.DeviceId).to.equal("device123");
    expect(licenseFileV1.Extension).to.equal("zlic");
    expect(licenseFileV1.LicenseString).to.equal("licenseString");
    expect(licenseFileV1.FileName).to.equal("fileName");
    expect(licenseFileV1.EntitlementId).to.equal("entitlement123");
    expect(licenseFileV1.ProductKeyID).to.equal("productKey123");
    expect(licenseFileV1.ActivationId).to.equal("activation123");
  });
});

describe("ActivationResponseV2", () => {
  it("should create an ActivationResponseV2 instance with correct properties", () => {
    const activationResponseV2 = new ActivationResponseV2();
    const licenseFileV2 = new LicenseFileV2();
    const invalidItem = new InvalidItem();
    activationResponseV2.Licenses.push(licenseFileV2);
    activationResponseV2.InvalidItems.push(invalidItem);
    expect(activationResponseV2.Licenses).to.have.lengthOf(1);
    expect(activationResponseV2.InvalidItems).to.have.lengthOf(1);
  });
});

describe("ActivationResponseV1", () => {
  it("should create an ActivationResponseV1 instance with correct properties", () => {
    const activationResponseV1 = new ActivationResponseV1();
    const licenseFileV1 = new LicenseFileV1();
    activationResponseV1.Licenses.push(licenseFileV1);
    activationResponseV1.InvalidItemIds.push("invalidItemId123");
    expect(activationResponseV1.Licenses).to.have.lengthOf(1);
    expect(activationResponseV1.InvalidItemIds).to.have.lengthOf(1);
    expect(activationResponseV1.InvalidItemIds[0]).to.equal("invalidItemId123");
  });
});
