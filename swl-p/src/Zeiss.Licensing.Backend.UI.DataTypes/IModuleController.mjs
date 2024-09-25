import { Module } from "../../Data/Models/Module.mjs";

export class IModuleController {


  getModule(user) {
    return new Module();
  }
}
