import { expect } from "chai";

import { RefProductVariant } from "../Data/Models/RefProductVariant.mjs";

import { FormatHelper } from "../Data/Helper/FormatHelper.mjs";

/*eslint-env mocha*/

describe("RefProductVariant", () => {
  it("should create an instance with default values", () => {
    const productVariant = new RefProductVariant();

    expect(productVariant.name).to.equal("");

    expect(productVariant.version).to.equal("");

    expect(productVariant.materialNumber).to.equal("");
  });

  it("should set and get the name and version correctly", () => {
    const productVariant = new RefProductVariant();

    productVariant.name = "Test Product";

    productVariant.version = "1.0";

    expect(productVariant.name).to.equal("Test Product");

    expect(productVariant.version).to.equal("1.0");
  });

  it("should set and get the material number correctly", () => {
    const productVariant = new RefProductVariant();

    const materialNumber = "123456789012345678";

    productVariant.materialNumber = materialNumber;

    expect(productVariant.materialNumber).to.equal(materialNumber);
  });

  it("should throw an error for invalid material number", () => {
    const productVariant = new RefProductVariant();

    const invalidMaterialNumber = "123";

    expect(() => {
      productVariant.materialNumber = invalidMaterialNumber;
    }).to.throw(
      RangeError,
      "MaterialNumber length must be 18 and must be numeric."
    );
  });

  it("should format and unformat the material number correctly", () => {
    const productVariant = new RefProductVariant();

    const materialNumber = "123456789012345678";

    const formattedMaterialNumber =
      FormatHelper.getFormattedMaterialnumber(materialNumber);

    productVariant.materialNumber = materialNumber;

    expect(productVariant.formattedMaterialNumber).to.equal(
      formattedMaterialNumber
    );

    productVariant.formattedMaterialNumber = formattedMaterialNumber;

    expect(productVariant.materialNumber).to.equal(
      FormatHelper.getUnFormattedMaterialnumber(formattedMaterialNumber)
    );
  });

  it("should clone the product variant correctly", () => {
    const original = new RefProductVariant(
      "Test Product",
      "1.0",
      "123456789012345678"
    );

    const clone = original.clone();

    expect(clone).to.deep.equal(original);

    expect(clone).to.not.equal(original);
  });
});
