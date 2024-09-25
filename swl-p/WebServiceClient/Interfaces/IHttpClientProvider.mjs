import { EHttpClientType } from "../Enums/EHttpClientType.mjs";

class IHttpClientProvider {
  async getHttpClientAsync(httpClientType) {
    throw new Error("Not Implemented");
  }
}
