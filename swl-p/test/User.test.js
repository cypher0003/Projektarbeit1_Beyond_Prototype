// User.test.js

import { expect } from "chai";

import { User } from "../Data/Models/User.mjs";

import { Role } from "../Data/Models/Role.mjs";

import { Module } from "../Data/Models/Module.mjs";

import { LastUsedItem } from "../Data/Models/LastUsedItem.mjs";

import { AccountType } from "../Data/Enums/AccountType.mjs";

import { UserState } from "../Data/Enums/UserState.mjs";

import { GrantType } from "../Data/Enums/GrantType.mjs";

/*eslint-env mocha*/

describe("User class", () => {
  it("should create an empty user", () => {
    const user = new User();

    expect(user.id).to.equal("");

    expect(user.creationDate).to.be.null;

    expect(user.lastModifiedDate).to.be.null;

    expect(user.lastLogin).to.be.null;

    expect(user.state).to.equal(UserState.ENABLE);

    expect(user.roles).to.deep.equal([]);

    expect(user.modules).to.deep.equal([]);

    expect(user.accountType).to.equal(AccountType.User);

    expect(user.allowedAliases).to.deep.equal([]);

    expect(user.lastName).to.equal("");

    expect(user.email).to.equal("");

    expect(user.firstName).to.equal("");

    expect(user.userId).to.equal("");

    expect(user.accountId).to.equal("");

    expect(user.invitationId).to.equal("");

    expect(user.organizationId).to.equal("");

    expect(user.organizationNumber).to.equal("");

    expect(user.organizationName).to.equal("");

    expect(user.organizationNumbers).to.deep.equal([]);

    expect(user.adminBusinessGroup).to.equal("");

    expect(user.searchModes).to.deep.equal({});

    expect(user.allowEmergencyAuthorization).to.be.false;

    expect(user.lastUsedItems).to.deep.equal([]);
  });

  it("should clone a user", () => {
    const originalUser = new User({
      id: "123",

      creationDate: new Date("2022-01-01"),

      lastModifiedDate: new Date("2022-02-01"),

      lastLogin: new Date("2022-03-01"),

      state: UserState.DISABLE,

      roles: [new Role("1", "Admin", "Group1", ["Product1"])],

      modules: [new Module("Module1", "Module Displayname")],

      accountType: AccountType.SuperUser,

      allowedAliases: ["alias1"],

      lastName: "Doe",

      email: "john.doe@example.com",

      firstName: "John",

      userId: "johndoe",

      accountId: "acc123",

      invitationId: "inv123",

      organizationId: "org123",

      organizationNumber: "orgnum123",

      organizationName: "Org Name",

      organizationNumbers: ["orgnum123"],

      adminBusinessGroup: "Admin Group",

      searchModes: { mode1: "value1" },

      allowEmergencyAuthorization: true,

      lastUsedItems: [
        new LastUsedItem("Type1", "TypeName1", "ObjectId1", "ObjectName1"),
      ],
    });

    const clonedUser = originalUser.clone();

    expect(clonedUser).to.deep.equal(originalUser);

    expect(clonedUser).to.not.equal(originalUser); 

    expect(clonedUser.roles[0]).to.deep.equal(originalUser.roles[0]);

    expect(clonedUser.roles[0]).to.not.equal(originalUser.roles[0]); 

    expect(clonedUser.modules[0]).to.deep.equal(originalUser.modules[0]);

    expect(clonedUser.modules[0]).to.not.equal(originalUser.modules[0]);

    expect(clonedUser.lastUsedItems[0]).to.deep.equal(
      originalUser.lastUsedItems[0]
    );

    expect(clonedUser.lastUsedItems[0]).to.not.equal(
      originalUser.lastUsedItems[0]
    );

    expect(clonedUser.firstName).to.equal("John");
  });


  it("should correctly set and get properties", () => {
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

    expect(user.roles[0].name).to.equal("User");
    expect(user.id).to.equal("123");
  });
});
