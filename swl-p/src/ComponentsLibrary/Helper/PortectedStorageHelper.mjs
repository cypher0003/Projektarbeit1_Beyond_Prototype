export class ProtectedSessionStorageRepositoryHelper {
  constructor(protectedSessionStorage) {
    this.EMAILADDRESS = "emailaddress";

    this.ISLOGGEDINFLAG = "isloggedinflag";

    this.ISSERVICELOGGEDINFLAG = "isserviceloggedinflag";

    this.emailAddress = "";

    this.isLoggedIn = false;

    this.isLoadedFromStorage = false;

    this.protectedSessionStore = protectedSessionStorage;
  }

  async isEmergencyLoggedIn() {
    try {
      const result = await this.protectedSessionStore.getAsync(
        this.ISLOGGEDINFLAG
      );

      if (result.success) {
        this.isLoggedIn = result.value;
      } else {
        this.isLoggedIn = false;
      }
    } catch (error) {
      this.isLoggedIn = false;
    }

    return this.isLoggedIn;
  }

  async isServiceLoggedIn() {
    try {
      const result = await this.protectedSessionStore.getAsync(
        this.ISSERVICELOGGEDINFLAG
      );

      return result.success;
    } catch (error) {
      return false;
    }
  }

  async loadEmailAddress() {
    if (!this.isLoadedFromStorage) {
      const result = await this.protectedSessionStore.getAsync(
        this.EMAILADDRESS
      );

      if (result.success) {
        this.isLoadedFromStorage = true;

        this.emailAddress = result.value ? result.value : "";
      } else {
        this.emailAddress = "";
      }
    }
  }

  async loginWithEmailAddress(emailAddress) {
    this.emailAddress = emailAddress;

    await this.protectedSessionStore.setAsync(
      this.EMAILADDRESS,
      this.emailAddress
    );

    await this.protectedSessionStore.setAsync(this.ISLOGGEDINFLAG, true);

    await this.protectedSessionStore.deleteAsync(this.ISSERVICELOGGEDINFLAG);

    this.isLoggedIn = true;
  }

  async serviceLogin(emailAddress) {
    this.emailAddress = emailAddress;

    await this.protectedSessionStore.setAsync(
      this.EMAILADDRESS,
      this.emailAddress
    );

    await this.protectedSessionStore.setAsync(this.ISSERVICELOGGEDINFLAG, true);
  }

  async deleteEmailAddress() {
    this.isLoadedFromStorage = false;

    this.emailAddress = "";

    await this.protectedSessionStore.deleteAsync(this.EMAILADDRESS);

    await this.protectedSessionStore.deleteAsync(this.ISLOGGEDINFLAG);

    this.isLoggedIn = false;
  }
}

export class ProtectedSessionStorage {
  async getAsync(key) {
    const value = localStorage.getItem(key);

    if (value !== null) {
      return { success: true, value: JSON.parse(value) };
    } else {
      return { success: false, value: null };
    }
  }

  async setAsync(key, value) {
    localStorage.setItem(key, JSON.stringify(value));

    return { success: true };
  }

  async deleteAsync(key) {
    localStorage.removeItem(key);

    return { success: true };
  }
}
