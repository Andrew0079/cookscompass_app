module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-optional-chaining",
      [
        "module-resolver",
        {
          root: ["."], // Add the root directory of your project
          alias: {
            "@src": "./src",
            "@components": "./src/components",
            "@api": "./src/api",
            "@utils": "./src/utils",
            // Add more aliases as needed
          },
        },
      ],
    ],
  };
};
