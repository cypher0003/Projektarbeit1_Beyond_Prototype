import { ActivatableItem } from "./ActivatableItem.mjs";

import { InvalidItem } from "../InvalidItem.mjs";

class GetActivatableItemsResponse {
  constructor() {
    this.activatableItems = [new ActivatableItem()];

    this.invalidActivatableItems = [new InvalidItem()];
  }
}

export { GetActivatableItemsResponse };
