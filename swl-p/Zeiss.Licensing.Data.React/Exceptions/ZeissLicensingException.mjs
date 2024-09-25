class ZeissLicensingException extends Error {
  constructor(message, errorCode, innerException = null) {
    super(message);

    this.errorCode = errorCode;

    this.innerException = innerException;
  }

  static fromError(error) {
    return new ZeissLicensingException(
      error.Message,

      error.Code,

      error.InnerError
        ? ZeissLicensingException.fromError(error.InnerError)
        : null
    );
  }

  static fromZeissLicensingError(zeissLicensingError, ...args) {
    const message = args.length
      ? String.format(zeissLicensingError.message, ...args)
      : zeissLicensingError.message;

    return new ZeissLicensingException(message, zeissLicensingError.errorCode);
  }
}

export { ZeissLicensingException };
