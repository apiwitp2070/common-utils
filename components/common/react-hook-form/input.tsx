import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils";
import { ComponentPropsWithoutRef } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type InputProps = Omit<ComponentPropsWithoutRef<typeof Input>, "form">;

interface FormInputProps<T extends FieldValues> extends InputProps {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
}

export default function FormInput<T extends FieldValues>({
  form,
  name,
  label,
  ...props
}: FormInputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...props}
              {...field}
              className={cn(
                "", // edit default className here
                props.className
              )}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
