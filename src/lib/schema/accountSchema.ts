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
    name: z.string().min(6, { message: "Name is too short" }).max(255, { message: "Name is too long" }),
    phoneNumber: z.string().min(10, { message: "Phone number is too short" }),
  })