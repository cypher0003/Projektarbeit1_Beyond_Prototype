import { HttpResponseHelper } from "../Helper/ResponseHelper.mjs";

import { JsonConstants } from "../Constants/JsonConstants.mjs";

export class BaseClient {
  constructor(httpClientProvider, httpClientType, logger) {
    this.logger = logger;

    this.httpClientType = httpClientType;

    this.httpClientProvider = httpClientProvider;
  }

  get objectType() {
    throw new Error(
      "Die Methode 'getObjectType' muss in einer abgeleiteten Klasse implementiert werden."
    );
  }

  get version() {
    throw new Error(
      "Die Methode 'getVersion' muss in einer abgeleiteten Klasse implementiert werden."
    );
  }

  getTargetUrl() {
    return `/api/${this.objectType}`;
  }

  getTargetUrlWithVersion(version) {
    return `/api/${version}/${this.objectType}`;
  }

  async createHttpClient() {
    return await this.httpClientProvider.getHttpClientAsync(
      this.httpClientType
    );
  }

  async sendRequest(httpMethod, targetUrl, jsonContent = "") {
    this.logger?.log(
      `[${this.log()}] Send http request. ${httpMethod}: ${targetUrl}, content: ${jsonContent}`
    );

    let options = {
      method: httpMethod,

      headers: {},
      mode: "cors",
    };

    if (jsonContent) {
      options.headers["Content-Type"] = "application/json";

      options.body = jsonContent;
    }

    let response;

    try {
     

      response = await fetch(targetUrl, options);
    } catch (error) {
      throw new Error(
        `[${httpMethod}] Anfrage fehlgeschlagen: ${targetUrl}, Inhalt: ${jsonContent}, Fehler: ${error.message}`
      );
    }

    await this.logHttpResponseMessageDetails(response, httpMethod);

    return response;
  }

  async send(httpMethod, targetUrl, httpClient = null) {
    if (!httpClient) {
      httpClient = await this.createHttpClient();
    }
    console.log({ targetUrl });
    const httpResponseMessage = await this.sendRequest(httpMethod, targetUrl);

    const responseHelper = await HttpResponseHelper.create(httpResponseMessage);

    if (!responseHelper.success) {
      throw responseHelper.zeissLicensingException;
    }

    return responseHelper.data;
  }

  async sendWithContent(httpMethod, targetUrl, content, httpClient = null) {
    const json = content
      ? JSON.stringify(
          content,

          JsonConstants.jsonSerializerOptions.replacer,

          JsonConstants.jsonSerializerOptions.space
        )
      : "";

    if (!httpClient) {
      httpClient = await this.createHttpClient();
    }

    const httpResponseMessage = await this.sendRequest(
      httpMethod,

      targetUrl,

      json
    );

    const responseHelper = await HttpResponseHelper.create(httpResponseMessage);

    if (!responseHelper.success) {
      throw responseHelper.zeissLicensingException;
    }

    return responseHelper.data;
  }

  async sendLegacy(httpMethod, targetUrl, content) {
    const json = content ? JSON.stringify(content) : "";

    let httpResponseMessage;

    const httpClient = await this.createHttpClient();

    try {
      httpResponseMessage = await this.sendRequest(
        httpClient,
        httpMethod,
        targetUrl,
        json
      );
    } finally {
      // Falls erforderlich, kann man zusätzliche Logik hinzufügen, um den httpClient zu schließen.
    }

    const baseClientResponse = await HttpResponseHelper.createWithoutResponse(
      httpResponseMessage
    );

    if (!baseClientResponse.success) {
      throw baseClientResponse.zeissLicensingException;
    }

    return baseClientResponse.data;
  }
  log() {
    const error = new Error();

    const stack = error.stack || "";

    const stackLines = stack.split("\n");

    if (stackLines.length > 2) {
      return stackLines[2].trim().split(" ")[1]; 
    }

    return "Unbekannt";
  }

  async logHttpResponseMessageDetails(httpResponseMessage, httpMethod) {
    const responseContent = httpResponseMessage.body
      ? await httpResponseMessage.text()
      : "";

    this.logger?.log(
      `[${this.log()}] ${httpMethod}. StatusCode: ${
        httpResponseMessage.status
      }, Headers: ${JSON.stringify(
        httpResponseMessage.headers
      )}, Response: ${responseContent}`
    );
  }
}
