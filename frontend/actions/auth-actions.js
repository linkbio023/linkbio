"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { applicationUrls } from "@/constants/application-urls";
import { SESSION_COOKIE_NAME } from "@/constants/application-constants";

// Save the session in the cookie
export async function createSession(data) {
  (await cookies()).set(SESSION_COOKIE_NAME, data, {
    httpOnly: true,
    sameSite: "lax",
    expires: new Date(Date.now() + 2592000000), // 30 days = 1000 * 60 * 60 * 24 * 30 = 2592000000 ms
    secure: process.env.NODE_ENV == "production",
    path: "/",
  });

  return redirect(applicationUrls.dashboard.root);
}

// Delete the session from the cookie
export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE_NAME);
}

// Get the session from the cookie
export async function getSession() {
  return (await cookies()).get(SESSION_COOKIE_NAME);
}
