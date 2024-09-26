import { configuration } from "./Config/configuration.mjs";

export class KeyVaultProvider {
  constructor(configuration) {
    this.configuration = configuration;
  }

  async getKeyVaulSecret(secretName) {
    if (secretName === "SWLTestSecret") {
      return "testVal";
    }
    return null;
  }
}
