export class UpgradeRule {
  constructor() {
    this.compareOperator = "AND";

    this.validationList = [];

    this.innerUpgradeRules = [];

    this.outputProductVariant = null;
  }

  validate(productVariants) {
    if (!productVariants) {
      productVariants = [];
    }

    return this._validatePrivate(productVariants);
  }

  _validatePrivate(productVariants) {
    const productVariantIds = this._getProductVariantIds(productVariants);

    switch (this.compareOperator) {
      case "AND":
        return this._validateAnd(productVariantIds, productVariants);

      case "OR":
        return this._validateOr(productVariantIds, productVariants);

      default:
        return false;
    }
  }

  _validateAnd(productVariantIds, productVariants) {
    return (
      this.validationList.every((variant) =>
        productVariantIds.includes(variant.id)
      ) && this._validateInnerUpgradeRulesAnd(productVariants)
    );
  }

  _validateOr(productVariantIds, productVariants) {
    return (
      this.validationList.some((variant) =>
        productVariantIds.includes(variant.id)
      ) || this._validateInnerUpgradeRulesOr(productVariants)
    );
  }

  _validateInnerUpgradeRulesAnd(productVariants) {
    return this.innerUpgradeRules.every((rule) =>
      rule._validatePrivate(productVariants)
    );
  }

  _validateInnerUpgradeRulesOr(productVariants) {
    return this.innerUpgradeRules.some((rule) =>
      rule._validatePrivate(productVariants)
    );
  }

  _getProductVariantIds(productVariants) {
    return productVariants.map((variant) => variant.id);
  }

  toString() {
    const validationStr = this._createUpgradeRuleString();

    if (!this.innerUpgradeRules.length) {
      return validationStr;
    }

    const innerStr = this._createInnerUpgradeRulesString();

    return `${validationStr} ${innerStr}`;
  }

  _createUpgradeRuleString() {
    switch (this.compareOperator) {
      case "AND":
        return this.validationList
          .map((variant) => `${variant.name}:${variant.version}`)
          .join(" AND ");

      case "OR":
        return this.validationList
          .map((variant) => `${variant.name}:${variant.version}`)
          .join(" OR ");

      default:
        return "";
    }
  }

  _createInnerUpgradeRulesString() {
    if (!this.innerUpgradeRules.length) {
      return "";
    }

    const results = this.innerUpgradeRules.map(
      (innerRule) => `(${innerRule.toString()})`
    );

    return results.join(` ${this.compareOperator} `);
  }

  clone() {
    const upgradeRule = new UpgradeRule();

    upgradeRule.compareOperator = this.compareOperator;

    upgradeRule.validationList = this.validationList.map((variant) => ({
      ...variant,
    }));

    upgradeRule.innerUpgradeRules = this.innerUpgradeRules.map((rule) =>
      rule.clone()
    );

    upgradeRule.outputProductVariant = this.outputProductVariant
      ? { ...this.outputProductVariant }
      : null;

    return upgradeRule;
  }
}
