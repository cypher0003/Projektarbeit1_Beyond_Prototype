export class InstallbaseRequest {
  constructor(startDate = null, endDate = null, businessUnit = "") {
    this.startDate = startDate;

    this.endDate = endDate;

    this.businessUnit = businessUnit;
  }
}
