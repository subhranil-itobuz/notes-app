import mongoose from 'mongoose'

const notesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
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
        default: "General"
    }

}, { timestamps: true })

const notesModel = mongoose.model('notes', notesSchema)

export default notesModel