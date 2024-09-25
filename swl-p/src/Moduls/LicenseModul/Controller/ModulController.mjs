import { Module_Sub } from "../../../Zeiss.Licensing.Backend.UI.DataTypes/Module.mjs";

import { SharedResource } from "../../../RessourceLibrary/SharedResource.mjs";

import { AccountType } from "../../../../Data/Enums/AccountType.mjs";
import { IModuleController } from "../../../Zeiss.Licensing.Backend.UI.DataTypes/IModuleController.mjs";

export class ModuleController extends IModuleController {
  /** 

   * Get Module 

   * @param {User} user - User object 

   * @returns {Module|null} - Module object or null 

   */

  getModule(user) {
    let retValue = null;

    if (
      user.accountType === AccountType.SuperUser ||
      user.modules.some((c) => c.name === "licenses")
    ) {
      retValue = new Module_Sub(
        "Licenses",
        SharedResource.LICENSES,
        "zi-documents"
      );

      retValue.addSubmodule(
        SharedResource.LICENSEACTIVATION,

        "licenseActivation",

        "zi-play-button"
      );
    }

    return retValue;
  }
}
