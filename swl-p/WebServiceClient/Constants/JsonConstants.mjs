export const JsonConstants = {
  jsonSerializerOptions: {
    replacer: (key, value) => {
      if (value === undefined) {
        return null;
      }

      return value;
    },

    space: 2,
  },
};
