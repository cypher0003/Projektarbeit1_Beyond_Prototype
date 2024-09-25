import { BaseModel } from "./BaseModel.mjs";

export class Module extends BaseModel {
  constructor({ name = "h", displayname = "" } = {}) {
    super();

    this.name = name;

    this.displayname = displayname;
  }

  clone() {
    return new Module(this);
  }
}
