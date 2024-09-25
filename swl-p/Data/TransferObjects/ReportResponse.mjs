import { ReportFormatType } from "../Enums/ReportFormatType.mjs";

export class ReportResponse {
  constructor() {
    this.reportFormatType = ReportFormatType.Html;

    this.report = "";

    this.entitlementId = "";

    this.productKeyIds = [];
  }
}
