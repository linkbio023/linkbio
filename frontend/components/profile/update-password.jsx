"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { KeyRound, Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import FormInput from "@/components/shared/form-items/form-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePassword } from "@/services/user-services";

const updatePasswordFormSchema = z
  .object({
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

export default function UpdatePassword() {
  const { trigger, isMutating } = useUpdatePassword();
  const form = useForm({
    resolver: zodResolver(updatePasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    // Sign in the user
    try {
      trigger(values);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <KeyRound />
          <span>Update Password</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Update Password</DialogTitle>
              <DialogDescription>
                Enter your new password below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 my-6">
              <FormInput
                label="New Password"
                name="password"
                placeholder="Write your password"
                type="password"
              />
              <FormInput
                label="Confirm New Password"
                name="confirmPassword"
                placeholder="Confirm your password"
                type="password"
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full" disabled={isMutating}>
                {isMutating && <Loader2 className="animate-spin" />}
                <span>Save Changes</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
