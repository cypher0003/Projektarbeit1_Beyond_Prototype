import { BaseModel } from "./BaseModel.mjs";
import { FormatHelper } from "../Helper/FormatHelper.mjs";

class RefProductVariant extends BaseModel {
  constructor(name = "", version = "", materialNumber = "") {
    super();
    this._name = name;

    this._version = version;

    this._materialNumber = "";

    if (materialNumber) {
      this.materialNumber = materialNumber;
    }
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get version() {
    return this._version;
  }

  set version(value) {
    this._version = value;
  }

  get materialNumber() {
    return this._materialNumber;
  }

  set materialNumber(value) {
    if (value !== this._materialNumber) {
      const regex = /^[0-9]{18}$/;

      if (value && !regex.test(value)) {
        throw new RangeError(
          "MaterialNumber length must be 18 and must be numeric."
        );
      }

      this._materialNumber = value;
    }
  }

  get formattedMaterialNumber() {
    return FormatHelper.getFormattedMaterialnumber(this._materialNumber);
  }

  set formattedMaterialNumber(value) {
    if (value !== this.materialNumber) {
      this.materialNumber = FormatHelper.getUnFormattedMaterialnumber(value);
    }
  }

  clone() {
    return new RefProductVariant(this.name, this.version, this.materialNumber);
  }
}

export { RefProductVariant };
