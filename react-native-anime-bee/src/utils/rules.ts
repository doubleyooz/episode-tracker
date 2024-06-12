import { z } from "zod";

const email = z.string().email("Please enter a valid email");
const username = z.string().min(3, "Username must be at least 3 characters");
const password = z.string().min(8, "Password must be at least 8 characters");
const code = z.string().length(6, "The code must be 6 characters long");

export const forgotSchema = z.object({
  email,
});

export const codeSchema = z.object({
  code,
});

export const loginSchema = z.object({
  email,
  password,
});

export const signUpSchema = z.object({
  email,
  username,
  password,
});
