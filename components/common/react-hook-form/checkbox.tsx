import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { cn } from "@/utils";
import { ComponentPropsWithoutRef } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type CheckboxProps = Omit<ComponentPropsWithoutRef<typeof Checkbox>, "form">;

interface FormCheckboxProps<T extends FieldValues> extends CheckboxProps {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
}

export default function FormCheckbox<T extends FieldValues>({
  form,
  name,
  label,
  ...props
}: FormCheckboxProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-1 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              {...props}
              className={cn(
                "", // edit default className here
                props.className
              )}
            />
          </FormControl>
          <FormLabel>{label}</FormLabel>
        </FormItem>
      )}
    />
  );
}
