export class EntitlementProductFeature {
  constructor(count = 0, feature = null, licenseModel = null, state = null) {
    this.count = count;

    this.feature = feature;

    this.licenseModel = licenseModel;

    this.state = state;
  }

  get Count() {
    return this.count;
  }

  set Count(value) {
    this.count = value;
  }

  get Feature() {
    return this.feature;
  }

  set Feature(value) {
    this.feature = value;
  }

  get LicenseModel() {
    return this.licenseModel;
  }

  set LicenseModel(value) {
    this.licenseModel = value;
  }

  get State() {
    return this.state;
  }

  set State(value) {
    this.state = value;
  }
}
