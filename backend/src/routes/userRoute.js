import express from 'express'
import { login, logout, resendVerificationLink, signUp, verifyUser } from '../controllers/userController.js'

const userRoute = express.Router()

userRoute.post('/signup', signUp)
userRoute.post('/resendEmail', resendVerificationLink)
userRoute.get('/verify/:token', verifyUser)
userRoute.get('/login', login)
userRoute.get('/logout', logout)


export default userRoute