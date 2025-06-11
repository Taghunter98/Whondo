// eslint.config.cjs (at root)
const globals = require("globals");
const { defineConfig } = require("eslint/config");
const alignAssignments = require("eslint-plugin-align-assignments");

module.exports = defineConfig([
    {
        // Update the glob to target files inside app/static/jay-comps
        files: ["app/static/jay-comps/**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            globals: globals.browser,
            ecmaVersion: "latest",
            sourceType: "module"
        },
        plugins: {
            "align-assignments": alignAssignments
        },
        rules: {
            "align-assignments/align-assignments": "error",
            "indent": ["error", 4],
            "semi": ["error", "always"],
            "padded-blocks": ["error", "always"],
            "no-inline-comments": ["error", { "ignorePattern": "(html|css|style)" }],
            "camelcase": "error"
        }
    },
]);
