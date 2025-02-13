import fs from 'fs'

import notesModel from "../models/notesModel.js"
import sessionsModel from "../models/sessionSchema.js"
import userModel from "../models/userModel.js"
import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE, UNAUTHORIZED_CODE } from "../utils/constant.js"


//get all users present in the database
export const getAllUser = async (req, res) => {
    try {
        if (req.role === 'user') {
            return res.status(UNAUTHORIZED_CODE).json({
                success: false,
                message: "Unauthorized access"
            })
        }

        const users = await userModel.find({ role: 'user' })

        if (!users.length) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: 'No user found'
            })
        }

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: 'All user fetched successfully',
            totalUser: users.length,
            data: users
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}

//delete a particular user by admin function
export const deleteUser = async (req, res) => {
    try {
        if (req.role === 'user') {
            return res.status(UNAUTHORIZED_CODE).json({
                success: false,
                message: "Unauthorized access"
            })
        }

        const userId = req.params.userId

        if (!userId) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "User id not found"
            })
        }

        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "User not found"
            })
        }

        if (user.profilePicture !== '') {
            const filePath = user.profilePicture.replace('http://localhost:3000/', '')
            fs.existsSync(filePath) && fs.unlinkSync(filePath)
        }

        const notes = await notesModel.find({ user: userId })

        notes.forEach((item) => {
            if (item.fileUrl !== '') {
                const filePath = item.fileUrl.replace('http://localhost:3000/', '')
                fs.existsSync(filePath) && fs.unlinkSync(filePath)
            }
        })

        await notesModel.deleteMany({ user: userId })
        await sessionsModel.deleteMany({ userId: userId })
        await userModel.deleteOne({ _id: userId })

        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}