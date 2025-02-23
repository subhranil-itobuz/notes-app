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

        const room = req.role === 'user' ? senderId : receiverId
        const author = await userModel.findById(req.id)

        const chat = await chatsModel.findOne({ roomId: room })

        if (chat && chat.length !== 0) {
            chat.messages.push({
                room: room,
                message: message,
                author: author.userName,
                role: req.role,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            })

            chat.adminId = req.role === 'admin' ? senderId : chat.adminId

            await chat.save()

            return res.status(CREATED_CODE).json({
                success: true,
                message: "Message send successfully",
                data: chat.messages[chat.messages.length - 1]
            })
        }

        const data = await chatsModel.create({
            roomId: room,
            userId: req.role === 'user' ? senderId : receiverId,
            adminId: req.role === 'admin' ? senderId : null,
            messages: {
                room: room,
                message: message,
                author: author.userName,
                role: req.role,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            }
        })

        return res.status(CREATED_CODE).json({
            success: true,
            message: "Message send successfully",
            data: data.messages[data.messages.length - 1]
        });

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message,
        });
    }
}

//one to one chat retrieval through roomId
export const getChat = async (req, res) => {
    try {
        const room = req.params.room

        if (req.role === 'user' && room !== req.id) {
            return res.status(UNAUTHORIZED_CODE).json({
                success: false,
                message: "Unauthorize access"
            })
        }

        const chat = await chatsModel.findOne({ roomId: room }).populate('userId')

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
            userName: chat.userId.userName,
            data: chat.messages
        })

    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message,
        })
    }
}