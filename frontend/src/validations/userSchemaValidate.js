import * as yup from 'yup'

export const signupUserSchema = yup.object({
  userName: yup
    .string()
    .required('Username is required')
    .min(4)
    .max(15),

  email: yup.string()
    .required('email is required')
    .email('Invalid email format'),

  password: yup.string()
    .required('password is required')
    .min(5),
  role: yup.string()
    .required('Role is required')

}).required()

export const loginUserSchema = yup.object({
  email: yup.string()
    .required('email is required')
    .email('Invalid email format'),

  password: yup.string()
    .required('password is required')
    .min(5),
  role: yup.string()
    .required('Role is required')
}).required()

export const reVerifySchema = yup.object({
  email: yup.string()
    .required('email is required')
    .email('Invalid email format'),
})

export const updateUserNameSchema = yup.object({
  newUserName: yup
    .string()
    .required('Username is required')
    .min(4)
    .max(15),
}).required()

export const updatePasswordSchema = yup.object({
  oldPassword: yup.string()
    .required('old password is required')
    .min(5),
  newPassword: yup.string()
    .required('New Password is required')
    .min(5),
  confirmNewPassword: yup.string()
    .required('Confirm password is required')
    .min(5),
}).required()