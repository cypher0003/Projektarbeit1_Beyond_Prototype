export class LocationPrefixValidator {
  constructor(configuration) {
    this._configuration = configuration;
  }

  validate(itemIds) {
    try {
      console.log("validate method accessed");
      const locationPrefix = this._configuration.getValue("LocationPrefix", "");
      console.log(`${this._configuration.getValue("LocationPrefix", "")}`);
      for (const itemId of itemIds) {
        const prefix = this.getItemIdPrefix(itemId);

        if (
          (locationPrefix === "" && prefix !== "") ||
          (locationPrefix !== "" &&
            (!itemId || !itemId.startsWith(locationPrefix)))
        ) {
          console.error("Invalid Prefix");
          throw new Error("Invalid Prefix");
        }
      }
    } catch (ex) {
      console.error(ex);
    }
  }

  getItemIdPrefix(itemId) {
    if (!itemId || itemId.length <= 1) {
      return "";
    }

    return itemId[1] === "-" ? itemId.substring(0, 2) : "";
  }
}
