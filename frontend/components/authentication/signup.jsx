"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthUserContext";
import ErrorAlert from "@/components/shared/alert/error-alert";
import SuccessAlert from "@/components/shared/alert/success-alert";
import GoogleSignIn from "@/components/authentication/google-signin";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import FormInput from "@/components/shared/form-items/form-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpFormSchema = z
  .object({
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
    confirmPassword: z
      .string()
      .trim()
      .nonempty({ message: "Confirm Password is required" })
      .min(6, {
        message: "Confirm Password must be at least 6 characters long",
      })
      .max(25, { message: "Confirm Password must be less than 25 characters" }),
    name: z
      .string()
      .trim()
      .nonempty({ message: "Name is required" })
      .max(50, { message: "Name must be less than 50 characters" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export default function SignUp() {
  const [success, setSuccess] = useState(null);
  const { createUserWithEmailAndPasswordHandler, loading, signupErrorMessage } =
    useAuth();

  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  async function onSubmit(values) {
    // Sign in the user
    try {
      const user = await createUserWithEmailAndPasswordHandler(
        values.email,
        values.password,
        values.name
      );
      if (user) {
        // Verification email sent
        setSuccess("Verification email sent. Please check your inbox");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card className="mx-auto max-w-sm h-fit mb-8">
      <CardHeader>
        <CardTitle className="text-xl">Create Your Account</CardTitle>
        <CardDescription>
          Enter your information to create an account
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
              {signupErrorMessage && (
                <ErrorAlert message={signupErrorMessage} />
              )}
              {success && <SuccessAlert message={success} />}
              <FormInput
                label="Name"
                name="name"
                placeholder="Write your name"
                type="text"
              />
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
              <FormInput
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm your password"
                type="password"
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="w-6 h-6 animate-spin" />}
                <span>Create an account</span>
              </Button>
            </form>
          </Form>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account? Consider login
        </div>
      </CardContent>
    </Card>
  );
}
