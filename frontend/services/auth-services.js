"use client";
import { firebaseAuth } from "@/lib/firebase";

export async function getAuthToken(forceRefresh = false) {
  const user = firebaseAuth?.currentUser;
  if (user) {
    return await user.getIdToken(forceRefresh);
  } else {
    // Wait for the user to be authenticated
    return new Promise((resolve, reject) => {
      // Listen for changes in the user's authentication state
      const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
        if (user) {
          // User is authenticated
          unsubscribe();
          resolve(await user.getIdToken(forceRefresh));
        } else {
          // User is not authenticated
          reject(new Error("User is not authenticated"));
        }
      });
    });
  }
}
