import * as yup from 'yup'

export const signupUserSchema = yup.object({
  userName: yup
    .string()
    .required('Username is required')
    .min(4, 'minimum 4 character required in username')
    .max(15, 'maximum 15 character in username'),

  email: yup.string()
    .required('email is required')
    .email('Invalid email format'),

  password: yup.string()
    .required('password is required')
    .min(5)
}).required()

export const loginUserSchema = yup.object({
  email: yup.string()
    .required('email is required')
    .email('Invalid email format'),

  password: yup.string()
    .required('password is required')
    .min(5)
}).required()

export const reVerifySchema = yup.object({
  email: yup.string()
    .required('email is required')
    .email('Invalid email format'),
})