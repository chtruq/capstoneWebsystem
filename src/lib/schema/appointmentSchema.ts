import { z } from "zod";

export const AppointmentSchema = z.object({
  title: z
    .string()
    .min(1, "Tiêu đề không được để trống")
    .max(100, "Tiêu đề không được dài hơn 100 ký tự"),
  description: z
    .string()
    .min(1, "Mô tả không được để trống")
    .max(500, "Mô tả không được dài hơn 500 ký tự"),
  location: z
    .string()
    .min(1, "Vị trí không được để trống")
    .max(200, "Vị trí không được dài hơn 200 ký tự"),
  appointmentDate: z
    .string()
    .min(1, "Ngày hẹn không được để trống")
    .refine((val) => !isNaN(Date.parse(val)), "Ngày hẹn không hợp lệ"),
  startTime: z
    .string({
      required_error: "Thời gian là bắt buộc.",
    }),
  assignedStaffAccountID: z
    .string({
      required_error: "Mã nhân là bắt buộc.",
    })
    .refine(
      (val) =>
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          val
        ),
      {
        message: "Mã nhân viên phải là UUID hợp lệ.",
      }
    ),
  customerID: z
    .string({
      required_error: "Mã khách hàng là bắt buộc.",
    })
    .refine(
      (val) =>
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          val
        ),
      {
        message: "Mã khách hàng phải là UUID hợp lệ.",
      }
    ),
  apartmentID: z
    .string({
      required_error: "Mã căn hộ là bắt buộc.",
    })
    .refine(
      (val) =>
        val === "" || // Cho phép chuỗi rỗng
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          val
        ),
      {
        message: "Mã căn hộ phải là UUID hợp lệ hoặc để trống.",
      }
    )
    .optional()
    .nullable(),
  referenceCode: z
    .string()
    .min(1, "Mã tham chiếu không được để trống")
    .max(100, "Mã tham chiếu không được dài hơn 100 ký tự"),
});
