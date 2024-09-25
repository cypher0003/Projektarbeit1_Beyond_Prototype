export class ZeissLicensingError extends Error {
  constructor(errorCode, errorMessage) {
    super(errorMessage);

    this.errorCode = errorCode;
  }
}

export const WebServiceClientError = {
  SEND_HTTP_REQUEST_FAILED: new ZeissLicensingError(
    "11-0001",
    "Send HTTP request failed ({0})."
  ),

  HANDLE_HTTP_RESPONSE_FAILED: new ZeissLicensingError(
    "11-0002",
    "Handle HTTP response failed ({0})."
  ),

  UNKNOWN_HTTP_ERROR_RESPONSE: new ZeissLicensingError(
    "11-0003",
    "Unknown HTTP error response: {0}."
  ),

  SEND_HTTP_REQUEST_TIMED_OUT: new ZeissLicensingError(
    "11-0004",
    "HTTP request timeout."
  ),

  ITEM_ID_PREFIX_INVALID: new ZeissLicensingError(
    "11-0005",
    "Item {0} cannot be activated on this system."
  ),
};
