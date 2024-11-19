import { z } from "zod";

export const CreateTeamSchema = z.object({
  teamName: z
    .string()
    .min(1, "Tên nhóm không được để trống")
    .max(100, "Tên nhóm không được dài hơn 100 ký tự"),
  leader: z.string().nonempty("Trưởng nhóm không được để trống"),
  unit: z.string().nonempty("Đơn vị không được để trống"),
  description: z
    .string()
    .max(500, "Mô tả không được dài hơn 500 ký tự")
    .optional(),
});
