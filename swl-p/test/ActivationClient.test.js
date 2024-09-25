import { expect } from "chai";

import sinon from "sinon";

import { ActivationClient } from "../WebServiceClient/Clients/ActivationClient.mjs";

import { HttpClientProvider } from "../WebServiceClient/Clients/HttpClientProvider.mjs";

import { ActivationRequest } from "../Data/TransferObjects/ActivationRequest.mjs";

import { Activation } from "../Data/Models/Activation.mjs";
import { ActivationPropertiesFNPCertificate } from "../Data/Models/ActivationPropertiesFNPCertificate.mjs";
import { ActivationPropertiesFX } from "../Data/Models/ActivationPropertiesFX.mjs";
import { ActivationPropertiesVisumax } from "../Data/Models/ActivationPropertiesVisumax.mjs";

import { LegacyReturnRequest } from "../Data/TransferObjects/LegacyReturnRequest.mjs";

import { LegacyRepairRequest } from "../Data/TransferObjects/LegacyRepairRequest.mjs";

import { ProtectedSessionStorageRepositoryHelper } from "../src/ComponentsLibrary/Helper/PortectedStorageHelper.mjs";
import { ActivationPropertiesDublinLegacy } from "../Data/Models/ActivationPropertiesDublinLegacy.mjs";
import { ProtectedSessionStorage } from "../src/ComponentsLibrary/Helper/PortectedStorageHelper.mjs";

/*eslint-env mocha*/

describe("ActivationClient", () => {
  let httpClientProvider;

  let logger;

  let activationClient;

  let fetchMock;

  let cache;

  let protectedStorage;

  beforeEach(() => {


    logger = {
      log: sinon.spy(),

      error: sinon.spy(),
    };

    protectedStorage = new ProtectedSessionStorage();


    cache = {
      hasObjectId: sinon.stub(),

      get: sinon.stub(),
    };

    httpClientProvider = new HttpClientProvider(
      logger,

      cache,

      new ProtectedSessionStorageRepositoryHelper(protectedStorage)
    );


    activationClient = new ActivationClient(httpClientProvider, logger);


    fetchMock = sinon.stub(globalThis, "fetch");
  });

  afterEach(() => {
    sinon.restore(); 
  });

  it("should perform an activation", async () => {
    const dublinLegacyActivation = new ActivationPropertiesDublinLegacy();

    dublinLegacyActivation.nodeId = "testNodeId";

    dublinLegacyActivation.prefix = "testPrefix";

    dublinLegacyActivation.serialNumber = "testSerialNumber";

    const activationRequest = {
      itemIdsWithQuantity: {
        additionalProp1: 1,

        additionalProp2: 2,

        additionalProp3: 3,
      },

      lockCode: "testLockCode",

      lockCriterion: "testLockCriterion",

      fingerPrint: "testFingerPrint",

      deviceName: "testDeviceName",

      deviceId: "testDeviceId",

      deviceTypeName: "testDeviceTypeName",

      serialNumber: "testSerialNumber",

      FNPTrustedStorageRequest: "testFNPRequest",

      dublinLegacyActivation: dublinLegacyActivation,
    };

    const mockResponse = {
      ok: true,

      status: 200,

      text: async () =>
        JSON.stringify({
          data: {
            activationId: "d8882f64-3217-42a1-8441-50ea50c87a57",
          },

          error: null,
        }),
    };

    fetchMock.resolves(mockResponse);

    sinon.stub(httpClientProvider, "getHttpClientAsync").resolves(fetchMock);

    const response = await activationClient.activate(activationRequest);

    expect(response).to.eql({
      activationId: "d8882f64-3217-42a1-8441-50ea50c87a57",
    });

    expect(fetchMock.calledOnce).to.be.true;
  });

  it("should process a signed message", async () => {
    const signedMessage = {
      dataType: "string",
      data: "string",
      signatureVersion: "string",
      signature: "string",
      version: "string",
    };
    const jsonMessage = JSON.stringify(signedMessage);
    const mockResponse = {
      ok: true,
      status: 200,
      text: async () =>
        JSON.stringify({
          dataType: "testDataType",
          data: "testData",
          signatureVersion: "testSignatureversion",
          signature: "string",
          version: "v1",
        }),
    };

    fetchMock.resolves(mockResponse);

    const response = await activationClient.processSigned(jsonMessage);

    expect(response).to.equal("testData");

    expect(fetchMock.calledOnce).to.be.true;
  });

  it("should perform an activation with complex data", async () => {
    // DublinLegacyProperties instanziieren

    const dublinLegacyProperties = new ActivationPropertiesDublinLegacy();

    dublinLegacyProperties.nodeId = "testNodeId";

    dublinLegacyProperties.prefix = "testPrefix";

    dublinLegacyProperties.serialNumber = "testSerialNumber";

    // FnpCertificateProperties instanziieren

    const fnpCertificateProperties = new ActivationPropertiesFNPCertificate();

    fnpCertificateProperties.notice = "testNotice";

    fnpCertificateProperties.vendor = "testVendor";

    // VisumaxProperties instanziieren

    const visumaxProperties = new ActivationPropertiesVisumax();

    visumaxProperties.serialNumber = "testSerialNumber";

    visumaxProperties.therapyNumber = 1;

    // FxProperties instanziieren

    const fxProperties = new ActivationPropertiesFX();

    fxProperties.vH_AUTH_PASSWORD = "testPassword";

    fxProperties.vH_AUTH_USER = "testUser";

    // Erstelle die Activation-Instanz und fülle sie mit den Testdaten

    const activation = new Activation();

    activation.activationId = "testActivationId";

    activation.groupActivationId = "testGroupActivationId";

    activation.activationQuantity = 1;

    activation.deviceId = "testDeviceId";

    activation.deviceFriendlyName = "testDeviceFriendlyName";

    activation.dublinLegacyProperties = dublinLegacyProperties;

    activation.fnpCertificateProperties = fnpCertificateProperties;

    activation.visumaxProperties = visumaxProperties;

    activation.fxProperties = fxProperties;

    const mockResponse = {
      ok: true,

      status: 200,

      text: async () =>
        JSON.stringify({
          data: {
            activationId: "testActivationId",

            groupActivationId: "testGroupActivationId",

            activationQuantity: 1,

            // Setze hier weitere Felder entsprechend den Erwartungen des Tests...
          },

          error: null,
        }),
    };

    fetchMock.resolves(mockResponse);

    sinon.stub(httpClientProvider, "getHttpClientAsync").resolves(fetchMock);

    const response = await activationClient.activate(activation);

    expect(response).to.eql({
      activationId: "testActivationId",

      groupActivationId: "testGroupActivationId",

      activationQuantity: 1,

      // Überprüfe auch andere Felder nach Bedarf...
    });

    expect(fetchMock.calledOnce).to.be.true;
  });

  it("should perform a return with overridePolicy", async () => {
    const legacyReturnRequest = new LegacyReturnRequest();

    legacyReturnRequest.request = "return";

    const mockResponse = {
      ok: true,
      text: async () => JSON.stringify({ returnId: "return456" }),
    };

    fetchMock.resolves(mockResponse);

    sinon.stub(httpClientProvider, "getHttpClientAsync").resolves(fetchMock);

    const response = await activationClient.return(legacyReturnRequest, true);

    expect(JSON.stringify(response)).to.equal(
      JSON.stringify({ returnId: "return456" })
    );

    expect(fetchMock.calledOnce).to.be.true;
  });

  it("should perform a repair with a legacy request", async () => {
    const legacyRepairRequest = { requestId: "repair123" };

    const mockResponse = {
      ok: true,

      text: async () => JSON.stringify({ repairId: "repair456" }),
    };

    fetchMock.resolves(mockResponse);

    sinon.stub(httpClientProvider, "getHttpClientAsync").resolves(fetchMock);

    const response = await activationClient.repair(legacyRepairRequest);

    expect(JSON.stringify(response)).to.eql(
      JSON.stringify({ repairId: "repair456" })
    );

    expect(fetchMock.calledOnce).to.be.true;
  });
});
