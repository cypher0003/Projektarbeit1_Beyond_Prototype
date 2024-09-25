import { ProtectedSessionStorage } from "../src/ComponentsLibrary/Helper/PortectedStorageHelper.mjs";
import { ProtectedSessionStorageRepositoryHelper } from "../src/ComponentsLibrary/Helper/PortectedStorageHelper.mjs";
import { expect } from "chai";

/*eslint-env mocha*/

describe("ProtectedSessionStorageRepositoryHelper", function () {
  beforeEach(function () {
    localStorage.clear();
  });

  it("should store and retrieve email address correctly", async function () {
    const storage = new ProtectedSessionStorage();

    const helper = new ProtectedSessionStorageRepositoryHelper(storage);

    const email = "testmail@gmail.com";
    await helper.loginWithEmailAddress(email);

    await helper.loadEmailAddress();

    expect(helper.emailAddress).to.equal(email);
  });

  it("should delete service login flag after login with email", async function () {
    const storage = new ProtectedSessionStorage();
    await storage.setAsync("isserviceloggedinflag", true);
    const helper = new ProtectedSessionStorageRepositoryHelper(storage);
    const email = "testmail@gmail.com";
    await helper.loginWithEmailAddress(email);

    const serviceLoginResult = await storage.getAsync("isserviceloggedinflag");
    expect(serviceLoginResult.success).to.equal(false);
  });
});
