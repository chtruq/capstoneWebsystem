import { z } from "zod";

export const ProviderSchema = z.object({
  Name: z
    .string({
      required_error: "Tên là bắt buộc.",
    })
    .nonempty("Tên không được để trống."),
  Email: z
    .string({
      required_error: "Email là bắt buộc.",
    })
    .email("Email phải là một địa chỉ email hợp lệ."),
  Password: z
    .string({
      required_error: "Mật khẩu là bắt buộc.",
    })
    .nonempty("Mật khẩu không được để trống.")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
  ConfirmPassword: z
    .string({
      required_error: "Xác nhận mật khẩu là bắt buộc.",
    })
    .nonempty("Xác nhận mật khẩu không được để trống."),
  ApartmentProjectProviderName: z
    .string({
      required_error: "Tên nhà cung cấp dự án căn hộ là bắt buộc.",
    })
    .nonempty("Tên nhà cung cấp dự án căn hộ không được để trống."),
  ApartmentProjectDescription: z
    .string({
      required_error: "Mô tả dự án căn hộ là bắt buộc.",
    })
    .nonempty("Mô tả dự án căn hộ không được để trống."),
  Location: z
    .string({
      required_error: "Vị trí là bắt buộc.",
    })
    .nonempty("Vị trí không được để trống."),
  DiagramUrl: z
    .string({
      required_error: "URL sơ đồ là bắt buộc.",
    })
    .nonempty("URL sơ đồ không được để trống."),
}).refine(data => data.Password === data.ConfirmPassword, {
  message: "Mật khẩu xác nhận phải trùng với mật khẩu.",
  path: ["ConfirmPassword"],
});