export const configurationVal = {
  getValue: (key, defaultValue) => {
    const configValues = {
      LocationPrefix: "DE-",
    };

    return configValues[key] || defaultValue;
  },
};
