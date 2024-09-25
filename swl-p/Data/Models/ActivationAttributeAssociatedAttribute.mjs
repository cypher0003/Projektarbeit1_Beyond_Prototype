export class ActivationAttributeAssociatedAttribute {
  constructor(name = "", value = "", readOnly = false, mandatory = false) {
    this.name = name;

    this.value = value;

    this.readOnly = readOnly;

    this.mandatory = mandatory;
  }

  get Name() {
    return this.name;
  }

  set Name(value) {
    this.name = value;
  }

  get Value() {
    return this.value;
  }

  set Value(value) {
    this.value = value;
  }

  get ReadOnly() {
    return this.readOnly;
  }

  set ReadOnly(value) {
    this.readOnly = value;
  }

  get Mandatory() {
    return this.mandatory;
  }

  set Mandatory(value) {
    this.mandatory = value;
  }
}
