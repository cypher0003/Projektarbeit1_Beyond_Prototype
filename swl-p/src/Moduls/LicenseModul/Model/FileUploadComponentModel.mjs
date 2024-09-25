import { FileHelper } from "../../../ComponentsLibrary/Helper/FileHelper.mjs";

import { LicenseResource } from "../../../RessourceLibrary/LicenseRessource/LicenseRessource.mjs";

import { RequestFileFactory } from "../../../../WebServiceClient/Models/RequestFileFactory.mjs";

import { ActivatableItem } from "../../../../Data/TransferObjects/V1/ActivatableItem.mjs";
import { InvalidItem } from "../../../../Data/TransferObjects/InvalidItem.mjs";
import { Activation } from "../../../../Data/Models/Activation.mjs";
import { ProductVariant } from "../../../../Data/Models/ProductVariants.mjs";

class EqualityComparerActivatableItem {
  equals(x, y) {
    if (!x || !y) {
      return false;
    }

    return x.productKey === y.productKey;
  }

  getHashCode(obj) {
    return obj.productKey.hashCode();
  }
}

export class FileUploadComponentViewModel {
  constructor(
    activationClient,
    jsRuntime,
    configuration,
    locationPrefixValidator
  ) {
    this._activationClient = activationClient;

    this._jsRuntime = jsRuntime;

    this._configuration = configuration;

    this._locationPrefixValidator = locationPrefixValidator;

    this._uploadFile = null;

    this._validationResponse = null;

    this._alertText = "";

    this.fileContent = "";

    this.dialogText = "";

    this.dialogCaption = "";

    this.serialNumber = "";

    this.activationPreviewItemIds = [];

    this.activationPreviewItems = [];

    this.activationPreviewInvalidItems = [];

    this.upgradePreviewItemId = "";

    this.upgradePreviewRevokeActivations = [];

    this.upgradePreviewProductVariants = [];
  }

  get alertText() {
    return this._alertText;
  }

  set alertText(value) {
    this._alertText = `[${new Date().toLocaleString()}] ${value}`;
  }

  get uploadFile() {
    if (!this._uploadFile) {
      throw new Error("UploadFile property is not set.");
    }

    return this._uploadFile;
  }

  async analyzeUploadedFile(fileContent, activationClient = null) {
    const parsedContent = JSON.parse(fileContent);
    console.log(parsedContent.type);
    this.fileContent = parsedContent;
    try {
      console.log("method entered");
      console.log(`From Model: ${this.fileContent.type}`);
      this._uploadFile = new RequestFileFactory(
        this._activationClient,
        this._locationPrefixValidator
      ).createUploadFile(this.fileContent);
      console.log(`${this.fileContent.type} file initialized`);
      console.log(this._uploadFile);

      this._validationResponse =
        await this._uploadFile._locationPrefixValidator.validate([
          "DE-123",
          "DE-345",
          "DE-678",
        ]);
      console.log(`entering switch with file type: ${this.uploadFile.type}`);
      switch (this._uploadFile.type) {
        case "Activation":
          console.log("From Switch: ACTIVATION-->");
          activationClient.activate();
          break;

        case "CertificateActivation":
          console.log("CertificateActivation-->");

        case "TrustedStorageActivation":
          console.log("TrustedStorageActivation -->");

        case "SignedActivation":
          console.log("SignedActivation -->");

        case "SignedBindingActivation": {
          console.log("SignedBindingActivtion Node reached");
          const invalidItemIds =
            this._validationResponse.activationValidationResponse.invalidItems.map(
              (c) => c.itemId
            );

          this.activationPreviewItemIds =
            this._validationResponse.activationValidationResponse.activationItemIds.filter(
              (c) => !invalidItemIds.includes(c)
            );

          const comparer = new EqualityComparerActivatableItem();

          this.activationPreviewItems =
            this._validationResponse.activationValidationResponse.activatableItems.filter(
              (item, index, self) =>
                index === self.findIndex((t) => comparer.equals(t, item))
            );

          this.activationPreviewInvalidItems = [
            ...this._validationResponse.activationValidationResponse
              .invalidItems,
          ];

          if (this.activationPreviewInvalidItems.length > 0) {
            this.dialogCaption =
              LicenseResource.ACTIVATIONREQUESTCONTAINSINVALIDITEMSCAPTION;

            this.dialogText = this.activationPreviewInvalidItems
              .map((c) => `- ${c.reason}`)
              .join("\n");
          }

          break;
          console.log("None of Section 1");
        }

        case "SignedUpgrade": {
          this.upgradePreviewItemId =
            this._validationResponse.upgradeValidationResponse.upgradeItemId;

          this.upgradePreviewRevokeActivations =
            await this._validationResponse.upgradeValidationResponse.getActivations(
              this._activationClient
            );

          this.upgradePreviewProductVariants = [
            ...this._validationResponse.upgradeValidationResponse
              .productVariants,
          ];
          console.log("None of Section 2");
          break;
        }

        case "TrustedStorageReturn":

        case "TrustedStorageRepair": {
          const downloadFiles = await this.uploadFile.process();
          console.log("downloadfile initialized");
          await this.downloadFiles(downloadFiles);

          this.dialogCaption = LicenseResource.PROCESSSUCCESSFULCAPTION;

          this.dialogText = LicenseResource.PROCESSSUCCESSFULTEXT;
          console.log("None of Section 3");
          break;
        }

        case "SignedOneStepReturn": {
          await this.uploadFile.process();

          this.dialogCaption = LicenseResource.ONESTEPRETURNSUCCESSFULCAPTION;

          this.dialogText = LicenseResource.ONESTEPRETURNSUCCESSFULTEXT;
          console.log("None of Section 4");
          break;
        }

        case "RevocationProof": {
          await this.uploadFile.process();

          this.dialogCaption = LicenseResource.REVOCATIONPROOFSUCCESSFULCAPTION;

          this.dialogText = LicenseResource.REVOCATIONPROOFSUCCESSFULTEXT;
          console.log("None of Section 5");
          break;
        }

        default:
          throw new Error(`Unhandled file type: ${this._uploadFile.type}`);
      }
    } catch (ex) {
      this.alertText = ex.message;
      console.error(ex);
      throw ex;
    }
  }

  async activate() {
    try {
      const downloadFiles = await this.uploadFile.process();

      await this.downloadFiles(downloadFiles);

      this.dialogCaption = LicenseResource.ACTIVATIONSUCCESSFULCAPTION;

      this.dialogText = LicenseResource.ACTIVATIONSUCCESSFULTEXT;
      console.log("Activated");
    } catch (ex) {
      this.alertText = ex.message;

      throw ex;
    }
  }

  async upgrade() {
    try {
      const downloadFiles = await this.uploadFile.process();

      await this.downloadFiles(downloadFiles);

      this.dialogCaption = LicenseResource.UPGRADESUCCESSFULCAPTION;

      this.dialogText = LicenseResource.UPGRADESUCCESSFULTEXT;
    } catch (ex) {
      this.alertText = ex.message;

      throw ex;
    }
  }

  static isFileExtensionValid(extension) {
    return [".json", ".xml"].includes(extension);
  }

  async downloadFiles(downloadFiles) {
    for (const downloadFile of downloadFiles) {
      if (downloadFile.isBinary) {
        const byteArr = Uint8Array.from(atob(downloadFile.fileContent), (c) =>
          c.charCodeAt(0)
        );

        await FileHelper.saveBinaryFile(
          this._jsRuntime,
          downloadFile.fileName,
          byteArr
        );
      } else {
        await FileHelper.saveFile(
          this._jsRuntime,
          downloadFile.fileName,
          downloadFile.fileContent
        );
      }
    }
  }
}
