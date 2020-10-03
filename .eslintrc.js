module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'standard',
    'plugin:vue/recommended',
  ],  
  // extends: ["plugin:vue/essential"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "off" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "comma-dangle": [2, "always-multiline"],
    "comma-spacing": 2,
    "comma-style": 2,
    "object-curly-spacing": ["off", "off"],
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
