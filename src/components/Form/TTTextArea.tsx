"use client";
import { Textarea } from "@heroui/input";
import { useFormContext, useWatch } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {
  type?: string;
}

export default function FXTextarea({
  name,
  label,
  variant = "bordered",
  defaultValue,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const currentValue = useWatch({ name });

  return (
    <Textarea
      {...register(name)}
      className="my-3"
      defaultValue="something"
      label={label}
      minRows={2}
      value={currentValue || ""}
      variant={variant}
    />
  );
}
