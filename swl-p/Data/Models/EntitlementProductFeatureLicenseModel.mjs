export class EntitlementProductFeatureLicenseModel {
  constructor(
    licenseModel = null,
    startDate = null,
    durationInDays = null,
    endDate = null,
    seatCount = null
  ) {
    this.licenseModel = licenseModel;

    this.startDate = startDate;

    this.durationInDays = durationInDays;

    this.endDate = endDate;

    this.seatCount = seatCount;
  }

  get LicenseModel() {
    return this.licenseModel;
  }

  set LicenseModel(value) {
    this.licenseModel = value;
  }

  get StartDate() {
    return this.startDate;
  }

  set StartDate(value) {
    this.startDate = value;
  }

  get DurationInDays() {
    return this.durationInDays;
  }

  set DurationInDays(value) {
    this.durationInDays = value;
  }

  get EndDate() {
    return this.endDate;
  }

  set EndDate(value) {
    this.endDate = value;
  }

  get SeatCount() {
    return this.seatCount;
  }

  set SeatCount(value) {
    this.seatCount = value;
  }
}
