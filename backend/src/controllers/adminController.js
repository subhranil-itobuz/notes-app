import userModel from "../models/userModel.js"
import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE, UNAUTHORIZED_CODE } from "../utils/constant.js"

export const getAllUser = async (req, res) => {
    try {
        if (req.role === 'user') {
            return res.status(UNAUTHORIZED_CODE).json({
                success: false,
                message: "Unauthorized access"
            })
        }

        const users = await userModel.find({ role: 'user' })
        return res.status(SUCCESS_CODE).json({
            success: false,
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