import { expect } from "chai";

import { config } from "../WebServiceClient/Config/loadConfig.mjs";
import sinon from "sinon";

import { HttpClientProvider } from "../WebServiceClient/Clients/HttpClientProvider.mjs";
import { EHttpClientType } from "../WebServiceClient/Enums/EHttpClientType.mjs";

import { ProtectedSessionStorageRepositoryHelper } from "../src/ComponentsLibrary/Helper/PortectedStorageHelper.mjs";

import { SignJWT } from "jose";
/*eslint-env mocha*/

describe("HttpClientProvider", () => {
  let logger;

  let cache;

  let protectedSessionStorageRepositoryHelper;

  let fetchMock;

  beforeEach(() => {
    logger = {
      error: sinon.spy(),

      log: sinon.spy(),
    };

    cache = {
      hasObjectId: sinon.stub(),

      get: sinon.stub(),
    };

    protectedSessionStorageRepositoryHelper = sinon.createStubInstance(
      ProtectedSessionStorageRepositoryHelper
    );

    fetchMock = sinon.stub(globalThis, "fetch");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return an HTTP client with correct baseURL and headers for Activation", async () => {
    const httpClientProvider = new HttpClientProvider(
      config,
      logger,
      cache,
      protectedSessionStorageRepositoryHelper
    );

    fetchMock.resolves({
      url: `${config.Endpoint.baseUrlFunctionApps}/some-endpoint`,

      status: 200,

      json: async () => ({}),
    });

    const httpClient = await httpClientProvider.getHttpClientAsync(
      EHttpClientType.Activation
    );

    const result = await httpClient("/some-endpoint", { method: "GET" });

    expect(result.url).to.include(config.Endpoint.baseUrlFunctionApps);

    expect(fetchMock.calledOnce).to.be.true;

    expect(fetchMock.firstCall.args[0]).to.include(
      config.Endpoint.baseUrlFunctionApps
    );

    expect(fetchMock.firstCall.args[1].headers["x-functions-key"]).to.equal(
      config.Secrets.SWLServicesSubscriptionKey
    );
  });

  it("should throw an error for invalid HttpClient type", async () => {
    const httpClientProvider = new HttpClientProvider(
      config,
      logger,
      cache,
      protectedSessionStorageRepositoryHelper
    );

    try {
      await httpClientProvider.getHttpClientAsync("InvalidType");
    } catch (error) {
      expect(error.message).to.equal(
        "HttpClientType 'InvalidType' not implemented"
      );
    }
  });

  /*eslint-env mocha*/

  it("should return an HTTP client with correct baseURL and headers for Activation", async () => {
    const httpClientProvider = new HttpClientProvider(
      config,

      logger,

      cache,

      protectedSessionStorageRepositoryHelper
    );

    fetchMock.resolves({
      url: `${config.Endpoint.baseUrlFunctionApps}/some-endpoint`,

      status: 200,

      json: async () => ({}),
    });

    const httpClient = await httpClientProvider.getHttpClientAsync(
      EHttpClientType.Activation
    );

    const result = await httpClient("/some-endpoint", { method: "GET" });

    expect(result.url).to.include(config.Endpoint.baseUrlFunctionApps);

    expect(fetchMock.calledOnce).to.be.true;

    expect(fetchMock.firstCall.args[0]).to.include(
      config.Endpoint.baseUrlFunctionApps
    );

    expect(fetchMock.firstCall.args[1].headers["x-functions-key"]).to.equal(
      config.Secrets.SWLServicesSubscriptionKey
    );
  });

  it("should throw an error for invalid HttpClient type", async () => {
    const httpClientProvider = new HttpClientProvider(
      config,

      logger,

      cache,

      protectedSessionStorageRepositoryHelper
    );

    try {
      await httpClientProvider.getHttpClientAsync("InvalidType");
    } catch (error) {
      expect(error.message).to.equal(
        "HttpClientType 'InvalidType' not implemented"
      );
    }
  });

  it("should return an HTTP client with Bearer token for non-activation types", async () => {
    const httpClientProvider = new HttpClientProvider(
      config,

      logger,

      cache,

      protectedSessionStorageRepositoryHelper
    );

    // Signiere das Token mit jose

    const secretKey = "test-secret";

    const validToken = await new SignJWT({ oid: "some-oid" })

      .setProtectedHeader({ alg: "HS256" })

      .setIssuedAt()

      .setExpirationTime("1h")

      .sign(new TextEncoder().encode(secretKey));

    httpClientProvider.IDToken = validToken;

    // Mock fetch response

    fetchMock.resolves({
      url: `${config.Endpoint.baseUrlProduct}/some-endpoint`,

      status: 200,

      json: async () => ({}),
    });

    const httpClient = await httpClientProvider.getHttpClientAsync(
      EHttpClientType.Product
    );

    const result = await httpClient("/some-endpoint", { method: "GET" });

    expect(result.url).to.include(config.Endpoint.baseUrlProduct);

    expect(fetchMock.calledOnce).to.be.true;

    expect(fetchMock.firstCall.args[1].headers["Authorization"]).to.equal(
      `Bearer ${validToken}`
    );
  });
});
