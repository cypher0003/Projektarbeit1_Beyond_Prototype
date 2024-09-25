import { NamedUsersConcurrencyCriteria } from "../Enums/NamedUserConcurrencyCriteria.mjs";

export class NamedUsersProperties {
  constructor() {
    this.concurrencyCriteria = NamedUsersConcurrencyCriteria.PerLogin;

    this.concurrencyLimit = 0;

    this.useNamedUsers = false;

    this.limitNamedUsersAssignment = false;
  }

  get numberOfNamedUsers() {
    let ret = 100;

    if (this.limitNamedUsersAssignment) {
      ret = this.concurrencyLimit;
    }

    return ret;
  }
}
