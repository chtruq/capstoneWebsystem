import { z } from "zod";

export const projectFileSchema = z.object({
  Description: z
    .string({
      required_error: "Mô tả là bắt buộc.",
    })
    .nonempty("Tên hợp đồng không được để trống."),
  ExpiryDate: z.string().optional(),
  ProjectApartmentID: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          val
        ),
      {
        message: "ID dự án phải là UUID hợp lệ.",
      }
    ),
  ProjectFileUrl: z
    .any()
    .refine(
      (file) => file,
      "Tài liệu không được để trống và phải là một file hợp lệ."
    ),
});


export const ProjectBulkFileSchema = z.object({

  file: z
    .any()
    .refine(
      (file) => file,
      "Tài liệu không được để trống và phải là một file hợp lệ."
    ),
  description: z
    .string({
      required_error: "Mô tả là bắt buộc.",
    })
    .nonempty("Tên hợp đồng không được để trống."),
  expiryDate: z.string().optional(),
  projectApartmentId: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          val
        ),
      {
        message: "ID dự án phải là UUID hợp lệ.",
      }
    ),

  images: z
    .any()
    .optional()
  // .refine(
  //   (files) => Array.isArray(files) && files.length > 0,
  //   "Danh sách hình ảnh không được để trống."
  // )
  ,
  vrFiles: z
    .any()
    .optional()
  // .refine(
  //   (files) => Array.isArray(files) && files.length > 0,
  //   "Danh sách hình ảnh VR không được để trống."
  // )
  ,

});