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
import { Loader2, UserPen } from "lucide-react";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import FormInput from "@/components/shared/form-items/form-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateName } from "@/services/user-services";

const updateNameFormSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty({ message: "Name is required" })
    .max(50, { message: "Name must be less than 50 characters" }),
});

export default function UpdateName() {
  const { trigger, isMutating } = useUpdateName();
  const form = useForm({
    resolver: zodResolver(updateNameFormSchema),
    defaultValues: {
      name: "",
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
          <UserPen />
          <span>Update Name</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Update Name</DialogTitle>
              <DialogDescription>
                Enter your new name below.
              </DialogDescription>
            </DialogHeader>
            <div className="my-6">
              <FormInput
                label="Name"
                name="name"
                placeholder="Write your name"
                type="text"
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
