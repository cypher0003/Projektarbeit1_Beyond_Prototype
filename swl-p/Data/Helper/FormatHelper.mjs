export class FormatHelper {
  static getFormattedMaterialnumber(materialNumber) {
    if (materialNumber != null) {
      if (materialNumber.length < 13) {
        materialNumber = materialNumber.padStart(13, "0");
      }

      materialNumber = materialNumber.slice(materialNumber.length - 13);

      return `${materialNumber.slice(0, 6)}-${materialNumber.slice(
        6,
        10
      )}-${materialNumber.slice(10, 13)}`;
    }

    return "";
  }

  static getUnFormattedMaterialnumber(materialNumber) {
    if (materialNumber != null) {
      materialNumber = materialNumber.replace(/-/g, "");

      if (materialNumber.length < 18) {
        materialNumber = materialNumber.padStart(18, "0");
      }

      return materialNumber;
    }

    return "";
  }
}
