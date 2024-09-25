class IKeyVaultProvider {
  async getKeyVaultSecret(secretIdentifier) {
    throw new Error("Not Implemented");
  }

  async sign(keyname, data) {
    throw new Error("Not Implemented");
  }

  async verify(keyname, data, signature) {
    throw new Error("Not Implemented");
  }
}
