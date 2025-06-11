# Whondo

Work in progress...

---

## Jay Framework Linting Setup

This project uses ESLint for maintaining code quality and consistency. At the root of the Whondo project you’ll find two key files:

- **`eslint.config.cjs`** – Jay ESLint configuration file.
- **`package.json`**  Dependencies (including ESLint and plugins) and scripts.

### Setup Instructions

1. **Install Dependencies**  
   Run this in the root directory:
   ```bash
   npm install
   ```

2. **Install the ESLint Extension in VSCode**  
   Make sure you have the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) installed. 

3. **Configure VSCode Settings**  
   _Note: Some users have reported that native format-on-save can conflict with ESLint auto‑fix actions. In our setup, we disable VSCode's built-in format on save to let ESLint code actions take precedence._  
   
   Create or update your `.vscode/settings.json` file with the following:
   ```json
   {
     "editor.formatOnSave": false,
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": "explicit"
     },
     "eslint.validate": [
         "javascript",
         "javascriptreact",
         "typescript",
         "typescriptreact"
     ]
   }
   ```
   _Note: There is an included workspace setting file in .vscode/settings.json._

4. **Using the Formatter Script (Optional)**  
   To format files manually with the CLI run:
   ```bash
   npm run format
   ```
   This script runs ESLint with the `--fix` flag across all files in  `app/static/jay-comps`.

### Known Issues & Recommendations

- **Format-on-Save Conflicts:**  
Testing indicated that enabling `editor.formatOnSave` can sometimes lead to ESLint fixes being reverted or conflicting with other formatting actions. Recommend keeping this setting disabled (`false`) and relying on the ESLint auto‑fix via `codeActionsOnSave`.

- **Node Environment:**  
  Make sure you’re running the Node environment in dev mode so that devDependencies, including ESLint and its plugins, are correctly installed and recognized.

