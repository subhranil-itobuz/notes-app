import jwt from "jsonwebtoken"
import sessionsModel from "../models/sessionSchema.js";
import userModel from "../models/userModel.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(404).json({
                success: false,
                message: "Auth header not found"
            })
        }

        const refreshToken = authHeader.split(' ')[1]

        if (!refreshToken) {
            return res.status(404).json({
                success: false,
                message: "Refresh token not found"
            })
        }

        jwt.verify(refreshToken, process.env.SECRET_KEY, async (error, decoded) => {
            if (error) {
                throw new Error(error.message)
            }
            else {
                const userId = decoded.userId

                if (!userId) {
                    return res.status(404).json({
                        success: false,
                        message: "User id not found"
                    })
                }

                const user = await userModel.findById(userId)

                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: "User not found"
                    })
                }

                const session = await sessionsModel.findOne({ userId })

                if (!session) {
                    return res.status(401).json({
                        success: false,
                        message: "Unauthorize acess. Please login first"
                    })
                }

                req.id = userId
                next()
            }
        })

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

export default isAuthenticated