export class ILocationPrefixValidator {
  constructor(validPrefixes) {
    this.validPrefixes = validPrefixes || [];
  }

  validate(itemIds) {
    for (const itemId of itemIds) {
      if (!this._isValidPrefix(itemId)) {
        throw new Error("Invalid Prefix for this item id");
      }
    }
  }

  _isValidPrefix(itemId) {
    return this.validPrefixes.some((prefix) => itemId.startsWith(prefix));
  }
}
