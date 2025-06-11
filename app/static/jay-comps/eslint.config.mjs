// eslint.config.mjs
import globals from "globals";
import { defineConfig } from "eslint/config";
import alignAssignments from "eslint-plugin-align-assignments";

export default defineConfig([
    {
        // Apply these settings for all JS/TS files in your project (adjust the glob as needed)
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        languageOptions: {
            globals: globals.browser,
            ecmaVersion: "latest",
            sourceType: "module",
        },
        // Plugins must be declared as an object mapping plugin names to their implementation.
        plugins: {
            "align-assignments": alignAssignments,
        },
        rules: {
            "align-assignments/align-assignments": "error",
            "indent": ["error", 4],
            "semi": ["error", "always"],
        },
    },
]);
