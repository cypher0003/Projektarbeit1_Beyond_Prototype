import { Status } from "./Status.mjs";

export class InstallbaseResponse {
  constructor(status = new Status(), entitlements = []) {
    this.status = status;

    this.entitlements = entitlements;
  }
}
