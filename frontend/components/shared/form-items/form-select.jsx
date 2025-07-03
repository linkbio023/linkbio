"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

export default function FormSelect({
  name,
  label,
  selectLabel,
  description,
  options,
  disabled = false,
  ...props
}) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Select
              // onValueChange={field.onChange}
              // defaultValue={field.value}
              // disabled={disabled}
              {...field}
              disabled={disabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue {...props} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {selectLabel && options.length > 0 && (
                    <SelectLabel>{selectLabel}</SelectLabel>
                  )}
                  {options.map((option, index) => (
                    <SelectItem key={index} value={String(option.value)}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
