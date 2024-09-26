export class RequestFile {
  constructor(fileContent, type, activationClient, locationPrefixValidator) {
    this._fileContent = fileContent;

    this._type = type;

    this._activationClient = activationClient;

    this._locationPrefixValidator = locationPrefixValidator;
  }

  get fileContent() {
    return this._fileContent;
  }

  set fileContent(value) {
    this._fileContent = value;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }

  async validate() {
    throw new Error("Method 'validate()' must be implemented in subclass.");
  }

  async process() {
    throw new Error("Method 'process()' must be implemented in subclass.");
  }

  validateLocalizationPrefix(itemIds) {
    if (this._locationPrefixValidator) {
      this._locationPrefixValidator.validate(itemIds);
    }
  }
}
