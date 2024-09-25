import { BaseClient } from "./BaseClient.mjs";
import { SearchHelper } from "../Helper/SearchHelper.mjs";
import { SearchObjectUser } from "../../Data/SearchObject/SearchObjectUser.mjs";
import { EHttpClientType } from "../Enums/EHttpClientType.mjs";

export class UserClient extends BaseClient {
  constructor(httpClientProvider, logger) {
    super(httpClientProvider, EHttpClientType.User, logger);

    this.loadMorePageIndex = 0;
  }

  get objectType() {
    return "users";
  }

  get version() {
    return "v1";
  }

  get objectTypeRoles() {
    return "/roles";
  }

  get objectTypeZeissID() {
    return "/zeissid";
  }

  async getUsers(searchObject = null) {
    if (!searchObject) {
      searchObject = new SearchObjectUser();
    }

    if (searchObject.restartLoadMore) {
      this.loadMorePageIndex = 0;
    }

    const pageSize =
      !searchObject.pageSize || searchObject.pageSize === 0
        ? 200
        : searchObject.pageSize;

    const pageIndex = searchObject.useLoadMore
      ? this.loadMorePageIndex
      : searchObject.pageStartIndex || 0;

    searchObject.pageSize = pageSize;

    searchObject.pageStartIndex = pageIndex;

    let users;

    do {
      const targetUrl = `${this.getTargetUrlWithVersion(
        "v2"
      )}/${SearchHelper.getSearchParametersForUser(searchObject)}`;

      users = await this.send("GET", targetUrl);

      if (searchObject.useLoadMore) {
        this.loadMorePageIndex++;
      }

      searchObject.pageStartIndex++;
    } while (
      users.list.length === 0 &&
      users.totalCount > (users.pageIndex - 1) * users.pageSize
    );

    return users;
  }

  async authenticate() {
    const targetUrl = `${this.getTargetUrl()}/authenticate`;

    this.logger?.log(`Call UserClient authenticate. Target url: ${targetUrl}`);

    return await this.send("GET", targetUrl);
  }

  async getById(id) {
    if (!id) {
      throw new Error("ID cannot be null or empty");
    }

    const targetUrl = `${this.getTargetUrl()}/${id}`;

    this.logger?.log(`Call UserClient get by id. Target url: ${targetUrl}`);

    return await this.send("GET", targetUrl);
  }

  async add(user) {
    const targetUrl = this.getTargetUrl();

    this.logger?.log(`Call UserClient add. Target url: ${targetUrl}`);

    return await this.sendWithContent("POST", targetUrl, user);
  }

  async update(user) {
    const targetUrl = this.getTargetUrl();

    this.logger?.log(`Call UserClient update. Target url: ${targetUrl}`);

    return await this.sendWithContent("PUT", targetUrl, user);
  }

  async updateSettings(user) {
    const targetUrl = `${this.getTargetUrl()}/settings`;

    this.logger?.log(
      `Call UserClient update settings. Target url: ${targetUrl}`
    );

    return await this.sendWithContent("PUT", targetUrl, user);
  }

  async addLastUsedItem(userId, lastUsedItem) {
    const targetUrl = `${this.getTargetUrl()}/${userId}/settings/lastUsedItems`;

    this.logger?.log(
      `Call UserClient addLastUsedItem. Target url: ${targetUrl}`
    );

    return await this.sendWithContent("POST", targetUrl, lastUsedItem);
  }

  async updateSearchModes(userId, searchMode) {
    const targetUrl = `${this.getTargetUrl()}/${userId}/settings/searchModes`;

    this.logger?.log(
      `Call UserClient updateSearchModes. Target url: ${targetUrl}`
    );

    return await this.sendWithContent("PUT", targetUrl, {
      searchPage: searchMode.searchPage,
      mode: searchMode.mode,
    });
  }

  async delete(user) {
    const targetUrl = this.getTargetUrl();

    this.logger?.log(`Call UserClient delete. Target url: ${targetUrl}`);

    await this.sendWithContent("DELETE", targetUrl, user);
  }

  async generateEmergencyAuthorizationPassword(email) {
    const targetUrl = `${this.getTargetUrl()}/${email}/emergencyAuthorization/password`;

    this.logger?.log(
      `Call UserClient generate emergency authorization password. Target url: ${targetUrl}`
    );

    await this.send("GET", targetUrl);
  }

  async getEmergencyAuthorizationExpirationDate(email) {
    const targetUrl = `${this.getTargetUrl()}/${email}/emergencyAuthorization/expirationDate`;

    this.logger?.log(
      `Call UserClient get emergency authorization expiration date. Target url: ${targetUrl}`
    );

    return await this.send("GET", targetUrl);
  }

  async getRoles() {
    const targetUrl = `${this.getTargetUrl()}${this.objectTypeRoles}`;

    this.logger?.log(`Call UserClient get roles. Target url: ${targetUrl}`);

    return await this.send("GET", targetUrl);
  }

  async addRole(role) {
    const targetUrl = `${this.getTargetUrl()}${this.objectTypeRoles}`;

    this.logger?.log(`Call UserClient add role. Target url: ${targetUrl}`);

    return await this.sendWithContent("POST", targetUrl, role);
  }

  async updateRole(role) {
    const targetUrl = `${this.getTargetUrl()}${this.objectTypeRoles}`;

    this.logger?.log(`Call UserClient update role. Target url: ${targetUrl}`);

    return await this.sendWithContent("PUT", targetUrl, role);
  }

  async deleteRole(role) {
    const targetUrl = `${this.getTargetUrl()}${this.objectTypeRoles}`;

    this.logger?.log(`Call UserClient delete role. Target url: ${targetUrl}`);

    await this.sendWithContent("DELETE", targetUrl, role);
  }
}
