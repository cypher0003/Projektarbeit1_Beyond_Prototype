import { expect } from "chai";

import { DownloadFile } from "../WebServiceClient/Models/DownloadFile.mjs"; // Angenommen, dass DownloadFile.js sich im selben Verzeichnis befindet

import { JsonConstants } from "../WebServiceClient/Constants/JsonConstants.mjs";
import { LicenseFile } from "../Data/TransferObjects/LicenseFile.mjs";

import { LegacyRepairResponse } from "../Data/TransferObjects/LegacyRepairResponse.mjs";
import { LegacyReturnResponse } from "../Data/TransferObjects/LegacyReturnResponse.mjs";
import { SignedMessage } from "../Data/TransferObjects/SignedMessage.mjs";
import { ActivationResponseV1 } from "../Data/TransferObjects/ActivationResponse.mjs";

import { InvalidItem } from "../Data/TransferObjects/InvalidItem.mjs";

/*eslint-env mocha*/
describe("DownloadFile", () => {
  it("should create a DownloadFile from LicenseFile", () => {
    const licenseFile = new LicenseFile();
    licenseFile.DeviceId = "testId";
    licenseFile.Extension = "bin";
    licenseFile.FileName = "license";
    const orgContent = "licenseContent";
    licenseFile.LicenseString = btoa(orgContent);

    btoa(licenseFile);

    const downloadFile = DownloadFile.fromLicenseFile(licenseFile);

    downloadFile.isBinary = true;

    expect(downloadFile.fileContent).to.equal("licenseContent");

    expect(downloadFile.fileName).to.equal("license.bin");

    expect(downloadFile.isBinary).to.be.true;
  });

  it("should create a DownloadFile from LegacyRepairResponse", () => {
    const legacyRepairResponse = new LegacyRepairResponse();
    legacyRepairResponse.response = "repairResponseContent";

    const downloadFile =
      DownloadFile.fromLegacyRepairResponse(legacyRepairResponse);

    expect(downloadFile.fileContent).to.equal("repairResponseContent");

    expect(downloadFile.fileName).to.match(/RepairResponse_\d{8}_\d{6}\.xml/); // Überprüft, ob der Dateiname das erwartete Format hat

    expect(downloadFile.isBinary).to.be.false;
  });

  it("should create a DownloadFile from LegacyReturnResponse", () => {
    const legacyReturnResponse = new LegacyReturnResponse();
    legacyReturnResponse.response = "returnResponseContent";

    const downloadFile =
      DownloadFile.fromLegacyReturnResponse(legacyReturnResponse);

    expect(downloadFile.fileContent).to.equal("returnResponseContent");

    expect(downloadFile.fileName).to.match(/ReturnResponse_\d{8}_\d{6}\.xml/); // Überprüft, ob der Dateiname das erwartete Format hat

    expect(downloadFile.isBinary).to.be.false;
  });

  it("should create a DownloadFile from SignedMessage", () => {
    const signedMessage = new SignedMessage();
    signedMessage.data = "data";

    const downloadFile = DownloadFile.fromSignedMessage(signedMessage);

    const expectedFileName = `SignedMessage_${DownloadFile.getFileNameTimeStamp()}.json`;

    expect(downloadFile.fileContent).to.equal(
      JSON.stringify(signedMessage, JsonConstants.JsonSerializerOptions)
    );

    expect(downloadFile.fileName).to.equal(expectedFileName);

    expect(downloadFile.isBinary).to.be.false;

    expect(downloadFile.containsContent).to.be.true;
  });

  it("should create DownloadFiles from ActivationResponse", () => {
    const licenseFile1 = new LicenseFile();
    licenseFile1.DeviceId = "testId";
    licenseFile1.Extension = "bin";
    licenseFile1.FileName = "license1";
    const orgContent1 = "licenseContent1";
    licenseFile1.LicenseString = btoa(orgContent1);

    const licenseFile2 = new LicenseFile();
    licenseFile2.DeviceId = "testId";
    licenseFile2.Extension = "txt";
    licenseFile2.FileName = "license2";
    const orgContent2 = "licenseContent2";

    const invItem = new InvalidItem();
    invItem.Reason = "Wrong";

    const activationResponse = new ActivationResponseV1();
    activationResponse.Licenses = [licenseFile1, licenseFile2];

    licenseFile2.LicenseString = btoa(orgContent2);

    const downloadFiles =
      DownloadFile.createFromActivationResponse(activationResponse);

    expect(downloadFiles).to.have.lengthOf(2);

    expect(downloadFiles[0].fileContent).to.equal("licenseContent1");

    expect(downloadFiles[0].fileName).to.equal("license1.bin");

    expect(downloadFiles[0].isBinary).to.be.true;

    expect(downloadFiles[1].fileContent).to.equal("licenseContent2");

    expect(downloadFiles[1].fileName).to.equal("license2.txt");

    expect(downloadFiles[1].isBinary).to.be.false;
  });

  it("should generate a correct timestamp for file names", () => {
    const timeStamp = DownloadFile.getFileNameTimeStamp();

    expect(timeStamp).to.match(/_\d{8}_\d{6}/);
  });
});
