import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['admin', 'user'],
    required: true
  },

  verified: {
    type: Boolean,
    default: false
  },

  token: {
    type: String
  },

  profilePicture: {
    type: String,
    default: ''
  }

}, { timestamps: true })

const userModel = mongoose.model('users', userSchema)

export default userModel