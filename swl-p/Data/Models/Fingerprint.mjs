import { RefFingerprint } from "./RefFingerprint.mjs";

export class Fingerprint extends RefFingerprint {
  constructor() {
    super();

    this.fingerprintXml = "";

    this.creationDate = new Date();

    this.lastModifiedDate = new Date();
  }
}
