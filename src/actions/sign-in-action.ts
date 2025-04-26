/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { signIn } from "@/lib/auth";

export const signInAction = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    signIn("credentials", {
      ...credentials,
      redirectTo: "/xxx",
    });
  } catch (error) {
    return {
      error: "Invalid credentials",
    };
  }
};
