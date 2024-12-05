"use server";

import { revalidatePath } from "next/cache";

export const revalidateProjectPath = async (path: string) => {
  try {
    console.log("Hàm revalidatePath đã được gọi");
    await revalidatePath(path);
    console.log(`Revalidated path: ${path}`);
  } catch (error) {
    console.error("Error revalidating path:", error);
  }
};
