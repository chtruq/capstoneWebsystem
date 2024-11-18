import { z } from "zod";

export const projectFinancialContractSchema = z.object({
  lowestPrice: z
    .string()
    .transform((val) => parseFloat(val) || 0)
    .refine((val) => val >= 0, {
      message: "Giá thấp nhất phải lớn hơn hoặc bằng 0",
    }),
  highestPrice: z
    .string()
    .transform((val) => parseFloat(val) || 0)
    .refine((val) => val >= 0, {
      message: "Giá cao nhất phải lớn hơn hoặc bằng 0",
    }),
  depositAmount: z
    .string()
    .transform((val) => parseFloat(val) || 0)
    .refine((val) => val >= 0, {
      message: "Số tiền đặt cọc phải lớn hơn hoặc bằng 0",
    }),
  brokerageFee: z
    .string()
    .transform((val) => parseFloat(val) || 0)
    .refine((val) => val >= 0, {
      message: "Phí môi giới phải lớn hơn hoặc bằng 0",
    }),
  commissionFee: z
    .string()
    .transform((val) => parseFloat(val) || 0)
    .refine((val) => val >= 0, {
      message: "Phí hoa hồng phải lớn hơn hoặc bằng 0",
    }),
  projectApartmentID: z
    .string()
    .uuid({ message: "ID căn hộ dự án phải là UUID hợp lệ" }),
});
