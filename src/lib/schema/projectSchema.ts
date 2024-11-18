import { z } from "zod";

export const projectSchema = z.object({
  ProjectApartmentName: z
    .string({
      required_error: "Tên dự án là bắt buộc.",
    })
    .nonempty("Tên dự án không được để trống."),
  ProjectApartmentDescription: z
    .string({
      required_error: "Mô tả dự án là bắt buộc.",
    })
    .nonempty("Mô tả dự án không được để trống."),
  Price_range: z
    .string({
      required_error: "Khoảng giá là bắt buộc.",
    })
    .nonempty("Khoảng giá không được để trống."),
  ApartmentArea: z.string().optional().nullable(),
  ProjectSize: z.string().optional().nullable(),
  ProjectArea: z.string().optional().nullable(),
  ConstructionStartYear: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) => !val || !isNaN(Date.parse(val)),
      "Năm khởi công phải đúng định dạng ngày-tháng-năm."
    ),
  ConstructionEndYear: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) => !val || !isNaN(Date.parse(val)),
      "Năm bàn giao phải đúng định dạng ngày-tháng-năm."
    ),
  Address: z.string().optional().nullable(),
  AddressUrl: z.string().optional().nullable(),
  TotalApartment: z.string().optional().nullable(),
  ApartmentProjectProviderID: z
    .string({
      required_error: "Mã nhà cung cấp dự án là bắt buộc.",
    })
    .refine(
      (val) =>
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          val
        ),
      {
        message: "Mã nhà cung cấp phải là UUID hợp lệ.",
      }
    ),
  FacilityIDs: z
    .array(z.string())
    .nonempty("Danh sách tiện ích không được để trống."),
  ProjectType: z
    .number()
    .min(1, "Chọn trạng thái hợp lệ.")
    .max(2, "Chọn trạng thái hợp lệ."),
  TeamID: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          val
        ),
      {
        message: "Mã nhóm phải là UUID hợp lệ.",
      }
    ),
  Images: z
    .any()
    .refine(
      (files) => Array.isArray(files) && files.length > 0,
      "Danh sách hình ảnh không được để trống."
    ),
});
