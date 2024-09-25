export class ActivationValidationResponse {
  constructor(itemIds, getActivatableItemResponse) {
    this._itemIds = itemIds;
    this._getActivatableItemResponse = getActivatableItemResponse;
  }

  get activationItemIds() {
    return this._itemIds;
  }

  get activatableItems() {
    return this.getActivatableItemResponse.activatableItems;
  }

  get invalidItems() {
    return this._getActivatableItemResponse.invalidActivatableItems;
  }
}
