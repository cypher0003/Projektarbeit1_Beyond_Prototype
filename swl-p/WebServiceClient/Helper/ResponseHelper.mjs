export class HttpResponseHelper {
  constructor(content, data = null, error = null) {
    this.content = content;

    this.data = data;

    this.error = error;

    this.success = data !== null && error === null;

    this.zeissLicensingException = this.success
      ? null
      : new Error(error ? error.message : "UNKNOWN_HTTP_ERROR_RESPONSE");
  }

  static async create(response) {
    const content = await response.text();

    console.log("Response Content:", content); // Debugging

    console.log("Response Status:", response.status); // Debugging

    let data = null;

    let error = null;

    try {
      const parsedContent = JSON.parse(content);

      if (response.ok) {
        if (parsedContent.error) {
          error = parsedContent.error;
        } else if (parsedContent.data) {
          data = parsedContent.data;
        }
      } else {
        error = parsedContent.error || "UNKNOWN_HTTP_ERROR_RESPONSE";
      }
    } catch (e) {
      error = "Error parsing response content";

      console.error(e);
    }

    return new HttpResponseHelper(content, data, error);
  }

  static async createWithoutResponse(response) {
    const content = await response.text();

    let data = null;

    let error = null;

    try {
      data = JSON.parse(content);

      if (!response.ok) {
        error = data.error || "UNKNOWN_HTTP_ERROR_RESPONSE";
      }
    } catch (e) {
      error = "Error parsing response content";

      console.error(e);
    }

    return new HttpResponseHelper(content, data, error);
  }

  static async deserializeContent(response, type = null) {
    try {
      const json = await response.json(); // Verwende .json() anstelle von .text()

      if (type && json[type]) {
        return json[type];
      }

      return json;
    } catch (e) {
      console.error("Failed to deserialize content:", e);

      return null;
    }
  }
}
