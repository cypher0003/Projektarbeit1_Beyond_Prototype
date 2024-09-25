import { EntitlementType } from "../Enums/EntitilementType.mjs";
import { EntitlementState } from "../Enums/EntitlementState.mjs";

import { RefOrganization } from "./RefOrganization.mjs";

import { EntitlementProductKey } from "./EntitlementProductKey.mjs";

export class Entitlement {
  constructor() {
    this.identifier = "";

    this.description = "";

    this.entitlementAsWhole = null;

    this.entitlementId = "";

    this.isReadOnly = false;

    this.startDate = null;

    this.durationInDays = null;

    this.activationAllowed = null;

    this.revocationAllowed = null;

    this.state = null;

    this.sendNotification = null;

    this.ccEmail = "";

    this.isTest = null;

    this.endCustomer = null;

    this.ssc1Number = "";

    this.ssc2Number = "";

    this.factoryNumber = "";

    this.distributorNumber = "";

    this.ssc1Name = "";

    this.ssc2Name = "";

    this.factoryName = "";

    this.distributorName = "";

    this.productKeys = [];

    this.creationDate = null;

    this.lastModifiedDate = null;

    this.subscriptionStartDate = null;

    this.subscriptionEndDate = null;

    this.subscriptionNumber = "";

    this.licenseRecipientFirstName = "";

    this.licenseRecipientLastName = "";

    this.licenseRecipientEmail = "";

    this.language = "";

    this.ratePlanName = "";

    this.ratePlanId = "";

    this.entitlementType = null;
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

  clone() {
    const entitlement = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    );

    entitlement.productKeys = this.productKeys.map((key) => key.clone());

    entitlement.endCustomer = this.endCustomer
      ? this.endCustomer.clone()
      : null;

    return entitlement;
  }
}
