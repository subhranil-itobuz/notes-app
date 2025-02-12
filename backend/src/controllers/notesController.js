import fs from 'fs'
import notesModel from "../models/notesModel.js";
import { notesSchemaValidation } from "../validator/notesValidate.js";

//create note function
export const createNote = async (req, res, newId, obj) => {
    try {
        const { title, description, tag } = req.body || obj

        let userId = newId ? newId : req.id

        if (Object.keys(req?.body).length > 3)
            throw new Error("Extra fields");

        //eslint-disable-next-line
        const noteRegex = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/;

        if (noteRegex.test(title)) {
            return res.status(400).json({
                success: false,
                message: 'Special character is not allowed in title'
            })
        }
        if (noteRegex.test(tag)) {
            return res.status(400).json({
                success: false,
                message: 'Special character is not allowed in tag'
            })
        }

        const noteDetails = {
            title: title?.replace(/\s+/g, ' ').trim(),
            description: description?.replace(/\s+/g, ' ').trim(),
            tag: tag?.replace(/\s+/g, ' ').trim() || 'general'
        }

        const validNotes = notesSchemaValidation.safeParse(noteDetails)

        if (!validNotes.success) {
            return res.status(400).json({
                success: false,
                message: `${validNotes.error.issues[0].message} --> ${validNotes.error.issues[0].path}`
            })
        }

        const oldNote = await notesModel.findOne({
            user: userId,
            title: title?.toUpperCase().replace(/\s+/g, ' ').trim()
        })

        if (oldNote) {
            return res.status(400).json({
                success: false,
                message: "Same title already exists, please try another title"
            })
        }

        const note = await notesModel.create({
            user: userId,
            title: title?.toUpperCase().replace(/\s+/g, ' ').trim(),
            description: description?.replace(/\s+/g, ' ').trim(),
            tag: tag?.toLowerCase().replace(/\s+/g, ' ').trim() || 'general'
        })

        return res.status(201).json({
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

//upload note files function
export const uploadFile = async (req, res) => {
    try {
        const file = req.file
        const noteId = req.params.id

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            })
        }

        const note = await notesModel.findById(noteId)

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            })
        }

        note.fileUrl = `http://localhost:3000/uploads/notesFile/${file.filename}`

        await note.save()

        return res.status(201).json({
            success: true,
            message: `File uploaded successfully`,
            fileUrl: note.fileUrl
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//update the existing file function
export const updateFile = async (req, res) => {
    try {
        const newFile = req.file
        const noteId = req.params.id

        const note = await notesModel.findById(noteId)

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            })
        }

        const existingFile = note.fileUrl.split('/').slice(-3).join('/')

        fs.unlink(existingFile, async (error) => {
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            else {
                const url = newFile ? newFile.filename : note.fileUrl

                note.fileUrl = `http://localhost:3000/uploads/notesFile/${url}`

                await note.save()

                return res.status(200).json({
                    success: true,
                    message: 'File updated successfully'
                })
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//delete the file function
export const deleteFile = async (req, res) => {
    try {
        const note = await notesModel.findById(req.params.id)

        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            })
        }

        const filePath = note.fileUrl.split('/').slice(-3).join('/')

        fs.unlink(filePath, async (error) => {
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            else {
                note.fileUrl = ''

                await note.save()

                return res.status(200).json({
                    success: true,
                    message: 'File deleted successfully'
                })
            }
        });

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
        const keyword = req.query.keyword || ''
        const sortBy = req.query.sortBy || 'createdAt'
        const order = req.query.order || 'asc'
        const { limit = 6, page = 1 } = req.query

        const offset = (page - 1) * limit

        const pageNotes = await notesModel.find({
            user: userId,
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { tag: { $regex: keyword, $options: "i" } }
            ]
        })
            .sort({ [sortBy]: order === 'asc' ? -1 : 1 })
            .skip(offset)
            .limit(limit * 1)

        const totalNotes = await notesModel.find({ user: userId })

        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if (pageNotes.length === 0 || totalNotes.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No notes to display. Please create a note"
            })
        }

        return res.status(200).json({
            success: true,
            message: "All notes fetched successfully",
            pageNo: page,
            currentResults: pageNotes.length,
            totalResults: totalNotes.length,
            data: pageNotes
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
        const userId = req.id
        const { title, description, tag } = req.body

        if (Object.keys(req.body).length > 3)
            throw new Error("Extra fields");

        //eslint-disable-next-line
        const regex_symbols = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/;

        if (regex_symbols.test(title) || regex_symbols.test(tag)) {
            return res.status(400).json({
                success: false,
                message: 'Special character is not allowed'
            })
        }

        let newNote = {}
        const note = await notesModel.findById(id)

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            })
        }

        if (title)
            newNote.title = title.replace(/\s+/g, ' ').trim().toUpperCase()
        else
            newNote.title = note.title

        if (description)
            newNote.description = description?.replace(/\s+/g, ' ').trim()
        else
            newNote.description = note.description

        if (tag)
            newNote.tag = tag?.replace(/\s+/g, ' ').toLowerCase().trim() || 'general'
        else
            newNote.tag = note.tag

        const validNotes = notesSchemaValidation.safeParse(newNote)

        if (!validNotes.success) {
            return res.status(400).json({
                success: false,
                message: `${validNotes.error.issues[0].message} --> ${validNotes.error.issues[0].path}`
            })
        }

        const sameTitle = await notesModel.findOne({
            _id: { $nin: id },
            user: userId,
            title: newNote.title,
        })

        if (sameTitle) {
            return res.status(400).json({
                success: false,
                message: "Same title already exists, please try another title"
            })
        }

        await note.updateOne(newNote)

        return res.status(201).json({
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
                message: "No Notes to delete"
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