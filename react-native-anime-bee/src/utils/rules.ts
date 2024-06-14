import { z } from "zod";

const email = z.string().email("Please enter a valid email");
const username = z.string().min(3, "Username must be at least 3 characters");
const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/);

const confirmPassword = z
  .string()
  .min(8, "Password must be at least 8 characters");

const code = z
  .string()
  .regex(/^[0-9]+$/, "Code must be a number")
  .length(6, "The code must be 6 characters long");

export const forgotSchema = z.object({
  email,
});

export const codeSchema = z.object({
  code,
});

export const changeUsernameSchema = z.object({
  username,
});

export const loginSchema = z.object({
  email,
  password,
});

export const countdown = 360;

export const resetPasswordSchema = z
  .object({
    confirmPassword,
    password,
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const signUpSchema = z.object({
  email,
  username,
  password,
});
