import { z } from "zod";

export const CreateTeamSchema = z.object({
  teamName: z
    .string()
    .min(1, "Tên nhóm không được để trống")
    .max(100, "Tên nhóm không được dài hơn 100 ký tự"),
  managerAccountID: z.string().nonempty("Trưởng nhóm không được để trống"),
  teamType: z.number(),
  teamDescription: z
    .string()
    .max(500, "Mô tả không được dài hơn 500 ký tự")
    .optional(),
});
