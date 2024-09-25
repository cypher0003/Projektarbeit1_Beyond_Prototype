import { BaseModel } from "./BaseModel.mjs";

export class RefProduct extends BaseModel {
  constructor(name = "", version = "") {
    super();
    this.name = name;

    this.version = version;
  }

  get Name() {
    return this.name;
  }

  set Name(value) {
    this.name = value;
  }

  get Version() {
    return this.version;
  }

  set Version(value) {
    this.version = value;
  }

  get NameVersion() {
    return `${this.name}:${this.version}`;
  }
}
