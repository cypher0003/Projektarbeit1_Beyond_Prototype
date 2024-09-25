import { BaseModel } from "./BaseModel.mjs";

import { GrantType } from "../Enums/GrantType.mjs";

export class Role extends BaseModel {
  constructor({
    id = "",

    name = "",

    businessgroup = "",

    productFamilies = [],

    grantProduct = GrantType.None,

    grantOrder = GrantType.None,

    grantLicense = GrantType.None,

    grantEntitlement = GrantType.None,

    grantDevice = GrantType.None,

    grantUser = GrantType.None,

    grantOrganization = GrantType.None,

    grantNamespace = GrantType.None,

    grantRole = GrantType.None,

    grantProductFamily = GrantType.None,

    grantLicenseModel = GrantType.None,

    grantModule = GrantType.None,

    grantDeviceType = GrantType.None,

    grantDocument = GrantType.None,

    additionalGrants = {},

    creationDate = new Date(),

    lastModifiedDate = new Date(),
  } = {}) {
    super(id);

    this.name = name;

    this.businessgroup = businessgroup;

    this.productFamilies = productFamilies;

    this.grantProduct = grantProduct;

    this.grantOrder = grantOrder;

    this.grantLicense = grantLicense;

    this.grantEntitlement = grantEntitlement;

    this.grantDevice = grantDevice;

    this.grantUser = grantUser;

    this.grantOrganization = grantOrganization;

    this.grantNamespace = grantNamespace;

    this.grantRole = grantRole;

    this.grantProductFamily = grantProductFamily;

    this.grantLicenseModel = grantLicenseModel;

    this.grantModule = grantModule;

    this.grantDeviceType = grantDeviceType;

    this.grantDocument = grantDocument;

    this.additionalGrants = additionalGrants;

    this.creationDate = creationDate;

    this.lastModifiedDate = lastModifiedDate;
  }

  clone() {
    const cloned = new Role(
      this.id,
      this.name,
      this.businessgroup,
      [...this.productFamilies],
      this.grantProduct,
      this.grantOrder,
      this.grantLicense,
      this.grantEntitlement,
      this.grantDevice,
      this.grantUser,
      this.grantOrganization,
      this.grantNamespace,
      this.grantRole,
      this.grantProductFamily,
      this.grantLicenseModel,
      this.grantModule,
      this.grantDeviceType,
      this.grantDocument,
      { ...this.additionalGrants },
      new Date(this.creationDate),
      new Date(this.lastModifiedDate)
    );
    return cloned;
  }
}
