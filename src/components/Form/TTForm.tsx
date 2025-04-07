"use client";
import { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface formConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

interface IProps extends formConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
}

const TTForm = ({ children, onSubmit, defaultValues, resolver }: IProps) => {
  const methods = useForm({
    defaultValues,
    resolver: resolver ? zodResolver(resolver) : undefined, // Apply Zod resolver
    mode: "onChange", // ✅ Enable validation onChange
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default TTForm;
