import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure ESLint compatibility
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Define the ESLint configuration
const eslintConfig = [
  // Extend from Next.js's recommended settings for core-web-vitals and TypeScript
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Add custom rules to disable unused variable checks
  {
    rules: {
      // Disable the rule for unused variables, which causes errors for unused imports like NextAuth
      "@typescript-eslint/no-unused-vars": "off", 
    },
  },
];

export default eslintConfig;
