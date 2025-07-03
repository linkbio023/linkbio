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
import { Loader2, Mail } from "lucide-react";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import FormInput from "@/components/shared/form-items/form-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateEmail } from "@/services/user-services";

const updateEmailFormSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" })
    .max(254, { message: "Email must be less than 254 characters" }),
});

export default function UpdateEmail() {
  const { trigger, isMutating } = useUpdateEmail();

  const form = useForm({
    resolver: zodResolver(updateEmailFormSchema),
    defaultValues: {
      email: "",
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
          <Mail />
          <span>Update Email</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Update Email</DialogTitle>
              <DialogDescription>
                Enter your new email address below.
              </DialogDescription>
            </DialogHeader>
            <div className="my-6">
              <FormInput
                label="Email"
                name="email"
                placeholder="Write your email"
                type="email"
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
