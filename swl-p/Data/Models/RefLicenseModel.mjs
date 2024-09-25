import { BaseModel } from "./BaseModel.mjs";

export class RefLicenseModel extends BaseModel {
  constructor(name = "") {
    super();
    this.name = name;
  }

  get Name() {
    return this.name;
  }
  set Name(value) {
    this.name = value;
  }
}
