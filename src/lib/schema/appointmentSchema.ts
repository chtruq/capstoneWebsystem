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
  startTime: z.object({
    ticks: z
      .string()
  }),
  assignedStaffAccountID: z
    .string()
    .uuid("ID tài khoản nhân viên không hợp lệ")
    .optional()
    .nullable(),
  customerID: z
    .string()
    .uuid("ID khách hàng không hợp lệ")
    .optional()
    .nullable(),
  apartmentID: z
    .string()
    .uuid("ID căn hộ không hợp lệ")
    .optional()
    .nullable(),
  referenceCode: z
    .string()
    .min(1, "Mã tham chiếu không được để trống")
    .max(50, "Mã tham chiếu không được dài hơn 50 ký tự")
    .optional()
    .nullable(),
});
