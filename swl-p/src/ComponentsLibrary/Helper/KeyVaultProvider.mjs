import { SecretClient } from "@azure/keyvault-secrets";
import { KeyClient } from "@azure/keyvault-keys";
import { CryptographyClient } from "@azure/keyvault-keys";
import { DefaultAzureCredential } from "@azure/identity";

class KeyVaultProvider {
  constructor(configuration, logger) {
    this.configuration = configuration;
    this.logger = logger;

    this.baseUrl = configuration.get("AzureKeyVault:BaseUrl");

    this.secretClient = new SecretClient(
      this.baseUrl,
      new DefaultAzureCredential()
    );
    this.keyClient = new KeyClient(this.baseUrl, new DefaultAzureCredential());

    this.cache = new Map();
    this.cacheExpirationTime = 5 * 60 * 1000;
  }

  async getKeyVaultSecret(secretIdentifier) {
    try {
      if (this.cache.has(secretIdentifier)) {
        const cached = (this.cache = this.cache.get(secretIdentifier));
        if (Date.now() - cached.timestamp < this.cacheExpirationTime) {
          return cached.value;
        }
      }
      const secret = await this.secretClient.getSecret(secretIdentifier);
      this.cache.set(secretIdentifier, {
        value: secret.value,
        timestamp: Date.now(),
      });
      return secret.value;
    } catch (ex) {
      this.logger.error("Error retrieving secret");
      throw new Error("Failed to retrieve secret");
    }
  }
  async sign(keyName, data) {
    try {
      const key = await this.keyClient.getKey(keyname);
      const cryptoClient = new CryptographyClient(
        key.id,
        new DefaultAzureCredential()
      );
      const signResult = await cryptoClient.sign("RS256", data);
      return signResult.signature;
    } catch (ex) {
      this.logger.error("Error signing data");
      throw new Error("Failed to sign data with key");
    }
  }

  async verify(keyname, data, signature) {
    try {
      const key = await this.keyClient.getKey(keyname);
      const cryptoClient = new CryptographyClient(
        key.id,
        new DefaultAzureCredential()
      );
      const verifyResult = await cryptoClient.verify("RS256", data, signature);
      return verifyResult.isValid;
    } catch (ex) {
      this.logger.error("Error verifying data");
      throw new Error("Failed to verify data with key");
    }
  }
}
