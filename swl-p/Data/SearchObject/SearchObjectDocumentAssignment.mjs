import { SearchObjectBase } from "./SearchObjectBase.mjs";

export class SearchObjectDocumentAssignment extends SearchObjectBase {
  constructor() {
    super();

    this.businessGroup = "";

    this.productFamily = "";

    this.productId = "";

    this.productVariantId = "";

    this.validFrom = null;

    this.validTo = null;

    this.state = null;

    this.globalId = "";
  }
}
