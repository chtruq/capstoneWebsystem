"use server";

import { revalidatePath } from "next/cache";

export const revalidateProjectPath = async (path: string) => {
  try {
    await revalidatePath(path);
    console.log(`Revalidated path: ${path}`);
  } catch (error) {
    console.error("Error revalidating path:", error);
  }
};
