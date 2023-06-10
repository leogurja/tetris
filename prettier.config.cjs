const tailwindcss = require("prettier-plugin-tailwindcss");
const organizeImports = require("prettier-plugin-organize-imports");
const packagejson = require("prettier-plugin-packagejson");

module.exports = {
  plugins: [tailwindcss, organizeImports, packagejson],
};
