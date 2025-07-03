import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { firebaseAuth } from "@/lib/firebase";
import {
  createSession,
  deleteSession,
  getSession,
} from "@/actions/auth-actions";
import { useCreateUser } from "@/services/user-services";
import { usePathname, useRouter } from "next/navigation";
import { applicationUrls } from "@/constants/application-urls";
import { appMode } from "@/constants/app-mode";
import { toast } from "sonner";

function firebaseAuthenticationErrorHandler(error, setErrorMessage) {
  console.error("Firebase Authentication Error:", error);
  switch (error.code) {
    case "auth/email-already-exists":
      setErrorMessage(
        "The provided email is already in use by an existing user."
      );
      break;
    case "auth/invalid-email":
      setErrorMessage("The provided email is not a valid email address.");
      break;
    case "auth/operation-not-allowed":
      setErrorMessage("Email/password accounts are not enabled.");
      break;
    case "auth/invalid-password":
      setErrorMessage("The provided password is invalid.");
      break;
    case "auth/user-not-found":
      setErrorMessage("No user found with this email.");
      break;
    case "auth/invalid-credential":
      setErrorMessage("The provided credentials are invalid.");
      break;
  }
}

// Format the user object
function formatAuthUser(user) {
  return user
    ? {
        uid: user?.uid,
        email: user?.email,
        displayName: user?.displayName,
        photoURL: user?.photoURL,
      }
    : null;
}

// Custom hook to handle Firebase authentication
export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [signupErrorMessage, setSignupErrorMessage] = useState("");
  const [resetPasswordErrorMessage, setResetPasswordErrorMessage] =
    useState("");
  const router = useRouter();
  const pathName = usePathname();
  const {
    trigger: createUser,
    error: createUserError,
    isMutating,
  } = useCreateUser();

  async function authStateChanged(authState) {
    try {
      if (authState) {
        setAuthUser(formatAuthUser(authState));

        if (pathName === applicationUrls.login.root) {
          // Redirect to dashboard if user is authenticated
          const hasSession = await getSession();
          if (hasSession) {
            router.replace(applicationUrls.dashboard.root);
          }
        }
      } else {
        setAuthUser(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // Create a new user with email and password
  async function createUserWithEmailAndPasswordHandler(email, password, name) {
    try {
      if (appMode === "demo") {
        toast.error("This action is not allowed in demo mode.");
        return;
      }

      setLoading(true);
      // Reset error messages
      setLoginErrorMessage("");
      setSignupErrorMessage("");

      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      await sendEmailVerification(userCredential.user);
    } catch (error) {
      firebaseAuthenticationErrorHandler(error, setSignupErrorMessage);
    } finally {
      setLoading(false);
    }
  }

  // Sign in the user with email and password
  async function signInWithEmailAndPasswordHandler(email, password) {
    try {
      setLoading(true);
      // Reset error messages
      setLoginErrorMessage("");
      setSignupErrorMessage("");
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const additionalUserInfo = getAdditionalUserInfo(userCredential);

      // Create a user profile on the server for the new user
      if (additionalUserInfo.isNewUser) {
        setLoading(isMutating);
        await createUser({ arg: userCredential.user });

        if (createUserError) {
          setLoginErrorMessage(
            createUserError?.message ||
              "An error occurred while creating the user profile."
          );
          throw createUserError;
        }
      }

      // Save the session in the cookie
      // Get the user role and subscription from the token
      // Save the user uid, rolebscription in the session
      const userUid = userCredential?.user?.uid;
      const tokenResult = await userCredential?.user?.getIdTokenResult(true);
      const role = tokenResult?.claims?.role;
      const subscription = tokenResult?.claims?.subscription;
      const sessionData = {
        uid: userUid,
        role: role,
        subscription: subscription,
      };
      const stringifiedSessionData = JSON.stringify(sessionData);

      if (stringifiedSessionData) {
        await createSession(stringifiedSessionData);
      }

      setAuthUser(formatAuthUser(userCredential.user));
    } catch (error) {
      firebaseAuthenticationErrorHandler(error, setLoginErrorMessage);
    } finally {
      setLoading(false);
    }
  }

  // Send a password reset email
  async function sendPasswordResetEmailHandler(email) {
    try {
      if (appMode === "demo") {
        toast.error("This action is not allowed in demo mode.");
        return;
      }
      setLoading(true);
      // Reset error message
      setResetPasswordErrorMessage("");
      await sendPasswordResetEmail(firebaseAuth, email);
    } catch (error) {
      console.log(error);
      firebaseAuthenticationErrorHandler(error, setResetPasswordErrorMessage);
    } finally {
      setLoading(false);
    }
  }

  // Sign in the user with Google
  async function signInWithGoogleHandler() {
    try {
      if (appMode === "demo") {
        toast.error(
          "This action is not allowed in demo mode. Please use email / password authentication."
        );
        return;
      }

      setLoading(true);
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(firebaseAuth, provider);

      const additionalUserInfo = getAdditionalUserInfo(userCredential);
      // Create a user profile for the new user
      if (additionalUserInfo.isNewUser) {
        setLoading(isMutating);
        await createUser({ arg: userCredential.user });

        if (createUserError) {
          throw createUserError;
        }
      }

      // Save the session in the cookie
      // Get the user role and subscription from the token
      // Save the user uid, rolebscription in the session
      const userUid = userCredential?.user?.uid;
      const tokenResult = await userCredential?.user?.getIdTokenResult(true);
      const role = tokenResult?.claims?.role;
      const subscription = tokenResult?.claims?.subscription;
      const sessionData = {
        uid: userUid,
        role: role,
        subscription: subscription,
      };
      const stringifiedSessionData = JSON.stringify(sessionData);

      if (stringifiedSessionData) {
        await createSession(stringifiedSessionData);
      }

      setAuthUser(formatAuthUser(userCredential.user));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // Sign out the user
  async function signOutHandler() {
    try {
      setLoading(true);
      await deleteSession(); //cookie
      await signOut(firebaseAuth);
      setAuthUser(null);

      // Reset error messages
      setLoginErrorMessage("");
      setSignupErrorMessage("");

      router.replace(applicationUrls.login.root);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, authStateChanged);
    return () => unsubscribe();
  }, []); // Developer Note: Removing this empty array will cause the effect to run infinitely and crash the app

  return {
    authUser,
    loading,
    loginErrorMessage,
    signupErrorMessage,
    resetPasswordErrorMessage,
    createUserWithEmailAndPasswordHandler,
    signInWithEmailAndPasswordHandler,
    sendPasswordResetEmailHandler,
    signInWithGoogleHandler,
    signOutHandler,
  };
}
