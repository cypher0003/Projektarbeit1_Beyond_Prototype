import { RequestFileType } from "../Enums/RequestFileType.mjs";
import { RequestFile } from "./RequestFile.mjs";
import { ValidationResponse } from "./ValidationResponse.mjs";
import { DownloadFile } from "./DownloadFile.mjs";

export class TrustedStorageRepairRequestFile extends RequestFile {
  constructor(fileContent, activationClient) {
    super(
      fileContent,
      RequestFileType.TrustedStorageRepair,
      activationClient,
      null
    );
  }

  async validate() {
    return new ValidationResponse();
  }

  async process() {
    const repairResponse = await this.activationClient.repair({
      request: this.fileContent,
    });

    return [new DownloadFile(repairResponse)];
  }
}
