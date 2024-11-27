import { z } from "zod";

export const apartmentSchema = z.object({
  ApartmentName: z.string({
    required_error: "Tên căn hộ là bắt buộc.",
  }).nonempty("Tên căn hộ không được để trống."),
  Description: z.string({
    required_error: "Mô tả căn hộ là bắt buộc."
  }).nonempty("Mô tả căn hộ không được để trống."),
  Address: z.string({
    required_error: "Địa chỉ căn hộ là bắt buộc.",
  }).nonempty("Địa chỉ căn hộ không được để trống."),
  Area: z.string({
    required_error: "Diện tích căn hộ là bắt buộc.",
  }).nonempty("Diện tích căn hộ không được để trống."),
  District: z.string().optional().nullable(),
  Ward: z.string().optional().nullable(),
  NumberOfRooms: z.string({
    required_error: "Số phòng là bắt buộc.",
  }).nonempty("Số phòng không được để trống."),
  NumberOfBathrooms: z.string({
    required_error: "Số phòng tắm là bắt buộc.",
  }).nonempty("Số phòng tắm không được để trống."),
  Location: z.string().optional().nullable(),
  Direction: z
    .number()
    .min(1, "Chọn hướng hợp lệ.")
    .max(8, "Chọn hướng hợp lệ."),
  Price: z.string({
    required_error: "Giá căn hộ là bắt buộc.",
  }).nonempty("Giá căn hộ không được để trống."),
  EffectiveDate: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) => !val || !isNaN(Date.parse(val)),
      "Ngày hiệu lực phải đúng định dạng ngày-tháng-năm."
    ),
  ExpiryDate: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) => !val || !isNaN(Date.parse(val)),
      "Ngày hết hạn phải đúng định dạng ngày-tháng-năm."
    ),
  ApartmentType: z.number()
  .min(1, "Chọn hướng hợp lệ.")
  .max(6, "Chọn hướng hợp lệ."),
  BalconyDirection: z.number()
    .min(1, "Chọn hướng hợp lệ.")
    .max(8, "Chọn hướng hợp lệ."),
  Building: z.string({
    required_error: "Mã tòa nhà là bắt buộc.",
  }).nonempty("Mã tòa nhà không được để trống."),
  Floor: z.string({
    required_error: "Tầng là bắt buộc.",
  }).nonempty("Tầng không được để trống."),
  RoomNumber: z.string({
    required_error: "Số phòng là bắt buộc.",
  }).nonempty("Số phòng không được để trống."),
  ProjectApartmentID: z
    .string({
      required_error: "Mã dự án dự án là bắt buộc.",
    })
    .refine(
      (val) =>
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          val
        ),
      {
        message: "Mã dự án phải là UUID hợp lệ.",
      }
    ),
  Images: z
    .any()
    .refine(
      (files) => Array.isArray(files) && files.length > 0,
      "Danh sách hình ảnh không được để trống."
    ),
  VRVideoFile: z
    .any()
    .optional()
    .nullable(),
  AssignedAccountID: z
    .string({
      required_error: "Mã người quản lý là bắt buộc.",
    })
    .refine(
      (val) =>
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          val
        ),
      {
        message: "Mã người quản lý là UUID hợp lệ.",
      }
    ),
    Quantity: z.number(),

});