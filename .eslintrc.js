module.exports = {
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    // mostly here so IDEs won't complain about bundle.js and .eslintrc.js (ironic really)
    ignorePatterns: [".eslintrc.js", "bundle.js", "build"],
    root: true,
};