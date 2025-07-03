"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/context/AuthUserContext";
import ErrorAlert from "@/components/shared/alert/error-alert";
import { Loader2 } from "lucide-react";
import GoogleSignIn from "@/components/authentication/google-signin";
import { Separator } from "@/components/ui/separator";
import { applicationUrls } from "@/constants/application-urls";
import { z } from "zod";
import FormInput from "@/components/shared/form-items/form-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
// import { firebaseAuth } from "@/lib/firebase";

const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" })
    .max(254, { message: "Email must be less than 254 characters" }),
  password: z
    .string()
    .trim()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(25, { message: "Password must be less than 25 characters" }),
});

export function Login() {
  const {
    signInWithEmailAndPasswordHandler,
    loading,
    loginErrorMessage,
    authUser,
  } = useAuth();

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    // Sign in the user
    try {
      await signInWithEmailAndPasswordHandler(values.email, values.password);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Welcome Back</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {/* SignIn with Google Button */}
          <GoogleSignIn />
          <Separator />
          {/* Email and Password Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              {/* Error if any */}
              {loginErrorMessage && <ErrorAlert message={loginErrorMessage} />}

              <FormInput
                label="Email"
                name="email"
                placeholder="Write your email"
                type="email"
              />

              <FormInput
                label="Password"
                name="password"
                placeholder="Write your password"
                type="password"
              />

              <Button
                type="submit"
                className="w-full"
                disabled={loading || authUser}
              >
                {loading && <Loader2 className="w-6 h-6 animate-spin" />}
                <span>Login</span>
              </Button>
            </form>
          </Form>
        </div>
        <div className="mt-4 space-y-4 text-center text-sm">
          <p>
            <Link
              href={applicationUrls.login.forgotPassword}
              className="ml-auto inline-block text-sm underline"
              prefetch={false}
            >
              Forgot your password?
            </Link>
          </p>
          <p>Don&apos;t have an account? Consider sign up</p>
        </div>
      </CardContent>
    </Card>
  );
}
