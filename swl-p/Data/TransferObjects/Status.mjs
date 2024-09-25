export class Status {
  constructor(success = true, message = null, flexnetErrorCode = null) {
    this.success = success;

    this.message = message;

    this.flexnetErrorCode = flexnetErrorCode;
  }
}
