import { expect } from "chai";
import sinon from "sinon";

import { RevocationComponentViewModel } from "../src/Moduls/LicenseModul/Model/RevocationComponentViewModel.mjs";

import { ActivationClient } from "../WebServiceClient/Clients/ActivationClient.mjs";

import { FileHelper } from "../src/ComponentsLibrary/Helper/FileHelper.mjs";

import { ValidatorEventArgs } from "../src/ComponentsLibrary/Helper/ValidatorEventArgs.mjs";
import { ValidationStatus } from "../src/ComponentsLibrary/Enums/ValidationStatus.mjs";

import { ZeissLicensingException } from "../Zeiss.Licensing.Data.React/Exceptions/ZeissLicensingException.mjs";
import { HttpClientProvider } from "../WebServiceClient/Clients/HttpClientProvider.mjs";
import { EHttpClientType } from "../WebServiceClient/Enums/EHttpClientType.mjs";

/*eslint-env mocha*/

describe("RevocationComponentViewModel", () => {
  let activationClientMock;

  let revocationComponent;

  beforeEach(() => {
    activationClientMock = sinon.createStubInstance(ActivationClient);

    revocationComponent = new RevocationComponentViewModel(
      activationClientMock
    );
  });

  it("should initialize with default values", () => {
    expect(revocationComponent.activationId).to.equal("");

    expect(revocationComponent.isUserOverridePolicyAvailable).to.be.false;

    expect(revocationComponent.overridePolicy).to.be.false;

    expect(revocationComponent.validationErrorText).to.equal("");

    expect(revocationComponent.alertText).to.equal("");
  });

  it("should set and get AlertText with timestamp", () => {
    const errorMessage = "An error occurred";

    revocationComponent.AlertText = errorMessage;

    expect(revocationComponent.AlertText).to.include(errorMessage);

    it("should set and get AlertText with timestamp", () => {
      const errorMessage = "An error occurred";

      revocationComponent.AlertText = errorMessage;
      const alertText = revocationComponent.AlertText;
      const datePattern =
        /\[\d{1,2}\.\d{1,2}\.\d{4}, \d{2}:\d{2}:\d{2}\] An error occurred/;
      expect(alertText).to.match(datePattern);
      console.log("Hi");
    });
  });

  it("should validate ActivationId correctly", () => {
    revocationComponent.activationId = "valid-id_123";

    let eventArgs = new ValidatorEventArgs();

    revocationComponent.validateActivationId(eventArgs);

    expect(eventArgs.status).to.equal(ValidationStatus.None);

    expect(revocationComponent.validationErrorText).to.equal("");

    revocationComponent.activationId = "invalid id";

    eventArgs = new ValidatorEventArgs();

    revocationComponent.validateActivationId(eventArgs);

    expect(eventArgs.status).to.equal(ValidationStatus.Error);

    expect(revocationComponent.validationErrorText).to.equal(
      "Only alphanumeric characters and '-', '_', '.' are allowed"
    );
  });

  it("should create permission ticket and save to file", async () => {
    const httpClient = new HttpClientProvider();
    await httpClient.getHttpClientAsync(EHttpClientType.Activation);

    const activationClientTest = new ActivationClient();
    activationClientTest.httpClientProvider = httpClient;
    activationClientTest.activationId = "valid-id_123";
    const permissionTicket = await activationClientTest.getPermissionTickets(
      activationClientTest.activationId
    );
    expect(permissionTicket).to.be.an("object");

    const revocationComponent = new RevocationComponentViewModel();
    revocationComponent.activationId = "valid-id_123";
    expect(permissionTicket.Item).to.be.equal("valid-id_123");
    const expectedFileName = "PermissionTicket_valid-id_123.json";
    const expectedContent = JSON.stringify(permissionTicket, null, 2);
    await FileHelper.saveFile(expectedFileName, expectedContent);
  });
});
