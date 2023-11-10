module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows modern ECMAScript features
    sourceType: "module", // Allows using import/export statements
  },
  rules: {
    // Place any TypeScript-specific rules here
    "@typescript-eslint/ban-ts-comment": "off",
  },
};
