import { z } from "zod";

export const accountSchema = z
  .object({
    id: z.string(),
    email: z
      .string()
      .email()
      .min(6, { message: "Email is too short" })
      .max(255, { message: "Email is too long" }),
    name: z
      .string()
      .min(6, { message: "Name is too short" })
      .max(255, { message: "Name is too long" }),
    phoneNumber: z.string().min(10, { message: "Phone number is too short" }),
    accountStatus: z
      .string()
      .min(1, { message: "Account status is too short" })
      .max(1, { message: "Account status is too long" }),
    password: z.string().min(6, { message: "Password is too short" }),
    confirmPassword: z.string().min(6, { message: "Password is too short" }),
    avatar: z
      .instanceof(File)
      .optional()
      .refine((file) => file && file.size <= 5 * 1024 * 1024, {
        message: "Avatar file size should be less than 5MB",
      }),
    role: z.enum(["Admin", "Management", "Staff", "Project Provider"], {
      message: "Invalid role selected",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const accountUpdateSchema = z
  .object({
    Name: z.string().min(6, { message: "Name is too short" }).max(255, { message: "Name is too long" }),
    PhoneNumber: z.string().min(10, { message: "Phone number is too short" }),
    UnlockAccount: z.string(),
  })

export const updatePasswordSchema = z.object({
  accountId: z.string(),
  currentPassword: z
    .string({
      required_error: "Mật khẩu cũ là bắt buộc.",
    })
    .nonempty("Mật khẩu cũ không được để trống.")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
  newPassword: z
    .string({
      required_error: "Mật khẩu mới là bắt buộc.",
    })
    .nonempty("Mật khẩu mới không được để trống.")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
  confirmNewPassword: z
    .string({
      required_error: "Xác nhận mật khẩu là bắt buộc.",
    })
    .nonempty("Xác nhận mật khẩu không được để trống."),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "Mật khẩu xác nhận phải trùng với mật khẩu.",
  path: ["confirmNewPassword"],
});