import * as yup from 'yup'

export const createNoteSchema = yup.object({
  title: yup
  .string()
  .required('Title is required')
  .min(4, 'Minimum 4 character required in title')
  .max(15, 'Maximum 15 character allowed'),

  description: yup
  .string()
  .required('Description is required')
  .min(4, 'Minimum 4 character required'),

  tag: yup.string()
  .max(8, 'Maximum 8 character allowed')
})