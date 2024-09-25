import { JsonConstants } from "../Constants/JsonConstants.mjs";

export class DownloadFile {
  constructor(fileContent, fileName, isBinary = false) {
    this.fileContent = fileContent;

    this.fileName = fileName;

    this.isBinary = isBinary;

    this.containsContent = !!fileName;
  }

  static fromLicenseFile(licenseFile) {
    const fileContent = atob(licenseFile.LicenseString);

    const fileName = `${licenseFile.FileName}.${licenseFile.Extension}`;

    const isBinary = licenseFile.Extension === "bin";

    return new DownloadFile(fileContent, fileName, isBinary);
  }

  static fromLegacyRepairResponse(legacyRepairResponse) {
    const fileName = `RepairResponse${DownloadFile.getFileNameTimeStamp()}.xml`;

    return new DownloadFile(legacyRepairResponse.response, fileName);
  }

  static fromLegacyReturnResponse(legacyReturnResponse) {
    const fileName = `ReturnResponse${DownloadFile.getFileNameTimeStamp()}.xml`;

    return new DownloadFile(legacyReturnResponse.response, fileName);
  }

  static fromSignedMessage(signedMessage) {
    const fileContent = JSON.stringify(
      signedMessage,
      JsonConstants.JsonSerializerOptions
    );

    const fileName = `SignedMessage_${
      signedMessage.dataType
    }${DownloadFile.getFileNameTimeStamp()}.json`;

    const downloadFile = new DownloadFile(fileContent, fileName);

    downloadFile.containsContent = !!signedMessage.data;

    return downloadFile;
  }

  static createFromActivationResponse(activationResponse) {
    return activationResponse.Licenses.map((item) =>
      DownloadFile.fromLicenseFile(item)
    );
  }

  static getFileNameTimeStamp() {
    const now = new Date();

    return `_${now.getFullYear()}${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}${String(now.getDate()).padStart(2, "0")}_${String(
      now.getMinutes()
    ).padStart(2, "0")}${String(now.getHours()).padStart(2, "0")}${String(
      now.getSeconds()
    ).padStart(2, "0")}`;
  }
}
