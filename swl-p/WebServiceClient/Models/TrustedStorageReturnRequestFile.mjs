import { DownloadFile } from "./DownloadFile.mjs";
import { RequestFile } from "./RequestFile.mjs";

import { ValidationResponse } from "./ValidationResponse.mjs";
import { RequestFileType } from "../Enums/RequestFileType.mjs";

export class TrustedStorageReturnRequestFile extends RequestFile {
  constructor(fileContent, activationClient) {
    super(
      fileContent,
      RequestFileType.TrustedStorageReturn,
      activationClient,
      null
    );
  }

  validate() {
    return Promise.resolve(new ValidationResponse());
  }

  async process() {
    const legacyReturnRequest = {
      request: this.fileContent,
    };

    const returnResponse = await this._activationClient.return(
      legacyReturnRequest
    );

    return [new DownloadFile(returnResponse)];
  }
}
