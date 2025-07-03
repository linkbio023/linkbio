"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

export default function FormTextarea({ name, label, description, ...props }) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea {...field} {...props} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
