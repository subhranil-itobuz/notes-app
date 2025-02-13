import { z } from 'zod'

export const userSchemaValidation = z.object({
  userName: z.string({
    required_error: "Username is requires",
    invalid_type_error: "Username must be a string"
  }).trim().min(4).max(15),

  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string with valid mail format"
  }).email(),

  password: z.string({
    required_error: "Password required",
    invalid_type_error: "Password must be more than 5 characters"
  }).min(5),

  confirmPassword: z.string({
    required_error: "Password required",
    invalid_type_error: "Password must be more than 5 characters"
  }).min(5)
}).strict()

export const loginCredValidation = z.object({
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string with valid mail format"
  }).email(),

  password: z.string({
    required_error: "Password required",
    invalid_type_error: "Password must be more than 5 characters"
  }).min(5),
})