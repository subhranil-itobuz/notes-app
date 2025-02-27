import { z } from 'zod'

export const notesSchemaValidation = z.object({
    title: z.string({
        required_error: "Title is requires",
        invalid_type_error: "Title must be a string"
    }).trim().min(4).max(15),

    description: z.string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string"
    }).trim().min(4),

    tag: z.string({
        invalid_type_error: "Tag must be a string"
    }).trim().min(3).max(8)
})