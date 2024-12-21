import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

// Kiểm tra nếu đang ở môi trường deploy
const isDeploy = process.env.NODE_ENV === "production";

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      // Các quy tắc chỉ được áp dụng nếu không phải deploy
      ...(isDeploy
        ? {
            "no-unused-vars": "off", // Bỏ qua biến không sử dụng
            "@typescript-eslint/no-unused-vars": "off", // Bỏ qua biến không sử dụng cho TypeScript
            "@typescript-eslint/no-explicit-any": "off", // Bỏ qua lỗi any
            "no-console": "off", // Bỏ qua console logs
          }
        : {}),
    },
  }),
];

export default eslintConfig;
