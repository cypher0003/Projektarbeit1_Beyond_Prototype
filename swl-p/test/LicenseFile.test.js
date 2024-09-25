import {
  LicenseFile,
  LicenseFileV1,
  LicenseFileV2,
} from "../Data/TransferObjects/LicenseFile.mjs";

import { LicenseFileDetails } from "../Data/TransferObjects/LicenseFileDetails.mjs";
import { expect } from "chai";

/*eslint-env mocha*/

describe("LicenseFile", () => {
  it("should create a LicenseFile instance with correct properties", () => {
    const licenseFile = new LicenseFile();
    licenseFile.DeviceId = "123456";
    licenseFile.Extension = "lic";
    licenseFile.LicenseString = "license string";
    licenseFile.FileName = "license.file";

    expect(licenseFile.DeviceId).to.equal("123456");
    expect(licenseFile.Extension).to.equal("lic");
    expect(licenseFile.LicenseString).to.equal("license string");
    expect(licenseFile.FileName).to.equal("license.file");
  });
});

describe("LicenseFileV1", () => {
  it("should create a LicenseFileV1 instance with correct properties", () => {
    const licenseFileV1 = new LicenseFileV1();
    licenseFileV1.DeviceId = "123456";
    licenseFileV1.Extension = "lic";
    licenseFileV1.LicenseString = "license string";
    licenseFileV1.FileName = "license.file";
    licenseFileV1.EntitlementId = "entitlement123";
    licenseFileV1.ProductKeyID = "productkey123";
    licenseFileV1.ActivationId = "activation123";

    expect(licenseFileV1.DeviceId).to.equal("123456");
    expect(licenseFileV1.Extension).to.equal("lic");
    expect(licenseFileV1.LicenseString).to.equal("license string");
    expect(licenseFileV1.FileName).to.equal("license.file");
    expect(licenseFileV1.EntitlementId).to.equal("entitlement123");
    expect(licenseFileV1.ProductKeyID).to.equal("productkey123");
    expect(licenseFileV1.ActivationId).to.equal("activation123");
  });
});

describe("LicenseFileV2", () => {
  it("should create a LicenseFileV2 instance with correct properties", () => {
    const licenseFileV2 = new LicenseFileV2();
    licenseFileV2.DeviceId = "123456";
    licenseFileV2.Extension = "lic";
    licenseFileV2.LicenseString = "license string";
    licenseFileV2.FileName = "license.file";
    licenseFileV2.Items = [];
    const licenseFileDetails = new LicenseFileDetails();
    licenseFileDetails.EntitlementId = "entitlement123";
    licenseFileDetails.ProductKeyId = "productkey123";
    licenseFileDetails.ActivationId = "activation123";
    licenseFileV2.Items.push(licenseFileDetails);

    expect(licenseFileV2.DeviceId).to.equal("123456");
    expect(licenseFileV2.Extension).to.equal("lic");
    expect(licenseFileV2.LicenseString).to.equal("license string");
    expect(licenseFileV2.FileName).to.equal("license.file");
    expect(licenseFileV2.Items.length).to.equal(1);
    expect(licenseFileV2.Items[0].EntitlementId).to.equal("entitlement123");
    expect(licenseFileV2.Items[0].ProductKeyId).to.equal("productkey123");
    expect(licenseFileV2.Items[0].ActivationId).to.equal("activation123");
  });
});
