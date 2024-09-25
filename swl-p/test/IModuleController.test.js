import { expect } from "chai";

import { IModuleController } from "../src/Zeiss.Licensing.Backend.UI.DataTypes/IModuleController.mjs";

import { User } from "../Data/Models/User.mjs";

import { Module } from "../Data/Models/Module.mjs";

import { GrantType } from "../Data/Enums/GrantType.mjs";

/*eslint-env mocha*/
describe("IModuleController", () => {
  it("should return a Module for a given User", () => {
    const controller = new IModuleController();

    const roleData = {
      id: "1",

      name: "User",

      businessgroup: "BusinessGroup",

      productFamilies: ["Product1"],

      grantProduct: GrantType.View,

      grantOrder: GrantType.Edit,

      grantLicense: GrantType.Add,

      grantEntitlement: GrantType.Delete,

      grantDevice: GrantType.None,

      grantUser: GrantType.View,

      grantOrganization: GrantType.Edit,

      grantNamespace: GrantType.Add,

      grantRole: GrantType.Delete,

      grantProductFamily: GrantType.None,

      grantLicenseModel: GrantType.View,

      grantModule: GrantType.Edit,

      grantDeviceType: GrantType.Add,

      grantDocument: GrantType.Delete,

      additionalGrants: {},

      creationDate: new Date(),

      lastModifiedDate: new Date(),
    };

    const userData = {
      id: "123",

      roles: [roleData],

      modules: [],

      creationDate: new Date(),

      lastModifiedDate: new Date(),

      lastLogin: new Date(),

      state: "ENABLE",

      accountType: "User",

      allowedAliases: [],

      lastName: "Doe",

      email: "john.doe@example.com",

      firstName: "John",

      userId: "user123",

      accountId: "acc123",

      invitationId: "inv123",

      organizationId: "org123",

      organizationNumber: "orgNum123",

      organizationName: "OrgName",

      organizationNumbers: ["orgNum123"],

      adminBusinessGroup: "adminGroup",

      searchModes: {},

      allowEmergencyAuthorization: false,

      lastUsedItems: [],
    };

    const user = new User(userData);

    const module = controller.getModule(user);

    expect(module).to.be.an.instanceof(Module);
    expect(user.name).to.equal("John Doe");
  });
});
