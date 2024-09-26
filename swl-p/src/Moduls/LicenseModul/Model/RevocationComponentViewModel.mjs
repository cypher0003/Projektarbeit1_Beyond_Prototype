import { FileHelper } from "../../../ComponentsLibrary/Helper/FileHelper.mjs";
import { LicenseResource } from "../../../RessourceLibrary/LicenseRessource/LicenseRessource.mjs";
import { ValidationStatus } from "../../../ComponentsLibrary/Enums/ValidationStatus.mjs";
import { ZeissLicensingException } from "../../../../Zeiss.Licensing.Data.React/Exceptions/ZeissLicensingException.mjs";
import { ActivationClient } from "../../../../WebServiceClient/Clients/ActivationClient.mjs";

export class RevocationComponentViewModel {
  constructor(activationClient) {
    this.activationClient = activationClient;
    this._alertText = "";
    this.activationId = "";
    this.isUserOverridePolicyAvailable = false;
    this.overridePolicy = false;
    this.validationErrorText = "";
  }
  get alertText() {
    return this._alertText;
  }

  set alertText(value) {
    const timestamp = new Date().toLocaleString();
    this._alertText = `[${timestamp}]`;
  }

  get nextButtonDisabled() {
    return !this.activationId || !this.isActivationIdValid();
  }
  isActivationIdValid() {
    const regex = /^[a-zA-Z0-9-_.]*$/;
    return regex.test(this.activationId);
  }

  async createPermissionTicket() {
    if (!this.activationClient || !this.activationClient.getPermissionTickets) {
      console.log(this.activationId);
      console.error(
        "ActivationClient or getPermissionTicketResponse is missing"
      );
    }
    try {
      const permissionTicketResponse =
        await this.activationClient.getPermissionTickets(this.activationId);

      const permissionTicketContent = JSON.stringify(
        permissionTicketResponse,
        null,
        2
      );

      const fileName = `PermissionTicket${this.activationId}.json`;

      await FileHelper.saveFile(fileName, permissionTicketContent);

      this.activationId = "";
    } catch (ex) {
      this.alertText = ex.message;

      throw ex;
    }
  }

  validateActivationId(e) {
    e.status = ValidationStatus.None;

    this.validationErrorText = "";

    if (this.isActivationIdValid()) {
      return;
    }

    e.status = ValidationStatus.Error;

    this.validationErrorText = LicenseResource.VALIDACTIVATIONIDCHARACTERS;
  }
}
