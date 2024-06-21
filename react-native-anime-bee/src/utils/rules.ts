import { z } from "zod";

const MIN_TITLE_LENGTH = 6;
const MIN_NAME_LENGTH = 3;
const MIN_DESCRIPTION_LENGTH = 10;
const MAX_DESCRIPTION_LENGTH = 500;

const email = z.string().email("Please enter a valid email");
const username = z
  .string()
  .min(
    MIN_NAME_LENGTH,
    `Username must be at least ${MIN_NAME_LENGTH} characters`
  );
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
  .length(
    MIN_TITLE_LENGTH,
    `The code must be ${MIN_TITLE_LENGTH} characters long`
  );

const title = z
  .string()
  .min(
    MIN_TITLE_LENGTH,
    `The title must be at least ${MIN_TITLE_LENGTH} characters long`
  );

const studio = z
  .string()
  .min(
    MIN_NAME_LENGTH,
    `The studio name must be at least ${MIN_NAME_LENGTH} characters long`
  );

const description = z
  .string()
  .min(
    MIN_DESCRIPTION_LENGTH,
    `The description must be at least ${MIN_DESCRIPTION_LENGTH} characters long`
  )
  .max(
    MAX_DESCRIPTION_LENGTH,
    `The description must be at most ${MAX_DESCRIPTION_LENGTH} characters long`
  );

const numberOfEpisodes = z
  .string()
  .regex(/^[0-9]+$/, "numberOfEpisodes must be a number")
  .min(0, "Number of episodes must be at least 0");

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

export const createAnimeSchema = z.object({
  title,
  description,
  studio,
  numberOfEpisodes,
  allowGaps: z.boolean().default(false),
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
