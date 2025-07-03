"use client";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import { createContext, useContext } from "react";

const AuthUserContext = createContext({
  authUser: null,
  loading: true,
  loginErrorMessage: "",
  signupErrorMessage: "",
  resetPasswordErrorMessage: "",
  createUserWithEmailAndPasswordHandler: async () => {},
  signInWithEmailAndPasswordHandler: async () => {},
  sendPasswordResetEmailHandler: async () => {},
  signInWithGoogleHandler: async () => {},
  signOutHandler: async () => {},
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
}

export const useAuth = () => useContext(AuthUserContext);
