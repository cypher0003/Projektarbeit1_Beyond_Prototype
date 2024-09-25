import { expect } from "chai";

import { ModuleController } from "../src/Moduls/LicenseModul/Controller/ModulController.mjs";

import { User } from "../Data/Models/User.mjs";
import { Module } from "../Data/Models/Module.mjs";

import { Module_Sub } from "./../src/Zeiss.Licensing.Backend.UI.DataTypes/Module.mjs";

import { AccountType } from "../Data/Enums/AccountType.mjs";

import { SharedResource } from "../src/RessourceLibrary/SharedResource.mjs";

/*eslint-env mocha*/

describe("ModuleController", () => {
  let moduleController;

  before(() => {
    moduleController = new ModuleController();
  });

  it("should return a module for a SuperUser", () => {
    const user = new User({
      id: "123",

      firstName: "John",

      lastName: "Doe",

      accountType: AccountType.SuperUser,

      modules: [],
    });

    const module = moduleController.getModule(user);

    expect(module).to.be.an.instanceof(Module_Sub);

    expect(module.name).to.equal(SharedResource.LICENSES);
  });

  it('should return null for a regular user without "Licenses" module', () => {
    const moduleData = new Module({ name: null });
    const user = new User({
      id: "125",

      firstName: "Alice",

      lastName: "Johnson",

      accountType: AccountType.User,

      modules: [moduleData],
    });

    const module1 = moduleController.getModule(user);

    expect(module1).to.be.null;
  });

  it('should return a module if user has "Licenses" module', () => {
    const moduleData = new Module({ name: "licenses" });
    const user = new User({
      id: "125",

      firstName: "Alice",

      lastName: "Johnson",

      accountType: AccountType.User,

      modules: [moduleData],
    });

    const module = moduleController.getModule(user);
    expect(module).to.be.an.instanceOf(Module_Sub);
  });
});
