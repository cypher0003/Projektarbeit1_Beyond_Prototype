import { RequestFile } from "./RequestFile.mjs";
import { ValidationResponse } from "./ValidationResponse.mjs";
import { RequestFileType } from "../Enums/RequestFileType.mjs";

export class RevocationProofFile extends RequestFile {
  constructor(fileContent, activationClient) {
    super(fileContent, RequestFileType.RevocationProof, activationClient, null);

    this._revocationProofItem = JSON.parse(fileContent);

    if (!this._revocationProofItem) {
      throw new Error(
        "File content cannot be deserialized to a revocation proof."
      );
    }
  }

  validate() {
    return Promise.resolve(new ValidationResponse());
  }

  async process() {
    const uploadedJson = JSON.parse(this.fileContent);

    const activationId = uploadedJson.item || "";

    await this._activationClient.submitRevocationProofs(
      activationId,
      this._revocationProofItem
    );

    return [];
  }
}
