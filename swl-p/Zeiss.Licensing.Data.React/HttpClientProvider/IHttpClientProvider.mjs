import "./EHttpClientType.mjs";

export class IHttpClientProvider {
  constructor() {
    if (new.target === IHttpClientProvider) {
      throw new TypeError(
        "Cannot construct IHttpClientProvider instances directly"
      );
    }
  }

  /**
   * @param {EHttpClientType} httpClientType - Http client type
   * @returns {HttpClient} Http client
   * @deprecated Use getHttpClientAsync instead
   */

  getHttpClient(httpClientType) {
    console.warn("Use getHttpClientAsync instead");
    throw new Error("Not implemented");
  }

  /**
   * Get help client
   * @param {EHttpClientType} httpClientType
   * @returns {Promise<HttpClient>} Http client
   */
  async getHttpClientAsync(httpClientType) {
    throw new Error("Not implemented");
  }
}
