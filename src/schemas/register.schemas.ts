import { z } from "zod";

const registerValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name!"),
  email: z.string().email("Please enter a valid email address!"),
  phoneNumber: z
    .string()
    .regex(
      /^(013|014|015|016|017|018|019)\d{8}$/,
      "Please enter a valid mobile number!",
    ),
  password: z.string().min(6, "Must be at least 6 characters."),
});

export default registerValidationSchema;
