import { expect } from "chai";

import { UpgradeRule } from "../Data/Models/UpgradeRule.mjs";

import { RefProductVariant } from "../Data/Models/RefProductVariant.mjs";

/*eslint-env mocha*/

describe("UpgradeRule", () => {
  it("should not validate with AND operator when a product variant is missing", () => {
    const upgradeRule = new UpgradeRule();

    const productVariant1 = new RefProductVariant();

    productVariant1._materialNumber = "1";
    productVariant1._name = "p1";
    productVariant1._version = "1.0";

    const productVariant2 = new RefProductVariant();

    productVariant2._materialNumber = "2";
    productVariant2._name = "p2";
    productVariant2._version = "2.0";

    upgradeRule.compareOperator = "AND";

    upgradeRule.validationList = [productVariant1, productVariant2];

    const productVariants = [{ id: "var1", name: "Product 1", version: "v1" }];

    const result = upgradeRule.validate(productVariants);

    expect(result).to.be.false;
  });

  it("should not validate with OR operator when no product variants match", () => {
    const upgradeRule = new UpgradeRule();

    upgradeRule.compareOperator = "OR";

    const productVariant1 = new RefProductVariant();

    productVariant1._materialNumber = "1";
    productVariant1._name = "p1";
    productVariant1._version = "1.0";

    const productVariant2 = new RefProductVariant();

    productVariant2._materialNumber = "2";
    productVariant2._name = "p2";
    productVariant2._version = "2.0";

    const productVariant3 = new RefProductVariant();

    productVariant3._materialNumber = "3";
    productVariant3._name = "p3";
    productVariant3._version = "3.0";

    upgradeRule.validationList = [productVariant1, productVariant2];

    const productVariants = [{ id: "var3", name: "Product 3", version: "v3" }];

    const result = upgradeRule.validate(productVariants);

    expect(result).to.be.false;
  });

  it("should correctly validate with AND operator when all product variants match", () => {
    const upgradeRule = new UpgradeRule();

    upgradeRule.compareOperator = "AND";

    const productVariant1 = new RefProductVariant();

    productVariant1._materialNumber = "1";
    productVariant1._name = "p1";
    productVariant1._version = "1.0";

    const productVariant2 = new RefProductVariant();

    productVariant2._materialNumber = "2";
    productVariant2._name = "p2";
    productVariant2._version = "2.0";

    upgradeRule.validationList = [productVariant1, productVariant2];

    const productVariants = upgradeRule.validationList;

    const result = upgradeRule.validate(productVariants);

    expect(result).to.be.true;
  });

  it("should correctly validate with OR operator when at least one product variant matches", () => {
    const upgradeRule = new UpgradeRule();

    upgradeRule.compareOperator = "OR";

    const productVariant1 = new RefProductVariant();

    productVariant1._materialNumber = "1";
    productVariant1._name = "p1";
    productVariant1._version = "1.0";

    const productVariant2 = new RefProductVariant();

    productVariant2._materialNumber = "2";
    productVariant2._name = "p2";
    productVariant2._version = "2.0";

    upgradeRule.validationList = [productVariant1, productVariant2];

    const productVariants = [productVariant2];

    const result = upgradeRule.validate(productVariants);

    expect(result).to.be.true;
  });

  it("should correctly convert rule to string with AND operator", () => {
    const upgradeRule = new UpgradeRule();

    upgradeRule.compareOperator = "AND";

    const productVariant1 = new RefProductVariant();

    productVariant1._materialNumber = "1";
    productVariant1._name = "p1";
    productVariant1._version = "1.0";

    const productVariant2 = new RefProductVariant();

    productVariant2._materialNumber = "2";
    productVariant2._name = "p2";
    productVariant2._version = "2.0";

    upgradeRule.validationList = [productVariant1, productVariant2];

    const result = upgradeRule.toString();

    expect(result).to.equal("p1:1.0 AND p2:2.0");
  });

  it("should correctly convert rule to string with OR operator", () => {
    const upgradeRule = new UpgradeRule();

    upgradeRule.compareOperator = "OR";

    const productVariant1 = new RefProductVariant();

    productVariant1._materialNumber = "1";
    productVariant1._name = "p1";
    productVariant1._version = "1.0";

    const productVariant2 = new RefProductVariant();

    productVariant2._materialNumber = "2";
    productVariant2._name = "p2";
    productVariant2._version = "2.0";

    upgradeRule.validationList = [productVariant1, productVariant2];

    const result = upgradeRule.toString();

    expect(result).to.equal("p1:1.0 OR p2:2.0");
  });
});
