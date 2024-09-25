export class BaseModel {
  constructor(id = "") {
    this.id = id;
  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
}
