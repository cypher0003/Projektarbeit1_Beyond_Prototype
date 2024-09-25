export const ValidationStatus = {
  None: "None",

  Success: "Success",

  Error: "Error",
};

export function validateDeviceName(deviceName, deviceType) {
  if (!deviceName || !deviceType?.validation) {
    return ValidationStatus.None;
  }

  const regex = new RegExp(deviceType.validation);

  return regex.test(deviceName)
    ? ValidationStatus.Success
    : ValidationStatus.Error;
}

export function createValidationErrorText(selectedDeviceType) {
  if (selectedDeviceType?.validation?.trim()) {
    const validation = selectedDeviceType.validation;

    const start = validation.startsWith("^") ? 1 : 0;

    const length = validation.endsWith("$")
      ? validation.length - 1
      : validation.length;

    const validationArg = validation.substring(start, length);

    return `Invalid device name. It should match the pattern: ${validationArg}`;
  }

  return "";
}
