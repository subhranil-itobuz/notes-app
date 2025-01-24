import notesModel from "../models/notesModel.js";
import { notesSchemaValidation } from "../validator/notesValidate.js";

//create note function
export const createNote = async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const userId = req.id

        if (Object.keys(req.body).length > 3)
            throw new Error("Extra fields");

        const noteDetails = {
            title: title.replace(/\s+/g, ' '),
            description
        }

        const validNotes = notesSchemaValidation.safeParse(noteDetails)

        if (!validNotes.success) {
            return res.status(400).json({
                success: false,
                message: validNotes.error
            })
        }

        const oldNote = await notesModel.findOne({
            user: userId,
            title: title.toUpperCase().replace(/\s+/g, ' ').trim()
        })

        if (oldNote) {
            return res.status(400).json({
                success: false,
                message: "Same title already exists, please try another title"
            })
        }

        const note = await notesModel.create({
            user: userId,
            title: title.toUpperCase().replace(/\s+/g, ' ').trim(),
            description: description.trim(),
            tag: tag?.trim()
        })

        return res.status(200).json({
            success: true,
            message: "Note created successfully",
            data: note
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//get all notes for a user function
export const getAllNotes = async (req, res) => {
    try {
        const userId = req.id
        const keyword = req.query.keyword || ""

        const notes = await notesModel.find({
            user: userId,
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { tag: { $regex: keyword, $options: "i" } }
            ]
        }).sort({ createdAt: -1 })

        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if (notes.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No notes to display. Please create a note"
            })
        }

        return res.status(200).json({
            success: true,
            message: "All notes fetched successfully",
            data: notes
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//get note by id
export const getNoteById = async (req, res) => {
    try {
        const id = req.params.id

        const note = await notesModel.findById(id)

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Note fetched successfully",
            data: note
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//update note function
export const updateNote = async (req, res) => {
    try {
        const id = req.params.id
        const { title, description, tag } = req.body

        if (Object.keys(req.body).length > 3)
            throw new Error("Extra fields");

        const newNote = {}

        if (title) newNote.title = title.replace(/\s+/g, ' ').trim()
        if (description) newNote.description = description.trim()
        if (tag) newNote.tag = tag?.trim()

        const note = await notesModel.findById(id)

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            })
        }

        await note.updateOne(newNote)

        return res.status(200).json({
            success: true,
            message: "Note updated successfully",
            data: await notesModel.findById(id)
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//delete note function
export const deleteNote = async (req, res) => {
    try {
        const id = req.params.id

        const note = await notesModel.findById(id)

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            })
        }

        await note.deleteOne()

        return res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//delete all notes function
export const emptyAll = async (req, res) => {
    try {
        const userId = req.id

        const notes = await notesModel.find({
            user: userId
        })

        if (notes.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Notes"
            })
        }

        await notesModel.deleteMany({
            user: userId
        })

        return res.status(200).json({
            success: true,
            message: "All Notes deleted successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}