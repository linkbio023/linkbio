"use server";
import { revalidatePath } from "next/cache";

export default async function revalidateCache(path) {
  if (path) {
    revalidatePath(path);
  }
}
