import { BaseModel } from "./BaseModel.mjs";

export class RefOrganization extends BaseModel {
  constructor(name = "", number = "") {
    super();
    this.name = name;

    this.number = number;
  }

  get Name() {
    return this.name;
  }

  set Name(value) {
    this.name = value;
  }

  get Number() {
    return this.number;
  }

  set Number(value) {
    this.number = value;
  }

  clone() {
    return new RefOrganization(this.name, this.number);
  }
}
