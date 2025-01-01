"use server";

import { revalidatePath } from "next/cache";

export const revalidateProjectPath = (path: string) => {
  console.log("Hàm revalidatePath đã được gọi");
  revalidatePath(path);
  return true;
};
