export class LastUsedItem {
  constructor({
    objectType = "",

    objectTypeName = "",

    objectId = "",

    objectName = "",
  } = {}) {
    this.objectType = objectType;

    this.objectTypeName = objectTypeName;

    this.objectId = objectId;

    this.objectName = objectName;
  }

  clone() {
    return new LastUsedItem(
      this.objectId,
      this.objectName,
      this.objectType,
      this.objectTypeName
    );
  }
}
