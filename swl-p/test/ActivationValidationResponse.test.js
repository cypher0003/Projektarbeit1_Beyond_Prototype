import { expect } from "chai";

import { ActivationValidationResponse } from "../WebServiceClient/Models/ActivationValidationResponse.mjs";
import { ActivatableItem } from "../Data/TransferObjects/V1/ActivatableItem.mjs";
import { InvalidItem } from "../Data/TransferObjects/InvalidItem.mjs";
import { GetActivatableItemsResponse } from "../Data/TransferObjects/V1/GetActivatableItem.mjs";

/*eslint-env mocha*/

describe("ActivationValidationResponse", () => {
  it("should return the correct activation item IDs", () => {
    const activatableItem1 = new ActivatableItem();
    activatableItem1.productKey = "1233";

    const activatableItem2 = new ActivatableItem();
    activatableItem2.productKey = "1233";

    const invalidItem1 = new InvalidItem();
    invalidItem1.Reason = "wrong";

    const invalidItem2 = new InvalidItem();
    invalidItem1.Reason = "wrong";

    const itemIds = ["item1", "item2"];

    const getActivatableItemsResponse = new GetActivatableItemsResponse();
    getActivatableItemsResponse.activatableItems = [
      activatableItem1,
      activatableItem2,
    ];
    getActivatableItemsResponse.invalidActivatableItems = [
      invalidItem1,
      invalidItem2,
    ];

    const response = new ActivationValidationResponse(
      itemIds,
      getActivatableItemsResponse
    );

    expect(response.activationItemIds).to.deep.equal(itemIds);
  });

  it("should return the correct invalid items", () => {
    const itemIds = [];

    const invalidItems = [{ id: "item3", name: "Invalid Item" }];

    const getActivatableItemsResponse = {
      activatableItems: [],

      invalidActivatableItems: invalidItems,
    };

    const response = new ActivationValidationResponse(
      itemIds,
      getActivatableItemsResponse
    );

    expect(response.invalidItems).to.deep.equal(invalidItems);
  });
});
