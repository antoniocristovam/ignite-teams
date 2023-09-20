module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@theme": "./src/theme",
            "@utils": "./src/utils",
            "@assets": "./src/assets",
            "@router": "./src/router",
            "@screens": "./src/screens",
            "@storage": "./src/storage",
            "@components": "./src/components",
          },
        },
      ],
    ],
  };
};
