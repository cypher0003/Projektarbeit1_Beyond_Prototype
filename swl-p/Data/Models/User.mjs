import { BaseModel } from "../../Data/Models/BaseModel.mjs";

import { AccountType } from "../../Data/Enums/AccountType.mjs";

import { UserState } from "../Enums/UserState.mjs";

import { Role } from "./Role.mjs";

import { Module } from "./Module.mjs";

import { LastUsedItem } from "./LastUsedItem.mjs";

export class User extends BaseModel {
  constructor(user = {}) {
    super(user.id || "");

    this.creationDate = user.creationDate ? new Date(user.creationDate) : null;

    this.lastModifiedDate = user.lastModifiedDate
      ? new Date(user.lastModifiedDate)
      : null;

    this.lastLogin = user.lastLogin ? new Date(user.lastLogin) : null;

    this.state = user.state || UserState.ENABLE;

    this.roles = (user.roles || []).map((item) => new Role(item));

    this.modules = (user.modules || []).map((item) => new Module(item));

    this.accountType = user.accountType || AccountType.User;

    this.allowedAliases = user.allowedAliases ? [...user.allowedAliases] : [];

    this.lastName = user.lastName || "";

    this.email = user.email || "";

    this.firstName = user.firstName || "";

    this.userId = user.userId || "";

    this.accountId = user.accountId || "";

    this.invitationId = user.invitationId || "";

    this.organizationId = user.organizationId || "";

    this.organizationNumber = user.organizationNumber || "";

    this.organizationName = user.organizationName || "";

    this.organizationNumbers = user.organizationNumbers
      ? [...user.organizationNumbers]
      : [];

    this.adminBusinessGroup = user.adminBusinessGroup || "";

    this.searchModes = user.searchModes ? { ...user.searchModes } : {};

    this.allowEmergencyAuthorization =
      user.allowEmergencyAuthorization || false;

    this.lastUsedItems = (user.lastUsedItems || []).map(
      (item) => new LastUsedItem(item)
    );
  }

  get name() {
    return `${this.firstName} ${this.lastName}`;
  }

  clone() {
    return new User(this);
  }
}
