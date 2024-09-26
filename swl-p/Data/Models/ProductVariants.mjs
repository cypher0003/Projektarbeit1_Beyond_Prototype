import { RefProductVariant } from "./RefProductVariant.mjs";
import { ProductVariantState } from "../Enums/ProductVariantState.mjs";
import { ProductVariantType } from "../Enums/ProductVariantType.mjs";
import { SubscriptionTerm } from "../Enums/SubscriptionTerm.mjs";
import { UpgradeRule } from "./UpgradeRule.mjs";

export class ProductVariant {
  constructor() {
    this.description = "";

    this.businessgroup = "";

    this.productRatePlanChargeId = "";

    this.productRatePlanChargeName = "";

    this.productRatePlanChargeDescription = "";

    this.productRatePlanId = "";

    this.productRatePlanName = "";

    this.productRatePlanDescription = "";

    this.notes = "";

    this.productId = "";

    this.state = ProductVariantState.DRAFT;

    this.created = new Date();

    this.modified = null;

    this.licenseModel = "";

    this.licenseModelAdditional = "";

    this.type = ProductVariantType.Perpetual;

    this.isPackage = false;

    this.subscriptionTerm = SubscriptionTerm.UNDEFINED;

    this.upgradeFrom = [];

    this.deviceTypeId = "";

    this.deviceTypeName = "";

    this.deviceTypeIdAdditional = "";

    this.deviceTypeNameAdditional = "";

    this.isDemoProduct = false;

    this.demoDuration = 0;

    this.allowMultipleGenerationPerUser = false;

    this.serialNumberRequired = false;

    this.useNamedUsers = false;

    this.namedUsersConcurrencyCriteria = null;

    this.limitNamedUserAssignment = false;

    this.defaultDuration = null;

    this.emailBehaviour = null;

    this.upgradeRules = [];

    this.deployOnDelivery = false;

    this.packageSize = 1;

    this.globalId = "";

    this.availableSin = false;

    this.demoFixedEndDate = null;
  }

  clone() {
    const clone = new ProductVariant();

    clone.description = this.description;

    clone.businessgroup = this.businessgroup;

    clone.productRatePlanChargeId = this.productRatePlanChargeId;

    clone.productRatePlanChargeName = this.productRatePlanChargeName;

    clone.productRatePlanChargeDescription =
      this.productRatePlanChargeDescription;

    clone.productRatePlanId = this.productRatePlanId;

    clone.productRatePlanName = this.productRatePlanName;

    clone.productRatePlanDescription = this.productRatePlanDescription;

    clone.notes = this.notes;

    clone.productId = this.productId;

    clone.state = this.state;

    clone.created = new Date(this.created);

    clone.modified = this.modified ? new Date(this.modified) : null;

    clone.licenseModel = this.licenseModel;

    clone.licenseModelAdditional = this.licenseModelAdditional;

    clone.type = this.type;

    clone.isPackage = this.isPackage;

    clone.subscriptionTerm = this.subscriptionTerm;

    clone.upgradeFrom = this.upgradeFrom.map((upgrade) => upgrade.clone());

    clone.deviceTypeId = this.deviceTypeId;

    clone.deviceTypeName = this.deviceTypeName;

    clone.deviceTypeIdAdditional = this.deviceTypeIdAdditional;

    clone.deviceTypeNameAdditional = this.deviceTypeNameAdditional;

    clone.isDemoProduct = this.isDemoProduct;

    clone.demoDuration = this.demoDuration;

    clone.allowMultipleGenerationPerUser = this.allowMultipleGenerationPerUser;

    clone.serialNumberRequired = this.serialNumberRequired;

    clone.useNamedUsers = this.useNamedUsers;

    clone.namedUsersConcurrencyCriteria = this.namedUsersConcurrencyCriteria;

    clone.limitNamedUserAssignment = this.limitNamedUserAssignment;

    clone.defaultDuration = this.defaultDuration;

    clone.emailBehaviour = this.emailBehaviour;

    clone.upgradeRules = this.upgradeRules.map((rule) => rule.clone());

    clone.deployOnDelivery = this.deployOnDelivery;

    clone.packageSize = this.packageSize;

    clone.globalId = this.globalId;

    clone.availableSin = this.availableSin;

    clone.demoFixedEndDate = this.demoFixedEndDate
      ? new Date(this.demoFixedEndDate)
      : null;

    return clone;
  }
}
