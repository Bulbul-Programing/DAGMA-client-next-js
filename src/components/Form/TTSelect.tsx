import { Select, SelectItem } from "@heroui/select";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {
  options: {
    key: string;
    label: string;
  }[];
}

export default function TTSelect({
  options,
  name,
  label,
  variant = "bordered",
  disabled,
  defaultValue = "select option",
  required = true,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const defaultKey = options.find((opt) => opt.label === defaultValue)?.key;

  return (
    <Select
      {...register(name)}
      className="min-w-full my-1 "
      defaultSelectedKeys={defaultKey ? [defaultKey] : undefined}
      isDisabled={disabled}
      label={label}
      required={required}
      variant={variant}
    >
      {options.map((option) => (
        <SelectItem key={option.label}>{option.label}</SelectItem>
      ))}
    </Select>
  );
}
