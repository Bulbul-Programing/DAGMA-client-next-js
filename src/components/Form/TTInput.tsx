"use client";
import { Input } from "@heroui/input";
import React from "react";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {}

const TTInput = ({
  variant = "bordered",
  size = "sm",
  name,
  type,
  label,
  disabled = false,
  required = true,
  defaultValue,
  onChange,
}: IProps) => {
  const {
    register,
    formState: { errors },
    setValue, // ✅ Allows manual value setting for instant validation
    trigger, // ✅ Triggers validation when input changes
  } = useFormContext();

  // Custom onChange handler to validate field dynamically
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name, e.target.value, { shouldValidate: true });
    trigger(name); // ✅ Trigger validation on change
    if (onChange) onChange();
  };

  return (
    <Input
      {...register(name)}
      className="my-3"
      defaultValue={defaultValue}
      disabled={disabled}
      errorMessage={errors[name]?.message as string}
      isInvalid={!!errors[name]}
      label={label}
      name={name}
      required={required}
      size={size}
      type={type}
      variant={variant}
      onChange={handleChange} // ✅ Custom handler for live validation
    />
  );
};

export default TTInput;
