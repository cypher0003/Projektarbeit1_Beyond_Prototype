import { BaseClient } from "./BaseClient.mjs";

import { EHttpClientType } from "../Enums/EHttpClientType.mjs";

import { Defaults } from "../Constants/Defaults.mjs";

import { SearchHelper } from "../Helper/SearchHelper.mjs";
import { Entitlement } from "../../Data/Models/Entitlement.mjs";
import { EntitlementSplitInfoItem } from "../../Data/Models/EntitlementSplitInfoItem.mjs";
import { SOAPEntitlement } from "../../Data/TransferObjects/IBaseEntitlement.mjs";
import { InstallbaseRequest } from "../../Data/TransferObjects/InstallBaseRequest.mjs";
import { InstallbaseResponse } from "../../Data/TransferObjects/InstallBaseResponse.mjs";
import { ReportResponse } from "../../Data/TransferObjects/ReportResponse.mjs";
import { SendMailRequest } from "../../Data/TransferObjects/SendMailRequest.mjs";
import { SearchObjectEntitlement } from "../../Data/SearchObject/SearchObjectEntitlement.mjs";

export class EntitlementClient extends BaseClient {
  constructor(httpClientProvider, logger) {
    super(httpClientProvider, EHttpClientType.Entitlement, logger);

    this.loadMorePageIndex = Defaults.PageStartIndex;
  }

  get objectType() {
    return "entitlements";
  }

  get version() {
    return "v1";
  }

  async dataMigration(entitlement) {
    const targetUrl = `${this.getTargetUrl()}/datamigration`;

    return await this.send("POST", targetUrl, entitlement);
  }

  async add(entitlement) {
    const targetUrl = this.getTargetUrl();

    return await this.send("POST", targetUrl, entitlement);
  }

  async update(entitlement) {
    const targetUrl = this.getTargetUrl();

    return await this.send("PUT", targetUrl, entitlement);
  }

  async delete(entitlement) {
    const targetUrl = this.getTargetUrl();

    await this.send("DELETE", targetUrl, entitlement);
  }

  async saveNamedUsers(productKeyId, namedUsers) {
    const targetUrl = `${this.getTargetUrl()}/productKeys/${productKeyId}/namedUsers`;

    await this.send("PUT", targetUrl, namedUsers);
  }

  async getNamedUsers(productKeyId) {
    const targetUrl = `${this.getTargetUrl()}/productKeys/${productKeyId}/namedUsers`;

    return await this.send("GET", targetUrl, null);
  }

  async updateNamedUsers(productKeyId, namedUsers) {
    const targetUrl = `${this.getTargetUrl()}/productKeys/${productKeyId}/namedUsers`;

    await this.send("PATCH", targetUrl, namedUsers);
  }

  async deleteNamedUsers(productKeyId, namedUsers) {
    const targetUrl = `${this.getTargetUrl()}/productKeys/${productKeyId}/namedUsers`;

    await this.send("DELETE", targetUrl, namedUsers);
  }

  async getEntitlements(searchObject) {
    if (!searchObject) {
      searchObject = new SearchObjectEntitlement();
    }

    if (searchObject.restartLoadMore) {
      this.loadMorePageIndex = Defaults.PageStartIndex;
    }

    const pageSize = searchObject.pageSize || Defaults.PageSize;

    const pageIndex = searchObject.useLoadMore
      ? this.loadMorePageIndex
      : searchObject.pageStartIndex || 0;

    searchObject.pageSize = pageSize;

    searchObject.pageStartIndex = pageIndex;

    const entitlements = [];

    let isLastPageIndex = false;

    let unauthorizedCount = 0;

    let invalidCount = 0;

    let totalCount = 0;

    let currentPageIndex = pageIndex;

    let response;

    do {
      const targetUrl = `${this.getTargetUrl(
        "v2"
      )}${SearchHelper.getSearchParameters(searchObject)}`;

      response = await this.send("GET", targetUrl, null);

      if (searchObject.useLoadMore) {
        this.loadMorePageIndex++;
      }

      searchObject.pageStartIndex++;

      entitlements.push(...response.list);

      currentPageIndex = response.pageIndex;

      unauthorizedCount += response.unauthorizedCount || 0;

      invalidCount += response.invalidCount || 0;

      totalCount = response.totalCount || 0;

      isLastPageIndex = response.isLastPageIndex || false;
    } while (
      response.list.length === 0 &&
      !isLastPageIndex &&
      totalCount > (currentPageIndex - 1) * pageSize
    );

    return {
      list: entitlements,

      pageIndex: currentPageIndex,

      pageSize,

      totalCount,

      isLastPageIndex,

      unauthorizedCount,

      invalidCount,
    };
  }

  async getEntitlement(entitlementId, includeNamedUsers = false) {
    this.checkEntitlementIdNotEmptyValue(entitlementId);

    const includeNamedUsersParameter = includeNamedUsers
      ? "?includeNamedUsers=true"
      : "";

    const targetUrl = `${this.getTargetUrl()}/${entitlementId}${includeNamedUsersParameter}`;

    return await this.send("GET", targetUrl, null);
  }

  async getCertificates(entitlementId) {
    if (!entitlementId) {
      throw new Error("entitlementId is required.");
    }

    const targetUrl = `${this.getTargetUrl()}/Certificate/${entitlementId}`;

    return await this.send("POST", targetUrl, null);
  }

  async getCertificateReports(entitlementId) {
    if (!entitlementId) {
      throw new Error("entitlementId is required.");
    }

    const targetUrl = `${this.getTargetUrl("v2")}/Certificate/${entitlementId}`;

    return await this.send("POST", targetUrl, null);
  }

  async sendCertificateMail(entitlementId, sendMailRequest) {
    if (!entitlementId) {
      throw new Error("entitlementId is required.");
    }

    const targetUrl = `${this.getTargetUrl()}/Certificate/${entitlementId}/Send`;

    return await this.send("POST", targetUrl, sendMailRequest);
  }

  async getEmailTemplate(entitlementId) {
    if (!entitlementId) {
      throw new Error("entitlementId is required.");
    }

    const targetUrl = `${this.getTargetUrl()}/EmailTemplate/${entitlementId}`;

    return await this.send("GET", targetUrl, null);
  }

  async getEmailBody(entitlementId) {
    if (!entitlementId) {
      throw new Error("entitlementId is required.");
    }

    const targetUrl = `${this.getTargetUrl()}/EmailBody/${entitlementId}`;

    return await this.send("GET", targetUrl, null);
  }

  async getByEntitlementId(entitlementId, matchExactly) {
    const searchObjectEntitlement = new SearchObjectEntitlement();

    searchObjectEntitlement.entitlementId = entitlementId;

    if (matchExactly) {
      searchObjectEntitlement.searchPattern = "Exact";
    }

    const entitlements = await this.getEntitlements(searchObjectEntitlement);

    return entitlements.list;
  }

  async getByProductMaterialNumber(productMaterialNumber, matchExactly) {
    const searchObjectEntitlement = new SearchObjectEntitlement();

    searchObjectEntitlement.productMaterialNumber = productMaterialNumber;

    if (matchExactly) {
      searchObjectEntitlement.searchPattern = "Exact";
    }

    const entitlements = await this.getEntitlements(searchObjectEntitlement);

    return entitlements.list;
  }

  async getByProductNameVersion(productName, productVersion, matchExactly) {
    const searchObjectEntitlement = new SearchObjectEntitlement();

    searchObjectEntitlement.productname = productName;

    searchObjectEntitlement.productversion = productVersion;

    if (matchExactly) {
      searchObjectEntitlement.searchPattern = "Exact";
    }

    const entitlements = await this.getEntitlements(searchObjectEntitlement);

    return entitlements.list;
  }

  async getByOrderId(orderId, matchExactly) {
    const searchObjectEntitlement = new SearchObjectEntitlement();

    searchObjectEntitlement.salesOrder = orderId;

    if (matchExactly) {
      searchObjectEntitlement.searchPattern = "Exact";
    }

    const entitlements = await this.getEntitlements(searchObjectEntitlement);

    return entitlements.list;
  }

  async getByProductKey(productKey, matchExactly) {
    const searchObjectEntitlement = new SearchObjectEntitlement();

    searchObjectEntitlement.productKey = productKey;

    if (matchExactly) {
      searchObjectEntitlement.searchPattern = "Exact";
    }

    const entitlements = await this.getEntitlements(searchObjectEntitlement);

    return entitlements.list;
  }

  async split(entitlementId, splitInfo) {
    if (!entitlementId) {
      throw new Error("entitlementId is required.");
    }

    const targetUrl = `${this.getTargetUrl()}/${entitlementId}/split`;

    return await this.send("POST", targetUrl, splitInfo);
  }

  async getChangedEntitlements(startDate, endDate, businessGroup) {
    const format = "YYYY-MM-DD";

    const targetUrl = `${this.getTargetUrl()}/changed?startDate=${startDate.format(
      format
    )}&endDate=${endDate.format(format)}&businessGroup=${businessGroup}`;

    return await this.send("POST", targetUrl, null);
  }

  async getInstallBase(request) {
    const targetUrl = `${this.getTargetUrl()}/legacy/getInstallbase`;

    return await this.sendLegacy("POST", targetUrl, request);
  }

  async createReportDatabaseEntry(entitlementId) {
    const targetUrl = `${this.getTargetUrl()}/reportdatabase/${entitlementId}`;

    await this.send("POST", targetUrl, null);
  }

  checkEntitlementIdNotEmptyValue(entitlementId) {
    if (!entitlementId) {
      throw new Error("entitlementId is required.");
    }
  }
}
