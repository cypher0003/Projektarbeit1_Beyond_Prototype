import {
  NamedUsersConcurrencyCriteria,
  EntitlementProductKeyState,
  EntitlementProductKeyActivationMethod,
} from "./Enums";

import { ActivationAttribute } from "./ActivationAttribute.mjs";

import { NamedUser } from "./NamedUser.mjs";

import { NamedUsersProperties } from "./NamedUsersProperties";

import { EntitlementProduct } from "./EntitlementProduct";

export class EntitlementProductKey {
  constructor() {
    this.productKeyId = "";

    this.orderId = "";

    this.orderItemId = "";

    this.upgradeFrom = "";

    this.renewalFrom = "";

    this.startDate = null;

    this.durationInDays = null;

    this.totalQuantity = 0;

    this.availableQuantity = 0;

    this.splittedQuantity = 0;

    this.fixedQuantity = 0;

    this.state = EntitlementProductKeyState.Draft;

    this.activationMethod = EntitlementProductKeyActivationMethod.Fixed;

    this.product = null;

    this.productBusinessgroup = "";

    this.productFamily = "";

    this.productMaterialNumber = "";

    this.productVariantId = "";

    this.czSerialNumber = "";

    this.serialNumber = "";

    this.creationDate = null;

    this.lastModifiedDate = null;

    this.activationAttributes = [];

    this.numberOfRehosts = 0;

    this.periodOfRehosts = 0;

    this.numberOfReturns = 0;

    this.periodOfReturns = 0;

    this.namedUsersProperties = new NamedUsersProperties();

    this.namedUsers = [];

    this.isUpgrade = false;
  }

  get endDate() {
    if (this.durationInDays !== null) {
      return new Date(
        this.startDate.getTime() + this.durationInDays * 24 * 60 * 60 * 1000
      );
    }

    return null;
  }

  set endDate(value) {
    if (value !== null) {
      const timeSpan = value.getTime() - this.startDate.getTime();

      this.durationInDays = Math.floor(timeSpan / (24 * 60 * 60 * 1000));
    } else {
      this.durationInDays = null;
    }
  }

  get isConnectedLicenseModel() {
    return this.namedUsersProperties !== null;
  }

  clone() {
    const entitlementProductKey = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    );

    entitlementProductKey.namedUsers = this.namedUsers.map((user) =>
      user.clone()
    );

    entitlementProductKey.product = this.product ? this.product.clone() : null;

    return entitlementProductKey;
  }
}
