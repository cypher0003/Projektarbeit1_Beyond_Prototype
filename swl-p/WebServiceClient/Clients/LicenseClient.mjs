import { DeassignFingerprintResponse } from "../../Data/TransferObjects/DeassignFingerPrintResponse.mjs";
import { HttpClientProvider } from "./HttpClientProvider.mjs";
import { EHttpClientType } from "../Enums/EHttpClientType.mjs";
import { SearchHelper } from "../Helper/SearchHelper.mjs";
import { Activation } from "../../Data/Models/Activation.mjs";
import { ActivationResponseV1 } from "../../Data/TransferObjects/ActivationResponse.mjs";
import { GetActivatableItemsResponse } from "../../Data/TransferObjects/V1/GetActivatableItem.mjs";
import { DeassignFingerprintRequestItem } from "../../Data/TransferObjects/DeassignFingerprintRequestItem.mjs";
import { BaseClient } from "./BaseClient.mjs";
import { SearchObjectLicense } from "../../Data/SearchObject/SearchObjectLicense.mjs";
import { Defaults } from "../Constants/Defaults.mjs";
import { DeviceLicenseResponse } from "../../Data/TransferObjects/DeviceLicenseResponse.mjs";
import { RehostRequest } from "../../Data/TransferObjects/RehostRequest.mjs";
import { SendMailRequest } from "../../Data/TransferObjects/SendMailRequest.mjs";
import { Fingerprint } from "../../Data/Models/Fingerprint.mjs";
import { DeassignReservation } from "../../Data/Models/DeassignReservation.mjs";
import { UpdateAssignRequest } from "../../Data/TransferObjects/UpdateAssignRequest.mjs";

export class LicenseClient extends BaseClient {
  constructor(httpClientProvider, logger) {
    super(httpClientProvider, EHttpClientType.License, logger);

    this.loadMorePageIndex = Defaults.PageStartIndex;
  }

  get objectType() {
    return "licenses";
  }

  get version() {
    return "v1";
  }

  async dataMigration(activation) {
    const targetUrl = `${this.getTargetUrl()}/datamigration`;

    return await this.send("POST", targetUrl, activation);
  }

  async add(activation) {
    const targetUrl = this.getTargetUrl();

    return await this.send("POST", targetUrl, activation);
  }

  async activate(activationRequest) {
    const targetUrl = `${this.getTargetUrl()}/activate`;

    return await this.send("POST", targetUrl, activationRequest);
  }

  async getActivatableItems(
    itemIds,
    deviceName = "",
    includeFnpTrustedStorage = false
  ) {
    let targetUrl = `${this.getTargetUrl()}/activatableItems?includeFnpTrustedStorage=${includeFnpTrustedStorage}`;

    if (deviceName) targetUrl += `&deviceName=${deviceName}`;

    return await this.send("POST", targetUrl, itemIds);
  }

  async bulkMarkRevoke(activations, comments = "") {
    if (comments) comments = `?comments=${comments}`;

    const targetUrl = `${this.getTargetUrl()}/bulkmarkrevoke${comments}`;

    await this.send("POST", targetUrl, activations);
  }

  async reject(activations, comments = "") {
    if (comments) comments = `?comments=${comments}`;

    const targetUrl = `${this.getTargetUrl()}/reject${comments}`;

    await this.send("POST", targetUrl, activations);
  }

  async getLicenses(searchObjectLicense = new SearchObjectLicense()) {
    if (searchObjectLicense.restartLoadMore) {
      this.loadMorePageIndex = Defaults.PageStartIndex;
    }

    const pageSize = searchObjectLicense.pageSize || Defaults.PageSize;

    const pageIndex = searchObjectLicense.useLoadMore
      ? this.loadMorePageIndex
      : searchObjectLicense.pageStartIndex || 0;

    searchObjectLicense.pageSize = pageSize;

    searchObjectLicense.pageStartIndex = pageIndex;

    let licenses = [];

    let pageIndexTemp = pageIndex;

    let totalCount = 0;

    let isLastPageIndex = false;

    do {
      const targetUrl = `${this.getTargetUrl(
        "v2"
      )}${SearchHelper.getSearchParameters(searchObjectLicense)}`;

      const tempLicenses = await this.send("GET", targetUrl, null);

      if (searchObjectLicense.useLoadMore) {
        this.loadMorePageIndex++;
      }

      searchObjectLicense.pageStartIndex++;

      licenses = licenses.concat(tempLicenses.list);

      pageIndexTemp = tempLicenses.pageIndex;

      totalCount = tempLicenses.totalCount;

      isLastPageIndex = tempLicenses.isLastPageIndex;
    } while (
      licenses.length === 0 &&
      !isLastPageIndex &&
      totalCount > (pageIndexTemp - 1) * pageSize
    );

    return {
      licenses,

      pageIndex: pageIndexTemp,

      pageSize,

      totalCount,

      isLastPageIndex,
    };
  }

  async getLicense(activationId) {
    if (!activationId) throw new Error("Activation ID is required.");

    const targetUrl = `${this.getTargetUrl()}/${activationId}`;

    return await this.send("GET", targetUrl, null);
  }

  async updateLicense(activation) {
    if (!activation) throw new Error("Activation object is required.");

    const targetUrl = this.getTargetUrl();

    return await this.send("PUT", targetUrl, activation);
  }

  async getLicenseForDevice(deviceId) {
    if (!deviceId) throw new Error("Device ID is required.");

    const targetUrl = `${this.getTargetUrl("v2")}/device/${deviceId}`;

    return await this.send("GET", targetUrl, null);
  }

  async regenerateLicenseForDevice(deviceId) {
    if (!deviceId) throw new Error("Device ID is required.");

    const targetUrl = `${this.getTargetUrl()}/device/${deviceId}/regenerate`;

    return await this.send("GET", targetUrl, null);
  }

  async rehost(rehostRequest, overridePolicy = false) {
    if (!rehostRequest) throw new Error("Rehost request is required.");

    let targetUrl = `${this.getTargetUrl()}/rehost`;

    if (overridePolicy) targetUrl += "?overridePolicy=true";

    return await this.send("POST", targetUrl, rehostRequest);
  }

  async sendMail(activationId, sendMailRequest) {
    if (!activationId) throw new Error("Activation ID is required.");

    const targetUrl = `${this.getTargetUrl()}/${activationId}/Send`;

    return await this.send("POST", targetUrl, sendMailRequest);
  }

  async getDeassignReservations(productKey) {
    const targetUrl = `${this.getTargetUrl()}/deassign/reservation/${productKey}`;

    return await this.send("GET", targetUrl, null);
  }

  async updateDeassignReservations(updateAssignRequests) {
    const targetUrl = `${this.getTargetUrl()}/deassign/reservation`;

    await this.send("POST", targetUrl, updateAssignRequests);
  }

  async getFingerprints(productKey) {
    const targetUrl = `${this.getTargetUrl()}/fingerprint/${productKey}`;

    return await this.send("GET", targetUrl, null);
  }

  async deassign(deassignFingerprintRequestItem) {
    const targetUrl = `${this.getTargetUrl()}/deassign`;

    return await this.send("POST", targetUrl, deassignFingerprintRequestItem);
  }

  async deletedDevice(deviceId, revokeLicenses) {
    const targetUrl = `${this.getTargetUrl()}/device/${deviceId}/delete?revokeLicenses=${revokeLicenses}`;

    await this.send("PUT", targetUrl, deviceId);
  }

  async createReportDatabaseEntry(activationId) {
    const targetUrl = `${this.getTargetUrl()}/reportdatabase/${activationId}`;

    await this.send("POST", targetUrl, null);
  }
}
