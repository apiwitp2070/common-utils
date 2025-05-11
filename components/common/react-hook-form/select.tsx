import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComponentPropsWithoutRef } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type SelectProps = Omit<ComponentPropsWithoutRef<typeof Select>, "form">;

interface FormSelectProps<T extends FieldValues> extends SelectProps {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  items: { id: string; name: string }[];
}

export default function FormSelect<T extends FieldValues>({
  form,
  name,
  label,
  items,
  placeholder = "Select",
  ...props
}: FormSelectProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            {...field}
            {...props}
          >
            <FormControl>
              <SelectTrigger className="w-full truncate">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}
