import jwt from 'jsonwebtoken'

import { mailSender } from "../mail/transporter.js"
import notesModel from "../models/notesModel.js"
import userModel from "../models/userModel.js"

//get all users, all verified user and non-verified user function
export const getAllUser = async (req, res) => {
  try {
    const allUser = await userModel.find({ role: 'user' })

    if (!allUser) {
      return res.status(404).json({
        success: false,
        message: 'No User Found'
      })
    }

    const verifiedUser = allUser.filter(item => item.verified === true)

    if (!verifiedUser) {
      return res.status(404).json({
        succes: false,
        message: "No user is verified"
      })
    }

    const nonVerifiedUser = allUser.filter(item => item.verified === false)

    if (!nonVerifiedUser) {
      return res.status(404).json({
        succes: false,
        message: "All user is verified"
      })
    }

    const data = {
      totalUser: allUser.length,
      totalVerifiedUser: verifiedUser.length,
      totalNonVerifiedUser: nonVerifiedUser.length,
      allUser: allUser,
      verifiedUser: verifiedUser,
      nonVerifiedUser: nonVerifiedUser,
    }

    return res.status(200).json({
      success: true,
      message: 'All users fetched successfully',
      data: data
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

//verify mail send to a particular user
export const verifyMailSend = async (req, res) => {
  try {
    const userId = req.params.userId

    if (!userId) {
      return res.status(404).json({
        succes: false,
        message: 'User id not found'
      })
    }

    const user = await userModel.findById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    if (user.verified) {
      return res.status(400).json({
        success: false,
        message: "User is already verified"
      })
    }

    console.log(user)
    const email = user.email

    const token = jwt.sign({ data: email }, process.env.SECRET_KEY, { expiresIn: '10m' })

    await mailSender(token, email)

    return res.status(200).json({
      succes: true,
      message: 'Verification mail sent successfully'
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

//verify a particular user function
export const verifyParticularUser = async (req, res) => {
  try {
    const userId = req.params.userId

    if (!userId) {
      return res.status(404).json({
        succes: false,
        message: 'User id not found'
      })
    }

    const user = await userModel.findById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    if (user.verified) {
      return res.status(400).json({
        success: false,
        message: "User is already verified"
      })
    }

    user.verified = true
    user.token = ''

    await user.save()

    return res.status(200).json({
      success: true,
      message: "User verified successfully",
      data: user
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

//get all notes of a particular user
export const getAllNotesOfUser = async (req, res) => {
  try {
    const userId = req.params.userId

    if (!userId) {
      return res.status(404).json({
        succes: false,
        message: 'User id not found'
      })
    }

    const notes = await notesModel.find({ user: userId })

    if (!notes) {
      return res.status(404).json({
        succes: false,
        message: "No notes find for this user"
      })
    }

    const data = {
      totalNotes: notes.length,
      notes: notes
    }

    return res.status(200).json({
      success: true,
      message: "All notes fetched successfully",
      data: data
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

//delete a particular note of a user
export const deleteNoteOfUser = async (req, res) => {
  try {
    const userId = req.params.userId
    const noteId = req.params.noteId

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: 'User id not found'
      })
    }

    if (!noteId) {
      return res.status(404).json({
        success: false,
        message: 'Note id not found'
      })
    }

    const note = await notesModel.findOne({
      _id: noteId,
      user: userId
    })

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      })
    }

    console.log(note)

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

//delete all notes of a user
export const deleteAllNotesOfUser = async (req, res) => {
  try {
    const userId = req.params.userId

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: 'User id not found'
      })
    }

    const notes = await notesModel.find({ user: userId })

    if (notes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No notes found for this user "
      })
    }

    await notesModel.deleteMany({ user: userId })

    return res.status(200).json({
      success: false,
      message: "All notes deleted successfully for this user"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
