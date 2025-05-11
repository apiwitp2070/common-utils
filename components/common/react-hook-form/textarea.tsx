import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils";
import { ComponentPropsWithoutRef } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type TextareaProps = Omit<ComponentPropsWithoutRef<typeof Textarea>, "form">;

interface FormTextareaProps<T extends FieldValues> extends TextareaProps {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
}

export default function FormTextarea<T extends FieldValues>({
  form,
  name,
  label,
  ...props
}: FormTextareaProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              {...props}
              {...field}
              className={cn(
                "lg:min-h-26", // edit default className here
                props.className
              )}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
