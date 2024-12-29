module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      "plugin:vue/vue3-essential", // or "plugin:vue/vue3-recommended" based on your setup
      "eslint:recommended",
    ],
    rules: {
      "vue/multi-word-component-names": "off",
    },
  };
  