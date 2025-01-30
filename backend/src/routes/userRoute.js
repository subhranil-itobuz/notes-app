import express from 'express'
import { getUserDetails, login, logout, resendVerificationLink, signUp, verifyUser } from '../controllers/userController.js'

const userRoute = express.Router()

userRoute.post('/signup', signUp)
userRoute.post('/resendEmail', resendVerificationLink)
userRoute.get('/verify/:token', verifyUser)
userRoute.post('/login', login)
userRoute.get('/logout', logout)
userRoute.get('/getUser', getUserDetails)


export default userRoute