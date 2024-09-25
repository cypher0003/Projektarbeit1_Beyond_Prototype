// NamedUser.js

export class NamedUser {
  constructor(name = "", lastModifiedDate = null) {
    this.name = name;

    this.lastModifiedDate = lastModifiedDate;
  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
}




