import { expect } from "chai";

import { ProductVariant } from "../Data/Models/ProductVariants.mjs";

import { UpgradeRule } from "../Data/Models/UpgradeRule.mjs";

import { UpgradeCompareOperator } from "../Data/Enums/UpgradeComparisonOperator.mjs";

/*eslint-env mocha*/

describe("ProductVariant & UpgradeRule", () => {
  it("should correctly clone a ProductVariant with UpgradeRules", () => {
    const original = new ProductVariant();

    original.description = "Original Description";

    original.businessgroup = "Business Group 1";

    original.productRatePlanChargeId = "ChargeId123";

    original.created = new Date("2023-08-16");

    original.modified = new Date("2023-08-17");

    original.upgradeFrom.push(new ProductVariant());

    const upgradeRule = new UpgradeRule();

    const refVariant1 = { id: "1", name: "Product 1", version: "v1" };

    const refVariant2 = { id: "2", name: "Product 2", version: "v2" };

    upgradeRule.validationList.push(refVariant1);

    upgradeRule.outputProductVariant = refVariant2;

    original.upgradeRules.push(upgradeRule);

    const clone = original.clone();

    expect(clone).to.be.an.instanceof(ProductVariant);

    expect(clone).to.deep.equal(original);

    clone.description = "Modified Description";

    expect(clone.description).to.not.equal(original.description);

    clone.upgradeRules[0].validationList[0].name = "Modified Product";

    expect(clone.upgradeRules[0].validationList[0].name).to.not.equal(
      original.upgradeRules[0].validationList[0].name
    );
  });

  it("should correctly clone a ProductVariant with deep nested UpgradeRules", () => {
    const original = new ProductVariant();

    const nestedUpgradeRule = new UpgradeRule();

    const refVariant1 = { id: "1", name: "Product 1", version: "v1" };

    const refVariant2 = { id: "2", name: "Product 2", version: "v2" };

    nestedUpgradeRule.compareOperator = UpgradeCompareOperator.AND;
    nestedUpgradeRule.validationList = [refVariant1, refVariant2];
    nestedUpgradeRule.validate(nestedUpgradeRule.validationList);

    nestedUpgradeRule.validationList.push(refVariant1);

    nestedUpgradeRule.outputProductVariant = refVariant2;

    const mainUpgradeRule = new UpgradeRule();

    mainUpgradeRule.innerUpgradeRules.push(nestedUpgradeRule);

    mainUpgradeRule.validationList.push(refVariant2);

    original.upgradeRules.push(mainUpgradeRule);

    const clone = original.clone();

    expect(clone.upgradeRules[0].innerUpgradeRules[0]).to.deep.equal(
      nestedUpgradeRule
    );

    expect(clone.upgradeRules[0].compareOperator).to.equal(
      UpgradeCompareOperator.AND
    );
  });
});
