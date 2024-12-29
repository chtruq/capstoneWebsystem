import { z } from "zod";

export const consignmentSchema = z.object({
  VerificationName: z
    .string({
      required_error: "Tên xác minh là bắt buộc.",
    })
    .nonempty("Tên xác minh không được để trống."),

  LegalDocumentFiles: z
    .any()
    .refine(
      (files) => Array.isArray(files) && files.length > 0,
      "Danh sách tài liệu pháp lý không được để trống."
    ),

  Comments: z.string().optional().nullable(),

  ApartmentOwnerApartmentID: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          val
        ),
      {
        message: "ID căn hộ của chủ sở hữu phải là UUID hợp lệ.",
      }
    ),

  ApartmentOwnerID: z
    .string({
      required_error: "ID chủ sở hữu căn hộ là bắt buộc.",
    })
    .refine(
      (val) =>
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          val
        ),
      {
        message: "ID chủ sở hữu căn hộ phải là UUID hợp lệ.",
      }
    ),

  AssignedAccountID: z
    .string({
      required_error: "ID tài khoản được gán là bắt buộc.",
    })
    .refine(
      (val) =>
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          val
        ),
      {
        message: "ID tài khoản được gán phải là UUID hợp lệ.",
      }
    ),

  PropertyValue: z
    .string({
      required_error: "Giá trị tài sản là bắt buộc.",
    })
    .min(0, "Giá trị tài sản phải lớn hơn hoặc bằng 0."),

  DepositValue: z
    .string({
      required_error: "Giá trị đặt cọc là bắt buộc.",
    })
    .min(0, "Giá trị đặt cọc phải lớn hơn hoặc bằng 0."),

  BrokerageFee: z
    .string({
      required_error: "Phí môi giới là bắt buộc.",
    })
    .min(0, "Phí môi giới phải lớn hơn hoặc bằng 0."),

  CommissionRate: z
    .string({
      required_error: "Tỷ lệ hoa hồng là bắt buộc.",
    })
    .min(0, "Tỷ lệ hoa hồng phải lớn hơn hoặc bằng 0."),

  EffectiveDate: z
    .string({
      required_error: "Ngày bắt đầu hiệu lực là bắt buộc.",
    })
    .refine((val) => !isNaN(Date.parse(val)), "Ngày bắt đầu hiệu lực phải đúng định dạng ngày-tháng-năm."),

  ExpiryDate: z
    .string({
      required_error: "Ngày hết hạn là bắt buộc.",
    })
    .refine((val) => !isNaN(Date.parse(val)), "Ngày hết hạn phải đúng định dạng ngày-tháng-năm."),
});
