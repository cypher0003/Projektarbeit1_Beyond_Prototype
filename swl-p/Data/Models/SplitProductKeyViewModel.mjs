import { EntitlementSplitInfoItem } from "./EntitlementSplitInfoItem.mjs";
export class SplitProductKeyViewModel {
  constructor(productKey = null, activatableItem = null) {
    if (productKey) {
      this.entitlementProductKey = productKey;

      this.entitlementSplitInfoItem = new EntitlementSplitInfoItem();

      this.entitlementSplitInfoItem.productKey = productKey.productKeyId;

      this.entitlementSplitInfoItem.quantity = 0;
    } else if (activatableItem) {
      this.activatableItem = activatableItem;

      this.entitlementSplitInfoItem = new EntitlementSplitInfoItem();

      this.entitlementSplitInfoItem.productKey = activatableItem.productKey;

      this.entitlementSplitInfoItem.quantity = 0;

      this.allowMultipleActivation = activatableItem.allowMultipleActivation;
    }

    this.allowMultipleActivation = true;
  }

  get productKeyId() {
    if (this.entitlementProductKey) {
      return this.entitlementProductKey.productKeyId;
    }

    if (this.activatableItem) {
      return this.activatableItem.productKey;
    }

    return "";
  }

  set productKeyId(value) {
    if (this.entitlementProductKey) {
      this.entitlementProductKey.productKeyId = value;
    } else if (this.activatableItem) {
      this.activatableItem.productKey = value;
    }
  }

  get productName() {
    if (this.entitlementProductKey) {
      return this.entitlementProductKey.product?.product?.name || "";
    }

    if (this.activatableItem) {
      return this.activatableItem.productName;
    }

    return "";
  }

  set productName(value) {
    if (
      this.entitlementProductKey &&
      this.entitlementProductKey.product.product
    ) {
      this.entitlementProductKey.product.product.name = value;
    } else if (this.activatableItem) {
      this.activatableItem.productName = value;
    }
  }

  get productVersion() {
    if (this.entitlementProductKey) {
      return this.entitlementProductKey.product?.product?.version || "";
    }

    if (this.activatableItem) {
      return this.activatableItem.productVersion;
    }

    return "";
  }

  set productVersion(value) {
    if (
      this.entitlementProductKey &&
      this.entitlementProductKey.product.product
    ) {
      this.entitlementProductKey.product.product.version = value;
    } else if (this.activatableItem) {
      this.activatableItem.productVersion = value;
    }
  }

  get maxAvailableQuantity() {
    if (this.entitlementProductKey) {
      return this.entitlementProductKey.availableQuantity;
    }

    if (this.activatableItem) {
      return this.allowMultipleActivation
        ? this.activatableItem.availableQuantity
        : this.activatableItem.availableQuantity > 0
        ? 1
        : 0;
    }

    return 0;
  }

  get availableQuantity() {
    if (this.entitlementProductKey) {
      return this.entitlementProductKey.availableQuantity;
    }

    if (this.activatableItem) {
      return this.activatableItem.availableQuantity;
    }

    return 0;
  }

  set availableQuantity(value) {
    if (this.entitlementProductKey) {
      this.entitlementProductKey.availableQuantity = value;
    } else if (this.activatableItem) {
      this.activatableItem.availableQuantity = value;
    }
  }
}
