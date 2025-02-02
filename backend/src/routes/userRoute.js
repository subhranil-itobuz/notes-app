import express from 'express'
import { getUserDetails, login, logout, regenerateAccessToken, resendVerificationLink, signUp, verifyUser } from '../controllers/userController.js'

const userRoute = express.Router()

userRoute.post('/signup', signUp)
userRoute.post('/resendEmail', resendVerificationLink)
userRoute.get('/verify', verifyUser)
userRoute.post('/login', login)
userRoute.get('/regenerateAccessToken', regenerateAccessToken)
userRoute.get('/logout', logout)
userRoute.get('/getUser', getUserDetails)


export default userRoute