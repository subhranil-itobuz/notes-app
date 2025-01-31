import mongoose from "mongoose";

const sessionsShema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, { timestamps: true })

const sessionsModel = mongoose.model('sessions', sessionsShema)

export default sessionsModel