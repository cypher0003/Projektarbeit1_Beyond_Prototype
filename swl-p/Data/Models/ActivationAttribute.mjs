export class ActivationAttribute {
  constructor(
    name = "",

    value = "",

    readOnly = false,

    mandatory = false,

    groupName = "",

    subGroupName = "",

    associatedAttribute = null
  ) {
    this.name = name;

    this.value = value;

    this.readOnly = readOnly;

    this.mandatory = mandatory;

    this.groupName = groupName;

    this.subGroupName = subGroupName;

    this.associatedAttribute = associatedAttribute;
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

  get GroupName() {
    return this.groupName;
  }

  set GroupName(value) {
    this.groupName = value;
  }

  get SubGroupName() {
    return this.subGroupName;
  }

  set SubGroupName(value) {
    this.subGroupName = value;
  }

  get AssociatedAttribute() {
    return this.associatedAttribute;
  }

  set AssociatedAttribute(value) {
    this.associatedAttribute = value;
  }
}
