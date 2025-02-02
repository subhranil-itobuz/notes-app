import mongoose from 'mongoose'

const notesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true,
    },

    tag: {
        type: String,
        default: "general"
    },

    fileUrl: {
        type: String,
        default: ""
    }

}, { timestamps: true })

const notesModel = mongoose.model('notes', notesSchema)

export default notesModel