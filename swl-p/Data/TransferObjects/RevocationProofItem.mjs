import { RevocationProof } from "./RevocationProof.mjs";

class RevocationProofItem {
  constructor() {
    this.version = "";

    this.productKey = "";

    this.revocation = new RevocationProof();
  }
}

export { RevocationProofItem };
