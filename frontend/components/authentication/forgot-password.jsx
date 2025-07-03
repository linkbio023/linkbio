"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useAuth } from "@/context/AuthUserContext";
import ErrorAlert from "@/components/shared/alert/error-alert";
import SuccessAlert from "@/components/shared/alert/success-alert";
import { Loader2 } from "lucide-react";
import BackButton from "@/components/shared/buttons/back-button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import FormInput from "@/components/shared/form-items/form-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const forgotPasswordFormSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" })
    .max(254, { message: "Email must be less than 254 characters" }),
});

export default function ForgotPassword() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { sendPasswordResetEmailHandler, loading } = useAuth();

  const form = useForm({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  if (success) {
    return (
      <div className="mx-auto max-w-sm grid gap-4">
        <SuccessAlert message={success} />
        <BackButton />
      </div>
    );
  }

  async function onSubmit(values) {
    // Sign in the user
    try {
      await sendPasswordResetEmailHandler(values.email);
      setSuccess("Password reset email sent. Please check your inbox");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        setError("No user found with this email address");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else {
        setError("An error occurred while sending the password reset email");
      }
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your email to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            {error && <ErrorAlert message={error} />}
            <FormInput
              label="Email"
              name="email"
              placeholder="Write your email"
              type="email"
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="w-6 h-6 animate-spin" />}
              <span>Submit</span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
