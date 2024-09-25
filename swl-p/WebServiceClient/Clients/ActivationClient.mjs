import { BaseClient } from "../Clients/BaseClient.mjs";

import { EHttpClientType } from "../Enums/EHttpClientType.mjs";

export class ActivationClient extends BaseClient {
  constructor(httpClientProvider, logger) {
    super(httpClientProvider, EHttpClientType.Activation, logger);
  }

  get objectType() {
    return "Licenses";
  }

  get version() {
    return "v1";
  }

  async activate(activationRequest) {
    const targetUrl =
      "https://test-url" +
      this.getTargetUrl() +
      "/activate";
    return await this.sendWithContent("POST", targetUrl, activationRequest);
  }

  async processSigned(signedMessage) {
    const targetUrl = "/api/License/processsigned";
    return await this.sendWithContent("POST", targetUrl, signedMessage);
  }

  async getActivation(activationId) {
    const targetUrl = this.getTargetUrl() + `/${activationId}/activation`;
    return await this.send("GET", targetUrl);
  }

  async return(legacyReturnRequest, overridePolicy = false) {
    let targetUrl = "/api/device/TS/return";
    if (overridePolicy) {
      targetUrl += "?overridePolicy=true";
    }
    const jsonSerializerOptions = {
      ignoreUndefined: true,
      spaces: 2,
    };
    return await this.sendLegacy(
      "POST",
      targetUrl,
      legacyReturnRequest,
      jsonSerializerOptions
    );
  }

  async repair(legacyRepairRequest) {
    const targetUrl = "/api/device/TS/repair";
    const jsonSerializerOptions = {
      ignoreUndefined: true,
      spaces: 2,
    };

    return await this.sendLegacy(
      "POST",
      targetUrl,
      legacyRepairRequest,
      jsonSerializerOptions
    );
  }

  async getActivatableItems(itemIds, includeFnpTrustedStorage = false) {
    const targetUrl = `/api/License/activatableItems?includeFnpTrustedStorage=${includeFnpTrustedStorage}`;
    return await this.sendWithContent("POST", targetUrl, itemIds);
  }

  async assign(associateFingerprintRequestItem) {
    const targetUrl = "/api/License/assign";

    const response = await this.sendWithContent(
      "POST",
      targetUrl,
      associateFingerprintRequestItem
    );

    return response.InvalidItemIds;
  }

  async getPermissionTickets(activationId, overwritePolicy = false) {
    let targetUrl = `/api/License/${activationId}/initrevocate`;

    if (overwritePolicy) {
      targetUrl += "?overridePolicy=true";
    }

    const httpClient = await this.createHttpClient();

    const response = await httpClient(targetUrl, { method: "POST" });

    const responseData = await response.json();

    const ticket = {
      Item: activationId,

      Data: responseData.length === 1 ? responseData[0] : null,

      DataList: responseData.length > 1 ? responseData : null,
    };

    return ticket;
  }

  async submitRevocationProof(activationId, revocationProofItem) {
    const targetUrl = `/api/License/${activationId}/revocate`;

    return await this.sendWithContent("POST", targetUrl, revocationProofItem);
  }

  async submitRevocationProofs(activationId, revocationProofItem) {
    const targetUrl = `/api/License/${activationId}/revocate`;

    const httpClient = await this.createHttpClient();

    await httpClient(targetUrl, {
      method: "POST",

      body: JSON.stringify(revocationProofItem),

      headers: { "Content-Type": "application/json" },
    });
  }

  async deassign(deassignFingerprintRequestItem) {
    const targetUrl = "/api/license/deassign";

    const response = await this.sendWithContent(
      "POST",
      targetUrl,
      deassignFingerprintRequestItem
    );

    return response.InvalidItemIds;
  }
}
