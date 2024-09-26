import { RequestFileType } from "../Enums/RequestFileType.mjs";
import { ActivationRequestFile } from "./ActivationRequestFile.mjs";
import { TrustedStorageActivationRequestFile } from "./TrustedStorageActivationRequestFile.mjs";
import { TrustedStorageReturnRequestFile } from "./TrustedStorageReturnRequestFile.mjs";
import { RevocationProofFile } from "./RevocationProofFile.mjs";
import { SignedMessageFile } from "./SignedMessageFile.mjs";
import { TrustedStorageRepairRequestFile } from "./TrustedStorageRepairRequest.mjs";
import { CertificateActivationRequestFile } from "./CertificateActivationRequestFile.mjs";
import { DOMParser } from "xmldom";

export class RequestFileFactory {
  constructor(activationClient, locationPrefixValidator) {
    this.activationClient = activationClient;
    this.locationPrefixValidator = locationPrefixValidator;
  }

  createUploadFile(fileContent) {
    console.log("From FileFactory: Type is", fileContent.type);
    let uploadFileType = this.getUploadFileType(fileContent.type);
    if (fileContent.type === "Activation") {
      uploadFileType = RequestFileType.Activation;
    }

    switch (uploadFileType) {
      case RequestFileType.Activation:
        return new ActivationRequestFile(
          fileContent,
          this.activationClient,
          this.locationPrefixValidator
        );

      case RequestFileType.TrustedStorageActivation:
        return new TrustedStorageActivationRequestFile(
          fileContent,
          this.activationClient,
          this.locationPrefixValidator
        );

      case RequestFileType.CertificateActivation:
        return new CertificateActivationRequestFile(
          fileContent,
          this.activationClient,
          this.locationPrefixValidator
        );

      case RequestFileType.TrustedStorageReturn:
        return new TrustedStorageReturnRequestFile(
          fileContent,
          this.activationClient
        );

      case RequestFileType.RevocationProof:
        return new RevocationProofFile(fileContent, this.activationClient);

      case RequestFileType.SignedActivation:
        break;

      case RequestFileType.SignedBindingActivation:
        break;

      case RequestFileType.SignedOneStepReturn:
        break;

      case RequestFileType.SignedUpgrade:
        return new SignedMessageFile(
          fileContent,
          uploadFileType,
          this.activationClient,
          this.locationPrefixValidator
        );

      case RequestFileType.TrustedStorageRepair:
        return new TrustedStorageRepairRequestFile(
          fileContent,
          this.activationClient
        );

      default:
        throw new Error("File content is invalid.");
    }
  }

  getUploadFileType(fileContent) {
    if (!fileContent) {
      return RequestFileType.Unknown;
    }

    if (this.isXmlFileContent(fileContent)) {
      return this.getUploadFileTypeFromXml(fileContent);
    }

    if (this.isRevocationProofJsonFileContent(fileContent)) {
      return RequestFileType.RevocationProof;
    }

    if (this.isSignedMessageJsonFileContent(fileContent)) {
      return this.getUploadFileTypeSignedMessage(fileContent);
    }

    if (this.isActivationRequestJsonFileContent(fileContent)) {
      return RequestFileType.Activation;
    }

    return RequestFileType.Unknown;
  }

  isXmlFileContent(fileContent) {
    try {
      new DOMParser().parseFromString(fileContent, "application/xml");

      return true;
    } catch (e) {
      return false;
    }
  }

  getUploadFileTypeFromXml(fileContent) {
    if (this.isTrustedStorageActivationRequestXml(fileContent)) {
      return RequestFileType.TrustedStorageActivation;
    }

    if (this.isTrustedStorageReturnRequestXml(fileContent)) {
      return RequestFileType.TrustedStorageReturn;
    }

    if (this.isTrustedStorageRepairRequestXml(fileContent)) {
      return RequestFileType.TrustedStorageRepair;
    }

    if (this.isCertificateXml(fileContent)) {
      return RequestFileType.CertificateActivation;
    }

    return RequestFileType.Unknown;
  }

  getUploadFileTypeSignedMessage(fileContent) {
    if (this.isSignedMessageActivation(fileContent)) {
      return RequestFileType.SignedActivation;
    }

    if (this.isSignedMessageBindingActivation(fileContent)) {
      return RequestFileType.SignedBindingActivation;
    }

    if (this.isSignedMessageOneStepReturn(fileContent)) {
      return RequestFileType.SignedOneStepReturn;
    }

    if (this.isSignedMessageUpgrade(fileContent)) {
      return RequestFileType.SignedUpgrade;
    }

    return RequestFileType.Unknown;
  }

  isActivationRequestJsonFileContent(fileContent) {
    try {
      const activationRequest = JSON.parse(fileContent);

      return (
        activationRequest?.ItemIdsWithQuantity?.length > 0 ||
        activationRequest?.ItemIds?.length > 0
      );
    } catch {
      return false;
    }
  }

  isSignedMessageJsonFileContent(fileContent) {
    try {
      const signedMessage = JSON.parse(fileContent);

      return !!signedMessage?.Data;
    } catch {
      return false;
    }
  }

  isRevocationProofJsonFileContent(fileContent) {
    try {
      const revocationProofItem = JSON.parse(fileContent);

      return !!revocationProofItem?.Revocation;
    } catch {
      return false;
    }
  }

  isTrustedStorageRequestXml(fileContent, key) {
    try {
      const parser = new DOMParser();

      const xmlDoc = parser.parseFromString(fileContent, "application/xml");

      const elements = xmlDoc.getElementsByTagName(key);

      return elements.length > 0;
    } catch {
      return false;
    }
  }

  isTrustedStorageActivationRequestXml(fileContent) {
    return this.isTrustedStorageRequestXml(fileContent, "RequestActivate");
  }

  isTrustedStorageReturnRequestXml(fileContent) {
    return this.isTrustedStorageRequestXml(fileContent, "RequestReturn");
  }

  isTrustedStorageRepairRequestXml(fileContent) {
    return this.isTrustedStorageRequestXml(fileContent, "RequestRepair");
  }

  isCertificateXml(fileContent) {
    try {
      const parser = new DOMParser();

      const xmlDoc = parser.parseFromString(fileContent, "application/xml");

      return xmlDoc.documentElement.nodeName === "offline_dongle_activation";
    } catch {
      return false;
    }
  }

  isSignedMessageActivation(fileContent) {
    try {
      const signedMessage = JSON.parse(fileContent);

      return signedMessage?.DataType === "ActivationRequest";
    } catch {
      return false;
    }
  }

  isSignedMessageBindingActivation(fileContent) {
    try {
      const signedMessage = JSON.parse(fileContent);

      return signedMessage?.DataType === "BindingActivationRequest";
    } catch {
      return false;
    }
  }

  isSignedMessageOneStepReturn(fileContent) {
    try {
      const signedMessage = JSON.parse(fileContent);

      return signedMessage?.DataType === "OneStepReturnRequest";
    } catch {
      return false;
    }
  }

  isSignedMessageUpgrade(fileContent) {
    try {
      const signedMessage = JSON.parse(fileContent);

      return signedMessage?.DataType === "UpgradeRequest";
    } catch {
      return false;
    }
  }
}
