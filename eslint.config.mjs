import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

// Kiểm tra nếu đang ở môi trường deploy

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      "react-hooks/exhaustive-deps": "off", // Tắt cảnh báo thiếu dependency trong hooks
      "@typescript-eslint/no-unused-vars": "off", // Tắt cảnh báo biến không sử dụng
      "@typescript-eslint/no-explicit-any": "off", // Tắt cảnh báo sử dụng `any`
    },
  }),
];

export default eslintConfig;
