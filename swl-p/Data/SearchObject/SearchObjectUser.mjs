import { SearchObjectBase } from "./SearchObjectBase.mjs";

export class SearchObjectUser extends SearchObjectBase {
  constructor() {
    super();

    this.firstName = "";

    this.lastName = "";

    this.email = "";

    this.organizationId = "";

    this.organizationNumber = "";

    this.organizationName = "";
  }
}
