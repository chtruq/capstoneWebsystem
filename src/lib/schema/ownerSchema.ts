import { z } from "zod";

export const OwnerSchema = z.object({
  Name: z.string({
    required_error: "Tên là bắt buộc.",
  }).nonempty("Tên không được để trống."),
  Email: z.string({
    required_error: "Email là bắt buộc.",
  }).email("Email không hợp lệ."),
  PhoneNumber: z.string({
    required_error: "Số điện thoại là bắt buộc.",
  }).nonempty("Số điện thoại không được để trống."),
  NationalID: z.string({
    required_error: "CMND/CCCD là bắt buộc.",
  }).nonempty("CMND/CCCD không được để trống."),
  IssueDate: z.string({
    required_error: "Ngày cấp là bắt buộc.",
  }).refine(
    (val) => !isNaN(Date.parse(val)),
    "Ngày cấp phải là một ngày hợp lệ."
  ),
  BirthDate: z.string({
    required_error: "Ngày sinh là bắt buộc.",
  }).refine(
    (val) => !isNaN(Date.parse(val)),
    "Ngày sinh phải là một ngày hợp lệ."
  ),
  Nationality: z.string({
    required_error: "Quốc tịch là bắt buộc.",
  }).nonempty("Quốc tịch không được để trống."),
  Gender: z
    .number({
      required_error: "Giới tính là bắt buộc.",
    })
    .int("Giới tính phải là một số nguyên."),
  Address: z.string({
    required_error: "Địa chỉ là bắt buộc.",
  }).nonempty("Địa chỉ không được để trống."),
  AccountID: z.string({
    required_error: "Mã tài khoản là bắt buộc.",
  }).refine(
    (val) =>
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        val
      ),
    {
      message: "Mã tài khoản phải là UUID hợp lệ.",
    }
  ),
});
