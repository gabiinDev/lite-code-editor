module.exports = {
  printWidth: 100,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  tabWidth: 2,
  trailingComma: "none",
  useTabs: true,
  overrides: [
    {
      files: ["*.json", "*.md", "*.toml", "*.yml", "*.astro"],
      options: {
        useTabs: false,
        parser: "astro",
      },
    },
  ],
  endOfLine: "lf",
  plugins: ["prettier-plugin-astro"]
};
