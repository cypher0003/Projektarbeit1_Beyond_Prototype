

export class IRequestFile {
  constructor() {
    if (new.target === IRequestFile) {
      throw new TypeError("Cannot construct IRequestFile instances directly");
    }
  }

  get fileContent() {
    throw new Error("Method 'fileContent()' must be implemented.");
  }

  get type() {
    throw new Error("Method 'type()' must be implemented.");
  }

  async validate() {
    throw new Error("Method 'validate()' must be implemented.");
  }

  async process() {
    throw new Error("Method 'process()' must be implemented.");
  }
}
