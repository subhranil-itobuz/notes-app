import chatsModel from "../models/chatsModel.js"
import userModel from "../models/userModel.js"
import { BAD_REQUEST_CODE, CREATED_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE, UNAUTHORIZED_CODE } from "../utils/constant.js"

// one to one-chat posting (through id)
export const sendChat = async (req, res) => {
    try {
        const senderId = req.id
        const receiverId = req.role === 'user' ? null : req.params.receiverId
        const { message } = req.body

        if (!message) {
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "Message is required"
            })
        }

        if (receiverId) {
            const receiver = await userModel.findById(receiverId)

            if (!receiver) {
                return res.status(NOT_FOUND_CODE).json({
                    success: false,
                    message: "receiver not found"
                })
            }
        }

        const roomId = req.role === 'user' ? senderId : receiverId

        const chat = await chatsModel.findOne({ roomId: roomId })
        console.log(chat)

        if (chat && chat.length !== 0) {
            chat.messages.push({
                message: message,
                author: req.id
            })

            chat.adminId = req.role === 'admin' ? senderId : chat.adminId

            await chat.save()

            return res.status(CREATED_CODE).json({
                success: true,
                message: "Message send successfully",
                data: chat
            })
        }

        const data = await chatsModel.create({
            roomId: roomId,
            userId: req.role === 'user' ? senderId : receiverId,
            adminId: req.role === 'admin' ? senderId : null,
            messages: {
                message: message,
                author: req.id
            }
        })

        return res.status(CREATED_CODE).json({
            success: true,
            message: "Message send successfully",
            data: data
        });

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message,
        });
    }
}

//one to one chat retrieval through id
export const getChat = async (req, res) => {
    try {
        const roomId = req.params.roomId

        if (req.role === 'user' && roomId !== req.id) {
            return res.status(UNAUTHORIZED_CODE).json({
                success: false,
                message: "Unauthorize access"
            })
        }

        const chat = await chatsModel.findOne({ roomId })
            .populate('userId')
            .populate('adminId').populate({
                path: 'messages',
                populate: { path: 'author' }
            })

        if (!chat) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Chat not found"
            })
        }

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "All messages fetched successfully",
            totalMessages: chat.messages.length,
            data: chat
        })

    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message,
        })
    }
}