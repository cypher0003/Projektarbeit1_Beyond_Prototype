import { jwtVerify } from "jose";
import { EHttpClientType } from "../Enums/EHttpClientType.mjs";

export class HttpClientProvider {
  constructor(
    configuration,
    logger,
    cache,
    protectedSessionStorageRepositoryHelper
  ) {
    this.configuration = configuration;

    this.logger = logger;

    this.cache = cache;

    this.protectedSessionStorageRepositoryHelper =
      protectedSessionStorageRepositoryHelper;

    this.IDToken = "";

    this.RefreshToken = "";

    this.IsEmergencyAuthorizationActive = false;
  }

  async getHttpClientAsync(httpClientType) {
    let baseUrl = "";

    let headers = {};

    switch (httpClientType) {
      case EHttpClientType.Product:
        baseUrl = this.configuration.Endpoint.baseUrlProduct;

        break;

      case EHttpClientType.Entitlement:
        baseUrl = this.configuration.Endpoint.baseUrlEntitlement;

        break;

      case EHttpClientType.User:
        baseUrl = this.configuration.Endpoint.baseUrlUser;

        break;

      case EHttpClientType.Organization:
        baseUrl = this.configuration.Endpoint.baseUrlOrganization;

        break;

      case EHttpClientType.AppSetting:
        baseUrl = this.configuration.Endpoint.baseUrlAppSetting;

        break;

      case EHttpClientType.Report:
        baseUrl = this.configuration.Endpoint.baseUrlReport;

        break;

      case EHttpClientType.Device:
        baseUrl = this.configuration.Endpoint.baseUrlDevice;

        break;

      case EHttpClientType.License:
        baseUrl = this.configuration.Endpoint.baseUrlLicense;

        break;

      case EHttpClientType.Order:
        baseUrl = this.configuration.Endpoint.baseUrlOrder;

        break;

      case EHttpClientType.Activation:
        baseUrl = "https://test-url";

        headers = {
          "api-version": "1.0",
          "x-functions-key": "testkey",
        };

        break;

      default:
        throw new Error(`HttpClientType '${httpClientType}' not implemented`);
    }

    console.log(baseUrl);

    if (this.IsEmergencyAuthorizationActive) {
      const isEmergencyLoggedIn =
        await this.protectedSessionStorageRepositoryHelper.isEmergencyLoggedIn();

      const isServiceLoggedIn =
        await this.protectedSessionStorageRepositoryHelper.isServiceLoggedIn();

      if (isServiceLoggedIn) {
        headers.Authorization = `Basic test-key`;
      } else if (isEmergencyLoggedIn) {
        await this.protectedSessionStorageRepositoryHelper.loadEmailAddress();

        const emailAddress =
          this.protectedSessionStorageRepositoryHelper.emailAddress;

        if (this.cache.hasObjectId(emailAddress)) {
          const data = this.cache.get(emailAddress);

          const mins = (new Date(data.Expiration) - new Date()) / (1000 * 60);

          if (mins < 5.0 && httpClientType !== EHttpClientType.User) {
            throw new Error("ZeissLicensingExpiredTokenException");
          }

          headers.Authorization = `Basic ${data.IDToken}`;
        }
      }
    } else {
      headers.Authorization = `Bearer ${this.IDToken}`;
    }

    // Token validation and manipulation

    if (this.IDToken && httpClientType !== EHttpClientType.Activation) {
      try {
        const decodedToken = await jwtVerify(this.IDToken, { complete: true });

        const expiryDate = new Date(decodedToken.payload.exp * 1000);

        const mins = (expiryDate - new Date()) / (1000 * 60);

        if (mins < 5.0 && httpClientType !== EHttpClientType.User) {
          throw new Error("ZeissLicensingExpiredTokenException");
        }

        const oid = decodedToken.payload.oid || "";

        if (this.cache && this.cache.hasObjectId(oid)) {
          const data = this.cache.get(oid);

          data.LastUserAction = new Date();
        }
      } catch (error) {
        console.error("Failed to decode JWT token", error);
      }
    }

    return async (url, options = {}) => {
      options.headers = {
        ...options.headers,

        ...headers,
      };

      return fetch(`${baseUrl}${url}`, options);
    };
  }
}
