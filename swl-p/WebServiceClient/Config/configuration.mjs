export class configuration {
  constructor(config) {
    this.config = config || {};
  }

  getSection(section) {
    const keys = section.split(":");
    let result = this.config;

    for (let key of keys) {
      if (result[key] !== undefined) {
        result = result[key];
      } else {
        throw new Error("Configuration section is missing or empty");
      }
    }

    return result;
  }

  getValue(key, defaultValue = "") {
    return Object.prototype.hasOwnProperty.call(this.config, key)
      ? this.config[key]
      : defaultValue;
  }

  static async loadFromFile(filePath) {
    const response = await fetch(filePath);
    const config = await response.json();
    return new configuration(config);
  }
}
