"use server";

import { insertUser } from "@/data/user/user-data";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email(),
  fullname: z.string().min(1, "Fullname is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signUpAction = async (formData: FormData) => {
  const body = Object.fromEntries(formData.entries());
  const parsed = signUpSchema.safeParse(body);
  if (!parsed.success) {
    return {
      error: parsed.error.flatten().fieldErrors,
    };
  }

  await insertUser({
    name: parsed.data.fullname,
    email: parsed.data.email,
    password: parsed.data.password,
  });

  return {
    success: true,
  };
};
